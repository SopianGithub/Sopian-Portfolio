import { ProjectsAPI, SkillsAPI } from '@/lib/api'
import Image from 'next/image'
import Link from 'next/link'
import PersonalBranding from '@/components/PersonalBranding'
import ShowcaseProjects from '@/components/ShowcaseProjects'
import Navbar from '@/components/layout/Navbar'


// Enhanced Loading Components
function ProjectsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="component-card p-0 animate-pulse">
          <div className="h-48 bg-gradient-to-br from-blue-900/30 to-purple-900/30 relative overflow-hidden">
            <div className="stars-backdrop opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          </div>
          <div className="p-6 space-y-4">
            <div className="h-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded"></div>
            <div className="h-4 bg-slate-700/50 rounded"></div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-blue-500/10 rounded-full"></div>
              <div className="h-6 w-20 bg-purple-500/10 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SkillsLoading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="stats-card animate-pulse">
          <div className="h-8 w-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg mb-3"></div>
          <div className="h-4 bg-slate-700/50 rounded mb-3"></div>
          <div className="h-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full"></div>
        </div>
      ))}
    </div>
  )
}

// Enhanced Project Component
async function FeaturedProjects() {
  try {
    const projects = await ProjectsAPI.getFeaturedProjects()
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <article key={project.id} className="feature-card group">
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              {project.image_url ? (
                <>
        <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                </>
              ) : (
                <div className="relative h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center">
                  <div className="text-5xl opacity-40 animate-float-gentle">🚀</div>
                  <div className="stars-backdrop opacity-30"></div>
                </div>
              )}
              
              {/* Priority Badge */}
              <div className="absolute top-4 right-4">
                <span className="status-badge status-priority">
                  ⭐ Mission #{index + 1}
                </span>
              </div>
            </div>
            
            {/* Project Content */}
            <div className="p-6 space-y-4">
              <header>
                <h3 className="heading-secondary text-xl mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {project.short_description}
                </p>
              </header>
              
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="status-badge bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-all duration-300"
                  >
                    {String(tech)}
                  </span>
                ))}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                {project.demo_url && (
                  <a
                    href={project.demo_url}
            target="_blank"
            rel="noopener noreferrer"
                    className="holo-btn flex-1 text-center text-sm inline-flex items-center justify-center gap-2"
          >
                    🚀 Launch Demo
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
          </a>
                )}
                {project.github_url && (
        <a
                    href={project.github_url}
          target="_blank"
          rel="noopener noreferrer"
                    className="secondary-btn"
                  >
                    📁 Code
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error fetching projects:', error)
    return (
      <div className="component-card p-12 text-center">
        <div className="text-6xl mb-4 animate-pulse-soft">🛸</div>
        <h3 className="heading-secondary text-lg mb-2">Connection Lost</h3>
        <p className="text-muted">Unable to establish connection with mission control.</p>
        <p className="text-muted text-sm mt-1">Please try again later.</p>
      </div>
    )
  }
}

