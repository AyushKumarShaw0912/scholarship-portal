import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/access";
import { slugField, stringListField } from "@/fields";

export const Scholarships: CollectionConfig = {
  slug: "scholarships",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "isActive", "updatedAt"],
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField(),
    {
      name: "shortDescription",
      type: "textarea",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "applyUrl",
      type: "text",
      required: true,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
    stringListField({
      name: "eligibility",
      label: "Eligibility",
      rowLabel: "Criterion",
      required: true,
    }),
    {
      name: "benefits",
      type: "array",
      required: true,
      fields: [
        {
          name: "itemId",
          type: "text",
          required: true,
          label: "ID",
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "teachers",
      type: "array",
      required: true,
      fields: [
        {
          name: "subject",
          type: "text",
          required: true,
        },
        {
          name: "name",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "requiredDocuments",
      type: "array",
      required: true,
      fields: [
        {
          name: "itemId",
          type: "text",
          required: true,
          label: "ID",
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "required",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
    stringListField({
      name: "selectionProcess",
      label: "Selection Process",
      rowLabel: "Step",
      required: true,
    }),
    {
      name: "faqs",
      type: "array",
      labels: {
        singular: "FAQ",
        plural: "FAQs",
      },
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
