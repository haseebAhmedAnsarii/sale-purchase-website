'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: 'up' | 'none'
  threshold?: number
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 1000,
  direction = 'up',
  threshold = 0.15,
}: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // If user prefers reduced motion, display immediately
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setIsVisible(true)
      return
    }

    const element = elementRef.current
    if (!element) return

    // Immediately reveal if already well within the initial viewport on mount
    const rect = element.getBoundingClientRect()
    if (rect.top <= window.innerHeight - 60 && rect.bottom >= 0) {
      setIsVisible(true)
      return
    }

    // Fallback if IntersectionObserver is not supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -70px 0px',
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  const initialTransform = direction === 'up' ? 'translate-y-6' : ''

  return (
    <div
      ref={elementRef}
      data-scroll-reveal="true"
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: delay && isVisible ? `${delay}ms` : undefined,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : `opacity-0 ${initialTransform}`
      } ${className}`}
    >
      {children}
    </div>
  )
}
