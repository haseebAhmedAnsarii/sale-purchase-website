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
  const [translateX, setTranslateX] = useState(0)

  const trackRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  const dragStartX = useRef<number | null>(null)
  const isDragging = useRef(false)
  const hasMoved = useRef(false)
  const swipeThreshold = 40

  const totalSlides = productsData.length
  const canGoPrev = currentSlide > 1
  const canGoNext = currentSlide < totalSlides

  const updatePosition = useCallback((slideIndex: number) => {
    const item = itemRefs.current[slideIndex - 1]
    if (item) {
      setTranslateX(item.offsetLeft)
    }
  }, [])

  useEffect(() => {
    updatePosition(currentSlide)
  }, [currentSlide, updatePosition])

  useEffect(() => {
    const handleResize = () => {
      updatePosition(currentSlide)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [currentSlide, updatePosition])

  const handlePrev = useCallback(() => {
    if (currentSlide > 1) {
      setCurrentSlide((prev) => prev - 1)
    }
  }, [currentSlide])

  const handleNext = useCallback(() => {
    if (currentSlide < totalSlides) {
      setCurrentSlide((prev) => prev + 1)
    }
  }, [currentSlide, totalSlides])

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (totalSlides <= 1) return
    dragStartX.current = e.clientX
    isDragging.current = true
    hasMoved.current = false
  }

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current || dragStartX.current === null) return
    if (Math.abs(e.clientX - dragStartX.current) > 5) {
      hasMoved.current = true
    }
  }

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (totalSlides <= 1 || !isDragging.current || dragStartX.current === null) return
    const deltaX = e.clientX - dragStartX.current
    dragStartX.current = null
    isDragging.current = false

    if (Math.abs(deltaX) >= swipeThreshold) {
      if (deltaX < 0) {
        handleNext()
      } else {
        handlePrev()
      }
    }

    setTimeout(() => {
      hasMoved.current = false
    }, 50)
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
            className={`overflow-hidden select-none ${
              totalSlides > 1 ? 'cursor-grab active:cursor-grabbing' : ''
            }`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              dragStartX.current = null
              isDragging.current = false
              hasMoved.current = false
            }}
            onClickCapture={handleClickCapture}
          >
            {/* Sliding Track */}
            <div
              ref={trackRef}
              className="relative flex gap-4 sm:gap-6 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform"
              style={{
                transform: `translateX(-${translateX}px)`,
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

