import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { siteConfig } from "@/config";
import { scholarships } from "@/data";

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

  const scholarship = scholarships.find((item) => item.slug === slug);

  if (!scholarship) {
    return {
      title: "Scholarship Not Found",
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

  const scholarship = scholarships.find((item) => item.slug === slug);

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
