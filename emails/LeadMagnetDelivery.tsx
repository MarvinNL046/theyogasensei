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

export interface LeadMagnetDeliveryProps {
  siteUrl: string
  leadMagnet: string
  downloadUrl: string
  unsubscribeUrl: string
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
  insideRow: { padding: '14px 0', borderBottom: `1px solid ${c.border}` },
  insideTitle: {
    margin: 0,
    fontSize: '17px',
    lineHeight: '1.3',
    color: c.ink,
    fontFamily: SERIF,
    fontWeight: 600,
  },
  insideDesc: { margin: '3px 0 0', fontSize: '13px', lineHeight: '1.5', color: c.inkMuted, fontFamily: SANS },
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
  fine: { margin: '0 0 8px', fontSize: '13px', lineHeight: '1.6', color: c.inkMuted, fontFamily: SANS },
  fineLink: { color: c.clay, textDecoration: 'underline', wordBreak: 'break-all' as const },
  footer: { backgroundColor: c.olive, padding: '28px 36px' },
  footerText: { margin: '0 0 6px', fontSize: '13px', lineHeight: '1.6', color: c.oliveText, fontFamily: SANS },
  footerFine: { margin: 0, fontSize: '12px', lineHeight: '1.6', color: c.oliveMuted, fontFamily: SANS },
  footerLink: { color: c.oliveText, textDecoration: 'underline' },
}

const MAGNET_TITLES: Record<string, string> = {
  'yoga-for-beginners-starter': 'The Yoga for Beginners Starter Guide',
  '30-day-beginner-path': 'The 30-Day Beginner Yoga Path',
  'mat-cheatsheet': "The Yoga Mat Buyer's Cheat Sheet",
  'style-quiz-results': 'Which Yoga Style Fits You — Quiz Results',
}

const WHATS_INSIDE: Record<string, Array<{ title: string; desc: string }>> = {
  'yoga-for-beginners-starter': [
    {
      title: 'The gear worth buying',
      desc: 'Seven mats, blocks and straps I actually trust — with who each one is for.',
    },
    {
      title: 'Eight foundational poses',
      desc: 'Step-by-step, with the common mistakes and when to skip the pose.',
    },
    {
      title: 'A 10-minute morning routine',
      desc: 'A simple two-week plan to make it a habit, not a chore.',
    },
  ],
}

export function LeadMagnetDelivery({
  siteUrl,
  leadMagnet,
  downloadUrl,
  unsubscribeUrl,
}: LeadMagnetDeliveryProps) {
  const title = MAGNET_TITLES[leadMagnet] ?? 'Your free guide'
  const inside = WHATS_INSIDE[leadMagnet] ?? []
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
      <Preview>{`Your download is ready — ${title}.`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.card}>
          <Img
            src={`${siteUrl}/images/brand/newsletter-bonsai.png`}
            alt="A bonsai on a wooden table in a quiet Japanese studio"
            width={600}
            style={styles.hero}
          />

          <Section style={styles.pad} className="ys-pad">
            <Text style={styles.eyebrow}>Your free guide</Text>
            <Heading as="h1" style={styles.h1} className="ys-h1">
              {title}
            </Heading>
            <Text style={styles.p}>
              Here it is — the calm, no-fluff start I wish I had when I taught my first beginner
              class. Tap below to open it, then save it to your device so it is always one tap away.
            </Text>

            <Section style={{ padding: '8px 0 4px' }}>
              <Button href={downloadUrl} style={styles.button}>
                Open the guide
              </Button>
            </Section>

            {inside.length ? (
              <>
                <Text style={styles.label}>What is inside</Text>
                {inside.map((item) => (
                  <Section key={item.title} style={styles.insideRow}>
                    <Text style={styles.insideTitle}>{item.title}</Text>
                    <Text style={styles.insideDesc}>{item.desc}</Text>
                  </Section>
                ))}
              </>
            ) : null}

            <Section style={{ padding: '24px 0 8px' }}>
              <Text style={styles.fine}>
                Button not working? Paste this into your browser:
              </Text>
              <Text style={styles.fine}>
                <Link href={downloadUrl} style={styles.fineLink}>
                  {downloadUrl}
                </Link>
              </Text>
              <Text style={styles.fine}>
                Or just hit reply if anything is off — that goes straight to my inbox.
              </Text>
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

export default LeadMagnetDelivery
