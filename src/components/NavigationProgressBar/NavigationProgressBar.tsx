'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function NavigationProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null)

  // When pathname or searchParams changes, navigation completed!
  useEffect(() => {
    if (!isVisible) return

    setProgress(100)
    resetTimerRef.current = setTimeout(() => {
      setIsVisible(false)
      setProgress(0)
    }, 250)

    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [pathname, searchParams])

  // Intercept internal link clicks to trigger progress
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a')
      if (!target) return

      const href = target.getAttribute('href')
      const targetAttr = target.getAttribute('target')

      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        targetAttr === '_blank' ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return
      }

      // Check if internal link to a different URL
      try {
        const url = new URL(href, window.location.href)
        if (
          url.origin === window.location.origin &&
          url.pathname + url.search !== window.location.pathname + window.location.search
        ) {
          setIsVisible(true)
          setProgress(25)

          if (timerRef.current) clearTimeout(timerRef.current)
          timerRef.current = setTimeout(() => {
            setProgress(70)
          }, 150)
        }
      } catch {
        // Ignore invalid URLs
      }
    }

    document.addEventListener('click', handleDocumentClick, { capture: true })
    return () => {
      document.removeEventListener('click', handleDocumentClick, { capture: true })
      if (timerRef.current) clearTimeout(timerRef.current)
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] pointer-events-none"
    >
      <div
        className="h-full bg-[#765b48] shadow-[0_0_8px_rgba(118,91,72,0.6)] transition-all duration-300 ease-out"
        style={{
          width: `${progress}%`,
          opacity: progress === 100 ? 0 : 1,
          transitionDuration: progress === 100 ? '200ms' : '400ms',
        }}
      />
    </div>
  )
}
