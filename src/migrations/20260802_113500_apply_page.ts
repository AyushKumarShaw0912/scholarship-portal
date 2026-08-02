import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Apply page global (form copy). Idempotent — skips when public.apply exists.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const existing = await db.execute(sql`
    SELECT to_regclass('public.apply') AS reg
  `)
  const reg = (existing as unknown as { rows?: Array<{ reg: string | null }> })
    .rows?.[0]?.reg

  if (reg) {
    payload.logger.info('Apply global schema already present. Skipping CREATE.')
    return
  }

  payload.logger.info('Creating Apply global schema.')

  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_apply_status') THEN
        CREATE TYPE "public"."enum_apply_status" AS ENUM('draft', 'published');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum__apply_v_version_status') THEN
        CREATE TYPE "public"."enum__apply_v_version_status" AS ENUM('draft', 'published');
      END IF;
    END $$;

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

    ALTER TABLE "apply_form_subject_defaults"
      ADD CONSTRAINT "apply_form_subject_defaults_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."apply"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_apply_v_version_form_subject_defaults"
      ADD CONSTRAINT "_apply_v_version_form_subject_defaults_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "public"."_apply_v"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX "apply_form_subject_defaults_order_idx"
      ON "apply_form_subject_defaults" USING btree ("_order");
    CREATE INDEX "apply_form_subject_defaults_parent_id_idx"
      ON "apply_form_subject_defaults" USING btree ("_parent_id");
    CREATE INDEX "apply_updated_at_idx" ON "apply" USING btree ("updated_at");
    CREATE INDEX "apply_created_at_idx" ON "apply" USING btree ("created_at");
    CREATE INDEX "apply__status_idx" ON "apply" USING btree ("_status");

    CREATE INDEX "_apply_v_version_form_subject_defaults_order_idx"
      ON "_apply_v_version_form_subject_defaults" USING btree ("_order");
    CREATE INDEX "_apply_v_version_form_subject_defaults_parent_id_idx"
      ON "_apply_v_version_form_subject_defaults" USING btree ("_parent_id");
    CREATE INDEX "_apply_v_version_version_updated_at_idx"
      ON "_apply_v" USING btree ("version_updated_at");
    CREATE INDEX "_apply_v_version_version_created_at_idx"
      ON "_apply_v" USING btree ("version_created_at");
    CREATE INDEX "_apply_v_version_version__status_idx"
      ON "_apply_v" USING btree ("version__status");
    CREATE INDEX "_apply_v_created_at_idx" ON "_apply_v" USING btree ("created_at");
    CREATE INDEX "_apply_v_updated_at_idx" ON "_apply_v" USING btree ("updated_at");
    CREATE INDEX "_apply_v_latest_idx" ON "_apply_v" USING btree ("latest");
    CREATE INDEX "_apply_v_autosave_idx" ON "_apply_v" USING btree ("autosave");
  `)
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.warn('Down migration for Apply global is a no-op.')
  await db.execute(sql`SELECT 1`)
}
