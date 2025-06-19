-- Create admin_users table for managing admin access
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_by UUID,
    notes TEXT
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_admin_users_updated_at
    BEFORE UPDATE ON admin_users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert default admin user (you should change this email and use your real email)
INSERT INTO admin_users (email, role, is_active, notes)
VALUES 
    ('admin@aerospace.com', 'super_admin', true, 'Default admin user - Change this email to your real email')
ON CONFLICT (email) DO NOTHING;

-- Add RLS (Row Level Security) policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role to access all data
CREATE POLICY "Allow service role full access" ON admin_users
    FOR ALL USING (auth.role() = 'service_role');

-- Policy: Allow authenticated users to read their own admin record
CREATE POLICY "Allow users to read own admin record" ON admin_users
    FOR SELECT USING (auth.email() = email AND is_active = true);

-- Add comment to table
COMMENT ON TABLE admin_users IS 'Table for managing admin users who can access the admin panel';
COMMENT ON COLUMN admin_users.email IS 'Email address of the admin user (must match auth.users.email)';
COMMENT ON COLUMN admin_users.role IS 'Role of the admin user (admin or super_admin)';
COMMENT ON COLUMN admin_users.is_active IS 'Whether the admin user is active and can access the admin panel';
COMMENT ON COLUMN admin_users.notes IS 'Optional notes about the admin user'; 