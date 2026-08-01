import { contactContent as staticContactContent } from "@/data/contact";
import type { ContactContent } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toContactContent } from "../mappers/contact";

export async function getContactContent(): Promise<ContactContent> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({
        slug: "contact",
        depth: 0,
      });

      return toContactContent(doc);
    },
    () => staticContactContent,
    "contact",
  );
}
