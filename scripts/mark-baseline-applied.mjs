/**
 * Records the baseline migration as applied without running CREATE statements.
 * Use only when public.site already exists (schema came from local push).
 */
import pg from "pg";

const MIGRATION_NAME = "20260802_041617_initial";
const connectionString = process.env.DATABASE_URL?.trim();

if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

await client.connect();

try {
  const site = await client.query("SELECT to_regclass('public.site') AS reg");
  if (!site.rows[0]?.reg) {
    console.error(
      "public.site is missing — run an empty-DB migrate instead of marking baseline applied.",
    );
    process.exit(1);
  }

  await client.query(`
    CREATE TABLE IF NOT EXISTS payload_migrations (
      id serial PRIMARY KEY,
      name varchar,
      batch numeric,
      updated_at timestamp(3) with time zone DEFAULT now() NOT NULL,
      created_at timestamp(3) with time zone DEFAULT now() NOT NULL
    )
  `);

  const existing = await client.query(
    "SELECT id FROM payload_migrations WHERE name = $1 LIMIT 1",
    [MIGRATION_NAME],
  );

  if (existing.rowCount) {
    console.log(`Baseline already recorded: ${MIGRATION_NAME}`);
  } else {
    await client.query(
      `INSERT INTO payload_migrations (name, batch, updated_at, created_at)
       VALUES ($1, 1, now(), now())`,
      [MIGRATION_NAME],
    );
    console.log(`Marked baseline applied: ${MIGRATION_NAME}`);
  }
} finally {
  await client.end();
}
