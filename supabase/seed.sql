-- Development-only sample data for checking directory layouts and filters.
-- All entries are fictional, explicitly marked as demos, and remain hidden
-- from public users because is_verified/is_published are false.
-- Never use this file to seed production.
insert into public.healthcare_resources (
  slug, name, description, category, provider_type, official_url,
  languages, cost_info, eligibility_info, access_instructions,
  internet_requirement, state_codes, is_verified, is_published, last_verified_at
) values
  (
    'demo-online-consultation',
    'DEMO ONLY — Example online consultation',
    'Fictional sample record for testing the directory. This is not a real healthcare service.',
    'online-consultation', 'government', 'https://example.org/',
    array['Hindi', 'English'], 'Demo value — not real pricing.',
    'Demo value — not real eligibility information.',
    'Demo only. Do not use this record to seek care.',
    'Demo value — not a real access requirement.', array['UP'], false, false, null
  ),
  (
    'demo-government-health-service',
    'DEMO ONLY — Example government health service',
    'Fictional sample record for testing category filters. This is not an official program.',
    'government-health-services', 'government', 'https://example.org/',
    array['Hindi'], 'Demo value — not real pricing.',
    'Demo value — not real eligibility information.',
    'Demo only. Do not use this record to seek care.',
    'Demo value — not a real access requirement.', array['BR'], false, false, null
  ),
  (
    'demo-facility-directory',
    'DEMO ONLY — Example facility directory',
    'Fictional sample record for testing provider and location filters. No facilities are listed.',
    'facility-directory', 'ngo', 'https://example.org/',
    array['English'], 'Demo value — not real pricing.',
    'Demo value — not real eligibility information.',
    'Demo only. This record does not identify a real facility.',
    'Demo value — not a real access requirement.', array['MH'], false, false, null
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  provider_type = excluded.provider_type,
  official_url = excluded.official_url,
  languages = excluded.languages,
  cost_info = excluded.cost_info,
  eligibility_info = excluded.eligibility_info,
  access_instructions = excluded.access_instructions,
  internet_requirement = excluded.internet_requirement,
  state_codes = excluded.state_codes,
  is_verified = false,
  is_published = false,
  last_verified_at = null;
