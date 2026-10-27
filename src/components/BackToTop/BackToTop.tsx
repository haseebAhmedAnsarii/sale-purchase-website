'use client'

import { useState, useEffect, useCallback } from 'react'
import { useLenis } from 'lenis/react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const lenis = useLenis()

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    
    setIsVisible(currentScrollY > 400)
    if (totalHeight > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (currentScrollY / totalHeight) * 100)))
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={`Back to top (${Math.round(scrollProgress)}% scrolled)`}
      title="Back to top"
      className={`group fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 flex items-center gap-2 rounded-full border border-gray-200/90 bg-white/92 backdrop-blur-md px-3.5 py-2 text-xs font-semibold tracking-tight text-gray-700 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-gray-900 hover:bg-gray-950 hover:text-white hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      {/* Upward Arrow Icon */}
      <svg
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2.5"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
      <span className="uppercase tracking-widest text-[10px]">Top</span>
    </button>
  )
}
