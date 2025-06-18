# 🚀 Aerospace Portfolio - Database Setup Guide

## Overview
This guide will help you set up the Supabase database for the Aerospace Portfolio website.

## Prerequisites
- Supabase account
- Node.js installed
- Project cloned locally

## 1. Supabase Project Setup

### Create a new Supabase project:
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note down your project URL and anon key

### Get your credentials:
- **Project URL**: Found in Settings > API
- **Anon Key**: Found in Settings > API  
- **Service Role Key**: Found in Settings > API (for admin operations)

## 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional: Service Role Key for admin operations
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Database Migration

### Run the migration:
```bash
# Connect to your Supabase project
npx supabase link --project-ref your-project-ref

# Push the migration to your database
npx supabase db push
```

### Alternative: Manual Setup
If you prefer to set up manually, copy the SQL from `supabase/migrations/20240610000001_initial_schema.sql` and run it in your Supabase SQL editor.

## 4. Database Schema

The database includes the following tables:

### Core Tables:
- **projects** - Portfolio projects with status, features, technologies
- **blog_posts** - Blog articles with tags, views, likes
- **experiences** - Work experience with technologies and achievements  
- **skills** - Technical skills with proficiency levels
- **contact_messages** - Contact form submissions
- **admin_users** - Admin user management
- **site_settings** - Site configuration

### Features:
- ✅ Row Level Security (RLS) enabled
- ✅ Automatic timestamps with triggers
- ✅ Optimized indexes for performance
- ✅ Type-safe TypeScript definitions
- ✅ Sample data included

## 5. API Services

The project includes type-safe API services for each entity:

```typescript
// Projects
import { ProjectsAPI } from '@/lib/api/projects'
const projects = await ProjectsAPI.getPublishedProjects()

// Blog Posts  
import { BlogAPI } from '@/lib/api/blog'
const posts = await BlogAPI.getPublishedPosts()

// Experiences
import { ExperiencesAPI } from '@/lib/api/experiences'
const experiences = await ExperiencesAPI.getAllExperiences()

// Skills
import { SkillsAPI } from '@/lib/api/skills'
const skills = await SkillsAPI.getAllSkills()
```

## 6. Row Level Security Policies

### Public Access:
- ✅ View published projects and blog posts
- ✅ View experiences and skills
- ✅ Submit contact messages
- ✅ View site settings

### Admin Access (Authenticated):
- ✅ Full CRUD operations on all entities
- ✅ Manage drafts and unpublished content
- ✅ View contact messages

## 7. Sample Data

The migration includes sample skills data to get you started:
- Frontend: React, Next.js, TypeScript, TailwindCSS
- Backend: Node.js, Supabase
- Database: PostgreSQL
- Tools: Docker, Git, Vercel

## 8. Verification

Test your setup:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test database connection
# The app should load without database errors
```

## 9. Next Steps

1. **Customize sample data** - Update skills, add your projects and experiences
2. **Configure site settings** - Update site title, description, social links
3. **Set up authentication** - Configure Supabase Auth for admin access
4. **Deploy** - Deploy to Vercel with environment variables

## Troubleshooting

### Common Issues:

**Connection Error:**
- Verify environment variables are correct
- Check Supabase project is active
- Ensure RLS policies allow access

**Migration Failed:**
- Check SQL syntax in migration file
- Verify Supabase CLI is connected to correct project
- Try running migration manually in SQL editor

**Type Errors:**
- Regenerate types: `npx supabase gen types typescript --project-id your-project-ref > src/types/database.ts`
- Ensure TypeScript version compatibility

## Support

For issues or questions:
1. Check the [Supabase documentation](https://supabase.com/docs)
2. Review the project's GitHub issues
3. Contact the development team

---

🚀 **Happy coding!** Your Aerospace Portfolio database is ready for takeoff! 