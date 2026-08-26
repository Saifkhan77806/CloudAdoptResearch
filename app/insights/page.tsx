import type { Metadata } from 'next';
import { BarChart3, TrendingUp, CheckCircle2, Users } from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SectionHeader } from '@/components/section-header';
import { StatCard } from '@/components/stat-card';
import { ChartCard } from '@/components/chart-card';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getAllResponsesForAnalytics, getDashboardStats } from '@/lib/queries';
import {
  computeAdoptionDistribution,
  computeServiceUsage,
  computeAdoptionDrivers,
  computeChallenges,
  computeSatisfactionDistribution,
  computeAdoptionByInstituteType,
  computeFutureAdoption,
} from '@/lib/chart-data';
import {
  DonutChart,
  SimpleBarChart,
  GroupedBarChart,
} from '@/components/charts';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Public aggregate research insights on cloud computing adoption in educational institutes.',
};

export default async function InsightsPage() {
  const [data, stats] = await Promise.all([
    getAllResponsesForAnalytics(),
    getDashboardStats(),
  ]);

  const hasData = data.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            Aggregate Analytics
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Research Insights
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground">
            Public aggregate statistics from the CloudAdopt survey. Individual
            responses are never shown publicly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {!hasData ? (
          <EmptyState
            icon={BarChart3}
            title="Research insights will appear here as survey responses are collected."
            description="Once responses are submitted, this page will display aggregate statistics and charts on cloud computing adoption."
            action={
              <Button asChild>
                <Link href="/survey">Take the Survey</Link>
              </Button>
            }
          />
        ) : (
          <>
            {/* Overview cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Total Responses"
                value={stats.totalResponses}
                icon={Users}
              />
              <StatCard
                label="Cloud Adoption Rate"
                value={stats.adoptionRate}
                icon={TrendingUp}
                tone="success"
              />
              <StatCard
                label="Planning to Adopt"
                value={
                  data.filter(
                    (r) =>
                      r.cloud_adoption === 'Planning to adopt' ||
                      r.cloud_adoption === 'Not sure'
                  ).length
                }
                icon={CheckCircle2}
                tone="accent"
              />
              <StatCard
                label="Average Satisfaction"
                value={stats.avgSatisfaction}
                icon={BarChart3}
              />
            </div>

            {/* Charts */}
            <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <ChartCard
                title="Cloud Adoption Distribution"
                description="How institutes currently use cloud computing"
              >
                <DonutChart data={computeAdoptionDistribution(data)} />
              </ChartCard>

              <ChartCard
                title="Most Used Cloud Services"
                description="Services adopted by participating institutes"
              >
                <SimpleBarChart
                  data={computeServiceUsage(data)}
                  layout="vertical"
                />
              </ChartCard>

              <ChartCard
                title="Main Adoption Drivers"
                description="Average rated importance of adoption factors (1-5)"
              >
                <SimpleBarChart
                  data={computeAdoptionDrivers(data)}
                  layout="vertical"
                />
              </ChartCard>

              <ChartCard
                title="Main Challenges"
                description="Most frequently reported barriers"
              >
                <SimpleBarChart
                  data={computeChallenges(data)}
                  layout="vertical"
                  color="hsl(var(--chart-4))"
                />
              </ChartCard>

              <ChartCard
                title="Satisfaction Distribution"
                description="Overall satisfaction with cloud computing"
              >
                <SimpleBarChart
                  data={computeSatisfactionDistribution(data)}
                  color="hsl(var(--chart-2))"
                />
              </ChartCard>

              <ChartCard
                title="Adoption by Institute Type"
                description="Adopters vs total responses by institute type"
              >
                <GroupedBarChart
                  data={computeAdoptionByInstituteType(data)}
                  keys={['Adopters', 'Total']}
                />
              </ChartCard>

              <ChartCard
                title="Future Adoption Intent"
                description="Likelihood of increasing cloud adoption"
                className="lg:col-span-2"
              >
                <DonutChart data={computeFutureAdoption(data)} />
              </ChartCard>
            </div>

            <p className="mt-8 text-center text-xs text-muted-foreground">
              Data shown is aggregate and anonymized. No individual responses
              are displayed publicly.
            </p>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
