'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }
  
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/#profile-section', label: 'Profile' },
    { href: '/#projects', label: 'Projects' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' }
  ]

  if (!isMounted) {
    return null
  }

  return (
    <>
      {/* Navbar dengan styling sederhana */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999999,
          backgroundColor: '#1e293b',
          borderBottom: '2px solid #06b6d4',
          padding: '16px 0',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
      >
        <div 
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          {/* Logo dengan animasi original */}
          <Link href="/" className="text-2xl font-bold heading-primary">
            🚀 Sofyan Solutions
          </Link>
          
          {/* Desktop Menu - Dengan media query untuk hide di mobile */}
          <div 
            id="desktop-menu"
            style={{
              display: 'flex',
              gap: '32px',
              alignItems: 'center'
            }}
          >
            <Link
              href="/"
              style={{
                color: pathname === '/' ? '#06b6d4' : '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                backgroundColor: pathname === '/' ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
              }}
            >
              Home
            </Link>
            
            <Link
              href="/#profile-section"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              Profile
            </Link>
            
            <Link
              href="/#projects"
              style={{
                color: '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.3s ease'
              }}
            >
              Projects
            </Link>
            
            <Link
              href="/blog"
              style={{
                color: pathname.startsWith('/blog') ? '#06b6d4' : '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                backgroundColor: pathname.startsWith('/blog') ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
              }}
            >
              🚀 Mission Logs
            </Link>
            
            <Link
              href="/contact"
              style={{
                color: pathname === '/contact' ? '#06b6d4' : '#ffffff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '16px',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'all 0.3s ease',
                backgroundColor: pathname === '/contact' ? 'rgba(6, 182, 212, 0.1)' : 'transparent'
              }}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button - Hanya muncul di mobile */}
          <button
            id="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'none' // Default hidden, akan di-show via CSS
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span 
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#ffffff',
                  display: 'block',
                  transition: 'all 0.3s ease',
                  transform: isMobileMenuOpen ? 'rotate(45deg) translateY(6px)' : 'none'
                }}
              ></span>
              <span 
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#ffffff',
                  display: 'block',
                  transition: 'all 0.3s ease',
                  opacity: isMobileMenuOpen ? 0 : 1
                }}
              ></span>
              <span 
                style={{
                  width: '24px',
                  height: '2px',
                  backgroundColor: '#ffffff',
                  display: 'block',
                  transition: 'all 0.3s ease',
                  transform: isMobileMenuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none'
                }}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu - Hanya muncul di mobile dan saat menu terbuka */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            style={{
              backgroundColor: '#334155',
              margin: '16px',
              padding: '16px',
              borderRadius: '8px',
              borderTop: '1px solid #475569',
              display: 'none' // Default hidden, akan di-show via CSS
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: isActive(link.href === '/' ? '/' : link.href.split('#')[0]) ? '#06b6d4' : '#ffffff',
                    textDecoration: 'none',
                    padding: '12px',
                    borderRadius: '6px',
                    backgroundColor: isActive(link.href === '/' ? '/' : link.href.split('#')[0]) ? 'rgba(6, 182, 212, 0.1)' : 'transparent',
                    fontWeight: '500',
                    display: 'block'
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              <Link
                href="/contact"
                style={{
                  backgroundColor: '#06b6d4',
                  color: '#ffffff',
                  textDecoration: 'none',
                  textAlign: 'center',
                  padding: '12px',
                  borderRadius: '6px',
                  fontWeight: 'bold',
                  marginTop: '16px',
                  display: 'block'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🚀 Start Project
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* CSS untuk responsive behavior yang kuat */}
      <style jsx global>{`
        body {
          padding-top: 88px !important;
        }
        
        /* Mobile styles - hide desktop menu, show mobile button */
        @media (max-width: 767px) {
          #desktop-menu {
            display: none !important;
          }
          #mobile-menu-button {
            display: block !important;
          }
          #mobile-menu {
            display: block !important;
          }
        }
        
        /* Desktop styles - show desktop menu, hide mobile elements */
        @media (min-width: 768px) {
          #desktop-menu {
            display: flex !important;
          }
          #mobile-menu-button {
            display: none !important;
          }
          #mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
} 