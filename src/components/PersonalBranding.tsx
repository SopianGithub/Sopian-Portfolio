'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PersonalBrandingData {
  personalInfo: {
    name: string
    tagline: string
    summary: string
    location: string
    profile_image?: string
  }
  experience: Array<{
    id: number
    title: string
    company: string
    location: string
    start_date: string
    end_date?: string | null
    description: string
    technologies: string[]
    achievements: string[]
    featured: boolean
  }>
  skills: Array<{
    id: number
    name: string
    category: string
    level: number
    icon_url?: string
  }>
  projects: Array<{
    id: number
    title: string
    description: string
    technologies: string[]
    demo_url?: string
    github_url?: string
    featured: boolean
    status: string
  }>
  certifications: Array<{
    id: number
    name: string
    issuer: string
    issue_date: string
    credential_url?: string
    skills: string[]
  }>
  stats: {
    totalExperience: number
    totalSkills: number
    totalProjects: number
    totalCertifications: number
  }
}

export default function PersonalBranding() {
  const [data, setData] = useState<PersonalBrandingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [needsMigration, setNeedsMigration] = useState(false)
  const [isInjecting, setIsInjecting] = useState(false)

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/personal-branding')
      const result = await response.json()
      
      if (result.success) {
        setData(result.data)
        setNeedsMigration(false)
      } else {
        setError(result.error || 'Failed to load personal branding data')
        setNeedsMigration(result.needsMigration || false)
      }
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Network error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleAutoInject = async () => {
    try {
      setIsInjecting(true)
      const response = await fetch('/api/personal-branding', {
        method: 'POST',
      })
      const result = await response.json()
      
      if (result.success) {
        alert('✅ LinkedIn data successfully injected!')
        await fetchData() // Refresh data
      } else {
        alert('❌ Failed to inject data: ' + result.error)
      }
    } catch (error) {
      console.error('Injection error:', error)
      alert('❌ Network error occurred')
    } finally {
      setIsInjecting(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (loading) {
    return (
      <section className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin text-4xl md:text-6xl mb-4">🚀</div>
            <p className="text-slate-400">Loading Personal Branding...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-12 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-4xl md:text-6xl mb-6">
              {needsMigration ? '🛠️' : '⚠️'}
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              {needsMigration ? 'Database Setup Required' : 'Connection Error'}
            </h3>
            
            <p className="text-slate-400 mb-6 leading-relaxed">{error}</p>
            
            {needsMigration ? (
              <div className="bg-slate-800/50 backdrop-blur border border-cyan-400/20 rounded-lg p-6 text-left mb-6">
                <h4 className="text-cyan-400 font-semibold mb-4">🚀 Quick Setup Steps:</h4>
                <ol className="text-sm text-slate-300 space-y-2 list-decimal list-inside">
                  <li>Open your <strong className="text-cyan-400">Supabase Dashboard</strong></li>
                  <li>Go to <strong className="text-cyan-400">SQL Editor</strong></li>
                  <li>Copy & paste content from <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">database-migration.sql</code></li>
                  <li>Click <strong className="text-cyan-400">Run</strong> button</li>
                  <li>Refresh this page</li>
                </ol>
                
                <div className="mt-4 p-3 bg-blue-950/30 rounded-lg border border-blue-500/20">
                  <p className="text-xs text-blue-300">
                    💡 <strong>Tip:</strong> Check the <code className="text-cyan-400">QUICK_SETUP_GUIDE.md</code> file for detailed instructions
                  </p>
                </div>
              </div>
            ) : (
              <button 
                onClick={handleAutoInject}
                disabled={isInjecting}
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mb-4"
              >
                {isInjecting ? '🔄 Injecting...' : '🚀 Auto-Import LinkedIn Data'}
              </button>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={fetchData}
                className="bg-slate-800/80 hover:bg-slate-700 border border-cyan-400/50 hover:border-cyan-400 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                🔄 Retry Connection
              </button>
              
              {needsMigration && (
                <a 
                  href="https://app.supabase.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  🛠️ Open Supabase
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!data) return null

  const { personalInfo, skills } = data

  return (
    <main>
      {/* Hero Profile Section */}
      <section className="relative min-h-[400px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900 py-12 md:py-20">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-cyan-400/5 to-transparent"></div>
        </div>
        
        {/* Astronaut & Moon - Responsive */}
        <div className="absolute left-0 bottom-0 z-10 w-48 sm:w-64 md:w-80 lg:w-[420px] max-w-[45vw] pointer-events-none select-none">
          <Image
            src="/images/assets/satelit2.png"
            alt="Moon"
            width={420}
            height={550}
            priority
            className="w-full h-auto animate-pulse"
            style={{animationDuration: '4s'}}
          />
          <div className="absolute left-[15%] sm:left-[20%] md:left-[30px] bottom-[10%] sm:bottom-[15%] md:bottom-[50px] w-[50%] sm:w-[55%] md:w-[220px]">
            <Image
              src="/images/assets/astronaut2.png"
              alt="Astronaut"
              width={520}
              height={520}
              className="w-full h-auto animate-bounce"
              style={{animationDuration: '3s'}}
            />
          </div>
        </div>
        
        {/* Main Content - Responsive */}
        <div className="relative z-20 max-w-3xl ml-auto mr-4 sm:mr-8 md:mr-0 px-4 sm:px-6 md:px-8 py-8 md:py-16">
          <div className="flex justify-center md:justify-start mb-4 md:mb-6">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 p-[2px] sm:p-[3px] shadow-xl">
              <div className="w-full h-full rounded-full bg-slate-900/80 flex items-center justify-center overflow-hidden">
                <Image
                  src={"/images/profile.png"}
                  alt={personalInfo.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 text-white drop-shadow-lg">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
          </h2>
          
          <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-6 md:mb-8 max-w-2xl leading-relaxed">
            {personalInfo.summary}
          </p>
        </div>
      </section>

      {/* Skills Section - Responsive Grid */}
      <section className="relative z-30 py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 backdrop-blur border border-cyan-400/20 rounded-full mb-4 md:mb-6">
              <span className="text-cyan-400 animate-pulse text-lg sm:text-xl">⚡</span>
              <span className="text-cyan-400 font-medium text-sm sm:text-base">TECHNICAL ARSENAL</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Skills & Technologies
              </span>
            </h2>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
              My comprehensive technical expertise across various domains, 
              powering missions from Earth to the digital cosmos.
            </p>
          </header>
          
          {/* Responsive Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl mx-auto">
            {/* Frontend */}
            <div className="bg-slate-800/50 backdrop-blur border border-cyan-400/20 rounded-xl p-4 md:p-6 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">🖥️</div>
                <h3 className="text-cyan-400 font-bold mb-3 md:mb-4 text-sm md:text-base">Frontend</h3>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                  {skills.filter(s => s.category === 'frontend').map(skill => (
                    <li key={skill.id} className="hover:text-white transition-colors duration-200">{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-slate-800/50 backdrop-blur border border-purple-400/20 rounded-xl p-4 md:p-6 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">⚙️</div>
                <h3 className="text-purple-400 font-bold mb-3 md:mb-4 text-sm md:text-base">Backend</h3>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                  {skills.filter(s => s.category === 'backend').map(skill => (
                    <li key={skill.id} className="hover:text-white transition-colors duration-200">{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Database */}
            <div className="bg-slate-800/50 backdrop-blur border border-green-400/20 rounded-xl p-4 md:p-6 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">🗄️</div>
                <h3 className="text-green-400 font-bold mb-3 md:mb-4 text-sm md:text-base">Database</h3>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                  {skills.filter(s => s.category === 'database').map(skill => (
                    <li key={skill.id} className="hover:text-white transition-colors duration-200">{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Server */}
            <div className="bg-slate-800/50 backdrop-blur border border-blue-400/20 rounded-xl p-4 md:p-6 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">☁️</div>
                <h3 className="text-blue-400 font-bold mb-3 md:mb-4 text-sm md:text-base">Server</h3>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                  {skills.filter(s => s.category === 'server').map(skill => (
                    <li key={skill.id} className="hover:text-white transition-colors duration-200">{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Others */}
            <div className="bg-slate-800/50 backdrop-blur border border-orange-400/20 rounded-xl p-4 md:p-6 hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105 sm:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="text-2xl md:text-3xl mb-3 md:mb-4">🛠️</div>
                <h3 className="text-orange-400 font-bold mb-3 md:mb-4 text-sm md:text-base">Lainnya</h3>
                <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
                  {skills.filter(s => !['frontend','backend','database','server'].includes(s.category)).map(skill => (
                    <li key={skill.id} className="hover:text-white transition-colors duration-200">{skill.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline - Responsive */}
      <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-purple-400/20"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4 md:mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Professional Experience
              </span>
            </h2>
          </div>

          {/* Experience Cards - Responsive Stack */}
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            {/* Senior Fullstack Developer */}
            <div className="bg-slate-800/50 backdrop-blur border border-cyan-400/20 rounded-xl p-6 md:p-8 hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white mx-auto sm:mx-0">
                    🚀
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Senior Fullstack Developer</h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3 md:mb-4">
                    <span className="text-cyan-400 font-semibold">PT. Telkom Indonesia</span>
                    <span className="text-xs sm:text-sm bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">Contract-Based</span>
                  </div>
                  <div className="text-sm text-slate-400 mb-3 md:mb-4">Jan 2017 - Present (8+ years) • 📍 Jakarta, Indonesia</div>
                  <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4 md:mb-6">
                    Memimpin pengembangan dan maintenance sistem enterprise <strong className="text-cyan-400">EPIC (Pipeline Management System)</strong> yang menjadi data-hub utama untuk berbagai divisi perusahaan. Bertanggung jawab atas integrasi dengan 15+ aplikasi internal dan eksternal.
                  </p>
                  
                  {/* Key Achievements - Responsive Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✅</span>
                      <span className="text-slate-300"><strong className="text-white">15+</strong> enterprise integrations</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✅</span>
                      <span className="text-slate-300"><strong className="text-white">98%</strong> data accuracy</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✅</span>
                      <span className="text-slate-300"><strong className="text-white">40hrs</strong> weekly time saved</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-green-400">✅</span>
                      <span className="text-slate-300"><strong className="text-white">30%</strong> faster delivery</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Projects & R&D */}
            <div className="bg-slate-800/50 backdrop-blur border border-purple-400/20 rounded-xl p-6 md:p-8 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-[1.02]">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6">
                <div className="flex-shrink-0 text-center sm:text-left">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white mx-auto sm:mx-0">
                    🧪
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">Personal Projects & R&D</h3>
                  <div className="text-purple-400 font-semibold mb-2">Tech Enthusiast & Open Source Contributor</div>
                  <div className="text-sm text-slate-400 mb-3 md:mb-4">2020 - Present</div>
                  
                  {/* Tech Stack - Responsive */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 text-sm">
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-2">🔥 Modern Web</h4>
                      <ul className="text-slate-300 space-y-1">
                        <li>React.js & Next.js</li>
                        <li>React Native & Flutter</li>
                        <li>Svelte</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-green-400 font-semibold mb-2">☁️ Cloud & Backend</h4>
                      <ul className="text-slate-300 space-y-1">
                        <li>AWS & GCP</li>
                        <li>Firebase & Supabase</li>
                        <li>MongoDB</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-orange-400 font-semibold mb-2">🤖 AI Integration</h4>
                      <ul className="text-slate-300 space-y-1">
                        <li>AI API Integration</li>
                        <li>Clean Code Practices</li>
                        <li>Message Broker</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 