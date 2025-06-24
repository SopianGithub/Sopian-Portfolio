import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogAPI } from '@/lib/api/blog'
import { BlogPost } from '@/types/database'
import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Image from 'next/image'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const posts = await BlogAPI.getPublishedPosts()
    const post = posts.find(p => p.slug === resolvedParams.slug)
    
    if (!post) {
      return {
        title: 'Mission Log Not Found | Aerospace Portfolio',
        description: 'The requested mission log could not be found'
      }
    }

    return {
      title: `${post.title} | Mission Logs`,
      description: post.excerpt || `Read about ${post.title} in our aerospace mission logs`,
      openGraph: {
        title: post.title,
        description: post.excerpt || `Read about ${post.title} in our aerospace mission logs`,
        images: post.image_url ? [{ url: post.image_url }] : [],
      },
    }
  } catch {
    return {
      title: 'Mission Log | Aerospace Portfolio',
      description: 'Aerospace mission log'
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let posts: BlogPost[] = []
  let post: BlogPost | undefined
  
  try {
    const resolvedParams = await params
    posts = await BlogAPI.getPublishedPosts()
    post = posts.find(p => p.slug === resolvedParams.slug)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return notFound()
  }

  if (!post) {
    return notFound()
  }

  // Get related posts
  const relatedPosts = posts
    .filter(p => p.id !== post.id)
    .slice(0, 3)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatReadingTime = (minutes: number) => {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} read`
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-space-950 to-slate-900">
        {/* Space Environment */}
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        <div className="absolute top-[15%] left-[8%] w-2 h-2 bg-cyan-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-[25%] right-[12%] w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute bottom-[30%] left-[85%] w-1.5 h-1.5 bg-cosmic-400 rounded-full opacity-50 animate-pulse"></div>
        <div className="absolute top-[40%] left-[15%] w-1 h-1 bg-yellow-400 rounded-full opacity-30 animate-float"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-cyan-500/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link 
                href="/blog"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                <span className="text-lg">←</span>
                <span>Back to Mission Control</span>
              </Link>
              
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>📡</span>
                <span>Mission Log Active</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Article Header */}
        <div className="relative pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Featured Badge */}
            {post.featured && (
              <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm border border-yellow-500/30 px-4 py-2 rounded-full">
                  <span className="text-yellow-300">⭐</span>
                  <span className="text-yellow-300 font-medium">Featured Mission</span>
                </div>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent mb-8 leading-tight text-center">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl text-slate-300 font-light leading-relaxed text-center max-w-3xl mx-auto mb-12">
                {post.excerpt}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 mb-12">
              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{formatDate(post.published_at || post.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>⏱️</span>
                <span>{formatReadingTime(post.read_time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>👁️</span>
                <span>{post.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-2">
                <span>❤️</span>
                <span>{post.likes.toLocaleString()} likes</span>
              </div>
            </div>

            {/* Featured Image */}
            {post.image_url && (
              <div className="mb-16">
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-cyan-500/20 backdrop-blur-sm">
                  <Image 
                    src={post.image_url} 
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags && Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {(post.tags as string[]).map((tag, index) => (
                  <span 
                    key={index}
                    className="px-4 py-2 text-sm font-medium bg-slate-800/60 text-slate-300 rounded-full border border-slate-600/30 backdrop-blur-sm hover:border-cyan-500/30 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article Content */}
        <article className="relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 p-8 md:p-12">
              
              {/* Floating Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[20%] left-[10%] w-1 h-1 bg-cyan-400 rounded-full opacity-30 animate-pulse"></div>
                <div className="absolute top-[60%] right-[15%] w-0.5 h-0.5 bg-purple-400 rounded-full opacity-40 animate-float"></div>
                <div className="absolute bottom-[30%] left-[80%] w-0.5 h-0.5 bg-cosmic-400 rounded-full opacity-25 animate-pulse"></div>
              </div>

              <div className="relative z-10">
                {/* Mission Report Badge */}
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
                    <span className="text-lg">📝</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">Mission Report</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="prose prose-lg prose-invert max-w-none">
                  <div 
                    className="text-slate-200 leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{ __html: post.content || '' }}
                  />
                </div>

                {/* Mission Status */}
                <div className="mt-16 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 font-medium">Mission Report Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Action Buttons */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-red-500/20 border border-pink-500/30 rounded-full text-pink-300 hover:text-pink-200 hover:border-pink-400/40 transition-all backdrop-blur-sm">
                <span>❤️</span>
                <span>Like this Mission</span>
                <span className="bg-pink-500/20 px-2 py-1 rounded-full text-xs">{post.likes}</span>
              </button>
              
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-blue-300 hover:text-blue-200 hover:border-blue-400/40 transition-all backdrop-blur-sm">
                <span>🔗</span>
                <span>Share Mission Log</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="py-16 border-t border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent mb-4">
                  Related Missions
                </h3>
                <p className="text-slate-400">
                  Explore more mission logs from our aerospace journey
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div 
                    key={relatedPost.id}
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] p-6"
                  >
                    {/* Image */}
                    <div className="mb-4 aspect-video rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/20 flex items-center justify-center overflow-hidden">
                      {relatedPost.image_url ? (
                        <Image 
                          src={relatedPost.image_url} 
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="text-3xl text-slate-500">🌌</div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>📅</span>
                        <span>{formatDate(relatedPost.published_at || relatedPost.created_at)}</span>
                      </div>

                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="block group-hover:text-cyan-400 transition-colors"
                      >
                        <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                      </Link>

                      {relatedPost.excerpt && (
                        <p className="text-slate-300 text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      )}

                      <Link 
                        href={`/blog/${relatedPost.slug}`}
                        className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
                      >
                        <span>Read Mission</span>
                        <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Back to Blog */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-full text-cyan-300 hover:text-cyan-200 hover:border-cyan-400/40 transition-all backdrop-blur-sm font-medium"
            >
              <span className="text-xl">🚀</span>
              <span>Return to Mission Control</span>
            </Link>
          </div>
        </div>
              </div>
      </div>
    </>
  )
} 