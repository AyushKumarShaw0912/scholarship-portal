import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Applications collection: marks-based fields (no uploads).
 * Idempotent — safe if table missing, push-synced, or partially migrated.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DO $$
    BEGIN
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_applications_target') THEN
        CREATE TYPE "public"."enum_applications_target" AS ENUM('jee', 'neet');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_applications_status') THEN
        CREATE TYPE "public"."enum_applications_status" AS ENUM('new', 'reviewed', 'shortlisted', 'rejected');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_applications_board') THEN
        CREATE TYPE "public"."enum_applications_board" AS ENUM('wbbse', 'cbse', 'icse', 'other');
      END IF;
      IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_applications_academic_trend') THEN
        CREATE TYPE "public"."enum_applications_academic_trend" AS ENUM('improving', 'stable', 'declining');
      END IF;
    END $$;
  `)

  const existing = await db.execute(sql`
    SELECT to_regclass('public.applications') AS reg
  `)
  const reg = (existing as unknown as { rows?: Array<{ reg: string | null }> })
    .rows?.[0]?.reg

  if (!reg) {
    payload.logger.info('Creating applications table (marks schema).')
    await db.execute(sql`
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

      CREATE INDEX "applications_updated_at_idx" ON "applications" USING btree ("updated_at");
      CREATE INDEX "applications_created_at_idx" ON "applications" USING btree ("created_at");
    `)
    return
  }

  payload.logger.info('applications exists — ensuring marks columns (idempotent).')

  await db.execute(sql`
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "board" "enum_applications_board";
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "school_name" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "class8_percentage" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "class9_percentage" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "class10_pre_board_percentage" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "class10_total_marks" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "class10_max_marks" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject1_name" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject1_obtained" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject1_max" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject2_name" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject2_obtained" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject2_max" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject3_name" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject3_obtained" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject3_max" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject4_name" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject4_obtained" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject4_max" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject5_name" varchar;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject5_obtained" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "subject5_max" numeric;
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "academic_trend" "enum_applications_academic_trend";
    ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "trend_score" numeric;
  `)

  await db.execute(sql`
    UPDATE "applications"
    SET
      "board" = COALESCE("board", 'other'),
      "school_name" = COALESCE(NULLIF("school_name", ''), 'Unknown'),
      "class8_percentage" = COALESCE("class8_percentage", 0),
      "class9_percentage" = COALESCE("class9_percentage", 0),
      "class10_pre_board_percentage" = COALESCE("class10_pre_board_percentage", 0),
      "class10_total_marks" = COALESCE("class10_total_marks", 0),
      "class10_max_marks" = COALESCE("class10_max_marks", 100),
      "subject1_name" = COALESCE(NULLIF("subject1_name", ''), 'Subject 1'),
      "subject1_obtained" = COALESCE("subject1_obtained", 0),
      "subject1_max" = COALESCE("subject1_max", 100),
      "subject2_name" = COALESCE(NULLIF("subject2_name", ''), 'Subject 2'),
      "subject2_obtained" = COALESCE("subject2_obtained", 0),
      "subject2_max" = COALESCE("subject2_max", 100),
      "subject3_name" = COALESCE(NULLIF("subject3_name", ''), 'Subject 3'),
      "subject3_obtained" = COALESCE("subject3_obtained", 0),
      "subject3_max" = COALESCE("subject3_max", 100),
      "subject4_name" = COALESCE(NULLIF("subject4_name", ''), 'Subject 4'),
      "subject4_obtained" = COALESCE("subject4_obtained", 0),
      "subject4_max" = COALESCE("subject4_max", 100),
      "subject5_name" = COALESCE(NULLIF("subject5_name", ''), 'Subject 5'),
      "subject5_obtained" = COALESCE("subject5_obtained", 0),
      "subject5_max" = COALESCE("subject5_max", 100),
      "academic_trend" = COALESCE("academic_trend", 'stable'),
      "trend_score" = COALESCE("trend_score", 0)
    WHERE
      "board" IS NULL
      OR "school_name" IS NULL
      OR "class8_percentage" IS NULL
      OR "class9_percentage" IS NULL
      OR "class10_pre_board_percentage" IS NULL
      OR "class10_total_marks" IS NULL
      OR "class10_max_marks" IS NULL
      OR "subject1_name" IS NULL
      OR "subject1_obtained" IS NULL
      OR "subject1_max" IS NULL
      OR "subject2_name" IS NULL
      OR "subject2_obtained" IS NULL
      OR "subject2_max" IS NULL
      OR "subject3_name" IS NULL
      OR "subject3_obtained" IS NULL
      OR "subject3_max" IS NULL
      OR "subject4_name" IS NULL
      OR "subject4_obtained" IS NULL
      OR "subject4_max" IS NULL
      OR "subject5_name" IS NULL
      OR "subject5_obtained" IS NULL
      OR "subject5_max" IS NULL
      OR "academic_trend" IS NULL
      OR "trend_score" IS NULL;
  `)

  await db.execute(sql`
    ALTER TABLE "applications" ALTER COLUMN "board" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "school_name" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "class8_percentage" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "class9_percentage" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "class10_pre_board_percentage" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "class10_total_marks" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "class10_max_marks" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject1_name" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject1_obtained" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject1_max" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject2_name" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject2_obtained" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject2_max" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject3_name" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject3_obtained" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject3_max" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject4_name" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject4_obtained" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject4_max" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject5_name" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject5_obtained" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "subject5_max" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "academic_trend" SET NOT NULL;
    ALTER TABLE "applications" ALTER COLUMN "trend_score" SET NOT NULL;
  `)

  // Drop legacy columns from earlier schemas (uploads / simplified percents / current class).
  await db.execute(sql`
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "current_class" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "class10_board_marksheet_id" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "class10_pre_board_marksheet_id" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "class8_marksheet_id" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "class9_marksheet_id" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "board_other" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "class10_overall_percent" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "mathematics_percent" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "physical_science_percent" CASCADE;
    ALTER TABLE "applications" DROP COLUMN IF EXISTS "life_science_percent" CASCADE;
  `)
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.warn(
    'Down migration for applications marks schema is a no-op (non-destructive policy).',
  )
  await db.execute(sql`SELECT 1`)
}
