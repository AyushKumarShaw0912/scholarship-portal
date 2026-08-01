import type { MetadataRoute } from "next";

import { getSiteSettings } from "@/lib/cms";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSiteSettings();
  const iconSrc = site.faviconUrl ?? site.logoUrl;

  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#2563eb",
    lang: "en",
    ...(iconSrc
      ? {
          icons: [
            {
              src: iconSrc,
              sizes: "any",
              type: "image/png",
              purpose: "any",
            },
          ],
        }
      : {}),
  };
}
