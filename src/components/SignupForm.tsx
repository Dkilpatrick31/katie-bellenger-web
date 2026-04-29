'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Program, Palette } from '@/data/services'

const SOURCES = [
  'Instagram / Social media',
  'Google search',
  'Friend or family',
  'Existing client / referral',
  'Other',
]

type Status = 'idle' | 'submitting' | 'success'

type Props = {
  palette: Palette
  programs: Program[]
  selectedProgramId: string
}

const FADE = { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } as const

export default function SignupForm({ palette, programs, selectedProgramId }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [programId, setProgramId] = useState(selectedProgramId)
  const [source, setSource] = useState('')
  const [focused, setFocused] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  function fieldStyle(id: string): React.CSSProperties {
    const active = focused === id
    return {
      borderColor: active ? palette.highlight : palette.border,
      boxShadow: active ? `0 0 0 3px ${palette.accent}4D` : undefined,
      outline: 'none',
    }
  }

  function focus(id: string) {
    return {
      onFocus: () => setFocused(id),
      onBlur: () => setFocused(null),
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('submitting')
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
  }

  const firstName = name.split(' ')[0]

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FADE}
          className="flex flex-col items-center py-10 text-center"
        >
          <div
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: palette.border }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={palette.highlight}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h3
            className="font-display text-3xl font-light"
            style={{ color: palette.text }}
          >
            {firstName ? `You're in, ${firstName}!` : "You're on the list!"}
          </h3>

          <p
            className="mt-3 max-w-xs text-base leading-relaxed"
            style={{ color: palette.textMuted }}
          >
            Katie will be in touch within 24 hours to walk through next steps.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={FADE}
          className="flex flex-col gap-5"
        >
          {/* Name */}
          <label className="flex flex-col gap-1.5">
            <span
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Full name
            </span>
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm text-stone-800 transition-all duration-150 placeholder:text-stone-300"
              style={fieldStyle('name')}
              {...focus('name')}
            />
          </label>

          {/* Email */}
          <label className="flex flex-col gap-1.5">
            <span
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Email address
            </span>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border px-4 py-3 text-sm text-stone-800 transition-all duration-150 placeholder:text-stone-300"
              style={fieldStyle('email')}
              {...focus('email')}
            />
          </label>

          {/* Program interest */}
          <label className="flex flex-col gap-1.5">
            <span
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Program interest
            </span>
            <div className="relative">
              <select
                required
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                className="w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm text-stone-800 transition-all duration-150"
                style={fieldStyle('program')}
                {...focus('program')}
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                color={palette.textMuted}
              />
            </div>
          </label>

          {/* How did you find Katie */}
          <label className="flex flex-col gap-1.5">
            <span
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              How did you find Katie?
            </span>
            <div className="relative">
              <select
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full appearance-none rounded-xl border bg-white px-4 py-3 pr-10 text-sm transition-all duration-150"
                style={{
                  ...fieldStyle('source'),
                  color: source ? '#1c1917' : '#c4b5a8',
                }}
                {...focus('source')}
              >
                <option value="" disabled>
                  Select one…
                </option>
                {SOURCES.map((s) => (
                  <option key={s} value={s} className="text-stone-800">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                color={palette.textMuted}
              />
            </div>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-2 w-full rounded-full py-3.5 text-sm font-medium transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-60"
            style={{ backgroundColor: palette.ctaBg, color: palette.ctaText }}
          >
            {status === 'submitting' ? 'Sending…' : 'Send my application'}
          </button>

          <p className="text-center text-xs" style={{ color: palette.textMuted }}>
            No commitment needed — Katie will follow up to discuss next steps.
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function ChevronDown({
  color,
  className,
}: {
  color: string
  className?: string
}) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
