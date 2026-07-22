import type { Metadata } from "next";

import { siteConfig } from "@/config";

import { ScholarshipGrid } from "@/components/scholarship/ScholarshipGrid";
import { ScholarshipHero } from "@/components/scholarship/ScholarshipHero";

export const metadata: Metadata = {
  title: `Scholarships | ${siteConfig.name}`,

  description:
    "Browse all available scholarships, review eligibility, benefits, required documents and application details.",
};

export default function ScholarshipsPage() {
  return (
    <>
      <ScholarshipHero />

      <ScholarshipGrid />
    </>
  );
}
