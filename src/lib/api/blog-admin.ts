import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database'

/**
 * Client-side API wrapper for blog admin operations
 * This calls server-side API routes that use service role key
 */
export class BlogAdminAPI {
  private static async apiCall(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    return response.json()
  }

  /**
   * Get all posts for admin (including drafts)
   */
  static async getAllPosts(): Promise<BlogPost[]> {
    const result = await this.apiCall('/api/admin/blog?action=getAllPosts')
    return result.data
  }

  /**
   * Get single post by ID (admin)
   */
  static async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const result = await this.apiCall(`/api/admin/blog?action=getPost&id=${id}`)
      return result.data
    } catch (error) {
      if (error instanceof Error && error.message.includes('not found')) {
        return null
      }
      throw error
    }
  }

  /**
   * Create new blog post
   */
  static async createPost(post: BlogPostInsert): Promise<BlogPost> {
    const result = await this.apiCall('/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        action: 'createPost',
        data: post
      })
    })
    return result.data
  }

  /**
   * Update blog post
   */
  static async updatePost(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    const result = await this.apiCall('/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        action: 'updatePost',
        data: { id, updates }
      })
    })
    return result.data
  }

  /**
   * Delete blog post
   */
  static async deletePost(id: string): Promise<boolean> {
    await this.apiCall('/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        action: 'deletePost',
        data: { id }
      })
    })
    return true
  }

  /**
   * Publish post
   */
  static async publishPost(id: string): Promise<BlogPost> {
    const result = await this.apiCall('/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        action: 'publishPost',
        data: { id }
      })
    })
    return result.data
  }

  /**
   * Unpublish post (set to draft)
   */
  static async unpublishPost(id: string): Promise<BlogPost> {
    const updates = { 
      status: 'draft' as const, 
      published_at: null 
    }
    return this.updatePost(id, updates)
  }

  /**
   * Toggle featured status
   */
  static async toggleFeatured(id: string): Promise<BlogPost> {
    const result = await this.apiCall('/api/admin/blog', {
      method: 'POST',
      body: JSON.stringify({
        action: 'toggleFeatured',
        data: { id }
      })
    })
    return result.data
  }

  /**
   * Check if slug is available
   */
  static async isSlugAvailable(slug: string, excludeId?: string): Promise<boolean> {
    // For now, we'll use the existing BlogAPI for this simple check
    // since it's just a read operation
    const { BlogAPI } = await import('./blog')
    return BlogAPI.isSlugAvailable(slug, excludeId)
  }

  /**
   * Increment view count
   */
  static async incrementViews(id: string): Promise<void> {
    // This can use regular client since it's a simple increment
    const { BlogAPI } = await import('./blog')
    return BlogAPI.incrementViews(id)
  }

  /**
   * Increment like count
   */
  static async incrementLikes(id: string): Promise<BlogPost> {
    // This can use regular client since it's a simple increment
    const { BlogAPI } = await import('./blog')
    return BlogAPI.incrementLikes(id)
  }
} 