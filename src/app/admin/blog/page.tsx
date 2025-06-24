import React from 'react';
import { BlogStats } from '@/components/admin/BlogStats';
import { BlogPostsTable } from '@/components/admin/BlogPostsTable';
import Link from 'next/link';
import '../../../styles/blog-admin.css';

export default function BlogAdminPage() {
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold heading-primary mb-2">
                🚀 Mission Control Center
              </h1>
              <p className="text-muted text-lg">
                Command your space blog operations from this aerospace hub
              </p>
            </div>
            <Link
              href="/admin/blog/new"
              className="btn-primary inline-flex items-center gap-2"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Launch New Mission
            </Link>
          </div>

          {/* Stats Section */}
          <div className="mb-8">
            <BlogStats />
          </div>

          {/* Posts Table */}
          <div className="component-card p-6">
            <h2 className="text-2xl font-semibold heading-secondary mb-6">
              📡 Active Mission Reports
            </h2>
            <BlogPostsTable />
          </div>
        </div>
      </div>
    </div>
  );
} 