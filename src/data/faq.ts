import type { FaqContent, FaqItem } from "@/types/faq";

export const faqContent = {
  meta: {
    title: "FAQs",
    description:
      "Frequently asked questions about eligibility, scholarship coverage, and how the program works.",
  },

  heading: {
    title: "Frequently Asked Questions",
    description:
      "Quick answers about eligibility, coverage, and how the scholarship works.",
  },

  items: [
    {
      question: "Can CBSE and ICSE students apply?",
      answer: "Yes, students from any board are welcome to apply.",
    },
    {
      question: "Can WB state board students apply?",
      answer: "Yes, students from any board are welcome to apply.",
    },
    {
      question: "Can repeaters apply?",
      answer:
        "No. This scholarship is applicable for Class XI and XII science students.",
    },
    {
      question: "Can students preparing from home apply?",
      answer: "No, the classes are to be held in-person.",
    },
    {
      question: "How much scholarship is awarded?",
      answer:
        "The scholarship covers the tuition fees for 3 subjects (PCM/PCB) for two years (Class XI and XII).",
    },
    {
      question: "Can it be continued to repeater year?",
      answer:
        "No, the scholarship is valid for two years (Class XI and XII). However, special considerations can be made depending on situation and merit.",
    },
  ],

  homePreviewQuestions: [
    "Can CBSE and ICSE students apply?",
    "Can repeaters apply?",
    "Can students preparing from home apply?",
    "How much scholarship is awarded?",
  ],
} as const satisfies FaqContent;

export function getFaqHomePreview(): readonly FaqItem[] {
  const byQuestion = new Map(
    faqContent.items.map((item) => [item.question, item]),
  );

  return faqContent.homePreviewQuestions.flatMap((question) => {
    const item = byQuestion.get(question);
    return item ? [item] : [];
  });
}
