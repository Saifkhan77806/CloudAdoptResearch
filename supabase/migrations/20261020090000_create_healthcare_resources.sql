create table if not exists public.healthcare_resources (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null check (length(trim(name)) > 0),
  description text not null check (length(trim(description)) > 0),
  category text not null check (category in ('online-consultation','government-health-services','hospital-appointments','digital-health-records','health-schemes','emergency-support','facility-directory')),
  provider_type text not null check (provider_type in ('government','ngo','private')),
  official_url text not null check (official_url ~ '^https://[^[:space:]]+$'),
  languages text[] not null default '{}',
  cost_info text,
  eligibility_info text,
  access_instructions text,
  internet_requirement text,
  state_codes text[] not null default '{}',
  is_verified boolean not null default false,
  is_published boolean not null default false,
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint healthcare_resources_state_codes_format check (state_codes <@ array['AN','AP','AR','AS','BR','CH','CG','DH','DL','GA','GJ','HR','HP','JK','JH','KA','KL','LA','LD','MP','MH','MN','ML','MZ','NL','OD','PY','PB','RJ','SK','TN','TS','TR','UP','UK','WB']::text[])
);

create index if not exists healthcare_resources_public_name_idx on public.healthcare_resources (name) where is_verified and is_published;
create index if not exists healthcare_resources_public_category_idx on public.healthcare_resources (category, provider_type) where is_verified and is_published;
create index if not exists healthcare_resources_public_states_idx on public.healthcare_resources using gin (state_codes) where is_verified and is_published;

drop trigger if exists trg_healthcare_resources_updated on public.healthcare_resources;
create trigger trg_healthcare_resources_updated before update on public.healthcare_resources
  for each row execute function public.touch_updated_at();

alter table public.healthcare_resources enable row level security;
revoke all on public.healthcare_resources from anon, authenticated;
grant select on public.healthcare_resources to anon, authenticated;
drop policy if exists "public_read_verified_healthcare_resources" on public.healthcare_resources;
create policy "public_read_verified_healthcare_resources" on public.healthcare_resources
  for select to anon, authenticated using (is_verified and is_published);

-- The 112 portal describes ERSS as a pan-India emergency number and directs
-- people requiring urgent health support to call 112. Keep this distinct from
-- routine consultations. Other candidate services stay unpublished until reviewed.
insert into public.healthcare_resources (
  slug, name, description, category, provider_type, official_url, languages,
  access_instructions, internet_requirement, is_verified, is_published, last_verified_at
) values (
  'emergency-response-112',
  'Emergency Response Support System (112)',
  'India’s Emergency Response Support System provides a single number, 112, for citizens needing emergency assistance, including health services. This is for emergencies, not routine consultations.',
  'emergency-support', 'government', 'https://112.gov.in/', array[]::text[],
  'For an emergency, call 112 from your phone. The official portal also describes other SOS options.',
  'Call access is available; internet access is not required to dial 112.',
  true, true, now()
) on conflict (slug) do nothing;

comment on table public.healthcare_resources is 'Public catalogue of verified healthcare access resources. Administrative writes require trusted database credentials.';
