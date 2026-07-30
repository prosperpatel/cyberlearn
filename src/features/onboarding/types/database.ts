import type { Profile } from './profile'

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row:    Profile & Record<string, unknown>
        Insert: Omit<Profile, 'created_at' | 'updated_at'> &
                Partial<Pick<Profile, 'avatar_url' | 'xp' | 'level' | 'streak'>> &
                Record<string, unknown>
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>> &
                Record<string, unknown>
        Relationships: []
      }
    }
    Views:          Record<string, never>
    Functions: {
      check_username_available: {
        Args:    { p_username: string; p_current_user?: string | null }
        Returns: boolean
      }
    }
    Enums:          Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
