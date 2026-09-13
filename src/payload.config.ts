import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import path from "path";
import { buildConfig } from "payload";
import { cloudinaryStorage } from "payload-storage-cloudinary";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Media, Scholarships, Users, Applications } from "./collections";
import {
  About,
  Apply,
  Contact,
  Faq,
  Home,
  ScholarshipPage,
  Site,
} from "./globals";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const cloudinaryCloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const cloudinaryApiKey = process.env.CLOUDINARY_API_KEY?.trim();
const cloudinaryApiSecret = process.env.CLOUDINARY_API_SECRET?.trim();
const useCloudinary = Boolean(
  cloudinaryCloudName && cloudinaryApiKey && cloudinaryApiSecret,
);

const r2Bucket = process.env.R2_BUCKET;
const r2PublicUrl = process.env.R2_PUBLIC_URL?.replace(/\/$/, "");
const useR2 = !useCloudinary && Boolean(r2Bucket);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Scholarships, Applications],
  globals: [Site, Home, About, Contact, Faq, ScholarshipPage, Apply],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "CHANGE_ME_IN_ENV_LOCAL",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    // Local: push stays enabled in development. Production schema changes
    // run via `pnpm run ci` (`payload migrate && pnpm build`) on Vercel.
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  sharp,
  plugins: [
    ...(useCloudinary
      ? [
          cloudinaryStorage({
            cloudConfig: {
              cloud_name: cloudinaryCloudName,
              api_key: cloudinaryApiKey,
              api_secret: cloudinaryApiSecret,
            },
            collections: {
              media: {
                folder: "scholarship-portal",
                transformations: {
                  preserveOriginal: true,
                },
              },
            },
          }),
        ]
      : []),
    s3Storage({
      enabled: useR2,
      bucket: r2Bucket || "",
      collections: {
        media: {
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) => {
            const key = prefix ? `${prefix}/${filename}` : filename;
            if (!r2PublicUrl) {
              return `/api/media/file/${key}`;
            }
            return `${r2PublicUrl}/${key}`;
          },
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        },
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        forcePathStyle: true,
      },
    }),
  ],
});
