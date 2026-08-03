import { convertLexicalToHTML } from "@payloadcms/richtext-lexical/html";

const DEFAULT_SUBJECT = "Next step: complete your scholarship form";

type LexicalEditorState = {
  root: {
    type: string;
    children: unknown[];
    direction: ("ltr" | "rtl") | null;
    format: string | number;
    indent: number;
    version: number;
  };
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isLexicalState(value: unknown): value is LexicalEditorState {
  return Boolean(
    value &&
      typeof value === "object" &&
      "root" in value &&
      (value as { root?: unknown }).root &&
      typeof (value as { root: unknown }).root === "object",
  );
}

function defaultHtml(vars: { fullName: string; formUrl: string }): string {
  const name = escapeHtml(vars.fullName);
  const url = escapeHtml(vars.formUrl);
  return `<p>Hi ${name},</p>
<p>Congratulations — you have been shortlisted. Please complete this form with a few basic details and documents:</p>
<p><a href="${url}">${url}</a></p>
<p>Thank you.</p>`;
}

function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<a[^>]+href="([^"]+)"[^>]*>.*?<\/a>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function applyHtmlPlaceholders(
  template: string,
  vars: { fullName: string; formUrl: string },
): string {
  const formLink = `<a href="${escapeHtml(vars.formUrl)}">${escapeHtml(vars.formUrl)}</a>`;
  return template
    .replaceAll("{{fullName}}", escapeHtml(vars.fullName))
    .replaceAll("{{formUrl}}", formLink);
}

export function buildShortlistInviteEmail(args: {
  fullName: string;
  formUrl: string;
  subject?: string | null;
  body?: unknown;
}): { subject: string; html: string; text: string } {
  const vars = {
    fullName: args.fullName.trim() || "Applicant",
    formUrl: args.formUrl.trim(),
  };

  const subjectTemplate = args.subject?.trim() || DEFAULT_SUBJECT;
  const subject = subjectTemplate
    .replaceAll("{{fullName}}", vars.fullName)
    .replaceAll("{{formUrl}}", vars.formUrl);

  let html: string;
  if (isLexicalState(args.body)) {
    const converted = convertLexicalToHTML({
      data: args.body as Parameters<typeof convertLexicalToHTML>[0]["data"],
      disableContainer: true,
    });
    html = applyHtmlPlaceholders(converted, vars);
  } else {
    html = defaultHtml(vars);
  }

  return {
    subject,
    html,
    text: htmlToText(html),
  };
}
