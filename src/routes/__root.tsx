import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ConvexProvider } from 'convex/react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { buildRootHead, SITE_URL } from '#/lib/seo/head'
import { Header } from '#/components/site/header'
import { Footer } from '#/components/site/footer'
import { convex } from '#/lib/convex/client'

import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => {
    const rootHead = buildRootHead(SITE_URL)
    return {
      meta: rootHead.meta,
      links: [...rootHead.links, { rel: 'stylesheet', href: appCss }],
      scripts: rootHead.scripts,
    }
  },
  shellComponent: RootDocument,
})

function RootDocument() {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        {/* WCAG 2.4.1 skip-to-content link — visible only when focused */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[color:var(--color-olive)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:uppercase focus:tracking-[0.18em] focus:text-[color:var(--color-bg)] focus:shadow-lg focus:outline-none"
        >
          Skip to content
        </a>
        <ConvexProvider client={convex}>
          <Header />
          <main id="main">
            <Outlet />
          </main>
          <Footer />
        </ConvexProvider>
        {import.meta.env.DEV && (
          <TanStackDevtools
            config={{ position: 'bottom-right' }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        )}
        {/* Cookieless analytics — no consent banner required */}
        <Analytics />
        <SpeedInsights />
        <Scripts />
      </body>
    </html>
  )
}
