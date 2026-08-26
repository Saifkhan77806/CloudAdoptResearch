import Link from 'next/link';
import {
  Cloud,
  Database,
  Network,
  ShieldCheck,
  GraduationCap,
  TrendingUp,
  ArrowRight,
  ClipboardCheck,
  Lock,
  BarChart3,
  Users,
  CheckCircle2,
  Server,
  Wifi,
  Layers,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SectionHeader } from '@/components/section-header';
import { getLandingStats } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const stats = await getLandingStats();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
              <span className="flex h-2 w-2 rounded-full bg-accent" />
              Academic Research Survey
            </div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Understanding How Educational Institutes Adopt Cloud Computing
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
              CloudAdopt is an academic survey platform designed to understand
              how educational institutes use cloud technologies, the benefits
              they experience, the challenges they face, and their plans for
              future adoption.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/survey">
                  Take the Survey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Link href="/insights">Explore Research</Link>
              </Button>
            </div>
          </div>

          {/* Abstract cloud/data visual */}
          <div className="mx-auto mt-16 flex max-w-4xl items-center justify-center">
            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { icon: Cloud, label: 'Cloud' },
                { icon: Database, label: 'Data' },
                { icon: Network, label: 'Network' },
                { icon: Server, label: 'Infrastructure' },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-3 rounded-xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-accent/40 animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <item.icon className="h-8 w-8 text-accent" />
                  <span className="text-sm font-medium text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero statistics */}
      <section className="border-y border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: 'Institutes Surveyed',
                value: stats.totalResponses,
                icon: Users,
              },
              {
                label: 'Cloud Adoption Rate',
                value: stats.adoptionRate,
                icon: TrendingUp,
                tone: 'success' as const,
              },
              {
                label: 'Average Satisfaction',
                value: stats.avgSatisfaction,
                icon: BarChart3,
                tone: 'accent' as const,
              },
              {
                label: 'Most Used Service',
                value: stats.mostUsedService,
                icon: Cloud,
                tone: 'default' as const,
              },
            ].map((stat) => (
              <Card key={stat.label} className="bg-card">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                      <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="truncate text-xl font-semibold">
                        {stat.value}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {stats.totalResponses === 0 && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Statistics will appear as survey responses are collected.
            </p>
          )}
        </div>
      </section>

      {/* Why this research matters */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why This Matters"
          title="Why this research matters"
          description="Cloud computing is reshaping how educational institutions operate, teach, and manage data. Understanding adoption patterns helps institutions make informed decisions."
        />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: GraduationCap, label: 'Digital Learning' },
            { icon: Database, label: 'Data Management' },
            { icon: Users, label: 'Collaboration' },
            { icon: Server, label: 'Infrastructure' },
            { icon: Wifi, label: 'Remote Education' },
            { icon: Layers, label: 'Scalability' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* What the survey explores */}
      <section className="border-y border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Survey Scope"
            title="What the survey explores"
            description="The survey covers four key dimensions of cloud computing adoption in education."
          />
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: TrendingUp,
                title: 'Adoption',
                description:
                  'Understand whether institutes currently use cloud technologies.',
              },
              {
                icon: Cloud,
                title: 'Usage',
                description:
                  'Identify the cloud services and deployment models being used.',
              },
              {
                icon: ShieldCheck,
                title: 'Challenges',
                description:
                  'Understand security, cost, skills, connectivity, privacy, and other barriers.',
              },
              {
                icon: ArrowRight,
                title: 'Future',
                description:
                  'Understand future cloud adoption plans and priorities.',
              },
            ].map((card) => (
              <Card
                key={card.title}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-white">
                    <card.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Process"
          title="How it works"
          description="The research process is simple, secure, and designed for academic rigor."
        />
        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              step: '01',
              icon: ClipboardCheck,
              title: 'Complete the survey',
              description:
                'Answer a structured questionnaire about your institution cloud usage.',
            },
            {
              step: '02',
              icon: Lock,
              title: 'Responses are securely collected',
              description:
                'All responses are stored securely and used only for academic research.',
            },
            {
              step: '03',
              icon: BarChart3,
              title: 'Aggregate insights are analyzed',
              description:
                'Responses are analyzed to identify trends and patterns in cloud adoption.',
            },
          ].map((item) => (
            <div key={item.step} className="relative">
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
                      <item.icon className="h-5 w-5 text-accent" />
                    </div>
                    <span className="text-3xl font-semibold text-border">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Research CTA */}
      <section className="border-t border-border/60 bg-primary">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-white/80" />
            <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Help us understand the future of cloud computing in education.
            </h2>
            <p className="mt-4 text-base text-white/70">
              Your response contributes to valuable academic research on cloud
              adoption trends in educational institutes.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="mt-8 bg-white text-primary hover:bg-white/90"
            >
              <Link href="/survey">
                Participate in Survey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
