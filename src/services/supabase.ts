import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// The publishable key identifies this browser app; database policies protect user data.
export const supabase = url && key ? createClient(url, key) : null
