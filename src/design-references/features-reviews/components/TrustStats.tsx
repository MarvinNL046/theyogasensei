import {
  CalendarClock,
  ClipboardCheck,
  PersonStanding,
  ShieldCheck,
} from 'lucide-react'
import type { ComponentType, SVGProps } from 'react'
import { TRUST_STATS } from '#/features/reviews/data/yoga-mats'

type IconKey = (typeof TRUST_STATS)[number]['icon']

const ICONS: Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  'clipboard-check': ClipboardCheck,
  'person-standing': PersonStanding,
  'shield-check': ShieldCheck,
  'calendar-clock': CalendarClock,
}

export function TrustStats() {
  return (
    <ul className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4 sm:gap-x-2">
      {TRUST_STATS.map((stat) => {
        const Icon = ICONS[stat.icon]
        return (
          <li key={stat.label} className="flex flex-col items-start gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
              <Icon
                className="h-4 w-4 text-[color:var(--color-olive-soft)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </span>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
                {stat.label}
              </p>
              <p className="mt-1 text-[11px] leading-snug text-[color:var(--color-ink-muted)]">
                {stat.sub}
              </p>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
