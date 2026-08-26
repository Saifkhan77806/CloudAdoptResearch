'use server';

import { createSupabaseRouteHandlerClient } from '@/lib/supabase/server';
import { surveySchema, SurveyData } from '@/lib/survey-constants';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type SubmitResult =
  | { success: true; responseCode: string }
  | { success: false; error: string };

export async function submitSurveyAction(
  rawData: unknown
): Promise<SubmitResult> {
  const result = surveySchema.safeParse(rawData);
  if (!result.success) {
    const firstError = result.error.issues[0];
    return {
      success: false,
      error: firstError?.message ?? 'Please complete all required fields.',
    };
  }

  const data = result.data as SurveyData;
  const supabase = createSupabaseRouteHandlerClient();

  const { data: settings } = await supabase
    .from('app_settings')
    .select('survey_status')
    .eq('id', '00000000-0000-0000-0000-000000000001')
    .maybeSingle();

  if (settings?.survey_status === 'closed') {
    return {
      success: false,
      error: 'The survey is currently closed and not accepting responses.',
    };
  }

  const isAdopter =
    data.cloudAdoption === 'Yes, extensively' ||
    data.cloudAdoption === 'Yes, partially';

  const insertData = {
    institute_type: data.instituteType,
    institute_name: data.instituteName || null,
    student_count: data.studentCount ?? null,
    employee_count: data.employeeCount ?? null,
    location: data.location || null,
    cloud_adoption: data.cloudAdoption,
    adoption_duration: isAdopter ? data.adoptionDuration ?? null : null,
    deployment_model: isAdopter ? data.deploymentModel ?? null : null,
    cloud_services: isAdopter ? data.cloudServices : [],
    service_usage_level: isAdopter ? data.serviceUsageLevel ?? null : null,
    adoption_drivers: isAdopter ? data.adoptionDrivers : {},
    benefits: isAdopter ? data.benefits : [],
    challenges: data.challenges,
    non_adoption_reasons: !isAdopter ? data.nonAdoptionReasons : [],
    challenge_significance: data.challengeSignificance ?? null,
    satisfaction: isAdopter ? data.satisfaction ?? null : null,
    future_adoption: data.futureAdoption,
    future_areas: data.futureAreas,
    comments: data.comments || null,
    is_demo: false,
  };

  const { data: inserted, error } = await supabase
    .from('survey_responses')
    .insert(insertData)
    .select('response_code')
    .single();

  if (error) {
    return {
      success: false,
      error: 'Something went wrong while submitting your response. Please try again.',
    };
  }

  revalidatePath('/');
  revalidatePath('/insights');

  redirect(`/survey/success?code=${inserted.response_code}`);
}
