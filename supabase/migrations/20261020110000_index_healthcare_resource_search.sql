-- Search the service name and description together using a compact PostgreSQL
-- full-text index. Keep schema history append-only.
alter table public.healthcare_resources
  add column if not exists search_vector tsvector
  generated always as (to_tsvector('simple', name || ' ' || description)) stored;

create index if not exists healthcare_resources_public_search_idx
  on public.healthcare_resources using gin (search_vector)
  where is_verified and is_published;

-- Explicitly remove table-level grants from the broad PUBLIC role as well as
-- Supabase's anonymous and authenticated API roles. Reads remain policy-bound.
revoke all on public.healthcare_resources from public, anon, authenticated;
grant select on public.healthcare_resources to anon, authenticated;

-- The first draft used DH for the former Daman and Diu code. Canonicalize any
-- draft records before replacing that validation constraint with DD.
update public.healthcare_resources
set state_codes = (
  select array_agg(distinct case when code = 'DH' then 'DD' else code end)
  from unnest(state_codes) as codes(code)
)
where 'DH' = any(state_codes);

alter table public.healthcare_resources
  drop constraint if exists healthcare_resources_state_codes_format;
alter table public.healthcare_resources
  add constraint healthcare_resources_state_codes_format
  check (state_codes <@ array['AN','AP','AR','AS','BR','CH','CG','DD','DL','GA','GJ','HR','HP','JK','JH','KA','KL','LA','LD','MP','MH','MN','ML','MZ','NL','OD','PY','PB','RJ','SK','TN','TS','TR','UP','UK','WB']::text[]);

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'healthcare_resources_published_must_be_verified'
      and conrelid = 'public.healthcare_resources'::regclass
  ) then
    alter table public.healthcare_resources
      add constraint healthcare_resources_published_must_be_verified
      check (not is_published or is_verified) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'healthcare_resources_verified_requires_date'
      and conrelid = 'public.healthcare_resources'::regclass
  ) then
    alter table public.healthcare_resources
      add constraint healthcare_resources_verified_requires_date
      check (not is_verified or last_verified_at is not null) not valid;
  end if;
end;
$$;
