import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// Create Supabase client with TypeScript types
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Create admin client for server-side operations (if needed)
export const createAdminClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!serviceRoleKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }
  
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Create admin client instance for server-side operations
const adminClient = (() => {
  try {
    return createAdminClient()
  } catch (error) {
    console.warn('Admin client not available:', error)
    return null
  }
})()

// Type-safe table references for public operations
export const tables = {
  projects: () => supabase.from('projects'),
  blogPosts: () => supabase.from('blog_posts'),
  experiences: () => supabase.from('experiences'),
  skills: () => supabase.from('skills'),
  contactMessages: () => supabase.from('contact_messages'),
  adminUsers: () => supabase.from('admin_users'),
  siteSettings: () => supabase.from('site_settings'),
} as const

// Type-safe table references for admin operations using service role
export const adminTables = {
  projects: () => adminClient?.from('projects') || supabase.from('projects'),
  blogPosts: () => adminClient?.from('blog_posts') || supabase.from('blog_posts'),
  experiences: () => adminClient?.from('experiences') || supabase.from('experiences'),
  skills: () => adminClient?.from('skills') || supabase.from('skills'),
  contactMessages: () => adminClient?.from('contact_messages') || supabase.from('contact_messages'),
  adminUsers: () => adminClient?.from('admin_users') || supabase.from('admin_users'),
  siteSettings: () => adminClient?.from('site_settings') || supabase.from('site_settings'),
} as const

// Export the default client
export default supabase 