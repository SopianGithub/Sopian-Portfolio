import { Suspense } from 'react'
import Link from 'next/link'
import { ProjectsAPI } from '@/lib/api'
import Image from 'next/image'

// Enhanced Project Card Component
interface ProjectCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="feature-card group">
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Project Image */}
        <div className="lg:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0 relative">
          {project.image_url ? (
            <Image
              src={project.image_url}
              alt={project.title}
              width={192}
              height={128}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-900/40 to-purple-900/40 flex items-center justify-center text-4xl opacity-50">
              <div className="animate-float-gentle">🚀</div>
            </div>
          )}
          <div className="stars-backdrop opacity-20"></div>
        </div>

        {/* Project Details */}
        <div className="flex-1 space-y-4">
          <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h3 className="heading-secondary text-xl mb-2 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed line-clamp-2">
                {project.short_description}
              </p>
            </div>
            
            {/* Status Badge */}
            <div className="flex-shrink-0">
              <span className={`status-badge ${
                project.status === 'published' 
                  ? 'status-active' 
                  : project.status === 'draft'
                  ? 'status-draft'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {project.status === 'published' ? '✅ ACTIVE' :
                 project.status === 'draft' ? '🚧 DRAFT' : '❌ INACTIVE'}
              </span>
            </div>
          </header>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {Array.isArray(project.technologies) && project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
              <span
                key={techIndex}
                className="status-badge bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20 transition-all duration-300"
              >
                {String(tech)}
              </span>
            ))}
            {Array.isArray(project.technologies) && project.technologies.length > 3 && (
              <span className="status-badge bg-slate-700/30 border-slate-600/30 text-slate-400">
                +{project.technologies.length - 3} systems
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/admin/projects/${project.id}/edit`}
              className="holo-btn px-4 py-2 text-sm"
            >
              ✏️ Edit Mission
            </Link>
            
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-btn px-4 py-2 text-sm"
              >
                🚀 Launch Demo
              </a>
            )}
            
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="secondary-btn px-4 py-2 text-sm"
              >
                📁 Source Code
              </a>
            )}

            <button className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 hover:text-red-300 rounded-lg text-sm font-medium transition-all duration-300 border border-red-600/30 hover:border-red-500/50">
              🗑️ Terminate
            </button>
          </div>
        </div>

        {/* Priority Badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span className="status-badge status-priority">
              ⭐ Priority Mission
            </span>
          </div>
        )}
      </div>
    </article>
  )
}

// Enhanced Projects List Component
async function ProjectsList() {
  try {
    const projects = await ProjectsAPI.getAllProjects()
    
    return (
      <div className="space-y-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </div>
    )
  } catch (error) {
    console.error('Error fetching projects:', error)
    return (
      <div className="component-card p-12 text-center">
        <div className="text-6xl mb-4 animate-pulse-soft">🛸</div>
        <h3 className="heading-secondary text-lg mb-2">Connection Lost</h3>
        <p className="text-muted">Unable to establish connection with project database.</p>
        <p className="text-muted text-sm mt-1">Please check your connection and try again.</p>
      </div>
    )
  }
}

// Stats Card Component
interface StatsCardProps {
  label: string
  value: number
  icon: string
  color: string
}

function StatsCard({ label, value, icon, color }: StatsCardProps) {
  return (
    <div className="stats-card group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-muted text-sm font-medium mb-1">{label}</p>
          <p className="heading-secondary text-2xl font-bold">{value}</p>
        </div>
        <div className="text-xl animate-pulse-soft" style={{color: `var(--${color}-glow)`}}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsManagementPage() {
  const statsData = [
    { label: 'Active Missions', value: 12, icon: '🚀', color: 'cyan' },
    { label: 'Deployed', value: 8, icon: '✅', color: 'green' },
    { label: 'In Development', value: 3, icon: '🚧', color: 'yellow' },
    { label: 'Priority', value: 4, icon: '⭐', color: 'purple' }
  ]

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
          <div className="space-particle absolute top-1/2 left-20 animate-float-gentle" style={{animationDelay: '2s'}}></div>
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
                🚀 Projects Command Center
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/projects/new"
                className="holo-btn px-4 py-2 text-sm"
              >
                ➕ Deploy New Mission
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 relative z-20">
        {/* Hero Header */}
        <header className="text-center mb-12">
          <div className="mb-6">
            <div className="text-5xl animate-pulse-soft">🛸</div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            <span className="heading-primary">Mission Portfolio</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Command and control center for managing your space exploration projects and development missions.
          </p>
        </header>

        {/* Stats Dashboard */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
              <span className="text-cyan-400 animate-pulse-soft">📊</span>
              <span className="text-accent font-medium">MISSION METRICS</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {statsData.map((stat) => (
              <StatsCard key={stat.label} {...stat} />
            ))}
          </div>
        </section>

        {/* Control Panel */}
        <section className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
              <span className="text-cyan-400 animate-pulse-soft">🎛️</span>
              <span className="text-accent font-medium">MISSION CONTROL</span>
            </div>
          </div>
          
          <div className="component-card p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="🔍 Search missions across the galaxy..."
                  className="form-input w-full"
                />
              </div>
              <select className="form-input min-w-48">
                <option value="">Mission Status</option>
                <option value="published">✅ Active</option>
                <option value="draft">🚧 Development</option>
                <option value="archived">📦 Archived</option>
              </select>
              <select className="form-input min-w-48">
                <option value="">Mission Type</option>
                <option value="featured">⭐ Priority</option>
                <option value="regular">🚀 Standard</option>
              </select>
            </div>
          </div>
        </section>

        {/* Projects List */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
              <span className="text-cyan-400 animate-pulse-soft">🚀</span>
              <span className="text-accent font-medium">ACTIVE MISSIONS</span>
            </div>
          </div>
          
          <Suspense fallback={
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="component-card p-6 animate-pulse">
                  <div className="flex gap-6">
                    <div className="w-48 h-32 bg-slate-700/50 rounded-lg"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-6 bg-slate-700/50 rounded w-1/2"></div>
                      <div className="h-4 bg-slate-700/50 rounded w-3/4"></div>
                      <div className="flex gap-2">
                        <div className="h-6 w-16 bg-slate-700/50 rounded"></div>
                        <div className="h-6 w-20 bg-slate-700/50 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }>
            <ProjectsList />
          </Suspense>
        </section>

        {/* Navigation Controls */}
        <section className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-6">
            <span className="text-cyan-400 animate-pulse-soft">🧭</span>
            <span className="text-accent font-medium">NAVIGATION</span>
          </div>
          
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              <button className="secondary-btn px-4 py-2">
                ← Previous
              </button>
              <button className="holo-btn px-4 py-2">
                1
              </button>
              <button className="secondary-btn px-4 py-2">
                2
              </button>
              <button className="secondary-btn px-4 py-2">
                3
              </button>
              <button className="secondary-btn px-4 py-2">
                Next →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
} 