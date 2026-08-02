import type { Metadata } from "next";

import {
  getScholarshipPageContent,
  getSiteSettings,
} from "@/lib/cms";

import { ScholarshipGrid } from "@/components/scholarship/ScholarshipGrid";
import { ScholarshipHero } from "@/components/scholarship/ScholarshipHero";

export async function generateMetadata(): Promise<Metadata> {
  const [pageContent, site] = await Promise.all([
    getScholarshipPageContent(),
    getSiteSettings(),
  ]);

  return {
    title: `${pageContent.list.title} | ${site.name}`,
    description: pageContent.list.metaDescription,
  };
}

export default function ScholarshipsPage() {
  return (
    <>
      <ScholarshipHero />

      <ScholarshipGrid />
    </>
  );
}
