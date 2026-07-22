import { Award, BookOpen, GraduationCap, Users } from "lucide-react";

import type { HomeContent } from "@/types";

import { scholarships } from "./scholarships";

export const homeContent = {
  hero: {
    badge: "Science Scholarships • Class XI & XII",

    title: "Empowering Future",

    highlightedTitle: "Science Scholars",

    description:
      "Full coaching scholarships for deserving students. Build your future through expert faculty, complete tuition support and career guidance.",

    stats: [
      {
        value: String(scholarships.length),
        label: "Scholarships",
      },
      {
        value: "100%",
        label: "Tuition Covered",
      },
      {
        value: "4",
        label: "Expert Faculty",
      },
      {
        value: "1",
        label: "Selection Exam",
      },
    ],
  },

  benefits: [
    {
      title: "100% Tuition Support",

      description: "Complete coaching fees covered for selected students.",

      icon: Award,
    },

    {
      title: "Expert Faculty",

      description:
        "Learn from experienced teachers dedicated to science education.",

      icon: BookOpen,
    },

    {
      title: "Career Guidance",

      description:
        "Receive guidance for engineering, medical and higher education.",

      icon: GraduationCap,
    },

    {
      title: "Merit Based Selection",

      description:
        "Students are selected through a fair scholarship examination.",

      icon: Users,
    },
  ],

  applicationSteps: [
    {
      title: "Apply Online",

      description: "Complete the scholarship application form.",
    },

    {
      title: "Submit Documents",

      description: "Upload your academic records and supporting documents.",
    },

    {
      title: "Selection Test",

      description: "Appear for the scholarship examination.",
    },

    {
      title: "Final Selection",

      description: "Successful candidates are notified after evaluation.",
    },
  ],
} satisfies HomeContent;
