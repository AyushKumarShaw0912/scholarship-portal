/**
 * Removes Payload "dev" push markers (batch = -1) so `payload migrate` can run
 * non-interactively in CI. Does not drop tables or delete CMS content.
 */
import pg from "pg";

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
  const table = await client.query(
    "SELECT to_regclass('public.payload_migrations') AS reg",
  );

  if (!table.rows[0]?.reg) {
    console.log("payload_migrations not found — nothing to clear");
  } else {
    const deleted = await client.query(
      "DELETE FROM payload_migrations WHERE batch = -1 RETURNING name, batch",
    );
    console.log(
      `Cleared ${deleted.rowCount} dev migration marker(s)`,
      deleted.rows,
    );
  }
} finally {
  await client.end();
}
