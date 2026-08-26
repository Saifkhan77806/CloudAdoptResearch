import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'CloudAdopt — Cloud Computing Adoption in Education',
    template: '%s — CloudAdopt',
  },
  description:
    'A research survey exploring cloud computing adoption, usage, benefits, challenges, and future plans in educational institutes.',
  keywords: [
    'cloud computing',
    'education',
    'research survey',
    'cloud adoption',
    'educational institutes',
  ],
  authors: [{ name: 'CloudAdopt Research' }],
  openGraph: {
    title: 'CloudAdopt — Cloud Computing Adoption in Education',
    description:
      'A research survey exploring cloud computing adoption, usage, benefits, challenges, and future plans in educational institutes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CloudAdopt — Cloud Computing Adoption in Education',
    description:
      'A research survey exploring cloud computing adoption in educational institutes.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
