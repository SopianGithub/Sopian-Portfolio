'use client';

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
  features?: ProjectFeature[];
  capabilities?: string[];
  optimizations?: string[];
}

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="cockpit-project-container">
      <div className="cockpit-project-panel">
        {/* Main Project Monitor */}
        <div className="cockpit-monitor main-project">
          <div className="cockpit-title">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg bg-gradient-to-br ${project.iconBg}`}>
                {project.icon}
              </div>
              <span>🚀 {project.title}</span>
            </div>
          </div>
          
          {project.isFeatured && (
            <div className="featured-badge">
              <span className="text-amber-400 text-xs font-medium">⭐ FEATURED</span>
            </div>
          )}
          
          <div className="project-type">{project.type}</div>
          
          <div className="project-description">
            {project.description}
          </div>
        </div>

        {/* Metrics Monitor */}
        <div className="cockpit-monitor metrics-panel">
          <div className="cockpit-title">📊 METRICS</div>
          <div className="metrics-grid">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="metric-item">
                <div className="metric-value">{metric.value}</div>
                <div className="metric-label">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Monitor */}
        {project.features && (
          <div className="cockpit-monitor features-panel">
            <div className="cockpit-title">🚀 FEATURES</div>
            <ul className="cockpit-list">
              {project.features.map((feature, idx) => (
                <li key={idx}>{feature.text}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Capabilities Monitor */}
        {project.capabilities && (
          <div className="cockpit-monitor capabilities-panel">
            <div className="cockpit-title">📋 CAPABILITIES</div>
            <ul className="cockpit-list">
              {project.capabilities.map((capability, idx) => (
                <li key={idx}>{capability}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Optimizations Monitor */}
        {project.optimizations && (
          <div className="cockpit-monitor optimizations-panel">
            <div className="cockpit-title">⚡ OPTIMIZATIONS</div>
            <ul className="cockpit-list">
              {project.optimizations.map((optimization, idx) => (
                <li key={idx}>{optimization}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <style jsx>{`
        .cockpit-project-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 32px 0;
          perspective: 1200px;
        }
        
        .cockpit-project-panel {
          display: grid;
          grid-template-columns: 2fr 1fr;
          grid-template-rows: auto auto;
          gap: 20px;
          background: #181f2a;
          border-radius: 24px;
          box-shadow: 0 0 40px #00eaff33, 0 0 0 3px #223344;
          padding: 24px;
          transform: rotateX(5deg);
          max-width: 900px;
          width: 100%;
        }
        
        .cockpit-monitor {
          background: linear-gradient(160deg, #232b3a 80%, #1a2230 100%);
          border-radius: 16px;
          box-shadow: 0 0 20px #00eaff55, 0 0 0 2px #00eaff44;
          padding: 16px 14px 14px 14px;
          transform: rotateY(-3deg) skewY(-1deg);
          position: relative;
          color: #e0f7fa;
          font-family: 'Share Tech Mono', monospace;
          min-height: 120px;
        }
        
        .cockpit-monitor.main-project {
          grid-column: 1 / 2;
          grid-row: 1 / 2;
          transform: rotateY(-2deg) skewY(-0.5deg);
        }
        
        .cockpit-monitor.metrics-panel {
          grid-column: 2 / 3;
          grid-row: 1 / 2;
          transform: rotateY(2deg) skewY(0.5deg);
        }
        
        .cockpit-monitor.features-panel {
          grid-column: 1 / 2;
          grid-row: 2 / 3;
          transform: rotateY(-1deg) skewY(-0.3deg);
        }
        
        .cockpit-monitor.capabilities-panel {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
          transform: rotateY(1deg) skewY(0.3deg);
        }
        
        .cockpit-monitor.optimizations-panel {
          grid-column: 1 / 3;
          grid-row: 3 / 4;
          transform: rotateY(0deg) skewY(0deg);
          margin-top: 20px;
        }
        
        .cockpit-title {
          font-size: 1rem;
          font-weight: bold;
          color: #00eaff;
          margin-bottom: 12px;
          letter-spacing: 1px;
          text-shadow: 0 0 8px #00eaff99;
          border-bottom: 1px solid #00eaff44;
          padding-bottom: 6px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .featured-badge {
          background: rgba(251, 191, 36, 0.2);
          border: 1px solid #fbbf24;
          border-radius: 4px;
          padding: 2px 6px;
        }
        
        .project-type {
          font-size: 0.9rem;
          color: #8b5cf6;
          margin-bottom: 8px;
          font-style: italic;
        }
        
        .project-description {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #e0f7fa;
        }
        
        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        
        .metric-item {
          text-align: center;
          padding: 8px 4px;
          background: rgba(0, 234, 255, 0.1);
          border-radius: 6px;
          border: 1px solid #00eaff33;
        }
        
        .metric-value {
          font-size: 1.1rem;
          font-weight: bold;
          color: #ffd700;
          text-shadow: 0 0 6px #ffd70099;
          margin-bottom: 2px;
        }
        
        .metric-label {
          font-size: 0.75rem;
          color: #e0f7fa99;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .cockpit-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .cockpit-list li {
          margin-bottom: 6px;
          font-size: 0.9rem;
          padding-left: 12px;
          position: relative;
          line-height: 1.4;
        }
        
        .cockpit-list li:before {
          content: '';
          display: inline-block;
          width: 5px;
          height: 5px;
          background: #00eaff;
          border-radius: 50%;
          margin-right: 6px;
          box-shadow: 0 0 4px #00eaff99;
          position: absolute;
          left: 0;
          top: 6px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .cockpit-project-panel {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 16px;
            padding: 16px;
          }
          
          .cockpit-monitor {
            grid-column: 1 / 2 !important;
            grid-row: auto !important;
            transform: rotateY(0deg) skewY(0deg) !important;
            margin-top: 0 !important;
          }
          
          .metrics-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        
        /* Hover effects */
        .cockpit-monitor:hover {
          box-shadow: 0 0 30px #00eaff77, 0 0 0 2px #00eaff66;
          transform: rotateY(-1deg) skewY(-0.5deg) scale(1.02);
          transition: all 0.3s ease;
        }
        
        .cockpit-monitor.main-project:hover {
          transform: rotateY(-1deg) skewY(-0.3deg) scale(1.02);
        }
        
        .cockpit-monitor.metrics-panel:hover {
          transform: rotateY(1deg) skewY(0.3deg) scale(1.02);
        }
        
        .cockpit-monitor.features-panel:hover {
          transform: rotateY(-0.5deg) skewY(-0.2deg) scale(1.02);
        }
        
        .cockpit-monitor.capabilities-panel:hover {
          transform: rotateY(0.5deg) skewY(0.2deg) scale(1.02);
        }
        
        .cockpit-monitor.optimizations-panel:hover {
          transform: rotateY(0deg) skewY(0deg) scale(1.02);
        }
      `}</style>
    </div>
  );
} 