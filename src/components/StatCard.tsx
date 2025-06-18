import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/planet-card.css';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  planetType?: 'rocky' | 'gas' | 'ice' | 'terrestrial';
}

const StatCard: React.FC<StatCardProps> = ({ 
  value, 
  suffix = '', 
  label, 
  planetType = 'rocky' 
}) => {
  const numberRef = useRef<HTMLDivElement>(null);

  // Planet configurations with aerospace-themed colors
  const planetConfigs = {
    rocky: {
      gradient: 'planet-rocky',
      surface: 'bg-gradient-to-br from-amber-800/80 via-orange-700/70 to-red-800/60',
      rings: false,
      atmosphere: 'from-amber-500/15 to-orange-600/10',
      textColor: 'text-amber-200',
      labelColor: 'text-amber-100/80'
    },
    gas: {
      gradient: 'planet-gas',
      surface: 'bg-gradient-to-br from-slate-700/80 via-blue-800/70 to-indigo-900/60',
      rings: true,
      atmosphere: 'from-blue-500/20 to-indigo-600/15',
      textColor: 'text-blue-200',
      labelColor: 'text-blue-100/80'
    },
    ice: {
      gradient: 'planet-ice',
      surface: 'bg-gradient-to-br from-slate-600/80 via-cyan-700/70 to-blue-800/60',
      rings: true,
      atmosphere: 'from-cyan-500/20 to-blue-600/15',
      textColor: 'text-cyan-200',
      labelColor: 'text-cyan-100/80'
    },
    terrestrial: {
      gradient: 'planet-terrestrial',
      surface: 'bg-gradient-to-br from-emerald-800/80 via-green-700/70 to-teal-800/60',
      rings: false,
      atmosphere: 'from-emerald-500/15 to-green-600/10',
      textColor: 'text-emerald-200',
      labelColor: 'text-emerald-100/80'
    }
  };

  const config = planetConfigs[planetType];

  useEffect(() => {
    if (!numberRef.current) return;

    const obj = { val: 0 };
    const endValue = value;

    const anim = gsap.to(obj, {
      val: endValue,
      duration: 2,
      ease: 'none',
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = Math.round(obj.val) + suffix;
        }
      },
      scrollTrigger: {
        trigger: numberRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      anim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [value, suffix]);

  return (
    <div className="planet-container relative group">
      {/* Orbital Ring for gas and ice planets */}
      {config.rings && (
        <div className="absolute inset-0 rounded-full border border-slate-400/20 transform rotate-12 scale-110 orbital-ring-subtle">
          <div className="absolute inset-0 rounded-full border border-slate-300/15 transform -rotate-6 scale-105 orbital-ring-reverse-subtle"></div>
        </div>
      )}
      
      {/* Planet Container */}
      <div 
        className={`
          relative w-48 h-48 rounded-full 
          ${config.gradient}
          planet-shadow-subtle
          border border-slate-600/30
          overflow-hidden
          transform transition-all duration-500
          hover:scale-105 hover:shadow-slate-400/10
          group-hover:shadow-lg
        `}
      >
        {/* Planet Surface Texture */}
        <div className={`
          absolute inset-0 rounded-full 
          ${config.surface}
        `}>
          {/* Surface Craters/Features - More subtle */}
          <div className="absolute top-4 left-6 w-3 h-3 rounded-full bg-black/10 crater-subtle"></div>
          <div className="absolute top-12 right-8 w-2 h-2 rounded-full bg-black/15 crater-subtle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-8 left-10 w-4 h-4 rounded-full bg-black/8 crater-subtle" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-16 right-6 w-2.5 h-2.5 rounded-full bg-black/12 crater-subtle" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* Atmosphere Glow - More subtle */}
        <div className={`
          absolute inset-0 rounded-full 
          bg-gradient-to-br ${config.atmosphere}
          atmosphere-glow-subtle
        `}></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div
            ref={numberRef}
            className={`stat-number text-4xl font-bold ${config.textColor} mb-2 drop-shadow-sm`}
          >
            0{suffix}
          </div>
          <div className={`text-sm ${config.labelColor} font-medium leading-tight`}>
            {label}
          </div>
        </div>

        {/* Planet Glow Effect - More subtle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
        
        {/* Space Debris/Stars - More subtle */}
        <div className="absolute top-2 left-4 w-1 h-1 bg-white/30 rounded-full space-debris-subtle"></div>
        <div className="absolute top-6 right-3 w-0.5 h-0.5 bg-white/20 rounded-full space-debris-subtle" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-4 left-3 w-0.5 h-0.5 bg-white/25 rounded-full space-debris-subtle" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating Particles - More subtle */}
      <div className="floating-particle-subtle absolute -top-2 -left-2 w-2 h-2 bg-slate-400/30"></div>
      <div className="floating-particle-subtle absolute -top-4 -right-1 w-1 h-1 bg-slate-300/20"></div>
      <div className="floating-particle-subtle absolute -bottom-2 -right-3 w-1.5 h-1.5 bg-slate-400/25"></div>
    </div>
  );
};

export default StatCard; 