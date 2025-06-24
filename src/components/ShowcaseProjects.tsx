'use client';

import { useState } from 'react';
import StatCard from '@/components/StatCard';

// Types
interface ProjectMetric {
  value: string;
  label: string;
}

interface ProjectFeature {
  text: string;
}

interface Project {
  id: string;
  category: string;
  isFeatured?: boolean;
  icon: string;
  iconBg: string;
  title: string;
  type: string;
  description: string;
  metrics: ProjectMetric[];
  features: ProjectFeature[];
  capabilities?: string[];
  optimizations?: string[];
  techStack?: string[];
  actions?: {
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
}

// Project Categories
const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'integration', label: 'System Integration' },
  { id: 'dashboard', label: 'Dashboard & Analytics' },
  { id: 'architecture', label: 'System Architecture' },
];

// Sample Project Data
const projects: Project[] = [
  {
    id: '1',
    category: 'integration',
    isFeatured: true,
    icon: '🔄',
    iconBg: 'from-indigo-500 to-purple-500',
    title: 'EPIC Central Integration Hub',
    type: 'ENTERPRISE SYSTEM INTEGRATION',
    description: 'Mengembangkan central data-hub yang mengintegrasikan 15+ aplikasi enterprise dalam satu ekosistem. Sistem ini menjadi backbone untuk semua operasional bisnis dari order management hingga billing automation.',
    metrics: [
      { value: '15+', label: 'Apps Integrated' },
      { value: '98%', label: 'Data Accuracy' },
      { value: '40hrs', label: 'Weekly Time Saved' },
      { value: '30%', label: 'Faster Delivery' }
    ],
    features: [
      { text: 'Real-time data synchronization across multiple systems' },
      { text: 'Automated billing and invoicing workflow' },
      { text: 'Advanced error handling and retry mechanisms' }
    ]
  },
  {
    id: '2',
    category: 'dashboard',
    icon: '📊',
    iconBg: 'from-pink-500 to-rose-500',
    title: 'Executive Revenue Dashboard',
    type: 'BUSINESS INTELLIGENCE DASHBOARD',
    description: 'Real-time dashboard untuk monitoring revenue, performance metrics, dan business KPIs. Memberikan insights actionable untuk strategic decision making di level executive.',
    metrics: [
      { value: '50+', label: 'KPIs Tracked' },
      { value: '24/7', label: 'Real-time Data' }
    ],
    features: [
      { text: 'Interactive data visualization with drill-down' },
      { text: 'Automated report generation and distribution' },
      { text: 'Mobile-responsive design for executive access' }
    ],
    capabilities: [
      'Interactive data visualization with drill-down',
      'Automated report generation and distribution',
      'Mobile-responsive design for executive access'
    ]
  },
  {
    id: '3',
    category: 'architecture',
    icon: '🏗️',
    iconBg: 'from-cyan-500 to-blue-500',
    title: 'Oracle Performance Optimization',
    type: 'DATABASE ARCHITECTURE & PERFORMANCE',
    description: 'Comprehensive database performance tuning dan server optimization yang meningkatkan response time dan mengatasi bottleneck pada high-traffic enterprise applications.',
    metrics: [
      { value: '75%', label: 'Faster Queries' },
      { value: '99.9%', label: 'Uptime' }
    ],
    features: [
      { text: 'Query optimization and index restructuring' },
      { text: 'Connection pooling and resource management' },
      { text: 'Proactive monitoring and alerting system' }
    ],
    optimizations: [
      'Query optimization and index restructuring',
      'Connection pooling and resource management',
      'Proactive monitoring and alerting system'
    ]
  },
  {
    id: '4',
    category: 'integration',
    icon: '📄',
    iconBg: 'from-green-500 to-emerald-500',
    title: 'Digital Document Review System',
    type: 'Document Management Integration',
    description: 'Automated document review dan approval workflow yang terintegrasi dengan EPIC system. Mendigitalkan proses review dokumen partnership dan contract management.',
    metrics: [
      { value: '60%', label: 'Faster Review' },
      { value: '100%', label: 'Digital Process' },
    ],
    features: [
      { text: 'Automated document routing and notifications' },
      { text: 'Digital signature integration' },
      { text: 'Audit trail and version control' },
    ],
    techStack: ['Document API', 'Workflow Engine', 'Digital Signatures', 'Audit Logging'],
    actions: {
      primary: { label: '🔄 Workflow Demo', href: '#' },
      secondary: { label: '📊 ROI Analysis', href: '#' },
    },
  },
];

