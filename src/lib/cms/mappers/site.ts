import { getAppUrl, getApplyUrl } from "@/lib/env";
import type { NavigationItem, SiteSettings } from "@/types";
import type { siteConfig } from "@/config/site";
import type { navigation } from "@/config/navigation";

import { hasText, mapStringList, toStringList } from "./utils";

type SiteDoc = {
  name?: string | null;
  shortName?: string | null;
  description?: string | null;
  tagline?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  applyUrl?: string | null;
  logo?: string | null;
  favicon?: string | null;
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

export function toSiteSettings(doc: SiteDoc): SiteSettings | null {
  if (
    !hasText(doc.name) ||
    !hasText(doc.shortName) ||
    !hasText(doc.description) ||
    !hasText(doc.tagline) ||
    !hasText(doc.email) ||
    !hasText(doc.phone) ||
    !hasText(doc.address) ||
    !hasText(doc.applyUrl) ||
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
    logo: doc.logo || "/images/logo.svg",
    favicon: doc.favicon || "/favicon.ico",
    email: doc.email,
    phone: doc.phone,
    address: doc.address,
    copyright: `© ${year} ${doc.name}. All rights reserved.`,
    applyUrl: doc.applyUrl || getApplyUrl(),
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
    applyUrl: site.applyUrl || getApplyUrl(),
    logo: site.logo,
    favicon: site.favicon,
    locale: site.locale,
    author: site.author,
    keywords: toStringList([...site.keywords]),
    navigation: nav.map((item) => ({
      title: item.title,
      href: item.href,
    })),
  };
}