// Enhanced Skills Component
async function SkillsSection() {
  try {
    const skills = await SkillsAPI.getAllSkills()
    
    const groupedSkills = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill)
      return acc
    }, {} as Record<string, typeof skills>)

    const categoryInfo = {
      frontend: { icon: '🚀', name: 'Frontend Systems', color: 'cyan' },
      backend: { icon: '⚡', name: 'Backend Engines', color: 'blue' },
      database: { icon: '🗄️', name: 'Data Banks', color: 'purple' },
      tools: { icon: '🛠️', name: 'Command Tools', color: 'green' }
    }

    return (
      <div className="space-y-16">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => {
          const info = categoryInfo[category as keyof typeof categoryInfo] || { icon: '🔧', name: category, color: 'gray' }
          
          return (
            <section key={category} className="relative">
              {/* Category Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-4 px-8 py-4 component-card mb-6">
                  <span className="text-2xl animate-pulse-soft">{info.icon}</span>
                  <h3 className="heading-secondary text-xl">
                    {info.name}
                  </h3>
                </div>
              </div>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="stats-card group">
                    {/* Skill Header */}
                    <div className="flex items-center gap-3 mb-4">
                      {skill.icon_url ? (
                        <div className="relative">
          <Image
                            src={skill.icon_url}
                            alt={skill.name}
                            width={32}
                            height={32}
                            className="rounded-lg"
                          />
                          <div className="absolute inset-0 bg-cyan-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm animate-pulse-soft">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="heading-secondary text-sm group-hover:text-cyan-300 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                    
                    {/* Proficiency Bar */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted">Proficiency</span>
                        <span className="text-accent font-mono font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full transition-all duration-1000 ease-out relative bg-gradient-to-r from-cyan-500 to-blue-500"
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    )
  } catch (error) {
    console.error('Error fetching skills:', error)
    return (
      <div className="component-card p-12 text-center">
        <div className="text-6xl mb-4 animate-pulse-soft">🛰️</div>
        <h3 className="heading-secondary text-lg mb-2">Satellite Connection Lost</h3>
        <p className="text-muted">Unable to retrieve skill data from space station.</p>
      </div>
    )
  }
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Space Environment */}
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="space-particle absolute top-20 left-20 animate-float-gentle"></div>
          <div className="space-particle large absolute top-40 right-32 animate-float-gentle" style={{animationDelay: '2s'}}></div>
          <div className="space-particle glow absolute bottom-32 left-16 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
          <div className="space-particle absolute bottom-20 right-20 animate-float-gentle" style={{animationDelay: '3s'}}></div>
          <div className="space-particle large glow absolute top-1/2 left-1/4 animate-pulse-soft" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Outer Space
          </h1>
          <div className="hero-url">
            I help businesses and startups build scalable, efficient, and impactful digital solutions.<br/>
            Ready to be your technology partner in transforming ideas into tangible products.
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="#projects" className="holo-btn px-8 py-4 text-lg font-bold inline-flex items-center gap-3 shadow-lg hover:scale-105 transition-transform duration-200">
              🚀 Lihat Portofolio
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link href="#contact" className="secondary-btn px-8 py-4 text-lg font-bold inline-flex items-center gap-3 shadow-lg hover:bg-cyan-900/30 hover:scale-105 transition-all duration-200">
              📩 Konsultasi Gratis
              <svg className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </Link>
          </div>
        </div>
        {/* Planet di kanan */}
        <Image src="/images/assets/satelit.png" alt="Planet" className="hero-planet" width={420} height={420} priority />
        {/* Astronaut di tengah */}
        <Image src="/images/assets/astronaut.png" alt="Astronaut" className="hero-astronaut" width={600} height={600} priority />
        <div className="stars-backdrop"></div>
      </section>

      {/* Personal Branding Section */}
      <div id="profile-section">
        <PersonalBranding />
      </div>

      {/* ShowCase Project */}
      <div id="projects">
        <ShowcaseProjects />
      </div>

      {/* Call to Action Section */}
      <section id="contact" className="py-24 relative overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/30 via-blue-950/30 to-purple-950/30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_50%)]"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8">
              <span className="heading-secondary">Ready to Launch Your</span>
              <br />
              <span className="heading-primary">Next Mission?</span>
            </h2>
            <p className="text-xl text-cyan-300 mb-12 leading-relaxed animate-gradient-flow">
              Let&apos;s collaborate and build something extraordinary that reaches beyond the stars.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact" className="holo-btn px-8 py-4 text-lg inline-flex items-center gap-3">
                🚀 Start Mission
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link href="/blog" className="secondary-btn px-8 py-4 text-lg inline-flex items-center gap-3">
                📖 Mission Logs
                <svg className="w-5 h-5 transition-transform group-hover:rotate-12 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
