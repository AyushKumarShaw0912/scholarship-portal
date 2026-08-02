import { Award, BookOpen, Brain, GraduationCap, Users } from "lucide-react";

import type { HomeContent } from "@/types";

import { scholarships } from "./scholarships";
import { uiCopy } from "./ui";

export const homeContent = {
  hero: {
    badge: "Science Scholarships • Class XI & XII",

    title: "Empowering Future",

    highlightedTitle: "Science Scholars",

    description:
      "Full coaching scholarships for meritorious students. Build your future through expert faculty, complete tuition support and career guidance.",

    primaryCta: uiCopy.applyNow,

    secondaryCta: uiCopy.viewScholarships,

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

  sections: {
    scholarships: {
      title: "Available Scholarships",
      description:
        "Explore our scholarship opportunities designed to support talented students pursuing science education.",
    },
    benefits: {
      title: "Why Choose Our Scholarship?",
      description: "We provide much more than financial assistance.",
    },
    applicationProcess: {
      title: "Application Process",
      description: "A simple four-step process to apply.",
    },
    faqs: {
      title: "Frequently Asked Questions",
      description: "Common questions about eligibility and scholarship coverage.",
    },
  },

  benefits: [
    {
      title: "100% Tuition Support",

      description:
        "Full tution and coaching fees support for Class XI and XII science students for 3 subjects (PCM/PCB)",

      icon: Award,
    },

    {
      title: "Expert Faculty",

      description:
        "Learn from experienced teachers dedicated to science education.",

      icon: BookOpen,
    },
    {
      title: "Preparation for competitive exams (JEE and NEET)",

      description:
        "Prepare for competitive exams like JEE and NEET with expert faculty.",

      icon: Brain,
    },

    {
      title: "Career Guidance",

      description:
        "Receive guidance for engineering, medical and higher education.",

      icon: GraduationCap,
    },

    {
      title: "Merit+ Financial Need Based Selection",

      description:
        "Students are selected based on Class 10 board marks, financial need, a selection test, and interviews.",

      icon: Users,
    },
  ],

  applicationSteps: [
    {
      title: "Apply Online",

      description: "Complete the scholarship application form.",
    },

    {
      title: "Enter Class 10 Marks",

      description:
        "Share Class 8–9 percentages and Class 10 board subject marks in the form.",
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
