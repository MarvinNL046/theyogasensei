/**
 * Amazon Associates Operating Agreement guardrail.
 *
 * Three rules from the Operating Agreement that are easy to break while writing
 * and expensive to break in public. Runs in `pnpm verify`, so the build fails
 * before any of them can ship.
 *
 * 1. Customer reviews — "don't use screenshots or copy and paste product reviews
 *    from Amazon as they are. You may only link to reviews through APIs. If you
 *    do not have access, please do not use reviews." PA-API access is granted
 *    only after three qualifying sales, so until then no Amazon review text and
 *    no Amazon star ratings or review counts may appear in editorial copy.
 * 2. Replicas — "dupe", "knockoff" and "lookalike" are banned in connection with
 *    a brand, even when the comparison is honest and the reader searched for it.
 * 3. Static prices — prices may not be shown outside the Product Advertising
 *    API. The site uses $/$$/$$$ tiers instead, which this check allows.
 */
import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()

/** Files whose text reaches a published page. Drafts are excluded — they cannot ship. */
const TARGET_DIRS = [
  'content',
  'src/features/reviews',
  'src/components/reviews',
]
const SKIP = ['_drafts', 'node_modules']

interface Rule {
  id: string
  why: string
  pattern: RegExp
}

const RULES: Rule[] = [
  {
    id: 'amazon-customer-reviews',
    why: 'Amazon review text may only be used via the PA-API (unlocked after 3 qualifying sales). Quote an independent outlet or a named owner elsewhere instead.',
    pattern:
      /\b(amazon (verified )?(customer )?review|verified review|reviewer (puts|says|writes|wrote|notes)[^.]{0,40}\bon amazon\b|one amazon reviewer)\b/gi,
  },
  {
    id: 'amazon-star-ratings',
    why: 'Amazon star ratings and review counts are review data — same PA-API restriction, and they go stale the day you write them.',
    pattern:
      /\b\d[.,]\d\s*(out of|\/)\s*5\b|\bratings on (the )?amazon\b|\bamazon (star )?rating\b/gi,
  },
  {
    id: 'replica-terms',
    why: 'The Operating Agreement bans "dupe", "knockoff" and "lookalike" in connection with a brand. Use "similar to", "inspired by" or "looks for less".',
    pattern: /\b(dupes?|knock[- ]?offs?|look[- ]?alikes?)\b/gi,
  },
  {
    id: 'static-price',
    why: 'Prices may not be shown outside the PA-API. Use the $/$$/$$$ tier notation or describe the price relatively.',
    // A currency symbol followed by a digit. The $$$ tier notation has no digit
    // and is deliberately not matched.
    pattern: /[$£€]\s?\d/g,
  },
]

function walk(dir: string, out: string[] = []): string[] {
  if (!fs.existsSync(dir)) return out
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.some((s) => entry.name === s)) continue
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, out)
    else if (/\.(mdx|ts|tsx)$/.test(entry.name)) out.push(full)
  }
  return out
}

const files = TARGET_DIRS.flatMap((d) => walk(path.join(root, d)))
let failures = 0

for (const file of files) {
  const text = fs.readFileSync(file, 'utf8')
  const lines = text.split('\n')
  for (const rule of RULES) {
    lines.forEach((line, i) => {
      // Allow an explicit, reviewed exception: // associates-ok: <reason>
      if (/associates-ok:/i.test(line)) return
      const hits = line.match(rule.pattern)
      if (!hits) return
      failures += 1
      const rel = path.relative(root, file).replace(/\\/g, '/')
      console.error(`\n✗ [${rule.id}] ${rel}:${i + 1}`)
      console.error(`  matched: ${[...new Set(hits)].join(', ')}`)
      console.error(`  why: ${rule.why}`)
    })
  }
}

if (failures > 0) {
  console.error(
    `\n[verify-associates-compliance] ${failures} violation(s). Fix them, or add "associates-ok: <reason>" to the line if it is a reviewed false positive.\n`,
  )
  process.exit(1)
}

console.log(
  `[verify-associates-compliance] ${files.length} file(s) checked, 0 violations`,
)
