-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable Row Level Security
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- Create custom types
CREATE TYPE project_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE blog_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE experience_type AS ENUM ('full_time', 'part_time', 'contract', 'freelance', 'internship');

-- Projects table
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    image_url TEXT,
    demo_url TEXT,
    github_url TEXT,
    technologies JSONB DEFAULT '[]'::jsonb,
    features JSONB DEFAULT '[]'::jsonb,
    status project_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT,
    excerpt VARCHAR(500),
    image_url TEXT,
    tags JSONB DEFAULT '[]'::jsonb,
    status blog_status DEFAULT 'draft',
    featured BOOLEAN DEFAULT false,
    read_time INTEGER DEFAULT 5, -- in minutes
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Work experiences table
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE, -- NULL means current job
    type experience_type DEFAULT 'full_time',
    technologies JSONB DEFAULT '[]'::jsonb,
    achievements JSONB DEFAULT '[]'::jsonb,
    company_logo_url TEXT,
    company_website TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(100) NOT NULL, -- e.g., 'frontend', 'backend', 'database', 'tools'
    level INTEGER DEFAULT 1 CHECK (level >= 1 AND level <= 10), -- 1-10 proficiency level
    icon_url TEXT,
    color VARCHAR(7), -- hex color code
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Admin users table (for CMS)
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Settings table for site configuration
CREATE TABLE site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value JSONB,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(featured);
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_featured ON blog_posts(featured);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX idx_experiences_start_date ON experiences(start_date DESC);
CREATE INDEX idx_skills_category ON skills(category);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view published projects" ON projects
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view published blog posts" ON blog_posts
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public can view experiences" ON experiences
    FOR SELECT USING (true);

CREATE POLICY "Public can view skills" ON skills
    FOR SELECT USING (true);

CREATE POLICY "Public can create contact messages" ON contact_messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can view site settings" ON site_settings
    FOR SELECT USING (true);

-- Admin policies (authenticated users)
CREATE POLICY "Admin can manage projects" ON projects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage blog posts" ON blog_posts
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage experiences" ON experiences
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage skills" ON skills
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can view contact messages" ON contact_messages
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage admin users" ON admin_users
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admin can manage site settings" ON site_settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert default site settings
INSERT INTO site_settings (key, value, description) VALUES
('site_title', '"Aerospace Portfolio"', 'Website title'),
('site_description', '"Modern portfolio website for fullstack developer"', 'Website description'),
('site_keywords', '["portfolio", "developer", "aerospace", "nextjs", "react"]', 'SEO keywords'),
('social_links', '{"github": "", "linkedin": "", "twitter": "", "email": ""}', 'Social media links'),
('hero_title', '"Welcome to the Future"', 'Hero section title'),
('hero_subtitle', '"Building tomorrow''s web experiences today"', 'Hero section subtitle'),
('about_description', '"Passionate fullstack developer with expertise in modern web technologies."', 'About section description');

-- Insert sample data for development
INSERT INTO skills (name, category, level, color) VALUES
('React', 'frontend', 9, '#61DAFB'),
('Next.js', 'frontend', 9, '#000000'),
('TypeScript', 'frontend', 8, '#3178C6'),
('Node.js', 'backend', 8, '#339933'),
('PostgreSQL', 'database', 7, '#336791'),
('Supabase', 'backend', 8, '#3ECF8E'),
('TailwindCSS', 'frontend', 9, '#06B6D4'),
('Docker', 'tools', 6, '#2496ED'),
('Git', 'tools', 9, '#F05032'),
('Vercel', 'tools', 8, '#000000'); 