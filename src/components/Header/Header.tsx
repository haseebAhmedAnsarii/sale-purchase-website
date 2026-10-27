'use client'

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import { Container } from '../Container'
import { SearchModal } from '../SearchModal'
import { navLinks, businessName } from '@/data/navigation'

interface Props {
  onOpenSearch?: () => void
}

export function Header({ onOpenSearch }: Props) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [internalSearchOpen, setInternalSearchOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLinkActive = (href: string) => {
    if (!pathname) return false
    if (href === '/') return pathname === '/'
    if (href === '/collections/all') {
      return pathname.startsWith('/collections') || pathname.startsWith('/products')
    }
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Lock background scroll and Lenis completely when mobile menu is opened
  useEffect(() => {
    if (!mobileMenuOpen) return

    lenis?.stop()
    const originalBodyOverflow = document.body.style.overflow
    const originalBodyPadding = document.body.style.paddingRight
    const originalHtmlOverflow = document.documentElement.style.overflow
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    // Cancel any wheel or touchmove outside the mobile menu to completely freeze background
    const preventBackgroundScroll = (e: TouchEvent | WheelEvent) => {
      if (mobileMenuRef.current && mobileMenuRef.current.contains(e.target as Node)) {
        return
      }
      if (e.cancelable) {
        e.preventDefault()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('wheel', preventBackgroundScroll, { passive: false })
    window.addEventListener('touchmove', preventBackgroundScroll, { passive: false })
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('resize', handleResize)

    return () => {
      document.body.style.overflow = originalBodyOverflow
      document.body.style.paddingRight = originalBodyPadding
      document.documentElement.style.overflow = originalHtmlOverflow
      window.removeEventListener('wheel', preventBackgroundScroll)
      window.removeEventListener('touchmove', preventBackgroundScroll)
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('resize', handleResize)
      lenis?.start()
    }
  }, [mobileMenuOpen, lenis])

  // Scroll detection for auto-hiding header
  useEffect(() => {
    let lastScrollY = window.scrollY
    let ticking = false

    const updateScroll = () => {
      if (mobileMenuOpen) return

      const currentScrollY = Math.max(0, window.scrollY)
      const diff = currentScrollY - lastScrollY

      // Subtle shadow when scrolled past top
      setIsScrolled(currentScrollY > 20)

      // Always reveal near top of page
      if (currentScrollY <= 80) {
        setIsVisible(true)
        lastScrollY = currentScrollY
      } else if (diff > 10) {
        // Scrolled down -> smoothly hide
        setIsVisible(false)
        lastScrollY = currentScrollY
      } else if (diff < -10) {
        // Scrolled up -> smoothly reveal
        setIsVisible(true)
        lastScrollY = currentScrollY
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [mobileMenuOpen])

  const handleSearchClick = () => {
    if (onOpenSearch) {
      onOpenSearch()
    } else {
      setInternalSearchOpen(true)
    }
  }

  // Global search keyboard shortcut (⌘K, Ctrl+K, or /)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        handleSearchClick()
      } else if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault()
        handleSearchClick()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)
    return () => window.removeEventListener('keydown', handleGlobalKeyDown)
  }, [onOpenSearch])

  const showHeader = isVisible || mobileMenuOpen

  return (
    <header
      className={`sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 will-change-[transform,translate] transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled ? 'shadow-sm' : ''
      } ${
        showHeader
          ? 'translate-y-0 opacity-100'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <Container className="flex h-16 sm:h-20 items-center justify-between">
        {/* Left Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => {
            const active = isLinkActive(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative text-sm tracking-tight transition-colors duration-300 after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:transition-all after:duration-500 after:ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  active
                    ? 'text-black font-semibold after:w-full after:bg-black'
                    : 'text-gray-600 font-medium hover:text-black after:w-0 hover:after:w-full after:bg-black'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Mobile menu button with animated bars */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-300 active:scale-90 cursor-pointer"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <div className="relative h-5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen ? 'top-2.5 rotate-45' : 'top-1'
              }`}
            />
            <span
              className={`absolute left-0 top-2.5 block h-0.5 w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen ? 'top-2.5 -rotate-45' : 'top-4'
              }`}
            />
          </div>
        </button>

        {/* Center Store Title / Logo */}
        <div className="flex min-w-0 items-center justify-center px-2 text-center">
          <Link
            href="/"
            className="text-base sm:text-lg font-bold tracking-tight text-gray-950 transition-opacity duration-400 hover:opacity-75 truncate"
          >
            {businessName}
          </Link>
        </div>

        {/* Search Action with ⌘K Badge */}
        <div className="flex shrink-0 items-center justify-end">
          <button
            type="button"
            onClick={handleSearchClick}
            className="group flex h-9 sm:h-10 items-center gap-2 rounded-full px-2.5 sm:px-3 text-gray-800 hover:bg-gray-100 transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Search catalog (Press ⌘K or /)"
            title="Search catalog (⌘K or /)"
          >
            <svg
              className="h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="hidden sm:inline-flex items-center gap-0.5 rounded border border-gray-200 bg-gray-50/90 px-1.5 py-0.5 text-[10px] font-medium text-gray-500 group-hover:border-gray-300 group-hover:text-gray-700 transition-colors">
              <kbd className="font-sans">⌘</kbd>K
            </span>
          </button>
        </div>
      </Container>

      {/* Mobile dropdown menu with smooth expand/collapse */}
      <div
        ref={mobileMenuRef}
        data-lenis-prevent
        style={{
          gridTemplateRows: mobileMenuOpen ? '1fr' : '0fr',
        }}
        className={`md:hidden grid bg-white transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 border-b border-gray-100 shadow-lg'
            : 'opacity-0 border-b border-transparent pointer-events-none'
        }`}
      >
        <div className="overflow-y-auto max-h-[calc(100dvh-5rem)] min-h-0" data-lenis-prevent>
          <div className="flex flex-col space-y-4 px-6 py-5">
            {navLinks.map((link, idx) => {
              const active = isLinkActive(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${idx * 60}ms` : '0ms',
                  }}
                  className={`text-base font-medium py-1 transition-all duration-300 ${
                    active
                      ? 'text-black font-bold border-l-2 border-[#765b48] pl-3'
                      : 'text-gray-600 hover:text-black pl-0'
                  } ${
                    mobileMenuOpen
                      ? 'translate-x-0 opacity-100'
                      : '-translate-x-3 opacity-0'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu to catch any clicks/touch and block background */}
      {mounted && mobileMenuOpen && createPortal(
        <div
          className="fixed inset-0 top-16 sm:top-20 z-30 bg-black/35 backdrop-blur-xs transition-opacity duration-300 md:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
          data-lenis-prevent
        />,
        document.body
      )}

      {/* Internal Search Modal when not controlled externally */}
      {!onOpenSearch && (
        <SearchModal
          isOpen={internalSearchOpen}
          onClose={() => setInternalSearchOpen(false)}
        />
      )}
    </header>
  )
}
