import type { AboutContent } from "@/types/about";

export const aboutContent = {
  meta: {
    title: "About",
    description:
      "Learn about our mission to support meritorious students through science scholarships.",
  },

  heading: {
    title: "About Us",
    description: "Supporting talented students through quality education.",
  },

  sections: [
    {
      title: "Our Mission",
      body: "We believe that financial limitations should never be a barrier to talented students from pursuing quality science education. Through our scholarship programs, we aim to support meritorious students preparing for engineering and medical entrance examinations.",
    },
    {
      title: "What We Offer",
      items: [
        "Full tuition fee support.",
        "Experienced science faculty.",
        "Transparent merit-based selection.",
        "Career guidance and mentoring.",
      ],
    },
    {
      title: "Our Vision",
      body: "Our vision is to create opportunities for talented students from all backgrounds and help them achieve academic excellence through quality education and mentorship.",
    },
  ],
} as const satisfies AboutContent;
