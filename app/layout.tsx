import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Swasthya Connect — Helping Communities Access Online Healthcare',
    template: '%s — Swasthya Connect',
  },
  description:
    'Discover online healthcare services and learn how to access them. Helping Communities Access Online Healthcare.',
  keywords: ['healthcare access', 'India', 'online healthcare', 'health services'],
  authors: [{ name: 'Swasthya Connect' }],
  openGraph: {
    title: 'Swasthya Connect — Helping Communities Access Online Healthcare',
    description: 'Discover online healthcare services and learn how to access them.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Swasthya Connect — Helping Communities Access Online Healthcare',
    description: 'Discover online healthcare services and learn how to access them.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">{children}</body>
    </html>
  );
}
