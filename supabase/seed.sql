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

-- Official public healthcare access resources. URLs and the claims below were
-- checked against government sources on 2026-10-20. These are real services,
-- not fictional demo data, and are safe for public display.
insert into public.healthcare_resources (
  slug, name, description, category, provider_type, official_url,
  languages, cost_info, eligibility_info, access_instructions,
  internet_requirement, state_codes, is_verified, is_published, last_verified_at
) values
  (
    'esanjeevani-national-telemedicine',
    'eSanjeevani National Telemedicine Service',
    'The Government of India’s National Telemedicine Service. The Ministry of Health and Family Welfare describes eSanjeevani as a service that connects people with doctors and medical specialists through smartphones.',
    'online-consultation', 'government', 'https://esanjeevani.mohfw.gov.in/',
    array[]::text[], null, null,
    'Open the official portal to see the available consultation options and instructions.',
    'An internet connection is needed to use the online portal.', array[]::text[], true, true, now()
  ),
  (
    'tele-manas-mental-health-support',
    'Tele-MANAS Mental Health Support',
    'The Government of India’s national tele-mental health programme. The Directorate General of Health Services lists 14416 and 1800-89-14416 as public helpline numbers and describes the service as available 24 hours a day.',
    'government-health-services', 'government', 'https://telemanas.mohfw.gov.in/',
    array[]::text[], 'The official DGHS page identifies 1800-89-14416 as toll-free.', null,
    'Call 14416 or 1800-89-14416. For current details, visit the official Tele-MANAS portal.',
    'A phone connection is needed to call. The helpline does not require browsing the website.',
    array[]::text[], true, true, now()
  ),
  (
    'pmjay-empanelled-hospital-search',
    'Ayushman Bharat PM-JAY Hospital Search',
    'Official search page for hospitals empanelled under Ayushman Bharat PM-JAY. Confirm current hospital participation and scheme eligibility with official PM-JAY channels before relying on the listing.',
    'facility-directory', 'government', 'https://hospitals.pmjay.gov.in/Search/empnlWorkFlow.htm?actionFlag=ViewRegisteredHosptlsNew',
    array[]::text[], null, null,
    'Use the official search page to look up empanelled hospitals. Confirm details with PM-JAY before travelling.',
    'An internet connection is needed to use the search page.', array[]::text[], true, true, now()
  ),
  (
    'janaushadhi-kendra-locator',
    'Pradhan Mantri Bhartiya Janaushadhi Kendra Locator',
    'The official Pharmaceuticals and Medical Devices Bureau of India page provides a search for PMBJP Kendras by state and district, with optional PIN code and Kendra code fields.',
    'facility-directory', 'government', 'https://janaushadhi.gov.in/near-by-kendra',
    array[]::text[], null, null,
    'Select a state and district on the official page. PIN code and Kendra code are also available as search fields.',
    'An internet connection is needed to use the online search page.', array[]::text[], true, true, now()
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
  is_verified = true,
  is_published = true,
  last_verified_at = now();
