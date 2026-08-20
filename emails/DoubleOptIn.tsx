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

export interface DoubleOptInProps {
  confirmUrl: string
  leadMagnet?: string
}

const styles = {
  body: {
    backgroundColor: '#fafaf9',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  container: { margin: '0 auto', padding: '24px', maxWidth: '560px' },
  h1: {
    fontSize: '24px',
    fontWeight: 600,
    color: '#1c1917',
    marginBottom: '16px',
  },
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

export function DoubleOptIn({ confirmUrl, leadMagnet }: DoubleOptInProps) {
  return (
    <Html>
      <Head />
      <Preview>
        One click to confirm your subscription to The Yoga Sensei.
      </Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading as="h1" style={styles.h1}>
            One click to confirm
          </Heading>
          <Text style={styles.body_text}>
            Thanks for subscribing to The Yoga Sensei. Confirm your email and we
            will start sending the weekly practice update.
            {leadMagnet
              ? ' Your free download arrives right after you confirm.'
              : ''}
          </Text>
          <Section style={{ margin: '24px 0' }}>
            <Link href={confirmUrl} style={styles.button}>
              Confirm my subscription
            </Link>
          </Section>
          <Text style={styles.fine}>
            Or paste this link into your browser:{' '}
            <Link href={confirmUrl} style={{ color: '#843828' }}>
              {confirmUrl}
            </Link>
          </Text>
          <Hr style={styles.hr} />
          <Text style={styles.fine}>
            You are receiving this because someone entered your email at
            theyogasensei.com. If that was not you, ignore this email — without
            confirmation, nothing happens.
          </Text>
          <Text style={styles.fine}>
            The Yoga Sensei · hello@theyogasensei.com
          </Text>
        </Container>
      </Body>
    </Html>
  )
}

export default DoubleOptIn
