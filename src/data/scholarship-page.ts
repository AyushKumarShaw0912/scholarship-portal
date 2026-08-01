import { FileText, GraduationCap, Trophy } from "lucide-react";

import type { LucideIcon } from "lucide-react";

import type { SectionCopy } from "@/types/ui";

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

export const scholarshipPageContent = {
  list: {
    title: "Scholarships",
    description:
      "Explore our scholarship programs designed to support talented students pursuing science education and competitive entrance examination preparation.",
    metaDescription:
      "Browse all available scholarships, review eligibility, benefits, required documents and application details.",
  },

  detail: {
    sectionTitles: {
      benefits: "Scholarship Benefits",
      eligibility: "Eligibility",
      faculty: "Faculty",
      documents: "Required Documents",
      selectionProcess: "Selection Process",
    },

    sidebar: {
      title: "Apply for this Scholarship",
      description:
        "Complete the online application form. The selection committee will determine the most suitable scholarship program based on your eligibility and performance.",
      features: [
        {
          label: "100% Tuition Support",
          icon: GraduationCap,
        },
        {
          label: "Merit Based Selection",
          icon: Trophy,
        },
        {
          label: "Required Documents Verification",
          icon: FileText,
        },
      ],
      footerNote:
        "One common application form is used for all scholarship programs. The scholarship committee will evaluate every application individually.",
    },
  },
} as const satisfies ScholarshipPageContent;
