import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createAdminClient } from '@/lib/supabase'
import type { Database } from '@/types/database'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    const { email, password, role = 'admin' } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' }, 
        { status: 400 }
      )
    }

    // Check if requestor is authenticated and is super_admin
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: currentAdmin } = await supabase
      .from('admin_users')
      .select('role')
      .eq('email', session.user.email)
      .eq('is_active', true)
      .single()

    if (!currentAdmin || currentAdmin.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Only super_admin can add users' }, 
        { status: 403 }
      )
    }

    // Use admin client to create user
    const adminSupabase = createAdminClient()

    // Check if user already exists in admin_users
    const { data: existingAdmin } = await supabase
      .from('admin_users')
      .select('email')
      .eq('email', email)
      .single()

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'User already exists in admin_users table' },
        { status: 409 }
      )
    }

    // Create new user in Supabase Auth
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      throw new Error(`Auth error: ${authError.message}`)
    }

    // Add to admin_users table
    const { error: adminError } = await supabase
      .from('admin_users')
      .insert([
        { 
          email, 
          role, 
          is_active: true,
          notes: `Added via API by ${session.user.email} on ${new Date().toISOString()}`
        }
      ])

    if (adminError) {
      // If admin_users insert fails, clean up the auth user
      await adminSupabase.auth.admin.deleteUser(authData.user.id)
      throw new Error(`Admin table error: ${adminError.message}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Admin user created successfully',
      user: {
        id: authData.user.id,
        email,
        role
      }
    })

  } catch (error: unknown) {
    console.error('Error creating admin user:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })

    // Check if requestor is authenticated and is admin
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: currentAdmin } = await supabase
      .from('admin_users')
      .select('role')
      .eq('email', session.user.email)
      .eq('is_active', true)
      .single()

    if (!currentAdmin) {
      return NextResponse.json(
        { error: 'Not an admin user' }, 
        { status: 403 }
      )
    }

    // Get all admin users (only super_admin can see all)
    const query = supabase
      .from('admin_users')
      .select('id, email, role, is_active, created_at, notes')
      .order('created_at', { ascending: false })

    // Regular admins can only see themselves
    if (currentAdmin.role !== 'super_admin') {
      query.eq('email', session.user.email)
    }

    const { data: admins, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json({ 
      success: true, 
      admins,
      currentUser: {
        email: session.user.email,
        role: currentAdmin.role
      }
    })

  } catch (error: unknown) {
    console.error('Error fetching admin users:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    
    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    )
  }
} 