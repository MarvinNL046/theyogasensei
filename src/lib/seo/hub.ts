const SITE_URL = 'https://www.theyogasensei.com'

export function buildHubHead({
  title,
  description,
  path,
  name,
}: {
  title: string
  description: string
  path: string
  name: string
}) {
  const url = `${SITE_URL}${path}`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      {
        property: 'og:title',
        content: title.replace(' | The Yoga Sensei', ''),
      },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: url },
    ],
    links: [{ rel: 'canonical', href: url }],
    scripts: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name,
          description,
          url,
          isPartOf: {
            '@type': 'WebSite',
            name: 'The Yoga Sensei',
            url: SITE_URL,
          },
          publisher: {
            '@type': 'Organization',
            name: 'The Yoga Sensei',
            url: SITE_URL,
          },
        }),
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: `${SITE_URL}/`,
            },
            { '@type': 'ListItem', position: 2, name },
          ],
        }),
      },
    ],
  }
}
