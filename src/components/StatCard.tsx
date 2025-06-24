import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
      gradient: 'bg-gradient-to-br from-amber-900/90 via-orange-800/80 to-red-900/70',
      surface: 'bg-gradient-to-br from-amber-800/80 via-orange-700/70 to-red-800/60',
      rings: false,
      atmosphere: 'from-amber-500/15 to-orange-600/10',
      textColor: 'text-amber-200',
      labelColor: 'text-amber-100/80',
      shadow: 'shadow-amber-500/20'
    },
    gas: {
      gradient: 'bg-gradient-to-br from-slate-800/90 via-blue-900/80 to-indigo-950/70',
      surface: 'bg-gradient-to-br from-slate-700/80 via-blue-800/70 to-indigo-900/60',
      rings: true,
      atmosphere: 'from-blue-500/20 to-indigo-600/15',
      textColor: 'text-blue-200',
      labelColor: 'text-blue-100/80',
      shadow: 'shadow-blue-500/20'
    },
    ice: {
      gradient: 'bg-gradient-to-br from-slate-700/90 via-cyan-800/80 to-blue-900/70',
      surface: 'bg-gradient-to-br from-slate-600/80 via-cyan-700/70 to-blue-800/60',
      rings: true,
      atmosphere: 'from-cyan-500/20 to-blue-600/15',
      textColor: 'text-cyan-200',
      labelColor: 'text-cyan-100/80',
      shadow: 'shadow-cyan-500/20'
    },
    terrestrial: {
      gradient: 'bg-gradient-to-br from-emerald-900/90 via-green-800/80 to-teal-900/70',
      surface: 'bg-gradient-to-br from-emerald-800/80 via-green-700/70 to-teal-800/60',
      rings: false,
      atmosphere: 'from-emerald-500/15 to-green-600/10',
      textColor: 'text-emerald-200',
      labelColor: 'text-emerald-100/80',
      shadow: 'shadow-emerald-500/20'
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
    <div className="relative group p-2 sm:p-4">
      {/* Orbital Ring for gas and ice planets */}
      {config.rings && (
        <div className="absolute inset-0 rounded-full border border-slate-400/20 transform rotate-12 scale-110 animate-spin" style={{animationDuration: '60s'}}>
          <div className="absolute inset-0 rounded-full border border-slate-300/15 transform -rotate-6 scale-105 animate-spin" style={{animationDuration: '80s', animationDirection: 'reverse'}}></div>
        </div>
      )}
      
      {/* Planet Container - Responsive Size */}
      <div 
        className={`
          relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 lg:w-48 lg:h-48 rounded-full 
          ${config.gradient}
          ${config.shadow} shadow-xl lg:shadow-2xl
          border border-slate-600/30
          overflow-hidden
          transform transition-all duration-500
          hover:scale-105 hover:shadow-lg
          group-hover:${config.shadow}
          backdrop-blur-sm
          scale-75 sm:scale-90 md:scale-100
        `}
      >
        {/* Planet Surface Texture - Responsive */}
        <div className={`
          absolute inset-0 rounded-full 
          ${config.surface}
        `}>
          {/* Surface Craters/Features - Responsive sizing */}
          <div className="absolute top-3 left-4 sm:top-4 sm:left-6 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-black/10 animate-pulse"></div>
          <div className="absolute top-8 right-6 sm:top-12 sm:right-8 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-black/15 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-6 left-8 sm:bottom-8 sm:left-10 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black/8 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-12 right-4 sm:bottom-16 sm:right-6 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-black/12 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* Atmosphere Glow - More subtle */}
        <div className={`
          absolute inset-0 rounded-full 
          bg-gradient-to-br ${config.atmosphere}
          animate-pulse
        `} style={{animationDuration: '4s'}}></div>

        {/* Content Container - Responsive */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-2 sm:px-3 md:px-4">
          <div
            ref={numberRef}
            className={`text-2xl sm:text-3xl md:text-4xl font-bold ${config.textColor} mb-1 sm:mb-2 drop-shadow-lg`}
          >
            0{suffix}
          </div>
          <div className={`text-xs sm:text-sm ${config.labelColor} font-medium leading-tight max-w-full text-center`}>
            {label}
          </div>
        </div>

        {/* Planet Glow Effect - More subtle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-30"></div>
        
        {/* Space Debris/Stars - Responsive */}
        <div className="absolute top-2 left-3 sm:left-4 w-0.5 sm:w-1 h-0.5 sm:h-1 bg-white/30 rounded-full animate-twinkle"></div>
        <div className="absolute top-4 sm:top-6 right-2 sm:right-3 w-0.5 h-0.5 bg-white/20 rounded-full animate-twinkle" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-3 sm:bottom-4 left-2 sm:left-3 w-0.5 h-0.5 bg-white/25 rounded-full animate-twinkle" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Floating Particles - Responsive */}
      <div className="absolute -top-1 sm:-top-2 -left-1 sm:-left-2 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-slate-400/30 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
      <div className="absolute -top-2 sm:-top-4 -right-0.5 sm:-right-1 w-1 h-1 bg-slate-300/20 rounded-full animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}></div>
      <div className="absolute -bottom-1 sm:-bottom-2 -right-2 sm:-right-3 w-1 sm:w-1.5 h-1 sm:h-1.5 bg-slate-400/25 rounded-full animate-bounce" style={{animationDuration: '5s', animationDelay: '2s'}}></div>
    </div>
  );
};

export default StatCard; 