import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/types/database'

export async function middleware(request: NextRequest) {
  try {
    // Create a Supabase client configured to use cookies
    const res = NextResponse.next()
    const supabase = createMiddlewareClient<Database>({ req: request, res })

    // Refresh session if expired - required for Server Components
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Check if the request is for admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
      // If no session, redirect to login
      if (!session) {
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
        return NextResponse.redirect(loginUrl)
      }

      // Check if user is an admin
      try {
        const userEmail = session.user.email
        if (!userEmail) {
          // No email in session, redirect to home
          const homeUrl = new URL('/', request.url)
          homeUrl.searchParams.set('error', 'no_email')
          return NextResponse.redirect(homeUrl)
        }

        const { data: adminUser, error } = await supabase
          .from('admin_users')
          .select('id, email, role, is_active')
          .eq('email', userEmail)
          .eq('is_active', true)
          .single()

        if (error || !adminUser) {
          // User is not an admin, redirect to home with error message
          const homeUrl = new URL('/', request.url)
          homeUrl.searchParams.set('error', 'access_denied')
          return NextResponse.redirect(homeUrl)
        }

        // User is authenticated and is an admin, allow access
        return res
      } catch (adminCheckError) {
        console.error('Error checking admin status:', adminCheckError)
        
        // On error, redirect to home page
        const homeUrl = new URL('/', request.url)
        homeUrl.searchParams.set('error', 'system_error')
        return NextResponse.redirect(homeUrl)
      }
    }

    // For all other routes, just return the response
    return res
  } catch (error) {
    console.error('Middleware error:', error)
    
    // On any error, allow the request to continue
    // This prevents the site from breaking if middleware fails
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public/ (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 