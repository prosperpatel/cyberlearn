import { supabase } from '@/lib/supabase'
import type { Profile } from '../types/profile'

export type CreateProfileInput = Pick<
  Profile,
  'id' | 'username' | 'display_name' | 'avatar_url' | 'goal' | 'experience' | 'country' | 'daily_goal' | 'interests'
>

export const ProfileService = {
  async getProfile(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    if (error) throw error
    return data as Profile | null
  },

  async createProfile(input: CreateProfileInput): Promise<Profile> {
    const { data: { session } } = await supabase.auth.getSession()
    console.log('[ProfileService] createProfile — authenticated uid:', session?.user?.id ?? 'NONE')
    console.log('[ProfileService] createProfile — payload:', JSON.stringify({ ...input, xp: 100, level: 1, streak: 0 }, null, 2))

    const { data, error, status, statusText } = await supabase
      .from('profiles')
      .insert({ ...input, xp: 100, level: 1, streak: 0 })
      .select()
      .single()

    console.log('[ProfileService] createProfile — response:', { status, statusText, data, error })

    if (error) throw error
    return data as Profile
  },

  async updateProfile(
    userId: string,
    input: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>,
  ): Promise<Profile> {
    const { data, error } = await supabase
      .from('profiles')
      .update(input)
      .eq('id', userId)
      .select()
      .single()
    if (error) throw error
    return data as Profile
  },

  async checkUsernameAvailability(username: string, currentUserId?: string): Promise<boolean> {
    console.log('[ProfileService] checkUsernameAvailability — username:', username, 'userId:', currentUserId)

    const { data, error, status } = await supabase.rpc('check_username_available', {
      p_username:     username,
      p_current_user: currentUserId ?? null,
    })

    console.log('[ProfileService] checkUsernameAvailability — response:', { status, data, error })

    if (error) throw error
    return Boolean(data)
  },
}
