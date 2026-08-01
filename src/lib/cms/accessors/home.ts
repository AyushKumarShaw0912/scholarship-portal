import { homeContent as staticHomeContent } from "@/data/home";
import type { HomeContent } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toHomeContent } from "../mappers/home";

export async function getHomeContent(): Promise<HomeContent> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({
        slug: "home",
        depth: 0,
      });

      return toHomeContent(doc);
    },
    () => staticHomeContent,
    "home",
  );
}
