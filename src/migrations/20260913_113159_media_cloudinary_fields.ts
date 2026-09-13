import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_public_id" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_resource_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_format" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "cloudinary_version" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "original_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "transformed_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_public_id" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_resource_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_format" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_cloudinary_version" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_original_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_thumbnail_transformed_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_cloudinary_public_id" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_cloudinary_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_cloudinary_resource_type" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_cloudinary_format" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_cloudinary_version" numeric;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_original_url" varchar;
  ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "sizes_logo_transformed_url" varchar;

  ALTER TABLE "scholarships" ADD COLUMN IF NOT EXISTS "logo_id" integer;
  ALTER TABLE "_scholarships_v" ADD COLUMN IF NOT EXISTS "version_logo_id" integer;

  ALTER TABLE "home_benefits" ADD COLUMN IF NOT EXISTS "image_id" integer;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_announcement_enabled" boolean DEFAULT true;
  ALTER TABLE "home" ADD COLUMN IF NOT EXISTS "hero_announcement_message" varchar DEFAULT 'APPLICATION ONGOING FOR 2027 - 2029 BATCH';
  ALTER TABLE "_home_v_version_benefits" ADD COLUMN IF NOT EXISTS "image_id" integer;
  ALTER TABLE "_home_v" ADD COLUMN IF NOT EXISTS "version_hero_announcement_enabled" boolean DEFAULT true;
  ALTER TABLE "_home_v" ADD COLUMN IF NOT EXISTS "version_hero_announcement_message" varchar DEFAULT 'APPLICATION ONGOING FOR 2027 - 2029 BATCH';

  DO $$ BEGIN
    ALTER TABLE "scholarships" ADD CONSTRAINT "scholarships_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  DO $$ BEGIN
    ALTER TABLE "_scholarships_v" ADD CONSTRAINT "_scholarships_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  DO $$ BEGIN
    ALTER TABLE "home_benefits" ADD CONSTRAINT "home_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  DO $$ BEGIN
    ALTER TABLE "_home_v_version_benefits" ADD CONSTRAINT "_home_v_version_benefits_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

  CREATE INDEX IF NOT EXISTS "scholarships_logo_idx" ON "scholarships" USING btree ("logo_id");
  CREATE INDEX IF NOT EXISTS "_scholarships_v_version_version_logo_idx" ON "_scholarships_v" USING btree ("version_logo_id");
  CREATE INDEX IF NOT EXISTS "home_benefits_image_idx" ON "home_benefits" USING btree ("image_id");
  CREATE INDEX IF NOT EXISTS "_home_v_version_benefits_image_idx" ON "_home_v_version_benefits" USING btree ("image_id");
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "scholarships" DROP CONSTRAINT IF EXISTS "scholarships_logo_id_media_id_fk";
  ALTER TABLE "_scholarships_v" DROP CONSTRAINT IF EXISTS "_scholarships_v_version_logo_id_media_id_fk";
  ALTER TABLE "home_benefits" DROP CONSTRAINT IF EXISTS "home_benefits_image_id_media_id_fk";
  ALTER TABLE "_home_v_version_benefits" DROP CONSTRAINT IF EXISTS "_home_v_version_benefits_image_id_media_id_fk";

  DROP INDEX IF EXISTS "scholarships_logo_idx";
  DROP INDEX IF EXISTS "_scholarships_v_version_version_logo_idx";
  DROP INDEX IF EXISTS "home_benefits_image_idx";
  DROP INDEX IF EXISTS "_home_v_version_benefits_image_idx";

  ALTER TABLE "media" DROP COLUMN IF EXISTS "cloudinary_public_id";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "cloudinary_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "cloudinary_resource_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "cloudinary_format";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "cloudinary_version";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "original_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "transformed_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_cloudinary_public_id";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_cloudinary_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_cloudinary_resource_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_cloudinary_format";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_cloudinary_version";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_original_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_thumbnail_transformed_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_cloudinary_public_id";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_cloudinary_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_cloudinary_resource_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_cloudinary_format";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_cloudinary_version";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_original_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_logo_transformed_url";

  ALTER TABLE "scholarships" DROP COLUMN IF EXISTS "logo_id";
  ALTER TABLE "_scholarships_v" DROP COLUMN IF EXISTS "version_logo_id";
  ALTER TABLE "home_benefits" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "home" DROP COLUMN IF EXISTS "hero_announcement_enabled";
  ALTER TABLE "home" DROP COLUMN IF EXISTS "hero_announcement_message";
  ALTER TABLE "_home_v_version_benefits" DROP COLUMN IF EXISTS "image_id";
  ALTER TABLE "_home_v" DROP COLUMN IF EXISTS "version_hero_announcement_enabled";
  ALTER TABLE "_home_v" DROP COLUMN IF EXISTS "version_hero_announcement_message";
  `);
}
