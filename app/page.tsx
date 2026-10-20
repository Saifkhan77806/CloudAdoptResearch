import Link from 'next/link';
import {
  ArrowRight,
  BookOpenText,
  Building2,
  HeartPulse,
  Hospital,
  MapPin,
  Search,
  ShieldCheck,
  Smartphone,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getFeaturedResources } from '@/lib/healthcare-resources';

const categories = [
  {
    title: 'Online doctor consultation',
    description: 'Explore verified services for speaking with a health professional online.',
    href: '/healthcare-resources?category=online-consultation',
    icon: HeartPulse,
  },
  {
    title: 'Government health services',
    description: 'Find official public health platforms and information.',
    href: '/healthcare-resources?provider=government',
    icon: ShieldCheck,
  },
  {
    title: 'Hospital appointments',
    description: 'Look for official online appointment services.',
    href: '/healthcare-resources?category=hospital-appointments',
    icon: Hospital,
  },
  {
    title: 'Health facilities nearby',
    description: 'Use official directories to search by state, district, or town.',
    href: '/nearby-help',
    icon: Building2,
  },
  {
    title: 'Help using online services',
    description: 'Read simple steps and tips for using a phone or a slow connection.',
    href: '/how-it-works',
    icon: Smartphone,
  },
  {
    title: 'Guides and information',
    description: 'Learn what to check before opening an online health service.',
    href: '/how-it-works',
    icon: BookOpenText,
  },
];

const steps = [
  {
    number: '01',
    title: 'Find a service',
    description: 'Search the directory or choose a topic that matches what you need.',
  },
  {
    number: '02',
    title: 'Check the details',
    description: 'Read what is known about access, eligibility, language, and cost.',
  },
  {
    number: '03',
    title: 'Continue to the provider',
    description: 'Open the official website and follow the provider’s instructions.',
  },
];

