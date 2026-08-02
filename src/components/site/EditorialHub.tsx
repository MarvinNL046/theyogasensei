import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '#/components/ui/container'

export interface HubCard {
  label: string
  title: string
  description: string
  href: string
  image: string
}

export function EditorialHub({
  eyebrow,
  title,
  intro,
  cards,
  sections,
}: {
  eyebrow: string
  title: string
  intro: string
  cards: Array<HubCard>
  sections: Array<{ title: string; description: string; href: string }>
}) {
  return (
    <>
      <section className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)]">
        <Container size="wide" className="py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
            {eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-[-0.045em] text-[color:var(--color-ink)] md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--color-ink-soft)]">
            {intro}
          </p>
        </Container>
      </section>
      <section className="bg-[color:var(--color-bg)]">
        <Container size="wide" className="py-16 md:py-24">
          <div className="grid gap-6 lg:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.href}
                className="group overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-white shadow-[0_20px_55px_-44px_rgba(24,49,41,.7)]"
              >
                <Link to={card.href}>
                  <img
                    src={card.image}
                    alt=""
                    width={900}
                    height={600}
                    className="aspect-[3/2] w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                  />
                  <div className="p-7">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:var(--color-accent-deep)]">
                      {card.label}
                    </p>
                    <h2 className="mt-3 font-serif text-2xl leading-tight text-[color:var(--color-ink)]">
                      {card.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                      {card.description}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--color-olive-deep)]">
                      Read guide <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <div className="mt-20 border-t border-[color:var(--color-border)] pt-12">
            <div className="grid gap-x-12 gap-y-0 md:grid-cols-2">
              {sections.map((section, index) => (
                <Link
                  key={section.href}
                  to={section.href}
                  className="group flex gap-5 border-b border-[color:var(--color-border)] py-7"
                >
                  <span className="font-serif text-2xl text-[color:var(--color-accent)]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span className="block font-serif text-xl text-[color:var(--color-ink)] group-hover:text-[color:var(--color-olive)]">
                      {section.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                      {section.description}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
