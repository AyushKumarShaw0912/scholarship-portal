import type { Benefit, DocumentRequirement, Teacher } from "./common";

export interface Scholarship {
  id: string;

  slug: string;

  title: string;

  shortDescription: string;

  description: string;

  /** Optional CMS logo URL; when absent, UI keeps the default layout. */
  logoUrl?: string | null;

  isActive: boolean;

  eligibility: string[];

  benefits: Benefit[];

  teachers: Teacher[];

  requiredDocuments: DocumentRequirement[];

  selectionProcess: string[];

  faqs?: ScholarshipFAQ[];
}

export interface ScholarshipFAQ {
  question: string;

  answer: string;
}
