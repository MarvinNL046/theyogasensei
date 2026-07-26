/**
 * Pinterest pin generator — code text-layer pipeline.
 *
 *   1. satori  — lays out the brand text/scrim layer in real brand fonts
 *                (Cormorant Garamond / Inter / Noto Serif JP), output as SVG.
 *                embedFont: true keeps word/punctuation spacing correct (the
 *                outline path mode mis-spaces around punctuation with these
 *                fonts); the font is embedded so sharp needs no system fonts.
 *   2. sharp   — rasterises the SVG overlay, then composites it over the
 *                Higgsfield/brand imagery resized to a 1000×1500 cover.
 *
 * Diffusion is NEVER used for text (it garbles). The imagery layer is supplied
 * as existing on-brand photos; the text layer is always code.
 *
 * Backgrounds per guide are read from public/images/guides/<slug>/*.webp at
 * runtime, with the aesthetic angle always using a calm Aiko photo and any gaps
 * padded from a reusable brand pool. Hook copy is hand-tuned per guide.
 *
 * Run:  npx tsx scripts/generate-pins.ts
 * Out:  public/images/pins/<slug>/*.png + _pins.md per guide.
 */
import { createElement as h } from 'react'
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import satori from 'satori'
import sharp from 'sharp'

const ROOT = resolve(import.meta.dirname, '..')
const FONT_DIR = resolve(ROOT, 'scripts/assets/fonts')
const W = 1000
const H = 1500

const CREAM = '#faf6ef'
const CLAY = '#c45a3e'
const RED = '#d63a2c' // A/B colour test: charcoal + red variant accent (hero-inspired)
const BRAND_MARK = '継続は力なり'

const INK = '#191614' // near-black block for the bold layout

type PinStyle = 'default' | 'darkred' | 'bold' | 'structured'
// Full-height scrim per style. default = warm olive (current pins);
// darkred = moody charcoal warming into deep red at the base (hero-inspired A/B).
const SCRIM: Record<PinStyle, string> = {
  default:
    'linear-gradient(to bottom, rgba(35,38,28,0.30) 0%, rgba(35,38,28,0.05) 26%, rgba(35,38,28,0.10) 52%, rgba(35,38,28,0.74) 86%, rgba(35,38,28,0.90) 100%)',
  darkred:
    'linear-gradient(to bottom, rgba(26,22,21,0.44) 0%, rgba(26,22,21,0.16) 24%, rgba(42,20,18,0.34) 50%, rgba(64,20,16,0.86) 84%, rgba(76,18,14,0.95) 100%)',
  // 'bold' and 'structured' draw opaque blocks instead of a scrim.
  bold: 'none',
  structured: 'none',
}

// Bold layout geometry: solid headline block, photo window, CTA bar.
const BOLD_TOP = 640
const BOLD_BAR = 200

// Structured layout geometry — Marvin's pin spec (2026-07-25), the DEFAULT for
// all NEW guides and their variants: top 20% search-focused headline, middle
// 60% imagery, bottom 20% concrete CTA + small branding. One central message,
// two typefaces (Cormorant headline + Inter UI; the kanji brand mark is the
// logo element), high contrast for mobile. On this EN site every pin links to
// its EN page; on NL sites, NL pins must link to NL pages.
const STRUCT_TOP = 300
const STRUCT_BAR = 300

