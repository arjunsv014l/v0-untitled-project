export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string | null
          email: string | null
          avatar_url: string | null
          college: string | null
          major: string | null
          graduation_year: number | null
          bio: string | null
          interests: string | null
          location: string | null
          referral_code: string | null
          marketing_consent: boolean | null
          created_at: string | null
          updated_at: string | null
          role: string | null
        }
        Insert: {
          id: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          college?: string | null
          major?: string | null
          graduation_year?: number | null
          bio?: string | null
          interests?: string | null
          location?: string | null
          referral_code?: string | null
          marketing_consent?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          role?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          avatar_url?: string | null
          college?: string | null
          major?: string | null
          graduation_year?: number | null
          bio?: string | null
          interests?: string | null
          location?: string | null
          referral_code?: string | null
          marketing_consent?: boolean | null
          created_at?: string | null
          updated_at?: string | null
          role?: string | null
        }
      }
      registrations: {
        Row: {
          id: string
          user_id: string
          email: string
          name: string | null
          dob: string | null
          registered_at: string
          status: string
          completed_profile: boolean
          source: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          name?: string | null
          dob?: string | null
          registered_at?: string
          status?: string
          completed_profile?: boolean
          source?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          name?: string | null
          dob?: string | null
          registered_at?: string
          status?: string
          completed_profile?: boolean
          source?: string | null
          created_at?: string
        }
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          theme: string
          notifications_enabled: boolean
          email_notifications: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: string
          notifications_enabled?: boolean
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: string
          notifications_enabled?: boolean
          email_notifications?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
