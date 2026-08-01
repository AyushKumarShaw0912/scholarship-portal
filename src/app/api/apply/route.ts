import { NextResponse } from "next/server";
import type { File as PayloadFile } from "payload";

import { getPayloadClient } from "@/lib/cms/client";
import {
  IMAGE_MIME_TYPES,
  MARKSHEET_FIELDS,
  type MarksheetField,
  parseApplicationFields,
  validateMarksheetFile,
} from "@/lib/apply-validation";

export const runtime = "nodejs";

const MARKSHEET_LABELS: Record<MarksheetField, string> = {
  class10BoardMarksheet: "Class 10 board exam marksheet",
  class10PreBoardMarksheet: "Class 10 pre-board exam marksheet",
  class8Marksheet: "Class 8 results marksheet",
  class9Marksheet: "Class 9 results marksheet",
};

function asString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

async function uploadMarksheet(file: File, alt: string): Promise<number> {
  if (!IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error(`Invalid image type for ${alt}. Use JPEG, PNG, or WebP.`);
  }

  const payload = await getPayloadClient();
  const buffer = Buffer.from(await file.arrayBuffer());

  const payloadFile: PayloadFile = {
    data: buffer,
    mimetype: file.type,
    name: file.name,
    size: file.size,
  };

  const media = await payload.create({
    collection: "media",
    data: { alt },
    file: payloadFile,
    overrideAccess: true,
  });

  return Number(media.id);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    if (asString(formData.get("website")).trim()) {
      return NextResponse.json({ ok: true });
    }

    const parsed = parseApplicationFields({
      fullName: asString(formData.get("fullName")),
      target: asString(formData.get("target")),
      academicAchievements: asString(formData.get("academicAchievements")),
      address: asString(formData.get("address")),
      parentsName: asString(formData.get("parentsName")),
      parentsProfession: asString(formData.get("parentsProfession")),
      householdIncome: asString(formData.get("householdIncome")),
    });

    if ("error" in parsed) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const mediaIds: Record<MarksheetField, number> = {
      class10BoardMarksheet: 0,
      class10PreBoardMarksheet: 0,
      class8Marksheet: 0,
      class9Marksheet: 0,
    };

    for (const field of MARKSHEET_FIELDS) {
      const entry = formData.get(field);
      const label = MARKSHEET_LABELS[field];

      if (!(entry instanceof File)) {
        return NextResponse.json(
          { error: `${label} is required.` },
          { status: 400 },
        );
      }

      const fileError = validateMarksheetFile(entry, label);
      if (fileError) {
        return NextResponse.json({ error: fileError }, { status: 400 });
      }

      mediaIds[field] = await uploadMarksheet(
        entry,
        `${parsed.data.fullName} — ${label}`,
      );
    }

    const payload = await getPayloadClient();

    await payload.create({
      collection: "applications",
      data: {
        ...parsed.data,
        class10BoardMarksheet: mediaIds.class10BoardMarksheet,
        class10PreBoardMarksheet: mediaIds.class10PreBoardMarksheet,
        class8Marksheet: mediaIds.class8Marksheet,
        class9Marksheet: mediaIds.class9Marksheet,
        status: "new",
      },
      overrideAccess: true,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Apply submission failed:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Could not submit application. Please try again.",
      },
      { status: 500 },
    );
  }
}
