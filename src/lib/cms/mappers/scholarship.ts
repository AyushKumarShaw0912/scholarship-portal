import type { Scholarship } from "@/types";

import { hasText, mapStringList } from "./utils";

type ScholarshipDoc = {
  id: number | string;
  slug?: string | null;
  title?: string | null;
  shortDescription?: string | null;
  description?: string | null;
  applyUrl?: string | null;
  isActive?: boolean | null;
  eligibility?: { value?: string | null }[] | null;
  benefits?:
    | {
        itemId?: string | null;
        title?: string | null;
        description?: string | null;
      }[]
    | null;
  teachers?:
    | {
        subject?: string | null;
        name?: string | null;
      }[]
    | null;
  requiredDocuments?:
    | {
        itemId?: string | null;
        title?: string | null;
        description?: string | null;
        required?: boolean | null;
      }[]
    | null;
  selectionProcess?: { value?: string | null }[] | null;
  faqs?:
    | {
        question?: string | null;
        answer?: string | null;
      }[]
    | null;
};

export function toScholarship(doc: ScholarshipDoc): Scholarship | null {
  if (
    !hasText(doc.slug) ||
    !hasText(doc.title) ||
    !hasText(doc.shortDescription) ||
    !hasText(doc.description) ||
    !hasText(doc.applyUrl)
  ) {
    return null;
  }

  const eligibility = mapStringList(doc.eligibility);
  const selectionProcess = mapStringList(doc.selectionProcess);
  const benefits =
    doc.benefits
      ?.map((benefit) => {
        if (!hasText(benefit?.itemId) || !hasText(benefit.title)) {
          return null;
        }

        return {
          id: benefit.itemId,
          title: benefit.title,
          description: benefit.description ?? undefined,
        };
      })
      .filter((benefit): benefit is NonNullable<typeof benefit> =>
        Boolean(benefit),
      ) ?? [];

  const teachers =
    doc.teachers
      ?.map((teacher) => {
        if (!hasText(teacher?.subject) || !hasText(teacher.name)) {
          return null;
        }

        return {
          subject: teacher.subject,
          name: teacher.name,
        };
      })
      .filter((teacher): teacher is NonNullable<typeof teacher> =>
        Boolean(teacher),
      ) ?? [];

  const requiredDocuments =
    doc.requiredDocuments
      ?.map((document) => {
        if (!hasText(document?.itemId) || !hasText(document.title)) {
          return null;
        }

        return {
          id: document.itemId,
          title: document.title,
          description: document.description ?? undefined,
          required: Boolean(document.required),
        };
      })
      .filter((document): document is NonNullable<typeof document> =>
        Boolean(document),
      ) ?? [];

  const faqs =
    doc.faqs
      ?.map((faq) => {
        if (!hasText(faq?.question) || !hasText(faq.answer)) {
          return null;
        }

        return {
          question: faq.question,
          answer: faq.answer,
        };
      })
      .filter((faq): faq is NonNullable<typeof faq> => Boolean(faq)) ?? [];

  if (
    !eligibility.length ||
    !benefits.length ||
    !teachers.length ||
    !requiredDocuments.length ||
    !selectionProcess.length
  ) {
    return null;
  }

  return {
    id: String(doc.id),
    slug: doc.slug,
    title: doc.title,
    shortDescription: doc.shortDescription,
    description: doc.description,
    applyUrl: doc.applyUrl,
    isActive: doc.isActive ?? true,
    eligibility,
    benefits,
    teachers,
    requiredDocuments,
    selectionProcess,
    faqs: faqs.length ? faqs : undefined,
  };
}

export function fromScholarship(scholarship: Scholarship) {
  return {
    title: scholarship.title,
    slug: scholarship.slug,
    shortDescription: scholarship.shortDescription,
    description: scholarship.description,
    applyUrl: scholarship.applyUrl,
    isActive: scholarship.isActive,
    eligibility: scholarship.eligibility.map((value) => ({ value })),
    benefits: scholarship.benefits.map((benefit) => ({
      itemId: benefit.id,
      title: benefit.title,
      description: benefit.description,
    })),
    teachers: scholarship.teachers.map((teacher) => ({
      subject: teacher.subject,
      name: teacher.name,
    })),
    requiredDocuments: scholarship.requiredDocuments.map((document) => ({
      itemId: document.id,
      title: document.title,
      description: document.description,
      required: document.required,
    })),
    selectionProcess: scholarship.selectionProcess.map((value) => ({ value })),
    faqs: scholarship.faqs?.map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    })),
  };
}
