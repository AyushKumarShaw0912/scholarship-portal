import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { contentVersions } from "@/cms/versions";
import { navLinkFields } from "@/fields";

export const Site: GlobalConfig = {
  slug: "site",
  label: "Site Settings",
  versions: contentVersions,
  access: {
    read: authenticatedOrPublished,
    update: authenticated,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "shortName",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "tagline",
      type: "text",
      required: true,
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
      required: true,
    },
    {
      name: "address",
      type: "text",
      required: true,
    },
    {
      name: "applyUrl",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "text",
      required: true,
      defaultValue: "/images/logo.svg",
    },
    {
      name: "favicon",
      type: "text",
      required: true,
      defaultValue: "/favicon.ico",
    },
    {
      name: "locale",
      type: "text",
      required: true,
      defaultValue: "en-IN",
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "keywords",
      type: "array",
      fields: [
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "navigation",
      type: "array",
      required: true,
      fields: navLinkFields(),
    },
  ],
};
