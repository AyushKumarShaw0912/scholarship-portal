import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Add email, phone, and guardianPhone to applications (and Apply CMS label columns).
 * Idempotent ADD COLUMN IF NOT EXISTS.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const applications = await db.execute(sql`
    SELECT to_regclass('public.applications') AS reg
  `)
  const applicationsReg = (
    applications as unknown as { rows?: Array<{ reg: string | null }> }
  ).rows?.[0]?.reg

  if (applicationsReg) {
    payload.logger.info('Adding contact fields to applications.')
    await db.execute(sql`
      ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "email" varchar;
      ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "phone" varchar;
      ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "guardian_phone" varchar;

      UPDATE "applications"
      SET
        "email" = COALESCE(NULLIF("email", ''), 'unknown@example.com'),
        "phone" = COALESCE(NULLIF("phone", ''), '0000000000'),
        "guardian_phone" = COALESCE(NULLIF("guardian_phone", ''), '0000000000')
      WHERE
        "email" IS NULL
        OR "phone" IS NULL
        OR "guardian_phone" IS NULL;

      ALTER TABLE "applications" ALTER COLUMN "email" SET NOT NULL;
      ALTER TABLE "applications" ALTER COLUMN "phone" SET NOT NULL;
      ALTER TABLE "applications" ALTER COLUMN "guardian_phone" SET NOT NULL;
    `)
  } else {
    payload.logger.info('applications table missing — contact columns deferred.')
  }

  const apply = await db.execute(sql`
    SELECT to_regclass('public.apply') AS reg
  `)
  const applyReg = (apply as unknown as { rows?: Array<{ reg: string | null }> })
    .rows?.[0]?.reg

  if (applyReg) {
    payload.logger.info('Adding contact label fields to apply global.')
    await db.execute(sql`
      ALTER TABLE "apply" ADD COLUMN IF NOT EXISTS "form_labels_email" varchar;
      ALTER TABLE "apply" ADD COLUMN IF NOT EXISTS "form_labels_phone" varchar;
      ALTER TABLE "apply" ADD COLUMN IF NOT EXISTS "form_labels_guardian_phone" varchar;

      ALTER TABLE "_apply_v" ADD COLUMN IF NOT EXISTS "version_form_labels_email" varchar;
      ALTER TABLE "_apply_v" ADD COLUMN IF NOT EXISTS "version_form_labels_phone" varchar;
      ALTER TABLE "_apply_v" ADD COLUMN IF NOT EXISTS "version_form_labels_guardian_phone" varchar;
    `)
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.warn('Down migration for application contact fields is a no-op.')
  await db.execute(sql`SELECT 1`)
}
