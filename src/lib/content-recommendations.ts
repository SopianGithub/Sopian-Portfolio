// Content Recommendation System - HR Recruiter Perspective
// This system analyzes professional profiles and provides strategic content recommendations

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
  static analyzeProfile(profileData: any): PortfolioAudit {
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
  private static performHRAnalysis(profile: any): HRAnalysis {
    return {
      strengths: this.identifyStrengths(profile),
      opportunities: this.identifyOpportunities(profile),
      marketPosition: this.assessMarketPosition(profile),
      competitiveAdvantage: this.findCompetitiveAdvantage(profile),
      improvementAreas: this.suggestImprovements(profile)
    }
  }
  
  private static identifyStrengths(profile: any): string[] {
    const strengths: string[] = []
    
    // Technical Expertise Analysis
    if (profile.skills?.some((skill: any) => skill.level > 85)) {
      strengths.push("🚀 Deep Technical Expertise - Multiple advanced skills demonstrate mastery")
    }
    
    // Experience Depth
    if (profile.experience?.length >= 3) {
      strengths.push("⭐ Proven Track Record - Consistent career progression shows reliability")
    }
    
    // Leadership Indicators
    if (profile.experience?.some((exp: any) => 
      exp.title.toLowerCase().includes('senior') || 
      exp.title.toLowerCase().includes('lead') ||
      exp.achievements?.length > 0
    )) {
      strengths.push("👥 Leadership Potential - Senior roles and achievements indicate growth mindset")
    }
    
    // Full-Stack Capability
    const frontendSkills = profile.skills?.filter((skill: any) => 
      ['react', 'vue', 'angular', 'javascript', 'typescript'].includes(skill.name.toLowerCase())
    )
    const backendSkills = profile.skills?.filter((skill: any) => 
      ['node', 'python', 'java', 'php', 'laravel'].includes(skill.name.toLowerCase())
    )
    
    if (frontendSkills?.length >= 2 && backendSkills?.length >= 2) {
      strengths.push("🔧 Full-Stack Versatility - Complete development capability across tech stack")
    }
    
    // Modern Tech Stack
    const modernTech = profile.skills?.filter((skill: any) => 
      ['react', 'typescript', 'docker', 'aws', 'kubernetes', 'microservices'].includes(skill.name.toLowerCase())
    )
    
    if (modernTech?.length >= 3) {
      strengths.push("⚡ Modern Technology Adoption - Stays current with industry trends")
    }
    
    return strengths
  }
  
  private static identifyOpportunities(profile: any): string[] {
    const opportunities: string[] = []
    
    // Market Demand Analysis
    opportunities.push("📈 High Market Demand - Full-stack developers are in top 3 most sought-after roles")
    opportunities.push("🌍 Remote Work Ready - Skills align perfectly with distributed team environments")
    opportunities.push("🚀 AI/ML Integration - Growing demand for developers with AI integration experience")
    opportunities.push("💰 Salary Growth Potential - Senior full-stack roles command 20-40% premium")
    opportunities.push("🏢 Enterprise Opportunities - Technical depth suitable for complex enterprise projects")
    
    return opportunities
  }
  
  private static assessMarketPosition(profile: any): string {
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
  
  private static findCompetitiveAdvantage(profile: any): string[] {
    const advantages: string[] = []
    
    // Technical Differentiation
    if (profile.skills?.some((skill: any) => skill.name.toLowerCase().includes('ai'))) {
      advantages.push("🤖 AI Integration Expertise - Only 15% of developers have practical AI experience")
    }
    
    // Cloud & DevOps
    if (profile.skills?.some((skill: any) => 
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
  
  private static suggestImprovements(profile: any): string[] {
    const improvements: string[] = []
    
    // Portfolio Gaps
    if (!profile.projects || profile.projects.length < 3) {
      improvements.push("📂 Project Portfolio - Showcase 3-5 diverse projects with live demos")
    }
    
    // Quantified Achievements
    if (!profile.experience?.some((exp: any) => exp.achievements?.length > 0)) {
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
  private static generateRecommendations(profile: any, hrAnalysis: HRAnalysis): ContentRecommendation[] {
    const recommendations: ContentRecommendation[] = []
    
    // Hero Section Optimization
    recommendations.push({
      section: "Hero Section",
      priority: "high",
      title: "Craft a Compelling Professional Headline",
      description: "Create a headline that immediately communicates your value proposition and key expertise",
      rationale: "Recruiters spend 6-10 seconds on initial profile scan. Strong headline determines if they continue reading.",
      examples: [
        "Senior Full-Stack Developer | React & Node.js Expert | AI Integration Specialist",
        "Full-Stack Engineer | 5+ Years Building Scalable Web Applications | Python & JavaScript",
        "Senior Developer | Enterprise Solutions Architect | Cloud-Native Development Leader"
      ],
      keywords: ["Senior", "Full-Stack", "Expert", "Specialist", "Years", "Scalable", "Enterprise"],
      impact: "400% increase in profile engagement and recruiter inquiries"
    })
    
    // Experience Section
    recommendations.push({
      section: "Professional Experience",
      priority: "high",
      title: "Quantify Your Impact with Metrics",
      description: "Transform job descriptions into achievement-focused narratives with specific numbers",
      rationale: "HR managers look for candidates who understand business impact, not just technical tasks.",
      examples: [
        "Architected microservices infrastructure serving 100K+ users with 99.9% uptime",
        "Reduced deployment time by 75% through CI/CD automation, enabling 3x faster feature delivery",
        "Led team of 4 developers to deliver $2M+ revenue-generating platform ahead of schedule"
      ],
      keywords: ["increased", "reduced", "improved", "delivered", "achieved", "optimized", "scaled"],
      impact: "3x higher interview callback rate with quantified achievements"
    })
    
    // Projects Showcase
    recommendations.push({
      section: "Project Portfolio",
      priority: "high",
      title: "Showcase Business-Impact Projects",
      description: "Highlight projects that solve real business problems with measurable outcomes",
      rationale: "Recruiters want to see how your technical skills translate to business value.",
      examples: [
        "E-commerce Platform - Increased conversion rates by 40% through optimized checkout flow",
        "Real-time Analytics Dashboard - Reduced reporting time from hours to seconds for 500+ users",
        "AI-Powered Content System - Automated 80% of content workflows, saving 20+ hours/week"
      ],
      keywords: ["increased", "reduced", "automated", "optimized", "streamlined", "enhanced"],
      impact: "Higher project relevance score and technical interview success rate"
    })
    
    // Skills Presentation
    recommendations.push({
      section: "Technical Skills",
      priority: "medium",
      title: "Strategic Skill Categorization",
      description: "Group skills by relevance to target roles and include proficiency indicators",
      rationale: "Organized skill presentation helps recruiters quickly assess technical fit.",
      examples: [
        "Frontend Mastery: React (Advanced), TypeScript (Advanced), Next.js (Intermediate)",
        "Backend Excellence: Node.js (Expert), Python (Advanced), PostgreSQL (Advanced)",
        "Cloud & DevOps: AWS (Intermediate), Docker (Advanced), Kubernetes (Learning)"
      ],
      keywords: ["Expert", "Advanced", "Proficient", "Intermediate", "Learning"],
      impact: "Better ATS parsing and recruiter skill matching"
    })
    
    // Social Proof
    recommendations.push({
      section: "Credibility Indicators",
      priority: "high",
      title: "Add Social Proof Elements",
      description: "Include testimonials, recommendations, and third-party validations",
      rationale: "Social proof reduces hiring risk and increases trust in your capabilities.",
      examples: [
        "Client testimonials with specific project outcomes",
        "LinkedIn recommendations from managers and colleagues",
        "GitHub contributions showing consistent code quality",
        "Industry certifications from recognized authorities"
      ],
      keywords: ["testimonial", "recommendation", "certified", "endorsed", "validated"],
      impact: "60% increase in recruiter confidence and interview conversion"
    })
    
    // Call-to-Action Optimization
    recommendations.push({
      section: "Contact & CTA",
      priority: "medium",
      title: "Clear Next Steps for Recruiters",
      description: "Make it effortless for recruiters to take the next step in the hiring process",
      rationale: "Remove friction from the recruiter's workflow to increase response rates.",
      examples: [
        "Schedule a 15-minute technical discussion",
        "Download my detailed technical portfolio",
        "View my live project demonstrations",
        "Connect for immediate availability updates"
      ],
      keywords: ["schedule", "download", "view", "connect", "available", "discuss"],
      impact: "2x higher response rate from qualified opportunities"
    })
    
    return recommendations
  }
  
  // Section Evaluation
  private static evaluateSections(profile: any) {
    return {
      hero: this.evaluateHeroSection(profile),
      experience: this.evaluateExperienceSection(profile),
      projects: this.evaluateProjectsSection(profile),
      skills: this.evaluateSkillsSection(profile),
      achievements: this.evaluateAchievementsSection(profile),
      testimonials: this.evaluateTestimonialsSection(profile)
    }
  }
  
  private static evaluateHeroSection(profile: any): number {
    let score = 50 // Base score
    
    if (profile.name) score += 10
    if (profile.title && profile.title.length > 10) score += 15
    if (profile.summary && profile.summary.length > 100) score += 15
    if (profile.location) score += 5
    if (profile.profileImage) score += 5
    
    return Math.min(score, 100)
  }
  
  private static evaluateExperienceSection(profile: any): number {
    let score = 20 // Base score
    
    const experiences = profile.experience || []
    
    if (experiences.length >= 2) score += 20
    if (experiences.length >= 4) score += 10
    
    const hasQuantifiedAchievements = experiences.some((exp: any) => 
      exp.achievements?.length > 0 || 
      exp.description?.match(/\d+%|\d+x|\d+\s*(users|projects|revenue)/i)
    )
    
    if (hasQuantifiedAchievements) score += 25
    
    const hasRecentExperience = experiences.some((exp: any) => 
      !exp.endDate || new Date(exp.endDate) > new Date(Date.now() - 365*24*60*60*1000)
    )
    
    if (hasRecentExperience) score += 15
    
    const hasSeniorRoles = experiences.some((exp: any) => 
      exp.title?.toLowerCase().includes('senior') || 
      exp.title?.toLowerCase().includes('lead')
    )
    
    if (hasSeniorRoles) score += 10
    
    return Math.min(score, 100)
  }
  
  private static evaluateProjectsSection(profile: any): number {
    let score = 10 // Base score
    
    const projects = profile.projects || []
    
    if (projects.length >= 3) score += 30
    if (projects.length >= 5) score += 10
    
    const hasLiveDemos = projects.some((proj: any) => proj.demo_url)
    if (hasLiveDemos) score += 20
    
    const hasGithubLinks = projects.some((proj: any) => proj.github_url)
    if (hasGithubLinks) score += 15
    
    const hasBusinessImpact = projects.some((proj: any) => 
      proj.description?.match(/increased|reduced|improved|automated|optimized/i)
    )
    if (hasBusinessImpact) score += 15
    
    return Math.min(score, 100)
  }
  
  private static evaluateSkillsSection(profile: any): number {
    let score = 20 // Base score
    
    const skills = profile.skills || []
    
    if (skills.length >= 8) score += 20
    if (skills.length >= 12) score += 10
    
    const hasAdvancedSkills = skills.some((skill: any) => skill.level >= 80)
    if (hasAdvancedSkills) score += 25
    
    const hasModernTech = skills.some((skill: any) => 
      ['react', 'typescript', 'docker', 'aws', 'kubernetes'].includes(skill.name.toLowerCase())
    )
    if (hasModernTech) score += 15
    
    const hasSkillIcons = skills.some((skill: any) => skill.icon_url)
    if (hasSkillIcons) score += 10
    
    return Math.min(score, 100)
  }
  
  private static evaluateAchievementsSection(profile: any): number {
    let score = 0
    
    const certifications = profile.certifications || []
    if (certifications.length >= 2) score += 40
    if (certifications.length >= 4) score += 20
    
    const hasRecentCertifications = certifications.some((cert: any) => 
      new Date(cert.date) > new Date(Date.now() - 2*365*24*60*60*1000)
    )
    if (hasRecentCertifications) score += 20
    
    const hasIndustryRecognition = certifications.some((cert: any) => 
      ['aws', 'google', 'microsoft', 'meta', 'oracle'].some(company => 
        cert.issuer?.toLowerCase().includes(company)
      )
    )
    if (hasIndustryRecognition) score += 20
    
    return Math.min(score, 100)
  }
  
  private static evaluateTestimonialsSection(profile: any): number {
    // Placeholder for testimonials evaluation
    return 0 // Typically missing in most portfolios
  }
  
  // Utility Methods
  private static calculateOverallScore(sections: any): number {
    const weights = {
      hero: 0.2,
      experience: 0.25,
      projects: 0.25,
      skills: 0.15,
      achievements: 0.1,
      testimonials: 0.05
    }
    
    return Math.round(
      Object.entries(sections).reduce((total, [section, score]) => {
        return total + (score as number) * (weights[section as keyof typeof weights] || 0)
      }, 0)
    )
  }
  
  private static identifyMissingElements(profile: any): string[] {
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
  
  private static calculateExperienceYears(experiences: any[]): number {
    let totalMonths = 0
    experiences.forEach(exp => {
      const start = new Date(exp.startDate)
      const end = exp.endDate ? new Date(exp.endDate) : new Date()
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
      totalMonths += months
    })
    return Math.round(totalMonths / 12)
  }
  
  private static calculateAverageSkillLevel(skills: any[]): number {
    if (skills.length === 0) return 0
    const totalLevel = skills.reduce((sum, skill) => sum + (skill.level || 50), 0)
    return Math.round(totalLevel / skills.length)
  }
}

// HR Recruiter Insights Generator
export class HRInsightsGenerator {
  
  static generateHiringRecommendation(profile: any): {
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
  
  private static generateInterviewFocus(profile: any): string[] {
    return [
      "System Architecture & Scalability Design",
      "Problem-Solving Approach & Code Quality",
      "Team Collaboration & Leadership Experience",
      "Business Impact & Quantified Results",
      "Modern Development Practices & CI/CD",
      "Performance Optimization & Security Awareness"
    ]
  }
  
  private static estimateSalaryRange(profile: any): string {
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
  
  private static suggestRoleMatches(profile: any): string[] {
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
  
  static generateHeroSection(profile: any): string {
    const years = ContentRecommendationEngine['calculateExperienceYears'](profile.experience || [])
    const primarySkills = profile.skills?.slice(0, 3).map((skill: any) => skill.name).join(', ') || "Modern Web Technologies"
    
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
  
  static generateProjectDescriptions(projects: any[]): string[] {
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
  
  static generateSkillsNarrative(skills: any[]): string {
    const categories = skills.reduce((acc, skill) => {
      const category = skill.category || 'other'
      if (!acc[category]) acc[category] = []
      acc[category].push(skill)
      return acc
    }, {} as Record<string, any[]>)
    
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