'use client';

import { useState, type FormEvent } from 'react';
import { indianStatesAndTerritories } from '@/lib/indian-locations';

export type AccessLocale = 'en' | 'hi';

const copy = {
  en: {
    title: 'Prepare a location search',
    intro: 'Enter a state, district, or locality to keep the search details together while you open an official directory.',
    state: 'State or union territory',
    choose: 'Choose a state or union territory',
    district: 'District',
    districtHint: 'For example, Jaipur district',
    locality: 'Town, village, or locality',
    localityHint: 'For example, a village or town name',
    submit: 'Prepare my search',
    required: 'Enter at least one location detail to continue.',
    prepared: 'Use these details in the official directory',
    privacy: 'These details stay in this page only. Swasthya Connect does not send or save them. You will enter your location again on the directory website if needed.',
  },
  hi: {
    title: 'स्थान खोजने की तैयारी करें',
    intro: 'आधिकारिक निर्देशिका खोलते समय अपनी खोज साथ रखने के लिए राज्य, ज़िला या इलाके का नाम लिखें।',
    state: 'राज्य या केंद्र शासित प्रदेश',
    choose: 'राज्य या केंद्र शासित प्रदेश चुनें',
    district: 'ज़िला',
    districtHint: 'उदाहरण: जयपुर ज़िला',
    locality: 'शहर, गाँव या इलाका',
    localityHint: 'उदाहरण: गाँव या शहर का नाम',
    submit: 'खोज की तैयारी करें',
    required: 'जारी रखने के लिए स्थान की कम से कम एक जानकारी लिखें।',
    prepared: 'आधिकारिक निर्देशिका में यह जानकारी भरें',
    privacy: 'यह जानकारी केवल इसी पेज पर रहती है। Swasthya Connect इसे भेजता या सहेजता नहीं है। ज़रूरत पड़ने पर निर्देशिका की वेबसाइट पर स्थान फिर से भरें।',
  },
} as const;

export function NearbyLocationSearch({ locale }: { locale: AccessLocale }) {
  const text = copy[locale];
  const [stateCode, setStateCode] = useState('');
  const [district, setDistrict] = useState('');
  const [locality, setLocality] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const selectedState = indianStatesAndTerritories.find(([code]) => code === stateCode)?.[1];

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const hasLocation = Boolean(stateCode || district.trim() || locality.trim());
    setError(!hasLocation);
    setSubmitted(hasLocation);
  }

  return (
    <section aria-labelledby="location-search-heading" className="rounded-2xl border border-slate-200 bg-card p-5 sm:p-7">
      <h2 id="location-search-heading" className="text-xl font-bold text-slate-950">{text.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-700">{text.intro}</p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1 block text-sm font-semibold">{text.state}</span>
          <select value={stateCode} onChange={(event) => setStateCode(event.target.value)} className="min-h-12 w-full rounded-md border border-input bg-background px-3">
            <option value="">{text.choose}</option>
            {indianStatesAndTerritories.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold">{text.district}</span>
          <input value={district} onChange={(event) => setDistrict(event.target.value)} maxLength={80} autoComplete="address-level2" className="min-h-12 w-full rounded-md border border-input bg-background px-3" placeholder={text.districtHint} />
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold">{text.locality}</span>
          <input value={locality} onChange={(event) => setLocality(event.target.value)} maxLength={100} autoComplete="address-level3" className="min-h-12 w-full rounded-md border border-input bg-background px-3" placeholder={text.localityHint} />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className="min-h-12 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:brightness-95">
            {text.submit}
          </button>
        </div>
      </form>

      {error && <p role="alert" className="mt-4 rounded-lg bg-amber-50 p-3 text-sm font-medium text-amber-950">{text.required}</p>}
      {submitted && (
        <div role="status" aria-live="polite" className="mt-5 rounded-xl bg-teal-50 p-4 text-teal-950">
          <h3 className="font-bold">{text.prepared}</h3>
          <p className="mt-2 text-sm font-medium">{[selectedState, district.trim(), locality.trim()].filter(Boolean).join(', ')}</p>
          <p className="mt-2 text-sm leading-relaxed">{text.privacy}</p>
        </div>
      )}
    </section>
  );
}
