'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { BlogAdminAPI } from '@/lib/api/blog-admin'
import { RichTextEditor } from './RichTextEditor'
import type { BlogPost, BlogPostInsert, BlogPostUpdate } from '@/types/database'

interface BlogPostFormProps {
  post?: BlogPost
  isEditing?: boolean
}

export function BlogPostForm({ post, isEditing = false }: BlogPostFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    image_url: post?.image_url || '',
    tags: (post?.tags as string[]) || [],
    status: post?.status || 'draft' as 'draft' | 'published' | 'archived',
    featured: post?.featured || false,
    read_time: post?.read_time || 1
  })

  const [tagInput, setTagInput] = useState('')

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditing && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.title, isEditing])

  // Estimate read time based on content
  useEffect(() => {
    if (formData.content) {
      const words = formData.content.split(' ').filter(w => w.length > 0).length
      const readTime = Math.max(1, Math.ceil(words / 200)) // ~200 words per minute
      setFormData(prev => ({ ...prev, read_time: readTime }))
    }
  }, [formData.content])

  const handleSubmit = async (e: React.FormEvent, action: 'save' | 'publish') => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validation
      if (!formData.title.trim()) {
        throw new Error('Title is required')
      }
      if (!formData.slug.trim()) {
        throw new Error('Slug is required')
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required')
      }

      // Check slug availability
      if (!isEditing || formData.slug !== post?.slug) {
        const isSlugAvailable = await BlogAdminAPI.isSlugAvailable(formData.slug, post?.id)
        if (!isSlugAvailable) {
          throw new Error('This slug is already taken. Please use a different one.')
        }
      }

      const postData = {
        ...formData,
        status: action === 'publish' ? 'published' : formData.status,
        published_at: action === 'publish' ? new Date().toISOString() : null
      }

      let result: BlogPost
      if (isEditing && post) {
        result = await BlogAdminAPI.updatePost(post.id, postData as BlogPostUpdate)
      } else {
        result = await BlogAdminAPI.createPost(postData as BlogPostInsert)
      }

      // Redirect to the blog admin or edit page
      if (action === 'publish') {
        router.push('/admin/blog')
      } else {
        router.push(`/admin/blog/${result.id}/edit`)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const tag = tagInput.trim()
      if (tag && !formData.tags.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tag]
        }))
      }
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  // Aerospace-themed input styles
  const inputStyles = "enhanced-input w-full relative z-10 focus:z-20"
  const textareaStyles = "enhanced-textarea w-full relative z-10 focus:z-20 resize-none"
  const selectStyles = "enhanced-select w-full relative z-10 focus:z-20"

  return (
    <div className="feature-card p-8 relative z-0">
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className="absolute top-[10%] left-[5%] w-1 h-1 bg-cyan-400 rounded-full opacity-40 animate-pulse"></div>
        <div className="absolute top-[70%] right-[10%] w-0.5 h-0.5 bg-purple-400 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-[20%] left-[80%] w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-50 animate-pulse delay-500"></div>
        <div className="absolute top-[40%] right-[60%] w-0.5 h-0.5 bg-purple-300 rounded-full opacity-25 animate-pulse delay-700"></div>
      </div>
      
      <form onSubmit={(e) => handleSubmit(e, 'save')} className="space-y-8 relative z-10">
        {error && (
          <div className="admin-error relative z-10">
            🚨 {error}
          </div>
        )}

        {/* Title & Slug */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">
              🚀 Mission Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className={inputStyles}
              placeholder="e.g., Building My First Rocket Engine"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">
              🔗 URL Slug <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className={inputStyles}
              placeholder="e.g., building-my-first-rocket-engine"
              required
            />
            <p className="form-hint">
              URL-friendly version of your title (auto-generated)
            </p>
          </div>
        </div>

        {/* Excerpt */}
        <div className="form-group">
          <label className="form-label">
            📋 Mission Summary
          </label>
          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            rows={3}
            className={textareaStyles}
            placeholder="Brief summary of this mission log..."
          />
          <p className="form-hint">
            Short description that appears in blog previews and search results
          </p>
        </div>

        {/* Rich Text Content Editor */}
        <div className="form-group relative z-0">
          <label className="form-label">
            📝 Mission Report <span className="text-red-400">*</span>
          </label>
          <div className="relative z-10">
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder="Write your detailed mission report here... Use Markdown for formatting."
              height={500}
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="form-group">
          <label className="form-label">
            🖼️ Featured Image URL
          </label>
          <input
            type="url"
            value={formData.image_url}
            onChange={(e) => setFormData(prev => ({ ...prev, image_url: e.target.value }))}
            className={inputStyles}
            placeholder="https://example.com/image.jpg"
          />
          {formData.image_url && (
            <div className="mt-4 relative z-10">
              <div className="relative w-72 h-32 rounded-lg border border-cyan-500/30 component-card p-2 overflow-hidden">
                <Image 
                  src={formData.image_url} 
                  alt="Preview" 
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Tags */}
        <div className="form-group">
          <label className="form-label">
            🏷️ Mission Tags
          </label>
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={addTag}
            className={inputStyles}
            placeholder="Enter tags and press Enter or comma to add..."
          />
          <div className="flex flex-wrap gap-2 mt-3 relative z-10">
            {formData.tags.map(tag => (
              <span
                key={tag}
                className="admin-tag-item inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 rounded-full text-sm border border-cyan-500/30 relative z-10 backdrop-blur-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-cyan-300 transition-colors relative z-10 hover:bg-red-500/20 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="form-group">
            <label className="form-label">
              🎯 Mission Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                status: e.target.value as 'draft' | 'published' | 'archived' 
              }))}
              className={selectStyles}
            >
              <option value="draft">📝 Draft</option>
              <option value="published">🚀 Published</option>
              <option value="archived">📦 Archived</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              ⏱️ Read Time (minutes)
            </label>
            <input
              type="number"
              min="1"
              value={formData.read_time}
              onChange={(e) => setFormData(prev => ({ ...prev, read_time: parseInt(e.target.value) || 1 }))}
              className={inputStyles}
            />
          </div>

          <div className="form-group flex items-center pt-8">
            <label className="flex items-center gap-3 cursor-pointer relative z-10">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                className="enhanced-checkbox w-5 h-5 rounded border-cyan-500/50 bg-slate-800/50 text-cyan-500 focus:ring-cyan-500/20 relative z-10 accent-cyan-500"
              />
              <span className="text-sm font-medium text-accent">⭐ Featured Mission</span>
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gradient-to-r from-cyan-500/30 via-purple-500/20 to-cyan-500/30 relative z-10">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
          >
            {loading ? '⏳ Saving Mission Log...' : '💾 Save Draft'}
          </button>
          
          <button
            type="button"
            onClick={(e) => handleSubmit(e, 'publish')}
            disabled={loading}
            className="btn-success flex-1 disabled:opacity-50 disabled:cursor-not-allowed relative z-10"
          >
            {loading ? '⏳ Launching Mission...' : '🚀 Launch Mission'}
          </button>

          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary px-6 relative z-10"
          >
            ❌ Abort Mission
          </button>
        </div>
      </form>
    </div>
  )
} 