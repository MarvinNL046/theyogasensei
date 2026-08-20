/**
 * Instagram starter-grid generator — same code text-layer pipeline as the pins.
 *
 *   satori (brand fonts -> SVG, embedFont: true) -> sharp (rasterise + composite).
 *   embedFont: true keeps word/punctuation spacing correct with these fonts.
 *
 * Square 1080x1080 so the first grid reads cleanly as thumbnails. A mix of
 * modes keeps the grid cohesive without being repetitive:
 *   - photo       full-bleed brand photo + tiny wordmark (image-forward)
 *   - tip         honest one-liner over a darkened photo
 *   - quote-dark  the brand mark on the dark ensō background
 *   - card-cream  cream editorial card (the "link in bio" guide CTA)
 *
 * Honest-framing rules (social-media-plan): no fabricated testing, Aiko stays a
 * decorative brand visual (never a claimed teacher), no medical claims, no emoji,
 * no exclamation marks. Captions live in _ig.md for posting.
 *
 * Run:  npx tsx scripts/generate-ig.ts
 * Out:  public/images/social/instagram/*.png + _ig.md
 */
import { createElement as h } from 'react'
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'
import satori from 'satori'
import sharp from 'sharp'

const ROOT = resolve(import.meta.dirname, '..')
const FONT_DIR = resolve(ROOT, 'scripts/assets/fonts')
const S = 1080

const CREAM = '#faf6ef'
const CLAY = '#c45a3e'
const INK = '#2b2a27'
const MUTED = '#6b6862'
const BRAND_MARK = '継続は力なり'

const font = (file: string) => readFileSync(resolve(FONT_DIR, file))
const fonts = [
  {
    name: 'Cormorant Garamond',
    data: font('CormorantGaramond-400.ttf'),
    weight: 400 as const,
    style: 'normal' as const,
  },
  {
    name: 'Cormorant Garamond',
    data: font('CormorantGaramond-600.ttf'),
    weight: 600 as const,
    style: 'normal' as const,
  },
  {
    name: 'Cormorant Garamond',
    data: font('CormorantGaramond-700.ttf'),
    weight: 700 as const,
    style: 'normal' as const,
  },
  {
    name: 'Inter',
    data: font('Inter-500.ttf'),
    weight: 500 as const,
    style: 'normal' as const,
  },
  {
    name: 'Inter',
    data: font('Inter-600.ttf'),
    weight: 600 as const,
    style: 'normal' as const,
  },
  {
    name: 'Noto Serif JP',
    data: font('NotoSerifJP-600.ttf'),
    weight: 600 as const,
    style: 'normal' as const,
  },
]

type Mode = 'photo' | 'tip' | 'quote-dark' | 'card-cream'
interface Post {
  id: string
  mode: Mode
  image?: string
  eyebrow?: string
  text?: string
  textSize?: number
  caption: string
}

const wordmark = (color: string) =>
  h(
    'div',
    {
      style: {
        fontFamily: 'Inter',
        fontWeight: 600,
        fontSize: 20,
        letterSpacing: 5,
        color,
        textTransform: 'uppercase',
      },
    },
    'The Yoga Sensei',
  )

