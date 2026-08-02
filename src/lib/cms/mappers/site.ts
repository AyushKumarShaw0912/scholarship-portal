import { getAppUrl, getApplyUrl } from "@/lib/env";
import type { NavigationItem, SiteSettings } from "@/types";
import type { siteConfig } from "@/config/site";
import type { navigation } from "@/config/navigation";

import { hasText, mapStringList, toStringList } from "./utils";

type MediaRef =
  | number
  | string
  | {
      url?: string | null;
      sizes?: {
        logo?: { url?: string | null } | null;
        thumbnail?: { url?: string | null } | null;
      } | null;
    }
  | null
  | undefined;

type SiteDoc = {
  name?: string | null;
  shortName?: string | null;
  description?: string | null;
  tagline?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  applyUrl?: string | null;
  logo?: MediaRef;
  favicon?: MediaRef;
  locale?: string | null;
  author?: string | null;
  keywords?: { value?: string | null }[] | null;
  navigation?:
    | {
        title?: string | null;
        href?: string | null;
      }[]
    | null;
};

function mediaUrl(
  value: MediaRef,
  preferredSize?: "logo" | "thumbnail",
): string | null {
  if (!value || typeof value === "number" || typeof value === "string") {
    return null;
  }

  if (preferredSize === "logo" && hasText(value.sizes?.logo?.url)) {
    return value.sizes.logo.url;
  }

  if (preferredSize === "thumbnail" && hasText(value.sizes?.thumbnail?.url)) {
    return value.sizes.thumbnail.url;
  }

  return hasText(value.url) ? value.url : null;
}

export function toSiteSettings(doc: SiteDoc): SiteSettings | null {
  if (
    !hasText(doc.name) ||
    !hasText(doc.shortName) ||
    !hasText(doc.description) ||
    !hasText(doc.tagline) ||
    !hasText(doc.email) ||
    !hasText(doc.phone) ||
    !hasText(doc.address) ||
    !hasText(doc.author)
  ) {
    return null;
  }

  const navItems: NavigationItem[] =
    doc.navigation
      ?.map((item) => {
        if (!hasText(item?.title) || !hasText(item.href)) {
          return null;
        }

        return {
          title: item.title,
          href: item.href,
        };
      })
      .filter((item): item is NavigationItem => Boolean(item)) ?? [];

  if (!navItems.length) {
    return null;
  }

  const year = new Date().getFullYear();

  return {
    name: doc.name,
    shortName: doc.shortName,
    description: doc.description,
    url: getAppUrl(),
    logoUrl: mediaUrl(doc.logo, "logo"),
    faviconUrl: mediaUrl(doc.favicon),
    email: doc.email,
    phone: doc.phone,
    address: doc.address,
    copyright: `© ${year} ${doc.name}. All rights reserved.`,
    applyUrl: getApplyUrl(),
    tagline: doc.tagline,
    locale: doc.locale || "en-IN",
    author: doc.author,
    keywords: mapStringList(doc.keywords),
    navigation: navItems,
  };
}

export function fromSiteSettings(
  site: typeof siteConfig,
  nav: typeof navigation,
) {
  return {
    name: site.name,
    shortName: site.shortName,
    description: site.description,
    tagline: site.tagline,
    email: site.email,
    phone: site.phone,
    address: site.address,
    applyUrl: getApplyUrl(),
    locale: site.locale,
    author: site.author,
    keywords: toStringList([...site.keywords]),
    navigation: nav.map((item) => ({
      title: item.title,
      href: item.href,
    })),
  };
}
