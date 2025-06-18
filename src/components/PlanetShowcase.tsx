import React from 'react';
import StatCard from './StatCard';

const PlanetShowcase: React.FC = () => {
  return (
    <div className="min-h-screen aerospace-bg p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold aerospace-text-primary mb-4">
            Aerospace Portfolio
          </h1>
          <p className="text-xl aerospace-text-secondary">
            Explore the universe of possibilities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Rocky Planet - Projects */}
          <div className="flex flex-col items-center">
            <StatCard
              value={25}
              suffix="+"
              label="Projects Completed"
              planetType="rocky"
            />
            <p className="aerospace-text-accent text-sm mt-4 text-center">
              Rocky planets represent solid achievements
            </p>
          </div>

          {/* Gas Planet - Experience */}
          <div className="flex flex-col items-center">
            <StatCard
              value={5}
              suffix=" Years"
              label="Industry Experience"
              planetType="gas"
            />
            <p className="aerospace-text-accent text-sm mt-4 text-center">
              Gas giants show vast experience and depth
            </p>
          </div>

          {/* Ice Planet - Technologies */}
          <div className="flex flex-col items-center">
            <StatCard
              value={15}
              suffix="+"
              label="Technologies Mastered"
              planetType="ice"
            />
            <p className="aerospace-text-accent text-sm mt-4 text-center">
              Ice planets reflect cool technical skills
            </p>
          </div>

          {/* Terrestrial Planet - Clients */}
          <div className="flex flex-col items-center">
            <StatCard
              value={50}
              suffix="+"
              label="Happy Clients"
              planetType="terrestrial"
            />
            <p className="aerospace-text-accent text-sm mt-4 text-center">
              Terrestrial planets symbolize growth and life
            </p>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center">
            <StatCard
              value={99}
              suffix="%"
              label="Success Rate"
              planetType="rocky"
            />
          </div>
          <div className="flex flex-col items-center">
            <StatCard
              value={24}
              suffix="/7"
              label="Support Available"
              planetType="gas"
            />
          </div>
          <div className="flex flex-col items-center">
            <StatCard
              value={1000}
              suffix="+"
              label="Code Commits"
              planetType="ice"
            />
          </div>
        </div>

        {/* Planet Type Legend */}
        <div className="mt-16 p-8 aerospace-bg-alt rounded-lg border border-slate-600/30">
          <h3 className="text-2xl font-bold aerospace-text-primary mb-8 text-center">
            Planet Types Explained
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full planet-rocky mx-auto mb-4 planet-shadow-subtle"></div>
              <h4 className="text-amber-300 font-semibold mb-2">Rocky Planets</h4>
              <p className="aerospace-text-accent text-sm">Solid achievements and concrete results</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full planet-gas mx-auto mb-4 planet-shadow-subtle relative">
                <div className="absolute inset-0 rounded-full border border-slate-400/20 transform rotate-12 scale-110"></div>
              </div>
              <h4 className="text-blue-300 font-semibold mb-2">Gas Giants</h4>
              <p className="aerospace-text-accent text-sm">Vast experience and deep knowledge</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full planet-ice mx-auto mb-4 planet-shadow-subtle relative">
                <div className="absolute inset-0 rounded-full border border-slate-400/20 transform rotate-12 scale-110"></div>
              </div>
              <h4 className="text-cyan-300 font-semibold mb-2">Ice Planets</h4>
              <p className="aerospace-text-accent text-sm">Cool technical skills and precision</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full planet-terrestrial mx-auto mb-4 planet-shadow-subtle"></div>
              <h4 className="text-emerald-300 font-semibold mb-2">Terrestrial</h4>
              <p className="aerospace-text-accent text-sm">Growth, life, and sustainable solutions</p>
            </div>
          </div>
        </div>

        {/* Aerospace Features Section */}
        <div className="mt-16 p-8 aerospace-bg-alt rounded-lg border border-slate-600/30">
          <h3 className="text-2xl font-bold aerospace-text-primary mb-8 text-center">
            Aerospace Design Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-slate-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-300 text-xl">🌌</span>
              </div>
              <h4 className="aerospace-text-secondary font-semibold mb-2">Dark Theme</h4>
              <p className="aerospace-text-accent text-sm">Optimized for low-light environments and space aesthetics</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-slate-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-300 text-xl">✨</span>
              </div>
              <h4 className="aerospace-text-secondary font-semibold mb-2">Subtle Animations</h4>
              <p className="aerospace-text-accent text-sm">Gentle effects that enhance without distracting</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-slate-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-slate-300 text-xl">🚀</span>
              </div>
              <h4 className="aerospace-text-secondary font-semibold mb-2">Performance</h4>
              <p className="aerospace-text-accent text-sm">Optimized animations and responsive design</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetShowcase; 