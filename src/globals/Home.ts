import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateHomeGlobal } from "@/cms/revalidate";
import { contentVersions } from "@/cms/versions";
import { iconSelectField, sectionCopyFields } from "@/fields";

export const Home: GlobalConfig = {
  slug: "home",
  label: "Home Page",
  versions: contentVersions,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateHomeGlobal],
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
        {
          name: "announcementEnabled",
          type: "checkbox",
          defaultValue: true,
          label: "Show announcement",
          admin: {
            description:
              "When enabled, shows the announcement banner between the description and CTA buttons.",
          },
        },
        {
          name: "announcementMessage",
          type: "text",
          label: "Announcement message",
          defaultValue: "APPLICATION ONGOING FOR 2027 - 2029 BATCH",
          admin: {
            description:
              "Eye-catching banner text on the home hero. Leave empty to hide.",
          },
        },
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
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: false,
          admin: {
            description:
              "Optional image. When set, replaces the Lucide icon on the home benefit card.",
          },
        },
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
