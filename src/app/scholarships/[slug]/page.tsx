import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import { scholarships, uiCopy } from "@/data";
import { getScholarshipBySlug } from "@/lib/scholarships";

import { ScholarshipHeader } from "@/components/scholarship/ScholarshipHeader";
import { ScholarshipDetails } from "@/components/scholarship/ScholarshipDetails";

export async function generateStaticParams() {
  return scholarships.map((scholarship) => ({
    slug: scholarship.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/scholarships/[slug]">): Promise<Metadata> {
  const { slug } = await params;

  const scholarship = getScholarshipBySlug(slug);

  if (!scholarship) {
    return {
      title: uiCopy.scholarshipNotFound,
    };
  }

  return {
    title: `${scholarship.title} | ${siteConfig.name}`,
    description: scholarship.shortDescription,
  };
}

export default async function ScholarshipPage({
  params,
}: PageProps<"/scholarships/[slug]">) {
  const { slug } = await params;

  const scholarship = getScholarshipBySlug(slug);

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
