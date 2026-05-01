'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Program, Palette } from '@/data/services'

type Props = {
  program: Program
  palette: Palette
  href: string
  index: number
}

export default function ProgramCard({ program, palette, href, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: index * 0.08,
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.2, ease: 'easeOut', delay: 0 },
      }}
      whileTap={{ scale: 0.985, transition: { duration: 0.1, delay: 0 } }}
    >
      <Link
        href={href}
        aria-label={`${program.label} — ${program.price}, ${program.duration}. Click to learn more.`}
        className="block h-full rounded-2xl focus:outline-2 focus:outline-offset-4"
        style={{ outlineColor: palette.highlight }}
      >
        <article
          className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm transition-shadow duration-200 hover:shadow-md"
          style={{ borderTop: `3px solid ${palette.highlight}` }}
        >
          {/* Price badge + duration */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <span
              className="inline-block rounded-full px-3 py-1 text-xs font-medium"
              style={{ backgroundColor: palette.border, color: palette.highlight }}
            >
              {program.price}
            </span>
            <span
              className="text-xs"
              style={{ color: palette.textMuted }}
              aria-label={`Duration: ${program.duration}`}
            >
              {program.duration}
            </span>
          </div>

          {/* Program name */}
          <h3
            className="font-display text-3xl font-light leading-tight"
            style={{ color: palette.text }}
          >
            {program.label}
          </h3>

          {/* Description */}
          <p
            className="mt-4 flex-1 text-base leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            {program.description}
          </p>

          {/* Footer CTA */}
          <p
            className="mt-8 text-sm font-medium"
            style={{ color: palette.highlight }}
            aria-hidden="true"
          >
            Get started →
          </p>
        </article>
      </Link>
    </motion.div>
  )
}
