import Link from 'next/link'
import { Suspense } from 'react'

// Enhanced Admin Stats Component
async function AdminStats() {
  // This would normally fetch real stats from APIs
  const stats = [
    { label: 'Active Missions', value: 12, icon: '🚀', color: 'cyan' },
    { label: 'Mission Logs', value: 8, icon: '📖', color: 'purple' },
    { label: 'Tech Arsenal', value: 15, icon: '⚡', color: 'green' },
    { label: 'Transmissions', value: 3, icon: '📧', color: 'orange' }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, index) => (
        <div key={stat.label} className="stats-card group" style={{animationDelay: `${index * 0.1}s`}}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium mb-1">{stat.label}</p>
              <p className="heading-secondary text-3xl font-bold">{stat.value}</p>
            </div>
            <div className="text-2xl animate-pulse-soft" style={{color: `var(--${stat.color}-glow)`}}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// Management Card Component
interface ManagementCardProps {
  title: string
  description: string
  icon: string
  primaryAction: { href: string; label: string }
  secondaryAction?: { href: string; label: string }
  color: string
}

function ManagementCard({ title, description, icon, primaryAction, secondaryAction }: ManagementCardProps) {
  return (
    <article className="feature-card group">
      <div className="p-8 text-center space-y-6">
        <div className="text-6xl animate-float-gentle">
          {icon}
        </div>
        
        <header>
          <h3 className="heading-secondary text-2xl mb-4">{title}</h3>
          <p className="text-muted leading-relaxed">
            {description}
          </p>
        </header>
        
        <div className="space-y-3 pt-4">
          <Link href={primaryAction.href} className="holo-btn block w-full text-center">
            {primaryAction.label}
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href} className="secondary-btn block w-full text-center">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}

export default function AdminPage() {
  const managementSections = [
    {
      title: 'Mission Projects',
      description: 'Deploy new missions, track project status, and manage your space exploration portfolio.',
      icon: '🚀',
      color: 'cyan',
      primaryAction: { href: '/admin/projects', label: 'Control Projects' },
      secondaryAction: { href: '/admin/projects/new', label: 'Deploy New Mission' }
    },
    {
      title: 'Mission Logs',
      description: 'Document space missions, share technical discoveries, and chronicle your journey.',
      icon: '📖',
      color: 'purple',
      primaryAction: { href: '/admin/blog', label: 'Manage Logs' },
      secondaryAction: { href: '/admin/blog/new', label: 'Create New Log' }
    },
    {
      title: 'Tech Arsenal',
      description: 'Upgrade your technical capabilities and track proficiency across space technologies.',
      icon: '⚡',
      color: 'green',
      primaryAction: { href: '/admin/skills', label: 'Manage Arsenal' },
      secondaryAction: { href: '/admin/skills/new', label: 'Add New Skill' }
    },
    {
      title: 'Space Experience',
      description: 'Chronicle your professional journey through the cosmos of development.',
      icon: '🛰️',
      color: 'orange',
      primaryAction: { href: '/admin/experience', label: 'Manage Missions' },
      secondaryAction: { href: '/admin/experience/new', label: 'Add Experience' }
    },
    {
      title: 'HR Insights',
      description: 'Get professional content recommendations and LinkedIn data injection from HR perspective.',
      icon: '🎯',
      color: 'blue',
      primaryAction: { href: '/admin/content-recommendations', label: 'View Insights' },
      secondaryAction: { href: '/admin/content-recommendations#linkedin-injection', label: 'Inject LinkedIn Data' }
    },
    {
      title: 'Transmissions',
      description: 'Monitor incoming communications from Earth and respond to mission queries.',
      icon: '📧',
      color: 'red',
      primaryAction: { href: '/admin/messages', label: 'View Messages' }
    },
    {
      title: 'System Config',
      description: 'Configure spacecraft systems, personal data, and mission parameters.',
      icon: '⚙️',
      color: 'indigo',
      primaryAction: { href: '/admin/settings', label: 'System Settings' }
    }
  ]

  const quickActions = [
    { href: '/admin/backup', label: '💾 Data Backup' },
    { href: '/admin/analytics', label: '📊 Mission Analytics' },
    { href: '/admin/deploy', label: '🚀 Deploy Systems' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Space Environment */}
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        
        {/* Subtle Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="space-particle absolute top-32 right-20 animate-float-gentle"></div>
          <div className="space-particle large absolute bottom-32 left-20 animate-float-gentle" style={{animationDelay: '2s'}}></div>
          <div className="space-particle glow absolute top-1/2 right-10 animate-pulse-soft" style={{animationDelay: '4s'}}></div>
        </div>
      </div>

      {/* Enhanced Navigation */}
      <nav className="nav-glass sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl font-bold heading-primary">
              🚀 Mission Control Center
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="nav-link">
                ← Return to Base
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12 relative z-20">
        {/* Hero Header */}
        <header className="text-center mb-16">
          <div className="mb-8">
            <div className="text-6xl animate-pulse-soft">🛰️</div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            <span className="heading-primary">Mission Control</span>
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Command center for aerospace portfolio operations and content management.
          </p>
        </header>

        {/* Stats Dashboard */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
              <span className="text-cyan-400 animate-pulse-soft">📊</span>
              <span className="text-accent font-medium">MISSION STATUS</span>
            </div>
          </div>
          
          <Suspense fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="stats-card animate-pulse">
                  <div className="h-6 bg-slate-700/50 rounded mb-2"></div>
                  <div className="h-8 bg-slate-700/50 rounded"></div>
                </div>
              ))}
            </div>
          }>
            <AdminStats />
          </Suspense>
        </section>

        {/* Management Grid */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-4">
              <span className="text-cyan-400 animate-pulse-soft">🎛️</span>
              <span className="text-accent font-medium">CONTROL SYSTEMS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black">
              <span className="heading-primary">Management Console</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementSections.map((section) => (
              <ManagementCard
                key={section.title}
                {...section}
              />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-8">
            <span className="text-cyan-400 animate-pulse-soft">⚡</span>
            <span className="text-accent font-medium">QUICK OPERATIONS</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="holo-btn px-6 py-3"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 