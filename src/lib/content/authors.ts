import type { Author } from '#/lib/seo/schema'

// Phase 1: single author roster, hardcoded. When /content/authors/<slug>.mdx
// lands in Step 9, swap this for an MDX-driven loader keyed off the same slugs.
const AUTHORS: Record<string, Author> = {
  marvin: {
    slug: 'marvin',
    name: 'Marvin Smit',
    jobTitle: 'Founder · Yoga gear curator',
    bio: 'Founder of The Yoga Sensei. Long-time practitioner, not a certified instructor. Every gear guide and recommendation on this site is written and edited by Marvin, based on publicly available specifications and aggregated user reviews.',
    knowsAbout: ['Yoga gear', 'Beginner yoga', 'Yoga lifestyle'],
    image: '/images/team/marvin.webp',
  },
}

export function resolveAuthor(slug: string): Author {
  const author = AUTHORS[slug]
  if (!author) {
    throw new Error(
      `Unknown author slug: ${slug}. Add an entry to src/lib/content/authors.ts.`,
    )
  }
  return author
}

export function listAuthorSlugs(): Array<string> {
  return Object.keys(AUTHORS)
}
