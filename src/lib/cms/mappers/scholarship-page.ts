import type { ScholarshipPageContent } from "@/types";

import { getCmsIconName, resolveCmsIcon } from "../icons";
import { hasText } from "./utils";

type ScholarshipPageDoc = {
  list?: {
    title?: string | null;
    description?: string | null;
    metaDescription?: string | null;
  } | null;
  detail?: {
    sectionTitles?: {
      benefits?: string | null;
      eligibility?: string | null;
      faculty?: string | null;
      documents?: string | null;
      selectionProcess?: string | null;
    } | null;
    sidebar?: {
      title?: string | null;
      description?: string | null;
      footerNote?: string | null;
      features?:
        | {
            label?: string | null;
            icon?: string | null;
          }[]
        | null;
    } | null;
  } | null;
};

export function toScholarshipPageContent(
  doc: ScholarshipPageDoc,
): ScholarshipPageContent | null {
  const list = doc.list;
  const titles = doc.detail?.sectionTitles;
  const sidebar = doc.detail?.sidebar;

  if (
    !hasText(list?.title) ||
    !hasText(list.description) ||
    !hasText(list.metaDescription) ||
    !hasText(titles?.benefits) ||
    !hasText(titles.eligibility) ||
    !hasText(titles.faculty) ||
    !hasText(titles.documents) ||
    !hasText(titles.selectionProcess) ||
    !hasText(sidebar?.title) ||
    !hasText(sidebar.description) ||
    !hasText(sidebar.footerNote)
  ) {
    return null;
  }

  const features =
    sidebar.features
      ?.map((feature) => {
        if (!hasText(feature?.label)) {
          return null;
        }

        return {
          label: feature.label,
          icon: resolveCmsIcon(feature.icon),
        };
      })
      .filter((feature): feature is NonNullable<typeof feature> =>
        Boolean(feature),
      ) ?? [];

  if (!features.length) {
    return null;
  }

  return {
    list: {
      title: list.title,
      description: list.description,
      metaDescription: list.metaDescription,
    },
    detail: {
      sectionTitles: {
        benefits: titles.benefits,
        eligibility: titles.eligibility,
        faculty: titles.faculty,
        documents: titles.documents,
        selectionProcess: titles.selectionProcess,
      },
      sidebar: {
        title: sidebar.title,
        description: sidebar.description,
        features,
        footerNote: sidebar.footerNote,
      },
    },
  };
}

export function fromScholarshipPageContent(content: ScholarshipPageContent) {
  return {
    list: { ...content.list },
    detail: {
      sectionTitles: { ...content.detail.sectionTitles },
      sidebar: {
        title: content.detail.sidebar.title,
        description: content.detail.sidebar.description,
        footerNote: content.detail.sidebar.footerNote,
        features: content.detail.sidebar.features.map((feature) => ({
          label: feature.label,
          icon: getCmsIconName(feature.icon),
        })),
      },
    },
  };
}
