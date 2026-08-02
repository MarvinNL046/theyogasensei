import {
  AlertTriangle,
  Clock3,
  PackageOpen,
  Signal,
  Split,
  Users,
} from 'lucide-react'

export interface ComparisonProfile {
  left: { name: string; chooseWhen: string }
  right: { name: string; chooseWhen: string }
  difference: string
  factors: Array<{ label: string; left: string; right: string }>
}

export const COMPARISONS: Partial<Record<string, ComparisonProfile>> = {
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
    factors: [
      {
        label: 'Dry grip',
        left: 'Firm, less tacky',
        right: 'Tacky and planted',
      },
      {
        label: 'Damp grip',
        left: 'Usually improves',
        right: 'Product-dependent',
      },
      { label: 'Cushion', left: 'Often firmer', right: 'Usually denser' },
      { label: 'Weight', left: 'Often lighter', right: 'Usually heavier' },
      {
        label: 'Care',
        left: 'Wipe, then dry fully',
        right: 'Wipe; avoid heat and sun',
      },
      {
        label: 'Latex relevance',
        left: 'Depends on the backing',
        right: 'Yes for natural rubber',
      },
      {
        label: 'Best for',
        left: 'Sweaty practice and lighter carry',
        right: 'Reliable dry grip and grounded feel',
      },
    ],
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
    factors: [
      {
        label: 'Typical feel',
        left: 'Firmer and springier',
        right: 'Softer and plusher',
      },
      {
        label: 'Standing stability',
        left: 'Usually the stronger fit',
        right: 'Can feel less stable when thick',
      },
      {
        label: 'Floor cushioning',
        left: 'Moderate',
        right: 'High in common 10mm formats',
      },
      { label: 'Carry', left: 'Thinner, often lighter', right: 'Bulkier roll' },
      {
        label: 'Sweat grip',
        left: 'Product-specific',
        right: 'Product-specific',
      },
      {
        label: 'Composition',
        left: 'Often a proprietary blend',
        right: 'Synthetic rubber foam',
      },
      {
        label: 'Best for',
        left: 'General yoga and transitions',
        right: 'Floor work and extra padding',
      },
    ],
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
    factors: [
      { label: 'Moisture', left: 'Absorbs it', right: 'Resists it' },
      {
        label: 'Damp-hand grip',
        left: 'Often the stronger fit',
        right: 'More surface-dependent',
      },
      {
        label: 'Cleaning',
        left: 'Careful surface cleaning',
        right: 'Usually easier to wipe',
      },
      {
        label: 'Drying',
        left: 'Needs thorough air-drying',
        right: 'Usually faster',
      },
      {
        label: 'Odor risk',
        left: 'Higher if stored damp',
        right: 'Lower absorption',
      },
      {
        label: 'Best for',
        left: 'Sweaty sessions',
        right: 'Low-maintenance practice',
      },
    ],
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
    factors: [
      {
        label: 'Pace',
        left: 'Slow to moderate',
        right: 'Continuous; often moderate to fast',
      },
      {
        label: 'Transitions',
        left: 'More pauses',
        right: 'Breath-linked sequences',
      },
      {
        label: 'Predictability',
        left: 'Often more segmented',
        right: 'Often more varied',
      },
      {
        label: 'Beginner challenge',
        left: 'Longer holds',
        right: 'Faster cueing',
      },
      {
        label: 'Intensity',
        left: 'Teacher and class dependent',
        right: 'Teacher and class dependent',
      },
      {
        label: 'Best for',
        left: 'Time to learn each shape',
        right: 'Rhythmic movement',
      },
    ],
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
    factors: [
      {
        label: 'Primary job',
        left: 'Pose grip and stability',
        right: 'General floor exercise',
      },
      {
        label: 'Typical build',
        left: 'Narrower and firmer',
        right: 'Often wider and thicker',
      },
      {
        label: 'Standing work',
        left: 'Usually more stable',
        right: 'May compress more',
      },
      {
        label: 'Floor work',
        left: 'Moderate cushioning',
        right: 'Often more cushioning',
      },
      {
        label: 'Shoe use',
        left: 'Check the surface guidance',
        right: 'More commonly intended for training',
      },
      {
        label: 'Best for',
        left: 'Yoga sequences',
        right: 'Stretching and workouts',
      },
    ],
  },
  'yoga-rug-vs-mat': {
    left: {
      name: 'Choose a yoga rug',
      chooseWhen:
        'you deliberately want a foldable, absorbent textile surface and can follow its floor and washing guidance.',
    },
    right: {
      name: 'Choose a yoga mat',
      chooseWhen:
        'you want integrated grip, cushioning and a more predictable floor-facing base.',
    },
    difference:
      'A rug manages contact through its weave and may need another layer; a mat integrates the contact surface, cushion and base into one unit.',
    factors: [
      {
        label: 'Construction',
        left: 'Woven textile',
        right: 'Continuous or bonded sheet',
      },
      {
        label: 'Cushion',
        left: 'Minimal and weave-dependent',
        right: 'Built into a measured thickness',
      },
      {
        label: 'Moisture',
        left: 'Cotton-rich weaves absorb it',
        right: 'Depends on open- or closed-cell build',
      },
      {
        label: 'Floor stability',
        left: 'May need a mat underneath',
        right: 'Base is normally integrated',
      },
      { label: 'Packing', left: 'Folds or rolls', right: 'Usually rolls' },
      {
        label: 'Cleaning',
        left: 'Product-specific washing',
        right: 'Usually surface cleaning',
      },
      {
        label: 'Best for',
        left: 'Textile feel and absorbency',
        right: 'Integrated grip and support',
      },
    ],
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
    factors: [
      {
        label: 'Surface',
        left: 'Closed-cell textured PVC',
        right: 'Polyurethane over rubber',
      },
      {
        label: 'Grip',
        left: 'Needs realistic break-in expectations',
        right: 'Immediate wet-and-dry traction',
      },
      {
        label: 'Cushion',
        left: 'Dense 6mm support',
        right: 'Firmer 4.2mm profile',
      },
      { label: 'Weight', left: 'About 3.4kg', right: 'About 2.5kg' },
      {
        label: 'Care',
        left: 'Low absorption; wipe clean',
        right: 'Absorbent top; careful cleaning',
      },
      {
        label: 'Latex relevance',
        left: 'Specified latex-free',
        right: 'Natural-rubber base',
      },
      {
        label: 'Best for',
        left: 'Long-horizon ownership',
        right: 'Grip and alignment feedback',
      },
    ],
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
    factors: [
      {
        label: 'Surface',
        left: 'Closed-cell textured PVC',
        right: 'Polyurethane over rubber',
      },
      {
        label: 'Day-one grip',
        left: 'Break-in may matter',
        right: 'Strong from the start',
      },
      {
        label: 'Sweat',
        left: 'Surface does not absorb it',
        right: 'Absorbent practice side',
      },
      {
        label: 'Cushion',
        left: 'Dense 6mm support',
        right: '5mm reversible build',
      },
      {
        label: 'Care',
        left: 'Lower-absorption care',
        right: 'Stain-aware surface care',
      },
      {
        label: 'Latex relevance',
        left: 'Specified latex-free',
        right: 'Contains natural rubber',
      },
      {
        label: 'Best for',
        left: 'Durability-led ownership',
        right: 'Versatile immediate grip',
      },
    ],
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
    factors: [
      {
        label: 'Footprint',
        left: 'Longer and wider',
        right: 'More conventional size',
      },
      {
        label: 'Feel',
        left: 'Plush and substantial',
        right: 'Balanced and versatile',
      },
      {
        label: 'Grip',
        left: 'Strong PU-surface grip',
        right: 'Strong reversible grip',
      },
      {
        label: 'Carry',
        left: 'Heavy and home-oriented',
        right: 'Heavy, but easier to manage',
      },
      {
        label: 'Care',
        left: 'Wipe-only surface care',
        right: 'Absorbent side needs care',
      },
      {
        label: 'Best for',
        left: 'Spacious home practice',
        right: 'Mixed and sweaty practice',
      },
    ],
  },
}

