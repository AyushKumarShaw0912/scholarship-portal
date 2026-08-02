import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateContactGlobal } from "@/cms/revalidate";
import { contentVersions } from "@/cms/versions";
import { iconSelectField, sectionCopyFields } from "@/fields";

export const Contact: GlobalConfig = {
  slug: "contact",
  label: "Contact Page",
  versions: contentVersions,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateContactGlobal],
  },
  fields: [
    sectionCopyFields({ name: "meta", label: "SEO Meta", descriptionRequired: true }),
    sectionCopyFields({ name: "heading", label: "Page Heading" }),
    {
      name: "infoItems",
      type: "array",
      required: true,
      fields: [
        { name: "itemId", type: "text", required: true, label: "ID" },
        { name: "title", type: "text", required: true },
        iconSelectField(),
        {
          name: "type",
          type: "select",
          required: true,
          options: [
            { label: "Email", value: "email" },
            { label: "Phone", value: "phone" },
            { label: "Address", value: "address" },
          ],
        },
        {
          name: "lines",
          type: "array",
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
    {
      name: "enquiry",
      type: "group",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "body", type: "textarea", required: true },
      ],
    },
  ],
};
