import type { AboutContent } from "@/types";

import { hasText, toStringList } from "./utils";

type AboutDoc = {
  meta?: { title?: string | null; description?: string | null } | null;
  heading?: { title?: string | null; description?: string | null } | null;
  sections?:
    | {
        title?: string | null;
        body?: string | null;
        items?: { value?: string | null }[] | null;
      }[]
    | null;
};

export function toAboutContent(doc: AboutDoc): AboutContent | null {
  if (!hasText(doc.meta?.title) || !hasText(doc.heading?.title)) {
    return null;
  }

  const sections =
    doc.sections
      ?.map((section) => {
        if (!hasText(section?.title)) {
          return null;
        }

        const items =
          section.items
            ?.map((item) => item?.value?.trim())
            .filter((value): value is string => Boolean(value)) ?? [];

        return {
          title: section.title,
          body: section.body ?? undefined,
          items: items.length ? items : undefined,
        };
      })
      .filter((section): section is NonNullable<typeof section> =>
        Boolean(section),
      ) ?? [];

  if (!sections.length) {
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
    sections,
  };
}

export function fromAboutContent(content: AboutContent) {
  return {
    meta: { ...content.meta },
    heading: { ...content.heading },
    sections: content.sections.map((section) => ({
      title: section.title,
      body: section.body,
      items: section.items ? toStringList(section.items) : [],
    })),
  };
}
