import { ArrowRight, RotateCcw, ShieldCheck } from 'lucide-react'
import { Container } from '#/components/ui/container'
import {
  PRACTICE_ENTRIES,
  PRACTICE_EXPERIENCE,
  PRACTICE_GOALS,
  PRACTICE_TIMES,
} from '#/features/practice-hub/data'
import type { PracticeFilters } from '#/features/practice-hub/data'

export function PracticeHub({
  filters,
  onChange,
}: {
  filters: PracticeFilters
  onChange: (filters: PracticeFilters) => void
}) {
  const entries = PRACTICE_ENTRIES.filter(
    (entry) =>
      (filters.goal === 'All goals' || entry.goal === filters.goal) &&
      (filters.time === 'Any duration' || entry.time === filters.time) &&
      (filters.experience === 'All experience levels' ||
        entry.experience === filters.experience),
  )
  const controls = [
    { id: 'goal', label: 'Goal', values: PRACTICE_GOALS },
    { id: 'time', label: 'Time available', values: PRACTICE_TIMES },
    { id: 'experience', label: 'Experience', values: PRACTICE_EXPERIENCE },
  ] as const

  return (
    <>
      <section className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]">
        <Container size="wide" className="py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
            Practice library
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.045em] md:text-6xl">
            Build a practice that fits real life.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            Choose by goal, time and experience—not by pressure to perform.
            Every route leads to an existing guide, routine or pose with
            practical modifications.
          </p>
        </Container>
      </section>
      <section className="border-b border-[color:var(--color-border)] bg-white">
        <Container size="wide" className="py-7">
          <div className="grid gap-4 md:grid-cols-3">
            {controls.map((control) => (
              <label
                key={control.id}
                className="text-xs font-semibold text-[color:var(--color-ink-soft)]"
              >
                <span className="mb-2 block uppercase tracking-[0.15em]">
                  {control.label}
                </span>
                <select
                  value={filters[control.id]}
                  onChange={(event) =>
                    onChange({ ...filters, [control.id]: event.target.value })
                  }
                  className="h-11 w-full rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-bg)] px-3 text-sm text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-olive)] focus:ring-3 focus:ring-[color:var(--color-ring)]/25"
                >
                  {control.values.map((value) => (
                    <option key={value}>{value}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <p
              className="text-sm text-[color:var(--color-ink-muted)]"
              aria-live="polite"
            >
              {entries.length}{' '}
              {entries.length === 1 ? 'practice route' : 'practice routes'}
            </p>
            <button
              type="button"
              onClick={() =>
                onChange({
                  goal: 'All goals',
                  time: 'Any duration',
                  experience: 'All experience levels',
                })
              }
              className="inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-olive-deep)]"
            >
              <RotateCcw aria-hidden="true" className="h-3.5 w-3.5" /> Reset
              filters
            </button>
          </div>
        </Container>
      </section>
      <section className="bg-[color:var(--color-bg)] py-14 md:py-20">
        <Container size="wide">
          {entries.length ? (
            <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {entries.map((entry) => (
                <li key={entry.href}>
                  <a
                    href={entry.href}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-white shadow-[0_20px_55px_-44px_rgba(24,49,41,.7)] transition hover:-translate-y-1 hover:border-[color:var(--color-accent-soft)]"
                  >
                    <img
                      src={entry.image}
                      alt=""
                      width={900}
                      height={600}
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-accent-deep)]">
                        {entry.format} · {entry.time}
                      </p>
                      <h2 className="mt-3 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
                        {entry.title}
                      </h2>
                      <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                        {entry.description}
                      </p>
                      <div className="mt-5 flex items-start gap-2 border-t border-[color:var(--color-border)] pt-5 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">
                        <ShieldCheck
                          aria-hidden="true"
                          className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent-deep)]"
                        />
                        {entry.safety}
                      </div>
                      <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-semibold text-[color:var(--color-olive-deep)]">
                        Open {entry.format.toLowerCase()}{' '}
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-white px-6 py-14 text-center">
              <h2 className="font-serif text-2xl">
                No route matches every choice.
              </h2>
              <p className="mt-3 text-sm text-[color:var(--color-ink-muted)]">
                Remove one filter or reset the view. A shorter option is not
                automatically a better fit.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
