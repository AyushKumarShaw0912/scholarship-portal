import type { ContactContent } from "@/types";

import { getCmsIconName, resolveCmsIcon } from "../icons";
import { hasText, toStringList } from "./utils";

type ContactDoc = {
  meta?: { title?: string | null; description?: string | null } | null;
  heading?: { title?: string | null; description?: string | null } | null;
  infoItems?:
    | {
        itemId?: string | null;
        title?: string | null;
        icon?: string | null;
        type?: "email" | "phone" | "address" | null;
        lines?: { value?: string | null }[] | null;
      }[]
    | null;
  enquiry?: { title?: string | null; body?: string | null } | null;
};

export function toContactContent(doc: ContactDoc): ContactContent | null {
  if (
    !hasText(doc.meta?.title) ||
    !hasText(doc.heading?.title) ||
    !hasText(doc.enquiry?.title) ||
    !hasText(doc.enquiry.body)
  ) {
    return null;
  }

  const infoItems =
    doc.infoItems
      ?.map((item) => {
        if (
          !hasText(item?.itemId) ||
          !hasText(item.title) ||
          !item.type ||
          !["email", "phone", "address"].includes(item.type)
        ) {
          return null;
        }

        const lines =
          item.lines
            ?.map((line) => line?.value?.trim())
            .filter((value): value is string => Boolean(value)) ?? [];

        return {
          id: item.itemId,
          title: item.title,
          icon: resolveCmsIcon(item.icon),
          type: item.type,
          lines: lines.length ? lines : undefined,
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item)) ?? [];

  if (!infoItems.length) {
    return null;
  }

  return {
    meta: {
      title: doc.meta.title,
      description: doc.meta.description ?? undefined,
    },
    heading: {
      title: doc.heading.title,
      description: doc.heading.description ?? undefined,
    },
    infoItems,
    enquiry: {
      title: doc.enquiry.title,
      body: doc.enquiry.body,
    },
  };
}

export function fromContactContent(content: ContactContent) {
  return {
    meta: { ...content.meta },
    heading: { ...content.heading },
    infoItems: content.infoItems.map((item) => ({
      itemId: item.id,
      title: item.title,
      icon: getCmsIconName(item.icon),
      type: item.type,
      lines: item.lines ? toStringList(item.lines) : [],
    })),
    enquiry: { ...content.enquiry },
  };
}
