import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'
import { yogaMats } from '#/features/reviews/data/yoga-mats'
import { RatingStars } from './RatingStars'

const COLUMNS = [
  { label: 'Mat', align: 'left' as const },
  { label: 'Grip', align: 'left' as const },
  { label: 'Comfort', align: 'left' as const },
  { label: 'Durability', align: 'left' as const },
  { label: 'Weight', align: 'left' as const },
  { label: 'Material', align: 'left' as const },
  { label: 'Best for', align: 'left' as const },
  { label: 'Price', align: 'left' as const },
  { label: '', align: 'right' as const },
]

export function ComparisonTable() {
  // Top 5 inline; rest leeft on /comparison/yoga-mats later
  const rows = yogaMats.slice(0, 5)

  return (
    <section id="comparison-table" className="bg-[color:var(--color-bg)] py-12 md:py-16">
      <Container size="wide">
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-ink)]">
          Compare top yoga mats
        </p>

        <div className="overflow-x-auto rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-[color:var(--color-border)]">
                {COLUMNS.map((col, i) => (
                  <th
                    key={`${col.label}-${i}`}
                    scope="col"
                    className={`px-5 py-4 text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink-muted)] ${
                      col.align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((mat) => (
                <tr
                  key={mat.id}
                  className="border-b border-[color:var(--color-border)]/60 transition last:border-b-0 hover:bg-[color:var(--color-bg)]"
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-5 py-5 text-left font-serif text-sm font-normal text-[color:var(--color-ink)]"
                  >
                    {mat.name}
                  </th>
                  <td className="px-5 py-5">
                    <RatingStars rating={mat.grip} showValue={false} />
                  </td>
                  <td className="px-5 py-5">
                    <RatingStars rating={mat.comfort} showValue={false} />
                  </td>
                  <td className="px-5 py-5">
                    <RatingStars rating={mat.durability} showValue={false} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 text-[color:var(--color-ink-soft)]">
                    {mat.weight}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 text-[color:var(--color-ink-soft)]">
                    {mat.material}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 text-[color:var(--color-ink-soft)]">
                    {mat.bestFor}
                  </td>
                  <td className="whitespace-nowrap px-5 py-5 font-medium tabular-nums text-[color:var(--color-ink)]">
                    {mat.priceLevel}
                  </td>
                  <td className="px-5 py-5 text-right">
                    <a
                      href={mat.affiliateUrl}
                      rel="sponsored noopener noreferrer"
                      target="_blank"
                      className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-olive)] px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#full-comparison"
            className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-olive)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-bg)] transition hover:bg-[color:var(--color-olive-deep)]"
          >
            View full comparison
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
          </a>
        </div>
      </Container>
    </section>
  )
}
