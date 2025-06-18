import { tables } from '@/lib/supabase'
import type { Skill, SkillInsert, SkillUpdate } from '@/types/database'

export class SkillsAPI {
  /**
   * Get all skills ordered by category and sort order
   */
  static async getAllSkills() {
    const { data, error } = await tables.skills()
      .select('*')
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true })
      .order('level', { ascending: false })

    if (error) throw error
    return data as Skill[]
  }

  /**
   * Get skills grouped by category
   */
  static async getSkillsByCategory() {
    const skills = await this.getAllSkills()
    
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)

    return groupedSkills
  }

  /**
   * Get skills by specific category
   */
  static async getSkillsInCategory(category: string) {
    const { data, error } = await tables.skills()
      .select('*')
      .eq('category', category)
      .order('sort_order', { ascending: true })
      .order('level', { ascending: false })

    if (error) throw error
    return data as Skill[]
  }

  /**
   * Get top skills (highest level)
   */
  static async getTopSkills(limit = 10) {
    const { data, error } = await tables.skills()
      .select('*')
      .order('level', { ascending: false })
      .order('sort_order', { ascending: true })
      .limit(limit)

    if (error) throw error
    return data as Skill[]
  }

  /**
   * Get single skill by ID
   */
  static async getSkillById(id: string) {
    const { data, error } = await tables.skills()
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return data as Skill
  }

  /**
   * Get skill by name
   */
  static async getSkillByName(name: string) {
    const { data, error } = await tables.skills()
      .select('*')
      .eq('name', name)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return null
      }
      throw error
    }
    return data as Skill
  }

  /**
   * Create new skill
   */
  static async createSkill(skill: SkillInsert) {
    const { data, error } = await tables.skills()
      .insert(skill)
      .select()
      .single()

    if (error) throw error
    return data as Skill
  }

  /**
   * Update skill
   */
  static async updateSkill(id: string, updates: SkillUpdate) {
    const { data, error } = await tables.skills()
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Skill
  }

  /**
   * Delete skill
   */
  static async deleteSkill(id: string) {
    const { error } = await tables.skills()
      .delete()
      .eq('id', id)

    if (error) throw error
    return true
  }

  /**
   * Update skill level
   */
  static async updateSkillLevel(id: string, level: number) {
    if (level < 1 || level > 10) {
      throw new Error('Skill level must be between 1 and 10')
    }

    const { data, error } = await tables.skills()
      .update({ level })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Skill
  }

  /**
   * Update sort order
   */
  static async updateSortOrder(id: string, sortOrder: number) {
    const { data, error } = await tables.skills()
      .update({ sort_order: sortOrder })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data as Skill
  }

  /**
   * Get all unique categories
   */
  static async getAllCategories() {
    const { data, error } = await tables.skills()
      .select('category')

    if (error) throw error

    const uniqueCategories = Array.from(new Set(data.map(skill => skill.category)))
      .sort()

    return uniqueCategories
  }

  /**
   * Search skills by name
   */
  static async searchSkills(query: string) {
    const { data, error } = await tables.skills()
      .select('*')
      .ilike('name', `%${query}%`)
      .order('level', { ascending: false })
      .order('name', { ascending: true })

    if (error) throw error
    return data as Skill[]
  }

  /**
   * Check if skill name is available
   */
  static async isNameAvailable(name: string, excludeId?: string) {
    let query = tables.skills()
      .select('id')
      .eq('name', name)

    if (excludeId) {
      query = query.neq('id', excludeId)
    }

    const { data, error } = await query.limit(1)

    if (error) throw error
    return data.length === 0
  }

  /**
   * Bulk update sort orders
   */
  static async bulkUpdateSortOrders(updates: { id: string; sort_order: number }[]) {
    const promises = updates.map(({ id, sort_order }) =>
      this.updateSortOrder(id, sort_order)
    )

    const results = await Promise.all(promises)
    return results
  }

  /**
   * Get skill statistics
   */
  static async getSkillStatistics() {
    const skills = await this.getAllSkills()
    
    const stats = {
      total: skills.length,
      categories: Array.from(new Set(skills.map(s => s.category))).length,
      averageLevel: skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length,
      expertLevel: skills.filter(s => s.level >= 8).length,
      categoryStats: skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
          acc[skill.category] = { count: 0, averageLevel: 0 }
        }
        acc[skill.category].count++
        acc[skill.category].averageLevel += skill.level
        return acc
      }, {} as Record<string, { count: number; averageLevel: number }>)
    }

    // Calculate average levels for each category
    Object.keys(stats.categoryStats).forEach(category => {
      stats.categoryStats[category].averageLevel = 
        stats.categoryStats[category].averageLevel / stats.categoryStats[category].count
    })

    return stats
  }
} 