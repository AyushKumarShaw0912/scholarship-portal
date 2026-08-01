import { scholarships as staticScholarships } from "@/data/scholarships";
import type { Scholarship } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toScholarship } from "../mappers/scholarship";

async function fetchScholarshipsFromCms(
  activeOnly: boolean,
): Promise<Scholarship[] | null> {
  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "scholarships",
    depth: 0,
    limit: 100,
    pagination: false,
    where: activeOnly
      ? {
          isActive: {
            equals: true,
          },
        }
      : undefined,
    sort: "title",
  });

  if (!result.docs.length) {
    return null;
  }

  const mapped = result.docs
    .map((doc) => toScholarship(doc))
    .filter((doc): doc is Scholarship => Boolean(doc));

  return mapped.length ? mapped : null;
}

export async function getScholarships(): Promise<Scholarship[]> {
  return withCmsFallback(
    () => fetchScholarshipsFromCms(false),
    () => [...staticScholarships],
    "scholarships",
  );
}

export async function getActiveScholarships(): Promise<Scholarship[]> {
  return withCmsFallback(
    () => fetchScholarshipsFromCms(true),
    () => staticScholarships.filter((scholarship) => scholarship.isActive),
    "active-scholarships",
  );
}

export async function getScholarshipBySlug(
  slug: string,
): Promise<Scholarship | null> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const result = await payload.find({
        collection: "scholarships",
        depth: 0,
        limit: 1,
        where: {
          slug: {
            equals: slug,
          },
        },
      });

      const doc = result.docs[0];
      if (!doc) {
        return null;
      }

      return toScholarship(doc);
    },
    () => staticScholarships.find((item) => item.slug === slug) ?? null,
    `scholarship:${slug}`,
  );
}

export async function getAllScholarshipSlugs(): Promise<string[]> {
  const scholarships = await getScholarships();
  return scholarships.map((scholarship) => scholarship.slug);
}
