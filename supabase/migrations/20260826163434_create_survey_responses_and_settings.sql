/*
# Create survey_responses and app_settings tables

1. New Tables
- `survey_responses`
  - `id` (uuid, primary key)
  - `response_code` (text, unique, human-friendly code like CA-2026-000001)
  - `institute_type` (text, not null) — School/College/University/Training Institute/Other
  - `institute_name` (text, optional)
  - `student_count` (text) — bucket label
  - `employee_count` (text) — bucket label
  - `location` (text, optional)
  - `cloud_adoption` (text, not null) — Yes extensively / Yes partially / No / Planning to adopt / Not sure
  - `adoption_duration` (text, optional) — duration bucket
  - `deployment_model` (text, optional) — Public/Private/Hybrid/Community/Not sure
  - `cloud_services` (jsonb, default []) — array of selected services
  - `service_usage_level` (integer, optional) — 1..5
  - `adoption_drivers` (jsonb, default {}) — map of driver -> 1..5 rating
  - `benefits` (jsonb, default []) — array of selected benefits
  - `challenges` (jsonb, default []) — array of selected challenges
  - `non_adoption_reasons` (jsonb, default []) — array of reasons (for non-adopters)
  - `challenge_significance` (integer, optional) — 1..5
  - `satisfaction` (integer, optional) — 1..5
  - `future_adoption` (text, optional) — Definitely Yes / Probably Yes / Not Sure / Probably No / Definitely No
  - `future_areas` (jsonb, default []) — array of areas likely to move to cloud
  - `comments` (text, optional)
  - `is_demo` (boolean, default false) — marks seeded demo data
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())
- `app_settings`
  - `id` (uuid, primary key)
  - `project_title` (text, default 'CloudAdopt')
  - `survey_status` (text, default 'open') — 'open' or 'closed'
  - `updated_at` (timestamptz, default now())
  - Single row enforced by id default.

2. Indexes
- `survey_responses_response_code_key` unique on response_code
- `survey_responses_created_at_idx` on created_at
- `survey_responses_institute_type_idx` on institute_type
- `survey_responses_cloud_adoption_idx` on cloud_adoption

3. Security
- Enable RLS on both tables.
- survey_responses: anyone (anon) may INSERT a new response (public survey). SELECT/UPDATE/DELETE restricted to authenticated admins.
- app_settings: anyone may SELECT (so the public survey page can read survey_status). UPDATE restricted to authenticated admins. No public INSERT.
- A trigger maintains `updated_at` on both tables.

4. Notes
- response_code is generated server-side via a sequence-backed function so codes are unique and sequential: CA-YYYY-NNNNNN.
- A default settings row is inserted.
*/

create extension if not exists "pgcrypto";

-- Sequence for response numbering
create sequence if not exists survey_response_seq start 1;

-- Function to generate the next human-friendly response code
create or replace function generate_response_code()
returns text
language sql
as $$
  select 'CA-' || to_char(now(), 'YYYY') || '-' || lpad((nextval('survey_response_seq'))::text, 6, '0');
$$;

create table if not exists survey_responses (
  id uuid primary key default gen_random_uuid(),
  response_code text unique not null default generate_response_code(),
  institute_type text not null,
  institute_name text,
  student_count text,
  employee_count text,
  location text,
  cloud_adoption text not null,
  adoption_duration text,
  deployment_model text,
  cloud_services jsonb not null default '[]'::jsonb,
  service_usage_level integer,
  adoption_drivers jsonb not null default '{}'::jsonb,
  benefits jsonb not null default '[]'::jsonb,
  challenges jsonb not null default '[]'::jsonb,
  non_adoption_reasons jsonb not null default '[]'::jsonb,
  challenge_significance integer,
  satisfaction integer,
  future_adoption text,
  future_areas jsonb not null default '[]'::jsonb,
  comments text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint chk_satisfaction check (satisfaction is null or (satisfaction between 1 and 5)),
  constraint chk_usage_level check (service_usage_level is null or (service_usage_level between 1 and 5)),
  constraint chk_challenge_sig check (challenge_significance is null or (challenge_significance between 1 and 5))
);

create index if not exists survey_responses_created_at_idx on survey_responses (created_at);
create index if not exists survey_responses_institute_type_idx on survey_responses (institute_type);
create index if not exists survey_responses_cloud_adoption_idx on survey_responses (cloud_adoption);

alter table survey_responses enable row level security;

drop policy if exists "public_insert_survey_responses" on survey_responses;
create policy "public_insert_survey_responses"
  on survey_responses for insert
  to anon, authenticated
  with check (true);

drop policy if exists "authenticated_select_survey_responses" on survey_responses;
create policy "authenticated_select_survey_responses"
  on survey_responses for select
  to authenticated
  using (true);

drop policy if exists "authenticated_update_survey_responses" on survey_responses;
create policy "authenticated_update_survey_responses"
  on survey_responses for update
  to authenticated
  using (true) with check (true);

drop policy if exists "authenticated_delete_survey_responses" on survey_responses;
create policy "authenticated_delete_survey_responses"
  on survey_responses for delete
  to authenticated
  using (true);

-- app_settings: single row table
create table if not exists app_settings (
  id uuid primary key default '00000000-0000-0000-0000-000000000001'::uuid,
  project_title text not null default 'CloudAdopt',
  survey_status text not null default 'open' check (survey_status in ('open','closed')),
  updated_at timestamptz not null default now()
);

insert into app_settings (id, project_title, survey_status)
values ('00000000-0000-0000-0000-000000000001'::uuid, 'CloudAdopt', 'open')
on conflict (id) do nothing;

alter table app_settings enable row level security;

drop policy if exists "public_select_app_settings" on app_settings;
create policy "public_select_app_settings"
  on app_settings for select
  to anon, authenticated
  using (true);

drop policy if exists "authenticated_update_app_settings" on app_settings;
create policy "authenticated_update_app_settings"
  on app_settings for update
  to authenticated
  using (true) with check (true);

-- updated_at trigger
create or replace function touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_survey_responses_updated on survey_responses;
create trigger trg_survey_responses_updated
  before update on survey_responses
  for each row execute function touch_updated_at();

drop trigger if exists trg_app_settings_updated on app_settings;
create trigger trg_app_settings_updated
  before update on app_settings
  for each row execute function touch_updated_at();
