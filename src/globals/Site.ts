import type { GlobalConfig } from "payload";

import { authenticated, authenticatedOrPublished } from "@/access";
import { revalidateSiteGlobal } from "@/cms/revalidate";
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
  hooks: {
    afterChange: [revalidateSiteGlobal],
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
      required: false,
      admin: {
        description:
          "Deprecated. Apply CTAs use the in-app /apply form. Leave blank.",
        position: "sidebar",
      },
    },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "favicon",
      type: "upload",
      relationTo: "media",
      required: false,
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
