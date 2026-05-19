import { cn } from '#/lib/utils'

/**
 * Canonical verified phrases — AGENTS.md §9. Never invent or extend without
 * verification. The brand philosophy attaches to specific phrases:
 *
 *   - persistence:   recurring brand-mark phrase (most-used, default in hero/footer)
 *   - practice:      practice / learn / grow — for practice & learning pages
 *   - presence:      "be here now" — for meditation / breathwork
 *   - stillness:     for quiet / reflective / philosophy sections
 *   - habits:        for routine / consistency content
 *   - sensei:        the wordmark root — use only in logo / about contexts
 *
 * Style philosophy (Marvin): subtle, semi-transparent, vertical right edge.
 * "Premium branding detail", not "look I have Japanese text".
 */
const PHRASES = {
  persistence: {
    ja: '継続は力なり',
    romaji: 'Keizoku wa chikara nari',
    en: 'consistency is strength',
  },
  practice: {
    ja: '練習・学び・成長する。',
    romaji: 'Renshū, manabi, seichō suru',
    en: 'practice, learn, grow',
  },
  presence: {
    ja: '今ここ',
    romaji: 'Ima koko',
    en: 'be here now',
  },
  stillness: {
    ja: '静けさ',
    romaji: 'Shizukesa',
    en: 'stillness',
  },
  habits: {
    ja: '習慣が人生を作る',
    romaji: 'Shūkan ga jinsei o tsukuru',
    en: 'habits create your life',
  },
  sensei: {
    ja: '先生',
    romaji: 'Sensei',
    en: 'teacher',
  },
} as const

export type JapanesePhrase = keyof typeof PHRASES

type AccentSize = 'sm' | 'md' | 'lg'
type AccentTone = 'default' | 'soft' | 'onDark'

const SIZE: Record<AccentSize, string> = {
  sm: 'text-[11px]',
  md: 'text-sm',
  lg: 'text-base',
}

const TONE: Record<AccentTone, string> = {
  default: 'text-[color:var(--color-accent)]/85',
  soft: 'text-[color:var(--color-ink-muted)]/70',
  onDark: 'text-[color:var(--color-accent-soft)]/80',
}

export interface JapaneseAccentProps {
  phrase: JapanesePhrase
  /** Vertical right-to-left orientation (the recurring editorial accent). */
  vertical?: boolean
  size?: AccentSize
  tone?: AccentTone
  /** Visible English caption after the Japanese — use sparingly, on first appearance only. */
  showTranslation?: boolean
  className?: string
}

export function JapaneseAccent({
  phrase,
  vertical = false,
  size = 'sm',
  tone = 'default',
  showTranslation = false,
  className,
}: JapaneseAccentProps) {
  const { ja, en } = PHRASES[phrase]
  return (
    <span
      lang="ja"
      aria-label={en}
      className={cn(
        'select-none font-[Noto_Serif_JP,var(--font-serif)] tracking-[0.2em]',
        SIZE[size],
        TONE[tone],
        vertical && '[writing-mode:vertical-rl] [text-orientation:mixed]',
        className,
      )}
    >
      {ja}
      {showTranslation && (
        <span
          lang="en"
          aria-hidden="true"
          className="ml-3 align-middle font-sans text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-ink-muted)]/70"
        >
          — {en}
        </span>
      )}
    </span>
  )
}
