export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function getApplyUrl(): string {
  return "/apply";
}

export type GmailConfig = {
  user: string;
  appPassword: string;
  fromName?: string;
};

/** Returns null when Gmail env is not configured (rest of app stays healthy). */
export function getGmailConfig(): GmailConfig | null {
  const user = process.env.GMAIL_USER?.trim();
  const appPassword = process.env.GMAIL_APP_PASSWORD?.trim();
  if (!user || !appPassword) {
    return null;
  }

  return {
    user,
    appPassword,
    fromName: process.env.GMAIL_FROM_NAME?.trim() || undefined,
  };
}
