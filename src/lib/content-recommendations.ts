// Content Recommendation System - HR Recruiter Perspective
// This system analyzes professional profiles and provides strategic content recommendations

export interface Skill {
  name: string
  level: number
  category?: string
}

export interface Experience {
  title: string
  company: string
  startDate: string
  endDate?: string | null
  achievements?: string[]
  description?: string
}

export interface Project {
  title: string
  description: string
  technologies: string[]
  demo_url?: string
  github_url?: string
}

export interface Certification {
  name: string
  issuer: string
  date: string
  credentialUrl?: string
  skills?: string[]
}

export interface ProfileData {
  name?: string
  title?: string
  location?: string
  summary?: string
  skills?: Skill[]
  experience?: Experience[]
  projects?: Project[]
  certifications?: Certification[]
  testimonials?: string[]
  blog_posts?: string[]
  open_source?: string[]
  speaking_events?: string[]
}

export interface HRAnalysis {
  strengths: string[]
  opportunities: string[]
  marketPosition: string
  competitiveAdvantage: string[]
  improvementAreas: string[]
}

export interface ContentRecommendation {
  section: string
  priority: 'high' | 'medium' | 'low'
  title: string
  description: string
  rationale: string
  examples: string[]
  keywords: string[]
  impact: string
}

export interface PortfolioAudit {
  overallScore: number
  sections: {
    hero: number
    experience: number
    projects: number
    skills: number
    achievements: number
    testimonials: number
  }
  recommendations: ContentRecommendation[]
  missingElements: string[]
  hrPerspective: HRAnalysis
}

export class ContentRecommendationEngine {
  
  // Primary Content Analysis
  static analyzeProfile(profileData: ProfileData): PortfolioAudit {
    const hrAnalysis = this.performHRAnalysis(profileData)
    const sectionScores = this.evaluateSections(profileData)
    const recommendations = this.generateRecommendations(profileData, hrAnalysis)
    const missingElements = this.identifyMissingElements(profileData)
    
    return {
      overallScore: this.calculateOverallScore(sectionScores),
      sections: sectionScores,
      recommendations,
      missingElements,
      hrPerspective: hrAnalysis
    }
  }
  
  // HR Analysis from Recruiter Perspective
  private static performHRAnalysis(profile: ProfileData): HRAnalysis {
    return {
      strengths: this.identifyStrengths(profile),
      opportunities: this.identifyOpportunities(profile),
      marketPosition: this.assessMarketPosition(profile),
      competitiveAdvantage: this.findCompetitiveAdvantage(profile),
      improvementAreas: this.suggestImprovements(profile)
    }
  }
  
