import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export interface WelcomeProps {
  siteUrl: string
  unsubscribeUrl: string
  leadMagnet?: string
}

const SERIF = '"Cormorant Garamond", Georgia, "Times New Roman", serif'
const SANS =
  'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

const c = {
  bg: '#efe9dd',
  card: '#fffdf8',
  border: '#e8dfce',
  ink: '#211c16',
  inkSoft: '#4f483d',
  inkMuted: '#938876',
  clay: '#a94f2e',
  olive: '#363a2b',
  oliveText: '#d9d3c4',
  oliveMuted: '#a9a392',
}

const styles = {
  body: { backgroundColor: c.bg, margin: 0, padding: '24px 12px', fontFamily: SANS },
  card: {
    margin: '0 auto',
    maxWidth: '600px',
    width: '100%',
    backgroundColor: c.card,
    border: `1px solid ${c.border}`,
    borderRadius: '16px',
    overflow: 'hidden',
  },
  hero: { width: '100%', height: 'auto', display: 'block', objectFit: 'cover' as const },
  pad: { padding: '36px 36px 8px' },
  eyebrow: {
    margin: '0 0 14px',
    fontSize: '11px',
    letterSpacing: '0.22em',
    textTransform: 'uppercase' as const,
    color: c.clay,
    fontFamily: SANS,
    fontWeight: 600,
  },
  h1: {
    margin: '0 0 18px',
    fontSize: '34px',
    lineHeight: '1.1',
    fontWeight: 500,
    color: c.ink,
    fontFamily: SERIF,
  },
  p: { margin: '0 0 16px', fontSize: '16px', lineHeight: '1.65', color: c.inkSoft, fontFamily: SANS },
  label: {
    margin: '28px 0 4px',
    fontSize: '11px',
    letterSpacing: '0.2em',
    textTransform: 'uppercase' as const,
    color: c.inkMuted,
    fontFamily: SANS,
    fontWeight: 600,
  },
  linkRow: { padding: '14px 0', borderBottom: `1px solid ${c.border}` },
  linkTitle: {
    fontSize: '17px',
    lineHeight: '1.3',
    color: c.clay,
    fontFamily: SERIF,
    fontWeight: 600,
    textDecoration: 'none',
  },
  linkDesc: { margin: '3px 0 0', fontSize: '13px', lineHeight: '1.5', color: c.inkMuted, fontFamily: SANS },
  button: {
    backgroundColor: c.clay,
    color: '#fffdf8',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.16em',
    textTransform: 'uppercase' as const,
    textDecoration: 'none',
    padding: '14px 26px',
    borderRadius: '999px',
    fontFamily: SANS,
  },
  footer: { backgroundColor: c.olive, padding: '28px 36px' },
  footerText: { margin: '0 0 6px', fontSize: '13px', lineHeight: '1.6', color: c.oliveText, fontFamily: SANS },
  footerFine: { margin: 0, fontSize: '12px', lineHeight: '1.6', color: c.oliveMuted, fontFamily: SANS },
  footerLink: { color: c.oliveText, textDecoration: 'underline' },
}

const START_HERE = [
  {
    href: '/guides/how-to-choose-a-yoga-mat',
    title: 'How to choose a yoga mat',
    desc: 'The complete guide — thickness, grip, material, and what actually matters.',
  },
  {
    href: '/guides/best-yoga-mats-2026',
    title: 'Best yoga mats for 2026',
    desc: 'The shortlist, with who each one is genuinely for.',
  },
  {
    href: '/guides/how-to-clean-a-yoga-mat',
    title: 'How to clean a yoga mat',
    desc: 'Keep the grip, skip the funk — without wrecking the surface.',
  },
]

export function Welcome({ siteUrl, unsubscribeUrl, leadMagnet }: WelcomeProps) {
  return (
    <Html>
      <Head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <style>{`
          @media only screen and (max-width: 480px) {
            .ys-pad { padding: 26px 22px 4px !important; }
            .ys-footer { padding: 24px 22px !important; }
            .ys-h1 { font-size: 30px !important; }
          }
        `}</style>
      </Head>
      <Preview>You are in. One calm email a week — here is where to start.</Preview>
      <Body style={styles.body}>
        <Container style={styles.card}>
          <Img
            src={`${siteUrl}/images/brand/newsletter-bonsai.png`}
            alt="A bonsai on a wooden table in a quiet Japanese studio"
            width={600}
            style={styles.hero}
          />

          <Section style={styles.pad} className="ys-pad">
            <Text style={styles.eyebrow}>The Yoga Sensei</Text>
            <Heading as="h1" style={styles.h1} className="ys-h1">
              You are in.
            </Heading>
            <Text style={styles.p}>
              Welcome. One short email a week — a new guide, an honest gear note, and the one
              thing I am testing right now. No daily blasts, no fluff, no selling you something
              in every line.
            </Text>
            {leadMagnet ? (
              <Text style={styles.p}>
                Your free download lands in a separate email in the next minute or two — look for
                the subject line &ldquo;Your download from The Yoga Sensei&rdquo;.
              </Text>
            ) : null}

            <Text style={styles.label}>Start here</Text>
            {START_HERE.map((item) => (
              <Section key={item.href} style={styles.linkRow}>
                <Link href={`${siteUrl}${item.href}`} style={styles.linkTitle}>
                  {item.title}
                </Link>
                <Text style={styles.linkDesc}>{item.desc}</Text>
              </Section>
            ))}

            <Section style={{ padding: '28px 0 32px' }}>
              <Button href={`${siteUrl}/guides`} style={styles.button}>
                Browse all guides
              </Button>
            </Section>
          </Section>

          <Section style={styles.footer} className="ys-footer">
            <Text style={styles.footerText}>
              The Yoga Sensei · written by Marvin, a long-time practitioner.
            </Text>
            <Text style={styles.footerFine}>
              <Link href={unsubscribeUrl} style={styles.footerLink}>
                Unsubscribe
              </Link>{' '}
              in one click, any time — no questions. We never share your address.
              <br />
              hello@theyogasensei.com
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export default Welcome
