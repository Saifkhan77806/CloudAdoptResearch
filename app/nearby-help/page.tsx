import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink, MapPin } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { NearbyLocationSearch, type AccessLocale } from '@/components/nearby-location-search';

export const metadata: Metadata = {
  title: 'Nearby healthcare help',
  description: 'Search official facility directories by state, district, or locality.',
};

const directories = [
  {
    name: 'Ayushman Bharat Health Facility Registry',
    description: 'Search the official health facility registry. Facility details are maintained in the registry; confirm information with the facility before travelling.',
    href: 'https://facility.abdm.gov.in/',
    action: 'Open the Health Facility Registry',
  },
  {
    name: 'PM-JAY empanelled hospitals',
    description: 'Search hospitals listed under PM-JAY by state and district. This directory covers empanelled hospitals, not every local health facility.',
    href: 'https://janaushadhi.gov.in/pm-hospital',
    action: 'Search PM-JAY hospitals',
  },
];

const wording = {
  en: {
    eyebrow: 'Local support',
    title: 'Find healthcare facilities by area',
    description: 'We do not keep a local facility database, so we cannot show verified nearby results or distances. Use your state, district, or locality to search official directories below.',
    privacyTitle: 'Your location and privacy',
    privacy: 'This page does not request GPS or precise location. The location form only helps you prepare search terms in this page; it does not send or store them. Enter location details again on an official directory only if you choose to.',
    emergencyTitle: 'Emergency assistance',
    emergency: 'For urgent emergency assistance in India, call 112. Do not wait for an online directory search.',
    emergencyLink: 'Visit the official Emergency Response Support System',
    language: 'Page language',
  },
  hi: {
    eyebrow: 'स्थानीय सहायता',
    title: 'इलाके के अनुसार स्वास्थ्य केंद्र खोजें',
    description: 'हमारे पास स्थानीय केंद्रों की सत्यापित सूची नहीं है, इसलिए हम पास के केंद्र या दूरी नहीं दिखाते। नीचे दी गई आधिकारिक निर्देशिकाओं में राज्य, ज़िला या इलाके के नाम से खोजें।',
    privacyTitle: 'आपका स्थान और निजता',
    privacy: 'यह पेज GPS या सटीक स्थान नहीं माँगता। स्थान वाला फ़ॉर्म केवल इसी पेज पर खोज के शब्द तैयार करता है; इसे भेजा या सहेजा नहीं जाता। आप चाहें तो आधिकारिक निर्देशिका में स्थान फिर से भरें।',
    emergencyTitle: 'आपातकालीन सहायता',
    emergency: 'भारत में तुरंत आपातकालीन सहायता के लिए 112 पर कॉल करें। ऑनलाइन निर्देशिका की खोज के लिए प्रतीक्षा न करें।',
    emergencyLink: 'आधिकारिक आपातकालीन प्रतिक्रिया सहायता प्रणाली देखें',
    language: 'पेज की भाषा',
  },
} as const;

export default function NearbyHelpPage({ searchParams }: { searchParams?: { lang?: string | string[] } }) {
  const locale: AccessLocale = searchParams?.lang === 'hi' ? 'hi' : 'en';
  const text = wording[locale];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" tabIndex={-1} lang={locale} className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <MapPin aria-hidden="true" className="h-8 w-8 text-teal-800" />
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-teal-800">{text.eyebrow}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">{text.title}</h1>
            <p className="mt-4 max-w-3xl leading-relaxed text-slate-700">{text.description}</p>
          </div>
          <nav aria-label={text.language} className="flex min-h-11 items-center gap-3 rounded-lg border bg-card px-3 text-sm">
            <span className="font-medium text-slate-700">{text.language}:</span>
            <Link href="/nearby-help?lang=en" hrefLang="en" lang="en" aria-current={locale === 'en' ? 'page' : undefined} className="font-semibold underline underline-offset-4">English</Link>
            <Link href="/nearby-help?lang=hi" hrefLang="hi" lang="hi" aria-current={locale === 'hi' ? 'page' : undefined} className="font-semibold underline underline-offset-4">हिंदी</Link>
          </nav>
        </div>

        <div className="mt-8">
          <NearbyLocationSearch locale={locale} />
        </div>

        <section aria-labelledby="directory-heading" className="mt-9">
          <h2 id="directory-heading" className="text-2xl font-bold text-slate-950">Official directories</h2>
          <p className="mt-2 leading-relaxed text-muted-foreground">These links open external government directories in a new tab. Search there using the location details you prepared above.</p>
          <div className="mt-5 grid gap-4">
            {directories.map((directory) => (
              <article key={directory.href} className="rounded-2xl border border-slate-200 bg-card p-5 sm:p-6">
                <h3 className="text-lg font-bold text-slate-950">{directory.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{directory.description}</p>
                <a
                  href={directory.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex min-h-12 items-center gap-2 rounded font-semibold text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                >
                  {directory.action}<ExternalLink aria-hidden="true" className="h-4 w-4" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <aside className="mt-8 rounded-2xl border border-slate-200 bg-secondary/50 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-950">{text.privacyTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{text.privacy}</p>
        </aside>

        <aside className="mt-6 rounded-2xl border border-red-300 bg-red-50 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-red-950">{text.emergencyTitle}</h2>
          <p className="mt-2 leading-relaxed text-red-950">{text.emergency}</p>
          <a href="tel:112" className="mt-3 inline-flex min-h-12 items-center rounded font-bold text-red-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900">Call 112</a>
          <p><a href="https://112.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 rounded text-sm font-semibold text-red-950 underline underline-offset-4">{text.emergencyLink}<ExternalLink aria-hidden="true" className="h-4 w-4"/><span className="sr-only"> (opens in a new tab)</span></a></p>
        </aside>

        <p className="mt-7 text-sm text-muted-foreground">
          <Link href="/how-it-works" className="inline-flex min-h-11 items-center rounded font-semibold underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
            Need help using an online service? Read the simple guide.
          </Link>
        </p>
      </main>
      <Footer />
    </div>
  );
}
