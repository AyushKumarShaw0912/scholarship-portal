import { after } from "next/server";
import { NextResponse } from "next/server";
import { headers as getHeaders } from "next/headers";

import { getPayloadClient } from "@/lib/cms/client";
import { getGmailConfig } from "@/lib/env";
import { sendGmailMail } from "@/lib/mail/gmail";
import { buildShortlistInviteEmail } from "@/lib/mail/shortlist-invite";

export const runtime = "nodejs";

type SendBody = {
  ids?: unknown;
  forceResend?: unknown;
};

type SkippedReason =
  | "not_found"
  | "not_shortlisted"
  | "missing_email"
  | "already_invited";

function normalizeIds(raw: unknown): string[] {
  if (!Array.isArray(raw)) {
    return [];
  }
  const ids = raw
    .map((id) => (typeof id === "string" || typeof id === "number" ? String(id) : ""))
    .filter(Boolean);
  return [...new Set(ids)];
}

export async function POST(request: Request) {
  const payload = await getPayloadClient();
  const headerStore = await getHeaders();
  const { user } = await payload.auth({ headers: headerStore });

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!getGmailConfig()) {
    return NextResponse.json(
      {
        error:
          "Gmail is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in the environment.",
      },
      { status: 503 },
    );
  }

  let body: SendBody;
  try {
    body = (await request.json()) as SendBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const ids = normalizeIds(body.ids);
  const forceResend = body.forceResend === true;

  if (ids.length === 0) {
    return NextResponse.json(
      { error: "Select at least one application" },
      { status: 400 },
    );
  }

  const site = await payload.findGlobal({
    slug: "site",
    depth: 0,
    overrideAccess: false,
    user,
  });

  const formUrl = typeof site.applyUrl === "string" ? site.applyUrl.trim() : "";
  if (!formUrl) {
    return NextResponse.json(
      {
        error:
          "Shortlist Google Form URL is not set. Add it in Site Settings (applyUrl).",
      },
      { status: 400 },
    );
  }

  const result = await payload.find({
    collection: "applications",
    depth: 0,
    limit: ids.length,
    pagination: false,
    where: {
      id: { in: ids },
    },
    overrideAccess: false,
    user,
  });

  const byId = new Map(result.docs.map((doc) => [String(doc.id), doc]));
  const queued: Array<{ id: string; email: string; fullName: string }> = [];
  const skipped: Array<{ id: string; reason: SkippedReason }> = [];

  for (const id of ids) {
    const doc = byId.get(id);
    if (!doc) {
      skipped.push({ id, reason: "not_found" });
      continue;
    }
    if (doc.status !== "shortlisted") {
      skipped.push({ id, reason: "not_shortlisted" });
      continue;
    }
    const email = typeof doc.email === "string" ? doc.email.trim() : "";
    if (!email) {
      skipped.push({ id, reason: "missing_email" });
      continue;
    }
    if (doc.formInviteSentAt && !forceResend) {
      skipped.push({ id, reason: "already_invited" });
      continue;
    }
    queued.push({
      id,
      email,
      fullName: typeof doc.fullName === "string" ? doc.fullName : "Applicant",
    });
  }

  const emailSubject =
    typeof site.shortlistEmailSubject === "string"
      ? site.shortlistEmailSubject
      : null;
  const emailBody = site.shortlistEmailBody ?? null;
  const fromName =
    getGmailConfig()?.fromName ||
    (typeof site.name === "string" ? site.name : undefined);

  after(async () => {
    for (const item of queued) {
      try {
        const message = buildShortlistInviteEmail({
          fullName: item.fullName,
          formUrl,
          subject: emailSubject,
          body: emailBody,
        });

        await sendGmailMail({
          to: item.email,
          subject: message.subject,
          html: message.html,
          text: message.text,
          fromName,
        });

        await payload.update({
          collection: "applications",
          id: item.id,
          data: {
            formInviteSentAt: new Date().toISOString(),
          },
          overrideAccess: true,
        });
      } catch (error) {
        payload.logger.error({
          err: error,
          msg: `Failed to send shortlist form invite to application ${item.id} (${item.email})`,
        });
      }

      await new Promise((resolve) => setTimeout(resolve, 400));
    }
  });

  return NextResponse.json(
    {
      queued: queued.length,
      skipped: skipped.length,
      skippedReasons: skipped,
      forceResend,
    },
    { status: 202 },
  );
}
