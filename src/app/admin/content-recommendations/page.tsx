"use client"

import { Suspense } from 'react'
import Link from 'next/link'
import { ContentRecommendationEngine, HRInsightsGenerator, ContentTemplatesGenerator } from '@/lib/content-recommendations'
import { yayanLinkedInData, LinkedInDataTransformer, PortfolioDataInjector } from '@/lib/linkedin-scraper'

// Sample Profile Data for Demonstration
const sampleProfile = {
  name: "Yayan Sopian",
  title: "Full Stack Developer & AI Technology Enthusiast",
  location: "Jakarta, Indonesia",
  summary: "Experienced Full Stack Developer with 5+ years of expertise in building scalable web applications. Passionate about AI integration, modern web technologies, and creating user-centric digital solutions that drive business growth.",
  
  experience: [
    {
      title: "Senior Full Stack Developer",
      company: "AI Powered Solutions",
      startDate: "2022-01",
      endDate: null,
      description: "Lead development of AI-powered web applications using React, Node.js, and Python. Architected microservices infrastructure serving 100K+ users with 99.9% uptime.",
      achievements: ["Increased system performance by 300%", "Reduced deployment time by 80%"]
    },
    {
      title: "Full Stack Developer", 
      company: "Digital Innovation Labs",
      startDate: "2020-06",
      endDate: "2021-12",
      description: "Developed responsive web applications using modern JavaScript frameworks.",
      achievements: ["Delivered 15+ projects successfully", "Improved code quality by 40%"]
    }
  ],
  
  skills: [
    { name: "React", level: 90, category: 'frontend' },
    { name: "Node.js", level: 85, category: 'backend' },
    { name: "Python", level: 80, category: 'backend' },
    { name: "TypeScript", level: 85, category: 'frontend' },
    { name: "AI/ML", level: 75, category: 'tools' },
    { name: "AWS", level: 70, category: 'tools' },
    { name: "Docker", level: 80, category: 'tools' }
  ],
  
  projects: [
    {
      title: "AI-Powered Content Management System",
      description: "Built an intelligent CMS with AI-driven content optimization and automatic SEO suggestions",
      technologies: ["React", "Node.js", "AI/ML", "MongoDB"],
      demo_url: "https://demo.aicontentms.com",
      github_url: "https://github.com/yayan/ai-cms"
    },
    {
      title: "E-commerce Platform",
      description: "Scalable e-commerce solution with real-time inventory management",
      technologies: ["Vue.js", "Laravel", "MySQL"],
      demo_url: "https://demo.ecommerce.com"
    }
  ],
  
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2023-06"
    }
  ]
}

