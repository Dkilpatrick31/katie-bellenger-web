'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { services, type Mode } from '@/data/services'

const modes = Object.keys(services) as Mode[]

function derivedMode(pathname: string): Mode | null {
  for (const m of modes) {
    if (pathname.startsWith(`/${m}`)) return m
  }
  return null
}

export default function Nav() {
  const pathname = usePathname()
  const activeMode = derivedMode(pathname)
  const [isOpen, setIsOpen] = useState(false)

  // Close mobile menu on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const ctaHref = activeMode ? `/${activeMode}` : '/nutrition'

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-black/[.06] bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Katie Bellenger — home"
            className="font-display text-lg tracking-wide text-stone-800 transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800 md:text-xl"
          >
            Katie Bellenger
          </Link>

          {/* Desktop: mode pill toggle */}
          <nav
            aria-label="Service categories"
            className="hidden items-center gap-1 rounded-full bg-stone-100 p-1 md:flex"
          >
            {modes.map((mode) => {
              const isActive = activeMode === mode
              return (
                <Link
                  key={mode}
                  href={`/${mode}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={[
                    'rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800',
                    isActive
                      ? 'bg-white text-stone-800 shadow-sm'
                      : 'text-stone-500 hover:text-stone-700',
                  ].join(' ')}
                >
                  {services[mode].label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop: CTA */}
          <Link
            href={ctaHref}
            aria-label="Get started with a program"
            className="hidden rounded-full bg-stone-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800 md:block"
          >
            Get Started
          </Link>

          {/* Mobile: hamburger */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-stone-700 transition-colors hover:bg-stone-100 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800 md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.svg
                  key="x"
                  initial={{ opacity: 0, rotate: -45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 45 }}
                  transition={{ duration: 0.15 }}
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="menu"
                  initial={{ opacity: 0, rotate: 45 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -45 }}
                  transition={{ duration: 0.15 }}
                  width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </motion.svg>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="false"
            aria-label="Mobile navigation"
            className="fixed inset-x-0 top-16 z-40 border-b border-stone-100 bg-white px-6 pb-6 pt-4 shadow-lg md:hidden"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <nav aria-label="Mobile service categories" className="flex flex-col gap-1">
              {modes.map((mode) => {
                const isActive = activeMode === mode
                return (
                  <Link
                    key={mode}
                    href={`/${mode}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-stone-800',
                      isActive
                        ? 'bg-stone-100 text-stone-900'
                        : 'text-stone-600 hover:bg-stone-50 hover:text-stone-900',
                    ].join(' ')}
                  >
                    <span>{services[mode].label}</span>
                    <span aria-hidden="true" className="text-stone-400">→</span>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-4 border-t border-stone-100 pt-4">
              <Link
                href={ctaHref}
                aria-label="Get started with a program"
                className="block w-full rounded-full bg-stone-800 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-stone-700 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
