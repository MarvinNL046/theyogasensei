export const PRACTICE_GOALS = [
  'All goals',
  'Build foundations',
  'Create consistency',
  'Improve balance',
  'Move gently',
  'Start the day',
  'Understand styles',
  'Wind down',
] as const

export const PRACTICE_TIMES = [
  'Any duration',
  '5 minutes',
  '10 minutes',
  '20+ minutes',
  'Read and decide',
] as const

export const PRACTICE_EXPERIENCE = [
  'All experience levels',
  'First practice',
  'Beginner',
  'Beginner and beyond',
] as const

export type PracticeGoal = (typeof PRACTICE_GOALS)[number]
export type PracticeTime = (typeof PRACTICE_TIMES)[number]
export type PracticeExperience = (typeof PRACTICE_EXPERIENCE)[number]

export interface PracticeEntry {
  title: string
  description: string
  href: string
  image: string
  goal: Exclude<PracticeGoal, 'All goals'>
  time: Exclude<PracticeTime, 'Any duration'>
  experience: Exclude<PracticeExperience, 'All experience levels'>
  format: 'Guide' | 'Pose' | 'Routine' | 'Sequence'
  safety: string
}

export interface PracticeFilters {
  goal: PracticeGoal
  time: PracticeTime
  experience: PracticeExperience
}

export const DEFAULT_PRACTICE_FILTERS: PracticeFilters = {
  goal: 'All goals',
  time: 'Any duration',
  experience: 'All experience levels',
}

export const PRACTICE_ENTRIES: Array<PracticeEntry> = [
  {
    title: 'Yoga for beginners',
    description:
      'Set up a calm home practice and learn the foundations without rushing into advanced shapes.',
    href: '/guides/yoga-for-beginners',
    image: '/images/guides/yoga-for-beginners/hero.webp',
    goal: 'Build foundations',
    time: 'Read and decide',
    experience: 'First practice',
    format: 'Guide',
    safety: 'Includes setup, modifications and stop signals',
  },
  {
    title: '10-minute morning yoga',
    description:
      'A compact sequence for mornings when consistency matters more than intensity.',
    href: '/guides/morning-yoga-routine',
    image: '/images/guides/morning-yoga-routine/hero.webp',
    goal: 'Start the day',
    time: '10 minutes',
    experience: 'Beginner',
    format: 'Routine',
    safety: 'Gentle options and practical pacing',
  },
  {
    title: 'Chair yoga for beginners',
    description:
      'Start with supported seated movement and learn how to position a stable chair.',
    href: '/guides/chair-yoga-for-beginners',
    image: '/images/guides/chair-yoga-for-beginners/hero.webp',
    goal: 'Move gently',
    time: '10 minutes',
    experience: 'First practice',
    format: 'Routine',
    safety: 'Chair setup and easier variations included',
  },
  {
    title: 'Chair yoga for seniors',
    description:
      'A safety-aware overview with concrete seated poses and guidance on when to pause.',
    href: '/guides/chair-yoga-for-seniors',
    image: '/images/guides/chair-yoga-for-seniors/hero.webp',
    goal: 'Move gently',
    time: '20+ minutes',
    experience: 'Beginner',
    format: 'Guide',
    safety: 'Health caveats and professional-help signals',
  },
  {
    title: 'Free chair yoga routines',
    description:
      'Compare free routine formats before choosing a class, video or printable plan.',
    href: '/guides/free-chair-yoga-for-seniors',
    image: '/images/guides/free-chair-yoga-for-seniors/hero.webp',
    goal: 'Create consistency',
    time: '20+ minutes',
    experience: 'Beginner',
    format: 'Guide',
    safety: 'Choose a routine that matches current mobility',
  },
  {
    title: 'Free 28-day chair yoga plan',
    description:
      'A progressive calendar that prioritizes repeatable sessions over daily intensity.',
    href: '/guides/free-28-day-chair-yoga-for-seniors',
    image: '/images/guides/free-28-day-chair-yoga-for-seniors/hero.webp',
    goal: 'Create consistency',
    time: '20+ minutes',
    experience: 'Beginner',
    format: 'Routine',
    safety: 'Progression can be slowed or repeated',
  },
  {
    title: 'Hatha vs Vinyasa',
    description:
      'Compare pace, structure and class expectations before deciding which style to try.',
    href: '/guides/hatha-vs-vinyasa',
    image: '/images/guides/hatha-vs-vinyasa/hero.webp',
    goal: 'Understand styles',
    time: 'Read and decide',
    experience: 'Beginner and beyond',
    format: 'Guide',
    safety: 'Style labels do not guarantee class intensity',
  },
  {
    title: "Child's Pose",
    description:
      'Learn a common resting shape with knee, hip and shoulder variations.',
    href: '/poses/childs-pose',
    image: '/images/poses/childs-pose/hero.webp',
    goal: 'Wind down',
    time: '5 minutes',
    experience: 'Beginner and beyond',
    format: 'Pose',
    safety: 'Includes props and reasons to modify',
  },
  {
    title: 'Warrior II',
    description:
      'Build a steady standing base while keeping stance length and knee position adaptable.',
    href: '/poses/warrior-ii',
    image: '/images/poses/warrior-ii/hero.webp',
    goal: 'Improve balance',
    time: '5 minutes',
    experience: 'Beginner and beyond',
    format: 'Pose',
    safety: 'Alignment options are ranges, not rigid rules',
  },
  {
    title: 'Sun Salutation A',
    description:
      'Learn the sequence step by step before combining the movements at your own pace.',
    href: '/poses/sun-salutation',
    image: '/images/poses/sun-salutation/hero.webp',
    goal: 'Start the day',
    time: '10 minutes',
    experience: 'Beginner and beyond',
    format: 'Sequence',
    safety: 'Individual transitions and modifications explained',
  },
]

export function filterSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function practiceValueFromSlug<T extends readonly string[]>(
  values: T,
  slug: string | undefined,
  fallback: T[number],
): T[number] {
  return values.find((value) => filterSlug(value) === slug) ?? fallback
}
