import { Container } from '#/components/ui/container'

export function FooterCta() {
  return (
    <section className="relative overflow-hidden bg-[color:var(--color-olive)] py-16 text-[color:var(--color-bg)]">
      <div className="absolute inset-0 opacity-30">
        <img
          src="/images/brand/topic-meditation.webp"
          alt=""
          width={1600}
          height={900}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>

      <Container size="wide" className="relative">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[0.45fr_0.55fr]">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[color:var(--color-accent-soft)]">
              Your practice. Our purpose.
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              Better practice.
              <br />
              <span className="italic text-[color:var(--color-accent-soft)]">Better you.</span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[color:var(--color-bg)]/85">
              Explore more guides, routines and honest reviews to support your journey on and off
              the mat.
            </p>

            <a
              href="/guides"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-[color:var(--color-bg)] px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-[color:var(--color-olive)] transition hover:bg-white"
            >
              Explore Guides →
            </a>
          </div>
        </div>
      </Container>
    </section>
  )
}
