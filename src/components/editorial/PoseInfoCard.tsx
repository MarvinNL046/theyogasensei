interface PoseProfile {
  level: string
  type: string
  areas: string
  props: string
  modify: string
  hold: string
}

const POSES: Partial<Record<string, PoseProfile>> = {
  'childs-pose': {
    level: 'Beginner-friendly',
    type: 'Resting · kneeling fold',
    areas: 'Back, hips, thighs and ankles',
    props: 'Blanket, bolster or block',
    modify:
      'Knee discomfort, later pregnancy or difficulty breathing comfortably in the fold',
    hold: 'A few comfortable breaths to several minutes',
  },
  'cobra-pose': {
    level: 'Beginner with care',
    type: 'Prone backbend',
    areas: 'Chest, shoulders and spine',
    props: 'Blanket under the pelvis if useful',
    modify: 'Back or wrist pain, pregnancy or recent abdominal surgery',
    hold: 'One to several easy breaths without forcing height',
  },
  'downward-facing-dog': {
    level: 'Beginner · active',
    type: 'Inversion · full-body pose',
    areas: 'Shoulders, back, hamstrings and calves',
    props: 'Blocks or wall variation',
    modify:
      'Wrist or shoulder pain, dizziness, uncontrolled blood pressure or glaucoma concerns',
    hold: 'Start with a few steady breaths',
  },
  'warrior-ii': {
    level: 'Beginner',
    type: 'Standing · strength',
    areas: 'Legs, hips, shoulders and balance',
    props: 'Chair or wall for support',
    modify:
      'Knee pain, balance risk or difficulty maintaining a comfortable stance',
    hold: 'Several comfortable breaths on each side',
  },
  'pigeon-pose': {
    level: 'Intermediate · modify freely',
    type: 'Seated hip-focused pose',
    areas: 'Outer hip and glutes',
    props: 'Bolster, blocks or reclined variation',
    modify:
      'Knee, hip or lower-back pain; avoid forcing the front shin position',
    hold: 'Use a short, comfortable stay and leave if the knee feels strained',
  },
  'sun-salutation': {
    level: 'Beginner sequence',
    type: 'Breath-linked flow',
    areas: 'Whole body',
    props: 'Blocks or chair variations',
    modify:
      'Wrist, shoulder or back pain, dizziness or difficulty moving to the floor',
    hold: 'One or more unhurried rounds',
  },
  'sun-salutation-b': {
    level: 'Intermediate sequence',
    type: 'Breath-linked standing flow',
    areas: 'Whole body · legs and shoulders',
    props: 'Blocks; knees-down transitions',
    modify:
      'Wrist, shoulder, knee or back symptoms; reduce repetitions as needed',
    hold: 'Begin with one slow round',
  },
  'sun-salutation-c': {
    level: 'Beginner-to-intermediate sequence',
    type: 'Breath-linked lunge flow',
    areas: 'Whole body · hips and spine',
    props: 'Blocks or chair support',
    modify: 'Balance difficulty or wrist, knee and back symptoms',
    hold: 'One slow round before adding repetition',
  },
}

export function PoseInfoCard({ slug }: { slug: string }) {
  const pose = POSES[slug]
  if (!pose) return null
  const rows = [
    ['Level', pose.level],
    ['Type', pose.type],
    ['Primary areas', pose.areas],
    ['Helpful props', pose.props],
    ['Modify or avoid when', pose.modify],
    ['Hold', pose.hold],
  ]
  return (
    <section
      aria-labelledby="pose-facts"
      className="not-prose mb-8 overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white"
    >
      <div className="bg-[color:var(--color-surface-muted)] px-6 py-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
          Pose information
        </p>
        <h2 id="pose-facts" className="mt-1 font-serif text-2xl">
          At a glance
        </h2>
      </div>
      <dl className="grid sm:grid-cols-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="border-t border-[color:var(--color-border)] p-5 sm:odd:border-r"
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
