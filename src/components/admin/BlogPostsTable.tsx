'use client'

import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { BlogAdminAPI } from '@/lib/api/blog-admin'
import type { BlogPost } from '@/types/database'
import { formatDistanceToNow } from 'date-fns'

interface BlogPostsTableProps {
  limit?: number
}

export function BlogPostsTable({ limit }: BlogPostsTableProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft' | 'featured'>('all')

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      const data = await BlogAdminAPI.getAllPosts()
      setPosts(data.slice(0, limit))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load posts')
    } finally {
      setLoading(false)
    }
  }, [limit])

  useEffect(() => {
    loadPosts()
  }, [loadPosts])

  const handleStatusChange = async (id: string, newStatus: 'published' | 'draft') => {
    try {
      if (newStatus === 'published') {
        await BlogAdminAPI.publishPost(id)
      } else {
        await BlogAdminAPI.unpublishPost(id)
      }
      await loadPosts() // Reload posts
    } catch (err) {
      console.error('Failed to update status:', err)
      alert('Failed to update post status')
    }
  }

  const handleToggleFeatured = async (id: string) => {
    try {
      await BlogAdminAPI.toggleFeatured(id)
      await loadPosts() // Reload posts
    } catch (err) {
      console.error('Failed to toggle featured:', err)
      alert('Failed to toggle featured status')
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      return
    }

    try {
      await BlogAdminAPI.deletePost(id)
      await loadPosts() // Reload posts
    } catch (err) {
      console.error('Failed to delete post:', err)
      alert('Failed to delete post')
    }
  }

  const filteredPosts = posts.filter(post => {
    switch (filter) {
      case 'published':
        return post.status === 'published'
      case 'draft':
        return post.status === 'draft'
      case 'featured':
        return post.featured
      default:
        return true
    }
  })

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-500/20 text-green-400 border-green-500/30',
      draft: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      archived: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles] || styles.draft}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="component-card p-6">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center space-x-4">
              <div className="h-4 bg-slate-700/50 rounded w-1/4"></div>
              <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
              <div className="h-4 bg-slate-700/50 rounded w-1/6"></div>
              <div className="h-4 bg-slate-700/50 rounded w-1/6"></div>
              <div className="h-4 bg-slate-700/50 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="component-card p-6 text-center">
        <p className="text-red-400 mb-4">⚠️ {error}</p>
        <button 
          onClick={loadPosts}
          className="secondary-btn"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="component-card p-12 text-center">
        <div className="text-6xl mb-6">📝</div>
        <h3 className="text-2xl font-bold heading-secondary mb-4">No Mission Logs Yet</h3>
        <p className="text-muted mb-6">Start documenting your space journey by creating your first blog post.</p>
        <Link href="/admin/blog/new" className="holo-btn">
          🚀 Create Your First Log
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 p-1 component-card">
        {(['all', 'published', 'draft', 'featured'] as const).map(filterType => {
          const count = filterType === 'all' ? posts.length : 
                      filterType === 'featured' ? posts.filter(p => p.featured).length :
                      posts.filter(p => p.status === filterType).length
          
          return (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                filter === filterType
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-muted hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)} ({count})
            </button>
          )
        })}
      </div>

      {/* Posts Table */}
      <div className="component-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Title</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Views</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Likes</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Created</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post, index) => (
                <tr 
                  key={post.id} 
                  className="border-b border-slate-800/30 hover:bg-slate-800/20 transition-colors"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      {post.featured && <span className="text-yellow-400">⭐</span>}
                      <div>
                        <Link 
                          href={`/admin/blog/${post.id}/edit`}
                          className="font-medium heading-secondary hover:text-cyan-400 transition-colors line-clamp-1"
                        >
                          {post.title}
                        </Link>
                        {post.excerpt && (
                          <p className="text-sm text-muted mt-1 line-clamp-1">{post.excerpt}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    {getStatusBadge(post.status)}
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted flex items-center gap-1">
                      👁️ {post.views.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted flex items-center gap-1">
                      ❤️ {post.likes.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-sm text-muted">
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </span>
                  </td>
                  <td className="py-4 px-6 relative z-10">
                    <div className="flex items-center gap-2 relative z-20">
                      {/* Quick Actions with proper z-index */}
                      <Link 
                        href={`/admin/blog/${post.id}/edit`}
                        className="relative z-30 p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40"
                        title="Edit Mission"
                      >
                        <span className="text-sm">✏️</span>
                      </Link>
                      
                      <button
                        onClick={() => handleToggleFeatured(post.id)}
                        className={`relative z-30 p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg backdrop-blur-sm border ${
                          post.featured 
                            ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 hover:shadow-yellow-500/20 border-yellow-500/20 hover:border-yellow-400/40' 
                            : 'bg-slate-600/20 text-slate-400 hover:bg-slate-600/30 hover:shadow-slate-500/20 border-slate-600/20 hover:border-slate-400/40'
                        }`}
                        title={post.featured ? 'Remove from featured' : 'Add to featured'}
                      >
                        <span className="text-sm">⭐</span>
                      </button>

                      <button
                        onClick={() => handleStatusChange(
                          post.id, 
                          post.status === 'published' ? 'draft' : 'published'
                        )}
                        className={`relative z-30 p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg backdrop-blur-sm border ${
                          post.status === 'published'
                            ? 'bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 hover:shadow-orange-500/20 border-orange-500/20 hover:border-orange-400/40'
                            : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:shadow-green-500/20 border-green-500/20 hover:border-green-400/40'
                        }`}
                        title={post.status === 'published' ? 'Abort Mission' : 'Launch Mission'}
                      >
                        <span className="text-sm">{post.status === 'published' ? '📝' : '🚀'}</span>
                      </button>

                      <button
                        onClick={() => handleDelete(post.id, post.title)}
                        className="relative z-30 p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-red-500/20 backdrop-blur-sm border border-red-500/20 hover:border-red-400/40"
                        title="Destroy Mission"
                      >
                        <span className="text-sm">🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="text-center text-muted">
        <p>Showing {filteredPosts.length} of {posts.length} mission logs</p>
      </div>
    </div>
  )
} 