export default function ShowcaseProjects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category.toLowerCase() === activeCategory.toLowerCase()
  );

  return (
    <section className="relative py-12 md:py-16 lg:py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-purple-400/10"></div>
        <div className="absolute inset-0">
          {/* Floating stars */}
          <div className="absolute top-20 left-20 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-32 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 left-40 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-0.5 h-0.5 bg-white rounded-full animate-ping"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Responsive */}
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 backdrop-blur border border-cyan-400/20 rounded-full mb-4 md:mb-6">
            <span className="text-cyan-400 animate-pulse text-lg sm:text-xl">🛸</span>
            <span className="text-cyan-400 font-medium text-sm sm:text-base">MISSION PORTFOLIO</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-4">
            Showcasing enterprise-level integrations, data visualization dashboards, 
            dan system architecture yang telah memberikan impact signifikan bagi organisasi
          </p>
        </header>

        {/* Category Filters - Responsive */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 sm:px-4 md:px-6 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id 
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg' 
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 hover:text-white border border-slate-600/50'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid - Responsive */}
        <div className="grid grid-cols-1 gap-6 md:gap-8 max-w-6xl mx-auto mb-16 md:mb-20">
          {filteredProjects.map((project) => (
            <div 
              key={project.id}
              className={`bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl md:rounded-2xl p-6 md:p-8 hover:border-cyan-400/40 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-400/10 ${
                project.isFeatured ? 'border-purple-400/40 bg-gradient-to-br from-slate-800/60 to-purple-900/20' : ''
              }`}
            >
              {/* Featured Badge */}
              {project.isFeatured && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  ⭐ Featured
                </div>
              )}

              {/* Project Header - Responsive */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:gap-6 mb-6">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${project.iconBg} rounded-xl flex items-center justify-center text-xl sm:text-2xl font-bold text-white flex-shrink-0`}>
                  {project.icon}
                </div>
                
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 md:mb-2">{project.title}</h3>
                  <p className="text-xs sm:text-sm text-purple-300 uppercase tracking-wider">{project.type}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-6 md:mb-8">
                {project.description}
              </p>

              {/* Metrics Grid - Responsive */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                {project.metrics.map((metric, index) => (
                  <div key={index} className="bg-slate-700/50 rounded-lg p-3 md:p-4 text-center">
                    <div className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features List - Responsive */}
              <div className="mb-6 md:mb-8">
                <h4 className="flex items-center gap-2 text-cyan-400 font-semibold mb-3 md:mb-4 text-sm md:text-base">
                  <span>✨</span>
                  Key Features
                </h4>
                <div className="space-y-2 md:space-y-3">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm md:text-base">
                      <span className="text-green-400 mt-0.5 flex-shrink-0">✅</span>
                      <span className="text-slate-300">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack (if available) */}
              {project.techStack && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, index) => (
                    <span key={index} className="bg-slate-700/50 text-slate-300 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border border-slate-600/50">
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Buttons (if available) */}
              {project.actions && (
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <a 
                    href={project.actions.primary.href}
                    className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base"
                  >
                    {project.actions.primary.label}
                  </a>
                  <a 
                    href={project.actions.secondary.href}
                    className="bg-slate-700/50 hover:bg-slate-600/50 border border-slate-500/50 hover:border-slate-400 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl transition-all duration-300 hover:scale-105 text-center text-sm sm:text-base"
                  >
                    {project.actions.secondary.label}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Stats Section - Adaptive Layout */}
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-slate-800/50 backdrop-blur border border-cyan-400/20 rounded-full mb-4 md:mb-6">
              <span className="text-cyan-400 animate-pulse text-lg sm:text-xl">🌟</span>
              <span className="text-cyan-400 font-medium text-sm sm:text-base">MISSION STATS</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Achievement Metrics
              </span>
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-slate-400 max-w-2xl mx-auto">
              Showcasing measurable results from our space missions and digital solutions
            </p>
          </div>

          {/* Adaptive Layout: Mobile Grid | Desktop Circular */}
          {/* Mobile & Tablet: Grid Layout */}
          <div className="block lg:hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
              {[
                { value: 50, suffix: '+', label: 'Projects Delivered', planetType: 'rocky' as const },
                { value: 99, suffix: '%', label: 'Client Satisfaction', planetType: 'terrestrial' as const },
                { value: 15, suffix: '+', label: 'Systems Integrated', planetType: 'gas' as const },
                { value: 8, suffix: '+', label: 'Years Experience', planetType: 'ice' as const },
              ].map((stat, index) => (
                <div key={index} className="flex justify-center">
                  <StatCard 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    label={stat.label} 
                    planetType={stat.planetType}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Original Circular Layout (Restored) */}
          <div className="hidden lg:block">
            <div className="relative flex justify-center items-center max-w-4xl mx-auto" style={{minHeight: '500px'}}>
              {/* Center Title */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      Mission Stats
                    </span>
                  </h3>
                  <p className="text-base text-slate-400">Achievement Metrics</p>
                </div>
              </div>

              {/* Advanced Orbital Ring System */}
              <svg className="absolute z-0" width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{pointerEvents: 'none'}}>
                {/* Main Orbital Ring with Gradient */}
                <circle cx="200" cy="200" r="180" stroke="url(#orbitGradient)" strokeWidth="2" strokeDasharray="12 8" fill="none" opacity="0.4" className="animate-spin" style={{animationDuration: '60s'}} />
                
                {/* Secondary Inner Ring */}
                <circle cx="200" cy="200" r="150" stroke="#4f5b7a" strokeWidth="1" strokeDasharray="6 4" fill="none" opacity="0.2" className="animate-spin" style={{animationDuration: '80s', animationDirection: 'reverse'}} />
                
                {/* Outer Ring */}
                <circle cx="200" cy="200" r="210" stroke="url(#outerGradient)" strokeWidth="1" strokeDasharray="4 12" fill="none" opacity="0.15" className="animate-spin" style={{animationDuration: '120s'}} />
                
                {/* Gradient Definitions */}
                <defs>
                  <linearGradient id="orbitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#06b6d4" />
                    <stop offset="50%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <linearGradient id="outerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="50%" stopColor="#06b6d4" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Stats Positioned in Circle - Original Layout */}
              <div className="absolute z-10 w-full h-full">
                {[
                  { value: 50, suffix: '+', label: 'Projects Delivered', planetType: 'rocky' as const, position: 'top-0 left-1/2 -translate-x-1/2' },
                  { value: 15, suffix: '+', label: 'Systems Integrated', planetType: 'gas' as const, position: 'top-1/2 right-0 -translate-y-1/2' },
                  { value: 8, suffix: '+', label: 'Years Experience', planetType: 'ice' as const, position: 'bottom-0 left-1/2 -translate-x-1/2' },
                  { value: 99, suffix: '%', label: 'Client Satisfaction', planetType: 'terrestrial' as const, position: 'top-1/2 left-0 -translate-y-1/2' },
                ].map((stat, index) => (
                  <div key={index} className={`absolute ${stat.position} transform`}>
                    <StatCard 
                      value={stat.value} 
                      suffix={stat.suffix} 
                      label={stat.label} 
                      planetType={stat.planetType}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 