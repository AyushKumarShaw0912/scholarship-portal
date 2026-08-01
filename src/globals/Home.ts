import type { GlobalConfig } from "payload";

import { anyone, authenticated } from "@/access";
import { iconSelectField, sectionCopyFields } from "@/fields";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  access: {
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        { name: "badge", type: "text", required: true },
        { name: "title", type: "text", required: true },
        { name: "highlightedTitle", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "primaryCta", type: "text", required: true },
        { name: "secondaryCta", type: "text", required: true },
        {
          name: "stats",
          type: "array",
          required: true,
          fields: [
            { name: "value", type: "text", required: true },
            { name: "label", type: "text", required: true },
          ],
        },
      ],
    },
    {
      name: "sections",
      type: "group",
      fields: [
        sectionCopyFields({ name: "scholarships", label: "Scholarships Section" }),
        sectionCopyFields({ name: "benefits", label: "Benefits Section" }),
        sectionCopyFields({
          name: "applicationProcess",
          label: "Application Process Section",
        }),
        sectionCopyFields({ name: "faqs", label: "FAQs Section" }),
      ],
    },
    {
      name: "benefits",
      type: "array",
      required: true,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        iconSelectField(),
      ],
    },
    {
      name: "applicationSteps",
      type: "array",
      required: true,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
      ],
    },
  ],
};
