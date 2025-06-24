'use client'

import { useState, useEffect, useCallback } from 'react'
import { BlogAdminAPI } from '@/lib/api/blog-admin'
import type { BlogPost } from '@/types/database'

interface AnalyticsData {
  totalPosts: number
  totalViews: number
  totalLikes: number
  avgReadTime: number
  topPosts: BlogPost[]
  recentActivity: BlogPost[]
  tagPerformance: { tag: string; count: number; views: number }[]
  monthlyStats: { month: string; posts: number; views: number }[]
}

export function BlogAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'content' | 'trends'>('overview')

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      const posts = await BlogAdminAPI.getAllPosts()
      
      // Process analytics data
      const analytics: AnalyticsData = {
        totalPosts: posts.length,
        totalViews: posts.reduce((sum, p) => sum + p.views, 0),
        totalLikes: posts.reduce((sum, p) => sum + p.likes, 0),
        avgReadTime: Math.round(posts.reduce((sum, p) => sum + p.read_time, 0) / posts.length) || 0,
        topPosts: posts
          .filter(p => p.status === 'published')
          .sort((a, b) => b.views - a.views)
          .slice(0, 5),
        recentActivity: posts
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 5),
        tagPerformance: getTagPerformance(posts),
        monthlyStats: getMonthlyStats(posts)
      }
      
      setData(analytics)
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadAnalytics()
  }, [loadAnalytics])

  const getTagPerformance = (posts: BlogPost[]) => {
    const tagStats: Record<string, { count: number; views: number }> = {}
    
    posts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        (post.tags as string[]).forEach(tag => {
          if (!tagStats[tag]) {
            tagStats[tag] = { count: 0, views: 0 }
          }
          tagStats[tag].count++
          tagStats[tag].views += post.views
        })
      }
    })
    
    return Object.entries(tagStats)
      .map(([tag, stats]) => ({ tag, ...stats }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 8)
  }

  const getMonthlyStats = (posts: BlogPost[]) => {
    const monthStats: Record<string, { posts: number; views: number }> = {}
    
    posts.forEach(post => {
      const month = new Date(post.created_at).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
      
      if (!monthStats[month]) {
        monthStats[month] = { posts: 0, views: 0 }
      }
      monthStats[month].posts++
      monthStats[month].views += post.views
    })
    
    return Object.entries(monthStats)
      .map(([month, stats]) => ({ month, ...stats }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(-6) // Last 6 months
  }

  if (loading) {
    return (
      <div className="space-y-8">
        {/* Cosmic Loading Animation */}
        <div className="relative h-96 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-cyan-500/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {/* Spinning Galaxy */}
              <div className="w-32 h-32 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <div className="absolute inset-4 w-24 h-24 border-4 border-purple-500/30 border-t-purple-400 rounded-full animate-spin animate-reverse"></div>
              <div className="absolute inset-8 w-16 h-16 border-4 border-pink-500/30 border-t-pink-400 rounded-full animate-spin"></div>
              
              {/* Central Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-cyan-400 rounded-full animate-float opacity-60"></div>
          <div className="absolute top-[60%] right-[15%] w-1 h-1 bg-purple-400 rounded-full animate-float-delayed opacity-40"></div>
          <div className="absolute bottom-[30%] left-[70%] w-1.5 h-1.5 bg-pink-400 rounded-full animate-float opacity-50"></div>
          
          <div className="absolute inset-0 flex items-center justify-center mt-40">
            <p className="text-cyan-400 text-lg font-medium animate-pulse">
              🛰️ Scanning Deep Space Analytics...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌌</div>
        <p className="text-red-400">Failed to load analytics data</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Cosmic Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border border-cyan-500/20 p-8">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Moving Stars */}
          <div className="absolute top-[10%] left-[5%] w-1 h-1 bg-white rounded-full animate-twinkle"></div>
          <div className="absolute top-[30%] right-[10%] w-0.5 h-0.5 bg-cyan-300 rounded-full animate-twinkle-delayed"></div>
          <div className="absolute bottom-[20%] left-[80%] w-0.5 h-0.5 bg-purple-300 rounded-full animate-twinkle"></div>
          
          {/* Floating Asteroids */}
          <div className="absolute top-[15%] right-[20%] w-8 h-8 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full animate-float-slow transform rotate-45"></div>
          </div>
          <div className="absolute bottom-[25%] left-[15%] w-6 h-6 opacity-15">
            <div className="w-full h-full bg-gradient-to-br from-gray-500 to-gray-700 rounded-full animate-float-delayed transform rotate-12"></div>
          </div>
          
          {/* Meteor Trail */}
          <div className="absolute top-[40%] left-[60%] w-16 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-meteor"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            🌌 Deep Space Analytics
          </h1>
          <p className="text-slate-300 text-lg">
            Mission intelligence gathered from across the cosmic blog network
          </p>
        </div>
      </div>

      {/* Navigation Tabs - Cosmic Style */}
      <div className="relative">
        <div className="flex space-x-1 bg-slate-800/50 backdrop-blur-sm p-2 rounded-2xl border border-slate-700/50">
          {[
            { id: 'overview', label: '🌍 Overview', icon: '🌍' },
            { id: 'performance', label: '⚡ Performance', icon: '⚡' },
            { id: 'content', label: '📊 Content', icon: '📊' },
            { id: 'trends', label: '📈 Trends', icon: '📈' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'overview' | 'performance' | 'content' | 'trends')}
              className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span className="text-lg mr-2">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 animate-pulse"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === 'overview' && <OverviewTab data={data} />}
        {activeTab === 'performance' && <PerformanceTab data={data} />}
        {activeTab === 'content' && <ContentTab data={data} />}
        {activeTab === 'trends' && <TrendsTab data={data} />}
      </div>
    </div>
  )
}

// Overview Tab Component
function OverviewTab({ data }: { data: AnalyticsData }) {
  const stats = [
    {
      label: 'Total Missions',
      value: data.totalPosts.toLocaleString(),
      icon: '🚀',
      color: 'cyan',
      description: 'Blog posts launched',
      bgGradient: 'from-cyan-500/10 to-blue-500/10',
      borderGradient: 'from-cyan-500/30 to-blue-500/30'
    },
    {
      label: 'Cosmic Views',
      value: data.totalViews.toLocaleString(),
      icon: '👁️‍🗨️',
      color: 'purple',
      description: 'Total engagement',
      bgGradient: 'from-purple-500/10 to-pink-500/10',
      borderGradient: 'from-purple-500/30 to-pink-500/30'
    },
    {
      label: 'Star Ratings',
      value: data.totalLikes.toLocaleString(),
      icon: '⭐',
      color: 'yellow',
      description: 'Community appreciation',
      bgGradient: 'from-yellow-500/10 to-orange-500/10',
      borderGradient: 'from-yellow-500/30 to-orange-500/30'
    },
    {
      label: 'Avg. Flight Time',
      value: `${data.avgReadTime} min`,
      icon: '⏱️',
      color: 'green',
      description: 'Average read time',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      borderGradient: 'from-green-500/30 to-emerald-500/30'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Cosmic Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-transparent bg-clip-padding animate-fade-in`}
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-2 right-2 w-4 h-4 border border-current rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-current rounded-full animate-ping"></div>
              <div className="absolute top-1/2 left-1/2 w-6 h-6 border border-current rounded-full animate-spin-slow opacity-30"></div>
            </div>
            
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl animate-float">{stat.icon}</div>
                <div className="text-2xl font-bold text-white">
                  {stat.value}
                </div>
              </div>
              <h3 className="font-semibold text-white mb-1">{stat.label}</h3>
              <p className="text-sm text-slate-400">{stat.description}</p>
            </div>
            
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${stat.bgGradient} opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-2xl`}></div>
          </div>
        ))}
      </div>

      {/* Top Performing Posts - Asteroid Belt Style */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 p-8">
        {/* Floating Asteroids Background */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-[10%] left-[10%] w-12 h-12 bg-gray-500 rounded-full animate-float-slow"></div>
          <div className="absolute top-[60%] right-[15%] w-8 h-8 bg-gray-400 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-[20%] left-[70%] w-6 h-6 bg-gray-600 rounded-full animate-float"></div>
        </div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-3xl">🌌</span>
            Top Performing Missions
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
          </h2>
          
          <div className="space-y-4">
            {data.topPosts.map((post, index) => (
              <div
                key={post.id}
                className="relative group bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Rank Badge */}
                <div className={`absolute -left-2 -top-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white' :
                  index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' :
                  index === 2 ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white' :
                  'bg-gradient-to-r from-slate-600 to-slate-700 text-slate-300'
                }`}>
                  {index + 1}
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {post.featured && <span className="text-yellow-400 mr-2">⭐</span>}
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-slate-400">
                      <span className="flex items-center gap-1">
                        <span className="text-cyan-400">👁️</span>
                        {post.views.toLocaleString()} views
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-pink-400">❤️</span>
                        {post.likes} likes
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="text-green-400">⏱️</span>
                        {post.read_time} min read
                      </span>
                    </div>
                  </div>
                  
                  {/* Engagement Score */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-400">
                      {Math.round((post.views + post.likes * 10) / 10)}
                    </div>
                    <div className="text-xs text-slate-500">engagement</div>
                  </div>
                </div>
                
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Performance Tab Component  
function PerformanceTab({ data }: { data: AnalyticsData }) {
  return (
    <div className="space-y-8">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views Chart Simulation */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 border border-blue-500/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Views Performance
          </h3>
          
          <div className="space-y-4">
            {data.monthlyStats.map((month, index) => (
              <div key={month.month} className="flex items-center gap-4">
                <div className="w-16 text-sm text-slate-400">{month.month}</div>
                <div className="flex-1 bg-slate-800/50 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out animate-slide-right"
                    style={{
                      width: `${(month.views / Math.max(...data.monthlyStats.map(m => m.views))) * 100}%`,
                      animationDelay: `${index * 0.2}s`
                    }}
                  ></div>
                </div>
                <div className="w-20 text-right text-sm text-cyan-400 font-medium">
                  {month.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tag Performance - Comet Style */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 border border-purple-500/20 p-6">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-2xl">☄️</span>
            Tag Comets
          </h3>
          
          <div className="space-y-3">
            {data.tagPerformance.map((tag, index) => (
              <div
                key={tag.tag}
                className="relative group bg-slate-800/30 rounded-lg p-3 border border-slate-700/30 hover:border-purple-500/50 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></div>
                    <span className="font-medium text-white">#{tag.tag}</span>
                    <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-full">
                      {tag.count} posts
                    </span>
                  </div>
                  <div className="text-purple-400 font-bold">
                    {tag.views.toLocaleString()}
                  </div>
                </div>
                
                {/* Comet Trail Effect */}
                <div className="absolute right-0 top-1/2 w-8 h-0.5 bg-gradient-to-r from-purple-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Content Tab Component
function ContentTab({ data }: { data: AnalyticsData }) {
  const statusStats = [
    {
      status: 'published',
      count: data.topPosts.length,
      icon: '🚀',
      color: 'green',
      label: 'Published'
    },
    {
      status: 'draft', 
      count: data.totalPosts - data.topPosts.length,
      icon: '✏️',
      color: 'orange',
      label: 'Drafts'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Content Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {statusStats.map((stat, index) => (
          <div
            key={stat.status}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 p-6 animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl mb-2">{stat.icon}</div>
                <h3 className="font-semibold text-white">{stat.label}</h3>
                <p className="text-slate-400 text-sm">Content status</p>
              </div>
              <div className="text-3xl font-bold text-cyan-400">
                {stat.count}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity - Meteor Shower Style */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">🌠</span>
          Recent Meteor Activity
        </h3>
        
        <div className="space-y-4">
          {data.recentActivity.map((post, index) => (
            <div
              key={post.id}
              className="relative group bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/30 hover:border-cyan-500/30 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <h4 className="font-medium text-white group-hover:text-cyan-400 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-400">
                    Created {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  post.status === 'published' 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                }`}>
                  {post.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Trends Tab Component
function TrendsTab({ data }: { data: AnalyticsData }) {
  return (
    <div className="space-y-8">
      {/* Monthly Trends */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 p-8">
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">📈</span>
          Galactic Trends
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-cyan-400 mb-4">Monthly Posts</h4>
            <div className="space-y-3">
              {data.monthlyStats.map((month, index) => (
                <div key={month.month} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-slate-400">{month.month}</div>
                  <div className="flex-1 bg-slate-800/50 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-400 rounded-full transition-all duration-1000 animate-slide-right"
                      style={{
                        width: `${(month.posts / Math.max(...data.monthlyStats.map(m => m.posts))) * 100}%`,
                        animationDelay: `${index * 0.2}s`
                      }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-sm text-cyan-400 font-medium">
                    {month.posts}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4">Engagement Growth</h4>
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Average Views/Post</span>
                  <span className="text-purple-400 font-bold">
                    {Math.round(data.totalViews / data.totalPosts)}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-400 h-2 rounded-full w-3/4 animate-slide-right"></div>
                </div>
              </div>
              
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-300">Engagement Rate</span>
                  <span className="text-green-400 font-bold">
                    {Math.round((data.totalLikes / data.totalViews) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-400 h-2 rounded-full w-2/3 animate-slide-right"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 