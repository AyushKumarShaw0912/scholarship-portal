import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

import { anyone, authenticated } from "@/access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    staticDir: path.resolve(dirname, "../../public/media"),
  },
};
