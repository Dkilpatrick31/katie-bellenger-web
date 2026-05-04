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
  const ctaHref = activeMode ? `/${activeMode}` : '/nutrition'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/[.06] bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Katie Bellenger — home"
          className="font-display text-sm tracking-wide text-stone-800 transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800 md:text-xl"
        >
          Katie Bellenger
        </Link>

        {/* CTA */}
        <Link
          href={ctaHref}
          aria-label="Get started with a program"
          className="rounded-full bg-stone-800 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-stone-700 focus:outline-2 focus:outline-offset-2 focus:outline-stone-800 md:px-5 md:py-2 md:text-sm"
        >
          Get Started
        </Link>
      </div>
    </header>
  )
}
