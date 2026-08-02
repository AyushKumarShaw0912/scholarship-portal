import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_applications_target" AS ENUM('jee', 'neet');
  CREATE TYPE "public"."enum_applications_board" AS ENUM('wbbse', 'cbse', 'icse', 'other');
  CREATE TYPE "public"."enum_applications_academic_trend" AS ENUM('improving', 'stable', 'declining');
  CREATE TYPE "public"."enum_applications_status" AS ENUM('new', 'reviewed', 'shortlisted', 'rejected');
  CREATE TYPE "public"."enum_apply_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__apply_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "applications" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"guardian_phone" varchar NOT NULL,
  	"target" "enum_applications_target" NOT NULL,
  	"board" "enum_applications_board" NOT NULL,
  	"school_name" varchar NOT NULL,
  	"class8_percentage" numeric NOT NULL,
  	"class9_percentage" numeric NOT NULL,
  	"class10_pre_board_percentage" numeric NOT NULL,
  	"class10_total_marks" numeric NOT NULL,
  	"class10_max_marks" numeric NOT NULL,
  	"subject1_name" varchar NOT NULL,
  	"subject1_obtained" numeric NOT NULL,
  	"subject1_max" numeric NOT NULL,
  	"subject2_name" varchar NOT NULL,
  	"subject2_obtained" numeric NOT NULL,
  	"subject2_max" numeric NOT NULL,
  	"subject3_name" varchar NOT NULL,
  	"subject3_obtained" numeric NOT NULL,
  	"subject3_max" numeric NOT NULL,
  	"subject4_name" varchar NOT NULL,
  	"subject4_obtained" numeric NOT NULL,
  	"subject4_max" numeric NOT NULL,
  	"subject5_name" varchar NOT NULL,
  	"subject5_obtained" numeric NOT NULL,
  	"subject5_max" numeric NOT NULL,
  	"academic_trend" "enum_applications_academic_trend" NOT NULL,
  	"trend_score" numeric NOT NULL,
  	"academic_achievements" varchar,
  	"address" varchar NOT NULL,
  	"parents_name" varchar NOT NULL,
  	"parents_profession" varchar NOT NULL,
  	"household_income" numeric NOT NULL,
  	"status" "enum_applications_status" DEFAULT 'new' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "apply_form_subject_defaults" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "apply" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"heading_title" varchar,
  	"heading_description" varchar,
  	"form_labels_full_name" varchar,
  	"form_labels_email" varchar,
  	"form_labels_phone" varchar,
  	"form_labels_guardian_phone" varchar,
  	"form_labels_target" varchar,
  	"form_labels_board" varchar,
  	"form_labels_school_name" varchar,
  	"form_labels_class8_percentage" varchar,
  	"form_labels_class9_percentage" varchar,
  	"form_labels_class10_pre_board_percentage" varchar,
  	"form_labels_class10_total_marks" varchar,
  	"form_labels_class10_max_marks" varchar,
  	"form_labels_subject_name" varchar,
  	"form_labels_subject_obtained" varchar,
  	"form_labels_subject_max" varchar,
  	"form_labels_academic_achievements" varchar,
  	"form_labels_address" varchar,
  	"form_labels_parents_name" varchar,
  	"form_labels_parents_profession" varchar,
  	"form_labels_household_income" varchar,
  	"form_labels_select_placeholder" varchar,
  	"form_options_target_jee" varchar,
  	"form_options_target_neet" varchar,
  	"form_options_board_wbbse" varchar,
  	"form_options_board_cbse" varchar,
  	"form_options_board_icse" varchar,
  	"form_options_board_other" varchar,
  	"form_sections_personal_title" varchar,
  	"form_sections_family_title" varchar,
  	"form_sections_percentages_title" varchar,
  	"form_sections_percentages_help" varchar,
  	"form_sections_totals_title" varchar,
  	"form_sections_subjects_title" varchar,
  	"form_sections_subjects_help" varchar,
  	"form_success_title" varchar,
  	"form_success_body" varchar,
  	"form_success_reset_label" varchar,
  	"form_errors_submission_failed" varchar,
  	"form_errors_network" varchar,
  	"form_errors_server" varchar,
  	"form_submit_idle" varchar,
  	"form_submit_pending" varchar,
  	"_status" "enum_apply_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_apply_v_version_form_subject_defaults" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_apply_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_heading_title" varchar,
  	"version_heading_description" varchar,
  	"version_form_labels_full_name" varchar,
  	"version_form_labels_email" varchar,
  	"version_form_labels_phone" varchar,
  	"version_form_labels_guardian_phone" varchar,
  	"version_form_labels_target" varchar,
  	"version_form_labels_board" varchar,
  	"version_form_labels_school_name" varchar,
  	"version_form_labels_class8_percentage" varchar,
  	"version_form_labels_class9_percentage" varchar,
  	"version_form_labels_class10_pre_board_percentage" varchar,
  	"version_form_labels_class10_total_marks" varchar,
  	"version_form_labels_class10_max_marks" varchar,
  	"version_form_labels_subject_name" varchar,
  	"version_form_labels_subject_obtained" varchar,
  	"version_form_labels_subject_max" varchar,
  	"version_form_labels_academic_achievements" varchar,
  	"version_form_labels_address" varchar,
  	"version_form_labels_parents_name" varchar,
  	"version_form_labels_parents_profession" varchar,
  	"version_form_labels_household_income" varchar,
  	"version_form_labels_select_placeholder" varchar,
  	"version_form_options_target_jee" varchar,
  	"version_form_options_target_neet" varchar,
  	"version_form_options_board_wbbse" varchar,
  	"version_form_options_board_cbse" varchar,
  	"version_form_options_board_icse" varchar,
  	"version_form_options_board_other" varchar,
  	"version_form_sections_personal_title" varchar,
  	"version_form_sections_family_title" varchar,
  	"version_form_sections_percentages_title" varchar,
  	"version_form_sections_percentages_help" varchar,
  	"version_form_sections_totals_title" varchar,
  	"version_form_sections_subjects_title" varchar,
  	"version_form_sections_subjects_help" varchar,
  	"version_form_success_title" varchar,
  	"version_form_success_body" varchar,
  	"version_form_success_reset_label" varchar,
  	"version_form_errors_submission_failed" varchar,
  	"version_form_errors_network" varchar,
  	"version_form_errors_server" varchar,
  	"version_form_submit_idle" varchar,
  	"version_form_submit_pending" varchar,
  	"version__status" "enum__apply_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_logo_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_logo_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_logo_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_logo_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_logo_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_logo_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "applications_id" integer;
  ALTER TABLE "site" ADD COLUMN "logo_id" integer;
  ALTER TABLE "site" ADD COLUMN "favicon_id" integer;
  ALTER TABLE "_site_v" ADD COLUMN "version_logo_id" integer;
  ALTER TABLE "_site_v" ADD COLUMN "version_favicon_id" integer;
  ALTER TABLE "apply_form_subject_defaults" ADD CONSTRAINT "apply_form_subject_defaults_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."apply"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_apply_v_version_form_subject_defaults" ADD CONSTRAINT "_apply_v_version_form_subject_defaults_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_apply_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "applications_updated_at_idx" ON "applications" USING btree ("updated_at");
  CREATE INDEX "applications_created_at_idx" ON "applications" USING btree ("created_at");
  CREATE INDEX "apply_form_subject_defaults_order_idx" ON "apply_form_subject_defaults" USING btree ("_order");
  CREATE INDEX "apply_form_subject_defaults_parent_id_idx" ON "apply_form_subject_defaults" USING btree ("_parent_id");
  CREATE INDEX "apply__status_idx" ON "apply" USING btree ("_status");
  CREATE INDEX "_apply_v_version_form_subject_defaults_order_idx" ON "_apply_v_version_form_subject_defaults" USING btree ("_order");
  CREATE INDEX "_apply_v_version_form_subject_defaults_parent_id_idx" ON "_apply_v_version_form_subject_defaults" USING btree ("_parent_id");
  CREATE INDEX "_apply_v_version_version__status_idx" ON "_apply_v" USING btree ("version__status");
  CREATE INDEX "_apply_v_created_at_idx" ON "_apply_v" USING btree ("created_at");
  CREATE INDEX "_apply_v_updated_at_idx" ON "_apply_v" USING btree ("updated_at");
  CREATE INDEX "_apply_v_latest_idx" ON "_apply_v" USING btree ("latest");
  CREATE INDEX "_apply_v_autosave_idx" ON "_apply_v" USING btree ("autosave");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applications_fk" FOREIGN KEY ("applications_id") REFERENCES "public"."applications"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site" ADD CONSTRAINT "site_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_logo_id_media_id_fk" FOREIGN KEY ("version_logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_site_v" ADD CONSTRAINT "_site_v_version_favicon_id_media_id_fk" FOREIGN KEY ("version_favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_logo_sizes_logo_filename_idx" ON "media" USING btree ("sizes_logo_filename");
  CREATE INDEX "payload_locked_documents_rels_applications_id_idx" ON "payload_locked_documents_rels" USING btree ("applications_id");
  CREATE INDEX "site_logo_idx" ON "site" USING btree ("logo_id");
  CREATE INDEX "site_favicon_idx" ON "site" USING btree ("favicon_id");
  CREATE INDEX "_site_v_version_version_logo_idx" ON "_site_v" USING btree ("version_logo_id");
  CREATE INDEX "_site_v_version_version_favicon_idx" ON "_site_v" USING btree ("version_favicon_id");
  ALTER TABLE "scholarships" DROP COLUMN "apply_url";
  ALTER TABLE "_scholarships_v" DROP COLUMN "version_apply_url";
  ALTER TABLE "site" DROP COLUMN "logo";
  ALTER TABLE "site" DROP COLUMN "favicon";
  ALTER TABLE "_site_v" DROP COLUMN "version_logo";
  ALTER TABLE "_site_v" DROP COLUMN "version_favicon";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "applications" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "apply_form_subject_defaults" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "apply" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_apply_v_version_form_subject_defaults" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_apply_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "applications" CASCADE;
  DROP TABLE "apply_form_subject_defaults" CASCADE;
  DROP TABLE "apply" CASCADE;
  DROP TABLE "_apply_v_version_form_subject_defaults" CASCADE;
  DROP TABLE "_apply_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_applications_fk";
  
  ALTER TABLE "site" DROP CONSTRAINT "site_logo_id_media_id_fk";
  
  ALTER TABLE "site" DROP CONSTRAINT "site_favicon_id_media_id_fk";
  
  ALTER TABLE "_site_v" DROP CONSTRAINT "_site_v_version_logo_id_media_id_fk";
  
  ALTER TABLE "_site_v" DROP CONSTRAINT "_site_v_version_favicon_id_media_id_fk";
  
  DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_logo_sizes_logo_filename_idx";
  DROP INDEX "payload_locked_documents_rels_applications_id_idx";
  DROP INDEX "site_logo_idx";
  DROP INDEX "site_favicon_idx";
  DROP INDEX "_site_v_version_version_logo_idx";
  DROP INDEX "_site_v_version_version_favicon_idx";
  ALTER TABLE "scholarships" ADD COLUMN "apply_url" varchar;
  ALTER TABLE "_scholarships_v" ADD COLUMN "version_apply_url" varchar;
  ALTER TABLE "site" ADD COLUMN "logo" varchar DEFAULT '/images/logo.svg';
  ALTER TABLE "site" ADD COLUMN "favicon" varchar DEFAULT '/favicon.ico';
  ALTER TABLE "_site_v" ADD COLUMN "version_logo" varchar DEFAULT '/images/logo.svg';
  ALTER TABLE "_site_v" ADD COLUMN "version_favicon" varchar DEFAULT '/favicon.ico';
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_logo_url";
  ALTER TABLE "media" DROP COLUMN "sizes_logo_width";
  ALTER TABLE "media" DROP COLUMN "sizes_logo_height";
  ALTER TABLE "media" DROP COLUMN "sizes_logo_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_logo_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_logo_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "applications_id";
  ALTER TABLE "site" DROP COLUMN "logo_id";
  ALTER TABLE "site" DROP COLUMN "favicon_id";
  ALTER TABLE "_site_v" DROP COLUMN "version_logo_id";
  ALTER TABLE "_site_v" DROP COLUMN "version_favicon_id";
  DROP TYPE "public"."enum_applications_target";
  DROP TYPE "public"."enum_applications_board";
  DROP TYPE "public"."enum_applications_academic_trend";
  DROP TYPE "public"."enum_applications_status";
  DROP TYPE "public"."enum_apply_status";
  DROP TYPE "public"."enum__apply_v_version_status";`)
}
