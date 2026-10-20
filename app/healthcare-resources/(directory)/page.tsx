import type { Metadata } from 'next';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  providerTypes,
  resourceCategories,
  searchHealthcareResources,
} from '@/lib/healthcare-resources';
import { indianStatesAndTerritories } from '@/lib/indian-locations';

export const metadata: Metadata = {
  title: 'Healthcare resources',
  description: 'Search verified online healthcare services and official resources.',
};

type SearchParams = Record<string, string | string[] | undefined>;

function singleParam(value: string | string[] | undefined) {
  return typeof value === 'string' ? value : '';
}

function pageHref(searchParams: SearchParams, page: number) {
  const params = new URLSearchParams();
  for (const key of ['q', 'category', 'provider', 'state', 'language'] as const) {
    const value = singleParam(searchParams[key]);
    if (value) params.set(key, value);
  }
  params.set('page', String(page));
  return `/healthcare-resources?${params.toString()}`;
}

export default async function HealthcareResourcesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = singleParam(searchParams.q);
  const category = singleParam(searchParams.category);
  const provider = singleParam(searchParams.provider);
  const state = singleParam(searchParams.state);
  const language = singleParam(searchParams.language);
  const page = singleParam(searchParams.page) || '1';
  const result = await searchHealthcareResources({ q, category, provider, state, language, page });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-wide text-teal-800">Directory</p>
        <h1 className="mt-2 text-3xl font-bold text-slate-950">Healthcare resources</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Search verified services and official information. Listings appear only after review. Confirm current details with the provider.
        </p>

        <form action="/healthcare-resources" className="mt-7 grid gap-4 rounded-2xl border border-slate-200 bg-card p-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="sm:col-span-2">
            <span className="mb-1 block text-sm font-semibold">Search services</span>
            <span className="flex min-h-12 items-center gap-3 rounded-md border border-input bg-background px-3 focus-within:ring-2 focus-within:ring-ring">
              <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                name="q"
                type="search"
                defaultValue={q}
                maxLength={100}
                className="min-w-0 flex-1 bg-transparent outline-none"
                placeholder="Service name or topic"
              />
            </span>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Category</span>
            <select name="category" defaultValue={category} className="min-h-12 w-full rounded-md border border-input bg-background px-3">
              <option value="">All categories</option>
              {resourceCategories.map((item) => (
                <option key={item} value={item}>{item.replaceAll('-', ' ')}</option>
              ))}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Provider type</span>
            <select name="provider" defaultValue={provider} className="min-h-12 w-full rounded-md border border-input bg-background px-3">
              <option value="">All providers</option>
              {providerTypes.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">State or union territory</span>
            <select name="state" defaultValue={state} className="min-h-12 w-full rounded-md border border-input bg-background px-3">
              <option value="">All locations</option>
              {indianStatesAndTerritories.map(([code, name]) => <option key={code} value={code}>{name}</option>)}
            </select>
          </label>
          <label>
            <span className="mb-1 block text-sm font-semibold">Language</span>
            <select name="language" defaultValue={language} className="min-h-12 w-full rounded-md border border-input bg-background px-3">
              <option value="">Any confirmed language</option>
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </label>
          <div className="flex items-end gap-3 sm:col-span-2 lg:col-span-3">
            <button type="submit" className="min-h-12 rounded-md bg-primary px-5 font-semibold text-primary-foreground hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
              Apply filters
            </button>
            <Link href="/healthcare-resources" className="inline-flex min-h-12 items-center rounded px-3 font-medium underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
              Clear filters
            </Link>
          </div>
        </form>

        {result.invalid ? (
          <section role="alert" className="mt-7 rounded-2xl border border-amber-300 bg-amber-50 p-6">
            <h2 className="font-bold text-amber-950">Check your search filters</h2>
            <p className="mt-2 text-sm leading-relaxed text-amber-950">One or more filters are not valid. Clear them and choose an option from the list.</p>
            <Link href="/healthcare-resources" className="mt-3 inline-flex min-h-11 items-center rounded font-semibold text-amber-950 underline underline-offset-4">Clear filters</Link>
          </section>
        ) : result.error ? (
          <section role="alert" className="mt-7 rounded-2xl border border-amber-300 bg-amber-50 p-6">
            <h2 className="font-bold text-amber-950">We couldn’t load the directory</h2>
            <p className="mt-2 text-sm leading-relaxed text-amber-950">Please try again. If this continues, the resource directory may not be available yet.</p>
            <Link href="/healthcare-resources" className="mt-3 inline-flex min-h-11 items-center rounded font-semibold text-amber-950 underline underline-offset-4">Try again</Link>
          </section>
        ) : (
          <>
            <p className="mt-7 text-sm text-muted-foreground" aria-live="polite">
              {result.total} verified {result.total === 1 ? 'resource' : 'resources'} found
              {result.pageCount > 1 ? ` · Page ${result.page} of ${result.pageCount}` : ''}
            </p>

            {result.resources.length > 0 ? (
              <>
                <div className="mt-3 grid gap-4 md:grid-cols-2">
                  {result.resources.map((resource) => (
                    <article key={resource.id} className="rounded-2xl border border-slate-200 bg-card p-5 sm:p-6">
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-950">Verified</span>
                        <span className="text-xs capitalize text-muted-foreground">{resource.provider_type}</span>
                      </div>
                      <h2 className="mt-3 text-xl font-bold text-slate-950">{resource.name}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-slate-700">{resource.description}</p>
                      <p className="mt-3 text-xs capitalize text-muted-foreground">{resource.category.replaceAll('-', ' ')}</p>
                      <Link href={`/healthcare-resources/${resource.slug}`} className="mt-3 inline-flex min-h-11 items-center rounded font-semibold text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                        Read service details
                      </Link>
                    </article>
                  ))}
                </div>

                {result.pageCount > 1 && (
                  <nav aria-label="Resource pages" className="mt-8 flex items-center justify-between gap-4">
                    {result.page > 1 ? (
                      <Link href={pageHref(searchParams, result.page - 1)} rel="prev" className="inline-flex min-h-11 items-center rounded-md border px-4 font-semibold underline-offset-4 hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                        Previous page
                      </Link>
                    ) : <span />}
                    <span className="text-sm text-muted-foreground">Page {result.page} of {result.pageCount}</span>
                    {result.page < result.pageCount ? (
                      <Link href={pageHref(searchParams, result.page + 1)} rel="next" className="inline-flex min-h-11 items-center rounded-md border px-4 font-semibold underline-offset-4 hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                        Next page
                      </Link>
                    ) : <span />}
                  </nav>
                )}
              </>
            ) : (
              <section className="mt-4 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
                <h2 className="text-lg font-bold text-slate-950">No verified resources found</h2>
                <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                  Try a different search or clear the filters. Unverified services are not shown as confirmed listings.
                </p>
                <Link href="/healthcare-resources" className="mt-4 inline-flex min-h-11 items-center rounded font-semibold text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
                  Clear search and filters
                </Link>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
