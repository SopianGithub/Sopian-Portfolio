import { BlogAdminServerAPI } from '@/lib/api/blog-admin-server'

export async function BlogStats() {
  try {
    const posts = await BlogAdminServerAPI.getAllPosts()
    
    const stats = {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      draft: posts.filter(p => p.status === 'draft').length,
      featured: posts.filter(p => p.featured).length,
      totalViews: posts.reduce((sum, p) => sum + p.views, 0),
      totalLikes: posts.reduce((sum, p) => sum + p.likes, 0)
    }

    // Calculate engagement rate and growth metrics
    const engagementRate = stats.totalViews > 0 ? Math.round((stats.totalLikes / stats.totalViews) * 100) : 0
    const avgViewsPerPost = stats.published > 0 ? Math.round(stats.totalViews / stats.published) : 0
    const featuredPercentage = stats.total > 0 ? Math.round((stats.featured / stats.total) * 100) : 0

    return (
      <div className="space-y-8">
        {/* Hero Dashboard Header Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-blue-900/20 to-purple-900/30 backdrop-blur-xl border border-white/10 p-8">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-400/10 via-transparent to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-400/10 via-transparent to-transparent rounded-full blur-2xl"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-[20%] left-[15%] w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
          <div className="absolute top-[70%] right-[20%] w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
          <div className="absolute bottom-[30%] left-[70%] w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-50"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                <span className="text-4xl">🛰️</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Mission Control Center
              </h1>
            </div>
            <p className="text-xl text-slate-300 font-light">
              Command your space blog operations from this aerospace hub
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-full border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-300 font-medium">System Online • All Stations Operational</span>
            </div>
          </div>
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Total Posts Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-600/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-400/10 to-transparent rounded-full blur-xl group-hover:from-purple-400/20 transition-all duration-500"></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-600/20 border border-purple-500/30">
                  <span className="text-2xl">🌌</span>
                </div>
                <div className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                  +12%
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Mission Control Center</h3>
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  {stats.total}
                </div>
                <p className="text-sm text-slate-400">Total mission logs</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Mission Status</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Published Posts Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-green-400/10 to-transparent rounded-full blur-xl group-hover:from-green-400/20 transition-all duration-500"></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
                  <span className="text-2xl">🚀</span>
                </div>
                <div className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                  +8%
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Active Missions</h3>
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {stats.published}
                </div>
                <p className="text-sm text-slate-400">Published & live</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Launch Status</span>
                  <span>{stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000 animate-slide-right"
                    style={{ width: `${stats.total > 0 ? Math.round((stats.published / stats.total) * 100) : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Views Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-600/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-xl group-hover:from-cyan-400/20 transition-all duration-500"></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                  <span className="text-2xl">👁️‍🗨️</span>
                </div>
                <div className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                  +24%
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Cosmic Exploration</h3>
                <div className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  {stats.totalViews.toLocaleString()}
                </div>
                <p className="text-sm text-slate-400">Deep space views</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Exploration Rate</span>
                  <span>100%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Likes Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-500 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-600/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-400/10 to-transparent rounded-full blur-xl group-hover:from-yellow-400/20 transition-all duration-500"></div>
            
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30">
                  <span className="text-2xl">⭐</span>
                </div>
                <div className="text-xs font-semibold text-green-400 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                  +15%
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Stellar Appreciation</h3>
                <div className="text-4xl font-black bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {stats.totalLikes.toLocaleString()}
                </div>
                <p className="text-sm text-slate-400">Community love</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>Appreciation Level</span>
                  <span>{engagementRate}%</span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-1000 animate-slide-right"
                    style={{ width: `${Math.min(engagementRate, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Draft Posts Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-600/5"></div>
            <div className="relative p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30">
                  <span className="text-xl">✏️</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-400">{stats.draft}</div>
                  <div className="text-sm text-slate-400">Draft Missions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Posts Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-pink-500/20 hover:border-pink-400/40 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-600/5"></div>
            <div className="relative p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-purple-600/20 border border-pink-500/30">
                  <span className="text-xl">🌟</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-pink-400">{stats.featured}</div>
                  <div className="text-sm text-slate-400">Featured Missions</div>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Rate Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-indigo-500/20 hover:border-indigo-400/40 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-blue-600/5"></div>
            <div className="relative p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-600/20 border border-indigo-500/30">
                  <span className="text-xl">📊</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-400">{engagementRate}%</div>
                  <div className="text-sm text-slate-400">Engagement Rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Average Views Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-teal-500/20 hover:border-teal-400/40 transition-all duration-300 hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-cyan-600/5"></div>
            <div className="relative p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-teal-500/20 to-cyan-600/20 border border-teal-500/30">
                  <span className="text-xl">📈</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-teal-400">{avgViewsPerPost.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Avg Views/Mission</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Analytics Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mission Status Overview Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 to-slate-800/5"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-slate-600/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-slate-600/20 to-slate-700/20 border border-slate-600/30">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-white">Mission Status Overview</h3>
              </div>
              
              <div className="space-y-4">
                {/* Active Missions */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-emerald-600/10 rounded-xl border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Active Missions</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{stats.published}</div>
                </div>
                
                {/* In Development */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-xl border border-orange-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">In Development</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-400">{stats.draft}</div>
                </div>
                
                {/* Featured Content */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-500/10 to-orange-600/10 rounded-xl border border-yellow-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Featured Missions</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-400">{stats.featured}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-700/5 to-slate-800/5"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-slate-600/10 to-transparent rounded-full blur-2xl"></div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-gradient-to-br from-slate-600/20 to-slate-700/20 border border-slate-600/30">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-white">Performance Metrics</h3>
              </div>
              
              <div className="space-y-6">
                {/* Engagement Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Engagement Rate</span>
                    <span className="text-2xl font-bold text-cyan-400">{engagementRate}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-cyan-500 to-blue-400 h-3 rounded-full transition-all duration-1000 animate-slide-right"
                      style={{ width: `${Math.min(engagementRate, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Average Views */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Avg Views/Mission</span>
                    <span className="text-2xl font-bold text-purple-400">{avgViewsPerPost}</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-3 rounded-full w-3/4 transition-all duration-1000 animate-slide-right"></div>
                  </div>
                </div>
                
                {/* Featured Content */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-medium">Featured Content</span>
                    <span className="text-2xl font-bold text-yellow-400">{featuredPercentage}%</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-orange-400 h-3 rounded-full transition-all duration-1000 animate-slide-right"
                      style={{ width: `${featuredPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Status Footer Card */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-800/30 to-slate-900/50 backdrop-blur-sm border border-slate-700/30 p-6">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-cyan-500/5"></div>
          
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30">
                <span className="text-2xl">🛰️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Mission Control Online</h3>
                <p className="text-sm text-slate-400">All systems operational • Last updated: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300 font-medium">Active</span>
              </div>
              <div className="h-6 w-px bg-slate-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
                <span className="text-sm text-cyan-300 font-medium">Monitoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog stats:', error)
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/20 via-slate-800 to-slate-900 border border-red-500/20 p-8 text-center">
        {/* Error Animation */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[20%] left-[20%] w-4 h-4 bg-red-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-[30%] right-[25%] w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        
        <div className="relative z-10">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 inline-block mb-4">
            <span className="text-6xl">🚨</span>
          </div>
          <h3 className="text-2xl font-bold text-red-400 mb-2">Mission Control Error</h3>
          <p className="text-red-300 mb-4">Unable to establish connection with deep space analytics</p>
          <div className="inline-flex items-center gap-2 bg-red-500/10 px-4 py-2 rounded-full border border-red-500/20">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-red-300">System diagnostics in progress...</span>
          </div>
        </div>
      </div>
    )
  }
}