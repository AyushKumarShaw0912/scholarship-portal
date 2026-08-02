import config from "@payload-config";
import { getPayload, type Payload } from "payload";

let payloadPromise: Promise<Payload> | null = null;

export async function getPayloadClient(): Promise<Payload> {
  if (!process.env.DATABASE_URL?.trim()) {
    throw new Error("DATABASE_URL is not configured");
  }

  if (!payloadPromise) {
    payloadPromise = getPayload({ config }).catch((error: unknown) => {
      payloadPromise = null;
      throw error;
    });
  }

  return payloadPromise;
}
