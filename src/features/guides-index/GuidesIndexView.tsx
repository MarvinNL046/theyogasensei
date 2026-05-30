import { Container } from '#/components/ui/container'
import { GuidesHero } from '#/features/guides-index/components/GuidesHero'
import { GuideFilters } from '#/features/guides-index/components/GuideFilters'
import { FeaturedGuide } from '#/features/guides-index/components/FeaturedGuide'
import { GuideListItem } from '#/features/guides-index/components/GuideListItem'
import { GuidesSidebar } from '#/features/guides-index/components/GuidesSidebar'
import { GuidesCta } from '#/features/guides-index/components/GuidesCta'
import {
  countByCategory,
  type GuideCategory,
  type GuidesData,
} from '#/features/guides-index/data'

export interface GuidesIndexViewProps {
  data: GuidesData
  /** Active category — controlled by the route's ?category= search param. */
  active: GuideCategory
  /** Called when a chip is picked; the route writes it to the URL. */
  onSelect: (category: GuideCategory) => void
}

/**
 * Assembles the guides index. Renders the unfiltered "All" view on the server
 * (SSG), then becomes interactive: the filter chips narrow the list client-side
 * with no extra request. The active category is driven by the URL (?category=)
 * so views are shareable + deep-linkable. The featured pillar shows only in the
 * "All" view; once a category is selected the list is a flat set of its guides.
 */
export function GuidesIndexView({
  data,
  active,
  onSelect,
}: GuidesIndexViewProps) {
  const counts = countByCategory(data.guides)

  const showFeatured = active === 'All' && data.featured !== null
  const list =
    active === 'All'
      ? data.guides.filter((g) => g.slug !== data.featured?.slug)
      : data.guides.filter((g) => g.category === active)

  return (
    <>
      <GuidesHero />
      <GuideFilters active={active} counts={counts} onSelect={onSelect} />

      <section className="bg-[color:var(--color-bg)]">
        <Container size="wide" className="py-16 md:py-20">
          <div className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
            <div className="md:col-span-8">
              {showFeatured && data.featured ? (
                <FeaturedGuide guide={data.featured} />
              ) : null}

              {list.length > 0 ? (
                <ul className="flex flex-col divide-y divide-[color:var(--color-border)]/60 border-t border-[color:var(--color-border)]/60">
                  {list.map((guide) => (
                    <GuideListItem key={guide.slug} guide={guide} />
                  ))}
                </ul>
              ) : (
                <p className="py-10 text-sm text-[color:var(--color-ink-muted)]">
                  No guides in this category yet.
                </p>
              )}
            </div>

            <GuidesSidebar />
          </div>
        </Container>
      </section>

      <GuidesCta />
    </>
  )
}
