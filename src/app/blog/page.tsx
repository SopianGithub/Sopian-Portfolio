import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogAPI } from '@/lib/api/blog'
import { BlogPost } from '@/types/database'
import { notFound } from 'next/navigation'
import Navbar from '@/components/layout/Navbar'

export const metadata = {
  title: 'Mission Logs | Aerospace Portfolio',
  description: 'Explore our space mission logs and aerospace insights',
}

export default async function BlogPage() {
  let posts: BlogPost[] = []
  
  try {
    posts = await BlogAPI.getPublishedPosts()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return notFound()
  }

  const featuredPosts = posts.filter(post => post.featured).slice(0, 3)
  const regularPosts = posts.filter(post => !post.featured)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-space-950 to-slate-900">
        {/* Space Environment */}
        <div className="space-environment">
          <div className="stars-backdrop"></div>
          <div className="absolute top-[10%] left-[5%] w-4 h-4 bg-cyan-400 rounded-full opacity-60 animate-float"></div>
          <div className="absolute top-[30%] right-[10%] w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
          <div className="absolute bottom-[20%] left-[80%] w-3 h-3 bg-cosmic-400 rounded-full opacity-50 animate-float"></div>
        </div>

        <div className="relative z-10 pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header Section */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30 backdrop-blur-sm">
                  <span className="text-5xl">🚀</span>
                </div>
                <div className="h-16 w-px bg-gradient-to-b from-cyan-500/50 to-purple-500/50"></div>
                <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cosmic-600/20 border border-purple-500/30 backdrop-blur-sm">
                  <span className="text-5xl">📡</span>
                </div>
              </div>
              
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent mb-6">
                Mission Logs
              </h1>
              <p className="text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                Documenting our journey through the cosmos of technology, innovation, and aerospace engineering
              </p>
              
              <div className="mt-8 inline-flex items-center gap-2 bg-green-500/10 px-6 py-3 rounded-full border border-green-500/20 backdrop-blur-sm">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 font-medium">Live from Mission Control • {posts.length} Active Logs</span>
              </div>
            </div>

            {/* Featured Posts Section */}
            {featuredPosts.length > 0 && (
              <div className="mb-20">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Featured Missions</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-yellow-500/50 to-transparent"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {featuredPosts.map((post, index) => (
                    <FeaturedPostCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="flex items-center gap-4 mb-10">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                <span className="text-2xl">📊</span>
              </div>
              <h2 className="text-3xl font-bold text-white">All Mission Reports</h2>
              <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
            </div>

            {regularPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {regularPosts.map((post, index) => (
                  <RegularPostCard key={post.id} post={post} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🌌</div>
                <h3 className="text-2xl font-bold text-white mb-4">No Mission Logs Yet</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Our mission logs are being prepared for launch. Check back soon for exciting updates from our aerospace journey.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function FeaturedPostCard({ post, index }: { post: BlogPost; index: number }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div 
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/60 to-slate-900/80 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/10"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-full blur-xl group-hover:from-cyan-400/20 transition-all duration-500"></div>
      
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 px-3 py-1 rounded-full">
          <span className="text-yellow-300 text-sm font-medium">⭐ Featured</span>
        </div>
      </div>

      <div className="relative p-8">
        {/* Mission Image Placeholder */}
        <div className="mb-6 aspect-video rounded-xl bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 flex items-center justify-center overflow-hidden">
          {post.image_url ? (
            <Image 
              src={post.image_url} 
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-6xl text-slate-500">🛰️</div>
          )}
        </div>

        {/* Mission Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-cyan-400">
            <span>📅</span>
            <span>{formatDate(post.published_at || post.created_at)}</span>
            <span>•</span>
            <span>⏱️ {post.read_time} min read</span>
          </div>

          <Link 
            href={`/blog/${post.slug}`}
            className="block group-hover:text-cyan-400 transition-colors"
          >
            <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 leading-tight">
              {post.title}
            </h3>
          </Link>

          {post.excerpt && (
            <p className="text-slate-300 line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Mission Tags */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {(post.tags as string[]).slice(0, 3).map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-slate-300 rounded-md border border-slate-600/30"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Mission Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1">
                <span>👁️</span>
                <span>{post.views.toLocaleString()}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>❤️</span>
                <span>{post.likes.toLocaleString()}</span>
              </span>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              <span>Read Mission</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function RegularPostCard({ post, index }: { post: BlogPost; index: number }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-900/20 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Subtle Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 to-slate-700/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <div className="relative p-6">
        {/* Mission Image */}
        <div className="mb-4 aspect-video rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/20 flex items-center justify-center overflow-hidden">
          {post.image_url ? (
            <Image 
              src={post.image_url} 
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="text-4xl text-slate-500">🌌</div>
          )}
        </div>

        {/* Mission Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>📅</span>
            <span>{formatDate(post.published_at || post.created_at)}</span>
            <span>•</span>
            <span>⏱️ {post.read_time} min</span>
          </div>

          <Link 
            href={`/blog/${post.slug}`}
            className="block group-hover:text-cyan-400 transition-colors"
          >
            <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight">
              {post.title}
            </h3>
          </Link>

          {post.excerpt && (
            <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Mission Tags */}
          {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {(post.tags as string[]).slice(0, 2).map((tag, tagIndex) => (
                <span 
                  key={tagIndex}
                  className="px-2 py-1 text-xs font-medium bg-slate-700/40 text-slate-400 rounded border border-slate-600/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Stats and Read More */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-700/30">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <span>👁️</span>
                <span>{post.views}</span>
              </span>
              <span className="flex items-center gap-1">
                <span>❤️</span>
                <span>{post.likes}</span>
              </span>
            </div>
            
            <Link 
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
            >
              <span>Read</span>
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 