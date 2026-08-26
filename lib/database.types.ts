export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

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
    };
  };
}
