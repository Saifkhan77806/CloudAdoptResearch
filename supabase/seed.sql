-- Fictional filter-testing records. They stay unverified and unpublished.
-- These can be present in development databases but must never be published.
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

-- Official and provider-maintained public healthcare access resources.
-- URLs and displayed claims were checked against their providers on 2026-10-20.
-- Do not alter verification flags without rechecking each source.
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
  ),
  (
    'ors-government-hospital-appointments',
    'Online Registration System (ORS) Hospital Appointments',
    'The Government of India ORS portal supports online OPD appointment booking at participating government hospitals. The official portal explains the booking steps and shows a Hindi language version.',
    'hospital-appointments', 'government', 'https://ors.gov.in/',
    array['English', 'Hindi'], null, null,
    'Use the official portal to choose a participating hospital, department, and available appointment. Hospital participation and slots can vary; confirm details with the hospital.',
    'An internet connection and a registered mobile number or ABHA may be needed for appointment booking.',
    array[]::text[], true, true, now()
  ),
  (
    'abha-digital-health-records',
    'ABHA and Personal Health Records',
    'The National Health Authority describes the ABHA app as a personal health viewer for managing health records. ABDM explains that people control their Personal Health Records and consent is used when records are linked or shared.',
    'digital-health-records', 'government', 'https://abha.abdm.gov.in/',
    array[]::text[], null, null,
    'Open the official ABHA portal to learn about creating or accessing an account. Review consent and privacy details on the official ABDM site. Swasthya Connect does not store these records.',
    'An internet connection is needed to use the online portal.', array[]::text[], true, true, now()
  ),
  (
    'pmjay-beneficiary-eligibility',
    'Ayushman Bharat PM-JAY Beneficiary Portal',
    'The National Health Authority beneficiary portal is listed by government sources for checking PM-JAY beneficiary eligibility and accessing beneficiary services. Eligibility and benefits depend on official scheme records.',
    'health-schemes', 'government', 'https://beneficiary.nha.gov.in/',
    array[]::text[], null,
    'Eligibility depends on the official beneficiary record. Use the official portal or contact PM-JAY to confirm your status and current scheme information.',
    'Open the official portal and follow its sign-in and verification steps.',
    'An internet connection is needed to use the portal.', array[]::text[], true, true, now()
  ),
  (
    'digiswasthya-rural-telemedicine-network',
    'DigiSwasthya Foundation Telemedicine Network',
    'DigiSwasthya Foundation describes a network of telemedicine centres where staff connect people with specialist doctors by video consultation. Its official centre page lists locations in Uttar Pradesh, Maharashtra, and Bihar; confirm current availability with the provider before travelling.',
    'online-consultation', 'ngo', 'https://www.digiswasthya.org/network',
    array[]::text[], null, null,
    'Open the provider’s current centre list and contact the organisation to confirm the location and availability before travelling.',
    'Internet access may be needed for online information; ask the provider about access at a centre.',
    array['UP', 'MH', 'BR'], true, true, now()
  ),
  (
    'practo-online-consultation',
    'Practo Online Doctor Consultation',
    'Practo’s official website offers online consultations with doctors. This is a private service; consultation options, doctor availability, and charges are shown by the provider and can change.',
    'online-consultation', 'private', 'https://www.practo.com/consult',
    array[]::text[], 'Private provider; check current consultation charges on the provider website.', null,
    'Open the provider site to review available doctors, consultation options, and current charges before booking.',
    'An internet connection is needed to use online consultation.', array[]::text[], true, true, now()
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
