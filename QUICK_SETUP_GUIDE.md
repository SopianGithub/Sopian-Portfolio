# 🚀 Quick Setup Guide - Fix Database Error

## ❌ Error yang Terjadi:
```
relation "public.personal_info" does not exist
```

## ✅ Solusi: Setup Database Tables (Compatible Version)

### Step 1: Buka Supabase Dashboard
1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project aerospace-portfolio
3. Klik tab **SQL Editor** di sidebar kiri

### Step 2: Run Database Migration (NEW COMPATIBLE VERSION)
1. Klik **"New Query"** 
2. Copy paste seluruh isi file `supabase/migrations/20240611000001_linkedin_automation.sql` ke SQL Editor
3. Klik **"Run"** button (atau Ctrl/Cmd + Enter)
4. Pastikan muncul message: **"LinkedIn Automation Migration Completed Successfully! 🚀"**

### Step 3: Verify Tables Created
Run query ini untuk verify tables sudah dibuat:

```sql
-- Check if all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'personal_info', 
  'experiences',  -- Note: plural (existing table)
  'skills',       -- Note: existing table with UUID IDs
  'projects',     -- Note: existing table, now with source column
  'education', 
  'certifications',
  'linkedin_import_log'
);
```

Harus return 7 tables.

### Step 4: Test the System
1. Start development server: `npm run dev`
2. Buka http://localhost:3000
3. Homepage akan load tanpa error
4. Personal Branding section akan muncul dengan fallback data

### Step 5: Import LinkedIn Data
1. Buka http://localhost:3000/admin/content-recommendations
2. Scroll ke "LinkedIn Data Injection" section
3. Klik **"🚀 Inject Yayan's LinkedIn Data to Portfolio"**
4. Wait for success message
5. Refresh homepage untuk lihat data terbaru

## 📋 Compatibility Notes

**Database Schema Compatibility:**
- ✅ Uses existing `experiences` table (plural)
- ✅ Uses existing `skills` table with 1-10 level scale  
- ✅ Uses existing `projects` table with UUID primary keys
- ✅ Adds new `personal_info`, `education`, `certifications` tables
- ✅ Compatible with existing RLS policies and triggers

**Key Differences from Old Migration:**
- Uses existing table names and schemas
- Converts skill levels between 0-100% and 1-10 scale automatically
- Adds `title` column to `experiences` for backward compatibility
- Generates proper slugs for projects
- Works with existing UUID primary keys

## 🔧 Troubleshooting

### Jika Still Error setelah Migration:
1. **Check RLS Policies**:
```sql
-- Check RLS is enabled
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

2. **Check Environment Variables**:
```bash
# Make sure these are set in .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Reset Tables (if needed)**:
```sql
-- Only use if you need to completely reset NEW tables
DROP TABLE IF EXISTS personal_info CASCADE;
DROP TABLE IF EXISTS education CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;
DROP TABLE IF EXISTS linkedin_import_log CASCADE;

-- Then run 20240611000001_linkedin_automation.sql again
-- DO NOT drop existing tables: projects, experiences, skills, etc.
```

### Alternative: Use Supabase CLI (Advanced)
```bash
# If you have Supabase CLI installed
supabase migration new linkedin_automation
# Copy migration content to the new file
supabase db push
```

## ✅ Expected Result

After successful setup:
- ✅ Homepage loads without errors
- ✅ Personal Branding section displays with Yayan's data
- ✅ Admin interface works for content management
- ✅ LinkedIn data injection works smoothly
- ✅ Skills show as percentages (converted from 1-10 scale)
- ✅ Experience data shows in timeline format
- ✅ All aerospace animations work perfectly

## 🚀 Quick Commands Summary

```bash
# 1. Run database migration in Supabase SQL Editor
# (Copy content from supabase/migrations/20240611000001_linkedin_automation.sql)

# 2. Start development
npm run dev

# 3. Test homepage
# http://localhost:3000

# 4. Test admin
# http://localhost:3000/admin/content-recommendations

# 5. Inject LinkedIn data
# Click the inject button in admin interface
```

**Your LinkedIn automation system is now fully compatible with existing schema! 🚀** 