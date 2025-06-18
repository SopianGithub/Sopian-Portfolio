import { tables } from '@/lib/supabase'
import type { Experience, ExperienceInsert, ExperienceUpdate } from '@/types/database'

export class ExperiencesAPI {
  /**
   * Get all experiences ordered by start date (newest first)
   */
  static async getAllExperiences() {
    const { data, error } = await tables.experiences()
      .select('*')
      .order('start_date', { ascending: false })

    if (error) throw error
    return data as Experience[]
  }

  /**
   * Get single experience by ID
   */
  static async getExperienceById(id: string) {
    const { data, error } = await tables.experiences()
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return data as Experience
  }

  /**
   * Get current experiences (end_date is null)
   */
  static async getCurrentExperiences() {
    const { data, error } = await tables.experiences()
      .select('*')
      .is('end_date', null)
      .order('start_date', { ascending: false })

    if (error) throw error
    return data as Experience[]
  }

  /**
   * Get experiences by type
   */
  static async getExperiencesByType(type: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship') {
    const { data, error } = await tables.experiences()
      .select('*')
      .eq('type', type)
      .order('start_date', { ascending: false })

    if (error) throw error
    return data as Experience[]
  }

  /**
   * Create new experience
   */
  static async createExperience(experience: ExperienceInsert) {
    const { data, error } = await tables.experiences()
      .insert(experience)
      .select()
      .single()

    if (error) throw error
    return data as Experience
  }

  /**
   * Update experience
   */
  static async updateExperience(id: string, updates: ExperienceUpdate) {
    const { data, error } = await tables.experiences()
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Experience
  }

  /**
   * Delete experience
   */
  static async deleteExperience(id: string) {
    const { error } = await tables.experiences()
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }

  /**
   * Update sort order
   */
  static async updateSortOrder(id: string, sortOrder: number) {
    const { data, error } = await tables.experiences()
      .update({ sort_order: sortOrder })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Experience
  }

  /**
   * Get experiences by technology/skill
   */
  static async getExperiencesByTechnology(technology: string) {
    const { data, error } = await tables.experiences()
      .select('*')
      .contains('technologies', [technology])
      .order('start_date', { ascending: false })

    if (error) throw error
    return data as Experience[]
  }

  /**
   * Get all unique technologies from experiences
   */
  static async getAllTechnologies() {
    const { data, error } = await tables.experiences()
      .select('technologies')

    if (error) throw error

    // Extract and flatten all technologies
    const allTechnologies = data
      .flatMap(exp => (exp.technologies as string[]) || [])
      .filter((tech, index, arr) => arr.indexOf(tech) === index)
      .sort()

    return allTechnologies
  }

  /**
   * Calculate total years of experience
   */
  static async getTotalYearsOfExperience() {
    const experiences = await this.getAllExperiences()
    
    let totalMonths = 0
    
    experiences.forEach(exp => {
      const startDate = new Date(exp.start_date)
      const endDate = exp.end_date ? new Date(exp.end_date) : new Date()
      
      const diffTime = endDate.getTime() - startDate.getTime()
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)) // Average days per month
      
      totalMonths += diffMonths
    })
    
    return Math.round((totalMonths / 12) * 10) / 10 // Round to 1 decimal place
  }
} 