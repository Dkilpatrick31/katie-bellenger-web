'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.06] bg-white/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
        aria-label="Site navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Katie Bellenger — home"
          className="font-display text-base md:text-xl tracking-wide text-stone-800 transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800"
        >
          Katie Bellenger
        </Link>

        {/* Mode links */}
        <div
          role="navigation"
          aria-label="Service categories"
          className="flex items-center gap-1 rounded-full bg-stone-100 p-1"
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
        </div>

        {/* CTA */}
        <Link
          href={activeMode ? `/${activeMode}` : '/nutrition'}
          aria-label="Get started with a program"
          className="rounded-full bg-stone-800 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-stone-700 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800"
        >
          Get Started
        </Link>
      </nav>
    </header>
  )
}
