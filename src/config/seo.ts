import type { Metadata } from "next";

import { siteConfig } from "./site";

export const defaultSEO: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [...siteConfig.keywords],

  applicationName: siteConfig.name,

  authors: [
    {
      name: siteConfig.author,
    },
  ],

  creator: siteConfig.author,

  publisher: siteConfig.author,

  openGraph: {
    type: "website",

    locale: siteConfig.locale,

    url: siteConfig.url,

    title: siteConfig.name,

    description: siteConfig.description,

    siteName: siteConfig.name,
  },

  twitter: {
    card: "summary_large_image",

    title: siteConfig.name,

    description: siteConfig.description,
  },

  robots: {
    index: true,
    follow: true,
  },
};