export default async function HomePage() {
  const resources = await getFeaturedResources();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <section className="border-b border-teal-900/10 bg-[linear-gradient(135deg,#effaf7_0%,#f8fbf9_60%,#edf7f4_100%)]">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,.7fr)] lg:items-center lg:px-8 lg:py-24">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-900/15 bg-white/80 px-3.5 py-2 text-sm font-semibold text-teal-950">
                <HeartPulse aria-hidden="true" className="h-4 w-4" />
                Helping Communities Access Online Healthcare
              </p>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                Healthcare access, made simpler.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-700 sm:text-xl">
                Find online healthcare services and learn how to access them, one clear step at a time.
              </p>

              <form action="/healthcare-resources" role="search" className="mt-8 flex max-w-2xl flex-col gap-3 rounded-2xl border border-teal-950/10 bg-white p-3 shadow-sm sm:flex-row sm:items-center">
                <label htmlFor="home-resource-search" className="sr-only">Search healthcare services</label>
                <div className="flex min-h-12 flex-1 items-center gap-3 px-2">
                  <Search aria-hidden="true" className="h-5 w-5 shrink-0 text-teal-800" />
                  <input
                    id="home-resource-search"
                    name="q"
                    type="search"
                    maxLength={100}
                    placeholder="Search services or topics"
                    className="min-w-0 flex-1 bg-transparent text-base text-slate-950 placeholder:text-slate-500 focus-visible:outline-none"
                  />
                </div>
                <Button type="submit" size="lg" className="min-h-12 w-full sm:w-auto">
                  Search services <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="mt-3 text-sm text-slate-600">No account or location access needed to browse.</p>
            </div>

            <aside aria-labelledby="emergency-heading" className="rounded-2xl border border-red-300 bg-white p-6 shadow-sm sm:p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-900">
                  <HeartPulse aria-hidden="true" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-red-900">Emergency help</p>
                  <h2 id="emergency-heading" className="mt-1 text-2xl font-bold text-red-950">Call 112</h2>
                </div>
              </div>
              <p className="mt-4 leading-relaxed text-red-950">
                If someone needs urgent help in India, call <a href="tel:112" className="rounded font-bold underline underline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900">112</a>. Do not wait for an online consultation or directory search.
              </p>
              <a
                href="https://112.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex min-h-11 items-center gap-2 rounded font-semibold text-red-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
              >
                Emergency Response Support System
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </aside>
          </div>
        </section>

        <section aria-labelledby="categories-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[.12em] text-teal-800">Start here</p>
              <h2 id="categories-heading" className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">What are you looking for?</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">Choose a topic to explore available information and services.</p>
            </div>
            <Button asChild variant="outline" className="min-h-11 w-fit border-teal-900/30 text-teal-950">
              <Link href="/healthcare-resources">Browse all resources <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(({ title, description, href, icon: Icon }) => (
              <Link
                key={title}
                href={href}
                className="group rounded-2xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
              >
                <Card className="h-full border-slate-200 transition duration-200 group-hover:-translate-y-0.5 group-hover:border-teal-700/50 group-hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-5 sm:p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-900 ring-1 ring-teal-900/10">
                      <Icon aria-hidden="true" className="h-6 w-6" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold text-slate-950">{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{description}</p>
                    <span className="mt-4 inline-flex min-h-10 items-center gap-2 font-semibold text-teal-900">
                      Explore <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="featured-heading" className="border-y border-teal-900/10 bg-[#f3f8f6]">
          <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[.12em] text-teal-800">Reviewed information</p>
                <h2 id="featured-heading" className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">Featured verified resources</h2>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">Listings are reviewed before publication. Confirm current details on the provider’s official website.</p>
              </div>
              <Link href="/about#verification" className="inline-flex min-h-11 items-center rounded font-semibold text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                How we review listings <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {resources.length > 0 ? (
              <div className="mt-7 grid gap-4 md:grid-cols-2">
                {resources.map((resource) => (
                  <Card key={resource.id} className="border-slate-200 bg-white">
                    <CardContent className="p-5 sm:p-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-950 ring-1 ring-teal-900/10">
                        <ShieldCheck aria-hidden="true" className="h-4 w-4" /> Verified resource
                      </span>
                      <h3 className="mt-4 text-xl font-bold text-slate-950">{resource.name}</h3>
                      <p className="mt-2 leading-relaxed text-slate-700">{resource.description}</p>
                      <Link href={`/healthcare-resources/${resource.slug}`} className="mt-4 inline-flex min-h-11 items-center rounded font-semibold text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                        Read service details <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="mt-7 rounded-2xl border border-dashed border-slate-300 bg-white p-6 sm:p-8">
                <h3 className="font-bold text-slate-950">The reviewed directory is being prepared</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-slate-700">We only show a service after its details have been checked. Browse the directory to see current listings, or use the official emergency and facility links on this site.</p>
                <Button asChild variant="outline" className="mt-4 min-h-11 border-teal-900/30 text-teal-950">
                  <Link href="/healthcare-resources">Open the resource directory <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        <section aria-labelledby="steps-heading" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[.12em] text-teal-800">A clear path</p>
            <h2 id="steps-heading" className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">How it works</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">A few simple steps can help you use an online health service with more confidence.</p>
          </div>
          <ol className="mt-7 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <li key={step.number} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                <span className="text-sm font-bold tracking-wide text-teal-800">STEP {step.number}</span>
                <h3 className="mt-3 text-lg font-bold text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.description}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 rounded-2xl bg-teal-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Smartphone aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-teal-900" />
              <div>
                <h3 className="font-bold text-teal-950">Using a phone or a slow connection?</h3>
                <p className="mt-1 text-sm leading-relaxed text-teal-950">You can browse this directory without sharing your location. If a page is difficult to use, ask someone you trust or a community health worker to help you read the provider’s instructions.</p>
                <Link href="/how-it-works#limited-internet" className="mt-3 inline-flex min-h-10 items-center rounded font-semibold text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                  More tips for limited internet <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-7xl gap-7 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-900 ring-1 ring-sky-900/10">
                <MapPin aria-hidden="true" className="h-6 w-6" />
              </span>
              <div>
                <p className="text-sm font-bold uppercase tracking-[.12em] text-teal-800">Local support</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">Looking for help nearby?</h2>
                <p className="mt-2 max-w-2xl leading-relaxed text-slate-600">Use official facility directories to search by your state, district, or town. We don’t track your location or show unverified nearby results.</p>
              </div>
            </div>
            <Button asChild size="lg" variant="outline" className="min-h-12 border-teal-900/30 text-teal-950">
              <Link href="/nearby-help">Find official directories <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
