import React from 'react';
import StatCard from './StatCard';

const PlanetShowcase: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Responsive */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Aerospace Portfolio
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300">
            Explore the universe of possibilities
          </p>
        </div>

        {/* Main Stats Grid - Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Rocky Planet - Projects */}
          <div className="flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <StatCard
              value={25}
              suffix="+"
              label="Projects Completed"
              planetType="rocky"
            />
            <p className="text-orange-300 text-xs sm:text-sm mt-4 text-center leading-relaxed">
              Rocky planets represent solid achievements
            </p>
          </div>

          {/* Gas Planet - Experience */}
          <div className="flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <StatCard
              value={5}
              suffix=" Years"
              label="Industry Experience"
              planetType="gas"
            />
            <p className="text-blue-300 text-xs sm:text-sm mt-4 text-center leading-relaxed">
              Gas giants show vast experience and depth
            </p>
          </div>

          {/* Ice Planet - Technologies */}
          <div className="flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <StatCard
              value={15}
              suffix="+"
              label="Technologies Mastered"
              planetType="ice"
            />
            <p className="text-cyan-300 text-xs sm:text-sm mt-4 text-center leading-relaxed">
              Ice planets reflect cool technical skills
            </p>
          </div>

          {/* Terrestrial Planet - Clients */}
          <div className="flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <StatCard
              value={50}
              suffix="+"
              label="Happy Clients"
              planetType="terrestrial"
            />
            <p className="text-green-300 text-xs sm:text-sm mt-4 text-center leading-relaxed">
              Terrestrial planets symbolize growth and life
            </p>
          </div>
        </div>

        {/* Additional Stats Row - Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
          <div className="flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl hover:border-orange-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <StatCard
              value={99}
              suffix="%"
              label="Success Rate"
              planetType="rocky"
            />
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <StatCard
              value={24}
              suffix="/7"
              label="Support Available"
              planetType="gas"
            />
          </div>
          <div className="flex flex-col items-center p-4 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl hover:border-cyan-400/40 transition-all duration-300 hover:transform hover:scale-105">
            <StatCard
              value={1000}
              suffix="+"
              label="Code Commits"
              planetType="ice"
            />
          </div>
        </div>

        {/* Planet Type Legend - Responsive */}
        <div className="p-6 sm:p-8 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl md:rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 md:mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Planet Types Explained
            </span>
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {/* Rocky Planet */}
            <div className="text-center p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-orange-400 to-red-500 mx-auto mb-4 shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600"></div>
              </div>
              <h4 className="text-orange-300 font-semibold mb-2 text-sm sm:text-base">Rocky Planets</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Solid achievements and concrete results</p>
            </div>

            {/* Gas Giant */}
            <div className="text-center p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shadow-lg"></div>
                <div className="absolute inset-0 rounded-full border border-slate-400/20 transform rotate-12 scale-110"></div>
              </div>
              <h4 className="text-blue-300 font-semibold mb-2 text-sm sm:text-base">Gas Giants</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Vast experience and deep knowledge</p>
            </div>

            {/* Ice Planet */}
            <div className="text-center p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 shadow-lg"></div>
                <div className="absolute inset-0 rounded-full border border-slate-400/20 transform rotate-12 scale-110"></div>
              </div>
              <h4 className="text-cyan-300 font-semibold mb-2 text-sm sm:text-base">Ice Planets</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Cool technical skills and precision</p>
            </div>

            {/* Terrestrial */}
            <div className="text-center p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mx-auto mb-4 shadow-lg flex items-center justify-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600"></div>
              </div>
              <h4 className="text-green-300 font-semibold mb-2 text-sm sm:text-base">Terrestrial</h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">Growth, life, and sustainable solutions</p>
            </div>
          </div>
        </div>

        {/* Aerospace Features Section - Responsive */}
        <div className="mt-12 md:mt-16 p-6 sm:p-8 bg-slate-800/50 backdrop-blur border border-slate-600/30 rounded-xl md:rounded-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 md:mb-8 text-center">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Aerospace Design Features
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Dark Theme */}
            <div className="text-center p-4 sm:p-6 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-slate-600/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-500/30">
                <span className="text-slate-300 text-xl">🌌</span>
              </div>
              <h4 className="text-slate-200 font-semibold mb-2 text-sm sm:text-base">Dark Theme</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Optimized for low-light environments and space aesthetics</p>
            </div>

            {/* Subtle Animations */}
            <div className="text-center p-4 sm:p-6 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-slate-600/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-500/30">
                <span className="text-slate-300 text-xl">✨</span>
              </div>
              <h4 className="text-slate-200 font-semibold mb-2 text-sm sm:text-base">Subtle Animations</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Gentle effects that enhance without distracting</p>
            </div>

            {/* Performance */}
            <div className="text-center p-4 sm:p-6 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-12 h-12 bg-slate-600/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-500/30">
                <span className="text-slate-300 text-xl">🚀</span>
              </div>
              <h4 className="text-slate-200 font-semibold mb-2 text-sm sm:text-base">Performance</h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">Optimized animations and responsive design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetShowcase; 