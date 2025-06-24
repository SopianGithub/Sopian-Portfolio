import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/database'

// Server-side admin client with service role
const createServerAdminClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')
    
    const supabase = createServerAdminClient()
    
    switch (action) {
      case 'getAllPosts':
        const { data: posts, error: postsError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
        
        if (postsError) throw postsError
        return NextResponse.json({ data: posts })
      
      case 'getPost':
        const id = searchParams.get('id')
        if (!id) throw new Error('Post ID required')
        
        const { data: post, error: postError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('id', id)
          .single()
        
        if (postError) throw postError
        return NextResponse.json({ data: post })
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Blog API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, data } = body
    
    const supabase = createServerAdminClient()
    
    switch (action) {
      case 'createPost':
        const { data: newPost, error: createError } = await supabase
          .from('blog_posts')
          .insert(data)
          .select()
          .single()
        
        if (createError) throw createError
        return NextResponse.json({ data: newPost })
      
      case 'updatePost':
        const { id, updates } = data
        const { data: updatedPost, error: updateError } = await supabase
          .from('blog_posts')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        
        if (updateError) throw updateError
        return NextResponse.json({ data: updatedPost })
      
      case 'deletePost':
        const { id: deleteId } = data
        const { error: deleteError } = await supabase
          .from('blog_posts')
          .delete()
          .eq('id', deleteId)
        
        if (deleteError) throw deleteError
        return NextResponse.json({ success: true })
      
      case 'publishPost':
        const { id: publishId } = data
        const { data: publishedPost, error: publishError } = await supabase
          .from('blog_posts')
          .update({ 
            status: 'published', 
            published_at: new Date().toISOString() 
          })
          .eq('id', publishId)
          .select()
          .single()
        
        if (publishError) throw publishError
        return NextResponse.json({ data: publishedPost })
      
      case 'toggleFeatured':
        const { id: featuredId } = data
        
        // Get current status
        const { data: currentPost } = await supabase
          .from('blog_posts')
          .select('featured')
          .eq('id', featuredId)
          .single()
        
        if (!currentPost) throw new Error('Post not found')
        
        const { data: toggledPost, error: toggleError } = await supabase
          .from('blog_posts')
          .update({ featured: !currentPost.featured })
          .eq('id', featuredId)
          .select()
          .single()
        
        if (toggleError) throw toggleError
        return NextResponse.json({ data: toggledPost })
      
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.error('Blog API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    )
  }
} 