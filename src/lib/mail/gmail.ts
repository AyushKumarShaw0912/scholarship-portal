import nodemailer from "nodemailer";

import { getGmailConfig } from "@/lib/env";

export type SendMailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
  fromName?: string;
};

export async function sendGmailMail(input: SendMailInput): Promise<void> {
  const config = getGmailConfig();
  if (!config) {
    throw new Error(
      "Gmail is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in the environment.",
    );
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: config.user,
      pass: config.appPassword,
    },
  });

  const fromName = input.fromName || config.fromName || "Scholarship Portal";
  await transporter.sendMail({
    from: `"${fromName}" <${config.user}>`,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}
