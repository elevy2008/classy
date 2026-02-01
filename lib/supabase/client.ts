import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  // Use empty strings as fallback during build time to prevent errors
  // At runtime, these will be properly set from environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}
