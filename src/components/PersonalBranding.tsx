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
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin text-6xl mb-4">🚀</div>
            <p className="text-muted">Loading Personal Branding...</p>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-6">
              {needsMigration ? '🛠️' : '⚠️'}
            </div>
            
            <h3 className="text-2xl font-bold heading-secondary mb-4">
              {needsMigration ? 'Database Setup Required' : 'Connection Error'}
            </h3>
            
            <p className="text-muted mb-6 leading-relaxed">{error}</p>
            
            {needsMigration ? (
              <div className="component-card p-6 text-left mb-6">
                <h4 className="text-accent font-semibold mb-4">🚀 Quick Setup Steps:</h4>
                <ol className="text-sm text-muted space-y-2 list-decimal list-inside">
                  <li>Open your <strong className="text-accent">Supabase Dashboard</strong></li>
                  <li>Go to <strong className="text-accent">SQL Editor</strong></li>
                  <li>Copy & paste content from <code className="bg-slate-800 px-2 py-1 rounded text-cyan-400">database-migration.sql</code></li>
                  <li>Click <strong className="text-accent">Run</strong> button</li>
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
                className="holo-btn px-8 py-4 mb-4"
              >
                {isInjecting ? '🔄 Injecting...' : '🚀 Auto-Import LinkedIn Data'}
              </button>
            )}
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={fetchData}
                className="secondary-btn px-6 py-3"
              >
                🔄 Retry Connection
              </button>
              
              {needsMigration && (
                <a 
                  href="https://app.supabase.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="holo-btn px-6 py-3"
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
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Astronaut & Moon */}
        <div className="absolute left-0 bottom-0 z-10 w-[420px] max-w-[45vw] pointer-events-none select-none">
          <Image
            src="/images/assets/satelit2.png"
            alt="Moon"
            width={420}
            height={550}
            priority
            className="floating-moon"
          />
          <div className="absolute left-[30px] bottom-[50px] w-[220px]">
            <Image
              src="/images/assets/astronaut2.png"
              alt="Astronaut"
              width={520}
              height={520}
              className="floating-astronaut"
            />
          </div>
        </div>
        {/* Main Content */}
        <div className="relative z-20 max-w-3xl ml-auto mr-0 px-8 py-16 fade-in-up">
          <div className="flex justify-center md:justify-start mb-6">
            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 p-[3px] shadow-xl">
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
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white drop-shadow-lg heading-primary">
            {personalInfo.name}
          </h2>
          <p className="text-lg text-slate-200 mb-8 max-w-2xl">
            {personalInfo.summary}
          </p>
        </div>
        {/* Optional: Star background effect */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Tambahkan efek bintang di sini jika ingin */}
        </div>
      </section>

      {/* Cockpit Skills Section terpisah */}
      <section className="relative z-30 py-16">
        <header className="text-center mb-16 mt-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-6">
            <span className="text-cyan-400 animate-pulse-soft">⚡</span>
            <span className="text-accent font-medium">TECHNICAL ARSENAL</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black mb-6">
            <span className="heading-primary">Skills & Technologies</span>
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
            My comprehensive technical expertise across various domains, 
            powering missions from Earth to the digital cosmos.
          </p>
        </header>
        <div className="cockpit-skills-container">
          <div className="cockpit-panel">
            <div className="cockpit-monitor frontend">
              <div className="cockpit-title">🖥️ Frontend</div>
              <ul>
                {skills.filter(s => s.category === 'frontend').map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className="cockpit-monitor backend">
              <div className="cockpit-title">⚙️ Backend</div>
              <ul>
                {skills.filter(s => s.category === 'backend').map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className="cockpit-monitor database">
              <div className="cockpit-title">🗄️ Database</div>
              <ul>
                {skills.filter(s => s.category === 'database').map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className="cockpit-monitor server">
              <div className="cockpit-title">☁️ Server</div>
              <ul>
                {skills.filter(s => s.category === 'server').map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
            <div className="cockpit-monitor other">
              <div className="cockpit-title">🛠️ Lainnya</div>
              <ul>
                {skills.filter(s => !['frontend','backend','database','server'].includes(s.category)).map(skill => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Galaxy Experiences Section */}
      <section className="galaxy-experiences-section">
        <div className="galaxy-bg"></div>
        <div className="galaxy-timeline">
          {data.experience.map((exp, idx) => (
            <div className="galaxy-planet" key={exp.id} style={{ left: `${15 + idx * (70/(data.experience.length-1||1))}%` }}>
              <div className="planet-card">
                <h4>{exp.title}</h4>
                <p>{exp.company}</p>
                <span>{exp.start_date} - {exp.end_date || 'Present'}</span>
              </div>
            </div>
          ))}
          <Image src="/images/assets/astronaut2.png" className="galaxy-astronaut" alt="Astronaut" width={300} height={300} />
        </div>
      </section>

      {/* Professional Experience Detail Section */}
      <section className="exp-detail-section">
        <div className="stars-bg"></div>
        <div className="container mx-auto px-4 py-24 relative z-10">
          <h2 className="text-4xl font-black text-center mb-16 text-white py-4 heading-primary">
            Professional Experience
          </h2>

          {/* Senior Fullstack Developer Cockpit */}
          <div className="cockpit-exp-container mb-20">
            <div className="cockpit-exp-panel">
              {/* Main Role Monitor */}
              <div className="cockpit-monitor main-role">
                <div className="cockpit-title">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🚀</span>
                    <span>Senior Fullstack Developer</span>
                  </div>
                </div>
                
                <div className="role-info">
                  <div className="company-info">
                    <span className="company-name">PT. Telkom Indonesia</span>
                    <span className="badge">Contract-Based</span>
                  </div>
                  <div className="duration">Jan 2017 - Present (8+ years)</div>
                  <div className="location">📍 Jakarta, Indonesia</div>
                </div>
                
                <div className="role-description">
                  Memimpin pengembangan dan maintenance sistem enterprise <strong>EPIC (Pipeline Management System)</strong> yang menjadi data-hub utama untuk berbagai divisi perusahaan. Bertanggung jawab atas integrasi dengan 15+ aplikasi internal dan eksternal.
                </div>
              </div>

              {/* System Architecture Monitor */}
              <div className="cockpit-monitor architecture-panel">
                <div className="cockpit-title">🏗️ System Architecture & Integration</div>
                <div className="time-period">2017-2025</div>
                <ul className="cockpit-list">
                  <li>Mengembangkan <strong>EPIC sebagai central data-hub</strong> yang mengintegrasikan 15+ aplikasi enterprise</li>
                  <li>Meningkatkan performa database Oracle melalui troubleshooting dan optimasi server</li>
                  <li>Berhasil mengintegrasikan sistem dengan REST API untuk order management dan billing automation</li>
                  <li>Membangun multiple <strong>dashboard systems</strong> untuk monitoring revenue, performance, dan operational metrics</li>
                </ul>
              </div>

              {/* Business Impact Monitor */}
              <div className="cockpit-monitor impact-panel">
                <div className="cockpit-title">💰 Business Impact</div>
                <ul className="cockpit-list">
                  <li>Mengotomatisasi <strong>billing dan invoicing process</strong> yang menghemat 40+ jam manual work/minggu</li>
                  <li>Meningkatkan <strong>data accuracy</strong> dari 85% ke 98% melalui validation system</li>
                  <li>Mengurangi <strong>project delivery time</strong> 30% dengan pipeline management automation</li>
                  <li>Mengimplementasi <strong>risk assessment system</strong> untuk project evaluation</li>
                </ul>
              </div>

              {/* Technical Evolution Monitor */}
              <div className="cockpit-monitor evolution-panel">
                <div className="cockpit-title">📈 Technical Evolution</div>
                <div className="evolution-timeline">
                  <div className="timeline-item">
                    <span className="year">2017-2019</span>
                    <span className="tech">Corporate portal development, Oracle-based systems</span>
                  </div>
                  <div className="timeline-item">
                    <span className="year">2019-2021</span>
                    <span className="tech">API integrations, microservices architecture</span>
                  </div>
                  <div className="timeline-item">
                    <span className="year">2021-2023</span>
                    <span className="tech">Advanced dashboard development, data visualization</span>
                  </div>
                  <div className="timeline-item">
                    <span className="year">2023-Present</span>
                    <span className="tech">Modern tech stack integration, AI-powered features</span>
                  </div>
                </div>
              </div>

              {/* Technology Stack Monitor */}
              <div className="cockpit-monitor tech-stack-panel">
                <div className="cockpit-title">💻 Technology Stack</div>
                <div className="tech-grid">
                  <div className="tech-category">
                    <h5>Backend</h5>
                    <p>Oracle Database, REST API, Microservices, Message Broker</p>
                  </div>
                  <div className="tech-category">
                    <h5>Frontend</h5>
                    <p>JavaScript, Dashboard Development, Data Visualization</p>
                  </div>
                  <div className="tech-category">
                    <h5>Integration</h5>
                    <p>Multiple enterprise applications, billing systems, document management</p>
                  </div>
                  <div className="tech-category">
                    <h5>Infrastructure</h5>
                    <p>Oracle Server, Database Performance Optimization</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Projects & R&D Cockpit */}
          <div className="cockpit-exp-container">
            <div className="cockpit-exp-panel">
              {/* Main R&D Monitor */}
              <div className="cockpit-monitor main-rd">
                <div className="cockpit-title">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧪</span>
                    <span>Personal Projects & R&D</span>
                  </div>
                </div>
                
                <div className="rd-info">
                  <div className="role-title">Tech Enthusiast & Open Source Contributor</div>
                  <div className="duration">2020 - Present</div>
                </div>
              </div>

              {/* Modern Web Development Monitor */}
              <div className="cockpit-monitor web-dev-panel">
                <div className="cockpit-title">🔥 Modern Web Development</div>
                <ul className="cockpit-list">
                  <li><strong>React.js & Next.js</strong>: Building responsive web applications</li>
                  <li><strong>React Native & Flutter</strong>: Cross-platform mobile development</li>
                  <li><strong>Svelte</strong>: Exploring modern frontend frameworks</li>
                </ul>
              </div>

              {/* Cloud & Backend Monitor */}
              <div className="cockpit-monitor cloud-panel">
                <div className="cockpit-title">☁️ Cloud & Backend</div>
                <ul className="cockpit-list">
                  <li><strong>AWS & GCP</strong>: Cloud infrastructure and serverless functions</li>
                  <li><strong>Firebase & Supabase</strong>: Backend-as-a-Service implementation</li>
                  <li><strong>MongoDB</strong>: NoSQL database management</li>
                </ul>
              </div>

              {/* AI Integration Monitor */}
              <div className="cockpit-monitor ai-panel">
                <div className="cockpit-title">🤖 AI Integration & Innovation</div>
                <ul className="cockpit-list">
                  <li><strong>AI API Integration</strong>: GitHub repositories with AI-powered features</li>
                  <li><strong>Clean Code Practices</strong>: Refactoring legacy systems</li>
                  <li><strong>Message Broker</strong>: Implementing asynchronous communication patterns</li>
                </ul>
              </div>

              {/* Professional Highlights Monitor */}
              <div className="cockpit-monitor highlights-panel">
                <div className="cockpit-title">🏆 Professional Highlights</div>
                <ul className="cockpit-list">
                  <li><strong>8+ years</strong> continuous professional development</li>
                  <li><strong>15+ enterprise integrations</strong> successfully delivered</li>
                  <li><strong>Multiple dashboard systems</strong> serving different business units</li>
                  <li><strong>Proven track record</strong> in system modernization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-30px); }
          100% { transform: translateY(0px); }
        }
        @keyframes floatingMoon {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(20px) scale(1.03); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .floating-astronaut {
          animation: floating 4s ease-in-out infinite;
          will-change: transform;
        }
        .floating-moon {
          animation: floatingMoon 6s ease-in-out infinite;
          will-change: transform;
        }
        .fade-in-up {
          animation: fadeInUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .cockpit-skills-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 48px 0;
          perspective: 1200px;
        }
        .cockpit-panel {
          display: flex;
          gap: 24px;
          background: #181f2a;
          border-radius: 32px;
          box-shadow: 0 0 60px #00eaff33, 0 0 0 4px #223344;
          padding: 40px 32px;
          transform: rotateX(8deg);
        }
        .cockpit-monitor {
          background: linear-gradient(160deg, #232b3a 80%, #1a2230 100%);
          border-radius: 18px;
          box-shadow: 0 0 24px #00eaff55, 0 0 0 2px #00eaff44;
          min-width: 170px;
          padding: 18px 16px 16px 16px;
          margin: 0 4px;
          transform: rotateY(-6deg) skewY(-2deg);
          position: relative;
          color: #e0f7fa;
          font-family: 'Share Tech Mono', monospace;
        }
        .cockpit-title {
          font-size: 1.1rem;
          font-weight: bold;
          color: #00eaff;
          margin-bottom: 10px;
          letter-spacing: 1px;
          text-shadow: 0 0 8px #00eaff99;
          border-bottom: 1px solid #00eaff44;
          padding-bottom: 4px;
        }
        .cockpit-monitor ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .cockpit-monitor li {
          margin-bottom: 7px;
          font-size: 1rem;
          padding-left: 14px;
          position: relative;
        }
        .cockpit-monitor li:before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #00eaff;
          border-radius: 50%;
          margin-right: 8px;
          box-shadow: 0 0 6px #00eaff99;
          position: absolute;
          left: 0;
          top: 7px;
        }
        /* Galaxy Experiences Styles */
        .galaxy-experiences-section {
          position: relative;
          min-height: 500px;
          padding: 80px 0 120px 0;
          overflow: hidden;
          background: radial-gradient(ellipse at 60% 40%, #232b3a 60%, #0a0f1a 100%);
        }
        .galaxy-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: transparent;
          pointer-events: none;
        }
        .galaxy-bg:before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-radial-gradient(circle at 60% 40%, #fff2 0 1px, transparent 1px 100px),
                      repeating-radial-gradient(circle at 30% 70%, #fff1 0 1px, transparent 1px 120px);
          opacity: 0.5;
          z-index: 1;
        }
        .galaxy-timeline {
          position: relative;
          z-index: 2;
          width: 90%;
          margin: 0 auto;
          height: 320px;
        }
        .galaxy-timeline:before {
          content: '';
          position: absolute;
          top: 50%;
          left: 5%;
          width: 90%;
          height: 4px;
          background: linear-gradient(90deg, #00eaff55 0%, #8b5cf6 100%);
          border-radius: 2px;
          box-shadow: 0 0 24px #00eaff55;
          z-index: 1;
        }
        .galaxy-planet {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          z-index: 2;
          animation: planetFloat 4s ease-in-out infinite;
        }
        @keyframes planetFloat {
          0% { transform: translateY(-50%) scale(1);}
          50% { transform: translateY(-60%) scale(1.08);}
          100% { transform: translateY(-50%) scale(1);}
        }
        .planet-card {
          background: linear-gradient(135deg, #232b3a 80%, #1a2230 100%);
          border-radius: 50%;
          min-width: 120px;
          min-height: 120px;
          max-width: 180px;
          max-height: 180px;
          box-shadow: 0 0 32px #00eaff55, 0 0 0 4px #8b5cf655;
          color: #e0f7fa;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 18px 12px;
          text-align: center;
          font-family: 'Share Tech Mono', monospace;
          border: 2px solid #00eaff44;
        }
        .planet-card h4 {
          font-size: 1.1rem;
          color: #00eaff;
          margin-bottom: 6px;
          font-weight: bold;
          text-shadow: 0 0 8px #00eaff99;
        }
        .planet-card p {
          font-size: 0.95rem;
          color: #8b5cf6;
          margin-bottom: 4px;
        }
        .planet-card span {
          font-size: 0.85rem;
          color: #e0f7fa99;
        }
        .galaxy-astronaut {
          position: absolute;
          right: 10vw;
          bottom: -40px;
          width: 160px;
          z-index: 3;
          animation: astronautFloat 5s ease-in-out infinite;
        }
        @keyframes astronautFloat {
          0% { transform: translateY(0);}
          50% { transform: translateY(-30px);}
          100% { transform: translateY(0);}
        }

        /* Professional Experience Detail Styles */
        .exp-detail-section {
          position: relative;
          background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%);
          overflow: hidden;
          padding-top: 50px;
        }

        .stars-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          background-image: 
            radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite;
          opacity: 0.5;
        }

        @keyframes twinkle {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }

        .space-card {
          background: rgba(23, 25, 35, 0.9);
          border: 1px solid rgba(131, 146, 255, 0.15);
          border-radius: 16px;
          padding: 2rem;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 32px rgba(0, 234, 255, 0.1);
          margin-bottom: 2rem;
        }

        .space-card-header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(131, 146, 255, 0.15);
        }

        .badge {
          background: rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #00eaff;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .space-section {
          margin-bottom: 2rem;
        }

        .achievement-card {
          background: rgba(23, 25, 35, 0.5);
          border-radius: 12px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .tech-card {
          background: rgba(23, 25, 35, 0.5);
          border-radius: 12px;
          padding: 1rem;
          h5 {
            margin-bottom: 0.5rem;
          }
          p {
            color: #e0f7fa;
            font-size: 0.9rem;
          }
        }

        .space-section ul {
          list-style: none;
          padding: 0;
          margin: 0;
          color: #e0f7fa;
        }

        .space-section ul li {
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        /* Cockpit Experience Styles */
        .cockpit-exp-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 48px 0;
          perspective: 1200px;
        }
        
        .cockpit-exp-panel {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          grid-template-rows: auto auto auto;
          gap: 20px;
          background: #181f2a;
          border-radius: 24px;
          box-shadow: 0 0 40px #00eaff33, 0 0 0 3px #223344;
          padding: 24px;
          transform: rotateX(5deg);
          max-width: 1200px;
          width: 100%;
        }
        
        .cockpit-exp-panel .cockpit-monitor {
          background: linear-gradient(160deg, #232b3a 80%, #1a2230 100%);
          border-radius: 16px;
          box-shadow: 0 0 20px #00eaff55, 0 0 0 2px #00eaff44;
          padding: 16px 14px 14px 14px;
          position: relative;
          color: #e0f7fa;
          font-family: 'Share Tech Mono', monospace;
          min-height: 120px;
        }
        
        .cockpit-monitor.main-role {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          transform: rotateY(-2deg) skewY(-0.5deg);
        }
        
        .cockpit-monitor.architecture-panel {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          transform: rotateY(2deg) skewY(0.5deg);
        }
        
        .cockpit-monitor.impact-panel {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
          transform: rotateY(3deg) skewY(0.8deg);
        }
        
        .cockpit-monitor.evolution-panel {
          grid-column: 1 / 3;
          grid-row: 2 / 3;
          transform: rotateY(-1deg) skewY(-0.3deg);
        }
        
        .cockpit-monitor.tech-stack-panel {
          grid-column: 3 / 4;
          grid-row: 2 / 3;
          transform: rotateY(1deg) skewY(0.3deg);
        }
        
        .cockpit-monitor.main-rd {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          transform: rotateY(-2deg) skewY(-0.5deg);
        }
        
        .cockpit-monitor.web-dev-panel {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          transform: rotateY(2deg) skewY(0.5deg);
        }
        
        .cockpit-monitor.cloud-panel {
          grid-column: 3 / 4;
          grid-row: 1 / 2;
          transform: rotateY(3deg) skewY(0.8deg);
        }
        
        .cockpit-monitor.ai-panel {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
          transform: rotateY(-1deg) skewY(-0.3deg);
        }
        
        .cockpit-monitor.highlights-panel {
          grid-column: 2 / 4;
          grid-row: 2 / 3;
          transform: rotateY(1deg) skewY(0.3deg);
        }
        
        .role-info {
          margin-bottom: 12px;
        }
        
        .company-info {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }
        
        .company-name {
          color: #8b5cf6;
          font-weight: 600;
          font-size: 0.95rem;
        }
        
        .badge {
          background: rgba(139, 92, 246, 0.2);
          color: #8b5cf6;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 0.75rem;
          border: 1px solid #8b5cf644;
        }
        
        .duration {
          color: #e0f7fa99;
          font-size: 0.85rem;
          margin-bottom: 4px;
        }
        
        .location {
          color: #e0f7fa99;
          font-size: 0.85rem;
        }
        
        .role-description {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #e0f7fa;
        }
        
        .time-period {
          color: #ffd700;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 8px;
          text-shadow: 0 0 4px #ffd70099;
        }
        
        .evolution-timeline {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .timeline-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding: 6px 0;
        }
        
        .year {
          color: #00eaff;
          font-weight: 600;
          font-size: 0.8rem;
          min-width: 80px;
          text-shadow: 0 0 4px #00eaff99;
        }
        
        .tech {
          color: #e0f7fa;
          font-size: 0.85rem;
          line-height: 1.4;
        }
        
        .tech-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 8px;
        }
        
        .tech-category {
          background: rgba(0, 234, 255, 0.1);
          border-radius: 6px;
          padding: 8px;
          border: 1px solid #00eaff33;
        }
        
        .tech-category h5 {
          color: #8b5cf6;
          font-size: 0.8rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        
        .tech-category p {
          color: #e0f7fa;
          font-size: 0.75rem;
          line-height: 1.3;
        }
        
        .rd-info {
          margin-bottom: 12px;
        }
        
        .role-title {
          color: #8b5cf6;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 6px;
        }
        
        /* Responsive adjustments for experience cockpit */
        @media (max-width: 1024px) {
          .cockpit-exp-panel {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto;
            gap: 16px;
            padding: 16px;
          }
          
          .cockpit-exp-panel .cockpit-monitor {
            grid-column: 1 / 2 !important;
            grid-row: auto !important;
            transform: rotateY(0deg) skewY(0deg) !important;
          }
          
          .cockpit-monitor.evolution-panel,
          .cockpit-monitor.highlights-panel {
            grid-column: 1 / 3 !important;
          }
        }
        
        @media (max-width: 768px) {
          .cockpit-exp-panel {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 16px;
            padding: 16px;
          }
          
          .cockpit-exp-panel .cockpit-monitor {
            grid-column: 1 / 2 !important;
            grid-row: auto !important;
            transform: rotateY(0deg) skewY(0deg) !important;
          }
          
          .cockpit-monitor.evolution-panel,
          .cockpit-monitor.highlights-panel {
            grid-column: 1 / 2 !important;
          }
        }
        
        /* Hover effects for experience cockpit */
        .cockpit-exp-panel .cockpit-monitor:hover {
          box-shadow: 0 0 30px #00eaff77, 0 0 0 2px #00eaff66;
          transform: rotateY(-1deg) skewY(-0.5deg) scale(1.02);
          transition: all 0.3s ease;
        }
        
        .cockpit-monitor.main-role:hover {
          transform: rotateY(-1deg) skewY(-0.3deg) scale(1.02);
        }
        
        .cockpit-monitor.architecture-panel:hover {
          transform: rotateY(1deg) skewY(0.3deg) scale(1.02);
        }
        
        .cockpit-monitor.impact-panel:hover {
          transform: rotateY(2deg) skewY(0.6deg) scale(1.02);
        }
        
        .cockpit-monitor.evolution-panel:hover {
          transform: rotateY(-0.5deg) skewY(-0.2deg) scale(1.02);
        }
        
        .cockpit-monitor.tech-stack-panel:hover {
          transform: rotateY(0.5deg) skewY(0.2deg) scale(1.02);
        }
        
        .cockpit-monitor.main-rd:hover {
          transform: rotateY(-1deg) skewY(-0.3deg) scale(1.02);
        }
        
        .cockpit-monitor.web-dev-panel:hover {
          transform: rotateY(1deg) skewY(0.3deg) scale(1.02);
        }
        
        .cockpit-monitor.cloud-panel:hover {
          transform: rotateY(2deg) skewY(0.6deg) scale(1.02);
        }
        
        .cockpit-monitor.ai-panel:hover {
          transform: rotateY(-0.5deg) skewY(-0.2deg) scale(1.02);
        }
        
        .cockpit-monitor.highlights-panel:hover {
          transform: rotateY(0.5deg) skewY(0.2deg) scale(1.02);
        }
      `}</style>
    </main>
  )
} 