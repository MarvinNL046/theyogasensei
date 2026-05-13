import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { ConvexProvider } from 'convex/react'
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
        <Scripts />
      </body>
    </html>
  )
}
