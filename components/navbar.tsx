'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HeartPulse, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InstallAppButton } from '@/components/install-app-button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/healthcare-resources', label: 'Find services' },
  { href: '/nearby-help', label: 'Nearby help' },
  { href: '/how-it-works', label: 'How it works' },
  { href: '/about', label: 'About' },
];

function isCurrentPage(pathname: string, href: string) {
  return pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));
}

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setMobileOpen(false);
    }

    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [mobileOpen]);

  return (
    <>
    <a
      href="#main-content"
      className="sr-only fixed left-4 top-4 z-[60] rounded-md bg-white px-4 py-3 font-semibold text-teal-950 shadow focus:not-sr-only focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-teal-800"
    >
      Skip to main content
    </a>
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-h-11 items-center gap-2.5 rounded transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-800"
          onClick={() => setMobileOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <HeartPulse className="h-5 w-5 text-white" />
          </div>
          <span className="text-base font-bold tracking-tight text-slate-950 sm:text-lg">Swasthya Connect</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'min-h-11 rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800',
                isCurrentPage(pathname, link.href)
                  ? 'bg-teal-50 text-teal-950'
                  : 'text-slate-700 hover:bg-teal-50 hover:text-teal-950'
              )}
              aria-current={isCurrentPage(pathname, link.href) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <InstallAppButton />
          <Button asChild size="default" className="min-h-11">
            <Link href="/healthcare-resources">Find a service</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-md text-slate-900 hover:bg-teal-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div className={cn('border-t border-border/60 bg-background md:hidden animate-fade-in', mobileOpen ? 'block' : 'hidden')}>
          <nav id="mobile-navigation" aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'min-h-11 rounded-md px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-800',
                  isCurrentPage(pathname, link.href)
                    ? 'bg-teal-50 text-teal-950'
                    : 'text-slate-700 hover:bg-teal-50 hover:text-teal-950'
                )}
                onClick={() => setMobileOpen(false)}
                aria-current={isCurrentPage(pathname, link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-2">
              <Link href="/healthcare-resources" onClick={() => setMobileOpen(false)}>
                Find a service
              </Link>
            </Button>
            <div className="mt-2">
              <InstallAppButton />
            </div>
          </nav>
        </div>
    </header>
    </>
  );
}
