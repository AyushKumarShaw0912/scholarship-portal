import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { contentVersions } from "@/cms/versions";
import { sectionCopyFields, stringListField } from "@/fields";

export const About: GlobalConfig = {
  slug: "about",
  label: "About Page",
  versions: contentVersions,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    sectionCopyFields({ name: "meta", label: "SEO Meta", descriptionRequired: true }),
    sectionCopyFields({ name: "heading", label: "Page Heading" }),
    {
      name: "sections",
      type: "array",
      required: true,
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea" },
        stringListField({
          name: "items",
          label: "Bullet Items",
          rowLabel: "Item",
        }),
      ],
    },
  ],
};
