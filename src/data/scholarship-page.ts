import type { ScholarshipPageContent } from "@/types/scholarship-page";

import { FileText, GraduationCap, Trophy } from "lucide-react";

export type {
  ScholarshipPageContent,
  ScholarshipSidebarFeature,
} from "@/types/scholarship-page";

export const scholarshipPageContent = {
  list: {
    title: "Scholarships",
    description:
      "Explore our scholarship programs designed to support talented students pursuing science education and competitive entrance examination preparation.",
    metaDescription:
      "Browse all available scholarships, review eligibility, benefits, application details and Class 10 marks requirements.",
  },

  detail: {
    sectionTitles: {
      benefits: "Scholarship Benefits",
      eligibility: "Eligibility",
      faculty: "Faculty",
      documents: "What you'll need to apply",
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
          label: "Class 10 Marks Review",
          icon: FileText,
        },
      ],
      footerNote:
        "One common application form is used for all scholarship programs. The scholarship committee will evaluate every application individually.",
    },
  },
} as const satisfies ScholarshipPageContent;
