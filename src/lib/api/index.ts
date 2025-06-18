// Export all API services for easy importing
export { ProjectsAPI } from './projects'
export { BlogAPI } from './blog'
export { ExperiencesAPI } from './experiences'
export { SkillsAPI } from './skills'

// Export types for convenience
export type {
  Project,
  ProjectInsert,
  ProjectUpdate,
  BlogPost,
  BlogPostInsert,
  BlogPostUpdate,
  Experience,
  ExperienceInsert,
  ExperienceUpdate,
  Skill,
  SkillInsert,
  SkillUpdate,
  ContactMessage,
  ContactMessageInsert,
  ContactMessageUpdate,
  AdminUser,
  AdminUserInsert,
  AdminUserUpdate,
  SiteSetting,
  SiteSettingInsert,
  SiteSettingUpdate,
} from '@/types/database' 