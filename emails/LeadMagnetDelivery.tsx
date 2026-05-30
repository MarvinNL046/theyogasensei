import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'

export interface LeadMagnetDeliveryProps {
  leadMagnet: string
  downloadUrl: string
  unsubscribeUrl: string
}

const styles = {
  body: { backgroundColor: '#fafaf9', fontFamily: 'system-ui, -apple-system, sans-serif' },
  container: { margin: '0 auto', padding: '24px', maxWidth: '560px' },
  h1: { fontSize: '24px', fontWeight: 600, color: '#1c1917', marginBottom: '16px' },
  body_text: { fontSize: '16px', lineHeight: '1.6', color: '#44403c' },
  button: {
    backgroundColor: '#c45a3e',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 600,
    display: 'inline-block',
    fontSize: '16px',
  },
  hr: { border: 'none', borderTop: '1px solid #e7e5e4', margin: '32px 0' },
  fine: { fontSize: '13px', color: '#78716c', lineHeight: '1.5' },
}

const MAGNET_TITLES: Record<string, string> = {
  '30-day-beginner-path': 'The 30-Day Beginner Yoga Path',
  'mat-cheatsheet': "The Yoga Mat Buyer's Cheat Sheet",
  'style-quiz-results': 'Which Yoga Style Fits You — Quiz Results',
}

export function LeadMagnetDelivery({
  leadMagnet,
  downloadUrl,
  unsubscribeUrl,
}: LeadMagnetDeliveryProps) {
  const title = MAGNET_TITLES[leadMagnet] ?? 'Your download'
  return (
    <Html>
      <Head />
      <Preview>{`Your download is ready: ${title}`}</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading as="h1" style={styles.h1}>
            {title}
          </Heading>
          <Text style={styles.body_text}>
            Here is your download. Save the PDF locally — the link works for 30 days.
          </Text>
          <Section style={{ margin: '24px 0' }}>
            <Link href={downloadUrl} style={styles.button}>
              Download the PDF
            </Link>
          </Section>
          <Text style={styles.fine}>
            Or paste this link into your browser:{' '}
            <Link href={downloadUrl} style={{ color: '#843828' }}>
              {downloadUrl}
            </Link>
          </Text>
          <Hr style={styles.hr} />
          <Text style={styles.fine}>
            Hit reply if the link does not work — that goes straight to my inbox.
          </Text>
          <Text style={styles.fine}>
            <Link href={unsubscribeUrl} style={{ color: '#78716c', textDecoration: 'underline' }}>
              Unsubscribe
            </Link>{' '}
            · The Yoga Sensei · hello@theyogasensei.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default LeadMagnetDelivery
