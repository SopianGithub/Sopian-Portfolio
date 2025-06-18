/**
 * Example usage of API services
 * This file demonstrates how to use the type-safe API services
 */

import { ProjectsAPI, BlogAPI, ExperiencesAPI, SkillsAPI } from './index'

// Example: Get published projects for homepage
export async function getHomepageData() {
  try {
    const [featuredProjects, featuredPosts, skills, experiences] = await Promise.all([
      ProjectsAPI.getFeaturedProjects(),
      BlogAPI.getFeaturedPosts(3),
      SkillsAPI.getTopSkills(8),
      ExperiencesAPI.getCurrentExperiences()
    ])

    return {
      featuredProjects,
      featuredPosts,
      skills,
      experiences
    }
  } catch (error) {
    console.error('Error fetching homepage data:', error)
    throw error
  }
}

// Example: Get project details page data
export async function getProjectPageData(slug: string) {
  try {
    const project = await ProjectsAPI.getProjectBySlug(slug)
    
    if (!project) {
      return null
    }

    // Get related projects based on technologies
    const allProjects = await ProjectsAPI.getPublishedProjects()
    const relatedProjects = allProjects
      .filter(p => p.id !== project.id)
      .slice(0, 3)

    return {
      project,
      relatedProjects
    }
  } catch (error) {
    console.error('Error fetching project data:', error)
    throw error
  }
}

// Example: Get blog post with related content
export async function getBlogPostData(slug: string) {
  try {
    const post = await BlogAPI.getPostBySlug(slug)
    
    if (!post) {
      return null
    }

    const [relatedPosts, allTags] = await Promise.all([
      BlogAPI.getRelatedPosts(post.id, post.tags as string[], 3),
      BlogAPI.getAllTags()
    ])

    return {
      post,
      relatedPosts,
      allTags
    }
  } catch (error) {
    console.error('Error fetching blog post data:', error)
    throw error
  }
}

// Example: Create new project (admin)
export async function createNewProject(projectData: {
  title: string
  slug: string
  description: string
  technologies: string[]
  github_url?: string
  demo_url?: string
}) {
  try {
    // Check if slug is available
    const isSlugAvailable = await ProjectsAPI.isSlugAvailable(projectData.slug)
    
    if (!isSlugAvailable) {
      throw new Error('Slug already exists')
    }

    const project = await ProjectsAPI.createProject({
      title: projectData.title,
      slug: projectData.slug,
      description: projectData.description,
      technologies: projectData.technologies,
      github_url: projectData.github_url,
      demo_url: projectData.demo_url,
      status: 'draft'
    })

    return project
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

// Example: Get skills grouped by category
export async function getSkillsData() {
  try {
    const [skillsByCategory, skillStats] = await Promise.all([
      SkillsAPI.getSkillsByCategory(),
      SkillsAPI.getSkillStatistics()
    ])

    return {
      skillsByCategory,
      skillStats
    }
  } catch (error) {
    console.error('Error fetching skills data:', error)
    throw error
  }
}

// Example: Search functionality
export async function searchContent(query: string) {
  try {
    const [projects, posts, skills] = await Promise.all([
      ProjectsAPI.getPublishedProjects(),
      BlogAPI.searchPosts(query),
      SkillsAPI.searchSkills(query)
    ])

    // Filter projects by title or description
    const filteredProjects = projects.filter(project =>
      project.title.toLowerCase().includes(query.toLowerCase()) ||
      project.description?.toLowerCase().includes(query.toLowerCase())
    )

    return {
      projects: filteredProjects,
      posts,
      skills
    }
  } catch (error) {
    console.error('Error searching content:', error)
    throw error
  }
}

// Example: Admin dashboard data
export async function getAdminDashboardData() {
  try {
    const [
      allProjects,
      allPosts,
      allExperiences,
      skillStats,
      totalYearsExp
    ] = await Promise.all([
      ProjectsAPI.getAllProjects(),
      BlogAPI.getAllPosts(),
      ExperiencesAPI.getAllExperiences(),
      SkillsAPI.getSkillStatistics(),
      ExperiencesAPI.getTotalYearsOfExperience()
    ])

    const stats = {
      projects: {
        total: allProjects.length,
        published: allProjects.filter(p => p.status === 'published').length,
        featured: allProjects.filter(p => p.featured).length
      },
      posts: {
        total: allPosts.length,
        published: allPosts.filter(p => p.status === 'published').length,
        featured: allPosts.filter(p => p.featured).length
      },
      experiences: allExperiences.length,
      skills: skillStats,
      totalYearsExp
    }

    return {
      stats,
      recentProjects: allProjects.slice(0, 5),
      recentPosts: allPosts.slice(0, 5)
    }
  } catch (error) {
    console.error('Error fetching admin dashboard data:', error)
    throw error
  }
} 