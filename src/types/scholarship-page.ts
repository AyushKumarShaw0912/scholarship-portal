import type { LucideIcon } from "lucide-react";

import type { SectionCopy } from "./ui";

export interface ScholarshipSidebarFeature {
  readonly label: string;
  readonly icon: LucideIcon;
}

export interface ScholarshipPageContent {
  readonly list: SectionCopy & {
    readonly metaDescription: string;
  };
  readonly detail: {
    readonly sectionTitles: {
      readonly benefits: string;
      readonly eligibility: string;
      readonly faculty: string;
      readonly documents: string;
      readonly selectionProcess: string;
    };
    readonly sidebar: {
      readonly title: string;
      readonly description: string;
      readonly features: readonly ScholarshipSidebarFeature[];
      readonly footerNote: string;
    };
  };
}
