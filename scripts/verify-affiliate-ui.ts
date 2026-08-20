import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const c2Path = path.join(root, 'content/guides/best-yoga-mat-for-hot-yoga.mdx')
const buttonPath = path.join(
  root,
  'src/components/affiliate/AffiliateButton.tsx',
)
const specPath = path.join(
  root,
  'src/components/affiliate/ProductSpecStrip.tsx',
)

const expectedProducts = [
  {
    slug: 'manduka-eko-5mm',
    productName: 'Manduka eKO 5mm',
    specs: {
      thickness: '5 mm',
      weight: '~7 lb',
      material: 'Natural rubber',
      latexFlag: true,
    },
  },
  {
    slug: 'manduka-grp-adapt',
    productName: 'Manduka GRP Adapt',
    specs: {
      thickness: '5 mm',
      // Manduka publishes 5.8 lb; Amazon and OutdoorGearLab both say 5.5.
      weight: '~5.8 lb',
      material: 'PU top + rubber base',
      // Manduka lists latex on every current GRP page and warns against it for
      // latex sensitivities. This was false here until 2026-07-25.
      latexFlag: true,
    },
  },
  {
    slug: 'jade-harmony',
    productName: 'Jade Harmony',
    specs: {
      thickness: '~4.7 mm (3/16")',
      weight: '~5 lb',
      material: 'Natural rubber',
      latexFlag: true,
    },
  },
  {
    slug: 'manduka-eko-lite',
    productName: 'Manduka eKO Lite 4mm',
    specs: {
      thickness: '4 mm',
      weight: '~4.5 lb',
      material: 'Natural rubber',
      latexFlag: true,
    },
  },
  {
    slug: 'manduka-yogitoes',
    productName: 'Manduka Yogitoes',
    specs: {
      material: 'Microfiber + silicone nubs',
      latexFlag: false,
    },
  },
  {
    slug: 'manduka-equa-towel',
    productName: 'Manduka eQua Towel',
    specs: {
      material: 'Microfiber',
      latexFlag: false,
    },
  },
  {
    slug: 'manduka-mat-wash-lavender',
    productName: 'Manduka Mat Wash Lavender 8oz',
    specs: {
      latexFlag: false,
    },
  },
] as const

function fail(message: string): never {
  console.error(`Affiliate UI verification failed: ${message}`)
  process.exit(1)
}

function countMatches(haystack: string, regex: RegExp): number {
  return Array.from(haystack.matchAll(regex)).length
}

if (!fs.existsSync(buttonPath)) fail('AffiliateButton.tsx is missing')
if (!fs.existsSync(specPath)) fail('ProductSpecStrip.tsx is missing')

const c2 = fs.readFileSync(c2Path, 'utf8')
const button = fs.readFileSync(buttonPath, 'utf8')
const spec = fs.readFileSync(specPath, 'utf8')

if (!button.includes('type AffiliateButtonProps'))
  fail('AffiliateButtonProps type is missing')
if (!button.includes("variant?: 'primary' | 'secondary'"))
  fail('AffiliateButton variant prop is missing or wrong')
if (!button.includes("size?: 'sm' | 'md'"))
  fail('AffiliateButton size prop is missing or wrong')
if (!button.includes('rel="nofollow sponsored noopener"'))
  fail('AffiliateButton rel compliance attribute is missing')
if (!button.includes('target="_blank"'))
  fail('AffiliateButton target is missing')
if (!button.includes('data-affiliate-slug={slug}'))
  fail('AffiliateButton analytics slug attribute is missing')
if (
  !button.includes('aria-label={`Check price for ${productName} on Amazon`}')
) {
  fail('AffiliateButton accessible aria-label is missing')
}
if (
  /BUY NOW|ORDER NOW|BEST PRICE|LOWEST PRICE|#FF9900|#F0C14B|amazon-logo/i.test(
    button,
  )
) {
  fail(
    'AffiliateButton contains forbidden Amazon-like CTA copy, color, or logo reference',
  )
}

if (!spec.includes('type ProductSpec =')) fail('ProductSpec type is missing')
if (!spec.includes('latexFlag?: boolean'))
  fail('ProductSpec latexFlag prop is missing')
if (!spec.includes('Contains latex'))
  fail('ProductSpecStrip latex chip copy is missing')
if (/rating|review-count|price/i.test(spec))
  fail('ProductSpecStrip contains forbidden price/rating language')

if (
  !c2.includes(
    "import { AffiliateButton } from '#/components/affiliate/AffiliateButton'",
  )
) {
  fail('C2 MDX does not import AffiliateButton')
}
if (
  !c2.includes(
    "import { ProductSpecStrip } from '#/components/affiliate/ProductSpecStrip'",
  )
) {
  fail('C2 MDX does not import ProductSpecStrip')
}
if (c2.includes('Check current price on Amazon'))
  fail('legacy plain-text affiliate CTA copy remains in C2 MDX')

const buttonCount = countMatches(c2, /<AffiliateButton\b/g)
if (buttonCount !== expectedProducts.length)
  fail(`expected 7 AffiliateButton usages, found ${buttonCount}`)

const stripCount = countMatches(c2, /<ProductSpecStrip\b/g)
if (stripCount !== expectedProducts.length)
  fail(`expected 7 ProductSpecStrip usages, found ${stripCount}`)

for (const product of expectedProducts) {
  const buttonPattern = new RegExp(
    `<AffiliateButton\\s+slug="${product.slug}"\\s+productName="${product.productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s*/?>`,
    's',
  )
  if (!buttonPattern.test(c2))
    fail(`missing AffiliateButton for ${product.productName}`)

  const stripStart = c2.indexOf(
    `<ProductSpecStrip productName="${product.productName}"`,
  )
  if (stripStart === -1)
    fail(`missing ProductSpecStrip for ${product.productName}`)
  const stripBlock = c2.slice(stripStart, c2.indexOf('/>', stripStart) + 2)
  for (const [key, value] of Object.entries(product.specs)) {
    const expected =
      typeof value === 'string' ? `${key}: '${value}'` : `${key}: ${value}`
    if (!stripBlock.includes(expected))
      fail(`missing ${expected} for ${product.productName}`)
  }
}

// 4 since 2026-07-25: the GRP Adapt was flagged latex-free here, but Manduka
// lists latex on every current GRP product page and advises against it for
// latex sensitivities. Raising this count is deliberate, not a rubber stamp —
// if it fails again, check whether a real latex flag was flipped by mistake.
const latexTrueCount = countMatches(c2, /latexFlag: true/g)
if (latexTrueCount !== 4)
  fail(`expected exactly 4 latexFlag true values, found ${latexTrueCount}`)

const goSlugs = Array.from(c2.matchAll(/\/go\/([a-z0-9-]+)/g)).map((m) => m[1])
const unexpectedGoLinks = goSlugs.filter(
  (slug) => !expectedProducts.some((product) => product.slug === slug),
)
if (unexpectedGoLinks.length > 0)
  fail(`unexpected /go slugs remain: ${unexpectedGoLinks.join(', ')}`)

console.log('Affiliate UI verification passed')
