import { scholarshipPageContent as staticScholarshipPageContent } from "@/data/scholarship-page";
import type { ScholarshipPageContent } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toScholarshipPageContent } from "../mappers/scholarship-page";
import { publicReadOptions } from "../query";

export async function getScholarshipPageContent(): Promise<ScholarshipPageContent> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({
        slug: "scholarship-page",
        depth: 0,
        ...publicReadOptions,
      });

      return toScholarshipPageContent(doc);
    },
    () => staticScholarshipPageContent,
    "scholarship-page",
  );
}
