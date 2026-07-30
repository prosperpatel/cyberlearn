import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/features/onboarding/types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[CyberLearn] Supabase environment variables are not configured.\n' +
    'Copy .env.example to .env and add your project credentials.\n' +
    'Authentication will not function until this is done.',
  )
}

export const supabase = createClient<Database>(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseKey ?? 'placeholder-key',
)
