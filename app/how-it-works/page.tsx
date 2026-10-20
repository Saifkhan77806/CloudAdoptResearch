import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck, WifiOff } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'How it works',
  description: 'Plain-language steps for finding and using online healthcare services.',
};

const content = {
  en: {
    language: 'Page language', eyebrow: 'A simple guide', title: 'Using an online health service',
    intro: 'Each service works differently. These general steps can help you prepare. Always follow the instructions on the official service.',
    steps: [
      ['Find a service', 'Browse the directory by service or provider. If a listing is not marked verified, we do not show it as a confirmed service.'],
      ['Check what you need', 'Read any confirmed information about cost, eligibility, language, and access. If a detail is not listed, check with the provider.'],
      ['Prepare your phone', 'Charge your phone if possible and use a network you trust. Keep only the documents the official provider asks for nearby.'],
      ['Open the official website', 'Use the official link on the resource page. Check the website address before entering information. This portal will not ask for your medical history.'],
      ['Ask someone you trust', 'A family member or community health worker may help you read the page. Do not share your passwords, one-time codes, or banking PIN.'],
    ],
    lowTitle: 'If your internet is limited',
    lowItems: ['You can browse this portal without turning on location services.', 'Write down the official website address so you can open it when you have a better connection.', 'Use a trusted Wi-Fi connection when available. Avoid entering private information on a shared or public device.', 'Ask a trusted person or community health worker to help you navigate the official service.'],
    privacyTitle: 'Your privacy',
    privacy: 'Swasthya Connect does not collect patient records, diagnoses, or precise location on these pages. If you open an external provider website, that provider’s privacy rules apply.',
    emergencyTitle: 'Emergency assistance',
    emergency: 'For urgent emergency assistance in India, call 112. Do not wait for an online consultation or directory search.',
    browse: 'Browse healthcare resources',
  },
  hi: {
    language: 'पेज की भाषा', eyebrow: 'आसान मार्गदर्शिका', title: 'ऑनलाइन स्वास्थ्य सेवा का उपयोग',
    intro: 'हर सेवा का तरीका अलग हो सकता है। तैयारी के लिए ये सामान्य कदम देखें। आधिकारिक सेवा पर दिए निर्देशों का पालन करें।',
    steps: [
      ['सेवा खोजें', 'सेवा या प्रदाता के अनुसार निर्देशिका देखें। जिस सेवा की पुष्टि नहीं हुई है, उसे हम पक्की सेवा के रूप में नहीं दिखाते।'],
      ['ज़रूरी जानकारी देखें', 'शुल्क, पात्रता, भाषा और उपयोग के बारे में उपलब्ध पुष्ट जानकारी पढ़ें। कोई जानकारी न हो तो सेवा प्रदाता से पूछें।'],
      ['फोन तैयार रखें', 'हो सके तो फोन चार्ज करें और भरोसेमंद नेटवर्क का उपयोग करें। केवल वही दस्तावेज़ पास रखें जो आधिकारिक सेवा माँगती है।'],
      ['आधिकारिक वेबसाइट खोलें', 'संसाधन पेज पर दिए आधिकारिक लिंक का उपयोग करें। जानकारी भरने से पहले वेबसाइट का पता जाँचें। यह पोर्टल आपकी मेडिकल हिस्ट्री नहीं माँगेगा।'],
      ['भरोसेमंद व्यक्ति से मदद लें', 'परिवार का सदस्य या सामुदायिक स्वास्थ्य कार्यकर्ता पेज पढ़ने में मदद कर सकता है। पासवर्ड, OTP या बैंक PIN साझा न करें।'],
    ],
    lowTitle: 'अगर इंटरनेट धीमा या सीमित हो',
    lowItems: ['इस पोर्टल को देखने के लिए लोकेशन सेवा चालू करने की ज़रूरत नहीं है।', 'आधिकारिक वेबसाइट का पता लिख लें, ताकि बेहतर कनेक्शन मिलने पर खोल सकें।', 'उपलब्ध हो तो भरोसेमंद Wi-Fi का उपयोग करें। साझा या सार्वजनिक डिवाइस पर निजी जानकारी न भरें।', 'आधिकारिक सेवा पर जाने के लिए भरोसेमंद व्यक्ति या सामुदायिक स्वास्थ्य कार्यकर्ता से मदद लें।'],
    privacyTitle: 'आपकी निजता',
    privacy: 'इन पेजों पर Swasthya Connect मरीजों के रिकॉर्ड, निदान या सटीक स्थान की जानकारी नहीं लेता। बाहरी प्रदाता की वेबसाइट खोलने पर उसकी निजता नीति लागू होती है।',
    emergencyTitle: 'आपातकालीन सहायता',
    emergency: 'भारत में तुरंत आपातकालीन सहायता के लिए 112 पर कॉल करें। ऑनलाइन सलाह या निर्देशिका खोजने की प्रतीक्षा न करें।',
    browse: 'स्वास्थ्य संसाधन देखें',
  },
} as const;

export default function HowItWorksPage({ searchParams }: { searchParams?: { lang?: string | string[] } }) {
  const locale = searchParams?.lang === 'hi' ? 'hi' : 'en';
  const text = content[locale];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" tabIndex={-1} lang={locale} className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <BookOpenCheck aria-hidden="true" className="h-8 w-8 text-teal-800" />
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-teal-800">{text.eyebrow}</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950">{text.title}</h1>
            <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{text.intro}</p>
          </div>
          <nav aria-label={text.language} className="flex min-h-11 items-center gap-3 rounded-lg border bg-card px-3 text-sm">
            <span className="font-medium text-slate-700">{text.language}:</span>
            <Link href="/how-it-works?lang=en" hrefLang="en" lang="en" aria-current={locale === 'en' ? 'page' : undefined} className="font-semibold underline underline-offset-4">English</Link>
            <Link href="/how-it-works?lang=hi" hrefLang="hi" lang="hi" aria-current={locale === 'hi' ? 'page' : undefined} className="font-semibold underline underline-offset-4">हिंदी</Link>
          </nav>
        </div>

        <ol className="mt-8 space-y-4">
          {text.steps.map(([title, description], index) => (
            <li key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-card p-5 sm:p-6">
              <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-950">{index + 1}</span>
              <div>
                <h2 className="text-lg font-bold text-slate-950">{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{description}</p>
              </div>
            </li>
          ))}
        </ol>

        <section id="limited-internet" className="mt-8 scroll-mt-24 rounded-2xl bg-teal-50 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <WifiOff aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal-900" />
            <div>
              <h2 className="text-xl font-bold text-teal-950">{text.lowTitle}</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-teal-950">
                {text.lowItems.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-5 rounded-2xl border border-slate-200 bg-card p-5 sm:p-6">
          <h2 className="text-lg font-bold text-slate-950">{text.privacyTitle}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{text.privacy}</p>
        </section>

        <aside className="mt-5 rounded-2xl border border-red-300 bg-red-50 p-5 sm:p-6">
          <h2 className="text-lg font-bold text-red-950">{text.emergencyTitle}</h2>
          <p className="mt-2 leading-relaxed text-red-950">{text.emergency}</p>
          <a href="tel:112" className="mt-3 inline-flex min-h-12 items-center rounded font-bold text-red-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900">Call 112</a>
        </aside>

        <Link href="/healthcare-resources" className="mt-7 inline-flex min-h-12 items-center rounded font-semibold text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
          {text.browse}<ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
        </Link>
      </main>
      <Footer />
    </div>
  );
}
