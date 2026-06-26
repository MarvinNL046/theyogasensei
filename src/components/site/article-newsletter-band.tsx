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
export function ArticleNewsletterBand({ source }: { source: string }) {
  return (
    <section className="bg-[color:var(--color-surface)]">
      <Container size="wide">
        <div className="grid items-center gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
          <div className="md:col-span-6">
            <Eyebrow tone="default">The weekly email</Eyebrow>
            <h2 className="mt-5 font-serif text-3xl leading-[1.1] tracking-tight md:text-[44px]">
              Keep your practice
              <br />
              <span className="italic text-[color:var(--color-ink-soft)]">
                going.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[color:var(--color-ink-muted)] md:text-base">
              One short email a week — new guides, honest gear notes, and the one
              thing I am testing right now. No spam, unsubscribe in one click.
            </p>
          </div>
          <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
            <NewsletterCapture source={source} showHeader={false} />
          </div>
        </div>
      </Container>
    </section>
  )
}
