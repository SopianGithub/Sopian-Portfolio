import React from 'react';
import { BlogPostForm } from '@/components/admin/BlogPostForm';
import Link from 'next/link';
import '../../../../styles/blog-admin.css';

export default function NewBlogPostPage() {
  return (
    <div className="blog-admin">
      <div className="space-environment">
        <div className="stars-backdrop"></div>
        <div className="space-particle large glow" style={{ top: '10%', left: '15%' }}></div>
        <div className="space-particle" style={{ top: '20%', right: '20%' }}></div>
        <div className="space-particle large" style={{ bottom: '30%', left: '10%' }}></div>
        <div className="space-particle glow" style={{ bottom: '15%', right: '15%' }}></div>
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold heading-primary mb-2">
                🚀 Launch New Mission
              </h1>
              <p className="text-muted text-lg">
                Create and configure your next space mission report
              </p>
            </div>
            <Link
              href="/admin/blog"
              className="btn-secondary inline-flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Control Center
            </Link>
          </div>

          {/* Form */}
          <div className="feature-card p-8">
            <BlogPostForm />
          </div>
        </div>
      </div>
    </div>
  );
} 