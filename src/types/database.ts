export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          short_description: string | null
          image_url: string | null
          demo_url: string | null
          github_url: string | null
          technologies: Json
          features: Json
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          short_description?: string | null
          image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          technologies?: Json
          features?: Json
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          image_url?: string | null
          demo_url?: string | null
          github_url?: string | null
          technologies?: Json
          features?: Json
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string | null
          excerpt: string | null
          image_url: string | null
          tags: Json
          status: 'draft' | 'published' | 'archived'
          featured: boolean
          read_time: number
          views: number
          likes: number
          created_at: string
          updated_at: string
          published_at: string | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          tags?: Json
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          read_time?: number
          views?: number
          likes?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string | null
          excerpt?: string | null
          image_url?: string | null
          tags?: Json
          status?: 'draft' | 'published' | 'archived'
          featured?: boolean
          read_time?: number
          views?: number
          likes?: number
          created_at?: string
          updated_at?: string
          published_at?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          id: string
          company: string
          position: string
          description: string | null
          location: string | null
          start_date: string
          end_date: string | null
          type: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship'
          technologies: Json
          achievements: Json
          company_logo_url: string | null
          company_website: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company: string
          position: string
          description?: string | null
          location?: string | null
          start_date: string
          end_date?: string | null
          type?: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship'
          technologies?: Json
          achievements?: Json
          company_logo_url?: string | null
          company_website?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company?: string
          position?: string
          description?: string | null
          location?: string | null
          start_date?: string
          end_date?: string | null
          type?: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship'
          technologies?: Json
          achievements?: Json
          company_logo_url?: string | null
          company_website?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          level: number
          icon_url: string | null
          color: string | null
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          level?: number
          icon_url?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          level?: number
          icon_url?: string | null
          color?: string | null
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          subject: string | null
          message: string
          is_read: boolean
          replied_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          subject?: string | null
          message: string
          is_read?: boolean
          replied_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          subject?: string | null
          message?: string
          is_read?: boolean
          replied_at?: string | null
          created_at?: string
        }
        Relationships: []
      }
      admin_users: {
        Row: {
          id: string
          email: string
          name: string
          avatar_url: string | null
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          avatar_url?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          avatar_url?: string | null
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value?: Json | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      project_status: 'draft' | 'published' | 'archived'
      blog_status: 'draft' | 'published' | 'archived'
      experience_type: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Helper types
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]

// Specific table types for easier usage
export type Project = Tables<'projects'>
export type BlogPost = Tables<'blog_posts'>
export type Experience = Tables<'experiences'>
export type Skill = Tables<'skills'>
export type ContactMessage = Tables<'contact_messages'>
export type AdminUser = Tables<'admin_users'>
export type SiteSetting = Tables<'site_settings'>

// Insert types
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert']
export type ExperienceInsert = Database['public']['Tables']['experiences']['Insert']
export type SkillInsert = Database['public']['Tables']['skills']['Insert']
export type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert']
export type AdminUserInsert = Database['public']['Tables']['admin_users']['Insert']
export type SiteSettingInsert = Database['public']['Tables']['site_settings']['Insert']

// Update types
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']
export type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update']
export type ExperienceUpdate = Database['public']['Tables']['experiences']['Update']
export type SkillUpdate = Database['public']['Tables']['skills']['Update']
export type ContactMessageUpdate = Database['public']['Tables']['contact_messages']['Update']
export type AdminUserUpdate = Database['public']['Tables']['admin_users']['Update']
export type SiteSettingUpdate = Database['public']['Tables']['site_settings']['Update']
