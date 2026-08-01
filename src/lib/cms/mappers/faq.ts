import type { FaqContent } from "@/types";

import { hasText, toStringList } from "./utils";

type FaqDoc = {
  meta?: { title?: string | null; description?: string | null } | null;
  heading?: { title?: string | null; description?: string | null } | null;
  items?:
    | {
        question?: string | null;
        answer?: string | null;
      }[]
    | null;
  homePreviewQuestions?: { value?: string | null }[] | null;
};

export function toFaqContent(doc: FaqDoc): FaqContent | null {
  if (!hasText(doc.meta?.title) || !hasText(doc.heading?.title)) {
    return null;
  }

  const items =
    doc.items
      ?.map((item) => {
        if (!hasText(item?.question) || !hasText(item.answer)) {
          return null;
        }

        return {
          question: item.question,
          answer: item.answer,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];

  if (!items.length) {
    return null;
  }

  const homePreviewQuestions =
    doc.homePreviewQuestions
      ?.map((item) => item?.value?.trim())
      .filter((value): value is string => Boolean(value)) ?? [];

  return {
    meta: {
      title: doc.meta.title,
      description: doc.meta.description ?? undefined,
    },
    heading: {
      title: doc.heading.title,
      description: doc.heading.description ?? undefined,
    },
    items,
    homePreviewQuestions,
  };
}

export function fromFaqContent(content: FaqContent) {
  return {
    meta: { ...content.meta },
    heading: { ...content.heading },
    items: content.items.map((item) => ({
      question: item.question,
      answer: item.answer,
    })),
    homePreviewQuestions: toStringList([...content.homePreviewQuestions]),
  };
}
