interface PoseProfile {
  level: string
  type: string
  areas: string
  props: string
  modify: string
  hold: string
  breathing: string
  exit: string
  easier: string
  chair: string
  sequence: string
}

export const POSES: Partial<Record<string, PoseProfile>> = {
  'childs-pose': {
    level: 'Beginner-friendly',
    type: 'Resting · kneeling fold',
    areas: 'Back, hips, thighs and ankles',
    props: 'Blanket, bolster or block',
    modify:
      'Knee discomfort, later pregnancy or difficulty breathing comfortably in the fold',
    hold: 'A few comfortable breaths to several minutes',
    breathing: 'Breathe comfortably into the back and sides of the ribs.',
    exit: 'Press into the hands and return upright slowly, keeping the head easy.',
    easier: 'Support the chest and forehead with a bolster, blanket or block.',
    chair:
      'Fold toward a chair seat or table and support the forehead and arms.',
    sequence:
      'Use it as a pause after standing work or near the end of practice.',
  },
  'cobra-pose': {
    level: 'Beginner with care',
    type: 'Prone backbend',
    areas: 'Chest, shoulders and spine',
    props: 'Blanket under the pelvis if useful',
    modify: 'Back or wrist pain, pregnancy or recent abdominal surgery',
    hold: 'One to several easy breaths without forcing height',
    breathing:
      'Keep the breath smooth; reduce the lift if breathing feels restricted.',
    exit: 'Exhale and lower the chest gradually, then turn the head or rest the forehead.',
    easier: 'Keep the lift very low or use Sphinx Pose on the forearms.',
    chair:
      'Use a standing wall version instead of loading the floor and wrists.',
    sequence:
      'Place it after gentle prone preparation and before a neutral resting shape.',
  },
  'downward-facing-dog': {
    level: 'Beginner · active',
    type: 'Inversion · full-body pose',
    areas: 'Shoulders, back, hamstrings and calves',
    props: 'Blocks or wall variation',
    modify:
      'Wrist or shoulder pain, dizziness, uncontrolled blood pressure or glaucoma concerns',
    hold: 'Start with a few steady breaths',
    breathing: 'Use an even breath without holding or forcing a fixed rhythm.',
    exit: 'Bend the knees and lower to hands and knees, or walk forward slowly.',
    easier:
      'Bend the knees, shorten the stance or take the hands to blocks or a wall.',
    chair: 'Place the hands on a stable chair or wall and hinge the hips back.',
    sequence:
      'Use it between standing transitions or before a supported resting pose.',
  },
  'warrior-ii': {
    level: 'Beginner',
    type: 'Standing · strength',
    areas: 'Legs, hips, shoulders and balance',
    props: 'Chair or wall for support',
    modify:
      'Knee pain, balance risk or difficulty maintaining a comfortable stance',
    hold: 'Several comfortable breaths on each side',
    breathing:
      'Let the breath stay steady while the stance remains comfortable.',
    exit: 'Straighten the front leg, turn the feet forward and step in with control.',
    easier: 'Shorten the stance and bend the front knee less.',
    chair: 'Use a chair under the front thigh or hold the chair for balance.',
    sequence:
      'Place it among standing poses and follow with a neutral stance or rest.',
  },
  'pigeon-pose': {
    level: 'Intermediate · modify freely',
    type: 'Seated hip-focused pose',
    areas: 'Outer hip and glutes',
    props: 'Bolster, blocks or reclined variation',
    modify:
      'Knee, hip or lower-back pain; avoid forcing the front shin position',
    hold: 'Use a short, comfortable stay and leave if the knee feels strained',
    breathing:
      'Keep the breath unforced and back out if tension changes to pain.',
    exit: 'Return the hands to the floor and move back carefully without twisting the knee.',
    easier: 'Choose reclined figure four or support the front hip generously.',
    chair: 'Use a seated figure-four shape with the spine comfortably upright.',
    sequence:
      'Use it after the body is warm and follow with a neutral position.',
  },
  'sun-salutation': {
    level: 'Beginner sequence',
    type: 'Breath-linked flow',
    areas: 'Whole body',
    props: 'Blocks or chair variations',
    modify:
      'Wrist, shoulder or back pain, dizziness or difficulty moving to the floor',
    hold: 'One or more unhurried rounds',
    breathing:
      'Match movement to a comfortable breath; pause whenever the rhythm feels rushed.',
    exit: 'Finish standing in Mountain Pose and let the breath settle before another round.',
    easier:
      'Step rather than jump and use knees-down or blocks for floor transitions.',
    chair:
      'Use a stable chair for supported folds, lunges and plank-like positions.',
    sequence:
      'Use it as a warm-up or a short sequence, not as a required daily quota.',
  },
  'sun-salutation-b': {
    level: 'Intermediate sequence',
    type: 'Breath-linked standing flow',
    areas: 'Whole body · legs and shoulders',
    props: 'Blocks; knees-down transitions',
    modify:
      'Wrist, shoulder, knee or back symptoms; reduce repetitions as needed',
    hold: 'Begin with one slow round',
    breathing:
      'Keep the breath even; slow or pause before technique becomes hurried.',
    exit: 'Return to Mountain Pose and recover before deciding whether to repeat.',
    easier:
      'Reduce Chaturanga repetitions and lower the knees for transitions.',
    chair: 'Use a chair-supported flow and shorten the standing stances.',
    sequence:
      'Place it after a simpler warm-up and before longer standing work.',
  },
  'sun-salutation-c': {
    level: 'Beginner-to-intermediate sequence',
    type: 'Breath-linked lunge flow',
    areas: 'Whole body · hips and spine',
    props: 'Blocks or chair support',
    modify: 'Balance difficulty or wrist, knee and back symptoms',
    hold: 'One slow round before adding repetition',
    breathing:
      'Let each transition follow an easy breath rather than chasing pace.',
    exit: 'Step forward, rise gradually and settle in Mountain Pose.',
    easier: 'Pad the back knee, use blocks and keep the backbend small.',
    chair:
      'Support the hands on a chair and shorten or omit floor transitions.',
    sequence: 'Use it as a lunge-focused warm-up before standing poses.',
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
  const practiceRows = [
    ['Breathing', pose.breathing],
    ['Leave safely', pose.exit],
    ['Easier variation', pose.easier],
    ['Chair variation', pose.chair],
    ['In a sequence', pose.sequence],
  ]
  return (
    <div className="not-prose mb-8 space-y-4">
      <section
        aria-labelledby="pose-facts"
        className="overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-white"
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
      <section
        aria-labelledby="pose-practice-notes"
        className="overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]"
      >
        <div className="px-6 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
            Practise with options
          </p>
          <h2 id="pose-practice-notes" className="mt-1 font-serif text-2xl">
            Breath, exit and variations
          </h2>
        </div>
        <dl className="grid border-t border-[color:var(--color-border)] sm:grid-cols-2">
          {practiceRows.map(([label, value]) => (
            <div
              key={label}
              className="border-b border-[color:var(--color-border)] bg-white/70 p-5 sm:odd:border-r last:border-b-0"
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
        <p className="px-6 py-4 text-xs leading-relaxed text-[color:var(--color-ink-muted)]">
          Educational guidance only. Yoga can require individual modifications;
          do not postpone professional care for a medical concern.{' '}
          <a
            href="https://www.nccih.nih.gov/health/yoga-effectiveness-and-safety"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[color:var(--color-olive-deep)] underline underline-offset-2"
          >
            Read the NCCIH yoga safety overview
          </a>
          .
        </p>
      </section>
    </div>
  )
}
