import type { HomeContent } from "@/types";

import { getCmsIconName, resolveCmsIcon } from "../icons";
import { hasText } from "./utils";

type HomeDoc = {
  hero?: {
    badge?: string | null;
    title?: string | null;
    highlightedTitle?: string | null;
    description?: string | null;
    primaryCta?: string | null;
    secondaryCta?: string | null;
    stats?: { value?: string | null; label?: string | null }[] | null;
  } | null;
  sections?: {
    scholarships?: { title?: string | null; description?: string | null } | null;
    benefits?: { title?: string | null; description?: string | null } | null;
    applicationProcess?: {
      title?: string | null;
      description?: string | null;
    } | null;
    faqs?: { title?: string | null; description?: string | null } | null;
  } | null;
  benefits?:
    | {
        title?: string | null;
        description?: string | null;
        icon?: string | null;
      }[]
    | null;
  applicationSteps?:
    | {
        title?: string | null;
        description?: string | null;
      }[]
    | null;
};

function mapSectionCopy(
  section:
    | { title?: string | null; description?: string | null }
    | null
    | undefined,
) {
  if (!hasText(section?.title)) {
    return null;
  }

  return {
    title: section.title,
    description: section.description ?? undefined,
  };
}

export function toHomeContent(doc: HomeDoc): HomeContent | null {
  const hero = doc.hero;
  if (
    !hasText(hero?.badge) ||
    !hasText(hero.title) ||
    !hasText(hero.highlightedTitle) ||
    !hasText(hero.description) ||
    !hasText(hero.primaryCta) ||
    !hasText(hero.secondaryCta)
  ) {
    return null;
  }

  const scholarships = mapSectionCopy(doc.sections?.scholarships);
  const benefitsSection = mapSectionCopy(doc.sections?.benefits);
  const applicationProcess = mapSectionCopy(doc.sections?.applicationProcess);
  const faqs = mapSectionCopy(doc.sections?.faqs);

  if (!scholarships || !benefitsSection || !applicationProcess || !faqs) {
    return null;
  }

  const stats =
    hero.stats
      ?.map((stat) => {
        if (!hasText(stat?.value) || !hasText(stat.label)) {
          return null;
        }

        return { value: stat.value, label: stat.label };
      })
      .filter((stat): stat is NonNullable<typeof stat> => Boolean(stat)) ?? [];

  const benefits =
    doc.benefits
      ?.map((benefit) => {
        if (!hasText(benefit?.title) || !hasText(benefit.description)) {
          return null;
        }

        return {
          title: benefit.title,
          description: benefit.description,
          icon: resolveCmsIcon(benefit.icon),
        };
      })
      .filter((benefit): benefit is NonNullable<typeof benefit> =>
        Boolean(benefit),
      ) ?? [];

  const applicationSteps =
    doc.applicationSteps
      ?.map((step) => {
        if (!hasText(step?.title) || !hasText(step.description)) {
          return null;
        }

        return {
          title: step.title,
          description: step.description,
        };
      })
      .filter((step): step is NonNullable<typeof step> => Boolean(step)) ?? [];

  if (!stats.length || !benefits.length || !applicationSteps.length) {
    return null;
  }

  return {
    hero: {
      badge: hero.badge,
      title: hero.title,
      highlightedTitle: hero.highlightedTitle,
      description: hero.description,
      primaryCta: hero.primaryCta,
      secondaryCta: hero.secondaryCta,
      stats,
    },
    sections: {
      scholarships,
      benefits: benefitsSection,
      applicationProcess,
      faqs,
    },
    benefits,
    applicationSteps,
  };
}

export function fromHomeContent(content: HomeContent) {
  return {
    hero: {
      ...content.hero,
      stats: content.hero.stats.map((stat) => ({
        value: stat.value,
        label: stat.label,
      })),
    },
    sections: {
      scholarships: { ...content.sections.scholarships },
      benefits: { ...content.sections.benefits },
      applicationProcess: { ...content.sections.applicationProcess },
      faqs: { ...content.sections.faqs },
    },
    benefits: content.benefits.map((benefit) => ({
      title: benefit.title,
      description: benefit.description,
      icon: getCmsIconName(benefit.icon),
    })),
    applicationSteps: content.applicationSteps.map((step) => ({
      title: step.title,
      description: step.description,
    })),
  };
}
