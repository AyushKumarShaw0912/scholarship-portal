import { navigation as staticNavigation } from "@/config/navigation";
import { siteConfig as staticSiteConfig } from "@/config/site";
import type { NavigationItem, SiteSettings } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toSiteSettings } from "../mappers/site";
import { publicReadOptions } from "../query";

function staticSiteSettings(): SiteSettings {
  return {
    name: staticSiteConfig.name,
    shortName: staticSiteConfig.shortName,
    description: staticSiteConfig.description,
    url: staticSiteConfig.url,
    logoUrl: staticSiteConfig.logoUrl,
    faviconUrl: staticSiteConfig.faviconUrl,
    email: staticSiteConfig.email,
    phone: staticSiteConfig.phone,
    address: staticSiteConfig.address,
    copyright: staticSiteConfig.copyright,
    applyUrl: staticSiteConfig.applyUrl,
    tagline: staticSiteConfig.tagline,
    locale: staticSiteConfig.locale,
    author: staticSiteConfig.author,
    keywords: [...staticSiteConfig.keywords],
    navigation: [...staticNavigation],
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({
        slug: "site",
        // Populate logo/favicon media so URLs are available
        depth: 1,
        ...publicReadOptions,
      });

      return toSiteSettings(doc);
    },
    staticSiteSettings,
    "site",
  );
}

export async function getNavigation(): Promise<readonly NavigationItem[]> {
  const site = await getSiteSettings();
  return site.navigation;
}
