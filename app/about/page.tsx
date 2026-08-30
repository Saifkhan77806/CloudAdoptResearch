import type { Metadata } from 'next';
import {
  Target,
  HelpCircle,
  Users,
  ShieldCheck,
  BookOpen,
} from 'lucide-react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SectionHeader } from '@/components/section-header';
import { Card, CardContent } from '@/components/ui/card';
 
export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about the CloudAdopt research objectives, questions, and who should participate in this academic survey on cloud computing adoption in education.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            About the Research
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            About CloudAdopt
          </h1>
          <p className="mt-4 text-base text-muted-foreground">
            CloudAdopt is an academic research initiative studying how
            educational institutes adopt, use, and plan to expand cloud
            computing technologies.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                <Target className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Research Objective</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  The purpose of this study is to measure cloud computing
                  adoption and understand the factors influencing adoption
                  among educational institutes. This includes examining the
                  extent of adoption, the services used, the drivers and
                  barriers, satisfaction levels, and future adoption
                  intentions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-accent" />
          <h2 className="text-xl font-semibold">Research Questions</h2>
        </div>
        <div className="mt-6 space-y-3">
          {[
            'How widely is cloud computing adopted?',
            'Which cloud services are most commonly used?',
            'What motivates educational institutes to adopt cloud computing?',
            'What benefits are experienced?',
            'What barriers prevent or slow adoption?',
            'How satisfied are institutes with their current cloud usage?',
            'What are their future cloud adoption intentions?',
          ].map((q, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-4"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-semibold text-accent">
                {i + 1}
              </span>
              <p className="text-sm">{q}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-accent" />
            <h2 className="text-xl font-semibold">Who should participate?</h2>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Appropriate respondents include individuals involved in technology
            decisions at their institution:
          </p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              'IT administrators',
              'Institution administrators',
              'Department heads',
              'Technology coordinators',
              'Faculty members familiar with institutional technology',
            ].map((role) => (
              <div
                key={role}
                className="flex items-center gap-3 rounded-lg border border-border/60 bg-card p-4"
              >
                <div className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-sm font-medium">{role}</span>
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
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Privacy</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Responses are collected for academic research purposes only.
                  The survey does not request sensitive personal information.
                  Institute name is optional, and no personally identifying
                  information is required. Individual responses are accessible
                  only to authorized researchers through a secure dashboard.
                  Public insights pages show only aggregate, anonymized
                  statistics.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
}
