'use client'

import { useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import type { Database } from '@/types/database'

export default function LogoutPage() {
  const supabase = createClientComponentClient<Database>()
  const router = useRouter()

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
      } catch (error) {
        console.error('Error during logout:', error)
        // Even if logout fails, redirect to home
        router.push('/')
      }
    }

    handleLogout()
  }, [supabase, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4 animate-pulse-soft">🚀</div>
        <h1 className="heading-primary text-xl mb-2">
          Disconnecting from Mission Control...
        </h1>
        <p className="text-muted">
          Mengakhiri sesi admin
        </p>
        <div className="mt-4">
          <div className="animate-spin w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    </div>
  )
} 