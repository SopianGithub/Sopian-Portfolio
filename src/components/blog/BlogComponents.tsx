import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface BlogNavigationProps {
  currentTitle?: string
}

export function BlogNavigation({ currentTitle }: BlogNavigationProps) {
  return (
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
            <span>{currentTitle ? 'Mission Log Active' : 'Mission Control'}</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

interface ReadingProgressBarProps {
  progress: number
}

export function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-slate-800/50 z-50">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-150 ease-out"
        style={{ width: `${Math.min(progress, 100)}%` }}
      />
    </div>
  )
}

interface FloatingActionButtonsProps {
  likes: number
  onLike: () => void
  onShare: () => void
  isLiked?: boolean
}

export function FloatingActionButtons({ likes, onLike, onShare, isLiked = false }: FloatingActionButtonsProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Like Button */}
      <button 
        onClick={onLike}
        className={`group relative overflow-hidden rounded-full p-4 backdrop-blur-xl border transition-all duration-300 hover:scale-110 ${
          isLiked 
            ? 'bg-pink-500/20 border-pink-400/40 text-pink-300' 
            : 'bg-slate-800/60 border-slate-600/30 text-slate-300 hover:border-pink-400/40 hover:text-pink-300'
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative flex items-center gap-2">
          <span className={`text-xl ${isLiked ? 'animate-bounce' : ''}`}>❤️</span>
          <span className="text-sm font-medium">{likes}</span>
        </div>
      </button>

      {/* Share Button */}
      <button 
        onClick={onShare}
        className="group relative overflow-hidden rounded-full p-4 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 hover:scale-110"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="relative text-xl">🔗</span>
      </button>
    </div>
  )
}

interface MissionStatusBadgeProps {
  status: 'active' | 'featured' | 'reading' | 'complete'
  text: string
  icon?: string
}

export function MissionStatusBadge({ status, text, icon }: MissionStatusBadgeProps) {
  const statusClasses = {
    active: 'bg-green-500/10 border-green-500/20 text-green-300',
    featured: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
    reading: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-300',
    complete: 'bg-blue-500/10 border-blue-500/20 text-blue-300'
  }

  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm font-medium text-sm ${statusClasses[status]}`}>
      {icon && <span>{icon}</span>}
      <span>{text}</span>
      <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
    </div>
  )
}

interface SpaceParticlesProps {
  count?: number
}

export function SpaceParticles({ count = 8 }: SpaceParticlesProps) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: count }, (_, i) => {
        const variants = ['', 'variant-2', 'variant-3']
        const variant = variants[i % 3]
        const top = Math.random() * 100
        const left = Math.random() * 100
        
        return (
          <div
            key={i}
            className={`mission-particle ${variant}`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        )
      })}
    </div>
  )
}

interface CosmicDividerProps {
  text?: string
  icon?: string
}

export function CosmicDivider({ text, icon }: CosmicDividerProps) {
  return (
    <div className="flex items-center gap-4 my-12">
      {icon && (
        <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/30">
          <span className="text-2xl">{icon}</span>
        </div>
      )}
      {text && <h2 className="text-3xl font-bold text-white">{text}</h2>}
      <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
    </div>
  )
}

interface BlogMetaInfoProps {
  date: string
  readTime: number
  views: number
  likes: number
}

export function BlogMetaInfo({ date, readTime, views, likes }: BlogMetaInfoProps) {
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
    <div className="flex flex-wrap items-center justify-center gap-6 text-slate-400 mb-12">
      <div className="flex items-center gap-2">
        <span>📅</span>
        <span>{formatDate(date)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>⏱️</span>
        <span>{formatReadingTime(readTime)}</span>
      </div>
      <div className="flex items-center gap-2">
        <span>👁️</span>
        <span>{views.toLocaleString()} views</span>
      </div>
      <div className="flex items-center gap-2">
        <span>❤️</span>
        <span>{likes.toLocaleString()} likes</span>
      </div>
    </div>
  )
}

interface BlogTagsProps {
  tags: string[]
  centered?: boolean
}

export function BlogTags({ tags, centered = false }: BlogTagsProps) {
  if (!tags || tags.length === 0) return null

  const containerClass = centered 
    ? "flex flex-wrap justify-center gap-3" 
    : "flex flex-wrap gap-3"

  return (
    <div className={containerClass}>
      {tags.map((tag, index) => (
        <span 
          key={index}
          className="px-4 py-2 text-sm font-medium bg-slate-800/60 text-slate-300 rounded-full border border-slate-600/30 backdrop-blur-sm hover:border-cyan-500/30 transition-colors cursor-pointer"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}

interface RelatedPostCardProps {
  post: {
    id: string
    title: string
    slug: string
    excerpt?: string
    image_url?: string
    published_at?: string
    created_at: string
  }
  index: number
}

export function RelatedPostCard({ post, index }: RelatedPostCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div 
      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-800/40 to-slate-900/60 backdrop-blur-sm border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:scale-[1.02] p-6 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="mb-4 aspect-video rounded-lg bg-gradient-to-br from-slate-700/30 to-slate-800/30 border border-slate-600/20 flex items-center justify-center overflow-hidden">
        {post.image_url ? (
          <Image 
            src={post.image_url} 
            alt={post.title}
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
          <span>{formatDate(post.published_at || post.created_at)}</span>
        </div>

        <Link 
          href={`/blog/${post.slug}`}
          className="block group-hover:text-cyan-400 transition-colors"
        >
          <h4 className="text-lg font-bold text-white mb-2 line-clamp-2">
            {post.title}
          </h4>
        </Link>

        {post.excerpt && (
          <p className="text-slate-300 text-sm line-clamp-2">
            {post.excerpt}
          </p>
        )}

        <Link 
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
        >
          <span>Read Mission</span>
          <span className="group-hover:translate-x-0.5 transition-transform">→</span>
        </Link>
      </div>
    </div>
  )
}

interface BackToTopButtonProps {
  visible: boolean
  onClick: () => void
}

export function BackToTopButton({ visible, onClick }: BackToTopButtonProps) {
  if (!visible) return null

  return (
    <button 
      onClick={onClick}
      className="fixed bottom-24 right-6 z-50 p-3 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-all duration-300 hover:scale-110 rounded-full"
    >
      <span className="text-xl">↑</span>
    </button>
  )
} 