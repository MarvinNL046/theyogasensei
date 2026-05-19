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
      { title: '7 Best Yoga Mats for Every Practice (2024) — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'We tested 21 yoga mats to find the ones that offer the best grip, comfort and durability for every type of yogi and every style of practice.',
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
