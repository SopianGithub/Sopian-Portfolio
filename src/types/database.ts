export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          technologies: string[]
          github_url: string | null
          live_url: string | null
          image_url: string | null
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          technologies: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          technologies?: string[]
          github_url?: string | null
          live_url?: string | null
          image_url?: string | null
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          slug: string
          published: boolean
          featured_image: string | null
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          slug: string
          published?: boolean
          featured_image?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          slug?: string
          published?: boolean
          featured_image?: string | null
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          company: string
          position: string
          description: string
          start_date: string
          end_date: string | null
          technologies: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company: string
          position: string
          description: string
          start_date: string
          end_date?: string | null
          technologies: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company?: string
          position?: string
          description?: string
          start_date?: string
          end_date?: string | null
          technologies?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
