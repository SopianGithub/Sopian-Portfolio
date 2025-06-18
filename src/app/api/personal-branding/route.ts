import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    // Check if tables exist first
    const { error: tableError } = await supabase
      .from('personal_info')
      .select('count')
      .limit(1)

    // If tables don't exist, return helpful error
    if (tableError && tableError.code === '42P01') {
      return NextResponse.json({
        success: false,
        error: 'Database tables not set up yet. Please run the LinkedIn automation migration first.',
        needsMigration: true,
        migrationInstructions: 'Run the content from supabase/migrations/20240611000001_linkedin_automation.sql in your Supabase SQL Editor'
      }, { status: 424 }) // 424 Failed Dependency
    }

    // Fetch personal information
    const { data: personalInfo, error: personalError } = await supabase
      .from('personal_info')
      .select('*')
      .eq('id', 1)
      .single()

    if (personalError && personalError.code !== 'PGRST116') {
      throw personalError
    }

    // Fetch experience data (using existing 'experiences' table)
    const { data: experience, error: experienceError } = await supabase
      .from('experiences')
      .select('*')
      .order('sort_order', { ascending: true })

    if (experienceError) {
      throw experienceError
    }

    // Fetch skills data (using existing 'skills' table with level conversion)
    const { data: skillsRaw, error: skillsError } = await supabase
      .from('skills')
      .select('*')
      .order('level', { ascending: false })

    if (skillsError) {
      throw skillsError
    }

    // Transform skills to match our interface (convert 1-10 to 0-100 scale)
    const skills = skillsRaw?.map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      level: skill.level <= 1 ? 10 : skill.level >= 10 ? 100 : skill.level * 10, // Convert 1-10 to 0-100
      icon_url: skill.icon_url
    })) || []

    // Fetch projects data
    const { data: projects, error: projectsError } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .eq('status', 'published')
      .order('sort_order', { ascending: true })

    if (projectsError) {
      throw projectsError
    }

    // Fetch education data
    const { data: education, error: educationError } = await supabase
      .from('education')
      .select('*')
      .order('sort_order', { ascending: true })

    if (educationError) {
      throw educationError
    }

    // Fetch certifications data
    const { data: certifications, error: certificationsError } = await supabase
      .from('certifications')
      .select('*')
      .order('sort_order', { ascending: true })

    if (certificationsError) {
      throw certificationsError
    }

    // Transform experience data to match our interface
    const transformedExperience = experience?.map(exp => ({
      id: exp.id,
      title: exp.title || exp.position, // Fallback to position if title is null
      company: exp.company,
      location: exp.location,
      start_date: exp.start_date,
      end_date: exp.end_date,
      description: exp.description,
      technologies: Array.isArray(exp.technologies) ? exp.technologies : [],
      achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
      featured: exp.featured || false
    })) || []

    // Transform projects data
    const transformedProjects = projects?.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description || project.short_description,
      technologies: Array.isArray(project.technologies) ? project.technologies : [],
      demo_url: project.demo_url,
      github_url: project.github_url,
      featured: project.featured,
      status: project.status
    })) || []

    // Construct response
    const personalBranding = {
      personalInfo: personalInfo || {
        name: "Yayan Sopian",
        tagline: "Senior Full Stack Developer & AI Technology Specialist",
        summary: "Passionate Senior Full Stack Developer with 5+ years of pioneering experience in building scalable, mission-critical web applications.",
        location: "Jakarta, Indonesia",
        profile_image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
      },
      experience: transformedExperience,
      skills: skills,
      projects: transformedProjects,
      education: education || [],
      certifications: certifications || [],
      stats: {
        totalExperience: transformedExperience.length,
        totalSkills: skills.length,
        totalProjects: transformedProjects.length,
        totalCertifications: certifications?.length || 0
      }
    }

    return NextResponse.json({
      success: true,
      data: personalBranding
    })

  } catch (error) {
    console.error('Error fetching personal branding data:', error)
    
    // Handle specific database errors
    if (error && typeof error === 'object' && 'code' in error) {
      if (error.code === '42P01') {
        return NextResponse.json({
          success: false,
          error: 'Database tables not found. Please run the LinkedIn automation migration.',
          needsMigration: true,
          details: 'Tables need to be created using supabase/migrations/20240611000001_linkedin_automation.sql'
        }, { status: 424 })
      }
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch personal branding data'
    }, { status: 500 })
  }
}

// POST endpoint for auto-injecting LinkedIn data
export async function POST() {
  try {
    const { yayanLinkedInData, LinkedInDataTransformer, PortfolioDataInjector } = await import('@/lib/linkedin-scraper')
    
    // Transform LinkedIn data to portfolio format
    const portfolioData = LinkedInDataTransformer.transformToPortfolio(yayanLinkedInData)
    
    // Inject data into database
    const result = await PortfolioDataInjector.injectLinkedInData(portfolioData)
    
    if (!result.success) {
      throw new Error(result.error)
    }

    return NextResponse.json({
      success: true,
      message: 'LinkedIn data successfully injected into database',
      data: portfolioData
    })

  } catch (error) {
    console.error('Error injecting LinkedIn data:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to inject LinkedIn data'
    }, { status: 500 })
  }
} 