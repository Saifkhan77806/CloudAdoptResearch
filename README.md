# Swasthya Connect

**Helping communities access online healthcare.** Swasthya Connect is a responsive information portal that helps people in India find healthcare access services and continue to verified official providers and directories.

## Production

**Live application:** [Live Deployment URL](https://project-three-woad.vercel.app/)

Open the site on a supported browser and choose **Install app** to add Swasthya Connect to your device. The browser asks you to confirm installation. On iPhone or iPad, use **Share → Add to Home Screen**.

## Features

- **Healthcare resource directory:** Search by keyword, category, provider type, state or union territory, and confirmed language.
- **Resource details:** Read access instructions, verified information, availability notes, and safe links to the provider’s official site.
- **Nearby help:** Enter a state, district, and locality to prepare a search of official facility directories. Location is not continuously tracked or stored.
- **How it works:** Plain-language guidance in English and Hindi explains how to use the portal.
- **Emergency assistance:** Shows the national emergency number, 112.
- **Installable web app:** Includes a web app manifest, app icons, and browser-based install flow. A small offline page appears if a page cannot load without a connection; directory data itself is not cached for offline use.
- **Accessible, mobile-first interface:** Keyboard navigation, screen-reader labels, readable contrast, and touch-friendly controls.

## Showcase: common user journeys

1. **Find an online service:** Search the directory or choose a category, review a listing, and continue to the provider’s official website.
2. **Look up local facilities:** Enter an area on Nearby Help, then open an official directory to check current listings. Swasthya Connect does not claim a facility is nearby or provide unverified distances, hours, or contact details.
3. **Check a listing before using it:** Review the verification date and access instructions, then confirm changing details with the provider.
4. **Install the portal:** Use the browser’s install prompt on supported desktop and Android browsers, or the device’s Add to Home Screen option.

## Application routes

| Route | What it provides |
| --- | --- |
| `/` | Homepage, directory search, and service categories |
| `/healthcare-resources` | Searchable healthcare resource directory |
| `/healthcare-resources/[slug]` | Details for a verified, published resource |
| `/nearby-help` | Manual location entry and official facility directory links |
| `/how-it-works` | English and Hindi usage guidance |
| `/about` | Purpose, verification approach, privacy, and limitations |

## Technology

- Next.js App Router and React
- TypeScript and Tailwind CSS
- Supabase Postgres, generated TypeScript types, and row-level security
- Progressive Web App manifest and service worker

## Run locally

Requirements: Node.js/npm. To browse the site without connecting a directory database:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase setup

The directory uses a separate `healthcare_resources` table. Apply migrations in timestamp order:

1. `supabase/migrations/20261020090000_create_healthcare_resources.sql`
2. `supabase/migrations/20261020110000_index_healthcare_resource_search.sql`

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local` for local directory access. Do not expose or use a service-role key in the browser or application.

### Load resource data

- **Local Supabase:** Run `supabase start`, then `supabase db reset`. The CLI configuration loads `supabase/seed.sql` after migrations.
- **Hosted Supabase:** In the Supabase Dashboard SQL Editor, run the contents of both migrations in order, then run `supabase/seed.sql`.

The seed includes checked government, NGO, and private-provider listings across the available filters. Fictional filter-testing records are explicitly marked unverified and unpublished; public users cannot read them. Never mark fictional records verified or published. Recheck provider URLs and claims before publishing future records.

RLS allows public reads only when a resource is both verified and published. Public writes are denied. The original survey tables and migration history are preserved.

## Project checks

```bash
npm run lint
npm run typecheck
npm run build
```

`npm run typecheck` checks the active Next.js App Router code. This project does not currently define an `npm test` script.

## Scope and safety

Swasthya Connect is an information directory, not a healthcare provider. It does not diagnose conditions, provide emergency triage, book appointments, collect patient records, or store precise location. Service availability and terms can change; confirm them with the linked provider. For emergencies in India, call **112**.
