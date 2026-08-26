import { createSupabaseServerClient } from '@/lib/supabase/server';
import type { Database } from '@/lib/database.types';

type SurveyResponse = Database['public']['Tables']['survey_responses']['Row'];

export async function getLandingStats() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('survey_responses')
    .select('cloud_adoption, satisfaction, cloud_services');

  if (error || !data || data.length === 0) {
    return {
      totalResponses: 0,
      adoptionRate: '—',
      avgSatisfaction: '—',
      mostUsedService: '—',
    };
  }

  const total = data.length;
  const adopters = data.filter(
    (r) =>
      r.cloud_adoption === 'Yes, extensively' ||
      r.cloud_adoption === 'Yes, partially'
  ).length;
  const adoptionRate = `${Math.round((adopters / total) * 100)}%`;

  const satisfactionScores = data
    .map((r) => r.satisfaction)
    .filter((s): s is number => s !== null);
  const avgSatisfaction =
    satisfactionScores.length > 0
      ? (satisfactionScores.reduce((a, b) => a + b, 0) / satisfactionScores.length).toFixed(1)
      : '—';

  const serviceCounts: Record<string, number> = {};
  data.forEach((r) => {
    r.cloud_services?.forEach((s: string) => {
      serviceCounts[s] = (serviceCounts[s] || 0) + 1;
    });
  });
  const mostUsedService =
    Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';

  return {
    totalResponses: total,
    adoptionRate,
    avgSatisfaction,
    mostUsedService,
  };
}

export interface DashboardFilters {
  instituteType?: string;
  cloudAdoption?: string;
  studentCount?: string;
  deploymentModel?: string;
  minSatisfaction?: string;
  dateFrom?: string;
  dateTo?: string;
}

export async function getResponsesCount(filters: DashboardFilters = {}) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from('survey_responses').select('*', { count: 'exact', head: true });
  query = applyFilters(query, filters);
  const { count } = await query;
  return count ?? 0;
}

export async function getResponses(
  filters: DashboardFilters = {},
  page = 1,
  pageSize = 10,
  sortBy: string = 'created_at',
  sortDir: 'asc' | 'desc' = 'desc'
): Promise<{ data: SurveyResponse[]; total: number }> {
  const supabase = await createSupabaseServerClient();
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  let query = supabase
    .from('survey_responses')
    .select('*', { count: 'exact' })
    .order(sortBy, { ascending: sortDir === 'asc' })
    .range(from, to);
  query = applyFilters(query, filters);

  const { data, count, error } = await query;
  if (error) return { data: [], total: 0 };
  return { data: data ?? [], total: count ?? 0 };
}

export async function getResponseById(id: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from('survey_responses')
    .select('*')
    .eq('response_code', id)
    .maybeSingle();
  if (error) return null;
  return data;
}

export async function getAllResponsesForAnalytics(filters: DashboardFilters = {}) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from('survey_responses').select('*');
  query = applyFilters(query, filters);
  const { data, error } = await query;
  if (error) return [];
  return (data ?? []) as SurveyResponse[];
}

export async function getDashboardStats(filters: DashboardFilters = {}) {
  const data = await getAllResponsesForAnalytics(filters);

  if (data.length === 0) {
    return {
      totalResponses: 0,
      adoptionRate: '—',
      avgSatisfaction: '—',
      futureAdoptionRate: '—',
    };
  }

  const total = data.length;
  const adopters = data.filter(
    (r) =>
      r.cloud_adoption === 'Yes, extensively' ||
      r.cloud_adoption === 'Yes, partially'
  ).length;
  const adoptionRate = `${Math.round((adopters / total) * 100)}%`;

  const satisfactionScores = data
    .map((r) => r.satisfaction)
    .filter((s): s is number => s !== null);
  const avgSatisfaction =
    satisfactionScores.length > 0
      ? (satisfactionScores.reduce((a, b) => a + b, 0) / satisfactionScores.length).toFixed(1)
      : '—';

  const futureAdopters = data.filter(
    (r) =>
      r.future_adoption === 'Definitely Yes' ||
      r.future_adoption === 'Probably Yes'
  ).length;
  const futureAdoptionRate = `${Math.round((futureAdopters / total) * 100)}%`;

  return {
    totalResponses: total,
    adoptionRate,
    avgSatisfaction,
    futureAdoptionRate,
  };
}

export async function getAppSettings() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from('app_settings')
    .select('*')
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .maybeSingle();
  return (
    data ?? {
      id: '00000000-0000-0000-0000-000000000001',
      project_title: 'CloudAdopt',
      survey_status: 'open' as const,
      updated_at: new Date().toISOString(),
    }
  );
}

function applyFilters(query: any, filters: DashboardFilters) {
  if (filters.instituteType && filters.instituteType !== 'all') {
    query = query.eq('institute_type', filters.instituteType);
  }
  if (filters.cloudAdoption && filters.cloudAdoption !== 'all') {
    query = query.eq('cloud_adoption', filters.cloudAdoption);
  }
  if (filters.studentCount && filters.studentCount !== 'all') {
    query = query.eq('student_count', filters.studentCount);
  }
  if (filters.deploymentModel && filters.deploymentModel !== 'all') {
    query = query.eq('deployment_model', filters.deploymentModel);
  }
  if (filters.minSatisfaction && filters.minSatisfaction !== 'all') {
    query = query.gte('satisfaction', parseInt(filters.minSatisfaction));
  }
  if (filters.dateFrom) {
    query = query.gte('created_at', filters.dateFrom);
  }
  if (filters.dateTo) {
    query = query.lte('created_at', filters.dateTo + 'T23:59:59');
  }
  return query;
}
