import { scholarships } from "@/data/scholarships";

export function getScholarshipBySlug(slug: string) {
  return scholarships.find((scholarship) => scholarship.slug === slug);
}

export function getActiveScholarships() {
  return scholarships.filter((scholarship) => scholarship.isActive);
}
