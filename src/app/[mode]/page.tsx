import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { services, type Mode } from '@/data/services'
import ProgramCard from '@/components/ProgramCard'

function assertValidMode(value: string): asserts value is Mode {
  if (!(value in services)) notFound()
}

const selectorHeadlines: Record<Mode, string> = {
  nutrition: 'Build the plan that fits your life.',
  strength: 'Build the strength that changes everything.',
  bundle: 'The complete transformation starts here.',
}

export function generateStaticParams() {
  return Object.keys(services).map((mode) => ({ mode }))
}

type Props = { params: Promise<{ mode: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode } = await params
  if (!(mode in services)) return {}
  const config = services[mode as Mode]
  return {
    title: `${config.label} Programs | Katie Bellenger`,
    description: config.subtext,
  }
}

export default async function ModePage({ params }: Props) {
  const { mode } = await params
  assertValidMode(mode)

  const config = services[mode]
  const { palette } = config

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.bg }}>

      {/* Page hero */}
      <section
        className="mx-auto max-w-6xl px-6 pb-16 pt-20"
        aria-labelledby="mode-heading"
      >
        {/* Breadcrumb */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2"
          style={{ color: palette.textMuted, outlineColor: palette.highlight }}
          aria-label="Back to home"
        >
          <span aria-hidden="true">←</span>
          <span>Home</span>
        </Link>

        <p
          className="mb-6 mt-6 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: palette.accent }}
        >
          {config.eyebrow}
        </p>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h1
            id="mode-heading"
            className="font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:max-w-lg"
            style={{ color: palette.text }}
          >
            {selectorHeadlines[mode]}
          </h1>

          <p
            className="max-w-xs text-base leading-relaxed md:text-right"
            style={{ color: palette.textMuted }}
          >
            {config.subtext}
          </p>
        </div>

        {/* Divider */}
        <div
          className="mt-12 h-px w-full"
          style={{ backgroundColor: palette.border }}
          role="separator"
        />
      </section>

      {/* Programs grid */}
      <section
        className="mx-auto max-w-6xl px-6 pb-28"
        aria-label={`${config.label} programs`}
      >
        <p
          className="mb-8 text-xs font-medium uppercase tracking-[0.2em]"
          style={{ color: palette.textMuted }}
          aria-live="polite"
        >
          Programs — {config.programs.length} options
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {config.programs.map((program, i) => (
            <ProgramCard
              key={program.id}
              program={program}
              palette={palette}
              href={`/${mode}/${program.id}`}
              index={i}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
