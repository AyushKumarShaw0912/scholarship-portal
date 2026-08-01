import type { CollectionConfig } from "payload";

import { anyone, authenticated } from "@/access";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  access: {
    read: authenticated,
  },
  fields: [],
};
