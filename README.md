# Scholarship Portal

Next.js + Payload CMS (Postgres / Neon).

## Getting Started

```bash
pnpm install
# Configure .env.local (see .env.example) — use a LOCAL Neon branch, not production
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). Admin: [/admin](http://localhost:3000/admin).

Optional bootstrap of demo content (local / empty DB only):

```bash
pnpm seed
```

## Environments

| Env | Neon DB | Schema updates |
|---|---|---|
| Local (`pnpm dev`) | Local branch in `.env.local` | Auto **push** (fine) |
| Production (Vercel) | Production branch in Vercel env | **`payload migrate`** only |

Never point local `.env.local` at the production database.

## Deploy / Vercel

Set Build Command to:

```bash
pnpm ci
```

That runs:

1. Clear Payload `batch = -1` dev markers (no data deleted)
2. `payload migrate` (additive schema only)
3. `pnpm build`

Required env on Vercel: `DATABASE_URL`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_APP_URL`.

### First deploy after migrations (existing prod schema)

If production already has tables from earlier push and the baseline has not been recorded yet:

1. Temporarily point a local shell at the **production** URL (or use Neon SQL)
2. Run `pnpm migrate:mark-baseline` against that URL **only if** `public.site` already exists
3. Or let the first `pnpm ci` run — baseline `up` **skips CREATE** when `public.site` exists, so data is preserved

## Schema change workflow

1. Edit collections/globals locally → `pnpm dev` (push updates local DB)
2. When ready to ship:
   ```bash
   pnpm payload migrate:create short-description
   ```
3. Review generated SQL — do **not** commit destructive `DROP` in `up`
4. Commit `src/migrations/` and deploy

Content-only edits: change in `/admin` and publish. Revalidation hooks refresh the public site without rebuilding.

## Hard bans (production)

- `DROP SCHEMA` / wiping the DB
- `pnpm payload migrate:fresh` / `migrate:reset` / `migrate:refresh`
- `pnpm seed` against a DB with real content
- Sharing one Neon branch for local + production
