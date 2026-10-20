# Swasthya Connect

Swasthya Connect helps people in India find online healthcare services and official facility directories. The active site is the Next.js App Router in `app/`.

## Supabase setup

Apply the healthcare resource migrations in timestamp order:

1. `supabase/migrations/20261020090000_create_healthcare_resources.sql`
2. `supabase/migrations/20261020110000_index_healthcare_resource_search.sql`

They add a separate `healthcare_resources` table and leave the existing survey tables and migration history unchanged. New resource records default to unpublished and unverified. Public reads are restricted by RLS to records marked verified and published; public roles receive no write access. Only add listings after their current official URLs and displayed claims are checked. No service-role credential belongs in the application.

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for directory access. If they are absent, or the migration is not applied, the public portal remains available and directory queries show an unavailable state. The initial migration publishes only the verified Emergency Response Support System (112) listing; other services must remain unpublished until checked. `/nearby-help` links to official facility and scheme search portals without claiming facility proximity.

## Project checks

`supabase/config.toml` configures the Supabase CLI to load `supabase/seed.sql` during a local `supabase db reset` (after migrations). For a hosted project, apply the migrations and run `supabase/seed.sql` in that project's Dashboard **SQL Editor**. The seed contains official government healthcare resources whose links and claims were checked on 2026-10-20, plus three clearly marked fictional examples. The official resources are published; the fictional examples remain unverified and unpublished. To remove only fictional examples, run `delete from public.healthcare_resources where slug in ('demo-online-consultation', 'demo-government-health-service', 'demo-facility-directory');`. The official entries are useful in production; do not publish the fictional examples. Do not put a service-role key in the app.

- `npm run lint`
- `npm run typecheck` (checks the active Next.js App Router code)
- `npm run build`

The old survey routes redirect to the healthcare portal. Survey source files, data tables, and the original survey migration remain in the repository for preservation.