// HR Analysis Component
function HRAnalysisSection() {
  const audit = ContentRecommendationEngine.analyzeProfile(sampleProfile)
  const hiringRecommendation = HRInsightsGenerator.generateHiringRecommendation(sampleProfile)
  
  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="feature-card p-8 text-center">
        <div className="mb-6">
          <div className="text-6xl animate-pulse-soft">🎯</div>
        </div>
        <h3 className="heading-secondary text-2xl mb-4">Portfolio Score</h3>
        <div className="text-5xl font-black heading-primary mb-2">
          {audit.overallScore}/100
        </div>
        <p className="text-muted">
          {audit.overallScore >= 80 ? "Excellent - Ready for senior roles" :
           audit.overallScore >= 60 ? "Good - Competitive for mid-level roles" :
           "Needs improvement - Focus on key areas"}
        </p>
      </div>

      {/* HR Perspective */}
      <div className="feature-card p-8">
        <h3 className="heading-secondary text-xl mb-6 flex items-center gap-3">
          <span className="text-2xl">👥</span>
          HR Recruiter Analysis
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Strengths */}
          <div className="component-card p-6">
            <h4 className="text-accent font-semibold mb-4 flex items-center gap-2">
              <span>⭐</span> Key Strengths
            </h4>
            <ul className="space-y-3">
              {audit.hrPerspective.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-muted leading-relaxed">
                  {strength}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Opportunities */}
          <div className="component-card p-6">
            <h4 className="text-accent font-semibold mb-4 flex items-center gap-2">
              <span>🚀</span> Market Opportunities
            </h4>
            <ul className="space-y-3">
              {audit.hrPerspective.opportunities.slice(0, 4).map((opportunity, index) => (
                <li key={index} className="text-sm text-muted leading-relaxed">
                  {opportunity}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Market Position */}
        <div className="mt-8 component-card p-6 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <h4 className="text-accent font-semibold mb-3">📈 Market Position Analysis</h4>
          <p className="text-sm text-muted leading-relaxed">
            {audit.hrPerspective.marketPosition}
          </p>
        </div>
      </div>

      {/* Hiring Recommendation */}
      <div className="feature-card p-8">
        <h3 className="heading-secondary text-xl mb-6 flex items-center gap-3">
          <span className="text-2xl">🎯</span>
          Hiring Recommendation
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="component-card p-6 text-center">
            <div className="text-3xl mb-3">
              {hiringRecommendation.recommendation === 'hire' ? '✅' : 
               hiringRecommendation.recommendation === 'interview' ? '📞' : '❌'}
            </div>
            <h4 className="text-accent font-semibold mb-2">Recommendation</h4>
            <p className="text-sm text-muted capitalize">{hiringRecommendation.recommendation}</p>
          </div>
          
          <div className="component-card p-6 text-center">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="text-accent font-semibold mb-2">Confidence</h4>
            <p className="text-sm text-muted">{hiringRecommendation.confidence}%</p>
          </div>
          
          <div className="component-card p-6 text-center">
            <div className="text-3xl mb-3">💰</div>
            <h4 className="text-accent font-semibold mb-2">Salary Range</h4>
            <p className="text-sm text-muted">{hiringRecommendation.salaryRange}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Content Recommendations Component
function ContentRecommendationsSection() {
  const audit = ContentRecommendationEngine.analyzeProfile(sampleProfile)
  
  return (
    <div className="space-y-8">
      {/* Section Scores */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(audit.sections).map(([section, score]) => (
          <div key={section} className="stats-card text-center">
            <h4 className="text-accent text-xs font-medium mb-2 capitalize">
              {section.replace('_', ' ')}
            </h4>
            <div className="text-2xl font-bold heading-secondary mb-1">
              {score}/100
            </div>
            <div className="w-full bg-slate-800/50 rounded-full h-1">
              <div 
                className="h-1 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recommendations List */}
      <div className="space-y-6">
        {audit.recommendations.map((rec, index) => (
          <div key={index} className="feature-card p-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="heading-secondary text-xl mb-2">{rec.title}</h3>
                <p className="text-accent text-sm">{rec.section}</p>
              </div>
              <span className={`status-badge ${
                rec.priority === 'high' ? 'status-priority' :
                rec.priority === 'medium' ? 'status-active' : 'status-draft'
              }`}>
                {rec.priority === 'high' ? '🔥 High Priority' :
                 rec.priority === 'medium' ? '⚡ Medium' : '📋 Low'}
              </span>
            </div>
            
            <p className="text-muted mb-6 leading-relaxed">
              {rec.description}
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-accent font-semibold mb-3">💡 Examples</h4>
                <ul className="space-y-2">
                  {rec.examples.map((example, exIndex) => (
                    <li key={exIndex} className="text-sm text-muted bg-slate-800/30 p-3 rounded-lg">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="text-accent font-semibold mb-3">🎯 Expected Impact</h4>
                <p className="text-sm text-muted bg-gradient-to-r from-green-500/10 to-cyan-500/10 p-3 rounded-lg">
                  {rec.impact}
                </p>
                
                <h4 className="text-accent font-semibold mb-2 mt-4">🔑 Keywords</h4>
                <div className="flex flex-wrap gap-2">
                  {rec.keywords.map((keyword, kIndex) => (
                    <span key={kIndex} className="status-badge bg-blue-500/10 border-blue-500/20 text-blue-300 text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// LinkedIn Data Injection Component
function LinkedInDataInjection() {
  const transformedData = LinkedInDataTransformer.transformToPortfolio(yayanLinkedInData)
  
  const handleInjectData = async () => {
    const result = await PortfolioDataInjector.injectLinkedInData(transformedData)
    if (result.success) {
      alert('✅ Data injected successfully!')
    } else {
      alert('❌ Failed to inject data: ' + result.error)
    }
  }
  
  return (
    <div className="space-y-8">
      {/* LinkedIn Data Preview */}
      <div className="feature-card p-8">
        <h3 className="heading-secondary text-xl mb-6 flex items-center gap-3">
          <span className="text-2xl">💼</span>
          LinkedIn Data Preview - Yayan Sopian Profile
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="component-card p-6">
            <h4 className="text-accent font-semibold mb-4">📊 Professional Data Summary</h4>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Name:</span>
                <span className="text-accent">{yayanLinkedInData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Title:</span>
                <span className="text-accent text-xs">{yayanLinkedInData.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Experience Entries:</span>
                <span className="text-accent">{transformedData.experience.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Skills:</span>
                <span className="text-accent">{transformedData.skills.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Projects:</span>
                <span className="text-accent">{transformedData.projects.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Certifications:</span>
                <span className="text-accent">{transformedData.certifications.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Education:</span>
                <span className="text-accent">{transformedData.education.length}</span>
              </div>
            </div>
          </div>
          
          <div className="component-card p-6">
            <h4 className="text-accent font-semibold mb-4">🚀 Enhanced Profile Preview</h4>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-muted">Enhanced Tagline:</span>
                <p className="text-accent text-xs mt-1">{transformedData.hero.tagline}</p>
              </div>
              <div>
                <span className="text-muted">Location:</span>
                <p className="text-accent">{transformedData.hero.location}</p>
              </div>
              <div>
                <span className="text-muted">Top Skills:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {yayanLinkedInData.skills.filter(s => s.isTop).map((skill, idx) => (
                    <span key={idx} className="status-badge bg-cyan-500/10 border-cyan-500/20 text-cyan-300 text-xs">
                      {skill.name} ({skill.level}%)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button 
            onClick={handleInjectData}
            className="holo-btn px-8 py-4 text-lg"
          >
            🚀 Inject Yayan&apos;s LinkedIn Data to Portfolio
          </button>
          <p className="text-muted text-sm mt-2">
            This will transform and inject LinkedIn data into your Supabase database
          </p>
        </div>
      </div>
      
      {/* Enhanced Profile Analysis */}
      <div className="feature-card p-8">
        <h3 className="heading-secondary text-xl mb-6 flex items-center gap-3">
          <span className="text-2xl">📈</span>
          Professional Profile Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="component-card p-4 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <h4 className="text-accent font-medium text-sm mb-1">Experience Level</h4>
            <p className="text-cyan-400 font-bold">Senior Developer</p>
            <p className="text-xs text-muted mt-1">5+ Years</p>
          </div>
          
          <div className="component-card p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h4 className="text-accent font-medium text-sm mb-1">Skill Mastery</h4>
            <p className="text-blue-400 font-bold">Expert Level</p>
            <p className="text-xs text-muted mt-1">15 Core Skills</p>
          </div>
          
          <div className="component-card p-4 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h4 className="text-accent font-medium text-sm mb-1">Achievements</h4>
            <p className="text-purple-400 font-bold">Industry Ready</p>
            <p className="text-xs text-muted mt-1">3 Certifications</p>
          </div>
        </div>
      </div>
      
      {/* Generated Content Templates */}
      <div className="feature-card p-8">
        <h3 className="heading-secondary text-xl mb-6 flex items-center gap-3">
          <span className="text-2xl">📝</span>
          AI-Generated Content Templates
        </h3>
        
        <div className="space-y-6">
          <div className="component-card p-6">
            <h4 className="text-accent font-semibold mb-4">🎯 Enhanced Hero Section</h4>
            <pre className="text-xs text-muted bg-slate-900/50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {ContentTemplatesGenerator.generateHeroSection({
                name: yayanLinkedInData.name,
                title: yayanLinkedInData.title,
                summary: yayanLinkedInData.summary,
                location: yayanLinkedInData.location,
                experience: yayanLinkedInData.experiences.map(e => ({
                  title: e.title,
                  company: e.company,
                  startDate: e.startDate,
                  endDate: e.endDate,
                  achievements: e.achievements
                }))
              })}
            </pre>
          </div>
          
          <div className="component-card p-6">
            <h4 className="text-accent font-semibold mb-4">🛠️ Skills Narrative</h4>
            <pre className="text-xs text-muted bg-slate-900/50 p-4 rounded-lg overflow-x-auto whitespace-pre-wrap">
              {ContentTemplatesGenerator.generateSkillsNarrative(yayanLinkedInData.skills.map(s => ({
                name: s.name,
                level: s.level || 80,
                category: s.category
              })))}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContentRecommendationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Space Environment */}
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="space-particle absolute top-32 left-10 animate-float-gentle"></div>
          <div className="space-particle large absolute top-20 right-32 animate-float-gentle" style={{animationDelay: '3s'}}></div>
          <div className="space-particle glow absolute bottom-40 right-16 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="nav-link">
                ← Mission Control
              </Link>
              <div className="h-4 w-px bg-slate-600"></div>
              <h1 className="text-xl font-bold heading-primary">
                🎯 Content Optimization Center
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 relative z-20">
        {/* Hero Header */}
        <header className="text-center mb-16">
          <div className="mb-8">
            <div className="text-6xl animate-pulse-soft">🎯</div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-6">
            <span className="heading-primary">HR Recruiter Insights</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Professional content analysis and optimization recommendations from an HR recruiter perspective
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="component-card p-2 flex gap-2">
            <button className="holo-btn px-6 py-3 text-sm">
              📊 HR Analysis
            </button>
            <button className="secondary-btn px-6 py-3 text-sm">
              💡 Recommendations
            </button>
            <button className="secondary-btn px-6 py-3 text-sm">
              💼 LinkedIn Injection
            </button>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-16">
          {/* HR Analysis */}
          <section id="hr-analysis">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
                <span className="text-cyan-400 animate-pulse-soft">👥</span>
                <span className="text-accent font-medium">HR RECRUITER ANALYSIS</span>
              </div>
            </div>
            
            <Suspense fallback={<div className="feature-card p-12 text-center">Loading analysis...</div>}>
              <HRAnalysisSection />
            </Suspense>
          </section>

          {/* Content Recommendations */}
          <section id="recommendations">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
                <span className="text-cyan-400 animate-pulse-soft">💡</span>
                <span className="text-accent font-medium">CONTENT OPTIMIZATION</span>
              </div>
            </div>
            
            <Suspense fallback={<div className="feature-card p-12 text-center">Loading recommendations...</div>}>
              <ContentRecommendationsSection />
            </Suspense>
          </section>

          {/* LinkedIn Data Injection */}
          <section id="linkedin-injection">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
                <span className="text-cyan-400 animate-pulse-soft">💼</span>
                <span className="text-accent font-medium">LINKEDIN DATA INJECTION</span>
              </div>
            </div>
            
            <Suspense fallback={<div className="feature-card p-12 text-center">Loading data injection...</div>}>
              <LinkedInDataInjection />
            </Suspense>
          </section>
        </div>
      </div>
    </div>
  )
} 