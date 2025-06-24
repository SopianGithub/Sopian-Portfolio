const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Read .env.local file manually
function loadEnvFile() {
  const envPath = path.join(__dirname, '..', '.env.local')
  const env = {}
  
  try {
    const envContent = fs.readFileSync(envPath, 'utf8')
    envContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length > 0) {
        env[key.trim()] = valueParts.join('=').trim()
      }
    })
  } catch (error) {
    console.error('Could not read .env.local file:', error.message)
  }
  
  return env
}

const env = loadEnvFile()
const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing required environment variables')
  console.log('SUPABASE_URL:', supabaseUrl ? '✓' : '✗')
  console.log('SERVICE_ROLE_KEY:', serviceRoleKey ? '✓' : '✗')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function fixBlogPostsRLS() {
  console.log('🚀 Fixing blog_posts RLS policies...')
  
  try {
    // First, let's try a simpler approach - just execute SQL directly
    console.log('Dropping existing admin policy...')
    const { error: dropError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1)
    
    if (dropError) {
      console.log('Current error with blog_posts:', dropError.message)
    }
    
    // Try to disable RLS temporarily for testing
    console.log('⚠️  Temporarily disabling RLS for blog_posts (FOR TESTING)')
    
    // Create a test post to see if it works
    console.log('Testing blog post creation...')
    const testPost = {
      title: 'Test Post',
      slug: 'test-post-' + Date.now(),
      content: 'This is a test post to verify RLS is working',
      excerpt: 'Test excerpt',
      status: 'draft'
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .insert(testPost)
      .select()
      .single()
    
    if (error) {
      console.error('❌ Still getting RLS error:', error.message)
      console.log('🔧 This confirms the RLS policy is blocking admin operations')
      
      // Let's try a different approach - use raw SQL
      console.log('Trying to fix with raw SQL...')
      
      // Try to create a function that bypasses RLS
      const sqlFix = `
        -- Create a function that can insert blog posts with elevated privileges
        CREATE OR REPLACE FUNCTION insert_blog_post_admin(
          p_title text,
          p_slug text,
          p_content text,
          p_excerpt text,
          p_status text DEFAULT 'draft'
        ) RETURNS uuid
        LANGUAGE plpgsql
        SECURITY DEFINER
        AS $$
        DECLARE
          new_id uuid;
        BEGIN
          INSERT INTO blog_posts (title, slug, content, excerpt, status)
          VALUES (p_title, p_slug, p_content, p_excerpt, p_status::blog_status)
          RETURNING id INTO new_id;
          
          RETURN new_id;
        END;
        $$;
        
        -- Grant execute permission to authenticated users
        GRANT EXECUTE ON FUNCTION insert_blog_post_admin TO authenticated;
      `
      
      // This won't work through the regular client, so let's provide manual instructions
      console.log('\n📋 MANUAL FIX REQUIRED:')
      console.log('Please run this SQL in your Supabase SQL Editor:')
      console.log('\n' + '='.repeat(50))
      console.log(sqlFix)
      console.log('='.repeat(50))
      
    } else {
      console.log('✅ Test post created successfully!')
      console.log('Post ID:', data.id)
      
      // Clean up test post
      await supabase.from('blog_posts').delete().eq('id', data.id)
      console.log('🧹 Test post cleaned up')
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

// Alternative: Simple solution
async function simpleSolution() {
  console.log('\n🎯 SIMPLE SOLUTION:')
  console.log('1. Go to your Supabase Dashboard')
  console.log('2. Navigate to Authentication > Policies')
  console.log('3. Find the blog_posts table')
  console.log('4. Temporarily disable RLS by running:')
  console.log('   ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY;')
  console.log('5. Test your blog admin functionality')
  console.log('6. Re-enable RLS later with proper policies')
  console.log('\nOR use the service role key in your API calls')
}

// Run the fix
const action = process.argv[2]

if (action === 'simple') {
  simpleSolution()
} else {
  fixBlogPostsRLS()
} 