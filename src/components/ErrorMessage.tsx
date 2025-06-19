'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function ErrorMessage() {
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const errorParam = searchParams.get('error')
    
    if (errorParam) {
      let errorMessage = ''
      
      switch (errorParam) {
        case 'access_denied':
          errorMessage = 'Akses ditolak. Anda tidak memiliki hak akses admin.'
          break
        case 'no_email':
          errorMessage = 'Session tidak valid. Silakan login ulang.'
          break
        case 'system_error':
          errorMessage = 'Terjadi kesalahan sistem. Silakan coba lagi nanti.'
          break
        default:
          errorMessage = 'Terjadi kesalahan yang tidak dikenal.'
      }
      
      setError(errorMessage)
      setIsVisible(true)

      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(() => setError(null), 300) // Wait for animation to complete
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [searchParams])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => setError(null), 300)
  }

  if (!error) return null

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
    }`}>
      <div className="component-card p-4 max-w-sm border-l-4 border-red-500">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <span className="text-2xl">🚨</span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-red-400 mb-1">
              Access Denied
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {error}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-muted hover:text-white transition-colors p-1 -m-1"
            aria-label="Close notification"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
} 