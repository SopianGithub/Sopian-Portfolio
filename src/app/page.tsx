import PersonalBranding from '@/components/PersonalBranding'
import ShowcaseProjects from '@/components/ShowcaseProjects'
import Navbar from '@/components/layout/Navbar'
import ErrorMessage from '@/components/ErrorMessage'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Error Message */}
      <ErrorMessage />
      {/* Enhanced Space Environment */}
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        
        {/* Subtle Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="space-particle absolute top-20 right-10 animate-float-gentle"></div>
          <div className="space-particle large absolute bottom-20 left-10 animate-float-gentle" style={{animationDelay: '2s'}}></div>
          <div className="space-particle glow absolute top-1/2 right-20 animate-pulse-soft" style={{animationDelay: '4s'}}></div>
          <div className="space-particle absolute bottom-32 right-32 animate-float-gentle" style={{animationDelay: '1s'}}></div>
          <div className="space-particle glow absolute top-32 left-32 animate-pulse-soft" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Sofyan Solutions
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

      <div className="relative z-20">
        {/* Personal Branding Section */}
        <div id="profile-section">
          <PersonalBranding />
        </div>
        
        {/* Projects Showcase Section */}
        <div id="projects">
          <ShowcaseProjects />
        </div>
      </div>
    </div>
  )
}
