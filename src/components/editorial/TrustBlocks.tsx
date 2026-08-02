import { BookOpenCheck, CheckCircle2, History, SearchCheck } from 'lucide-react'

export type EvidenceKind =
  | 'Manufacturer specification'
  | 'Official care guidance'
  | 'Independent evidence'
  | 'Practitioner observation'
  | 'Editorial inference'

export function ResearchStatus({
  status = 'Researched from primary sources',
}: {
  status?: string
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-olive-soft)] bg-white/75 px-3 py-1.5 text-[11px] font-semibold text-[color:var(--color-olive-deep)]">
      <SearchCheck className="h-3.5 w-3.5" aria-hidden="true" />
      {status}
    </span>
  )
}

export function DecisionSummary({
  bestFor,
  skipIf,
  strength,
  compromise,
}: {
  bestFor: string
  skipIf: string
  strength: string
  compromise: string
}) {
  const rows = [
    ['Best for', bestFor],
    ['Skip if', skipIf],
    ['Main strength', strength],
    ['Main compromise', compromise],
  ]
  return (
    <section
      aria-labelledby="bottom-line-title"
      className="rounded-2xl border border-[color:var(--color-border)] bg-white p-6 shadow-[0_18px_45px_-38px_rgba(24,49,41,.6)] md:p-8"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
        Decision first
      </p>
      <h2 id="bottom-line-title" className="mt-2 font-serif text-3xl">
        The bottom line
      </h2>
      <dl className="mt-5 grid gap-px overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="bg-[color:var(--color-surface-muted)] p-4"
          >
            <dt className="text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-ink-muted)]">
              {label}
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function EvidenceLabels({
  items = [
    'Manufacturer specification',
    'Official care guidance',
    'Independent evidence',
    'Editorial inference',
  ],
}: {
  items?: Array<EvidenceKind>
}) {
  return (
    <aside className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] p-6">
      <div className="flex items-center gap-2">
        <BookOpenCheck className="h-5 w-5 text-[color:var(--color-olive)]" />
        <h2 className="font-serif text-xl">Evidence used</h2>
      </div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-[color:var(--color-border)] bg-white px-3 py-1.5 text-[10px] font-semibold text-[color:var(--color-ink-soft)]"
          >
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-[color:var(--color-ink-muted)]">
        These labels describe the research basis—not hands-on testing unless a
        page explicitly says otherwise.
      </p>
    </aside>
  )
}

export function UpdateHistory({
  entries,
}: {
  entries: Array<{ date: string; note: string }>
}) {
  return (
    <details className="rounded-2xl border border-[color:var(--color-border)] bg-white p-5">
      <summary className="flex cursor-pointer list-none items-center gap-2 font-semibold text-[color:var(--color-ink)]">
        <History className="h-4 w-4 text-[color:var(--color-olive)]" />
        How this page has changed
      </summary>
      <ol className="mt-5 space-y-4 border-l border-[color:var(--color-border)] pl-5">
        {entries.map((entry) => (
          <li key={`${entry.date}-${entry.note}`}>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[color:var(--color-accent-deep)]">
              {entry.date}
            </p>
            <p className="mt-1 flex gap-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-olive)]" />
              {entry.note}
            </p>
          </li>
        ))}
      </ol>
    </details>
  )
}

export function qualitativeScore(score: number): string {
  if (score >= 4.7) return 'Exceptional'
  if (score >= 4.2) return 'Strong'
  if (score >= 3.6) return 'Good'
  if (score >= 3) return 'Mixed'
  return 'Limited'
}
