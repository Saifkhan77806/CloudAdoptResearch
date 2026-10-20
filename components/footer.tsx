import Link from 'next/link';
import { HeartPulse } from 'lucide-react';

const footerLinks = [
  { href: '/healthcare-resources', label: 'Healthcare resources' },
  { href: '/nearby-help', label: 'Nearby help' },
  { href: '/how-it-works', label: 'How to use this portal' },
  { href: '/about#privacy', label: 'About and privacy' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#f3f8f6]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-900 text-white">
                <HeartPulse aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="font-bold tracking-tight text-slate-950">Swasthya Connect</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Helping Communities Access Online Healthcare.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:gap-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center rounded text-sm font-medium text-slate-700 underline-offset-4 hover:text-teal-950 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://112.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded text-sm font-medium text-slate-700 underline-offset-4 hover:text-teal-950 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800"
                >
                  Official emergency service 112 <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-8 border-t border-slate-300 pt-5">
          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            Swasthya Connect is an information portal, not a healthcare provider or government service. Information may change; confirm details with the official provider. This portal does not collect medical history.
          </p>
          <p className="mt-3 text-xs text-slate-600">© {new Date().getFullYear()} Swasthya Connect</p>
        </div>
      </div>
    </footer>
  );
}
