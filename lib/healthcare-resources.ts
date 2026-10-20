import { z } from 'zod';
import type { Database, HealthcareResourceCategory } from '@/lib/database.types';
import { createSupabaseServerClient } from '@/lib/supabase/server';

export const resourceCategories = [
  'online-consultation',
  'government-health-services',
  'hospital-appointments',
  'digital-health-records',
  'health-schemes',
  'emergency-support',
  'facility-directory',
] as const satisfies readonly HealthcareResourceCategory[];

export const providerTypes = ['government', 'ngo', 'private'] as const;

type ResourceRow = Database['public']['Tables']['healthcare_resources']['Row'];
export type HealthcareResource = Omit<ResourceRow, 'search_vector'>;

export type ResourceSearchResult = {
  resources: HealthcareResource[];
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
  error: boolean;
  invalid: boolean;
};

const PAGE_SIZE = 12;
const RESOURCE_COLUMNS =
  'id,slug,name,description,category,provider_type,official_url,languages,cost_info,eligibility_info,access_instructions,internet_requirement,state_codes,is_verified,is_published,last_verified_at,created_at,updated_at';

const paramsSchema = z.object({
  q: z.string().trim().max(100).optional().default(''),
  category: z.enum(resourceCategories).optional(),
  provider: z.enum(providerTypes).optional(),
  state: z.string().trim().toUpperCase().regex(/^[A-Z]{2}$/).optional(),
  language: z.enum(['English', 'Hindi']).optional(),
  page: z.coerce.number().int().min(1).max(10_000).optional().default(1),
});

function emptyResult(page = 1, error = false, invalid = false): ResourceSearchResult {
  return { resources: [], page, pageSize: PAGE_SIZE, total: 0, pageCount: 0, error, invalid };
}

export async function searchHealthcareResources(
  input: Record<string, string | undefined>
): Promise<ResourceSearchResult> {
  const normalizedInput = Object.fromEntries(
    Object.entries(input).map(([key, value]) => [key, value === '' ? undefined : value])
  );
  const parsed = paramsSchema.safeParse(normalizedInput);
  if (!parsed.success) return emptyResult(1, false, true);

  const { q, category, provider, state, language, page } = parsed.data;
  // Restrict full-text syntax to words and spaces so user input cannot add
  // PostgREST filter syntax or web-search operators.
  const queryText = q.replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
  const offset = (page - 1) * PAGE_SIZE;

  try {
    const supabase = createSupabaseServerClient();
    let query = supabase
      .from('healthcare_resources')
      .select(RESOURCE_COLUMNS, { count: 'exact' })
      .eq('is_verified', true)
      .eq('is_published', true)
      .order('name', { ascending: true })
      .range(offset, offset + PAGE_SIZE - 1);

    if (queryText) {
      query = query.textSearch('search_vector', queryText, {
        config: 'simple',
        type: 'plain',
      });
    }
    if (category) query = query.eq('category', category);
    if (provider) query = query.eq('provider_type', provider);
    if (state) query = query.or(`state_codes.cs.{${state}},state_codes.eq.{}`);
    if (language) query = query.contains('languages', [language]);

    const { data, count, error } = await query;
    if (error) return emptyResult(page, true);

    const total = count ?? 0;
    const pageCount = Math.ceil(total / PAGE_SIZE);
    // A stale page link after filtering should resolve to the final page.
    if (pageCount > 0 && page > pageCount) {
      return searchHealthcareResources({ ...input, page: String(pageCount) });
    }

    return {
      resources: (data ?? []) as HealthcareResource[],
      page,
      pageSize: PAGE_SIZE,
      total,
      pageCount,
      error: false,
      invalid: false,
    };
  } catch {
    return emptyResult(page, true);
  }
}

export async function getHealthcareResource(slug: string): Promise<HealthcareResource | null> {
  const validSlug = z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .safeParse(slug);
  if (!validSlug.success) return null;

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('healthcare_resources')
      .select(RESOURCE_COLUMNS)
      .eq('slug', validSlug.data)
      .eq('is_verified', true)
      .eq('is_published', true)
      .maybeSingle();
    if (error) return null;
    return data as HealthcareResource | null;
  } catch {
    return null;
  }
}

export async function getFeaturedResources() {
  const result = await searchHealthcareResources({ page: '1' });
  return result.resources.slice(0, 3);
}
