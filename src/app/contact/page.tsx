'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  message: string
}

interface ApiResponse {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data: ApiResponse = await response.json()

      if (data.success) {
        setSubmitStatus({
          type: 'success',
          message: data.message
        })
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: '',
          budget: '',
          message: ''
        })
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.message || 'Transmission failed. Please try again.'
        })
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Satellite connection error. Please check your connection and try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Enhanced Space Environment */}
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="space-particle absolute top-20 left-20 animate-float-gentle"></div>
          <div className="space-particle large absolute top-40 right-32 animate-float-gentle" style={{animationDelay: '2s'}}></div>
          <div className="space-particle glow absolute bottom-32 left-16 animate-pulse-soft" style={{animationDelay: '1s'}}></div>
          <div className="space-particle absolute bottom-20 right-20 animate-float-gentle" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="container mx-auto px-4" style={{ marginTop: "7%" }}>
          {/* Header Content - Centered */}
          <div className="text-center mb-16 relative z-10">
            <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-6">
              <span className="text-2xl animate-pulse-soft">📡</span>
              <span className="text-cyan-300 font-medium">Mission Control Center</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8">
              <span className="heading-secondary">Let&apos;s Connect</span>
              <br />
              <span className="heading-primary">Across the Galaxy</span>
            </h1>
            
            <p className="text-xl text-cyan-300 leading-relaxed max-w-3xl mx-auto mb-12">
              Ready to launch your next digital mission? Send a transmission to our space station 
              and let&apos;s explore the infinite possibilities together.
            </p>
          </div>

          {/* Satellite Visual - Centered with proper spacing */}
          <div className="flex justify-center mb-20 relative z-contain">
            <div className="relative w-96 h-96 flex items-center justify-center">
              {/* Orbit Ring - Properly sized and positioned */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 border border-cyan-500/20 rounded-full animate-spin-slow"></div>
              </div>
              
              {/* Signal Waves - Smoother animations */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-2 border-cyan-500/40 rounded-full animate-signal-pulse"></div>
                <div className="absolute w-48 h-48 border border-blue-500/30 rounded-full animate-signal-pulse" style={{animationDelay: '0.8s'}}></div>
                <div className="absolute w-64 h-64 border border-purple-500/20 rounded-full animate-signal-pulse" style={{animationDelay: '1.6s'}}></div>
              </div>
              
              {/* Satellite Image - Center positioned */}
              <div className="relative z-20">
                <Image
                  src="/images/assets/satelit-real-big.png"
                  alt="Satellite Communication"
                  width={280}
                  height={280}
                  className="animate-satellite-float drop-shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Contact Info Cards - Centered Grid */}
          <div className="max-w-4xl mx-auto mb-20">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="stats-card group text-center">
                <div className="flex flex-col items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center text-3xl animate-pulse-soft">
                    📧
                  </div>
                  <div>
                    <h3 className="heading-secondary text-lg mb-1">Space Mail</h3>
                    <p className="text-muted text-sm">Direct transmission</p>
                  </div>
                </div>
                <a href="mailto:yayansopiant@gmail.com" className="text-cyan-300 hover:text-cyan-200 transition-colors font-mono text-sm">
                  yayansopiant@gmail.com
                </a>
              </div>

              <div className="stats-card group text-center">
                <div className="flex flex-col items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-3xl animate-pulse-soft">
                    📱
                  </div>
                  <div>
                    <h3 className="heading-secondary text-lg mb-1">Satellite Phone</h3>
                    <p className="text-muted text-sm">Emergency contact</p>
                  </div>
                </div>
                <a href="tel:+6285342422507" className="text-cyan-300 hover:text-cyan-200 transition-colors font-mono text-sm">
                  +62 853-4242-2507
                </a>
              </div>

              <div className="stats-card group text-center">
                <div className="flex flex-col items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center text-3xl animate-pulse-soft">
                    🌍
                  </div>
                  <div>
                    <h3 className="heading-secondary text-lg mb-1">Ground Station</h3>
                    <p className="text-muted text-sm">Physical coordinates</p>
                  </div>
                </div>
                <p className="text-cyan-300 font-mono text-sm">Jakarta, Indonesia • UTC+7</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-6">
                <span className="heading-secondary">Transmit Your</span>
                <br />
                <span className="heading-primary">Mission Brief</span>
              </h2>
              <p className="text-xl text-cyan-300 leading-relaxed max-w-2xl mx-auto">
                Fill out the form below and our mission specialists will respond within 24 hours.
              </p>
            </div>

            <div className="component-card p-8 md:p-12">
              {/* Success/Error Messages */}
              {submitStatus.type && (
                <div className={`mb-8 p-4 rounded-lg border ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-500/10 border-green-500/20 text-green-300' 
                    : 'bg-red-500/10 border-red-500/20 text-red-300'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {submitStatus.type === 'success' ? '✅' : '⚠️'}
                    </span>
                    <p className="font-medium">{submitStatus.message}</p>
                  </div>
                </div>
              )}

              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="name" className="block text-sm font-medium text-cyan-300">
                      👨‍🚀 Commander Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-slate-400"
                      placeholder="Enter your name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="email" className="block text-sm font-medium text-cyan-300">
                      📡 Communication Channel *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-slate-400"
                      placeholder="your.email@galaxy.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label htmlFor="company" className="block text-sm font-medium text-cyan-300">
                      🏢 Space Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="form-input w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-slate-400"
                      placeholder="Company/Organization name"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="projectType" className="block text-sm font-medium text-cyan-300">
                      🚀 Mission Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      className="form-input w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white"
                      required
                      disabled={isSubmitting}
                    >
                      <option value="">Select mission type</option>
                      <option value="web-development">🌐 Web Development</option>
                      <option value="mobile-app">📱 Mobile Application</option>
                      <option value="ecommerce">🛒 E-commerce Platform</option>
                      <option value="cms">📝 CMS Development</option>
                      <option value="api">⚡ API Development</option>
                      <option value="consultation">💡 Technical Consultation</option>
                      <option value="other">🔧 Other</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <label htmlFor="budget" className="block text-sm font-medium text-cyan-300">
                    💰 Mission Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white"
                    disabled={isSubmitting}
                  >
                    <option value="">Select budget range</option>
                    <option value="under-5m">Under $5,000</option>
                    <option value="5m-10m">$5,000 - $10,000</option>
                    <option value="10m-25m">$10,000 - $25,000</option>
                    <option value="25m-50m">$25,000 - $50,000</option>
                    <option value="over-50m">Over $50,000</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label htmlFor="message" className="block text-sm font-medium text-cyan-300">
                    📋 Mission Details *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-input w-full px-4 py-4 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300 text-white placeholder-slate-400 resize-vertical"
                    placeholder="Describe your project requirements, timeline, and any specific features you need..."
                    required
                    disabled={isSubmitting}
                  ></textarea>
                </div>

                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="holo-btn px-12 py-4 text-lg font-bold inline-flex items-center gap-3 shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Transmitting...
                      </>
                    ) : (
                      <>
                        🚀 Launch Transmission
                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-20 mt-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-black mb-6">
              <span className="heading-secondary">Connect Across</span>
              <span className="heading-primary"> Multiple Channels</span>
            </h3>
            <p className="text-cyan-300 text-lg max-w-2xl mx-auto">
              Follow our space journey on various platforms and stay updated with our latest missions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <a href="https://www.linkedin.com/in/yayan-sopian-148560137" className="stats-card group text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse-soft">
                💼
              </div>
              <h4 className="heading-secondary text-lg mb-2">LinkedIn</h4>
              <p className="text-muted text-sm">Professional Network</p>
            </a>

            <a href="https://github.com/SopianGithub" className="stats-card group text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse-soft">
                💻
              </div>
              <h4 className="heading-secondary text-lg mb-2">GitHub</h4>
              <p className="text-muted text-sm">Code Repository</p>
            </a>

            <a href="https://wa.me/6285342422507" className="stats-card group text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse-soft">
                💬
              </div>
              <h4 className="heading-secondary text-lg mb-2">WhatsApp</h4>
              <p className="text-muted text-sm">Instant Communication</p>
            </a>

            <a href="#" className="stats-card group text-center hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse-soft">
                📧
              </div>
              <h4 className="heading-secondary text-lg mb-2">Newsletter</h4>
              <p className="text-muted text-sm">Space Updates</p>
            </a>
          </div>
        </div>
      </section>

      {/* Back to Home */}
      <section className="py-16 text-center relative z-10">
        <Link href="/" className="secondary-btn px-8 py-4 text-lg inline-flex items-center gap-3 hover:scale-105 transition-all duration-300">
          🏠 Return to Base
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
          </svg>
        </Link>
      </section>
    </div>
  )
} 