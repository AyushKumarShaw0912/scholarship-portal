import { applyContent as staticApplyContent } from "@/data/apply";
import type { ApplyContent } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toApplyContent } from "../mappers/apply";
import { publicReadOptions } from "../query";

export async function getApplyContent(): Promise<ApplyContent> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({
        slug: "apply",
        depth: 0,
        ...publicReadOptions,
      });

      return toApplyContent(doc);
    },
    () => staticApplyContent,
    "apply",
  );
}
