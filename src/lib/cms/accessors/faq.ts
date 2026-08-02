import { faqContent as staticFaqContent } from "@/data/faq";
import type { FaqContent, FaqItem } from "@/types";

import { getPayloadClient } from "../client";
import { withCmsFallback } from "../fallback";
import { toFaqContent } from "../mappers/faq";
import { publicReadOptions } from "../query";

export async function getFaqContent(): Promise<FaqContent> {
  return withCmsFallback(
    async () => {
      const payload = await getPayloadClient();
      const doc = await payload.findGlobal({
        slug: "faq",
        depth: 0,
        ...publicReadOptions,
      });

      return toFaqContent(doc);
    },
    () => staticFaqContent,
    "faq",
  );
}

export async function getFaqHomePreview(): Promise<readonly FaqItem[]> {
  const content = await getFaqContent();
  const byQuestion = new Map(
    content.items.map((item) => [item.question, item]),
  );

  return content.homePreviewQuestions.flatMap((question) => {
    const item = byQuestion.get(question);
    return item ? [item] : [];
  });
}
