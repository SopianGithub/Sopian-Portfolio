import { tables, adminTables } from '@/lib/supabase'
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database'

export class BlogAPI {
  /**
   * Get all published blog posts for public view
   */
  static async getPublishedPosts(limit?: number) {
    let query = tables.blogPosts()
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data as BlogPost[]
  }

  /**
   * Get featured blog posts for homepage
   */
  static async getFeaturedPosts(limit = 3) {
    const { data, error } = await tables.blogPosts()
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as BlogPost[]
  }

  /**
   * Get single blog post by slug
   */
  static async getPostBySlug(slug: string) {
    const { data, error } = await tables.blogPosts()
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Post not found
      }
      throw error
    }

    // Increment view count
    if (data) {
      await this.incrementViews(data.id)
    }

    return data as BlogPost
  }

  /**
   * Get posts by tag
   */
  static async getPostsByTag(tag: string, limit?: number) {
    let query = tables.blogPosts()
      .select('*')
      .eq('status', 'published')
      .contains('tags', [tag])
      .order('published_at', { ascending: false })

    if (limit) {
      query = query.limit(limit)
    }

    const { data, error } = await query
    if (error) throw error
    return data as BlogPost[]
  }

  /**
   * Search posts by title or content
   */
  static async searchPosts(query: string, limit = 10) {
    const { data, error } = await tables.blogPosts()
      .select('*')
      .eq('status', 'published')
      .or(`title.ilike.%${query}%, content.ilike.%${query}%`)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as BlogPost[]
  }

  /**
   * Get all posts for admin (including drafts)
   */
  static async getAllPosts() {
    const { data, error } = await adminTables.blogPosts()
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as BlogPost[]
  }

  /**
   * Get single post by ID (admin)
   */
  static async getPostById(id: string) {
    const { data, error } = await adminTables.blogPosts()
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return data as BlogPost
  }

  /**
   * Create new blog post
   */
  static async createPost(post: BlogPostInsert) {
    const { data, error } = await adminTables.blogPosts()
      .insert(post)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  /**
   * Update blog post
   */
  static async updatePost(id: string, updates: BlogPostUpdate) {
    const { data, error } = await adminTables.blogPosts()
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  /**
   * Delete blog post
   */
  static async deletePost(id: string) {
    const { error } = await adminTables.blogPosts()
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }

  /**
   * Publish post
   */
  static async publishPost(id: string) {
    const { data, error } = await adminTables.blogPosts()
      .update({ 
        status: 'published', 
        published_at: new Date().toISOString() 
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  /**
   * Unpublish post (set to draft)
   */
  static async unpublishPost(id: string) {
    const { data, error } = await adminTables.blogPosts()
      .update({ 
        status: 'draft', 
        published_at: null 
      })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  /**
   * Check if slug is available
   */
  static async isSlugAvailable(slug: string, excludeId?: string) {
    let query = adminTables.blogPosts()
      .select('id')
      .eq('slug', slug)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query

    if (error) throw error
    return data.length === 0
  }

  /**
   * Toggle featured status
   */
  static async toggleFeatured(id: string) {
    // First get current status
    const { data: currentPost } = await adminTables.blogPosts()
      .select('featured')
      .eq('id', id)
      .single()

    if (!currentPost) throw new Error('Post not found')

    const { data, error } = await adminTables.blogPosts()
      .update({ featured: !currentPost.featured })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  /**
   * Increment view count
   */
  static async incrementViews(id: string) {
    // Get current views count
    const { data: currentPost } = await tables.blogPosts()
      .select('views')
      .eq('id', id)
      .single()

    if (!currentPost) return

    const { error } = await adminTables.blogPosts()
      .update({ views: (currentPost.views || 0) + 1 })
      .eq('id', id)

    if (error) {
      console.error('Error incrementing views:', error)
    }
  }

  /**
   * Increment like count
   */
  static async incrementLikes(id: string) {
    // Get current likes count
    const { data: currentPost } = await tables.blogPosts()
      .select('likes')
      .eq('id', id)
      .single()

    if (!currentPost) throw new Error('Post not found')

    const { data, error } = await adminTables.blogPosts()
      .update({ likes: (currentPost.likes || 0) + 1 })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as BlogPost
  }

  /**
   * Get all unique tags
   */
  static async getAllTags() {
    const { data, error } = await tables.blogPosts()
      .select('tags')
      .eq('status', 'published')

    if (error) throw error

    // Extract and flatten all tags
    const allTags = data
      .map(post => post.tags || [])
      .flat()
      .filter(tag => tag && typeof tag === 'string')

    // Return unique tags
    return Array.from(new Set(allTags)) as string[]
  }

  /**
   * Get related posts based on tags
   */
  static async getRelatedPosts(postId: string, tags: string[], limit = 3) {
    if (!tags.length) return []

    const { data, error } = await tables.blogPosts()
      .select('*')
      .eq('status', 'published')
      .neq('id', postId)
      .overlaps('tags', tags)
      .order('published_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data as BlogPost[]
  }
} 