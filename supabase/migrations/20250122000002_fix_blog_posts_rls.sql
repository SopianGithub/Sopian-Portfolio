-- Fix blog_posts RLS policies for admin operations
-- Drop existing admin policy
DROP POLICY IF EXISTS "Admin can manage blog posts" ON blog_posts;

-- Create more specific policies for blog_posts
-- Allow authenticated users to view all blog posts (for admin)
CREATE POLICY "Authenticated users can view all blog posts" ON blog_posts
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert blog posts
CREATE POLICY "Authenticated users can insert blog posts" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update blog posts
CREATE POLICY "Authenticated users can update blog posts" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete blog posts
CREATE POLICY "Authenticated users can delete blog posts" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Alternative: Create service role policy for admin operations
-- This allows operations from server-side code using service role
CREATE POLICY "Service role can manage blog posts" ON blog_posts
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Also create policy for admin users table verification
CREATE POLICY "Admin users can manage blog posts" ON blog_posts
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM admin_users 
            WHERE admin_users.email = auth.jwt() ->> 'email'
        )
    ); 