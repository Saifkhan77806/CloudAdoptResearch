import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { getHealthcareResource } from '@/lib/healthcare-resources';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const resource = await getHealthcareResource(params.slug);
  return resource
    ? { title: resource.name, description: resource.description }
    : { title: 'Resource not found' };
}

export default async function ResourceDetailPage({ params }: { params: { slug: string } }) {
  const resource = await getHealthcareResource(params.slug);
  if (!resource) notFound();

  let officialUrl: URL;
  try {
    officialUrl = new URL(resource.official_url);
  } catch {
    notFound();
  }
  if (officialUrl.protocol !== 'https:' || officialUrl.username || officialUrl.password) {
    notFound();
  }

  const details = [
    ['Provider type', resource.provider_type],
    ['Languages', resource.languages.length ? resource.languages.join(', ') : 'Not confirmed'],
    ['Cost', resource.cost_info ?? 'Not confirmed'],
    ['Eligibility', resource.eligibility_info ?? 'Not specified'],
    ['Internet or device needs', resource.internet_requirement ?? 'Not assessed'],
    ['Geographic availability', resource.state_codes.length ? `State or territory codes: ${resource.state_codes.join(', ')}` : 'Nationwide or not specified'],
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <Link href="/healthcare-resources" className="inline-flex min-h-11 items-center rounded font-medium text-teal-950 underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800">
          <span aria-hidden="true" className="mr-2">←</span> All healthcare resources
        </Link>

        <article className="mt-4 rounded-2xl border border-slate-200 bg-card p-5 sm:p-8">
          <span className="inline-flex min-h-7 items-center rounded-full bg-teal-50 px-3 text-sm font-bold text-teal-950">Verified resource</span>
          <h1 className="mt-4 text-3xl font-bold text-slate-950">{resource.name}</h1>
          <p className="mt-2 text-sm capitalize text-muted-foreground">
            {resource.category.replaceAll('-', ' ')} · {resource.provider_type}
          </p>
          <p className="mt-5 text-lg leading-relaxed text-slate-800">{resource.description}</p>

          <dl className="mt-7 grid gap-3 sm:grid-cols-2">
            {details.map(([label, value]) => (
              <div key={label} className="rounded-xl bg-secondary/50 p-4">
                <dt className="text-sm font-bold text-slate-950">{label}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-700">{value}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-slate-950">How to access this service</h2>
            <p className="mt-3 whitespace-pre-line leading-relaxed text-slate-700">
              {resource.access_instructions ?? 'Visit the official website and follow the instructions shown there. Specific access steps have not been confirmed.'}
            </p>
          </section>

          <p className="mt-7 text-sm text-muted-foreground">
            Last verified: {resource.last_verified_at
              ? new Date(resource.last_verified_at).toLocaleDateString('en-IN', { dateStyle: 'long', timeZone: 'Asia/Kolkata' })
              : 'Date not available'}
          </p>
          <a
            href={officialUrl.toString()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex min-h-14 items-center justify-center gap-2 rounded-lg bg-primary px-6 font-bold text-primary-foreground hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
          >
            Continue to official website
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            You are leaving Swasthya Connect. The provider’s privacy practices and service terms apply on its website.
          </p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
