'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { KeyboardEvent, PointerEvent, MouseEvent } from 'react'
import Link from 'next/link'
import { Container } from '../Container'
import { ProductCard } from '../ProductCard'
import { ScrollReveal } from '../ScrollReveal'
import { productsData } from '@/data/products'
import type { Product } from '@/types'

interface Props {
  onSelectProduct?: (product: Product) => void
}

export function FeaturedProducts({ onSelectProduct }: Props) {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [baseTranslateX, setBaseTranslateX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPageVisible, setIsPageVisible] = useState(true)
  const [resetKey, setResetKey] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const dragStartX = useRef<number | null>(null)
  const dragStartY = useRef<number | null>(null)
  const isPointerDown = useRef(false)
  const isDraggingRef = useRef(false)
  const hasMoved = useRef(false)
  const capturedPointerId = useRef<number | null>(null)
  const swipeThreshold = 50
  const dragActivationThreshold = 8
  const AUTOSLIDE_INTERVAL = 4500

  const totalSlides = productsData.length
  const canGoPrev = currentSlide > 1
  const canGoNext = currentSlide < totalSlides

  const getSlideOffset = useCallback((slideIndex: number) => {
    const item = itemRefs.current[slideIndex - 1]
    return item ? item.offsetLeft : 0
  }, [])

  const goToSlide = useCallback((slideIndex: number) => {
    const targetOffset = getSlideOffset(slideIndex)
    setCurrentSlide(slideIndex)
    setBaseTranslateX(targetOffset)
    setDragOffset(0)
    setResetKey((prev) => prev + 1)
  }, [getSlideOffset])

  useEffect(() => {
    const handleResize = () => {
      setBaseTranslateX(getSlideOffset(currentSlide))
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentSlide, getSlideOffset])

  // Track page visibility to pause autoslide when tab is inactive
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === 'visible')
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  const handlePrev = useCallback(() => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1)
    }
  }, [currentSlide, goToSlide])

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1)
    }
  }, [currentSlide, totalSlides, goToSlide])

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (totalSlides <= 1) return
    if (e.button !== 0) return

    dragStartX.current = e.clientX
    dragStartY.current = e.clientY
    isPointerDown.current = true
    isDraggingRef.current = false
    hasMoved.current = false
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current || dragStartX.current === null || dragStartY.current === null) return

    const deltaX = e.clientX - dragStartX.current
    const deltaY = e.clientY - dragStartY.current

    // If not yet dragging, test if movement exceeds activation threshold
    if (!isDraggingRef.current) {
      // If user is scrolling vertically more than horizontally, cancel pointer gesture
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
        isPointerDown.current = false
        dragStartX.current = null
        dragStartY.current = null
        return
      }

      // Check horizontal movement
      if (Math.abs(deltaX) >= dragActivationThreshold) {
        isDraggingRef.current = true
        hasMoved.current = true
        setIsDragging(true)

        try {
          e.currentTarget.setPointerCapture(e.pointerId)
          capturedPointerId.current = e.pointerId
        } catch {
          // Ignore
        }
      }
    }

    // When actively dragging, update track position
    if (isDraggingRef.current) {
      let effectiveDelta = deltaX
      if ((currentSlide === 1 && deltaX > 0) || (currentSlide === totalSlides && deltaX < 0)) {
        effectiveDelta = deltaX * 0.25
      }

      setDragOffset(-effectiveDelta)
    }
  }

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isPointerDown.current) return

    const deltaX = dragStartX.current !== null ? e.clientX - dragStartX.current : 0
    const wasDragging = isDraggingRef.current

    if (capturedPointerId.current !== null) {
      try {
        if (e.currentTarget.hasPointerCapture(capturedPointerId.current)) {
          e.currentTarget.releasePointerCapture(capturedPointerId.current)
        }
      } catch {
        // Ignore
      }
      capturedPointerId.current = null
    }

    isPointerDown.current = false
    isDraggingRef.current = false
    setIsDragging(false)
    dragStartX.current = null
    dragStartY.current = null

    if (wasDragging) {
      let nextSlide = currentSlide
      if (deltaX < -swipeThreshold && canGoNext) {
        nextSlide = currentSlide + 1
      } else if (deltaX > swipeThreshold && canGoPrev) {
        nextSlide = currentSlide - 1
      }

      goToSlide(nextSlide)

      setTimeout(() => {
        hasMoved.current = false
      }, 100)
    } else {
      // Pure click - ensure hasMoved is false so Link handles navigation
      hasMoved.current = false
      setDragOffset(0)
    }
  }

  const handlePointerCancel = (e: PointerEvent<HTMLDivElement>) => {
    if (capturedPointerId.current !== null) {
      try {
        if (e.currentTarget.hasPointerCapture(capturedPointerId.current)) {
          e.currentTarget.releasePointerCapture(capturedPointerId.current)
        }
      } catch {
        // Ignore
      }
      capturedPointerId.current = null
    }

    isPointerDown.current = false
    isDraggingRef.current = false
    setIsDragging(false)
    dragStartX.current = null
    dragStartY.current = null
    setDragOffset(0)
    hasMoved.current = false
  }

  const handleClickCapture = (e: MouseEvent<HTMLDivElement>) => {
    if (hasMoved.current) {
      e.stopPropagation()
      e.preventDefault()
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (totalSlides <= 1) return
    if (e.key === 'ArrowLeft' && canGoPrev) {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight' && canGoNext) {
      e.preventDefault()
      handleNext()
    }
  }

  const handleAdvance = useCallback(() => {
    const next = currentSlide < totalSlides ? currentSlide + 1 : 1
    goToSlide(next)
  }, [currentSlide, totalSlides, goToSlide])

  const isPaused = !isPlaying || isDragging || !isPageVisible
  const currentTranslate = baseTranslateX + dragOffset

  return (
    <section
      id="featured-products"
      className="w-full py-12 sm:py-16 bg-white overflow-hidden"
      aria-label="Featured products"
    >
      <Container>
        <ScrollReveal>
          {/* Section Heading with Slide Counter and Arrow Controls */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
              Featured products
            </h2>

            {totalSlides > 1 && (
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs tracking-wider text-gray-600 select-none">
                  <span className="font-semibold text-gray-900">{String(currentSlide).padStart(2, '0')}</span>
                  <span className="mx-1 text-gray-400" aria-hidden="true">/</span>
                  <span>{String(totalSlides).padStart(2, '0')}</span>
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={!canGoPrev}
                    aria-label="Previous product"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-gray-950 hover:text-black transition disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!canGoNext}
                    aria-label="Next product"
                    className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:border-gray-950 hover:text-black transition disabled:opacity-25 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-2 focus-visible:outline-black"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>

        {/* Slider Carousel Area */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured products slider"
          tabIndex={totalSlides > 1 ? 0 : -1}
          onKeyDown={handleKeyDown}
          className="relative focus:outline-hidden"
        >
          {/* Slider Window */}
          <div
            className={`overflow-hidden select-none touch-pan-y ${
              totalSlides > 1
                ? isDragging
                  ? 'cursor-grabbing'
                  : 'cursor-grab'
                : ''
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerCancel}
            onDragStart={(e) => e.preventDefault()}
            onClickCapture={handleClickCapture}
          >
            {/* Sliding Track */}
            <div
              ref={trackRef}
              className={`relative flex gap-4 sm:gap-6 will-change-transform ${
                isDragging
                  ? 'transition-none duration-0'
                  : 'transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]'
              }`}
              style={{
                transform: `translateX(-${currentTranslate}px)`,
              }}
            >
              {productsData.map((product, idx) => (
                <div
                  key={product.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el
                  }}
                  className="shrink-0 w-full sm:w-[calc(50%-0.75rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Slide ${idx + 1} of ${totalSlides}`}
                >
                  <ProductCard
                    product={product}
                    onClick={onSelectProduct}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Minimalist Progress Bar & Autoplay Controls */}
        <CarouselProgressBar
          totalSlides={totalSlides}
          currentSlide={currentSlide}
          isPlaying={isPlaying}
          isPaused={isPaused}
          interval={AUTOSLIDE_INTERVAL}
          onTogglePlay={() => setIsPlaying((prev) => !prev)}
          onSelectSlide={goToSlide}
          onAdvance={handleAdvance}
        />
        </ScrollReveal>
      </Container>
    </section>
  )
}

interface CarouselProgressBarProps {
  totalSlides: number
  currentSlide: number
  isPlaying: boolean
  isPaused: boolean
  interval: number
  onTogglePlay: () => void
  onSelectSlide: (slideIndex: number) => void
  onAdvance: () => void
}

function CarouselProgressBar({
  totalSlides,
  currentSlide,
  isPlaying,
  isPaused,
  interval,
  onTogglePlay,
  onSelectSlide,
  onAdvance,
}: CarouselProgressBarProps) {
  const timerProgress = useRef(0)
  const barRef = useRef<HTMLDivElement>(null)

  // Reset progress whenever currentSlide changes
  useEffect(() => {
    timerProgress.current = 0
  }, [currentSlide])

  // Continuous timer that advances slides
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return

    const tickMs = 25
    const step = (tickMs / interval) * 100

    const timer = setInterval(() => {
      timerProgress.current += step
      if (timerProgress.current >= 100) {
        timerProgress.current = 0
        onAdvance()
      }
    }, tickMs)

    return () => clearInterval(timer)
  }, [totalSlides, isPaused, interval, onAdvance])

  if (totalSlides <= 1) return null

  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current) return
    const rect = barRef.current.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const ratio = Math.max(0, Math.min(1, clickX / rect.width))
    const targetSlide = Math.min(totalSlides, Math.max(1, Math.round(ratio * (totalSlides - 1)) + 1))
    onSelectSlide(targetSlide)
  }

  return (
    <div className="mt-8 sm:mt-10 flex items-center justify-between gap-4 max-w-full">
      {/* Play / Pause Toggle Button */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onTogglePlay}
          aria-label={isPlaying ? 'Pause autoslide' : 'Start autoslide'}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-700 hover:text-black hover:bg-gray-100 transition focus-visible:outline-2 focus-visible:outline-black cursor-pointer shrink-0"
        >
          {isPlaying ? (
            <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5 fill-current translate-x-0.5" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 4.75a1 1 0 011.53-.85l12 7.25a1 1 0 010 1.7l-12 7.25A1 1 0 016 19.25V4.75z" />
            </svg>
          )}
        </button>
        <span className="text-[0.6875rem] uppercase tracking-wider font-medium text-gray-600 hidden sm:inline">
          {isPlaying ? 'Autoplay' : 'Paused'}
        </span>
      </div>

      {/* Interactive Progress Line */}
      <div
        ref={barRef}
        onClick={handleBarClick}
        role="progressbar"
        aria-valuenow={currentSlide}
        aria-valuemin={1}
        aria-valuemax={totalSlides}
        aria-label={`Slide ${currentSlide} of ${totalSlides}`}
        className="relative flex-1 max-w-xs sm:max-w-sm md:max-w-md h-6 flex items-center cursor-pointer group"
      >
        <div className="w-full h-1 bg-[#edeae6] rounded-full overflow-hidden relative">
          <div
            className="absolute top-0 bottom-0 left-0 bg-gray-950 rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.max(8, (currentSlide / totalSlides) * 100)}%`,
            }}
          />
        </div>
      </div>

      {/* Catalog Link */}
      <div>
        <Link
          href="/collections/all"
          className="text-xs font-semibold text-gray-950 hover:underline flex items-center gap-1 group shrink-0"
        >
          <span>Catalog</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </div>
  )
}

