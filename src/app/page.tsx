'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { services, type Mode } from '@/data/services'

const MODES: Mode[] = ['nutrition', 'yoga']

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
      {/* Mode toggle */}
      <motion.div
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
              onClick={() => setMode(m)}
              className="relative min-w-[136px] rounded-full py-2.5 text-sm font-medium transition-colors duration-300"
              style={{ color: isActive ? palette.ctaText : palette.textMuted }}
            >
              {isActive && (
                <motion.span
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  animate={{ backgroundColor: palette.ctaBg }}
                  transition={SPRING}
                />
              )}
              <span className="relative z-10">{services[m].label}</span>
            </button>
          )
        })}
      </motion.div>

      {/* Animated content block — exits and enters on mode change */}
      <AnimatePresence mode="wait">
        <motion.div
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
            {mode === 'nutrition'
              ? 'Certified Nutritionist'
              : 'Certified Yoga Instructor'}
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
            className="mt-12 inline-flex items-center rounded-full px-10 py-4 text-base font-medium transition-opacity hover:opacity-90 active:opacity-80"
            style={{ backgroundColor: palette.ctaBg, color: palette.ctaText }}
          >
            {config.cta}
          </Link>

          {/* Secondary nudge */}
          <button
            onClick={() => setMode(mode === 'nutrition' ? 'yoga' : 'nutrition')}
            className="mt-5 text-sm transition-opacity hover:opacity-70"
            style={{ color: palette.textMuted }}
          >
            Or explore{' '}
            <span className="underline underline-offset-2">
              {mode === 'nutrition' ? 'Yoga' : 'Nutrition'} →
            </span>
          </button>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
