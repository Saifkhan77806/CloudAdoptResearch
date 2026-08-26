import type { Metadata } from 'next';
import { FlaskConical, Users, ClipboardCheck, ListChecks, BarChart3 } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Methodology',
  description:
    'The research methodology behind the CloudAdopt survey: approach, target population, data collection, survey areas, and analysis methods.',
};

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Research Methodology
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Methodology
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            A structured quantitative approach to studying cloud computing
            adoption in educational institutes.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {[
            {
              icon: FlaskConical,
              title: 'Research Approach',
              body: 'Quantitative survey research using a structured online questionnaire designed to capture measurable data on cloud computing adoption patterns.',
            },
            {
              icon: Users,
              title: 'Target Population',
              body: 'Educational institutes using, considering, or not yet using cloud computing. This includes schools, colleges, universities, and training institutes of varying sizes.',
            },
            {
              icon: ClipboardCheck,
              title: 'Data Collection',
              body: 'Online questionnaire administered through this platform. Responses are submitted by institutional representatives familiar with their organization technology landscape.',
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <ListChecks className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold">Survey Areas</h2>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              'Institute profile',
              'Cloud adoption',
              'Cloud services',
              'Adoption drivers',
              'Benefits',
              'Challenges',
              'Satisfaction',
              'Future plans',
            ].map((area) => (
              <div
                key={area}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4"
              >
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Data Analysis</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Collected responses are analyzed using descriptive and
                  comparative statistical methods:
                </p>
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {[
                    'Frequency',
                    'Percentage',
                    'Average scores',
                    'Distribution',
                    'Cross-tabulation',
                    'Comparative analysis',
                  ].map((method) => (
                    <div
                      key={method}
                      className="flex items-center gap-2 text-sm"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-accent" />
                      <span>{method}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
