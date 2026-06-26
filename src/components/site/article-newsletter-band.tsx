import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'
import { NewsletterCapture } from '#/components/site/newsletter-capture'

/**
 * Closing newsletter band for article pages (poses + guides). Replaces the old
 * "Read the about page" CTA at the warmest moment — the end of a read — with the
 * real Convex-wired capture. Light surface band (copy left, form card right) so
 * it stays calm and doesn't clash with the dark olive footer that follows.
 *
 * `source` is stored on the subscriber row (e.g. "pose:downward-facing-dog",
 * "guide:morning-yoga-routine") so list growth can be attributed per page.
 */
export function ArticleNewsletterBand({
  source,
  leadMagnet = 'yoga-for-beginners-starter',
}: {
  source: string
  leadMagnet?: string
}) {
  return (
    <section className="bg-[color:var(--color-surface)]">
      <Container size="wide">
        <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="md:col-span-6">
            <Eyebrow tone="default">Free starter guide</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight md:text-[44px]">
              Start yoga,
              <br />
              <span className="italic text-[color:var(--color-ink-soft)]">
                the calm way.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
              Get the free Yoga for Beginners Starter Guide — the gear worth
              buying, eight foundational poses, and a 10-minute routine, with
              every source linked. Plus one short email a week. Unsubscribe
              anytime.
            </p>
          </div>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <NewsletterCapture
              source={source}
              leadMagnet={leadMagnet}
              showHeader={false}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