export interface PracticeProfile {
  audience: string
  duration: string
  level: string
  equipment: string
  safety: string
}

export const PRACTICES: Partial<Record<string, PracticeProfile>> = {
  'morning-yoga-routine': {
    audience: 'People who want a short, repeatable start to the day',
    duration: '10 minutes',
    level: 'Beginner',
    equipment: 'Clear floor space; a mat is optional',
    safety:
      'Move gently when the body is cold and stop for sharp or worsening symptoms.',
  },
  'yoga-for-beginners': {
    audience: 'People preparing for a first home or studio practice',
    duration: 'Start with 10–15 minutes',
    level: 'First practice',
    equipment: 'Comfortable clothing and clear floor space',
    safety:
      'Use a smaller range, do not push into pain and seek individual guidance for injuries or health concerns.',
  },
  'chair-yoga-for-beginners': {
    audience: 'Beginners who prefer or need stable seated support',
    duration: '5 minutes to start',
    level: 'Beginner · seated',
    equipment: 'A stable chair without wheels',
    safety:
      'Keep the chair on a non-slip surface and stop for pain, dizziness or unusual breathlessness.',
  },
  'chair-yoga-for-seniors': {
    audience: 'Older adults seeking adaptable seated movement',
    duration: '5–15 minutes',
    level: 'Gentle · adaptable',
    equipment: 'Stable chair; optional mat, blanket or strap',
    safety:
      'Professional guidance is appropriate for fall risk, recent surgery or conditions affecting movement.',
  },
  'free-chair-yoga-for-seniors': {
    audience: 'Older beginners comparing free guided-practice formats',
    duration: 'Choose a short session first',
    level: 'Beginner · adaptable',
    equipment: 'Stable chair; clear space around it',
    safety:
      'Check the teacher, chair setup and stop signals before following any video or class.',
  },
  'free-28-day-chair-yoga-for-seniors': {
    audience: 'People who want a gradual chair-yoga calendar',
    duration: 'Short sessions across 28 days',
    level: 'Beginner · progressive',
    equipment: 'Stable chair and a way to track completed sessions',
    safety:
      'Repeat or skip days as needed; a calendar is not a reason to practise through symptoms.',
  },
  'printable-chair-yoga-for-seniors': {
    audience: 'People who prefer a printable visual routine',
    duration: 'Self-paced',
    level: 'Beginner · seated',
    equipment: 'Stable chair and the printed routine',
    safety:
      'Keep instructions visible, move within a comfortable range and stop for concerning symptoms.',
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
        <div
          className="mt-6 overflow-x-auto rounded-xl border border-[color:var(--color-border)]"
          tabIndex={0}
          aria-label="Side-by-side comparison; scroll horizontally on smaller screens"
        >
          <div className="min-w-[620px]">
            <div className="grid grid-cols-[minmax(7rem,.8fr)_minmax(0,1fr)_minmax(0,1fr)] bg-[color:var(--color-olive)] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              <span>Factor</span>
              <span>{comparison.left.name.replace('Choose ', '')}</span>
              <span>{comparison.right.name.replace('Choose ', '')}</span>
            </div>
            <dl className="divide-y divide-[color:var(--color-border)] bg-white">
              {comparison.factors.map((factor) => (
                <div
                  key={factor.label}
                  className="grid grid-cols-[minmax(7rem,.8fr)_minmax(0,1fr)_minmax(0,1fr)] px-4 py-3 text-sm leading-snug"
                >
                  <dt className="pr-3 font-semibold text-[color:var(--color-ink)]">
                    {factor.label}
                  </dt>
                  <dd className="pr-3 text-[color:var(--color-ink-soft)]">
                    {factor.left}
                  </dd>
                  <dd className="text-[color:var(--color-ink-soft)]">
                    {factor.right}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    )
  }

  const practice = PRACTICES[slug]
  if (!practice) return null
  const rows = [
    { icon: Users, label: 'Who it is for', value: practice.audience },
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
