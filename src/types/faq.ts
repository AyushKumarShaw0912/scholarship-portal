import type { SectionCopy } from "./ui";

export interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

export interface FaqContent {
  readonly meta: SectionCopy;
  readonly heading: SectionCopy;
  readonly items: readonly FaqItem[];
  /** Question strings shown in the home teaser (must match `items`). */
  readonly homePreviewQuestions: readonly string[];
}
