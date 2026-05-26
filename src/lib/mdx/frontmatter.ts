import { z } from 'zod'

// YAML parses `2026-05-13` as a JS Date; quoted "2026-05-13" stays a string.
// Accept both; normalise to ISO YYYY-MM-DD.
const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
  .refine((v) => !Number.isNaN(Date.parse(v)), {
    message: 'must be an ISO date',
  })

const pinSchema = z.object({
  primaryImage: z.string().min(1),
  description: z
    .string()
    .min(50, 'Pinterest pin description should be 200–500 chars for hashtag room')
    .max(500),
})

const faqEntry = z.object({
  q: z.string().min(5),
  a: z.string().min(20),
})

const citationSchema = z.object({
  title: z.string().min(3),
  authors: z.string().min(2),
  year: z.number().int().min(1900).max(2100),
  url: z.string().url(),
})

const howToStep = z.object({
  name: z.string().min(2),
  text: z.string().min(10),
  image: z.string().optional(),
})

const howToSchema = z.object({
  totalTime: z
    .string()
    .regex(/^PT\d+[HMS]/, 'must be ISO 8601 duration, e.g. PT5M'),
  step: z.array(howToStep).min(1),
})

const productEntry = z.object({
  slug: z.string().min(1),
  name: z.string().min(2),
  price: z.string().optional(),
  rating: z.number().min(0).max(5).optional(),
  url: z.string().min(1),
})

const editorialItemEntry = z.object({
  name: z.string().min(2),
  url: z.string().min(1),
})

const base = z.object({
  title: z
    .string()
    .min(20, 'titles under 20 chars rarely have keyword + benefit')
    .max(100, 'titles over 100 chars are too long for readable article heads'),
  slug: z
    .string()
    .min(1)
    .max(60, 'slugs over 60 chars hurt CTR + URL cleanliness')
    .regex(/^[a-z0-9-]+$/, 'lowercase + hyphens only, no underscores'),
  metaDescription: z
    .string()
    .min(120, 'meta descriptions under 120 chars waste SERP real estate')
    .max(170, 'meta descriptions over 160 chars get truncated'),
  pillar: z.string().min(1),
  clusters: z.array(z.string()),
  tags: z.array(z.string()).min(1),
  related: z.array(z.string()),
  author: z.string().min(1),
  reviewedBy: z.string().min(1),
  publishedAt: isoDate,
  lastReviewedAt: isoDate,
  estimatedReadingTime: z.number().int().min(1).max(60),
  heroImage: z.string().min(1),
  pin: pinSchema,
  itemList: z.array(editorialItemEntry).optional(),
  citations: z.array(citationSchema).default([]),
})

const pillarSchema = base.extend({
  type: z.literal('pillar'),
  schemaType: z.literal('Article'),
  faq: z.array(faqEntry).min(4, 'pillars require ≥ 4 FAQ entries'),
})

const subpillarSchema = base.extend({
  type: z.literal('subpillar'),
  schemaType: z.enum(['Article', 'ItemList']),
  faq: z.array(faqEntry).optional(),
  products: z.array(productEntry).optional(),
})

const clusterSchema = base.extend({
  type: z.literal('cluster'),
  schemaType: z.enum(['Article', 'HowTo', 'Review']),
  faq: z.array(faqEntry).min(3, 'clusters require ≥ 3 FAQ entries'),
  howTo: howToSchema.optional(),
})

export const frontmatterSchema = z
  .discriminatedUnion('type', [pillarSchema, subpillarSchema, clusterSchema])
  .superRefine((data, ctx) => {
    if (data.type === 'pillar') {
      if (data.pillar !== data.slug) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'pillar.pillar must equal pillar.slug (self-reference)',
          path: ['pillar'],
        })
      }
      if (data.clusters.length !== 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'pillar.clusters must be []',
          path: ['clusters'],
        })
      }
    } else {
      if (data.clusters.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${data.type}.clusters must be non-empty`,
          path: ['clusters'],
        })
      }
      if (data.pillar === data.slug) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `${data.type}.pillar cannot equal slug (only pillars self-reference)`,
          path: ['pillar'],
        })
      }
    }

    if (data.type === 'cluster' && data.schemaType === 'HowTo' && !data.howTo) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'cluster with schemaType=HowTo requires howTo.step[]',
        path: ['howTo'],
      })
    }

    if (
      data.type === 'subpillar' &&
      data.schemaType === 'ItemList' &&
      (!data.products || data.products.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'subpillar with schemaType=ItemList requires products[]',
        path: ['products'],
      })
    }
  })

export type Frontmatter = z.infer<typeof frontmatterSchema>
export type PillarFrontmatter = z.infer<typeof pillarSchema>
export type SubpillarFrontmatter = z.infer<typeof subpillarSchema>
export type ClusterFrontmatter = z.infer<typeof clusterSchema>

export function validateFrontmatter(
  data: unknown,
  filePath?: string,
): Frontmatter {
  const result = frontmatterSchema.safeParse(data)
  if (!result.success) {
    const where = filePath ? ` in ${filePath}` : ''
    const issues = result.error.issues
      .map((i) => `  - ${i.path.join('.')}: ${i.message}`)
      .join('\n')
    throw new Error(`Invalid frontmatter${where}:\n${issues}`)
  }
  return result.data
}
