'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { services, type Mode } from '@/data/services'

const MODES: Mode[] = ['nutrition', 'strength', 'bundle']

const SPRING = { type: 'spring', stiffness: 320, damping: 32 } as const
const FADE = { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] } as const

export default function HomePage() {
  const [mode, setMode] = useState<Mode>('nutrition')
  const config = services[mode]
  const { palette } = config

  return (
    <motion.div
      className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 py-20"
      animate={{ backgroundColor: palette.bg }}
      transition={FADE}
    >
      {/* Mode toggle — tablist pattern */}
      <motion.div
        role="tablist"
        aria-label="Choose a service"
        className="mb-16 flex items-center rounded-full p-1"
        initial={{ opacity: 0, y: 12 }}
        animate={{ backgroundColor: palette.border, opacity: 1, y: 0 }}
        transition={FADE}
      >
        {MODES.map((m) => {
          const isActive = m === mode
          return (
            <button
              key={m}
              role="tab"
              aria-selected={isActive}
              aria-controls="hero-panel"
              id={`tab-${m}`}
              onClick={() => setMode(m)}
              className="relative min-w-[100px] rounded-full py-2.5 text-sm font-medium transition-colors duration-300 focus:outline-2 focus:outline-offset-2"
              style={{
                color: isActive ? palette.ctaText : palette.textMuted,
                outlineColor: palette.highlight,
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  animate={{ backgroundColor: palette.ctaBg }}
                  transition={SPRING}
                  aria-hidden="true"
                />
              )}
              <span className="relative z-10">{services[m].label}</span>
            </button>
          )
        })}
      </motion.div>

      {/* Hero panel — aria-live announces content changes to screen readers */}
      <div
        id="hero-panel"
        role="tabpanel"
        aria-labelledby={`tab-${mode}`}
        aria-live="polite"
        aria-atomic="true"
      >
        <AnimatePresence mode="wait">
          <motion.section
            key={mode}
            className="flex max-w-3xl flex-col items-center text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={FADE}
          >
            {/* Eyebrow */}
            <p
              className="mb-8 text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: palette.accent }}
            >
              {config.eyebrow}
            </p>

            {/* Headline */}
            <h1
              className="font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
              style={{ color: palette.text }}
            >
              {config.headline}
            </h1>

            {/* Subtext */}
            <p
              className="mt-8 max-w-xl text-lg leading-relaxed sm:text-xl"
              style={{ color: palette.textMuted }}
            >
              {config.subtext}
            </p>

            {/* CTA */}
            <Link
              href={`/${mode}`}
              aria-label={config.cta}
              className="mt-12 inline-flex items-center rounded-full px-10 py-4 text-base font-medium transition-opacity hover:opacity-90 active:opacity-80 focus:outline-2 focus:outline-offset-2"
              style={{
                backgroundColor: palette.ctaBg,
                color: palette.ctaText,
                outlineColor: palette.highlight,
              }}
            >
              {config.cta}
            </Link>
          </motion.section>
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
