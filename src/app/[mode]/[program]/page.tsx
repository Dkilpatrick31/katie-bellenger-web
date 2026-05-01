import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { services, type Mode } from '@/data/services'
import SignupForm from '@/components/SignupForm'

function assertValidMode(value: string): asserts value is Mode {
  if (!(value in services)) notFound()
}

type Props = { params: Promise<{ mode: string; program: string }> }

export function generateStaticParams() {
  return Object.entries(services).flatMap(([mode, config]) =>
    config.programs.map((p) => ({ mode, program: p.id }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { mode, program: programId } = await params
  if (!(mode in services)) return {}
  const config = services[mode as Mode]
  const program = config.programs.find((p) => p.id === programId)
  if (!program) return {}
  return {
    title: `${program.label} | Katie Bellenger`,
    description: program.description,
  }
}

export default async function ProgramPage({ params }: Props) {
  const { mode, program: programId } = await params
  assertValidMode(mode)

  const config = services[mode]
  const { palette } = config
  const program = config.programs.find((p) => p.id === programId)
  if (!program) notFound()

  return (
    <div className="min-h-screen" style={{ backgroundColor: palette.bg }}>
      <div className="mx-auto max-w-6xl px-6 py-16">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <Link
            href={`/${mode}`}
            className="inline-flex items-center gap-1.5 text-sm transition-opacity hover:opacity-70 focus:outline-2 focus:outline-offset-2"
            style={{ color: palette.textMuted, outlineColor: palette.highlight }}
          >
            <span aria-hidden="true">←</span>
            <span>{config.label} programs</span>
          </Link>
        </nav>

        {/* Two-column layout */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-start lg:gap-16">

          {/* Left: program details */}
          <article className="lg:col-span-3 lg:sticky lg:top-28" aria-labelledby="program-heading">
            <p
              className="mb-5 text-xs font-medium uppercase tracking-[0.2em]"
              style={{ color: palette.accent }}
            >
              {config.eyebrow}
            </p>

            <h1
              id="program-heading"
              className="font-display text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl"
              style={{ color: palette.text }}
            >
              {program.label}
            </h1>

            {/* Badges */}
            <div className="mt-6 flex flex-wrap items-center gap-3" aria-label="Program details">
              <span
                className="rounded-full px-4 py-1.5 text-sm font-medium"
                style={{ backgroundColor: palette.border, color: palette.highlight }}
              >
                {program.price}
              </span>
              <span
                className="text-sm"
                style={{ color: palette.textMuted }}
              >
                {program.duration}
              </span>
            </div>

            {/* Description */}
            <p
              className="mt-8 text-lg leading-relaxed"
              style={{ color: palette.textMuted }}
            >
              {program.description}
            </p>

            {/* What happens next */}
            <section
              className="mt-10 border-t pt-8"
              style={{ borderColor: palette.border }}
              aria-labelledby="next-steps-heading"
            >
              <h2
                id="next-steps-heading"
                className="text-sm font-medium"
                style={{ color: palette.text }}
              >
                What happens next
              </h2>
              <ol className="mt-4 flex flex-col gap-3" aria-label="Next steps after signing up">
                {[
                  'Fill out the form — takes less than a minute.',
                  'Katie reviews your details and reaches out within 24 hours.',
                  "You schedule a free intro call to make sure it's a great fit.",
                ].map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm leading-relaxed"
                    style={{ color: palette.textMuted }}
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-medium"
                      style={{ backgroundColor: palette.border, color: palette.highlight }}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </section>
          </article>

          {/* Right: signup form */}
          <section className="lg:col-span-2" aria-labelledby="form-heading">
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h2
                id="form-heading"
                className="font-display text-2xl font-light"
                style={{ color: palette.text }}
              >
                Get started
              </h2>
              <p
                className="mt-1.5 text-sm leading-relaxed"
                style={{ color: palette.textMuted }}
              >
                Katie will be in touch within 24 hours.
              </p>

              <div
                className="my-6 h-px"
                style={{ backgroundColor: palette.border }}
                role="separator"
              />

              <SignupForm
                palette={palette}
                programs={config.programs}
                selectedProgramId={program.id}
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
