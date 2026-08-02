import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { contentVersions } from "@/cms/versions";
import { sectionCopyFields, stringListField } from "@/fields";

export const Faq: GlobalConfig = {
  slug: "faq",
  label: "FAQ Page",
  versions: contentVersions,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    sectionCopyFields({ name: "meta", label: "SEO Meta", descriptionRequired: true }),
    sectionCopyFields({ name: "heading", label: "Page Heading" }),
    {
      name: "items",
      type: "array",
      required: true,
      labels: {
        singular: "FAQ",
        plural: "FAQs",
      },
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
      ],
    },
    stringListField({
      name: "homePreviewQuestions",
      label: "Home Preview Questions",
      rowLabel: "Question",
    }),
  ],
};
