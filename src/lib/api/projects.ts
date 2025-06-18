import { tables } from '@/lib/supabase'
import type { Project, ProjectInsert, ProjectUpdate } from '@/types/database'

export class ProjectsAPI {
  /**
   * Get all published projects for public view
   */
  static async getPublishedProjects() {
    const { data, error } = await tables.projects()
      .select('*')
      .eq('status', 'published')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  }

  /**
   * Get featured projects for homepage
   */
  static async getFeaturedProjects() {
    const { data, error } = await tables.projects()
      .select('*')
      .eq('status', 'published')
      .eq('featured', true)
      .order('sort_order', { ascending: true })
      .limit(6)

    if (error) throw error
    return data as Project[]
  }

  /**
   * Get single project by slug
   */
  static async getProjectBySlug(slug: string) {
    const { data, error } = await tables.projects()
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null // Project not found
      }
      throw error
    }
    return data as Project
  }

  /**
   * Get all projects for admin (including drafts)
   */
  static async getAllProjects() {
    const { data, error } = await tables.projects()
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data as Project[]
  }

  /**
   * Get single project by ID (admin)
   */
  static async getProjectById(id: string) {
    const { data, error } = await tables.projects()
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return data as Project
  }

  /**
   * Create new project
   */
  static async createProject(project: ProjectInsert) {
    const { data, error } = await tables.projects()
      .insert(project)
      .select()
      .single()

    if (error) throw error
    return data as Project
  }

  /**
   * Update project
   */
  static async updateProject(id: string, updates: ProjectUpdate) {
    const { data, error } = await tables.projects()
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  }

  /**
   * Delete project
   */
  static async deleteProject(id: string) {
    const { error } = await tables.projects()
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }

  /**
   * Check if slug is available
   */
  static async isSlugAvailable(slug: string, excludeId?: string) {
    let query = tables.projects()
      .select('id')
      .eq('slug', slug)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query.limit(1)

    if (error) throw error
    return data.length === 0
  }

  /**
   * Toggle featured status
   */
  static async toggleFeatured(id: string) {
    // First get current status
    const project = await this.getProjectById(id)
    if (!project) throw new Error('Project not found')

    const { data, error } = await tables.projects()
      .update({ featured: !project.featured })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  }

  /**
   * Update sort order
   */
  static async updateSortOrder(id: string, sortOrder: number) {
    const { data, error } = await tables.projects()
      .update({ sort_order: sortOrder })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Project
  }
} 