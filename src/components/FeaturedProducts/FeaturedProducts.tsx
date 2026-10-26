'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import type { KeyboardEvent, PointerEvent, MouseEvent } from 'react'
import { Container } from '../Container'
import { ProductCard } from '../ProductCard'
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

  const totalSlides = productsData.length
  const canGoPrev = currentSlide > 1
  const canGoNext = currentSlide < totalSlides

  const getSlideOffset = useCallback((slideIndex: number) => {
    const item = itemRefs.current[slideIndex - 1]
    return item ? item.offsetLeft : 0
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setBaseTranslateX(getSlideOffset(currentSlide))
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentSlide, getSlideOffset])

  const handlePrev = useCallback(() => {
    if (currentSlide > 1) {
      const next = currentSlide - 1
      setCurrentSlide(next)
      setBaseTranslateX(getSlideOffset(next))
      setDragOffset(0)
    }
  }, [currentSlide, getSlideOffset])

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      const next = currentSlide + 1
      setCurrentSlide(next)
      setBaseTranslateX(getSlideOffset(next))
      setDragOffset(0)
    }
  }, [currentSlide, totalSlides, getSlideOffset])

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

      const targetOffset = getSlideOffset(nextSlide)
      setCurrentSlide(nextSlide)
      setBaseTranslateX(targetOffset)
      setDragOffset(0)

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

  const currentTranslate = baseTranslateX + dragOffset

  return (
    <section
      id="featured-products"
      className="w-full py-12 sm:py-16 bg-white overflow-hidden"
      aria-label="Featured products"
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-950">
            Featured products
          </h2>
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
                  : 'transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]'
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

        {/* Carousel / Pagination Controls (< 1 / 5 >) - only rendered when more than 1 item exists */}
        {totalSlides > 1 && (
          <div className="mt-8 flex items-center justify-center gap-3 text-xs sm:text-sm text-gray-700">
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canGoPrev}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-black ${
                !canGoPrev
                  ? 'opacity-30 cursor-not-allowed pointer-events-none'
                  : 'hover:bg-gray-100 cursor-pointer text-gray-900'
              }`}
              aria-label="Previous products slide"
            >
              ‹
            </button>
            <span className="font-medium tracking-widest tabular-nums select-none">
              {currentSlide} / {totalSlides}
            </span>
            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition focus-visible:outline-2 focus-visible:outline-black ${
                !canGoNext
                  ? 'opacity-30 cursor-not-allowed pointer-events-none'
                  : 'hover:bg-gray-100 cursor-pointer text-gray-900'
              }`}
              aria-label="Next products slide"
            >
              ›
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}

