import { hasText } from "./utils";

export type MediaRef =
  | number
  | string
  | {
      url?: string | null;
      cloudinaryUrl?: string | null;
      sizes?: {
        logo?: {
          url?: string | null;
          cloudinaryUrl?: string | null;
        } | null;
        thumbnail?: {
          url?: string | null;
          cloudinaryUrl?: string | null;
        } | null;
      } | null;
    }
  | null
  | undefined;

function firstUrl(
  ...candidates: Array<string | null | undefined>
): string | null {
  for (const candidate of candidates) {
    if (hasText(candidate)) {
      return candidate;
    }
  }

  return null;
}

export function mediaUrl(
  value: MediaRef,
  preferredSize?: "logo" | "thumbnail",
): string | null {
  if (!value || typeof value === "number" || typeof value === "string") {
    return null;
  }

  if (preferredSize === "logo") {
    const sized = firstUrl(
      value.sizes?.logo?.url,
      value.sizes?.logo?.cloudinaryUrl,
    );
    if (sized) {
      return sized;
    }
  }

  if (preferredSize === "thumbnail") {
    const sized = firstUrl(
      value.sizes?.thumbnail?.url,
      value.sizes?.thumbnail?.cloudinaryUrl,
    );
    if (sized) {
      return sized;
    }
  }

  return firstUrl(value.url, value.cloudinaryUrl);
}
