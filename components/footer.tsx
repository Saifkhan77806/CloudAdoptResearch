import Link from 'next/link';
import { Cloud } from 'lucide-react';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/insights', label: 'Insights' },
  { href: '/survey', label: 'Take Survey' },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Cloud className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-semibold tracking-tight">
                CloudAdopt
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              An academic research platform studying cloud computing adoption
              in educational institutes.
            </p>
          </div>

          <nav className="flex flex-col gap-2.5">
            <p className="text-sm font-medium text-foreground">Navigation</p>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Academic Research Project · Responses are collected for research
            purposes only.
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CloudAdopt. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
