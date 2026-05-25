import { Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'

interface Crumb {
  label: string
  to?: '/' | '/gear' | '/guides'
}

interface ReviewBreadcrumbProps {
  trail: Array<Crumb>
}

export function ReviewBreadcrumb({ trail }: ReviewBreadcrumbProps) {
  const lastIndex = trail.length - 1
  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[color:var(--color-bg)] pt-8 md:pt-10"
    >
      <Container size="wide">
        <ol className="flex flex-wrap items-center text-sm text-[color:var(--color-ink-muted)]">
          {trail.map((crumb, i) => {
            const isLast = i === lastIndex
            return (
              <li
                key={`${crumb.label}-${i}`}
                className="flex items-center"
                {...(isLast ? { 'aria-current': 'page' as const } : {})}
              >
                {crumb.to && !isLast ? (
                  <Link
                    to={crumb.to}
                    className="transition hover:text-[color:var(--color-accent-deep)]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[color:var(--color-ink)]' : ''}>
                    {crumb.label}
                  </span>
                )}
                {isLast ? null : (
                  <span aria-hidden="true" className="mx-3 opacity-50">
                    ›
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </Container>
    </nav>
  )
}
