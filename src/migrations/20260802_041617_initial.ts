import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Non-breaking: DBs already synced via local push keep their data.
  // Only create schema when the baseline tables are missing (empty Neon branch).
  const existing = await db.execute(sql`
    SELECT to_regclass('public.site') AS reg
  `)
  const reg = (existing as { rows?: Array<{ reg: string | null }> }).rows?.[0]?.reg

  if (reg) {
    payload.logger.info(
      'Baseline schema already present (public.site). Skipping CREATE statements to preserve data.',
    )
    return
  }

  await db.execute(sql`
   CREATE TYPE "public"."enum_scholarships_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__scholarships_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__site_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_home_benefits_icon" AS ENUM('Award', 'BookOpen', 'Brain', 'FileText', 'GraduationCap', 'Mail', 'MapPin', 'Phone', 'Trophy', 'Users');
  CREATE TYPE "public"."enum_home_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__home_v_version_benefits_icon" AS ENUM('Award', 'BookOpen', 'Brain', 'FileText', 'GraduationCap', 'Mail', 'MapPin', 'Phone', 'Trophy', 'Users');
  CREATE TYPE "public"."enum__home_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_about_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__about_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_contact_info_items_icon" AS ENUM('Award', 'BookOpen', 'Brain', 'FileText', 'GraduationCap', 'Mail', 'MapPin', 'Phone', 'Trophy', 'Users');
  CREATE TYPE "public"."enum_contact_info_items_type" AS ENUM('email', 'phone', 'address');
  CREATE TYPE "public"."enum_contact_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__contact_v_version_info_items_icon" AS ENUM('Award', 'BookOpen', 'Brain', 'FileText', 'GraduationCap', 'Mail', 'MapPin', 'Phone', 'Trophy', 'Users');
  CREATE TYPE "public"."enum__contact_v_version_info_items_type" AS ENUM('email', 'phone', 'address');
  CREATE TYPE "public"."enum__contact_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_faq_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__faq_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_scholarship_page_detail_sidebar_features_icon" AS ENUM('Award', 'BookOpen', 'Brain', 'FileText', 'GraduationCap', 'Mail', 'MapPin', 'Phone', 'Trophy', 'Users');
  CREATE TYPE "public"."enum_scholarship_page_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__scholarship_page_v_version_detail_sidebar_features_icon" AS ENUM('Award', 'BookOpen', 'Brain', 'FileText', 'GraduationCap', 'Mail', 'MapPin', 'Phone', 'Trophy', 'Users');
  CREATE TYPE "public"."enum__scholarship_page_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "scholarships_eligibility" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "scholarships_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "scholarships_teachers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"subject" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "scholarships_required_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"description" varchar,
  	"required" boolean DEFAULT true
  );
  
  CREATE TABLE "scholarships_selection_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "scholarships_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "scholarships" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"short_description" varchar,
  	"description" varchar,
  	"apply_url" varchar,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_scholarships_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_scholarships_v_version_eligibility" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scholarships_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scholarships_v_version_teachers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"subject" varchar,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scholarships_v_version_required_documents" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"description" varchar,
  	"required" boolean DEFAULT true,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scholarships_v_version_selection_process" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scholarships_v_version_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scholarships_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_short_description" varchar,
  	"version_description" varchar,
  	"version_apply_url" varchar,
  	"version_is_active" boolean DEFAULT true,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__scholarships_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"scholarships_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "site_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "site" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"short_name" varchar,
  	"description" varchar,
  	"tagline" varchar,
  	"email" varchar,
  	"phone" varchar,
  	"address" varchar,
  	"apply_url" varchar,
  	"logo" varchar DEFAULT '/images/logo.svg',
  	"favicon" varchar DEFAULT '/favicon.ico',
  	"locale" varchar DEFAULT 'en-IN',
  	"author" varchar,
  	"_status" "enum_site_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_site_v_version_keywords" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v_version_navigation" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_site_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_name" varchar,
  	"version_short_name" varchar,
  	"version_description" varchar,
  	"version_tagline" varchar,
  	"version_email" varchar,
  	"version_phone" varchar,
  	"version_address" varchar,
  	"version_apply_url" varchar,
  	"version_logo" varchar DEFAULT '/images/logo.svg',
  	"version_favicon" varchar DEFAULT '/favicon.ico',
  	"version_locale" varchar DEFAULT 'en-IN',
  	"version_author" varchar,
  	"version__status" "enum__site_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "home_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "home_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum_home_benefits_icon"
  );
  
  CREATE TABLE "home_application_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "home" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_badge" varchar,
  	"hero_title" varchar,
  	"hero_highlighted_title" varchar,
  	"hero_description" varchar,
  	"hero_primary_cta" varchar,
  	"hero_secondary_cta" varchar,
  	"sections_scholarships_title" varchar,
  	"sections_scholarships_description" varchar,
  	"sections_benefits_title" varchar,
  	"sections_benefits_description" varchar,
  	"sections_application_process_title" varchar,
  	"sections_application_process_description" varchar,
  	"sections_faqs_title" varchar,
  	"sections_faqs_description" varchar,
  	"_status" "enum_home_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_home_v_version_hero_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"icon" "enum__home_v_version_benefits_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v_version_application_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_home_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_hero_badge" varchar,
  	"version_hero_title" varchar,
  	"version_hero_highlighted_title" varchar,
  	"version_hero_description" varchar,
  	"version_hero_primary_cta" varchar,
  	"version_hero_secondary_cta" varchar,
  	"version_sections_scholarships_title" varchar,
  	"version_sections_scholarships_description" varchar,
  	"version_sections_benefits_title" varchar,
  	"version_sections_benefits_description" varchar,
  	"version_sections_application_process_title" varchar,
  	"version_sections_application_process_description" varchar,
  	"version_sections_faqs_title" varchar,
  	"version_sections_faqs_description" varchar,
  	"version__status" "enum__home_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "about_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "about_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"heading_title" varchar,
  	"heading_description" varchar,
  	"_status" "enum_about_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_about_v_version_sections_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_heading_title" varchar,
  	"version_heading_description" varchar,
  	"version__status" "enum__about_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "contact_info_items_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "contact_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"icon" "enum_contact_info_items_icon",
  	"type" "enum_contact_info_items_type"
  );
  
  CREATE TABLE "contact" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"heading_title" varchar,
  	"heading_description" varchar,
  	"enquiry_title" varchar,
  	"enquiry_body" varchar,
  	"_status" "enum_contact_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_contact_v_version_info_items_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_v_version_info_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item_id" varchar,
  	"title" varchar,
  	"icon" "enum__contact_v_version_info_items_icon",
  	"type" "enum__contact_v_version_info_items_type",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_contact_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_heading_title" varchar,
  	"version_heading_description" varchar,
  	"version_enquiry_title" varchar,
  	"version_enquiry_body" varchar,
  	"version__status" "enum__contact_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "faq_home_preview_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"heading_title" varchar,
  	"heading_description" varchar,
  	"_status" "enum_faq_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_faq_v_version_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_faq_v_version_home_preview_questions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_faq_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_heading_title" varchar,
  	"version_heading_description" varchar,
  	"version__status" "enum__faq_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "scholarship_page_detail_sidebar_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum_scholarship_page_detail_sidebar_features_icon"
  );
  
  CREATE TABLE "scholarship_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"list_title" varchar,
  	"list_description" varchar,
  	"list_meta_description" varchar,
  	"detail_section_titles_benefits" varchar,
  	"detail_section_titles_eligibility" varchar,
  	"detail_section_titles_faculty" varchar,
  	"detail_section_titles_documents" varchar,
  	"detail_section_titles_selection_process" varchar,
  	"detail_sidebar_title" varchar,
  	"detail_sidebar_description" varchar,
  	"detail_sidebar_footer_note" varchar,
  	"_status" "enum_scholarship_page_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_scholarship_page_v_version_detail_sidebar_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"icon" "enum__scholarship_page_v_version_detail_sidebar_features_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scholarship_page_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_list_title" varchar,
  	"version_list_description" varchar,
  	"version_list_meta_description" varchar,
  	"version_detail_section_titles_benefits" varchar,
  	"version_detail_section_titles_eligibility" varchar,
  	"version_detail_section_titles_faculty" varchar,
  	"version_detail_section_titles_documents" varchar,
  	"version_detail_section_titles_selection_process" varchar,
  	"version_detail_sidebar_title" varchar,
  	"version_detail_sidebar_description" varchar,
  	"version_detail_sidebar_footer_note" varchar,
  	"version__status" "enum__scholarship_page_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scholarships_eligibility" ADD CONSTRAINT "scholarships_eligibility_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scholarships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scholarships_benefits" ADD CONSTRAINT "scholarships_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scholarships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scholarships_teachers" ADD CONSTRAINT "scholarships_teachers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scholarships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scholarships_required_documents" ADD CONSTRAINT "scholarships_required_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scholarships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scholarships_selection_process" ADD CONSTRAINT "scholarships_selection_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scholarships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scholarships_faqs" ADD CONSTRAINT "scholarships_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scholarships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarships_v_version_eligibility" ADD CONSTRAINT "_scholarships_v_version_eligibility_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scholarships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarships_v_version_benefits" ADD CONSTRAINT "_scholarships_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scholarships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarships_v_version_teachers" ADD CONSTRAINT "_scholarships_v_version_teachers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scholarships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarships_v_version_required_documents" ADD CONSTRAINT "_scholarships_v_version_required_documents_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scholarships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarships_v_version_selection_process" ADD CONSTRAINT "_scholarships_v_version_selection_process_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scholarships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarships_v_version_faqs" ADD CONSTRAINT "_scholarships_v_version_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scholarships_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarships_v" ADD CONSTRAINT "_scholarships_v_parent_id_scholarships_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."scholarships"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_scholarships_fk" FOREIGN KEY ("scholarships_id") REFERENCES "public"."scholarships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_keywords" ADD CONSTRAINT "site_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_navigation" ADD CONSTRAINT "site_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_keywords" ADD CONSTRAINT "_site_v_version_keywords_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_site_v_version_navigation" ADD CONSTRAINT "_site_v_version_navigation_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_site_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_hero_stats" ADD CONSTRAINT "home_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_benefits" ADD CONSTRAINT "home_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_application_steps" ADD CONSTRAINT "home_application_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_hero_stats" ADD CONSTRAINT "_home_v_version_hero_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_benefits" ADD CONSTRAINT "_home_v_version_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_home_v_version_application_steps" ADD CONSTRAINT "_home_v_version_application_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_home_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_sections_items" ADD CONSTRAINT "about_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_sections" ADD CONSTRAINT "about_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_sections_items" ADD CONSTRAINT "_about_v_version_sections_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_about_v_version_sections" ADD CONSTRAINT "_about_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_items_lines" ADD CONSTRAINT "contact_info_items_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact_info_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contact_info_items" ADD CONSTRAINT "contact_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contact"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_version_info_items_lines" ADD CONSTRAINT "_contact_v_version_info_items_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_v_version_info_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_contact_v_version_info_items" ADD CONSTRAINT "_contact_v_version_info_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_contact_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_items" ADD CONSTRAINT "faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faq_home_preview_questions" ADD CONSTRAINT "faq_home_preview_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faq_v_version_items" ADD CONSTRAINT "_faq_v_version_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faq_v_version_home_preview_questions" ADD CONSTRAINT "_faq_v_version_home_preview_questions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scholarship_page_detail_sidebar_features" ADD CONSTRAINT "scholarship_page_detail_sidebar_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scholarship_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scholarship_page_v_version_detail_sidebar_features" ADD CONSTRAINT "_scholarship_page_v_version_detail_sidebar_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scholarship_page_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "scholarships_eligibility_order_idx" ON "scholarships_eligibility" USING btree ("_order");
  CREATE INDEX "scholarships_eligibility_parent_id_idx" ON "scholarships_eligibility" USING btree ("_parent_id");
  CREATE INDEX "scholarships_benefits_order_idx" ON "scholarships_benefits" USING btree ("_order");
  CREATE INDEX "scholarships_benefits_parent_id_idx" ON "scholarships_benefits" USING btree ("_parent_id");
  CREATE INDEX "scholarships_teachers_order_idx" ON "scholarships_teachers" USING btree ("_order");
  CREATE INDEX "scholarships_teachers_parent_id_idx" ON "scholarships_teachers" USING btree ("_parent_id");
  CREATE INDEX "scholarships_required_documents_order_idx" ON "scholarships_required_documents" USING btree ("_order");
  CREATE INDEX "scholarships_required_documents_parent_id_idx" ON "scholarships_required_documents" USING btree ("_parent_id");
  CREATE INDEX "scholarships_selection_process_order_idx" ON "scholarships_selection_process" USING btree ("_order");
  CREATE INDEX "scholarships_selection_process_parent_id_idx" ON "scholarships_selection_process" USING btree ("_parent_id");
  CREATE INDEX "scholarships_faqs_order_idx" ON "scholarships_faqs" USING btree ("_order");
  CREATE INDEX "scholarships_faqs_parent_id_idx" ON "scholarships_faqs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "scholarships_slug_idx" ON "scholarships" USING btree ("slug");
  CREATE INDEX "scholarships_updated_at_idx" ON "scholarships" USING btree ("updated_at");
  CREATE INDEX "scholarships_created_at_idx" ON "scholarships" USING btree ("created_at");
  CREATE INDEX "scholarships__status_idx" ON "scholarships" USING btree ("_status");
  CREATE INDEX "_scholarships_v_version_eligibility_order_idx" ON "_scholarships_v_version_eligibility" USING btree ("_order");
  CREATE INDEX "_scholarships_v_version_eligibility_parent_id_idx" ON "_scholarships_v_version_eligibility" USING btree ("_parent_id");
  CREATE INDEX "_scholarships_v_version_benefits_order_idx" ON "_scholarships_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_scholarships_v_version_benefits_parent_id_idx" ON "_scholarships_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_scholarships_v_version_teachers_order_idx" ON "_scholarships_v_version_teachers" USING btree ("_order");
  CREATE INDEX "_scholarships_v_version_teachers_parent_id_idx" ON "_scholarships_v_version_teachers" USING btree ("_parent_id");
  CREATE INDEX "_scholarships_v_version_required_documents_order_idx" ON "_scholarships_v_version_required_documents" USING btree ("_order");
  CREATE INDEX "_scholarships_v_version_required_documents_parent_id_idx" ON "_scholarships_v_version_required_documents" USING btree ("_parent_id");
  CREATE INDEX "_scholarships_v_version_selection_process_order_idx" ON "_scholarships_v_version_selection_process" USING btree ("_order");
  CREATE INDEX "_scholarships_v_version_selection_process_parent_id_idx" ON "_scholarships_v_version_selection_process" USING btree ("_parent_id");
  CREATE INDEX "_scholarships_v_version_faqs_order_idx" ON "_scholarships_v_version_faqs" USING btree ("_order");
  CREATE INDEX "_scholarships_v_version_faqs_parent_id_idx" ON "_scholarships_v_version_faqs" USING btree ("_parent_id");
  CREATE INDEX "_scholarships_v_parent_idx" ON "_scholarships_v" USING btree ("parent_id");
  CREATE INDEX "_scholarships_v_version_version_slug_idx" ON "_scholarships_v" USING btree ("version_slug");
  CREATE INDEX "_scholarships_v_version_version_updated_at_idx" ON "_scholarships_v" USING btree ("version_updated_at");
  CREATE INDEX "_scholarships_v_version_version_created_at_idx" ON "_scholarships_v" USING btree ("version_created_at");
  CREATE INDEX "_scholarships_v_version_version__status_idx" ON "_scholarships_v" USING btree ("version__status");
  CREATE INDEX "_scholarships_v_created_at_idx" ON "_scholarships_v" USING btree ("created_at");
  CREATE INDEX "_scholarships_v_updated_at_idx" ON "_scholarships_v" USING btree ("updated_at");
  CREATE INDEX "_scholarships_v_latest_idx" ON "_scholarships_v" USING btree ("latest");
  CREATE INDEX "_scholarships_v_autosave_idx" ON "_scholarships_v" USING btree ("autosave");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_scholarships_id_idx" ON "payload_locked_documents_rels" USING btree ("scholarships_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_keywords_order_idx" ON "site_keywords" USING btree ("_order");
  CREATE INDEX "site_keywords_parent_id_idx" ON "site_keywords" USING btree ("_parent_id");
  CREATE INDEX "site_navigation_order_idx" ON "site_navigation" USING btree ("_order");
  CREATE INDEX "site_navigation_parent_id_idx" ON "site_navigation" USING btree ("_parent_id");
  CREATE INDEX "site__status_idx" ON "site" USING btree ("_status");
  CREATE INDEX "_site_v_version_keywords_order_idx" ON "_site_v_version_keywords" USING btree ("_order");
  CREATE INDEX "_site_v_version_keywords_parent_id_idx" ON "_site_v_version_keywords" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_navigation_order_idx" ON "_site_v_version_navigation" USING btree ("_order");
  CREATE INDEX "_site_v_version_navigation_parent_id_idx" ON "_site_v_version_navigation" USING btree ("_parent_id");
  CREATE INDEX "_site_v_version_version__status_idx" ON "_site_v" USING btree ("version__status");
  CREATE INDEX "_site_v_created_at_idx" ON "_site_v" USING btree ("created_at");
  CREATE INDEX "_site_v_updated_at_idx" ON "_site_v" USING btree ("updated_at");
  CREATE INDEX "_site_v_latest_idx" ON "_site_v" USING btree ("latest");
  CREATE INDEX "_site_v_autosave_idx" ON "_site_v" USING btree ("autosave");
  CREATE INDEX "home_hero_stats_order_idx" ON "home_hero_stats" USING btree ("_order");
  CREATE INDEX "home_hero_stats_parent_id_idx" ON "home_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "home_benefits_order_idx" ON "home_benefits" USING btree ("_order");
  CREATE INDEX "home_benefits_parent_id_idx" ON "home_benefits" USING btree ("_parent_id");
  CREATE INDEX "home_application_steps_order_idx" ON "home_application_steps" USING btree ("_order");
  CREATE INDEX "home_application_steps_parent_id_idx" ON "home_application_steps" USING btree ("_parent_id");
  CREATE INDEX "home__status_idx" ON "home" USING btree ("_status");
  CREATE INDEX "_home_v_version_hero_stats_order_idx" ON "_home_v_version_hero_stats" USING btree ("_order");
  CREATE INDEX "_home_v_version_hero_stats_parent_id_idx" ON "_home_v_version_hero_stats" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_benefits_order_idx" ON "_home_v_version_benefits" USING btree ("_order");
  CREATE INDEX "_home_v_version_benefits_parent_id_idx" ON "_home_v_version_benefits" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_application_steps_order_idx" ON "_home_v_version_application_steps" USING btree ("_order");
  CREATE INDEX "_home_v_version_application_steps_parent_id_idx" ON "_home_v_version_application_steps" USING btree ("_parent_id");
  CREATE INDEX "_home_v_version_version__status_idx" ON "_home_v" USING btree ("version__status");
  CREATE INDEX "_home_v_created_at_idx" ON "_home_v" USING btree ("created_at");
  CREATE INDEX "_home_v_updated_at_idx" ON "_home_v" USING btree ("updated_at");
  CREATE INDEX "_home_v_latest_idx" ON "_home_v" USING btree ("latest");
  CREATE INDEX "_home_v_autosave_idx" ON "_home_v" USING btree ("autosave");
  CREATE INDEX "about_sections_items_order_idx" ON "about_sections_items" USING btree ("_order");
  CREATE INDEX "about_sections_items_parent_id_idx" ON "about_sections_items" USING btree ("_parent_id");
  CREATE INDEX "about_sections_order_idx" ON "about_sections" USING btree ("_order");
  CREATE INDEX "about_sections_parent_id_idx" ON "about_sections" USING btree ("_parent_id");
  CREATE INDEX "about__status_idx" ON "about" USING btree ("_status");
  CREATE INDEX "_about_v_version_sections_items_order_idx" ON "_about_v_version_sections_items" USING btree ("_order");
  CREATE INDEX "_about_v_version_sections_items_parent_id_idx" ON "_about_v_version_sections_items" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_sections_order_idx" ON "_about_v_version_sections" USING btree ("_order");
  CREATE INDEX "_about_v_version_sections_parent_id_idx" ON "_about_v_version_sections" USING btree ("_parent_id");
  CREATE INDEX "_about_v_version_version__status_idx" ON "_about_v" USING btree ("version__status");
  CREATE INDEX "_about_v_created_at_idx" ON "_about_v" USING btree ("created_at");
  CREATE INDEX "_about_v_updated_at_idx" ON "_about_v" USING btree ("updated_at");
  CREATE INDEX "_about_v_latest_idx" ON "_about_v" USING btree ("latest");
  CREATE INDEX "_about_v_autosave_idx" ON "_about_v" USING btree ("autosave");
  CREATE INDEX "contact_info_items_lines_order_idx" ON "contact_info_items_lines" USING btree ("_order");
  CREATE INDEX "contact_info_items_lines_parent_id_idx" ON "contact_info_items_lines" USING btree ("_parent_id");
  CREATE INDEX "contact_info_items_order_idx" ON "contact_info_items" USING btree ("_order");
  CREATE INDEX "contact_info_items_parent_id_idx" ON "contact_info_items" USING btree ("_parent_id");
  CREATE INDEX "contact__status_idx" ON "contact" USING btree ("_status");
  CREATE INDEX "_contact_v_version_info_items_lines_order_idx" ON "_contact_v_version_info_items_lines" USING btree ("_order");
  CREATE INDEX "_contact_v_version_info_items_lines_parent_id_idx" ON "_contact_v_version_info_items_lines" USING btree ("_parent_id");
  CREATE INDEX "_contact_v_version_info_items_order_idx" ON "_contact_v_version_info_items" USING btree ("_order");
  CREATE INDEX "_contact_v_version_info_items_parent_id_idx" ON "_contact_v_version_info_items" USING btree ("_parent_id");
  CREATE INDEX "_contact_v_version_version__status_idx" ON "_contact_v" USING btree ("version__status");
  CREATE INDEX "_contact_v_created_at_idx" ON "_contact_v" USING btree ("created_at");
  CREATE INDEX "_contact_v_updated_at_idx" ON "_contact_v" USING btree ("updated_at");
  CREATE INDEX "_contact_v_latest_idx" ON "_contact_v" USING btree ("latest");
  CREATE INDEX "_contact_v_autosave_idx" ON "_contact_v" USING btree ("autosave");
  CREATE INDEX "faq_items_order_idx" ON "faq_items" USING btree ("_order");
  CREATE INDEX "faq_items_parent_id_idx" ON "faq_items" USING btree ("_parent_id");
  CREATE INDEX "faq_home_preview_questions_order_idx" ON "faq_home_preview_questions" USING btree ("_order");
  CREATE INDEX "faq_home_preview_questions_parent_id_idx" ON "faq_home_preview_questions" USING btree ("_parent_id");
  CREATE INDEX "faq__status_idx" ON "faq" USING btree ("_status");
  CREATE INDEX "_faq_v_version_items_order_idx" ON "_faq_v_version_items" USING btree ("_order");
  CREATE INDEX "_faq_v_version_items_parent_id_idx" ON "_faq_v_version_items" USING btree ("_parent_id");
  CREATE INDEX "_faq_v_version_home_preview_questions_order_idx" ON "_faq_v_version_home_preview_questions" USING btree ("_order");
  CREATE INDEX "_faq_v_version_home_preview_questions_parent_id_idx" ON "_faq_v_version_home_preview_questions" USING btree ("_parent_id");
  CREATE INDEX "_faq_v_version_version__status_idx" ON "_faq_v" USING btree ("version__status");
  CREATE INDEX "_faq_v_created_at_idx" ON "_faq_v" USING btree ("created_at");
  CREATE INDEX "_faq_v_updated_at_idx" ON "_faq_v" USING btree ("updated_at");
  CREATE INDEX "_faq_v_latest_idx" ON "_faq_v" USING btree ("latest");
  CREATE INDEX "_faq_v_autosave_idx" ON "_faq_v" USING btree ("autosave");
  CREATE INDEX "scholarship_page_detail_sidebar_features_order_idx" ON "scholarship_page_detail_sidebar_features" USING btree ("_order");
  CREATE INDEX "scholarship_page_detail_sidebar_features_parent_id_idx" ON "scholarship_page_detail_sidebar_features" USING btree ("_parent_id");
  CREATE INDEX "scholarship_page__status_idx" ON "scholarship_page" USING btree ("_status");
  CREATE INDEX "_scholarship_page_v_version_detail_sidebar_features_order_idx" ON "_scholarship_page_v_version_detail_sidebar_features" USING btree ("_order");
  CREATE INDEX "_scholarship_page_v_version_detail_sidebar_features_parent_id_idx" ON "_scholarship_page_v_version_detail_sidebar_features" USING btree ("_parent_id");
  CREATE INDEX "_scholarship_page_v_version_version__status_idx" ON "_scholarship_page_v" USING btree ("version__status");
  CREATE INDEX "_scholarship_page_v_created_at_idx" ON "_scholarship_page_v" USING btree ("created_at");
  CREATE INDEX "_scholarship_page_v_updated_at_idx" ON "_scholarship_page_v" USING btree ("updated_at");
  CREATE INDEX "_scholarship_page_v_latest_idx" ON "_scholarship_page_v" USING btree ("latest");
  CREATE INDEX "_scholarship_page_v_autosave_idx" ON "_scholarship_page_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "scholarships_eligibility" CASCADE;
  DROP TABLE "scholarships_benefits" CASCADE;
  DROP TABLE "scholarships_teachers" CASCADE;
  DROP TABLE "scholarships_required_documents" CASCADE;
  DROP TABLE "scholarships_selection_process" CASCADE;
  DROP TABLE "scholarships_faqs" CASCADE;
  DROP TABLE "scholarships" CASCADE;
  DROP TABLE "_scholarships_v_version_eligibility" CASCADE;
  DROP TABLE "_scholarships_v_version_benefits" CASCADE;
  DROP TABLE "_scholarships_v_version_teachers" CASCADE;
  DROP TABLE "_scholarships_v_version_required_documents" CASCADE;
  DROP TABLE "_scholarships_v_version_selection_process" CASCADE;
  DROP TABLE "_scholarships_v_version_faqs" CASCADE;
  DROP TABLE "_scholarships_v" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_keywords" CASCADE;
  DROP TABLE "site_navigation" CASCADE;
  DROP TABLE "site" CASCADE;
  DROP TABLE "_site_v_version_keywords" CASCADE;
  DROP TABLE "_site_v_version_navigation" CASCADE;
  DROP TABLE "_site_v" CASCADE;
  DROP TABLE "home_hero_stats" CASCADE;
  DROP TABLE "home_benefits" CASCADE;
  DROP TABLE "home_application_steps" CASCADE;
  DROP TABLE "home" CASCADE;
  DROP TABLE "_home_v_version_hero_stats" CASCADE;
  DROP TABLE "_home_v_version_benefits" CASCADE;
  DROP TABLE "_home_v_version_application_steps" CASCADE;
  DROP TABLE "_home_v" CASCADE;
  DROP TABLE "about_sections_items" CASCADE;
  DROP TABLE "about_sections" CASCADE;
  DROP TABLE "about" CASCADE;
  DROP TABLE "_about_v_version_sections_items" CASCADE;
  DROP TABLE "_about_v_version_sections" CASCADE;
  DROP TABLE "_about_v" CASCADE;
  DROP TABLE "contact_info_items_lines" CASCADE;
  DROP TABLE "contact_info_items" CASCADE;
  DROP TABLE "contact" CASCADE;
  DROP TABLE "_contact_v_version_info_items_lines" CASCADE;
  DROP TABLE "_contact_v_version_info_items" CASCADE;
  DROP TABLE "_contact_v" CASCADE;
  DROP TABLE "faq_items" CASCADE;
  DROP TABLE "faq_home_preview_questions" CASCADE;
  DROP TABLE "faq" CASCADE;
  DROP TABLE "_faq_v_version_items" CASCADE;
  DROP TABLE "_faq_v_version_home_preview_questions" CASCADE;
  DROP TABLE "_faq_v" CASCADE;
  DROP TABLE "scholarship_page_detail_sidebar_features" CASCADE;
  DROP TABLE "scholarship_page" CASCADE;
  DROP TABLE "_scholarship_page_v_version_detail_sidebar_features" CASCADE;
  DROP TABLE "_scholarship_page_v" CASCADE;
  DROP TYPE "public"."enum_scholarships_status";
  DROP TYPE "public"."enum__scholarships_v_version_status";
  DROP TYPE "public"."enum_site_status";
  DROP TYPE "public"."enum__site_v_version_status";
  DROP TYPE "public"."enum_home_benefits_icon";
  DROP TYPE "public"."enum_home_status";
  DROP TYPE "public"."enum__home_v_version_benefits_icon";
  DROP TYPE "public"."enum__home_v_version_status";
  DROP TYPE "public"."enum_about_status";
  DROP TYPE "public"."enum__about_v_version_status";
  DROP TYPE "public"."enum_contact_info_items_icon";
  DROP TYPE "public"."enum_contact_info_items_type";
  DROP TYPE "public"."enum_contact_status";
  DROP TYPE "public"."enum__contact_v_version_info_items_icon";
  DROP TYPE "public"."enum__contact_v_version_info_items_type";
  DROP TYPE "public"."enum__contact_v_version_status";
  DROP TYPE "public"."enum_faq_status";
  DROP TYPE "public"."enum__faq_v_version_status";
  DROP TYPE "public"."enum_scholarship_page_detail_sidebar_features_icon";
  DROP TYPE "public"."enum_scholarship_page_status";
  DROP TYPE "public"."enum__scholarship_page_v_version_detail_sidebar_features_icon";
  DROP TYPE "public"."enum__scholarship_page_v_version_status";`)
}