  private static identifyStrengths(profile: ProfileData): string[] {
    const strengths: string[] = []
    
    // Technical Expertise Analysis
    if (profile.skills?.some((skill: Skill) => skill.level > 85)) {
      strengths.push("🚀 Deep Technical Expertise - Multiple advanced skills demonstrate mastery")
    }
    
    // Experience Depth
    if (profile.experience?.length && profile.experience.length >= 3) {
      strengths.push("⭐ Proven Track Record - Consistent career progression shows reliability")
    }
    
    // Leadership Indicators
    if (profile.experience?.some((exp: Experience) => 
      exp.title.toLowerCase().includes('senior') || 
      exp.title.toLowerCase().includes('lead') ||
      (exp.achievements && exp.achievements.length > 0)
    )) {
      strengths.push("👥 Leadership Potential - Senior roles and achievements indicate growth mindset")
    }
    
    // Full-Stack Capability
    const frontendSkills = profile.skills?.filter((skill: Skill) => 
      ['react', 'vue', 'angular', 'javascript', 'typescript'].includes(skill.name.toLowerCase())
    )
    const backendSkills = profile.skills?.filter((skill: Skill) => 
      ['node', 'python', 'java', 'php', 'laravel'].includes(skill.name.toLowerCase())
    )
    
    if (frontendSkills && frontendSkills.length >= 2 && backendSkills && backendSkills.length >= 2) {
      strengths.push("🔧 Full-Stack Versatility - Complete development capability across tech stack")
    }
    
    // Modern Tech Stack
    const modernTech = profile.skills?.filter((skill: Skill) => 
      ['react', 'typescript', 'docker', 'aws', 'kubernetes', 'microservices'].includes(skill.name.toLowerCase())
    )
    
    if (modernTech && modernTech.length >= 3) {
      strengths.push("⚡ Modern Technology Adoption - Stays current with industry trends")
    }
    
    return strengths
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static identifyOpportunities(profile: ProfileData): string[] {
    const opportunities: string[] = []
    
    // Market Demand Analysis
    opportunities.push("📈 High Market Demand - Full-stack developers are in top 3 most sought-after roles")
    opportunities.push("🌍 Remote Work Ready - Skills align perfectly with distributed team environments")
    opportunities.push("🚀 AI/ML Integration - Growing demand for developers with AI integration experience")
    opportunities.push("💰 Salary Growth Potential - Senior full-stack roles command 20-40% premium")
    opportunities.push("🏢 Enterprise Opportunities - Technical depth suitable for complex enterprise projects")
    
    return opportunities
  }
  
  private static assessMarketPosition(profile: ProfileData): string {
    const yearsExp = this.calculateExperienceYears(profile.experience || [])
    const skillLevel = this.calculateAverageSkillLevel(profile.skills || [])
    
    if (yearsExp >= 5 && skillLevel >= 80) {
      return "🎯 SENIOR DEVELOPER - Top 15% of candidates. Target: Tech Lead, Senior Engineer roles at scale-ups and enterprises. Salary range: $80K-$120K+"
    } else if (yearsExp >= 3 && skillLevel >= 70) {
      return "🚀 MID-LEVEL DEVELOPER - Top 30% of candidates. Target: Senior Developer roles at growth companies. Salary range: $60K-$90K"
    } else {
      return "⚡ GROWING DEVELOPER - Strong foundation. Target: Developer roles at startups and mid-size companies. Salary range: $45K-$70K"
    }
  }
  
  private static findCompetitiveAdvantage(profile: ProfileData): string[] {
    const advantages: string[] = []
    
    // Technical Differentiation
    if (profile.skills?.some((skill: Skill) => skill.name.toLowerCase().includes('ai'))) {
      advantages.push("🤖 AI Integration Expertise - Only 15% of developers have practical AI experience")
    }
    
    // Cloud & DevOps
    if (profile.skills?.some((skill: Skill) => 
      ['aws', 'docker', 'kubernetes', 'devops'].includes(skill.name.toLowerCase())
    )) {
      advantages.push("☁️ Cloud-Native Development - High-demand skill combination")
    }
    
    // Full-Stack + Modern Framework
    advantages.push("⚡ React + Node.js Specialist - Most requested skill combination in job market")
    
    // Problem-Solving Focus
    advantages.push("🧠 Solution-Oriented Mindset - Demonstrated ability to deliver business impact")
    
    return advantages
  }
  
  private static suggestImprovements(profile: ProfileData): string[] {
    const improvements: string[] = []
    
    // Portfolio Gaps
    if (!profile.projects || profile.projects.length < 3) {
      improvements.push("📂 Project Portfolio - Showcase 3-5 diverse projects with live demos")
    }
    
    // Quantified Achievements
    if (!profile.experience?.some((exp: Experience) => exp.achievements && exp.achievements.length > 0)) {
      improvements.push("📊 Quantified Results - Add specific metrics and business impact numbers")
    }
    
    // Certifications
    if (!profile.certifications || profile.certifications.length < 2) {
      improvements.push("🏆 Industry Certifications - AWS, React, or relevant tech certifications")
    }
    
    // Open Source
    improvements.push("🌟 Open Source Contributions - Demonstrate community involvement and code quality")
    
    // Technical Writing
    improvements.push("✍️ Technical Blog - Share expertise through articles and tutorials")
    
    return improvements
  }
  
  // Content Recommendations Generator
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static generateRecommendations(profile: ProfileData, hrAnalysis: HRAnalysis): ContentRecommendation[] {
    const recommendations: ContentRecommendation[] = []
    
    // Hero Section Optimization
    recommendations.push({
      section: "Hero Section",
      priority: "high",
      title: "Craft a Compelling Professional Headline",
      description: "Create a headline that immediately communicates your value proposition and key expertise",
      rationale: "Recruiters spend 6-10 seconds on initial profile scan. Strong headline determines if they continue reading.",
      examples: [
        "Senior Full-Stack Developer | React + Node.js Specialist | Building Scalable Web Applications",
        "Frontend Team Lead | 5+ Years Transforming Ideas into User-Centric Digital Experiences",
        "Full-Stack Engineer | AI Integration Expert | Driving Business Growth Through Technology"
      ],
      keywords: ["Senior", "Full-Stack", "React", "Node.js", "Team Lead", "AI Integration"],
      impact: "Increases profile view time by 40% and recruiter engagement by 60%"
    })
    
    // Experience Section Enhancement
    recommendations.push({
      section: "Experience",
      priority: "high",
      title: "Quantify Your Professional Impact",
      description: "Transform job descriptions into achievement-focused narratives with specific metrics",
      rationale: "HR managers need concrete evidence of your business impact. Numbers build credibility and demonstrate ROI.",
      examples: [
        "Increased application performance by 45% through React optimization, reducing bounce rate from 25% to 14%",
        "Led a team of 4 developers to deliver 3 major features ahead of schedule, resulting in $2M additional revenue",
        "Implemented automated testing pipeline, reducing deployment time from 4 hours to 30 minutes"
      ],
      keywords: ["increased", "reduced", "led", "implemented", "achieved", "delivered"],
      impact: "Profiles with quantified achievements receive 3x more interview invitations"
    })
    
    // Projects Showcase
    if (!profile.projects || profile.projects.length < 3) {
      recommendations.push({
        section: "Projects",
        priority: "high",
        title: "Build a Compelling Project Portfolio",
        description: "Showcase 3-5 diverse projects that demonstrate your technical range and problem-solving ability",
        rationale: "Projects are the #1 factor technical recruiters evaluate. They prove you can deliver complete solutions.",
        examples: [
          "E-commerce Platform - Full-stack application with payment integration and admin dashboard",
          "Real-time Chat Application - WebSocket implementation with user authentication and message history",
          "Data Visualization Dashboard - React-based analytics platform with interactive charts"
        ],
        keywords: ["full-stack", "real-time", "payment integration", "authentication", "analytics"],
        impact: "Candidates with 3+ projects have 4x higher chance of passing technical screening"
      })
    }
    
    // Skills Section Optimization
    recommendations.push({
      section: "Skills",
      priority: "medium",
      title: "Organize Skills by Business Value",
      description: "Group technical skills into categories and highlight proficiency levels with context",
      rationale: "Recruiters scan skills for specific requirements. Clear organization helps them quickly assess fit.",
      examples: [
        "Frontend: React (Expert), TypeScript (Advanced), CSS/SCSS (Advanced)",
        "Backend: Node.js (Expert), Python (Intermediate), PostgreSQL (Advanced)",
        "DevOps: Docker (Advanced), AWS (Intermediate), CI/CD (Advanced)"
      ],
      keywords: ["Expert", "Advanced", "Intermediate", "Frontend", "Backend", "DevOps"],
      impact: "Well-organized skills sections increase recruiter confidence by 35%"
    })
    
    // Testimonials & Social Proof
    if (!profile.testimonials || profile.testimonials.length === 0) {
      recommendations.push({
        section: "Testimonials",
        priority: "medium",
        title: "Add Client and Colleague Testimonials",
        description: "Include 2-3 strong testimonials that validate your technical skills and work ethic",
        rationale: "Social proof reduces hiring risk. Testimonials from previous clients/managers build trust.",
        examples: [
          "Working with [Name] was exceptional. They delivered our e-commerce platform 2 weeks ahead of schedule.",
          "[Name] is a problem-solver who consistently finds creative solutions to complex technical challenges.",
          "Their attention to detail and ability to explain technical concepts to non-technical stakeholders is remarkable."
        ],
        keywords: ["exceptional", "ahead of schedule", "problem-solver", "creative solutions", "attention to detail"],
        impact: "Profiles with testimonials have 50% higher conversion from view to interview"
      })
    }
    
    return recommendations
  }
  
  // Section Evaluation Methods
  private static evaluateSections(profile: ProfileData) {
    return {
      hero: this.evaluateHeroSection(profile),
      experience: this.evaluateExperienceSection(profile),
      projects: this.evaluateProjectsSection(profile),
      skills: this.evaluateSkillsSection(profile),
      achievements: this.evaluateAchievementsSection(profile),
      testimonials: this.evaluateTestimonialsSection(profile)
    }
  }
  
  private static evaluateHeroSection(profile: ProfileData): number {
    let score = 0
    
    if (profile.name) score += 20
    if (profile.title) score += 25
    if (profile.summary && profile.summary.length > 50) score += 30
    if (profile.location) score += 15
    if (profile.summary && profile.summary.includes('years')) score += 10
    
    return Math.min(score, 100)
  }
  
  private static evaluateExperienceSection(profile: ProfileData): number {
    if (!profile.experience || profile.experience.length === 0) return 0
    
    let score = 0
    const experiences = profile.experience
    
    // Experience quantity
    if (experiences.length >= 3) score += 25
    else if (experiences.length >= 2) score += 15
    else score += 5
    
    // Experience quality
    const hasAchievements = experiences.some(exp => exp.achievements && exp.achievements.length > 0)
    if (hasAchievements) score += 30
    
    const hasDetailedDescriptions = experiences.some(exp => exp.description && exp.description.length > 100)
    if (hasDetailedDescriptions) score += 20
    
    const hasSeniorRoles = experiences.some(exp => 
      exp.title.toLowerCase().includes('senior') || 
      exp.title.toLowerCase().includes('lead')
    )
    if (hasSeniorRoles) score += 15
    
    const hasRecentExperience = experiences.some(exp => {
      const endDate = exp.endDate ? new Date(exp.endDate) : new Date()
      const yearsDiff = (new Date().getFullYear() - endDate.getFullYear())
      return yearsDiff <= 2
    })
    if (hasRecentExperience) score += 10
    
    return Math.min(score, 100)
  }
  
  private static evaluateProjectsSection(profile: ProfileData): number {
    if (!profile.projects || profile.projects.length === 0) return 0
    
    let score = 0
    const projects = profile.projects
    
    // Project quantity
    if (projects.length >= 5) score += 30
    else if (projects.length >= 3) score += 20
    else if (projects.length >= 2) score += 10
    else score += 5
    
    // Project quality
    const hasLiveDemo = projects.some(project => project.demo_url)
    if (hasLiveDemo) score += 25
    
    const hasSourceCode = projects.some(project => project.github_url)
    if (hasSourceCode) score += 20
    
    const hasDiverseTech = projects.some(project => project.technologies.length >= 3)
    if (hasDiverseTech) score += 15
    
    const hasDetailedDescriptions = projects.some(project => project.description.length > 100)
    if (hasDetailedDescriptions) score += 10
    
    return Math.min(score, 100)
  }
  
  private static evaluateSkillsSection(profile: ProfileData): number {
    if (!profile.skills || profile.skills.length === 0) return 0
    
    let score = 0
    const skills = profile.skills
    
    // Skill quantity
    if (skills.length >= 10) score += 20
    else if (skills.length >= 7) score += 15
    else if (skills.length >= 5) score += 10
    else score += 5
    
    // Skill proficiency
    const hasExpertSkills = skills.some(skill => skill.level >= 85)
    if (hasExpertSkills) score += 25
    
    const hasAdvancedSkills = skills.some(skill => skill.level >= 70)
    if (hasAdvancedSkills) score += 20
    
    const averageLevel = this.calculateAverageSkillLevel(skills)
    if (averageLevel >= 75) score += 15
    else if (averageLevel >= 60) score += 10
    else score += 5
    
    // Skill diversity
    const categories = new Set(skills.map(skill => skill.category).filter(Boolean))
    if (categories.size >= 3) score += 15
    else if (categories.size >= 2) score += 10
    else score += 5
    
    return Math.min(score, 100)
  }
  
  private static evaluateAchievementsSection(profile: ProfileData): number {
    let score = 0
    
    // Experience achievements
    const experienceAchievements = profile.experience?.reduce((total, exp) => {
      return total + (exp.achievements?.length || 0)
    }, 0) || 0
    
    if (experienceAchievements >= 5) score += 30
    else if (experienceAchievements >= 3) score += 20
    else if (experienceAchievements >= 1) score += 10
    
    // Certifications
    if (profile.certifications && profile.certifications.length >= 3) score += 25
    else if (profile.certifications && profile.certifications.length >= 2) score += 15
    else if (profile.certifications && profile.certifications.length >= 1) score += 10
    
    // Additional achievements
    if (profile.speaking_events && profile.speaking_events.length > 0) score += 15
    if (profile.open_source && profile.open_source.length > 0) score += 15
    if (profile.blog_posts && profile.blog_posts.length > 0) score += 15
    
    return Math.min(score, 100)
  }
  
  private static evaluateTestimonialsSection(profile: ProfileData): number {
    if (!profile.testimonials || profile.testimonials.length === 0) return 0
    
    let score = 0
    
    if (profile.testimonials.length >= 3) score += 60
    else if (profile.testimonials.length >= 2) score += 40
    else score += 20
    
    // Quality indicators (assuming testimonials are strings)
    const hasDetailedTestimonials = profile.testimonials.some(testimonial => testimonial.length > 100)
    if (hasDetailedTestimonials) score += 40
    
    return Math.min(score, 100)
  }
  
  private static calculateOverallScore(sections: Record<string, number>): number {
    const weights = {
      hero: 0.15,
      experience: 0.25,
      projects: 0.25,
      skills: 0.15,
      achievements: 0.10,
      testimonials: 0.10
    }
    
    return Math.round(
      Object.entries(sections).reduce((total, [section, score]) => {
        return total + (score as number) * (weights[section as keyof typeof weights] || 0)
      }, 0)
    )
  }
  
  private static identifyMissingElements(profile: ProfileData): string[] {
    const missing: string[] = []
    
    if (!profile.projects || profile.projects.length < 3) {
      missing.push("Project Portfolio - Need 3-5 showcase projects")
    }
    
    if (!profile.certifications || profile.certifications.length === 0) {
      missing.push("Professional Certifications - Industry validations")
    }
    
    if (!profile.testimonials) {
      missing.push("Client/Colleague Testimonials - Social proof")
    }
    
    if (!profile.blog_posts) {
      missing.push("Technical Blog/Articles - Thought leadership")
    }
    
    if (!profile.open_source) {
      missing.push("Open Source Contributions - Community involvement")
    }
    
    if (!profile.speaking_events) {
      missing.push("Conference/Meetup Speaking - Industry presence")
    }
    
    return missing
  }
  
  private static calculateExperienceYears(experiences: Experience[]): number {
    let totalMonths = 0
    experiences.forEach(exp => {
      const start = new Date(exp.startDate)
      const end = exp.endDate ? new Date(exp.endDate) : new Date()
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      totalMonths += months
    })
    return Math.round(totalMonths / 12)
  }
  
  private static calculateAverageSkillLevel(skills: Skill[]): number {
    if (skills.length === 0) return 0
    const totalLevel = skills.reduce((sum, skill) => sum + (skill.level || 50), 0)
    return Math.round(totalLevel / skills.length)
  }
}

// HR Recruiter Insights Generator
export class HRInsightsGenerator {
  
