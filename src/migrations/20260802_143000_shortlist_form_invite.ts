import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Additive: shortlist invite email CMS fields on site + formInviteSentAt on applications.
 */
export async function up({ db, payload }: MigrateUpArgs): Promise<void> {
  const site = await db.execute(sql`
    SELECT to_regclass('public.site') AS reg
  `)
  const siteReg = (site as unknown as { rows?: Array<{ reg: string | null }> })
    .rows?.[0]?.reg

  if (siteReg) {
    payload.logger.info('Adding shortlist email fields to site global.')
    await db.execute(sql`
      ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "shortlist_email_subject" varchar;
      ALTER TABLE "site" ADD COLUMN IF NOT EXISTS "shortlist_email_body" jsonb;
    `)
  } else {
    payload.logger.info('site table missing — shortlist email columns deferred.')
  }

  const siteV = await db.execute(sql`
    SELECT to_regclass('public._site_v') AS reg
  `)
  const siteVReg = (siteV as unknown as { rows?: Array<{ reg: string | null }> })
    .rows?.[0]?.reg

  if (siteVReg) {
    await db.execute(sql`
      ALTER TABLE "_site_v" ADD COLUMN IF NOT EXISTS "version_shortlist_email_subject" varchar;
      ALTER TABLE "_site_v" ADD COLUMN IF NOT EXISTS "version_shortlist_email_body" jsonb;
    `)
  }

  const applications = await db.execute(sql`
    SELECT to_regclass('public.applications') AS reg
  `)
  const applicationsReg = (
    applications as unknown as { rows?: Array<{ reg: string | null }> }
  ).rows?.[0]?.reg

  if (applicationsReg) {
    payload.logger.info('Adding form_invite_sent_at to applications.')
    await db.execute(sql`
      ALTER TABLE "applications" ADD COLUMN IF NOT EXISTS "form_invite_sent_at" timestamp(3) with time zone;
    `)
  } else {
    payload.logger.info('applications table missing — form_invite_sent_at deferred.')
  }
}

export async function down({ db, payload }: MigrateDownArgs): Promise<void> {
  payload.logger.warn('Down migration for shortlist form invite fields is a no-op.')
  await db.execute(sql`SELECT 1`)
}
