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
const BRAND_MARK = '継続は力なり'

const font = (file: string) => readFileSync(resolve(FONT_DIR, file))
const fonts = [
  { name: 'Cormorant Garamond', data: font('CormorantGaramond-400.ttf'), weight: 400 as const, style: 'normal' as const },
  { name: 'Cormorant Garamond', data: font('CormorantGaramond-600.ttf'), weight: 600 as const, style: 'normal' as const },
  { name: 'Cormorant Garamond', data: font('CormorantGaramond-700.ttf'), weight: 700 as const, style: 'normal' as const },
  { name: 'Inter', data: font('Inter-500.ttf'), weight: 500 as const, style: 'normal' as const },
  { name: 'Inter', data: font('Inter-600.ttf'), weight: 600 as const, style: 'normal' as const },
  { name: 'Noto Serif JP', data: font('NotoSerifJP-600.ttf'), weight: 600 as const, style: 'normal' as const },
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
interface Guide {
  slug: string
  hashtags: string
  desc: string // base pin description (from metaDescription), reused per angle
  hooks: Hook[] // exactly 5, in angle order: list / problem / comparison / aesthetic / checklist
}

function PinLayout(eyebrow: string, title: string, subtitle: string, titleSize: number) {
  return h(
    'div',
    { style: { width: W, height: H, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', position: 'relative', fontFamily: 'Inter' } },
    h('div', {
      style: {
        position: 'absolute', top: 0, left: 0, width: W, height: H,
        background: 'linear-gradient(to bottom, rgba(35,38,28,0.30) 0%, rgba(35,38,28,0.05) 26%, rgba(35,38,28,0.10) 52%, rgba(35,38,28,0.74) 86%, rgba(35,38,28,0.90) 100%)',
      },
    }),
    h(
      'div',
      { style: { position: 'absolute', top: 72, left: 80, display: 'flex', alignItems: 'center' } },
      h('div', { style: { width: 11, height: 11, borderRadius: 11, backgroundColor: CLAY, marginRight: 16 } }),
      h('div', { style: { fontFamily: 'Inter', fontWeight: 600, fontSize: 24, letterSpacing: 6, color: CREAM, textTransform: 'uppercase' } }, eyebrow),
    ),
    h(
      'div',
      { style: { display: 'flex', flexDirection: 'column', padding: '0 80px 94px 80px' } },
      h('div', { style: { width: 72, height: 4, backgroundColor: CLAY, marginBottom: 34 } }),
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

async function renderPin(image: string, hook: Hook, out: string) {
  const [eyebrow, title, subtitle, titleSize] = hook
  const svg = await satori(PinLayout(eyebrow, title, subtitle, titleSize ?? 86) as any, { width: W, height: H, fonts, embedFont: true })
  const overlay = await sharp(Buffer.from(svg)).png().toBuffer()
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
]

const ANGLE_IDS = ['01-listicle', '02-problem', '03-comparison', '04-aesthetic', '05-checklist']

async function main() {
  let count = 0
  for (let g = 0; g < GUIDES.length; g++) {
    const guide = GUIDES[g]
    const outDir = resolve(ROOT, 'public/images/pins', guide.slug)
    mkdirSync(outDir, { recursive: true })
    const imgs = imagesFor(guide.slug, g)
    const url = `https://www.theyogasensei.com/guides/${guide.slug}`
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
      await renderPin(imgs[a], guide.hooks[a], out)
      count++
      const rel = out.replace(ROOT, '').replace(/^[\\/]/, '').replace(/\\/g, '/')
      console.log('OK', rel)
      lines.push(
        `## ${id}`,
        '',
        `- **Image:** \`${rel}\``,
        `- **Pin title:** ${guide.hooks[a][1]}`,
        `- **Pin description:** ${guide.desc} ${guide.hashtags}`,
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
