-- LinkedIn Automation Migration - Compatible with Existing Schema
-- This migration works with the existing 20240610000001_initial_schema.sql

-- 1. Personal Info Table (NEW)
CREATE TABLE personal_info (
  id BIGINT PRIMARY KEY DEFAULT 1,
  name TEXT NOT NULL,
  tagline TEXT,
  summary TEXT,
  location TEXT,
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on personal_info
ALTER TABLE personal_info ENABLE ROW LEVEL SECURITY;

-- Create policies for personal_info
CREATE POLICY "Public can view personal_info" ON personal_info
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage personal_info" ON personal_info
  FOR ALL USING (auth.role() = 'authenticated');

-- 2. Add missing columns to existing experiences table
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE experiences ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;

-- Update existing experiences table to be compatible
-- Map position -> title for backward compatibility
UPDATE experiences SET title = position WHERE title IS NULL;

-- 3. Education Table (NEW)
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  grade TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on education
ALTER TABLE education ENABLE ROW LEVEL SECURITY;

-- Create policies for education
CREATE POLICY "Public can view education" ON education
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage education" ON education
  FOR ALL USING (auth.role() = 'authenticated');

-- 4. Certifications Table (NEW)
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date TEXT NOT NULL,
  expiration_date TEXT,
  credential_id TEXT,
  credential_url TEXT,
  skills JSONB DEFAULT '[]'::jsonb,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on certifications
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for certifications
CREATE POLICY "Public can view certifications" ON certifications
  FOR SELECT USING (true);

CREATE POLICY "Admin can manage certifications" ON certifications
  FOR ALL USING (auth.role() = 'authenticated');

-- 5. Add source column to existing projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS source TEXT DEFAULT 'manual';

-- 6. LinkedIn Import Log Table (NEW)
CREATE TABLE linkedin_import_log (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  import_type TEXT NOT NULL,
  records_imported INTEGER DEFAULT 0,
  success BOOLEAN DEFAULT true,
  error_message TEXT,
  imported_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on linkedin_import_log
ALTER TABLE linkedin_import_log ENABLE ROW LEVEL SECURITY;

-- Create policies for linkedin_import_log
CREATE POLICY "Admin can manage linkedin_import_log" ON linkedin_import_log
  FOR ALL USING (auth.role() = 'authenticated');

-- 7. Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_experiences_featured ON experiences(featured);
CREATE INDEX IF NOT EXISTS idx_projects_source ON projects(source);
CREATE INDEX IF NOT EXISTS idx_education_sort_order ON education(sort_order);
CREATE INDEX IF NOT EXISTS idx_certifications_sort_order ON certifications(sort_order);

-- 8. Add update triggers to new tables
CREATE TRIGGER update_personal_info_updated_at BEFORE UPDATE ON personal_info 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. Insert sample personal info
INSERT INTO personal_info (id, name, tagline, summary, location, profile_image)
VALUES (
  1,
  'Yayan Sopian',
  'Senior Full Stack Developer & AI Technology Specialist | 5+ Years Building React & Node.js & Python Solutions',
  '🚀 Passionate Senior Full Stack Developer with 5+ years of pioneering experience in building scalable, mission-critical web applications. Specializing in React, Node.js, Python, and AI/ML integration to create innovative digital solutions that drive business growth and user engagement.

Passionate about transforming complex challenges into elegant, scalable solutions that drive business impact and user success.',
  'Jakarta, Indonesia',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
) ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  summary = EXCLUDED.summary,
  location = EXCLUDED.location,
  profile_image = EXCLUDED.profile_image,
  updated_at = NOW();

-- 10. Helper function to convert skill level from 1-10 to 0-100 scale
CREATE OR REPLACE FUNCTION get_skill_percentage(skill_level INTEGER)
RETURNS INTEGER AS $$
BEGIN
  -- Convert 1-10 scale to 0-100 percentage
  RETURN CASE 
    WHEN skill_level <= 1 THEN 10
    WHEN skill_level >= 10 THEN 100
    ELSE skill_level * 10
  END;
END;
$$ LANGUAGE plpgsql;

-- Success message
SELECT 'LinkedIn Automation Migration Completed Successfully! 🚀' as status,
       'Compatible with existing schema ✅' as compatibility; 