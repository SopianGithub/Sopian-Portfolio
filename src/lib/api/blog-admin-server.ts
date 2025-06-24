import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database'

/**
 * Server-side only blog admin API
 * This directly uses the service role client without HTTP calls
 */

// Server-side admin client with service role
const createServerAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export class BlogAdminServerAPI {
  private static getClient() {
    return createServerAdminClient()
  }

  /**
   * Get all posts for admin (including drafts) - Server-side only
   */
  static async getAllPosts(): Promise<BlogPost[]> {
    const supabase = this.getClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      throw new Error(`Failed to fetch posts: ${error.message}`)
    }
    
    return data || []
  }

  /**
   * Get single post by ID (admin) - Server-side only
   */
  static async getPostById(id: string): Promise<BlogPost | null> {
    const supabase = this.getClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      if (error.code === 'PGRST116') {
        return null // Not found
      }
      throw new Error(`Failed to fetch post: ${error.message}`)
    }
    
    return data
  }

  /**
   * Create new blog post - Server-side only
   */
  static async createPost(post: BlogPostInsert): Promise<BlogPost> {
    const supabase = this.getClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(post)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to create post: ${error.message}`)
    }
    
    return data
  }

  /**
   * Update blog post - Server-side only
   */
  static async updatePost(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    const supabase = this.getClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to update post: ${error.message}`)
    }
    
    return data
  }

  /**
   * Delete blog post - Server-side only
   */
  static async deletePost(id: string): Promise<boolean> {
    const supabase = this.getClient()
    
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)
    
    if (error) {
      throw new Error(`Failed to delete post: ${error.message}`)
    }
    
    return true
  }

  /**
   * Publish post - Server-side only
   */
  static async publishPost(id: string): Promise<BlogPost> {
    const supabase = this.getClient()
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ 
        status: 'published', 
        published_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to publish post: ${error.message}`)
    }
    
    return data
  }

  /**
   * Toggle featured status - Server-side only
   */
  static async toggleFeatured(id: string): Promise<BlogPost> {
    const supabase = this.getClient()
    
    // Get current status
    const { data: currentPost } = await supabase
      .from('blog_posts')
      .select('featured')
      .eq('id', id)
      .single()
    
    if (!currentPost) {
      throw new Error('Post not found')
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ featured: !currentPost.featured })
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      throw new Error(`Failed to toggle featured: ${error.message}`)
    }
    
    return data
  }
} 