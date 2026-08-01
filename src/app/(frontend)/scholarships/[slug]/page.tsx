import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { uiCopy } from "@/data";
import {
  getAllScholarshipSlugs,
  getScholarshipBySlug,
  getSiteSettings,
} from "@/lib/cms";

import { ScholarshipHeader } from "@/components/scholarship/ScholarshipHeader";
import { ScholarshipDetails } from "@/components/scholarship/ScholarshipDetails";

export async function generateStaticParams() {
  const slugs = await getAllScholarshipSlugs();

  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/scholarships/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [scholarship, site] = await Promise.all([
    getScholarshipBySlug(slug),
    getSiteSettings(),
  ]);

  if (!scholarship) {
    return {
      title: uiCopy.scholarshipNotFound,
    };
  }

  return {
    title: `${scholarship.title} | ${site.name}`,
    description: scholarship.shortDescription,
  };
}

export default async function ScholarshipPage({
  params,
}: PageProps<"/scholarships/[slug]">) {
  const { slug } = await params;
  const scholarship = await getScholarshipBySlug(slug);

  if (!scholarship) {
    notFound();
  }

  return (
    <>
      <ScholarshipHeader scholarship={scholarship} />

      <ScholarshipDetails scholarship={scholarship} />
    </>
  );
}