function Layout(p: Post) {
  const base = {
    width: S,
    height: S,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    fontFamily: 'Inter',
  } as const

  if (p.mode === 'card-cream') {
    return h(
      'div',
      {
        style: {
          ...base,
          justifyContent: 'center',
          alignItems: 'flex-start',
          backgroundColor: CREAM,
          padding: '0 96px',
        },
      },
      h(
        'div',
        {
          style: {
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: 20,
            letterSpacing: 6,
            color: CLAY,
            textTransform: 'uppercase',
          },
        },
        p.eyebrow ?? 'New Guide',
      ),
      h('div', {
        style: {
          width: 72,
          height: 4,
          backgroundColor: CLAY,
          margin: '28px 0 30px 0',
        },
      }),
      h(
        'div',
        {
          style: {
            fontFamily: 'Cormorant Garamond',
            fontWeight: 700,
            fontSize: p.textSize ?? 74,
            lineHeight: 1.05,
            color: INK,
          },
        },
        p.text,
      ),
      h(
        'div',
        {
          style: {
            fontFamily: 'Inter',
            fontWeight: 500,
            fontSize: 26,
            lineHeight: 1.4,
            color: MUTED,
            marginTop: 30,
            maxWidth: 760,
          },
        },
        'Honest picks for grip, thickness, material and price. Link in bio.',
      ),
      h(
        'div',
        {
          style: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: S - 192,
            marginTop: 56,
          },
        },
        wordmark(INK),
        h(
          'div',
          {
            style: {
              fontFamily: 'Noto Serif JP',
              fontWeight: 600,
              fontSize: 26,
              color: CLAY,
            },
          },
          BRAND_MARK,
        ),
      ),
    )
  }

  const scrim =
    p.mode === 'quote-dark'
      ? 'linear-gradient(to bottom, rgba(20,22,16,0.55) 0%, rgba(20,22,16,0.35) 50%, rgba(20,22,16,0.65) 100%)'
      : p.mode === 'tip'
        ? 'linear-gradient(to bottom, rgba(35,38,28,0.30) 0%, rgba(35,38,28,0.10) 40%, rgba(35,38,28,0.80) 100%)'
        : 'linear-gradient(to bottom, rgba(35,38,28,0.10) 0%, rgba(35,38,28,0.00) 45%, rgba(35,38,28,0.55) 100%)'

  const children: any[] = [
    h('div', {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: S,
        height: S,
        background: scrim,
      },
    }),
  ]

  if (p.mode === 'quote-dark') {
    children.push(
      h(
        'div',
        {
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: S,
            height: S,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 100px',
          },
        },
        h(
          'div',
          {
            style: {
              fontFamily: 'Noto Serif JP',
              fontWeight: 600,
              fontSize: 96,
              color: CREAM,
              letterSpacing: 6,
            },
          },
          BRAND_MARK,
        ),
        h(
          'div',
          {
            style: {
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: 6,
              color: CLAY,
              textTransform: 'uppercase',
              marginTop: 30,
            },
          },
          p.eyebrow ?? 'Persistence',
        ),
        h(
          'div',
          {
            style: {
              fontFamily: 'Cormorant Garamond',
              fontWeight: 600,
              fontSize: p.textSize ?? 40,
              color: 'rgba(250,246,239,0.92)',
              textAlign: 'center',
              marginTop: 18,
              lineHeight: 1.3,
              maxWidth: 760,
            },
          },
          p.text,
        ),
      ),
    )
  } else if (p.mode === 'tip') {
    children.push(
      h(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: 88,
            left: 90,
            right: 90,
            display: 'flex',
            flexDirection: 'column',
          },
        },
        h(
          'div',
          {
            style: {
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: 20,
              letterSpacing: 6,
              color: CREAM,
              textTransform: 'uppercase',
            },
          },
          p.eyebrow ?? 'Honest Tip',
        ),
        h('div', {
          style: {
            width: 64,
            height: 4,
            backgroundColor: CLAY,
            margin: '24px 0 26px 0',
          },
        }),
        h(
          'div',
          {
            style: {
              fontFamily: 'Cormorant Garamond',
              fontWeight: 700,
              fontSize: p.textSize ?? 60,
              lineHeight: 1.08,
              color: CREAM,
            },
          },
          p.text,
        ),
      ),
    )
  }

  if (p.mode !== 'quote-dark') {
    children.push(
      h(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: 40,
            left: 0,
            width: S,
            display: 'flex',
            justifyContent: 'center',
          },
        },
        wordmark('rgba(250,246,239,0.92)'),
      ),
    )
  } else {
    children.push(
      h(
        'div',
        {
          style: {
            position: 'absolute',
            bottom: 46,
            left: 0,
            width: S,
            display: 'flex',
            justifyContent: 'center',
          },
        },
        wordmark('rgba(250,246,239,0.85)'),
      ),
    )
  }

  return h('div', { style: base }, ...children)
}

async function render(p: Post, outDir: string) {
  const svg = await satori(Layout(p) as any, {
    width: S,
    height: S,
    fonts,
    embedFont: true,
  })
  const overlay = await sharp(Buffer.from(svg)).png().toBuffer()
  const out = resolve(outDir, `${p.id}.png`)
  if (p.mode === 'card-cream' || !p.image) {
    await sharp(overlay).png().toFile(out)
  } else {
    const bg = await sharp(resolve(ROOT, p.image))
      .resize(S, S, { fit: 'cover', position: 'centre' })
      .toBuffer()
    await sharp(bg)
      .composite([{ input: overlay }])
      .png()
      .toFile(out)
  }
  return out
}

