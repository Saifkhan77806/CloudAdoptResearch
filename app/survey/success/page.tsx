import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, BarChart3 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Survey Submitted',
  description: 'Your survey response has been recorded.',
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: { code?: string };
}) {
  const responseCode = searchParams.code ?? '—';
  const now = new Date().toLocaleString('en-US', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:py-24">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 animate-fade-in">
          <CheckCircle2 className="h-8 w-8 text-success" />
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight sm:text-3xl animate-slide-up">
          Thank you for participating.
        </h1>
        <p className="mt-3 max-w-md text-sm text-muted-foreground animate-slide-up">
          Your response has been successfully recorded and will contribute to
          the analysis of cloud computing adoption in educational institutes.
        </p>

        <Card className="mt-8 w-full max-w-md animate-slide-up">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="text-sm text-muted-foreground">
                  Response ID
                </span>
                <span className="font-mono text-sm font-semibold">
                  {responseCode}
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="text-sm font-medium text-success">
                  Confirmed
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Submitted</span>
                <span className="text-sm font-medium">{now}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="outline">
            <Link href="/">
              Return Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/insights">
              Explore Research Insights
              <BarChart3 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}
