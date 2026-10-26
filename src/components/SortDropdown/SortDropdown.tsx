'use client'

import { useState, useRef, useEffect } from 'react'

export type SortOption = 'featured' | 'price-asc' | 'price-desc'

interface Props {
  value: SortOption
  onChange: (value: SortOption) => void
  id?: string
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to high' },
  { value: 'price-desc', label: 'Price: High to low' },
]

export function SortDropdown({ value, onChange, id = 'sort-dropdown' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLabel = SORT_OPTIONS.find((opt) => opt.value === value)?.label || 'Featured'

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  return (
    <div ref={dropdownRef} className="relative inline-flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm">
      <span id={`${id}-label`} className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        Sort by:
      </span>

      <div className="relative">
        <button
          type="button"
          id={id}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={`${id}-label ${id}`}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex items-center justify-between gap-3 rounded-xs border border-gray-300 bg-white px-3.5 py-2 text-xs sm:text-sm font-medium text-gray-900 shadow-2xs hover:border-black focus:border-black focus:outline-hidden focus:ring-1 focus:ring-black transition-all duration-300 cursor-pointer min-w-[11rem]"
        >
          <span className="truncate">{currentLabel}</span>
          <svg
            className={`h-3.5 w-3.5 text-gray-500 shrink-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen ? 'rotate-180 text-black' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div
            role="listbox"
            aria-labelledby={`${id}-label`}
            className="absolute right-0 z-30 mt-1.5 w-full min-w-[12rem] overflow-hidden rounded-xs border border-gray-200 bg-white shadow-xl animate-scale-in py-1"
          >
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.value === value
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-3.5 py-2.5 text-left text-xs sm:text-sm transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-gray-100 font-semibold text-black'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-black font-normal'
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && (
                    <svg
                      className="h-3.5 w-3.5 text-black shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