const POSTS: Post[] = [
  {
    id: '1-welcome',
    mode: 'photo',
    image:
      'public/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp',
    caption:
      'Welcome to The Yoga Sensei. Honest, no-hype guides to yoga gear and practice, starting with the one thing you actually stand on. New guides each week. The first set is live, link in bio.',
  },
  {
    id: '2-tip-mat',
    mode: 'tip',
    image: 'public/images/brand/review-hero-best-mats.webp',
    eyebrow: 'Honest Tip',
    text: 'Your mat is the one piece of gear you actually stand on.',
    textSize: 58,
    caption:
      'Most gear is optional. Your mat is not. It is the one piece you stand on for an hour straight, so grip and thickness matter more than the brand printed in the corner. Full mat guide in bio.',
  },
  {
    id: '3-warrior',
    mode: 'photo',
    image: 'public/images/aiko-persona/aiko-warrior-ii-yoga-pose.webp',
    caption:
      'Warrior II, held a beat longer than feels comfortable. The pose teaches the same thing the practice does: steadiness before depth.',
  },
  {
    id: '4-persistence',
    mode: 'quote-dark',
    image: 'public/images/brand/minimal-dark-enso-philosophy-bg.webp',
    eyebrow: 'Persistence',
    text: 'Not the dramatic kind. The kind that shows up on the mat on an ordinary Tuesday.',
    caption:
      '継続は力なり, persistence is strength. Not the dramatic kind of persistence. The quiet kind that shows up on the mat on an ordinary Tuesday and rolls it back up again.',
  },
  {
    id: '5-childs-pose',
    mode: 'photo',
    image: 'public/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
    caption:
      "Child's pose is not a break from the practice. It is the practice. Rest is allowed.",
  },
  {
    id: '6-tip-thickness',
    mode: 'tip',
    image: 'public/images/brand/topic-yoga-mats.webp',
    eyebrow: 'Honest Tip',
    text: 'Thicker is not always better.',
    textSize: 64,
    caption:
      'Thicker is not always better. Too much cushion and you lose the floor in balance poses. Around 4 to 5mm suits most people; go thicker only for sensitive knees. More in the mat guide, link in bio.',
  },
  {
    id: '7-seated-twist',
    mode: 'photo',
    image: 'public/images/aiko-persona/aiko-seated-twist-yoga-pose.webp',
    caption:
      'A seated twist to close a session. Small range, slow breath. You feel it the next morning in the best way.',
  },
  {
    id: '8-guide-cta',
    mode: 'card-cream',
    eyebrow: 'New Guide',
    text: 'The Honest Yoga Mat Guide for 2026',
    textSize: 70,
    caption:
      'The first guide is live: an honest look at the best yoga mats for 2026. Grip, thickness, material and price, plus when a cheaper mat is the smarter buy. No affiliate pressure, just what I would tell a friend. Link in bio.',
  },
  {
    id: '9-bonsai',
    mode: 'photo',
    image: 'public/images/brand/newsletter-bonsai.webp',
    caption:
      'A bonsai in the corner of the studio. Slow, deliberate, never quite finished. A decent description of a yoga practice too.',
  },
]

async function main() {
  const outDir = resolve(ROOT, 'public/images/social/instagram')
  mkdirSync(outDir, { recursive: true })

  const lines: string[] = [
    '# Instagram starter grid — The Yoga Sensei',
    '',
    'Generated by `scripts/generate-ig.ts`. 1080×1080. Bio link → https://www.theyogasensei.com/guides',
    'Honest framing: no fabricated testing, Aiko is decorative, no medical claims, no emoji.',
    'Post order 1→9 reads as a cohesive first grid (text posts fall on a diagonal).',
    '',
  ]

  for (const p of POSTS) {
    const file = await render(p, outDir)
    const rel = file
      .replace(ROOT, '')
      .replace(/^[\\/]/, '')
      .replace(/\\/g, '/')
    console.log('OK', rel)
    lines.push(
      `## ${p.id}  (${p.mode})`,
      '',
      `- **Image:** \`${rel}\``,
      `- **Caption:** ${p.caption}`,
      '',
    )
  }

  writeFileSync(resolve(outDir, '_ig.md'), lines.join('\n'))
  console.log('OK public/images/social/instagram/_ig.md')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
