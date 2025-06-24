import PersonalBranding from '@/components/PersonalBranding'
import ShowcaseProjects from '@/components/ShowcaseProjects'
import Navbar from '@/components/layout/Navbar'
import ErrorMessage from '@/components/ErrorMessage'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Error Message */}
      <Suspense fallback={null}>
        <ErrorMessage />
      </Suspense>
      
      {/* Enhanced Space Environment */}
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        
        {/* Responsive Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
          <div className="absolute top-20 right-10 w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60 md:w-2 md:h-2"></div>
          <div className="absolute bottom-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-40 animate-bounce" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 right-20 w-1 h-1 bg-cyan-300 rounded-full animate-ping opacity-50" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-32 right-32 w-1 h-1 bg-white rounded-full animate-pulse opacity-70" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-32 left-32 w-2 h-2 bg-purple-300 rounded-full animate-pulse opacity-30" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Responsive Design */}
      <section className="relative min-h-screen flex flex-col lg:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 py-20 lg:py-0">
        {/* Content Container - Mobile First */}
        <div className="relative z-20 w-full lg:w-1/2 xl:w-2/5 text-center lg:text-left order-2 lg:order-1">
          <div className="max-w-xl mx-auto lg:mx-0">
            {/* Title - Responsive Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 lg:mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Sofyan Solutions
              </span>
            </h1>
            
            {/* Subtitle - Responsive */}
            <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-slate-200 mb-6 lg:mb-8 leading-relaxed px-4 lg:px-0">
              I help businesses and startups build scalable, efficient, and impactful digital solutions.<br className="hidden sm:block"/>
              Ready to be your technology partner in transforming ideas into tangible products.
            </p>
            
            {/* Responsive Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start px-4 lg:px-0">
              <Link href="#projects" className="group bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                🚀 Lihat Portofolio
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link href="/contact" className="group bg-slate-800/80 hover:bg-cyan-900/50 border-2 border-cyan-400/50 hover:border-cyan-400 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                📩 Konsultasi Gratis
                <svg className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-45 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Images Container - Responsive */}
        <div className="relative w-full lg:w-1/2 xl:w-3/5 h-64 sm:h-80 md:h-96 lg:h-screen order-1 lg:order-2">
          {/* Planet - Responsive positioning */}
          <Image 
            src="/images/assets/satelit.png" 
            alt="Planet" 
            width={420} 
            height={420} 
            priority 
            className="absolute right-0 lg:right-10 xl:right-20 top-1/2 transform -translate-y-1/2 w-48 sm:w-64 md:w-80 lg:w-96 xl:w-[420px] h-auto animate-pulse opacity-80"
          />
          
          {/* Astronaut - Responsive positioning */}
          <Image 
            src="/images/assets/astronaut.png" 
            alt="Astronaut" 
            width={600} 
            height={600} 
            priority 
            className="absolute left-1/2 lg:left-10 xl:left-20 top-1/2 transform -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 w-40 sm:w-52 md:w-64 lg:w-80 xl:w-96 h-auto animate-bounce"
            style={{animationDuration: '3s'}}
          />
        </div>
      </section>

      {/* Content Sections */}
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
