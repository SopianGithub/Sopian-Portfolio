'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Database } from '@/types/database'
import Link from 'next/link'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClientComponentClient<Database>()

  const redirect = searchParams.get('redirect') || '/admin'

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        // If already logged in, check if user is admin
                 try {
           const userEmail = session.user.email
           if (!userEmail) return

           const { data: adminUser } = await supabase
             .from('admin_users')
             .select('id')
             .eq('email', userEmail)
             .eq('is_active', true)
             .single()

          if (adminUser) {
            router.push(redirect)
          }
                 } catch {
           // Continue to show login form if not admin
         }
      }
    }

    checkSession()
  }, [supabase, router, redirect])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

             if (data.session) {
         // Check if user is admin
         const userEmail = data.session.user.email
         if (!userEmail) {
           throw new Error('Email tidak tersedia dalam session')
         }

         const { data: adminUser, error: adminError } = await supabase
           .from('admin_users')
           .select('id, email, role')
           .eq('email', userEmail)
           .eq('is_active', true)
           .single()

        if (adminError || !adminUser) {
          await supabase.auth.signOut()
          throw new Error('Akses ditolak. Anda tidak memiliki hak akses admin.')
        }

        // Redirect to admin panel
        router.push(redirect)
        router.refresh()
      }
         } catch (error: unknown) {
       setError(error instanceof Error ? error.message : 'Terjadi kesalahan saat login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative">
      {/* Simplified Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-1 h-1 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4 relative z-10">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 shadow-2xl relative z-20">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4 animate-pulse-soft">🛰️</div>
              <h1 className="heading-primary text-2xl md:text-3xl font-bold mb-2">
                Mission Control Access
              </h1>
              <p className="text-muted">
                Masuk ke panel admin aerospace portfolio
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <div className="flex items-center gap-3">
                  <span className="text-xl">⚠️</span>
                  <span className="text-sm">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6 relative z-30">
              <div className="relative z-40">
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium mb-2 text-slate-300"
                >
                  Email Admin
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="admin@aerospace.com"
                  autoComplete="email"
                  style={{
                    position: 'relative',
                    zIndex: 50,
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '2px solid #475569',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div className="relative z-40">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium mb-2 text-slate-300"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  style={{
                    position: 'relative',
                    zIndex: 50,
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '2px solid #475569',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    fontSize: '16px',
                  }}
                />
              </div>

              <div className="relative z-40">
                <button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    position: 'relative',
                    zIndex: 50,
                    width: '100%',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #0891b2 0%, #7c3aed 100%)',
                    color: 'white',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    opacity: isLoading ? 0.7 : 1,
                  }}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Connecting to Mission Control...
                    </>
                  ) : (
                    <>
                      🚀 Access Mission Control
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <Link 
                href="/" 
                className="text-sm text-muted hover:text-accent transition-colors inline-flex items-center gap-2"
              >
                ← Kembali ke Home
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-muted">
              🔐 Halaman ini dilindungi dengan enkripsi end-to-end
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 