import "dotenv/config";

import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { aboutContent } from "@/data/about";
import { contactContent } from "@/data/contact";
import { faqContent } from "@/data/faq";
import { homeContent } from "@/data/home";
import { scholarshipPageContent } from "@/data/scholarship-page";
import { scholarships } from "@/data/scholarships";
import {
  fromAboutContent,
  fromContactContent,
  fromFaqContent,
  fromHomeContent,
  fromScholarship,
  fromScholarshipPageContent,
  fromSiteSettings,
  getPayloadClient,
} from "@/lib/cms";
import type { Payload } from "payload";

const published = { _status: "published" as const };

function formatPayloadError(error: unknown): string {
  if (
    error &&
    typeof error === "object" &&
    "data" in error &&
    error.data &&
    typeof error.data === "object" &&
    "errors" in error.data &&
    Array.isArray(error.data.errors)
  ) {
    return error.data.errors
      .map((item: { field?: string; message?: string }) =>
        [item.field, item.message].filter(Boolean).join(": "),
      )
      .join("; ");
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

async function findScholarshipBySlug(payload: Payload, slug: string) {
  // Main collection (published / latest saved). Do NOT use draft:true here —
  // that only returns version rows and can miss existing docs → unique slug errors.
  const result = await payload.find({
    collection: "scholarships",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    depth: 0,
    draft: false,
    overrideAccess: true,
  });

  return result.docs[0] ?? null;
}

async function seedScholarships() {
  const payload = await getPayloadClient();

  for (const scholarship of scholarships) {
    const data = {
      ...fromScholarship(scholarship),
      ...published,
    };

    const existing = await findScholarshipBySlug(payload, scholarship.slug);

    if (existing) {
      await payload.update({
        collection: "scholarships",
        id: existing.id,
        data,
        draft: false,
        overrideAccess: true,
      });
      console.log(`Updated scholarship: ${scholarship.slug}`);
      continue;
    }

    try {
      await payload.create({
        collection: "scholarships",
        data,
        draft: false,
        overrideAccess: true,
      });
      console.log(`Created scholarship: ${scholarship.slug}`);
    } catch (error) {
      // Race / leftover row: unique slug → update instead
      const retry = await findScholarshipBySlug(payload, scholarship.slug);
      if (!retry) {
        throw new Error(
          `Failed to create scholarship "${scholarship.slug}": ${formatPayloadError(error)}`,
        );
      }

      await payload.update({
        collection: "scholarships",
        id: retry.id,
        data,
        draft: false,
        overrideAccess: true,
      });
      console.log(`Updated scholarship (after conflict): ${scholarship.slug}`);
    }
  }
}

async function seedGlobals() {
  const payload = await getPayloadClient();

  const globals = [
    {
      slug: "site" as const,
      data: { ...fromSiteSettings(siteConfig, navigation), ...published },
    },
    {
      slug: "home" as const,
      data: { ...fromHomeContent(homeContent), ...published },
    },
    {
      slug: "about" as const,
      data: { ...fromAboutContent(aboutContent), ...published },
    },
    {
      slug: "contact" as const,
      data: { ...fromContactContent(contactContent), ...published },
    },
    {
      slug: "faq" as const,
      data: { ...fromFaqContent(faqContent), ...published },
    },
    {
      slug: "scholarship-page" as const,
      data: {
        ...fromScholarshipPageContent(scholarshipPageContent),
        ...published,
      },
    },
  ];

  for (const global of globals) {
    await payload.updateGlobal({
      slug: global.slug,
      data: global.data,
      draft: false,
      overrideAccess: true,
    });
    console.log(`Updated global: ${global.slug}`);
  }
}

async function seed() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is required to seed the CMS.");
  }

  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET is required to seed the CMS.");
  }

  console.log("Seeding Payload CMS from static data...");
  await seedScholarships();
  await seedGlobals();
  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", formatPayloadError(error));
  if (error && typeof error === "object" && "data" in error) {
    console.error(JSON.stringify((error as { data: unknown }).data, null, 2));
  }
  process.exit(1);
});
