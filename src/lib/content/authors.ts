import type { Author } from '#/lib/seo/schema'

// Phase 1: single author roster, hardcoded. When /content/authors/<slug>.mdx
// lands in Step 9, swap this for an MDX-driven loader keyed off the same slugs.
const AUTHORS: Record<string, Author> = {
  marvin: {
    slug: 'marvin',
    name: 'Marvin',
    jobTitle: 'Founder · Yoga gear curator',
    bio: 'Founder of The Yoga Sensei. Tests mats, blocks, and yoga apps for this site. Practises but does not teach yoga — instructional content is reviewed by certified teachers.',
    knowsAbout: ['Yoga gear', 'Beginner yoga', 'Yoga lifestyle'],
    sameAs: [
      'https://pinterest.com/theyogasensei',
      'https://instagram.com/theyogasensei',
    ],
    image: 'authors/marvin-headshot',
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
