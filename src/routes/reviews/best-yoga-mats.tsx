import { createFileRoute } from '@tanstack/react-router'
import { ComparisonTable } from '#/features/reviews/components/ComparisonTable'
import { FeaturedReview } from '#/features/reviews/components/FeaturedReview'
import { FooterCta } from '#/features/reviews/components/FooterCta'
import { HeroReviewSection } from '#/features/reviews/components/HeroReviewSection'
import { InfoCardsSection } from '#/features/reviews/components/InfoCardsSection'
import { InThisGuideNav } from '#/features/reviews/components/InThisGuideNav'
import { TopPicksGrid } from '#/features/reviews/components/TopPicksGrid'
import { yogaMats } from '#/features/reviews/data/yoga-mats'

export const Route = createFileRoute('/reviews/best-yoga-mats')({
  head: () => ({
    meta: [
      { title: 'Best Yoga Mats for Every Practice — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'A claims-safe roundup of the best yoga mats by category — grip, cushioning, durability and value, based on publicly available specifications and aggregated reviews.',
      },
      { property: 'og:type', content: 'article' },
    ],
  }),
  component: BestYogaMatsPage,
})

function BestYogaMatsPage() {
  const featured = yogaMats[0]
  return (
    <>
      <HeroReviewSection />
      <InThisGuideNav />
      <TopPicksGrid />
      <ComparisonTable />
      <FeaturedReview mat={featured} />
      <InfoCardsSection />
      <FooterCta />
    </>
  )
}