  static generateHiringRecommendation(profile: ProfileData): {
    recommendation: 'hire' | 'interview' | 'reject'
    confidence: number
    reasoning: string[]
    interviewFocus: string[]
    salaryRange: string
    roleMatch: string[]
  } {
    const audit = ContentRecommendationEngine.analyzeProfile(profile)
    
    let recommendation: 'hire' | 'interview' | 'reject'
    let confidence: number
    
    if (audit.overallScore >= 80) {
      recommendation = 'hire'
      confidence = 90
    } else if (audit.overallScore >= 60) {
      recommendation = 'interview'
      confidence = 75
    } else {
      recommendation = 'interview'
      confidence = 50
    }
    
    return {
      recommendation,
      confidence,
      reasoning: audit.hrPerspective.strengths,
      interviewFocus: this.generateInterviewFocus(profile),
      salaryRange: this.estimateSalaryRange(profile),
      roleMatch: this.suggestRoleMatches(profile)
    }
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static generateInterviewFocus(profile: ProfileData): string[] {
    return [
      "System Architecture & Scalability Design",
      "Problem-Solving Approach & Code Quality",
      "Team Collaboration & Leadership Experience",
      "Business Impact & Quantified Results",
      "Modern Development Practices & CI/CD",
      "Performance Optimization & Security Awareness"
    ]
  }
  
  private static estimateSalaryRange(profile: ProfileData): string {
    const years = ContentRecommendationEngine['calculateExperienceYears'](profile.experience || [])
    const skillLevel = ContentRecommendationEngine['calculateAverageSkillLevel'](profile.skills || [])
    
    if (years >= 5 && skillLevel >= 80) {
      return "$90K - $130K (Senior Level)"
    } else if (years >= 3 && skillLevel >= 70) {
      return "$70K - $95K (Mid-Level)"
    } else {
      return "$50K - $75K (Junior-Mid Level)"
    }
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static suggestRoleMatches(profile: ProfileData): string[] {
    const roles = [
      "Senior Full-Stack Developer",
      "Frontend Team Lead",
      "Software Engineer III",
      "Technical Architect",
      "Product Engineer"
    ]
    
    return roles
  }
}

// Content Templates Generator
export class ContentTemplatesGenerator {
  
  static generateHeroSection(profile: ProfileData): string {
    const years = ContentRecommendationEngine['calculateExperienceYears'](profile.experience || [])
    const primarySkills = profile.skills?.slice(0, 3).map((skill: Skill) => skill.name).join(', ') || "Modern Web Technologies"
    
    return `
🚀 **${profile.name || "Professional Developer"}**

**${profile.title || "Full-Stack Developer"} | ${years}+ Years Building Scalable Solutions**

${profile.location || "Jakarta, Indonesia"} • Available for Remote & Hybrid Opportunities

${profile.summary || `Passionate developer specializing in ${primarySkills}. I transform complex business requirements into elegant, performant web applications that drive user engagement and business growth.`}

**Core Expertise:** ${primarySkills}
**Impact Focus:** Performance Optimization • User Experience • Business Value
**Philosophy:** Clean Code • Scalable Architecture • Continuous Learning

Ready to contribute to your next breakthrough project.
    `.trim()
  }
  
  static generateProjectDescriptions(projects: Project[]): string[] {
    return projects.map(project => `
**${project.title}**
🚀 ${project.description}

**Business Impact:**
• Achieved [specific metric] improvement in [business area]
• Reduced [cost/time] by [percentage/amount]
• Enabled [new capability/feature] for [user count] users

**Technical Highlights:**
• Implemented ${project.technologies.slice(0, 3).join(', ')}
• Optimized performance to handle [scale metric]
• Integrated with [external services/APIs]

**Key Achievements:**
• [Quantified achievement #1]
• [Quantified achievement #2]
• [Recognition/adoption metric]

🔗 [Live Demo](${project.demo_url || '#'}) | 📂 [Source Code](${project.github_url || '#'})
    `.trim())
  }
  
  static generateSkillsNarrative(skills: Skill[]): string {
    const categories = skills.reduce((acc, skill) => {
      const category = skill.category || 'other'
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    }, {} as Record<string, Skill[]>)
    
    let narrative = "## 🛠️ **Technical Arsenal**\n\n"
    
    Object.entries(categories).forEach(([category, categorySkills]) => {
      const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
      narrative += `**${categoryName}:**\n`
      
      categorySkills.forEach(skill => {
        const level = skill.level >= 85 ? "Expert" : skill.level >= 70 ? "Advanced" : "Proficient"
        narrative += `• ${skill.name} (${level}) - ${skill.level}% proficiency\n`
      })
      
      narrative += "\n"
    })
    
    return narrative
  }
} 