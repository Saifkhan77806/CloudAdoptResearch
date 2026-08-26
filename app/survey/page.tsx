import type { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SurveyForm } from '@/components/survey/survey-form';
import { getAppSettings } from '@/lib/queries';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Survey',
  description:
    'Complete the CloudAdopt survey on cloud computing adoption in your educational institute.',
};

export default async function SurveyPage() {
  const settings = await getAppSettings();

  if (settings.survey_status === 'closed') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
            <Lock className="h-6 w-6 text-muted-foreground" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">
            Survey currently closed
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The survey is not accepting responses at this time. Please check
            back later.
          </p>
          <Button asChild className="mt-6">
            <Link href="/">Return Home</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <SurveyForm />
      <Footer />
    </div>
  );
}
