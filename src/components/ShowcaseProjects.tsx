'use client';

import { useState } from 'react';
import ProjectCard from './ProjectCard';
import '@/styles/project-card.css';
import '@/styles/showcase.css';
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
    <div className="feature-projets">
      <div className="stars-backdrop"></div>
      <header className="text-center mb-16">
        <div className="inline-flex items-center gap-3 px-6 py-3 component-card mb-6">
          <span className="text-cyan-400 animate-pulse-soft">🛸</span>
          <span className="text-accent font-medium">MISSION PORTFOLIO</span>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black mb-6">
          <span className="heading-primary">Featured Projects</span>
        </h2>
        <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
          Showcasing enterprise-level integrations, data visualization dashboards, 
          dan system architecture yang telah memberikan impact signifikan bagi organisasi
        </p>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 my-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${activeCategory === category.id 
                  ? 'bg-[#00D4FF] text-[#0A0F1A]' 
                  : 'bg-[#1A1F2E] text-white hover:bg-[#2A2F3E]'}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project}
            />
          ))}
        </div>
      </div>
      {/* Stats Section with Animated Counting (2x2 grid with orbit) */}
      <div className="relative flex justify-center items-center max-w-3xl mx-auto mt-40 mb-24 px-4" style={{minHeight: '600px', height: '600px', paddingTop: '60px'}}>
        {/* Orbit SVG */}
        <svg className="absolute -translate-y-1/2 z-0" width="540" height="540" viewBox="0 0 540 540" fill="none" xmlns="http://www.w3.org/2000/svg" style={{pointerEvents: 'none', position: 'absolute', left: '50%', top: '100%', transform: 'translate(-50%, -50%)'}}>
          <ellipse cx="270" cy="270" rx="240" ry="240" stroke="#4f5b7a" strokeWidth="2" strokeDasharray="10 12" fill="none" />
        </svg>
        {/* Grid 2x2 */}
        <div className="absolute -translate-x-1/2 -translate-y-1/2 z-10 grid grid-cols-2 grid-rows-2 gap-24 w-[540px] h-[540px] place-items-center" style={{pointerEvents: 'none', position: 'absolute', left: '72%', top: '100%', transform: 'translate(-50%, -50%)'}}>
          {[
            { value: 50, suffix: '+', label: 'Projects Delivered', planetType: 'rocky' as const },
            { value: 15, suffix: '+', label: 'Systems Integrated', planetType: 'gas' as const },
            { value: 8, suffix: '+', label: 'Years Experience', planetType: 'ice' as const },
            { value: 99, suffix: '%', label: 'Client Satisfaction', planetType: 'terrestrial' as const },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center justify-center">
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
  );
} 