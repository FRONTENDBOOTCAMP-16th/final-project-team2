import type { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import { supabaseConfig } from './config'

export const createClient = () =>
  createBrowserClient(supabaseConfig.url, supabaseConfig.key)


// --------------------------------------------------------------------------
// Supabase 싱글톤(Singleton)

let singleton: SupabaseClient | null = null

export const getSupabaseClient = () => {
  return singleton ? singleton : (singleton = createClient())
}
