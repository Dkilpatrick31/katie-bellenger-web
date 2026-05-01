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
  const [phone, setPhone] = useState('')
  const [programId, setProgramId] = useState(selectedProgramId)
  const [goal, setGoal] = useState('')
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

  function focusHandlers(id: string) {
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

  const inputBase =
    'w-full rounded-xl border px-4 py-3 text-sm text-stone-800 transition-all duration-150 placeholder:text-stone-300 focus:outline-2 focus:outline-offset-2'

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          role="status"
          aria-live="assertive"
          aria-atomic="true"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FADE}
          className="flex flex-col items-center py-10 text-center"
        >
          <div
            className="mb-6 flex h-14 w-14 items-center justify-center rounded-full"
            style={{ backgroundColor: palette.border }}
            aria-hidden="true"
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
          aria-label="Program inquiry form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={FADE}
          className="flex flex-col gap-5"
          noValidate
        >
          {/* Full name */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-name"
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Full name <span aria-hidden="true">*</span>
            </label>
            <input
              id="signup-name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputBase}
              style={{ ...fieldStyle('name'), outlineColor: palette.highlight }}
              {...focusHandlers('name')}
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-email"
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Email address <span aria-hidden="true">*</span>
            </label>
            <input
              id="signup-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputBase}
              style={{ ...fieldStyle('email'), outlineColor: palette.highlight }}
              {...focusHandlers('email')}
            />
          </div>

          {/* Phone (optional) */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-phone"
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Phone{' '}
              <span className="normal-case tracking-normal text-stone-400">
                (optional)
              </span>
            </label>
            <input
              id="signup-phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputBase}
              style={{ ...fieldStyle('phone'), outlineColor: palette.highlight }}
              {...focusHandlers('phone')}
            />
          </div>

          {/* Program interest */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-program"
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Program interest <span aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <select
                id="signup-program"
                required
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                className={`${inputBase} appearance-none bg-white pr-10`}
                style={{ ...fieldStyle('program'), outlineColor: palette.highlight }}
                {...focusHandlers('program')}
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
          </div>

          {/* Goal */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-goal"
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              Your main goal <span aria-hidden="true">*</span>
            </label>
            <textarea
              id="signup-goal"
              required
              rows={3}
              placeholder="Tell Katie what you're working toward — weight loss, building strength, more energy, confidence…"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className={`${inputBase} resize-none`}
              style={{ ...fieldStyle('goal'), outlineColor: palette.highlight }}
              {...focusHandlers('goal')}
            />
          </div>

          {/* How did you find Katie */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="signup-source"
              className="text-xs font-medium uppercase tracking-[0.12em]"
              style={{ color: palette.textMuted }}
            >
              How did you find Katie? <span aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <select
                id="signup-source"
                required
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className={`${inputBase} appearance-none bg-white pr-10`}
                style={{
                  ...fieldStyle('source'),
                  outlineColor: palette.highlight,
                  color: source ? '#1c1917' : '#c4b5a8',
                }}
                {...focusHandlers('source')}
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
          </div>

          {/* Required fields note */}
          <p
            id="required-note"
            className="text-xs"
            style={{ color: palette.textMuted }}
          >
            Fields marked <span aria-hidden="true">*</span>
            <span className="sr-only">with an asterisk</span> are required.
          </p>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            aria-label={
              status === 'submitting'
                ? 'Sending your application…'
                : 'Send my application to Katie'
            }
            aria-busy={status === 'submitting'}
            className="mt-2 w-full rounded-full py-3.5 text-sm font-medium transition-opacity hover:opacity-90 active:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-2 focus:outline-offset-2"
            style={{
              backgroundColor: palette.ctaBg,
              color: palette.ctaText,
              outlineColor: palette.highlight,
            }}
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

function ChevronDown({ color, className }: { color: string; className?: string }) {
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
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}
