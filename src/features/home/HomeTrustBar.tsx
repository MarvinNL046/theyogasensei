import type { ComponentType, SVGProps } from 'react'
import { BookOpen, Globe2, Leaf, PersonStanding } from 'lucide-react'
import { Container } from '#/components/ui/container'

interface TrustItem {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  subtitle: string
}

const ITEMS: Array<TrustItem> = [
  {
    icon: Leaf,
    title: 'Honest & Independent',
    subtitle: 'No fake testing, no paid rankings.',
  },
  {
    icon: BookOpen,
    title: 'In-Depth Guides',
    subtitle: 'Researched, practical, real use.',
  },
  {
    icon: PersonStanding,
    title: 'Practice First',
    subtitle: 'Written from years on the mat.',
  },
  {
    icon: Globe2,
    title: 'Mindful Living',
    subtitle: 'Calm, considered recommendations.',
  },
]

/**
 * Editorial trust strip directly under the hero — four quiet credibility points.
 * No cards, no shadows; vertical dividers on wide screens. Reinforces EEAT
 * without overstating (the site does not lab-test).
 */
export function HomeTrustBar() {
  return (
    <section className="border-y border-[color:var(--color-border)] bg-[color:var(--color-bg)]">
      <Container size="default" className="py-8 md:py-10">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-x-0">
          {ITEMS.map((item, i) => (
            <li
              key={item.title}
              className={
                i > 0
                  ? 'md:border-l md:border-[color:var(--color-border)] md:pl-8'
                  : ''
              }
            >
              <item.icon
                className="h-5 w-5 text-[color:var(--color-olive)]"
                strokeWidth={1.25}
                aria-hidden="true"
              />
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                {item.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                {item.subtitle}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
