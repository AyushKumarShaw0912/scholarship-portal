import { aboutContent as staticAboutContent } from "@/data/about";
import type { AboutContent } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toAboutContent } from "../mappers/about";
import { publicReadOptions } from "../query";

export async function getAboutContent(): Promise<AboutContent> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({
        slug: "about",
        depth: 0,
        ...publicReadOptions,
      });

      return toAboutContent(doc);
    },
    () => staticAboutContent,
    "about",
  );
}
