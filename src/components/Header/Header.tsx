'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Container } from '../Container'
import { navLinks, businessName } from '@/data/navigation'

interface Props {
  onOpenSearch: () => void
}

export function Header({ onOpenSearch }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-colors">
      <Container className="flex h-16 sm:h-20 items-center justify-between">
        {/* Left Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-gray-800 transition-colors duration-400 hover:text-black tracking-tight after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 hover:after:w-full after:bg-black after:transition-all after:duration-600 after:ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              {link.label}
            </Link>
          ))}
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

        {/* Search Action */}
        <div className="flex shrink-0 items-center justify-end">
          <button
            type="button"
            onClick={onOpenSearch}
            className="group flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 transition-all duration-400 hover:scale-105 active:scale-95"
            aria-label="Search store"
          >
            <svg
              className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-110"
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
          </button>
        </div>
      </Container>

      {/* Mobile dropdown menu with smooth expand/collapse */}
      <div
        style={{
          gridTemplateRows: mobileMenuOpen ? '1fr' : '0fr',
        }}
        className={`md:hidden grid bg-white transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'opacity-100 border-b border-gray-100 shadow-lg'
            : 'opacity-0 border-b border-transparent pointer-events-none'
        }`}
      >
        <div className="overflow-hidden min-h-0">
          <div className="flex flex-col space-y-4 px-6 py-5">
            {navLinks.map((link, idx) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  transitionDelay: mobileMenuOpen ? `${idx * 60}ms` : '0ms',
                }}
                className={`text-base font-medium text-gray-800 hover:text-black py-1 transition-all duration-300 ${
                  mobileMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-3 opacity-0'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
