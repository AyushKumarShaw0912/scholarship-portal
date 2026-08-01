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

async function seedScholarships() {
  const payload = await getPayloadClient();

  for (const scholarship of scholarships) {
    const existing = await payload.find({
      collection: "scholarships",
      where: {
        slug: {
          equals: scholarship.slug,
        },
      },
      limit: 1,
    });

    const data = fromScholarship(scholarship);

    if (existing.docs[0]) {
      await payload.update({
        collection: "scholarships",
        id: existing.docs[0].id,
        data,
      });
      console.log(`Updated scholarship: ${scholarship.slug}`);
    } else {
      await payload.create({
        collection: "scholarships",
        data,
      });
      console.log(`Created scholarship: ${scholarship.slug}`);
    }
  }
}

async function seedGlobals() {
  const payload = await getPayloadClient();

  await payload.updateGlobal({
    slug: "site",
    data: fromSiteSettings(siteConfig, navigation),
  });
  console.log("Updated global: site");

  await payload.updateGlobal({
    slug: "home",
    data: fromHomeContent(homeContent),
  });
  console.log("Updated global: home");

  await payload.updateGlobal({
    slug: "about",
    data: fromAboutContent(aboutContent),
  });
  console.log("Updated global: about");

  await payload.updateGlobal({
    slug: "contact",
    data: fromContactContent(contactContent),
  });
  console.log("Updated global: contact");

  await payload.updateGlobal({
    slug: "faq",
    data: fromFaqContent(faqContent),
  });
  console.log("Updated global: faq");

  await payload.updateGlobal({
    slug: "scholarship-page",
    data: fromScholarshipPageContent(scholarshipPageContent),
  });
  console.log("Updated global: scholarship-page");
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
  console.error("Seed failed:", error);
  process.exit(1);
});
