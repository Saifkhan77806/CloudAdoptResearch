import type { Database } from '@/lib/database.types';

type SurveyResponse = Database['public']['Tables']['survey_responses']['Row'];

export const chartColors = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-6))',
];

export function computeAdoptionDistribution(data: SurveyResponse[]) {
  const counts: Record<string, number> = {};
  data.forEach((r) => {
    counts[r.cloud_adoption] = (counts[r.cloud_adoption] || 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function computeServiceUsage(data: SurveyResponse[]) {
  const counts: Record<string, number> = {};
  data.forEach((r) => {
    r.cloud_services?.forEach((s: string) => {
      counts[s] = (counts[s] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function computeAdoptionDrivers(data: SurveyResponse[]) {
  const sums: Record<string, number> = {};
  const counts: Record<string, number> = {};
  data.forEach((r) => {
    if (r.adoption_drivers) {
      Object.entries(r.adoption_drivers).forEach(([key, val]) => {
        if (typeof val === 'number') {
          sums[key] = (sums[key] || 0) + val;
          counts[key] = (counts[key] || 0) + 1;
        }
      });
    }
  });
  return Object.keys(sums)
    .map((name) => ({
      name,
      value: counts[name] > 0 ? Math.round((sums[name] / counts[name]) * 10) / 10 : 0,
    }))
    .sort((a, b) => b.value - a.value);
}

export function computeChallenges(data: SurveyResponse[]) {
  const counts: Record<string, number> = {};
  data.forEach((r) => {
    r.challenges?.forEach((c: string) => {
      counts[c] = (counts[c] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function computeSatisfactionDistribution(data: SurveyResponse[]) {
  const counts: Record<number, number> = {};
  data.forEach((r) => {
    if (r.satisfaction !== null) {
      counts[r.satisfaction] = (counts[r.satisfaction] || 0) + 1;
    }
  });
  return [1, 2, 3, 4, 5].map((rating) => ({
    name: `${rating} - ${['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'][rating - 1]}`,
    value: counts[rating] || 0,
  }));
}

export function computeAdoptionByInstituteType(data: SurveyResponse[]) {
  const counts: Record<string, { adopter: number; total: number }> = {};
  data.forEach((r) => {
    if (!counts[r.institute_type]) counts[r.institute_type] = { adopter: 0, total: 0 };
    counts[r.institute_type].total++;
    if (r.cloud_adoption === 'Yes, extensively' || r.cloud_adoption === 'Yes, partially') {
      counts[r.institute_type].adopter++;
    }
  });
  return Object.entries(counts).map(([name, v]) => ({
    name,
    Adopters: v.adopter,
    Total: v.total,
  }));
}

export function computeFutureAdoption(data: SurveyResponse[]) {
  const counts: Record<string, number> = {};
  data.forEach((r) => {
    if (r.future_adoption) {
      counts[r.future_adoption] = (counts[r.future_adoption] || 0) + 1;
    }
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

export function computeDeploymentModels(data: SurveyResponse[]) {
  const counts: Record<string, number> = {};
  data.forEach((r) => {
    if (r.deployment_model) {
      counts[r.deployment_model] = (counts[r.deployment_model] || 0) + 1;
    }
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}
