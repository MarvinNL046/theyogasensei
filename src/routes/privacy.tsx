import type { ReactNode } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Container } from '#/components/ui/container'
import { Eyebrow } from '#/components/ui/eyebrow'

const LAST_UPDATED = '2026-05-26'

export const Route = createFileRoute('/privacy')({
  head: () => ({
    meta: [
      { title: 'Privacy — The Yoga Sensei' },
      {
        name: 'description',
        content:
          'How The Yoga Sensei handles your data: what we collect, why, and your choices. Short, plain and honest, no dark patterns and no selling of your data.',
      },
      { property: 'og:title', content: 'Privacy — The Yoga Sensei' },
      {
        property: 'og:description',
        content:
          'How The Yoga Sensei handles your data: what we collect, why, and your choices. Short, plain and honest, no dark patterns and no selling of your data.',
      },
      { property: 'og:url', content: 'https://www.theyogasensei.com/privacy' },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: 'The Yoga Sensei' },
      { property: 'og:locale', content: 'en_US' },
      {
        property: 'og:image',
        content: 'https://www.theyogasensei.com/images/brand/home-og.webp',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      {
        name: 'twitter:image',
        content: 'https://www.theyogasensei.com/images/brand/home-og.webp',
      },
    ],
    links: [{ rel: 'canonical', href: 'https://www.theyogasensei.com/privacy' }],
  }),
  component: PrivacyPage,
})

function PrivacyPage() {
  return (
    <section className="bg-[color:var(--color-bg)] py-16 md:py-24">
      <Container size="narrow">
        <Eyebrow tone="default">Privacy</Eyebrow>
        <h1 className="mt-5 font-serif text-4xl leading-tight tracking-tight md:text-5xl">
          How we handle your data
        </h1>
        <p className="mt-6 text-base leading-8 text-[color:var(--color-ink-soft)]">
          The Yoga Sensei is a small, independent editorial site run by Marvin Smit in the
          Netherlands. We collect as little data as we can while still running the site and a
          newsletter. This page explains what we do collect, why, and what your rights are.
        </p>
        <p className="mt-4 text-sm text-[color:var(--color-ink-muted)]">
          Last updated: <time dateTime={LAST_UPDATED}>{LAST_UPDATED}</time>
        </p>

        <div className="mt-10 space-y-9 rounded-sm border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-sm md:p-9">
          <PolicySection title="What we collect">
            <h3>Email address (only if you subscribe to the newsletter).</h3>
            <p>
              We use Resend to send the newsletter and the welcome email. Your email is stored in
              our database (Convex) along with a timestamp of when you subscribed. We do not collect
              your name, location, or any other personal information unless you send it to us in an
              email yourself.
            </p>

            <h3>Analytics and performance.</h3>
            <p>
              We use two Vercel-provided tools to understand how the site is used and how well it
              performs:
            </p>
            <ul>
              <li>
                Vercel Web Analytics counts page views per route. It does not use cookies, does
                not track individuals across sites, and records only aggregated traffic data.
              </li>
              <li>
                Vercel Speed Insights measures how fast pages load for real visitors (Core Web
                Vitals). It does not use cookies and does not build user profiles, but it does
                process technical data including your IP address and browser type to attribute
                measurements to a session. Vercel anonymises this data and does not share it. See
                Vercel&apos;s privacy notice for full details.
              </li>
            </ul>
            <p>Neither tool is used for advertising, retargeting, or profiling.</p>

            <h3>Affiliate link clicks.</h3>
            <p>
              When you click an affiliate link on this site, we count the click against the link
              so we know which products people are interested in. We do not record your IP address,
              browser, or any identifying information — only a total count per link. See also our{' '}
              <Link to="/affiliate-disclosure">affiliate disclosure</Link>.
            </p>
          </PolicySection>

          <PolicySection title="What we do not do">
            <ul>
              <li>We do not sell or share your data with anyone.</li>
              <li>
                We do not use advertising cookies or third-party trackers beyond what is listed
                above.
              </li>
              <li>We do not build user profiles, retarget you, or sync data with social platforms.</li>
              <li>We do not store payment information — we never take payments directly.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Cookies">
            <p>
              The site uses only strictly necessary cookies (for things like remembering that you
              closed a banner). No marketing or analytics cookies. If we ever add anything that
              requires consent, we will ask first.
            </p>
          </PolicySection>

          <PolicySection title="Your rights (GDPR)">
            <p>
              If you are in the EU/EEA, you have the right to access, correct, or delete your data.
              Practically: if you are subscribed and want out, the unsubscribe link in every
              newsletter does the job instantly. If you want a copy of what we have on you or want
              us to delete it, email{' '}
              <a href="mailto:hello@theyogasensei.com">hello@theyogasensei.com</a> and it is done
              within a few days.
            </p>
          </PolicySection>

          <PolicySection title="Third parties we rely on">
            <ul>
              <li>Resend (email delivery) — resend.com</li>
              <li>Vercel (hosting, analytics, performance monitoring) — vercel.com</li>
              <li>Convex (database) — convex.dev</li>
              <li>Amazon (if you click an affiliate link) — amazon.com</li>
            </ul>
            <p>
              Each of these has its own privacy policy. Following an affiliate link to Amazon (or
              any retailer) means that retailer&apos;s privacy policy applies once you land on their
              site.
            </p>
          </PolicySection>

          <PolicySection title="Children">
            <p>
              This site is not directed at children under 16. We do not knowingly collect data from
              anyone under 16.
            </p>
          </PolicySection>

          <PolicySection title="Changes">
            <p>
              If we change this policy, the “last updated” date at the top changes too. Significant
              changes will be noted in the newsletter.
            </p>
          </PolicySection>

          <PolicySection title="Contact">
            <p>
              Marvin Smit<br />
              <a href="mailto:hello@theyogasensei.com">hello@theyogasensei.com</a>
              <br />
              The Netherlands
            </p>
            <p>
              This site is operated by an individual based in the Netherlands. Any disputes are
              governed by Dutch law.
            </p>
          </PolicySection>
        </div>
      </Container>
    </section>
  )
}

function PolicySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 text-sm leading-7 text-[color:var(--color-ink-soft)] [&_a]:underline [&_a]:underline-offset-4 [&_h3]:pt-2 [&_h3]:font-semibold [&_h3]:text-[color:var(--color-ink)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
      <h2 className="font-serif text-2xl">{title}</h2>
      {children}
    </section>
  )
}