const font = (file: string) => readFileSync(resolve(FONT_DIR, file))
const fonts = [
  { name: 'Cormorant Garamond', data: font('CormorantGaramond-400.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Cormorant Garamond', data: font('CormorantGaramond-600.ttf'), weight: 600 as const, style: 'normal' as const },
  { name: 'Cormorant Garamond', data: font('CormorantGaramond-700.ttf'), weight: 700 as const, style: 'normal' as const },
  { name: 'Inter', data: font('Inter-500.ttf'), weight: 500 as const, style: 'normal' as const },
  { name: 'Inter', data: font('Inter-600.ttf'), weight: 600 as const, style: 'normal' as const },
  { name: 'Inter', data: font('Inter-800.ttf'), weight: 800 as const, style: 'normal' as const },
  { name: 'Noto Serif JP', data: font('NotoSerifJP-600.ttf'), weight: 600 as const, style: 'normal' as const },
  // Condensed heavy display face for the 'bold' pin layout (Pinterest listicle style).
  { name: 'Anton', data: font('Anton-400.ttf'), weight: 400 as const, style: 'normal' as const },
]

// Calm Aiko photos used for the broad-reach "aesthetic" angle (decorative only).
const AIKO_POOL = [
  'public/images/aiko-persona/aiko-rolling-out-sage-yoga-mat.webp',
  'public/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp',
  'public/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
  'public/images/aiko-persona/aiko-seated-twist-yoga-pose.webp',
  'public/images/aiko-persona/aiko-warrior-ii-yoga-pose.webp',
  'public/images/aiko-persona/aiko-cobra-pose-warm-yoga-studio.webp',
  'public/images/aiko-persona/aiko-upward-facing-dog-yoga-pose.webp',
]
// Brand fillers if a guide folder runs short of local photos.
const BRAND_POOL = [
  'public/images/brand/topic-yoga-mats.webp',
  'public/images/brand/review-hero-best-mats.webp',
  'public/images/brand/topic-meditation.webp',
  'public/images/brand/topic-beginner-yoga.webp',
]

type Hook = [eyebrow: string, title: string, subtitle: string, titleSize?: number]

/**
 * Per-pin Pinterest SEO copy, keyed by `${slug}/${angle-id}`.
 * Pinterest is a search engine: the title must read like the phrase people
 * type, not like the on-image headline. Volumes below are US/month from
 * DataForSEO (checked 2026-07-25) — they decide which angle gets which pin.
 */
const PIN_SEO: Record<string, { title: string; desc: string }> = {
  // "best yoga mats" — 4,400/mo
  'best-yoga-mats-bold/01-listicle': {
    title: 'Best Yoga Mats for Every Practice (2026)',
    desc: 'Looking for the best yoga mat? Seven mats compared and honestly ranked on grip, cushion, durability, value and eco impact — from a budget beginner mat to a buy-it-for-life one. No invented lab tests, every claim sourced, and clear notes on who should skip each mat.',
  },
  // "best yoga mat for hot yoga" — 4,400/mo
  'best-yoga-mats-bold/02-problem': {
    title: 'Best Yoga Mat for Hot Yoga: Grip That Survives Sweat',
    desc: 'Sliding out of down dog in a heated class? This is the grip problem, solved. Seven yoga mats compared on wet grip, sweat handling and material — including which ones need a towel and which hold on their own. Honest picks, no fake testing claims.',
  },
  // "best yoga mat for beginners" — 390/mo, high intent
  'best-yoga-mats-bold/03-comparison': {
    title: 'Best Yoga Mat for Beginners: 7 Mats Compared',
    desc: 'Buying your first yoga mat? Here are seven mats compared on grip, cushion, thickness and price tier, so you can start without overpaying. Includes the beginner value pick, what thickness actually suits home practice, and when a cheaper mat is genuinely fine.',
  },
  // "non slip yoga mat" — 4,400/mo (replaced the Manduka-vs-Lululemon angle at 30/mo)
  'best-yoga-mats-bold/04-aesthetic': {
    title: 'Non Slip Yoga Mat: 7 Mats Ranked by Grip',
    desc: 'A non slip yoga mat is the difference between holding a pose and sliding out of it. Seven mats ranked on grip — dry and sweaty — plus the material that grips best, why texture beats price, and which mats only grip once broken in.',
  },
  // "yoga mat comparison" — 260/mo, LOW competition
  'best-yoga-mats-bold/05-checklist': {
    title: 'Yoga Mat Comparison: 7 Mats Scored Side by Side',
    desc: 'A straight yoga mat comparison: seven mats scored on grip, cushion, durability, value and eco impact, with the trade-off spelled out for each. Research-led from specs and aggregated reviews — no invented lab tests, and honest about when not to buy.',
  },

  // ---- hot yoga (page ships 4 picks + towel + care sections) ----
  // "hot yoga mat" — 12,100/mo, the biggest term in this niche
  'best-yoga-mat-for-hot-yoga-bold/01-listicle': {
    title: 'Hot Yoga Mats: 4 That Hold When You Sweat',
    desc: 'A hot yoga mat has one job: grip when everything is wet. Four mats compared on wet grip, sweat handling, material and thickness — plus the towel pairing that fixes most slipping, and which mats need one. No invented lab tests.',
  },
  // "best yoga mat for hot yoga" — 4,400/mo
  'best-yoga-mat-for-hot-yoga-bold/02-problem': {
    title: 'Best Yoga Mat for Hot Yoga: Grip That Survives Sweat',
    desc: 'Looking for the best yoga mat for hot yoga? Four honest picks compared on wet grip, sweat absorption, material and how fast they wear in a heated room — with clear notes on who should skip each one and why heat kills a normal mat.',
  },
  // "best hot yoga towel" — 590/mo (the page has a dedicated towel section)
  'best-yoga-mat-for-hot-yoga-bold/03-comparison': {
    title: 'Hot Yoga Towel: Do You Actually Need One?',
    desc: 'A hot yoga towel is often the cheaper fix for slipping — before you replace the mat. When a towel beats a pricier mat, when it does not, and how to pair one with the mat you already own. Honest advice, including when to buy nothing.',
  },
  // "yoga mat for sweaty hands" — 70/mo, low volume but exact-problem intent
  'best-yoga-mat-for-hot-yoga-bold/04-aesthetic': {
    title: 'Sliding in Hot Yoga? Here Is the Grip Fix',
    desc: 'Hands slipping forward in down dog? That is your mat giving up once it gets wet. Why sweat kills grip on most mats, which materials hold on, and the cheap fix to try before buying anything new.',
  },
  // care angle — supports the page's "keep it clean or it dies fast" section
  'best-yoga-mat-for-hot-yoga-bold/05-checklist': {
    title: 'Hot Yoga Mat Care: Make It Last Longer',
    desc: 'Hot yoga destroys mats faster than any other practice. How to clean a mat that gets soaked every session, what wrecks the grip, and the care routine that adds years — plus the four mats that survive heat best.',
  },

  // ---- eco-friendly (page ships 5 picks incl. a cork and rubber option) ----
  // "eco friendly yoga mat" — 2,900/mo
  'eco-friendly-yoga-mat-bold/01-listicle': {
    title: 'Eco Friendly Yoga Mats: 5 Honest Picks',
    desc: 'Choosing an eco friendly yoga mat means picking which trade-off you can live with. Five honest picks compared on material, grip, latex risk and care — plus what "eco" actually means on a mat label, and when the greener choice is keeping the mat you own.',
  },
  // "cork yoga mat" — 4,400/mo, the biggest eco term (page has a cork pick)
  'eco-friendly-yoga-mat-bold/02-problem': {
    title: 'Cork Yoga Mat: Grip, Care and the Real Trade-Off',
    desc: 'A cork yoga mat grips better as you sweat and needs almost no cleaning — but it is firm underfoot and heavier than you expect. The honest case for and against cork, how it compares to rubber and jute, and who should skip it.',
  },
  // "natural rubber yoga mat" — 1,900/mo
  'eco-friendly-yoga-mat-bold/03-comparison': {
    title: 'Natural Rubber Yoga Mats: Best Grip, One Warning',
    desc: 'Natural rubber gives the best dry grip of any eco material and cushions better than cork — but it has a smell at first, and it is a genuine problem if you have a latex allergy. Honest picks, the trade-offs, and the safer alternatives.',
  },
  // "non toxic yoga mat" — 1,900/mo
  'eco-friendly-yoga-mat-bold/04-aesthetic': {
    title: 'Non Toxic Yoga Mat: How to Read Past the Label',
    desc: 'Most "non toxic" yoga mat claims are marketing. What the certifications actually mean, which materials are genuinely inert, why PVC keeps showing up in eco ranges, and five mats that hold up to the claim.',
  },
  // "sustainable yoga mat" — 480/mo
  'eco-friendly-yoga-mat-bold/05-checklist': {
    title: 'Sustainable Yoga Mat: The Greenest One Is the One You Keep',
    desc: 'The most sustainable yoga mat is rarely the one with the greenest marketing — it is the one that lasts a decade instead of two years. How durability beats the eco label, which materials actually go the distance, and five honest picks.',
  },

  // ---- cork vs rubber ----
  // The page's own term ("cork vs rubber yoga mat") is only 20/mo, so these
  // pins target the material terms it genuinely answers instead.
  'cork-vs-rubber-yoga-mat-bold/01-listicle': {
    title: 'Cork vs Rubber Yoga Mat: Which One Fits Your Practice',
    desc: 'Cork or rubber? Cork grips better the more you sweat and needs almost no cleaning; rubber wins on dry grip and cushions your joints better. The honest comparison on grip, cushion, weight, care, eco impact and latex risk — with a clear pick for each type of practice.',
  },
  // "best cork yoga mat" — 320/mo
  'cork-vs-rubber-yoga-mat-bold/02-problem': {
    title: 'Best Cork Yoga Mat? Read This About Grip First',
    desc: 'Cork grips better as you sweat, which is the opposite of most mats — but it is firm underfoot and heavier to carry. What cork does well, where rubber beats it, and which practice each one suits. No fake testing claims.',
  },
  // latex is the decision-maker the page leads on
  'cork-vs-rubber-yoga-mat-bold/03-comparison': {
    title: 'Natural Rubber Yoga Mat and Latex: Read Before You Buy',
    desc: 'Natural rubber gives the best dry grip and cushion of any eco material — but it is real latex, which rules it out if you are sensitive. Why this one factor decides the mat for some people, and what to choose instead.',
  },
  // "non slip yoga mat" adjacency — cork's wet-grip behaviour
  'cork-vs-rubber-yoga-mat-bold/04-aesthetic': {
    title: 'Which Yoga Mat Grips When You Sweat: Cork or Rubber?',
    desc: 'Cork wins wet, rubber wins dry. That one line decides most cork-versus-rubber choices. How each material behaves once your hands are damp, why rubber needs a break-in period, and which to pick for hot yoga versus a dry home practice.',
  },
  'cork-vs-rubber-yoga-mat-bold/05-checklist': {
    title: 'Cork vs Rubber Yoga Mat: The Trade-Offs at a Glance',
    desc: 'Grip, cushion, weight, care, eco impact and latex risk — cork and rubber compared side by side, with the trade-off spelled out for each. Includes who should skip each material and why the heavier mat is sometimes the right buy.',
  },

  // ---- budget / value angle ----
  // "under $50" phrasing is only 40/mo AND Amazon forbids static prices in
  // creative. "cheap yoga mat" and "budget yoga mat" are 2,900/mo each and
  // carry the same buying intent without a price claim that expires.
  'best-yoga-mat-for-beginners-bold/01-listicle': {
    title: 'Best Budget Yoga Mat: 5 Picks for Every Budget',
    desc: 'You do not need an expensive mat to start. Five beginner yoga mats compared from cheap-and-cheerful to buy-it-for-life, with the honest trade-off at each level — and the thickness that actually suits a beginner practice.',
  },
  'best-yoga-mat-for-beginners-bold/02-problem': {
    title: 'Cheap Yoga Mat: Which Ones Are Actually Worth It',
    desc: 'A cheap yoga mat is fine to start on — as long as you know what you are giving up. Which budget mats hold their grip, which ones flake or slide within months, and the one upgrade worth paying for when you are ready.',
  },
  'best-yoga-mat-for-beginners-bold/03-comparison': {
    title: 'Best Yoga Mat for Beginners: What to Buy First',
    desc: 'Buying your first yoga mat? Start here. Five picks compared on grip, cushion and value, plus the thickness that suits a beginner, why the cheapest mat is sometimes the right call, and when spending more genuinely pays off.',
  },
  'best-yoga-mat-for-beginners-bold/04-aesthetic': {
    title: 'Affordable Yoga Mat: Where It Is Safe to Save',
    desc: 'Where a cheaper yoga mat is genuinely fine, and where saving costs you within months. Grip, cushion and durability compared across five beginner picks — with honest notes on when not to buy a new mat at all.',
  },
  'best-yoga-mat-for-beginners-bold/05-checklist': {
    title: 'Yoga Mat for Beginners: The 3 Things That Matter',
    desc: 'Forget the marketing. A beginner mat needs three things: grip you can trust, enough cushion for your knees, and a thickness you can still balance on. How the five picks compare on each — and the mistake that makes beginners buy twice.',
  },
}
interface Guide {
  slug: string
  hashtags: string
  desc: string // base pin description (from metaDescription), reused per angle
  hooks: Hook[] // exactly 5, in angle order: list / problem / comparison / aesthetic / checklist
  route?: string // URL segment under theyogasensei.com (default 'guides'; e.g. 'poses')
  url?: string // full target URL override (for pages outside the /route/slug pattern, e.g. /starter-guide)
  style?: PinStyle // colour treatment (default = olive; 'darkred' = charcoal+red A/B variant)
  bg?: string[] // explicit 5 backgrounds (bypasses imagesFor — for pages with no guide photo folder)
}

/**
 * High-contrast "listicle" layout for Pinterest money pages: opaque headline
 * block on top, a window that lets the photo through, and a CTA bar at the
 * bottom. Structure follows the format that performs on Pinterest search;
 * palette stays inside the brand (ink / clay / cream) so pins still read as ours.
 *
 * Hook fields are reused: eyebrow = accent chip, title = headline, subtitle = CTA bar.
 */
function BoldLayout(eyebrow: string, title: string, subtitle: string, titleSize: number) {
  return h(
    'div',
    { style: { width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: 'Inter' } },
    // ---- headline block ----
    h(
      'div',
      {
        style: {
          width: W, height: BOLD_TOP, backgroundColor: INK, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', padding: '0 66px',
        },
      },
      // satori ignores "\n" inside a text node, so each line is its own div.
      ...title.split('\n').map((line) =>
        h('div', {
          style: {
            fontFamily: 'Anton', fontSize: titleSize, lineHeight: 1.0, color: CREAM,
            textTransform: 'uppercase', letterSpacing: -1,
          },
        }, line),
      ),
      eyebrow
        ? h(
            'div',
            { style: { display: 'flex', marginTop: 26 } },
            h('div', {
              style: {
                backgroundColor: CLAY, color: CREAM, fontFamily: 'Anton',
                fontSize: Math.round(titleSize * 0.78), lineHeight: 1.0,
                textTransform: 'uppercase', padding: '14px 26px 20px 26px', letterSpacing: -0.5,
              },
            }, eyebrow),
          )
        : null,
    ),
    // ---- photo window (transparent: the composited photo shows through) ----
    h('div', { style: { width: W, height: H - BOLD_TOP - BOLD_BAR, display: 'flex' } }),
    // ---- CTA bar ----
    h(
      'div',
      {
        style: {
          width: W, height: BOLD_BAR, backgroundColor: INK, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 60px',
        },
      },
      h('div', {
        style: {
          fontFamily: 'Inter', fontWeight: 800, fontSize: 40, lineHeight: 1.2,
          color: CREAM, textTransform: 'uppercase', textAlign: 'center', letterSpacing: 0.5,
        },
      }, subtitle),
      h('div', {
        style: {
          fontFamily: 'Inter', fontWeight: 600, fontSize: 23, letterSpacing: 4,
          color: CLAY, textTransform: 'uppercase', marginTop: 16,
        },
      }, 'theyogasensei.com'),
    ),
  )
}

// 20/60/20 layout per Marvin's pin spec. The hook's subtitle field is the
// concrete CTA ("See the 5 picks"), not a description — keep it short.
function StructuredLayout(eyebrow: string, title: string, cta: string, titleSize: number) {
  return h(
    'div',
    { style: { width: W, height: H, display: 'flex', flexDirection: 'column', fontFamily: 'Inter' } },
    // ---- top 20%: search-focused headline on a high-contrast block ----
    h(
      'div',
      {
        style: {
          width: W, height: STRUCT_TOP, backgroundColor: INK, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', padding: '0 64px',
        },
      },
      eyebrow
        ? h(
            'div',
            { style: { display: 'flex', alignItems: 'center', marginBottom: 14 } },
            h('div', { style: { width: 10, height: 10, borderRadius: 10, backgroundColor: CLAY, marginRight: 14 } }),
            h('div', { style: { fontFamily: 'Inter', fontWeight: 600, fontSize: 22, letterSpacing: 5, color: CREAM, textTransform: 'uppercase' } }, eyebrow),
          )
        : null,
      h('div', { style: { fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: titleSize, lineHeight: 1.02, color: CREAM } }, title),
    ),
    // ---- middle 60%: photo window (composited photo shows through) ----
    h('div', { style: { width: W, height: H - STRUCT_TOP - STRUCT_BAR, display: 'flex' } }),
    // ---- bottom 20%: concrete CTA + small branding ----
    h(
      'div',
      {
        style: {
          width: W, height: STRUCT_BAR, backgroundColor: INK, display: 'flex',
          flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 60px',
        },
      },
      h('div', {
        style: {
          backgroundColor: CLAY, color: CREAM, fontFamily: 'Inter', fontWeight: 700,
          fontSize: 34, lineHeight: 1.0, textTransform: 'uppercase', letterSpacing: 2,
          padding: '24px 46px 26px 46px', borderRadius: 6,
        },
      }, cta),
      h(
        'div',
        { style: { display: 'flex', alignItems: 'center', marginTop: 30 } },
        h('div', { style: { fontFamily: 'Inter', fontWeight: 600, fontSize: 22, letterSpacing: 4, color: 'rgba(250,246,239,0.85)', textTransform: 'uppercase' } }, 'theyogasensei.com'),
        h('div', { style: { fontFamily: 'Noto Serif JP', fontWeight: 600, fontSize: 24, color: 'rgba(250,246,239,0.55)', marginLeft: 28 } }, BRAND_MARK),
      ),
    ),
  )
}

function PinLayout(eyebrow: string, title: string, subtitle: string, titleSize: number, style: PinStyle = 'default') {
  if (style === 'bold') return BoldLayout(eyebrow, title, subtitle, titleSize)
  if (style === 'structured') return StructuredLayout(eyebrow, title, subtitle, titleSize)
  const accent = style === 'darkred' ? RED : CLAY
  return h(
    'div',
    { style: { width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', fontFamily: 'Inter' } },
    h('div', {
      style: {
        position: 'absolute', top: 0, left: 0, width: W, height: H,
        background: SCRIM[style],
      },
    }),
    h(
      'div',
      { style: { position: 'absolute', top: 72, left: 80, display: 'flex', alignItems: 'center' } },
      h('div', { style: { width: 11, height: 11, borderRadius: 11, backgroundColor: accent, marginRight: 16 } }),
      h('div', { style: { fontFamily: 'Inter', fontWeight: 600, fontSize: 24, letterSpacing: 6, color: CREAM, textTransform: 'uppercase' } }, eyebrow),
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', padding: '0 80px 94px 80px' } },
      h('div', { style: { width: 72, height: 4, backgroundColor: accent, marginBottom: 34 } }),
      h('div', { style: { fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: titleSize, lineHeight: 1.04, color: CREAM } }, title),
      subtitle
        ? h('div', { style: { fontFamily: 'Inter', fontWeight: 500, fontSize: 30, lineHeight: 1.35, color: 'rgba(250,246,239,0.88)', marginTop: 28, maxWidth: 770 } }, subtitle)
        : null,
      h(
        'div',
        { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 56 } },
        h('div', { style: { fontFamily: 'Inter', fontWeight: 600, fontSize: 22, letterSpacing: 4, color: 'rgba(250,246,239,0.92)', textTransform: 'uppercase' } }, 'theyogasensei.com'),
        h('div', { style: { fontFamily: 'Noto Serif JP', fontWeight: 600, fontSize: 30, color: 'rgba(250,246,239,0.80)' } }, BRAND_MARK),
      ),
    ),
  )
}

async function renderPin(image: string, hook: Hook, out: string, style: PinStyle = 'default') {
  const [eyebrow, title, subtitle, titleSize] = hook
  const size = titleSize ?? (style === 'bold' ? 104 : style === 'structured' ? 68 : 86)
  const svg = await satori(PinLayout(eyebrow, title, subtitle, size, style) as any, { width: W, height: H, fonts, embedFont: true })
  const overlay = await sharp(Buffer.from(svg)).png().toBuffer()

  if (style === 'bold' || style === 'structured') {
    // Photo fills only the window between the headline block and the CTA bar,
    // so nothing interesting is hidden behind the opaque panels.
    const top = style === 'bold' ? BOLD_TOP : STRUCT_TOP
    const bar = style === 'bold' ? BOLD_BAR : STRUCT_BAR
    const windowH = H - top - bar
    const photo = await sharp(resolve(ROOT, image))
      .resize(W, windowH, { fit: 'cover', position: 'centre' })
      .toBuffer()
    await sharp({ create: { width: W, height: H, channels: 4, background: INK } })
      .composite([{ input: photo, top, left: 0 }, { input: overlay }])
      .png()
      .toFile(out)
    return
  }

  const bg = await sharp(resolve(ROOT, image)).resize(W, H, { fit: 'cover', position: 'centre' }).toBuffer()
  await sharp(bg).composite([{ input: overlay }]).png().toFile(out)
}

// Pick 5 backgrounds for a guide: local photos (hero/contextual/pin) for angles
// 1,2,3,5; a rotating Aiko photo for the aesthetic angle (4); brand fillers if short.
function imagesFor(slug: string, idx: number): string[] {
  const dir = `public/images/guides/${slug}`
  const abs = resolve(ROOT, dir)
  let locals: string[] = []
  if (existsSync(abs)) {
    const files = readdirSync(abs).filter((f) => f.endsWith('.webp'))
    // order: hero, contextual (anything not hero/pin), pin
    const hero = files.filter((f) => f === 'hero.webp')
    const pin = files.filter((f) => f === 'pin.webp')
    const ctx = files.filter((f) => f !== 'hero.webp' && f !== 'pin.webp')
    locals = [...hero, ...ctx, ...pin].map((f) => `${dir}/${f}`)
  }
  const aiko = AIKO_POOL[idx % AIKO_POOL.length]
  const fillers = [...locals, ...BRAND_POOL]
  const pick = (i: number) => fillers[i % fillers.length]
  // angles: 1 list, 2 problem, 3 comparison, 4 aesthetic(Aiko), 5 checklist
  return [pick(0), pick(1), pick(2), aiko, pick(3)]
}

// ---- GUIDE CONFIG (hooks hand-tuned from each guide's real frontmatter) ----
const GUIDES: Guide[] = [
  {
    slug: 'how-to-choose-a-yoga-mat',
    hashtags: '#yogamat #howtochooseayogamat #yogaforbeginners #yogatips',
    desc: 'A clear, honest guide to choosing a yoga mat by thickness, material, grip, durability and care, based on practice and careful research.',
    hooks: [
      ['Buying Guide', 'How to Choose a Yoga Mat, Without the Hype', 'Thickness, material, grip and care, explained plainly.', 78],
      ['Common Problem', 'Buying the Wrong Mat Is Easy. Here Is How to Avoid It', 'The five things that actually decide a good mat.', 72],
      ['At a Glance', 'Thickness, Material, Grip: What Actually Matters', 'A simple way to compare any yoga mat.', 80],
      ['The Yoga Sensei', 'The Only Yoga Mat Guide You Need', '', 88],
      ['Before You Buy', '5 Questions to Ask Before You Buy a Yoga Mat', 'Save money. Skip the regret.', 74],
    ],
  },
  {
    slug: 'best-yoga-mats-2026',
    hashtags: '#yogamat #yogagear #yogaforbeginners #yogapractice',
    desc: 'An honest 2026 yoga mat guide comparing seven standout picks by material, grip, cushion and trade-offs, without fake lab-testing claims.',
    hooks: [
      ['Gear Guide · 2026', 'The Honest Yoga Mat Guide for 2026', 'Real picks for every body and budget, and when not to buy.', 86],
      ['Buying Guide', 'Wobbly, Slippy, or Too Thin?', 'How to pick a yoga mat that lasts years, not months.', 92],
      ['Mat Comparison', 'Thick vs Thin: Which Mat Suits You?', 'A simple guide to thickness, grip and material.', 80],
      ['The Yoga Sensei', 'The Only Yoga Mat Guide You Need', '', 88],
      ['Before You Buy', '5 Things to Check Before You Buy a Yoga Mat', 'Save money. Skip the regret.', 74],
    ],
  },
  {
    slug: 'how-thick-should-a-yoga-mat-be',
    hashtags: '#yogamat #yogaforbeginners #yogatips #yogagear',
    desc: 'How thick should a yoga mat be? Compare 3mm, 5mm, 6mm, 8mm and 10mm mats by practice style, floor type, joint comfort and stability.',
    hooks: [
      ['Quick Guide', 'How Thick Should a Yoga Mat Be?', 'From 3mm to 10mm, and who each one is for.', 84],
      ['Common Problem', 'Sore Knees or No Balance? It Might Be the Thickness', 'The cushion-versus-stability trade-off, explained.', 72],
      ['At a Glance', '3mm vs 5mm vs 6mm vs 10mm', 'Pick the right thickness for how you practise.', 86],
      ['The Yoga Sensei', 'The Right Mat Thickness for Your Practice', '', 84],
      ['Before You Buy', 'The Thickness Mistake Most Beginners Make', 'More cushion is not always better.', 76],
    ],
  },
  {
    slug: 'best-yoga-mat-for-bad-knees',
    hashtags: '#yogaforbeginners #kneepain #yogamat #gentleyoga',
    desc: 'The best yoga mats for bad knees balance cushion and stability. Three honest picks, the real thickness trade-off, and cheaper fixes to try first.',
    hooks: [
      ['Gear Guide', 'Best Yoga Mats for Bad Knees', 'Cushion without the wobble. Three honest picks.', 84],
      ['Common Problem', 'Knees Hurt in Yoga? Start With the Mat', 'Cushion, stability and cheaper fixes to try first.', 76],
      ['At a Glance', 'Cushion vs Stability for Sensitive Knees', 'How to get both without the sink-in feeling.', 80],
      ['The Yoga Sensei', 'A Kinder Mat for Sensitive Knees', '', 86],
      ['Before You Buy', 'Try This Before You Buy a Thicker Mat', 'The cheap fix for sore knees most people miss.', 74],
    ],
  },
  {
    slug: 'best-yoga-mat-for-hot-yoga',
    hashtags: '#hotyoga #yogamat #yogagear #yogapractice',
    desc: 'Choose the best yoga mat for hot yoga by wet grip, sweat handling, material, thickness and towel pairing, without fake testing claims or fixed prices.',
    hooks: [
      ['Gear Guide', 'Best Yoga Mat for Hot Yoga', 'Grip that survives the sweat.', 90],
      ['Common Problem', 'Sliding Around in Hot Yoga?', 'Wet grip, sweat handling and the towel question.', 84],
      ['At a Glance', 'What Makes a Mat Grip When You Sweat', 'Material, texture and the right towel pairing.', 78],
      ['The Yoga Sensei', 'A Mat That Holds Up to the Heat', '', 86],
      ['Before You Buy', 'The Hot Yoga Grip Fix You Already Own', 'Why a towel beats a pricier mat, sometimes.', 74],
    ],
  },
  {
    slug: 'best-non-slip-yoga-mat',
    style: 'structured',
    hashtags: '#yogamat #nonslip #yogagear #yogaforbeginners',
    desc: 'Compare the best non-slip yoga mats by surface type — polyurethane, natural rubber and budget foam — plus the free fixes that make the mat you already own grippier.',
    // structured style: subtitle field = concrete CTA, not a description
    hooks: [
      ['Gear Guide', 'The 5 Best Non-Slip Yoga Mats', 'See the 5 picks', 66],
      ['Common Problem', 'Slipping in Downward Dog?', 'Read what actually grips', 68],
      ['At a Glance', 'PU vs Rubber vs Foam: Which Grips Best?', 'See the comparison', 60],
      ['The Yoga Sensei', 'A Mat That Holds Every Pose', 'Read the guide', 68],
      ['Before You Buy', '5 Free Fixes for a Slippery Yoga Mat', 'Get the fixes', 62],
    ],
  },
  {
    slug: 'best-yoga-mat-towel',
    style: 'structured',
    hashtags: '#yogamattowel #hotyoga #yogatowel #yogagear',
    desc: 'A yoga mat towel fixes one kind of slipping and makes another worse. How to tell which problem you have, when to skip the towel, and four honest picks.',
    // structured style: subtitle field = concrete CTA, not a description
    hooks: [
      ['Gear Guide', 'The 4 Best Yoga Mat Towels', 'See the 4 picks', 66],
      ['Common Problem', 'Sweaty Mat or Sweaty Hands?', 'Find your fix', 66],
      ['At a Glance', 'Nubbed vs Smooth Yoga Towels', 'See the comparison', 62],
      ['The Yoga Sensei', 'The Towel Question, Answered', 'Read the guide', 64],
      ['Before You Buy', 'When to Skip the Yoga Towel', 'Read this first', 64],
    ],
  },
  {
    slug: 'how-to-clean-lululemon-yoga-mat',
    style: 'structured',
    hashtags: '#lululemon #yogamat #matcare #yogagear',
    desc: 'How to clean a Lululemon yoga mat: the damp-cloth routine, a safe deep clean, and what should never touch the rubber — from someone who cleans this exact mat.',
    // structured style: subtitle field = concrete CTA, not a description
    hooks: [
      ['Care Guide', 'How to Clean a Lululemon Yoga Mat', 'See the routine', 58],
      ['Common Problem', 'Slippery Lululemon Mat?', 'Read the fix', 68],
      ['At a Glance', 'What Never Touches This Mat', 'See the list', 64],
      ['The Yoga Sensei', 'Care for the Mat You Splurged On', 'Read the guide', 62],
      ['Before You Clean', 'Skip the Vinegar on This Mat', 'Read why first', 64],
    ],
  },
  {
    slug: 'cork-vs-rubber-yoga-mat',
    hashtags: '#corkyogamat #ecoyoga #yogamat #yogagear',
    desc: 'Cork vs rubber yoga mat, compared honestly on grip, cushion, weight, care, eco and latex risk, with a clear pick for sweaty, dry and latex-sensitive practice.',
    hooks: [
      ['Comparison', 'Cork vs Rubber Yoga Mat', 'Which one actually fits your practice?', 92],
      ['Which One?', 'Sweaty Hands or Dry? That Changes the Answer', 'Cork, rubber and the latex question.', 76],
      ['At a Glance', 'Cork vs Rubber: Grip, Weight, Care, Eco', 'The honest trade-offs, side by side.', 78],
      ['The Yoga Sensei', 'Cork or Rubber? A Calm, Clear Answer', '', 86],
      ['Quick Tip', 'Latex-Sensitive? Read This First', 'One reason rubber might not be for you.', 78],
    ],
  },
  {
    slug: 'eco-friendly-yoga-mat',
    hashtags: '#ecoyoga #sustainableyoga #yogamat #ecofriendly',
    desc: 'Choose an eco-friendly yoga mat by material, grip, latex risk and care needs, with five honest picks and no fake testing claims.',
    hooks: [
      ['Gear Guide', 'Best Eco-Friendly Yoga Mats', 'Five honest picks, and the real material trade-offs.', 84],
      ['Common Problem', '"Eco" on the Label Does Not Always Mean Greener', 'How to read past the marketing.', 72],
      ['At a Glance', 'Cork, Rubber, Jute, TPE: The Eco Trade-Offs', 'Grip, care and latex risk compared.', 76],
      ['The Yoga Sensei', 'A Greener Mat, Honestly Chosen', '', 86],
      ['Before You Buy', 'The Greenest Mat Is the One You Keep', 'Why durability beats the eco label.', 74],
    ],
  },
  {
    slug: 'best-yoga-blocks',
    hashtags: '#yogablocks #yogaprops #yogagear #yogaforbeginners',
    desc: 'Choosing yoga blocks? Foam vs cork compared, with three honest picks for support, balance and budget, researched from specs and real reviews.',
    hooks: [
      ['Gear Guide', 'Best Yoga Blocks: Foam vs Cork', 'Three honest picks for support, balance and budget.', 84],
      ['Common Problem', 'Cannot Reach the Floor? A Block Fixes That', 'How blocks make poses work for your body.', 76],
      ['At a Glance', 'Foam vs Cork Yoga Blocks', 'Weight, grip and firmness, compared.', 86],
      ['The Yoga Sensei', 'The Quiet Prop That Changes Everything', '', 84],
      ['Before You Buy', 'Do You Need One Block or Two?', 'And which size is right for you.', 76],
    ],
  },
  {
    slug: 'best-yoga-bolster',
    hashtags: '#yogabolster #restorativeyoga #yinyoga #yogaprops',
    desc: 'Choosing a yoga bolster? Rectangular vs round, fill and firmness explained, with two honest picks for restorative practice.',
    hooks: [
      ['Gear Guide', 'Best Yoga Bolsters', 'Shapes, fills and two honest picks.', 90],
      ['Common Problem', 'Restorative Yoga Feels Better With a Bolster', 'How the right shape supports real rest.', 76],
      ['At a Glance', 'Rectangular vs Round Bolster', 'Which shape suits your practice.', 82],
      ['The Yoga Sensei', 'The Prop That Makes Rest Easier', '', 86],
      ['Before You Buy', 'Firm or Soft? Pick the Right Fill', 'The choice that decides how it feels.', 76],
    ],
  },
  {
    slug: 'best-yoga-mat-bag',
    hashtags: '#yogabag #yogagear #yogaaccessories #yogalife',
    desc: 'Choosing a yoga mat bag or carrier? Bag vs sling vs carrier, how to check your mat actually fits, and two honest picks, with no hype.',
    hooks: [
      ['Gear Guide', 'Best Yoga Mat Bags and Carriers', 'A practical guide, and two honest picks.', 82],
      ['Common Problem', 'Will Your Mat Actually Fit the Bag?', 'How to check before you buy.', 80],
      ['At a Glance', 'Bag vs Sling vs Carrier', 'Which one fits how you travel to class.', 84],
      ['The Yoga Sensei', 'Carry Your Mat Without the Faff', '', 86],
      ['Before You Buy', 'You Might Not Need a Bag at All', 'When a simple sling does the job.', 76],
    ],
  },
  {
    slug: 'how-to-clean-a-yoga-mat',
    hashtags: '#yogamat #yogatips #yogacare #cleanyogamat',
    desc: 'Clean your yoga mat without damaging it: daily wipe-downs, deep cleans, DIY sprays, and material-specific care for rubber, PVC, cork and TPE.',
    hooks: [
      ['Care Guide', 'How to Clean a Yoga Mat', 'Without damaging it. A simple routine.', 88],
      ['Common Problem', 'Smelly or Slippery Mat? Here Is the Fix', 'Daily wipe-downs and the right deep clean.', 76],
      ['Quick Guide', 'The DIY Mat Spray That Actually Works', 'And the cleaners that quietly ruin mats.', 78],
      ['The Yoga Sensei', 'Keep Your Mat Fresh, the Gentle Way', '', 86],
      ['Avoid This', 'The Cleaning Mistake That Wrecks Mats', 'What not to use on rubber, cork and TPE.', 76],
    ],
  },
  {
    slug: 'how-to-store-a-yoga-mat',
    hashtags: '#yogamat #yogatips #yogastorage #yogalife',
    desc: 'How to store a yoga mat so it lasts: clean and dry it first, roll it practice-side in, keep it out of sun and damp, and skip the gear you do not need.',
    hooks: [
      ['Care Guide', 'How to Store a Yoga Mat So It Lasts', 'Roll it right, keep it fresh.', 84],
      ['Common Problem', 'Curling Corners and Musty Smells?', 'The storage habits that cause both.', 78],
      ['Quick Guide', 'Roll It Practice-Side In, and Three More Tips', 'Small habits that add years to a mat.', 76],
      ['The Yoga Sensei', 'A Mat That Lasts Starts With Storage', '', 86],
      ['Avoid This', 'Sun and Damp Are Quietly Killing Your Mat', 'Where not to keep it.', 78],
    ],
  },
  {
    slug: 'lululemon-yoga-mat',
    hashtags: '#lululemon #yogamat #yogagear #yogareview',
    desc: 'An honest Lululemon yoga mat review: the grip that tops the lists, the 5mm cushion, the real downsides of weight, stains and latex, and who should skip it.',
    hooks: [
      ['Honest Review', 'Lululemon Yoga Mat: Worth It?', 'The grip, the 5mm cushion, and the catches.', 84],
      ['Worth It?', 'Everyone Loves the Grip. Here Is the Catch', 'Weight, stains and latex, honestly.', 76],
      ['Pros & Cons', 'The Lululemon Mat, Honestly', 'What it nails, and what it does not.', 84],
      ['The Yoga Sensei', 'Is the Lululemon Mat Right for You?', '', 86],
      ['Who Should Skip', 'Three Reasons to Skip This Mat', 'It is not the right pick for everyone.', 76],
    ],
  },
  {
    slug: 'retrospec-solana-yoga-mat',
    hashtags: '#retrospecsolana #yogamat #thickyogamat #yogareview',
    desc: 'An honest Retrospec Solana yoga mat review: why the thick NBR foam is brilliant for sore knees and floor work, where the squish costs you in balance, and who should skip it.',
    hooks: [
      ['Honest Review', 'Retrospec Solana: Cushion vs Stability', 'Brilliant for sore knees, wobbly for balance.', 80],
      ['Common Problem', 'Sore Knees on a Thin Mat?', 'Why thick foam helps, and where it does not.', 78],
      ['At a Glance', 'Half Inch vs One Inch: Which Solana?', 'Cushion, balance and what each is for.', 80],
      ['The Yoga Sensei', 'Is the Retrospec Solana Right for You?', '', 84],
      ['Who Should Skip', 'Three Reasons to Skip This Budget Mat', 'Hot yoga, balance, and one label to check.', 74],
    ],
  },
  {
    slug: 'manduka-yoga-mat',
    hashtags: '#manduka #yogamat #yogagear #yogareview',
    desc: 'An honest Manduka yoga mat review: why the PRO earns its lifetime-guarantee reputation, the break-in catch nobody warns you about, and how the eKO, GRP and PROlite compare so you pick the right one.',
    hooks: [
      ['Honest Review', 'Manduka: Which Mat Is Right for You?', 'PRO vs eKO vs GRP, decoded honestly.', 82],
      ['Common Problem', 'Bought the Famous Manduka? It Might Be Wrong', 'The PRO is not the right pick for everyone.', 74],
      ['At a Glance', 'Manduka PRO vs eKO vs GRP', 'Durability, eco, or hot-yoga grip — pick one.', 84],
      ['The Yoga Sensei', 'The Lifetime Mat, Honestly Reviewed', '', 86],
      ['Before You Buy', 'The Manduka Break-In Nobody Warns You About', 'Why a new PRO feels slippery, and what helps.', 74],
    ],
  },
  {
    slug: 'gaiam-yoga-mat',
    hashtags: '#gaiam #yogamat #yogaforbeginners #budgetyoga',
    desc: 'An honest Gaiam yoga mat review: why the cushioned, stylish Premium 6mm is one of the best budget beginner mats, where it falls short — sweat, length and the initial smell — and who should skip it.',
    hooks: [
      ['Honest Review', 'Gaiam Yoga Mat: Best Budget Beginner Mat?', 'Real cushion, low price, a few catches.', 78],
      ['Common Problem', 'New to Yoga and Overwhelmed by Mats?', 'Why the cushioned Gaiam is an easy first pick.', 76],
      ['At a Glance', 'Is the Gaiam Premium Worth It?', 'Cushion, style and price vs the compromises.', 82],
      ['The Yoga Sensei', 'The Best First Yoga Mat on a Budget?', '', 84],
      ['Who Should Skip', 'Three Reasons the Gaiam Is Not for You', 'Hot yoga, tall frames, and the initial smell.', 76],
    ],
  },
  {
    slug: 'manduka-vs-lululemon-yoga-mat',
    hashtags: '#manduka #lululemon #yogamat #yogareview',
    desc: 'Manduka PRO vs the Lululemon Reversible Mat, compared honestly: grip out of the box, the latex difference, durability, staining and price — and a clear pick for each kind of practitioner.',
    hooks: [
      ['Comparison', 'Manduka vs Lululemon: Which Mat Wins?', 'Grip, latex, durability and price, honestly.', 80],
      ['Which One?', 'Grip Now or a Mat for Life?', 'The real difference between Manduka and Lululemon.', 76],
      ['At a Glance', 'Manduka PRO vs Lululemon The Mat', 'Latex, break-in, staining and lifespan compared.', 80],
      ['The Yoga Sensei', 'Manduka or Lululemon? A Clear Answer', '', 86],
      ['Quick Tip', 'Latex-Sensitive? This Decides It Instantly', 'One mat is latex-free, the other is not.', 78],
    ],
  },
  {
    slug: 'jade-yoga-mat',
    hashtags: '#jadeyoga #yogamat #ecoyoga #yogareview',
    desc: 'An honest Jade Harmony yoga mat review: the grippiest natural-rubber eco mat, made in the USA with a tree planted per mat — plus the wet-grip and latex caveats, and who should skip it.',
    hooks: [
      ['Honest Review', 'Jade Harmony: The Grippiest Eco Mat?', 'Best-in-class dry grip, with one real catch.', 80],
      ['Common Problem', 'Sliding Around on Your Mat?', 'Why natural-rubber grip fixes it — and when it does not.', 74],
      ['At a Glance', 'Jade Harmony: Grip, Eco, Latex', 'What the teacher-favourite gets right and wrong.', 82],
      ['The Yoga Sensei', 'Is the Jade Harmony Right for You?', '', 84],
      ['Quick Tip', 'Love the Grip? Avoid It for Hot Yoga', 'Open-cell rubber drinks sweat and turns slick.', 76],
    ],
  },
  // Chair-yoga cluster. These pages have a single on-brand portrait photo each
  // (pin.webp), so bg pins all five angles to it — same calm background, five
  // hooks. Copy is 12-year-old readable, honest, "educational not medical".
  {
    slug: 'chair-yoga-for-seniors',
    hashtags: '#chairyoga #chairyogaforseniors #gentleyoga #yogaforseniors #seniorfitness',
    desc: 'Chair yoga for seniors, explained simply: a safety-first setup, twelve gentle seated poses, a 10-minute routine, and honest guidance. Educational, not medical advice.',
    bg: Array(5).fill('public/images/guides/chair-yoga-for-seniors/pin.webp'),
    hooks: [
      ['Chair Yoga', 'Chair Yoga for Seniors: 12 Gentle Poses', 'A safe, seated way to move more — no floor needed.', 74],
      ['Gentle Movement', 'Hard to Get Down to the Floor?', 'Chair yoga keeps you moving, safely seated.', 80],
      ['At a Glance', 'A Safe 10-Minute Chair Yoga Routine', 'Twelve gentle poses, in a calm order.', 80],
      ['The Yoga Sensei', 'A Kinder Way to Move', '', 88],
      ['Before You Start', 'Chair Yoga Safety, the Honest Way', 'When to take it easy, and when to ask your doctor.', 74],
    ],
  },
  {
    slug: 'chair-yoga-for-beginners',
    hashtags: '#chairyoga #chairyogaforbeginners #beginneryoga #gentleyoga #accessibleyoga',
    desc: 'Chair yoga for beginners, explained simply: what it is, six easy starter poses, a 5-minute routine, and what to expect. Educational, not medical advice.',
    bg: Array(5).fill('public/images/guides/chair-yoga-for-beginners/pin.webp'),
    hooks: [
      ['Beginner Guide', 'Chair Yoga for Beginners: 6 Easy Poses', 'Start seated, keep it small, build from there.', 76],
      ['New to Yoga?', 'Floor Classes Feel Too Hard?', 'Chair yoga is the easiest way to begin.', 82],
      ['At a Glance', 'A Simple 5-Minute Chair Yoga Routine', 'Six gentle poses to link together.', 80],
      ['The Yoga Sensei', 'An Easy Way to Start Yoga', '', 88],
      ['Before You Start', '5 Beginner Chair Yoga Mistakes to Avoid', 'Small and gentle beats big and forced.', 74],
    ],
  },
  {
    slug: 'free-chair-yoga-for-seniors',
    hashtags: '#chairyoga #freeyoga #chairyogaforseniors #yogaforseniors #gentleyoga',
    desc: 'Free chair yoga for seniors: a short routine you can do at home today, plus where to find free classes and safe video routines. Educational, not medical advice.',
    bg: Array(5).fill('public/images/guides/free-chair-yoga-for-seniors/pin.webp'),
    hooks: [
      ['Free at Home', 'Free Chair Yoga for Seniors', 'A short routine you can do today — no class needed.', 78],
      ['No Budget?', 'Chair Yoga Costs Nothing to Start', 'All you need is a sturdy chair you already own.', 78],
      ['Where to Look', 'Where to Find Free Chair Yoga', 'Libraries, community centres and safe videos.', 80],
      ['The Yoga Sensei', 'Gentle Movement, Free', '', 88],
      ['Stay Safe', 'How to Pick a Safe Free Routine', 'What a good instructor always shows you.', 74],
    ],
  },
  {
    slug: 'printable-chair-yoga-for-seniors',
    hashtags: '#chairyoga #printableyoga #chairyogaforseniors #yogaforseniors #gentleyoga',
    desc: 'A printable chair yoga routine for seniors: a simple, large-step chart you can print and keep by the chair. Free to use. Educational, not medical advice.',
    bg: Array(5).fill('public/images/guides/printable-chair-yoga-for-seniors/pin.webp'),
    hooks: [
      ['Printable Chart', 'Printable Chair Yoga for Seniors', 'A simple chart to print and keep by the chair.', 76],
      ['Easy to Follow', 'Hard to Remember the Poses?', 'A large-step printed chart keeps it simple.', 80],
      ['At a Glance', 'The Whole Routine on One Page', 'Clear steps, big text, easy to follow.', 82],
      ['The Yoga Sensei', 'Keep the Routine Within Reach', '', 88],
      ['How to Use It', 'Print It, Keep It by the Chair', 'A few tips to get the most from the chart.', 76],
    ],
  },
  // Mindful Living board — pose page (route /poses/, calm Aiko imagery, no guide folder).
  {
    slug: 'childs-pose',
    route: 'poses',
    hashtags: '#childspose #balasana #restorativeyoga #yogaforbeginners #mindfulliving',
    desc: "Child's Pose (Balasana), explained calmly: how to rest into it, the common mistakes like forcing the hips down or holding the breath, the props that make it comfortable, and who should take it easy.",
    bg: [
      'public/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
      'public/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
      'public/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
      'public/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp',
      'public/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
    ],
    hooks: [
      ['Mindful Living', "Child's Pose: How to Truly Rest", 'The calming shape you can return to any time.', 82],
      ['Common Problem', "Can't Sit Back on Your Heels?", 'Tight hips are normal. Let a prop bring the floor up.', 76],
      ['How To', "Child's Pose, Step by Step", 'Beginner cues, common mistakes, and the right props.', 84],
      ['The Yoga Sensei', 'A Calmer Way to Pause', '', 88],
      ['Take It Easy', "When to Skip Child's Pose", 'Knee injury and late pregnancy: gentler options.', 78],
    ],
  },
  // Yoga-for-beginners cluster — Sun Salutation A/B/C (pose pages) + morning routine (guide).
  // Each has a single on-brand portrait pin.webp, so bg fills all five angles to it.
  {
    slug: 'sun-salutation',
    route: 'poses',
    hashtags: '#sunsalutation #suryanamaskar #yogaforbeginners #morningyoga #yogaflow',
    desc: 'Sun Salutation A in twelve steps — beginner cues, the breath count, the common mistakes, and easy modifications. The calm, no-hype walkthrough of Surya Namaskar A.',
    bg: Array(5).fill('public/images/poses/sun-salutation/pin.webp'),
    hooks: [
      ['How To', 'Sun Salutation A: All 12 Steps for Beginners', 'The breath, the order, and the common mistakes.', 72],
      ['New to It?', 'Lost in Your First Sun Salutation?', 'One breath, one move — the calm way to learn it.', 80],
      ['At a Glance', 'Sun Salutation A, Step by Step', 'The 12-pose flow at the heart of every class.', 82],
      ['The Yoga Sensei', 'Begin the Day With Sun Salutation', '', 88],
      ['Before You Flow', 'Sun Salutation: 5 Beginner Mistakes to Avoid', 'Slow the breath, bend the knees, skip the rush.', 72],
    ],
  },
  {
    slug: 'sun-salutation-b',
    route: 'poses',
    hashtags: '#sunsalutationb #suryanamaskar #vinyasa #yogaforbeginners #yogaflow',
    desc: 'Sun Salutation B (Surya Namaskar B), step by step — the full sequence with Sanskrit names and breath cues, how it differs from A, common mistakes, and modifications.',
    bg: Array(5).fill('public/images/poses/sun-salutation-b/pin.webp'),
    hooks: [
      ['How To', 'Sun Salutation B: The Full 17-Step Flow', 'Chair Pose, Warrior I, and the breath that links them.', 70],
      ['Ready for More?', 'Mastered Sun Salutation A?', 'Sun Salutation B is the stronger next step.', 82],
      ['At a Glance', 'Sun Salutation A vs B', 'What B adds, and when to move up.', 88],
      ['The Yoga Sensei', 'A Stronger Sun Salutation', '', 88],
      ['Watch For', 'Sun Salutation B: 5 Common Mistakes', 'Knees down, breath slow, Warrior I steady.', 72],
    ],
  },
  {
    slug: 'sun-salutation-c',
    route: 'poses',
    hashtags: '#sunsalutationc #suryanamaskar #yogaforbeginners #gentleyoga #vinyasa',
    desc: 'Sun Salutation C (Surya Namaskar C), step by step — the gentler salutation with low lunges and Cobra, how it differs from A and B, and beginner modifications.',
    bg: Array(5).fill('public/images/poses/sun-salutation-c/pin.webp'),
    hooks: [
      ['How To', 'Sun Salutation C: A Gentler Flow', 'Low lunges and Cobra instead of Chaturanga.', 78],
      ['Sore Wrists?', 'A Sun Salutation Kinder on the Wrists', 'Sun Salutation C skips the hard push-ups.', 78],
      ['At a Glance', 'Sun Salutation A, B and C', 'How the three flows differ — and which to pick.', 82],
      ['The Yoga Sensei', 'A Calm, Grounding Sun Salutation', '', 88],
      ['Good to Know', 'Sun Salutation C, Step by Step', 'The gentle salutation, explained simply.', 80],
    ],
  },
  {
    slug: 'morning-yoga-routine',
    hashtags: '#morningyoga #yogaforbeginners #morningroutine #yogaflow #yogaposes',
    desc: 'A gentle 10-minute morning yoga routine for beginners — eight simple poses to wake up your body, with 5, 15 and 30-minute options. No experience needed.',
    bg: Array(5).fill('public/images/guides/morning-yoga-routine/pin.webp'),
    hooks: [
      ['Morning Routine', 'A Gentle 10-Minute Morning Yoga Routine', 'Eight simple poses to wake up the body.', 74],
      ['New to Yoga?', 'Start Your Day With 10 Minutes of Yoga', 'A calm, beginner-friendly morning flow.', 78],
      ['At a Glance', '5, 15 or 30 Minutes of Morning Yoga', 'The same gentle flow, any length you like.', 80],
      ['The Yoga Sensei', 'Wake Up With Gentle Yoga', '', 88],
      ['Make It Stick', 'How to Build a Morning Yoga Habit', 'Small, daily, and easy to keep up.', 76],
    ],
  },
  // Lead-magnet landing page — the free Starter Guide. Offer pin → /starter-guide
  // opt-in (captures an email) rather than a content page. Full URL override.
  {
    slug: 'starter-guide',
    url: 'https://www.theyogasensei.com/starter-guide',
    hashtags: '#yogaforbeginners #beginneryoga #freeyoga #yogatips #yogaposes',
    desc: 'Get the free Yoga for Beginners Starter Guide: the gear worth buying, eight foundational poses, and a 10-minute morning routine. Calm, honest, no fluff.',
    bg: [
      'public/images/aiko-persona/aiko-rolling-out-sage-yoga-mat.webp',
      'public/images/brand/topic-beginner-yoga.webp',
      'public/images/aiko-persona/aiko-meditation-back-view-sage-yoga-mat.webp',
      'public/images/aiko-persona/aiko-childs-pose-sage-yoga-mat.webp',
      'public/images/aiko-persona/aiko-seated-twist-yoga-pose.webp',
    ],
    hooks: [
      ['Free PDF Guide', 'The Free Yoga for Beginners Starter Guide', 'Gear, eight poses, and a 10-minute morning routine.', 74],
      ['New to Yoga?', 'Starting Yoga Feels Like a Lot. It Does Not Have To.', 'One free guide: what to buy, what to do, where to begin.', 74],
      ['What Is Inside', 'Everything a Beginner Needs, in One Free Guide', 'The gear, the poses, the morning routine.', 76],
      ['The Yoga Sensei', 'Start Yoga, the Calm Way', '', 92],
      ['Free Download', '8 Poses, 1 Routine, the Right Gear', 'Grab the free beginner starter guide.', 80],
    ],
  },
  // Money page — Best Yoga Mats review (/reviews/best-yoga-mats). A/B COLOUR TEST:
  // rendered in the 'darkred' charcoal+red variant to compare engagement vs the olive pins.
  {
    slug: 'best-yoga-mats',
    url: 'https://www.theyogasensei.com/reviews/best-yoga-mats',
    style: 'darkred',
    hashtags: '#yogamat #bestyogamats #yogagear #yogaforbeginners #yogaessentials',
    desc: 'An honest 2026 yoga mat guide comparing seven standout picks by material, grip, cushion and trade-offs, without fake lab-testing claims — from budget to buy-it-for-life.',
    bg: [
      'public/images/brand/best-mats-charcoal.webp',
      'public/images/brand/best-mats-charcoal.webp',
      'public/images/brand/best-mats-warm.webp',
      'public/images/brand/best-mats-warm.webp',
      'public/images/brand/best-mats-charcoal.webp',
    ],
    hooks: [
      ['Gear Guide · 2026', 'The Honest Yoga Mat Guide for 2026', 'Seven picks for every body and budget — and when not to buy.', 82],
      ['Before You Buy', 'Wobbly, Slippy or Too Thin?', 'How to pick a mat that lasts years, not months.', 88],
      ['At a Glance', 'Thick vs Thin: Which Mat Suits You?', 'Grip, cushion and material, compared honestly.', 82],
      ['The Yoga Sensei', 'The Only Yoga Mat Guide You Need', '', 90],
      ['7 Honest Picks', '7 Yoga Mats Worth Your Money', 'From budget to buy-it-for-life.', 84],
    ],
  },
  {
    // A/B arm 3: high-contrast "listicle" layout (Pinterest search style).
    // Same destination as the darkred set — only the visual treatment differs,
    // so click-through can be compared per style in Pinterest analytics.
    // Hooks stay literally true to the page: 7 picks, five scored criteria,
    // research-led. No price claims (page uses $/$$/$$$ tiers, and Amazon
    // forbids showing static prices outside their API).
    slug: 'best-yoga-mats-bold',
    url: 'https://www.theyogasensei.com/reviews/best-yoga-mats',
    style: 'bold',
    hashtags: '#yogamat #bestyogamats #yogagear #yogaforbeginners #yogaessentials',
    desc: 'An honest 2026 yoga mat guide comparing seven standout picks by grip, cushion, durability, value and eco — research-led, no invented lab tests.',
    // Product-forward flat-lay: the bold layout shows the photo in a window,
    // so it needs the gear visible — not an atmospheric room shot.
    bg: Array(5).fill('public/images/brand/mats-flatlay-oak.webp'),
    hooks: [
      ['For every practice', 'Best\nYoga Mats', '7 mats, honestly ranked', 112],
      ['For hot yoga', 'Best\nYoga Mat', 'Grip that survives the sweat', 112],
      ['For beginners', 'Best\nYoga Mat', 'Start without overpaying', 112],
      // Was Manduka/Jade/Lululemon — "manduka vs lululemon" is only 30/mo,
      // while "non slip yoga mat" is 4,400/mo for the same page.
      ['Ranked by grip', 'Non Slip\nYoga Mats', 'Which mats actually stay put', 112],
      ['Worth the money', 'Yoga Mats', 'No fake lab tests. Sources cited.', 116],
    ],
  },
  {
    // Bold A/B arm for the hot-yoga money page. Hooks match what the page
    // ships: 4 picks, a towel section, and a care section.
    slug: 'best-yoga-mat-for-hot-yoga-bold',
    url: 'https://www.theyogasensei.com/guides/best-yoga-mat-for-hot-yoga',
    style: 'bold',
    hashtags: '#hotyoga #yogamat #yogagear #yogapractice',
    desc: 'Choose the best yoga mat for hot yoga by wet grip, sweat handling, material, thickness and towel pairing, without fake testing claims or fixed prices.',
    bg: Array(5).fill('public/images/brand/hotyoga-flatlay-wet.webp'),
    hooks: [
      ['Ranked by wet grip', 'Hot Yoga\nMats', '4 mats that hold when you sweat', 112],
      ['For hot yoga', 'Best\nYoga Mat', 'Grip that survives the sweat', 112],
      ['Do you need one?', 'Hot Yoga\nTowel', 'Sometimes it beats a pricier mat', 112],
      ['Fix the grip', 'Sliding In\nHot Yoga?', 'Why your mat gives up when wet', 104],
      ['Make it last', 'Hot Yoga\nMat Care', 'Clean it right or it dies fast', 112],
    ],
  },
  {
    // Bold A/B arm for the eco money page. Page ships 5 picks including a
    // cork option and two natural-rubber options, so those angles are honest.
    slug: 'eco-friendly-yoga-mat-bold',
    url: 'https://www.theyogasensei.com/guides/eco-friendly-yoga-mat',
    style: 'bold',
    hashtags: '#ecoyoga #sustainableyoga #yogamat #ecofriendly',
    desc: 'Choose an eco-friendly yoga mat by material, grip, latex risk and care needs, with five honest picks and no fake testing claims.',
    bg: Array(5).fill('public/images/brand/eco-flatlay-materials.webp'),
    hooks: [
      ['5 honest picks', 'Eco Friendly\nYoga Mats', 'The material trade-offs, explained', 100],
      ['Worth it?', 'Cork\nYoga Mats', 'Grip, care and the real trade-off', 116],
      ['Best grip', 'Natural Rubber\nYoga Mats', 'And the latex warning to read first', 92],
      ['Read the label', 'Non Toxic\nYoga Mats', 'What the claims actually mean', 108],
      ['The greenest mat', 'Is The One\nYou Keep', 'Why durability beats the eco label', 108],
    ],
  },
  // Affiliate spoke + remaining beginner pose pages (hooks QA'd via workflow).
  {
    slug: 'best-yoga-mat-for-beginners',
    hashtags: '#yogamat #yogaforbeginners #beginneryoga #yogagear #yogaessentials',
    desc: 'An honest guide to the best yoga mats for beginners - five picks from budget to buy-it-for-life, with the thickness, grip and latex details that actually matter.',
    bg: Array(5).fill('public/images/guides/best-yoga-mat-for-beginners/pin.webp'),
    hooks: [
      ['Gear Guide', 'Best Yoga Mat for Beginners, by Budget', 'Five honest picks, from cheap-and-cheerful to buy-it-for-life.', 76],
      ['New To Yoga', 'Your Mat Keeps Sliding? Start Here', "Why cheap foam wobbles, and the beginner mats that don't.", 82],
      ['At a Glance', '5 Beginner Yoga Mats Compared', 'Thickness, grip and latex flags, side by side.', 84],
      ['The Yoga Sensei', "The First Mat You'll Actually Unroll", '', 82],
      ['Before You Buy', 'How Thick Should a Beginner Mat Be?', "4 to 6mm is the sweet spot. Here's why.", 78],
    ],
  },
  {
    slug: 'downward-facing-dog',
    route: 'poses',
    hashtags: '#downwarddog #downwardfacingdog #yogaforbeginners #yogaposes #adhomukhasvanasana',
    desc: 'Downward Facing Dog, explained calmly: beginner cues, the common mistakes (rounded back, locked knees, weight in the wrists), modifications with blocks, and who should take it easy.',
    bg: Array(5).fill('public/images/poses/downward-facing-dog/in-pose.webp'),
    hooks: [
      ['How To', 'Downward Facing Dog, Step by Step', 'Six calm beginner cues that actually matter.', 80],
      ['Common Problem', "You're Overthinking Downward Dog", "You don't need flat heels or straight legs.", 84],
      ['At a Glance', 'Downward Dog: What Really Matters', 'A straight back beats straight legs, every time.', 82],
      ['The Yoga Sensei', 'One Long, Easy Breath Upside Down', '', 82],
      ['Take It Easy', 'When to Go Gentle in Downward Dog', 'Sore wrists, carpal tunnel, late pregnancy.', 80],
    ],
  },
  {
    slug: 'warrior-ii',
    route: 'poses',
    hashtags: '#warrior2 #warriorii #virabhadrasana #yogaforbeginners #yogaposes',
    desc: 'Warrior II (Virabhadrasana II), explained calmly: beginner alignment cues, the common mistakes, modifications, and who should take it easy. A steady standing pose for strength and focus.',
    bg: Array(5).fill('public/images/aiko-persona/aiko-warrior-ii-yoga-pose.webp'),
    hooks: [
      ['How To', 'Warrior II, Step by Step', 'Set the feet, stack the knee, reach long.', 86],
      ['Common Problem', 'Why Your Front Knee Hurts in Warrior II', 'It is almost always alignment. Here is the fix.', 74],
      ['At a Glance', 'Warrior II at a Glance', 'Targets, hold time, and props in one quick look.', 88],
      ['The Yoga Sensei', 'Strong Legs, Soft Gaze', '', 90],
      ['Take It Easy', '4 Warrior II Mistakes to Avoid', 'Knee caving, sliding past the ankle, and more.', 82],
    ],
  },
  {
    slug: 'cobra-pose',
    route: 'poses',
    hashtags: '#cobrapose #bhujangasana #yogaforbeginners #yogaposes #backbend',
    desc: 'Cobra Pose (Bhujangasana), explained calmly: how to lift from the back not the arms, the common mistakes, gentler variations like Baby Cobra and Sphinx, and who should take it easy.',
    bg: Array(5).fill('public/images/aiko-persona/aiko-cobra-pose-warm-yoga-studio.webp'),
    hooks: [
      ['How To', 'Cobra Pose, Step by Step', 'Lift from your back, keep the hands light.', 86],
      ['Common Problem', 'Why Cobra Pose Hurts Your Lower Back', "You're lifting too high. Here's the gentler fix.", 76],
      ['At a Glance', 'Cobra vs. Baby Cobra vs. Sphinx', 'Three gentle backbends, from softest to fuller.', 80],
      ['The Yoga Sensei', 'A Quiet Opening for the Chest', '', 86],
      ['Take It Easy', 'When to Skip Cobra Pose', 'Back injury and pregnancy: kinder options instead.', 88],
    ],
  },
  {
    slug: 'pigeon-pose',
    route: 'poses',
    hashtags: '#pigeonpose #hipopener #yogaforbeginners #yogaposes #ekapadarajakapotasana',
    desc: 'Pigeon Pose (Eka Pada Rajakapotasana), explained calmly: beginner cues to open tight hips without straining the knee, the common mistakes, props, and who should take it easy.',
    bg: Array(5).fill('public/images/poses/pigeon-pose/in-pose.webp'),
    hooks: [
      ['How To', 'How to Do Pigeon Pose Safely', 'Beginner cues to open tight hips without hurting the knee.', 82],
      ['Common Problem', 'Tight Hips in Pigeon Pose?', 'Why your hip floats off the mat, and the prop that fixes it.', 88],
      ['At a Glance', 'Pigeon Pose vs. the Figure-4', 'Same deep hip stretch, no weight on the knee.', 82],
      ['The Yoga Sensei', 'A Slow Opening for the Hips', '', 86],
      ['Take It Easy', 'Pigeon Pose Sore? Read This First', 'Knee, hip, or SI pain and pregnancy: gentler options.', 80],
    ],
  },
]

const ANGLE_IDS = ['01-listicle', '02-problem', '03-comparison', '04-aesthetic', '05-checklist']

async function main() {
  // Optional slug filter: `npx tsx scripts/generate-pins.ts childs-pose` builds just that one.
  const only = process.argv[2]
  let count = 0
  for (let g = 0; g < GUIDES.length; g++) {
    const guide = GUIDES[g]
    if (only && guide.slug !== only) continue
    const outDir = resolve(ROOT, 'public/images/pins', guide.slug)
    mkdirSync(outDir, { recursive: true })
    const imgs = guide.bg ?? imagesFor(guide.slug, g)
    const url = guide.url ?? `https://www.theyogasensei.com/${guide.route ?? 'guides'}/${guide.slug}`
    const lines: string[] = [
      `# Pinterest pins — ${guide.slug}`,
      '',
      `**Target URL (set as the pin link):** ${url}`,
      '',
      '1000×1500, generated by `scripts/generate-pins.ts`. Imagery = existing brand photos (decorative, no fake testing). Text = code layer. Hooks are a first draft — edit here before posting.',
      '',
    ]
    for (let a = 0; a < 5; a++) {
      const id = ANGLE_IDS[a]
      const out = resolve(outDir, `${id}.png`)
      await renderPin(imgs[a], guide.hooks[a], out, guide.style ?? 'default')
      count++
      const rel = out.replace(ROOT, '').replace(/^[\\/]/, '').replace(/\\/g, '/')
      console.log('OK', rel)
      lines.push(
        `## ${id}`,
        '',
        `- **Image:** \`${rel}\``,
        `- **Pin title:** ${PIN_SEO[`${guide.slug}/${id}`]?.title ?? guide.hooks[a][1].replace(/\n/g, ' ')}`,
        `- **Pin description:** ${PIN_SEO[`${guide.slug}/${id}`]?.desc ?? guide.desc} ${guide.hashtags}`,
        `- **Link:** ${url}`,
        '',
      )
    }
    writeFileSync(resolve(outDir, '_pins.md'), lines.join('\n'))
  }
  console.log(`\nDone: ${count} pins across ${GUIDES.length} guides.`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
