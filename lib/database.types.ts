export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type HealthcareResourceCategory =
  | 'online-consultation'
  | 'government-health-services'
  | 'hospital-appointments'
  | 'digital-health-records'
  | 'health-schemes'
  | 'emergency-support'
  | 'facility-directory';

export interface Database {
  public: {
    Tables: {
      survey_responses: {
        Row: {
          id: string;
          response_code: string;
          institute_type: string;
          institute_name: string | null;
          student_count: string | null;
          employee_count: string | null;
          location: string | null;
          cloud_adoption: string;
          adoption_duration: string | null;
          deployment_model: string | null;
          cloud_services: string[];
          service_usage_level: number | null;
          adoption_drivers: Record<string, number>;
          benefits: string[];
          challenges: string[];
          non_adoption_reasons: string[];
          challenge_significance: number | null;
          satisfaction: number | null;
          future_adoption: string | null;
          future_areas: string[];
          comments: string | null;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          response_code?: string;
          institute_type: string;
          institute_name?: string | null;
          student_count?: string | null;
          employee_count?: string | null;
          location?: string | null;
          cloud_adoption: string;
          adoption_duration?: string | null;
          deployment_model?: string | null;
          cloud_services?: string[];
          service_usage_level?: number | null;
          adoption_drivers?: Record<string, number>;
          benefits?: string[];
          challenges?: string[];
          non_adoption_reasons?: string[];
          challenge_significance?: number | null;
          satisfaction?: number | null;
          future_adoption?: string | null;
          future_areas?: string[];
          comments?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['survey_responses']['Insert']>;
      };
      app_settings: {
        Row: {
          id: string;
          project_title: string;
          survey_status: 'open' | 'closed';
          updated_at: string;
        };
        Insert: {
          id?: string;
          project_title?: string;
          survey_status?: 'open' | 'closed';
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['app_settings']['Insert']>;
      };
      healthcare_resources: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string;
          search_vector: string;
          category: HealthcareResourceCategory;
          provider_type: 'government' | 'ngo' | 'private';
          official_url: string;
          languages: string[];
          cost_info: string | null;
          eligibility_info: string | null;
          access_instructions: string | null;
          internet_requirement: string | null;
          state_codes: string[];
          is_verified: boolean;
          is_published: boolean;
          last_verified_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          description: string;
          category: HealthcareResourceCategory;
          provider_type: 'government' | 'ngo' | 'private';
          official_url: string;
          languages?: string[];
          cost_info?: string | null;
          eligibility_info?: string | null;
          access_instructions?: string | null;
          internet_requirement?: string | null;
          state_codes?: string[];
          is_verified?: boolean;
          is_published?: boolean;
          last_verified_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['healthcare_resources']['Insert']>;
      };
    };
  };
}
