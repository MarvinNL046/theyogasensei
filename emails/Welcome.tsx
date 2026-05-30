import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components'

export interface WelcomeProps {
  siteUrl: string
  leadMagnet?: string
}

const styles = {
  body: { backgroundColor: '#fafaf9', fontFamily: 'system-ui, -apple-system, sans-serif' },
  container: { margin: '0 auto', padding: '24px', maxWidth: '560px' },
  h1: { fontSize: '24px', fontWeight: 600, color: '#1c1917', marginBottom: '16px' },
  body_text: { fontSize: '16px', lineHeight: '1.6', color: '#44403c' },
  hr: { border: 'none', borderTop: '1px solid #e7e5e4', margin: '32px 0' },
  fine: { fontSize: '13px', color: '#78716c', lineHeight: '1.5' },
}

export function Welcome({ siteUrl, leadMagnet }: WelcomeProps) {
  return (
    <Html>
      <Head />
      <Preview>You are in. Here is what to expect from The Yoga Sensei.</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading as="h1" style={styles.h1}>
            You are in
          </Heading>
          <Text style={styles.body_text}>
            Welcome to The Yoga Sensei. One short email a week — new articles, gear notes, and
            one thing I am testing right now. No daily blasts.
          </Text>
          {leadMagnet ? (
            <Text style={styles.body_text}>
              Your free download lands in a separate email in the next minute or so. Look for the
              subject line "Your download from The Yoga Sensei".
            </Text>
          ) : null}
          <Text style={styles.body_text}>A few good places to start:</Text>
          <Text style={styles.body_text}>
            ·{' '}
            <Link href={`${siteUrl}/guides/how-to-choose-a-yoga-mat`} style={{ color: '#843828' }}>
              How to choose a yoga mat — the complete guide
            </Link>
            <br />·{' '}
            <Link href={`${siteUrl}/guides/best-yoga-mats-2026`} style={{ color: '#843828' }}>
              Best yoga mats for 2026
            </Link>
            <br />·{' '}
            <Link
              href={`${siteUrl}/guides/how-to-clean-a-yoga-mat`}
              style={{ color: '#843828' }}
            >
              How to clean a yoga mat
            </Link>
          </Text>
          <Hr style={styles.hr} />
          <Text style={styles.fine}>
            Unsubscribe at any time from the footer of any email. We never share your address.
          </Text>
          <Text style={styles.fine}>The Yoga Sensei · hello@theyogasensei.com</Text>
        </Container>
      </Body>
    </Html>
  )
}

export default Welcome
