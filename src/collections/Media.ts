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
    mimeTypes: [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/svg+xml",
      "image/x-icon",
      "image/vnd.microsoft.icon",
    ],
    formatOptions: {
      format: "webp",
      options: {
        quality: 80,
      },
    },
    resizeOptions: {
      width: 1920,
      withoutEnlargement: true,
    },
    imageSizes: [
      {
        name: "thumbnail",
        width: 200,
        height: 200,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: { quality: 75 },
        },
        withoutEnlargement: true,
      },
      {
        name: "logo",
        width: 256,
        height: 256,
        position: "centre",
        formatOptions: {
          format: "webp",
          options: { quality: 85 },
        },
        withoutEnlargement: true,
      },
    ],
    adminThumbnail: "thumbnail",
  },
};
