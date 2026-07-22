import type { MetadataRoute } from "next";

import { siteConfig } from "@/config";
import { scholarships } from "@/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/contact", "/scholarships"];

  const pages = routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const scholarshipPages = scholarships.map((scholarship) => ({
    url: `${siteConfig.url}/scholarships/${scholarship.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...pages, ...scholarshipPages];
}
