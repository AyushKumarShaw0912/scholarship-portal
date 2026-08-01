import type { Metadata } from "next";

import { siteConfig } from "@/config";
import { scholarshipPageContent } from "@/data";

import { ScholarshipGrid } from "@/components/scholarship/ScholarshipGrid";
import { ScholarshipHero } from "@/components/scholarship/ScholarshipHero";

export const metadata: Metadata = {
  title: `${scholarshipPageContent.list.title} | ${siteConfig.name}`,
  description: scholarshipPageContent.list.metaDescription,
};

export default function ScholarshipsPage() {
  return (
    <>
      <ScholarshipHero />

      <ScholarshipGrid />
    </>
  );
}
