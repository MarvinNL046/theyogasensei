import { AlertTriangle, Clock3, PackageOpen, Signal, Split } from 'lucide-react'

interface ComparisonProfile {
  left: { name: string; chooseWhen: string }
  right: { name: string; chooseWhen: string }
  difference: string
}

const COMPARISONS: Partial<Record<string, ComparisonProfile>> = {
  'cork-vs-rubber-yoga-mat': {
    left: {
      name: 'Choose cork',
      chooseWhen:
        'you value low weight and grip that increases as the surface becomes damp.',
    },
    right: {
      name: 'Choose rubber',
      chooseWhen:
        'you want dependable dry grip, denser cushioning and a grounded feel.',
    },
    difference:
      'Cork changes more with moisture; rubber usually feels grippier from the first dry pose but is heavier and relevant to latex sensitivity.',
  },
  'tpe-vs-nbr-yoga-mat': {
    left: {
      name: 'Choose TPE',
      chooseWhen:
        'you want a lighter, firmer mat for standing poses and general yoga.',
    },
    right: {
      name: 'Choose NBR',
      chooseWhen:
        'floor cushioning matters more than compact storage or standing stability.',
    },
    difference:
      'TPE is commonly thinner and more supportive; NBR is usually thicker, softer and bulkier.',
  },
  'open-cell-vs-closed-cell-yoga-mat': {
    left: {
      name: 'Choose open-cell',
      chooseWhen:
        'sweat grip matters and you accept more careful cleaning and drying.',
    },
    right: {
      name: 'Choose closed-cell',
      chooseWhen: 'easy wiping and low moisture absorption matter most.',
    },
    difference:
      'Open-cell surfaces absorb moisture; closed-cell surfaces resist it, which changes both wet grip and care.',
  },
  'hatha-vs-vinyasa': {
    left: {
      name: 'Choose Hatha',
      chooseWhen:
        'you prefer slower pacing, clearer pauses and time to learn each shape.',
    },
    right: {
      name: 'Choose Vinyasa',
      chooseWhen:
        'you enjoy continuous, breath-linked transitions and a more flowing class.',
    },
    difference:
      'The practical difference is pace and transition density, not a promise that one style is universally easier.',
  },
  'yoga-mat-vs-exercise-mat': {
    left: {
      name: 'Choose a yoga mat',
      chooseWhen:
        'hand-and-foot grip and firm standing feedback are the priority.',
    },
    right: {
      name: 'Choose an exercise mat',
      chooseWhen:
        'wider floor work or extra cushioning matters more than pose stability.',
    },
    difference:
      'The label is less useful than thickness, firmness, width, surface grip and the equipment you plan to use.',
  },
  'manduka-pro-vs-liforme': {
    left: {
      name: 'Choose Manduka PRO',
      chooseWhen:
        'dense cushioning, closed-cell care and documented warranty support matter most.',
    },
    right: {
      name: 'Choose Liforme',
      chooseWhen:
        'immediate wet-and-dry grip and alignment markings justify the shorter documented service-life trade-off.',
    },
    difference:
      'Manduka prioritizes dense longevity; Liforme prioritizes immediate traction and alignment feedback.',
  },
  'manduka-vs-lululemon-yoga-mat': {
    left: {
      name: 'Choose Manduka PRO',
      chooseWhen:
        'long documented service life, closed-cell care and a latex-free specification matter most.',
    },
    right: {
      name: 'Choose Lululemon The Mat',
      chooseWhen:
        'immediate grip and an absorbent sweat-facing surface matter more than low-maintenance longevity.',
    },
    difference:
      'Manduka is the dense, low-absorption long-horizon choice; Lululemon prioritizes day-one grip and sweat management.',
  },
  'alo-vs-lululemon-yoga-mat': {
    left: {
      name: 'Choose Alo Warrior',
      chooseWhen:
        'a large, plush home-practice surface matters and the mat rarely needs to travel.',
    },
    right: {
      name: 'Choose Lululemon The Mat',
      chooseWhen:
        'you want a more versatile mat for standing balance and both dry and sweaty sessions.',
    },
    difference:
      'Alo emphasizes space and cushioning; Lululemon is the more compact and versatile sweat-aware option.',
  },
}

interface PracticeProfile {
  duration: string
  level: string
  equipment: string
  safety: string
}

const PRACTICES: Partial<Record<string, PracticeProfile>> = {
  'morning-yoga-routine': {
    duration: '10 minutes',
    level: 'Beginner',
    equipment: 'Clear floor space; a mat is optional',
    safety:
      'Move gently when the body is cold and stop for sharp or worsening symptoms.',
  },
  'yoga-for-beginners': {
    duration: 'Start with 10–15 minutes',
    level: 'First practice',
    equipment: 'Comfortable clothing and clear floor space',
    safety:
      'Use a smaller range, do not push into pain and seek individual guidance for injuries or health concerns.',
  },
  'chair-yoga-for-beginners': {
    duration: '5 minutes to start',
    level: 'Beginner · seated',
    equipment: 'A stable chair without wheels',
    safety:
      'Keep the chair on a non-slip surface and stop for pain, dizziness or unusual breathlessness.',
  },
  'chair-yoga-for-seniors': {
    duration: '5–15 minutes',
    level: 'Gentle · adaptable',
    equipment: 'Stable chair; optional mat, blanket or strap',
    safety:
      'Professional guidance is appropriate for fall risk, recent surgery or conditions affecting movement.',
  },
}

export function GuideTemplatePanel({ slug }: { slug: string }) {
  const comparison = COMPARISONS[slug]
  if (comparison) {
    return (
      <section
        aria-labelledby="direct-answer"
        className="not-prose mb-8 rounded-2xl border border-[color:var(--color-border)] bg-white p-6 md:p-8"
      >
        <div className="flex items-center gap-2 text-[color:var(--color-accent-deep)]">
          <Split className="h-5 w-5" />
          <p className="text-[10px] font-bold uppercase tracking-[0.18em]">
            Direct answer
          </p>
        </div>
        <h2 id="direct-answer" className="mt-3 font-serif text-3xl">
          Which should you choose?
        </h2>
        <div className="mt-5 grid gap-px overflow-hidden rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
          {[comparison.left, comparison.right].map((choice) => (
            <div
              key={choice.name}
              className="bg-[color:var(--color-surface-muted)] p-5"
            >
              <h3 className="font-serif text-xl">{choice.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                If {choice.chooseWhen}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
          <strong className="text-[color:var(--color-ink)]">
            Biggest practical difference:
          </strong>{' '}
          {comparison.difference}
        </p>
      </section>
    )
  }

  const practice = PRACTICES[slug]
  if (!practice) return null
  const rows = [
    { icon: Clock3, label: 'Duration', value: practice.duration },
    { icon: Signal, label: 'Experience', value: practice.level },
    { icon: PackageOpen, label: 'You need', value: practice.equipment },
    { icon: AlertTriangle, label: 'Safety', value: practice.safety },
  ]
  return (
    <section
      aria-label="Practice information"
      className="not-prose mb-8 grid gap-px overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2"
    >
      {rows.map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-white p-5">
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4 text-[color:var(--color-olive)]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:var(--color-ink-muted)]">
              {label}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            {value}
          </p>
        </div>
      ))}
    </section>
  )
}
