function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getPayloadSecret(): string {
  return required("PAYLOAD_SECRET", process.env.PAYLOAD_SECRET);
}

export function getDatabaseUrl(): string {
  return required("DATABASE_URL", process.env.DATABASE_URL);
}

export function getAppUrl(): string {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}

export function getApplyUrl(): string {
  return "/apply";
}
