import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateScholarshipPageGlobal } from "@/cms/revalidate";
import { contentVersions } from "@/cms/versions";
import { iconSelectField, sectionCopyFields } from "@/fields";

export const ScholarshipPage: GlobalConfig = {
  slug: "scholarship-page",
  label: "Scholarship Page Chrome",
  versions: contentVersions,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateScholarshipPageGlobal],
  },
  fields: [
    {
      name: "list",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        { name: "metaDescription", type: "textarea", required: true },
      ],
    },
    {
      name: "detail",
      type: "group",
      fields: [
        {
          name: "sectionTitles",
          type: "group",
          fields: [
            { name: "benefits", type: "text", required: true },
            { name: "eligibility", type: "text", required: true },
            { name: "faculty", type: "text", required: true },
            { name: "documents", type: "text", required: true },
            { name: "selectionProcess", type: "text", required: true },
          ],
        },
        {
          name: "sidebar",
          type: "group",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "description", type: "textarea", required: true },
            {
              name: "features",
              type: "array",
              required: true,
              fields: [
                { name: "label", type: "text", required: true },
                iconSelectField(),
              ],
            },
            { name: "footerNote", type: "textarea", required: true },
          ],
        },
      ],
    },
  ],
};
