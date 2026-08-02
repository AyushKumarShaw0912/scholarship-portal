import type { MetadataRoute } from "next";

import { getScholarships, getSiteSettings } from "@/lib/cms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [site, scholarships] = await Promise.all([
    getSiteSettings(),
    getScholarships(),
  ]);

  const routes = ["", "/about", "/contact", "/scholarships", "/faq"];

  const pages = routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const scholarshipPages = scholarships.map((scholarship) => ({
    url: `${site.url}/scholarships/${scholarship.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [...pages, ...scholarshipPages];
}
