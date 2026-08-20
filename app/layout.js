import { Geist, Geist_Mono } from 'next/font/google'
import Logo from '../components/Logo.js'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, siteUrl } from '../lib/site.js'

// Geist for the whole interface. It is a contemporary grotesque drawn for
// product UI — high x-height, unfussy at 13px, and not Inter. Geist Mono
// carries every price, date and figure, so numbers still line up in a column.
const sans = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--geist-sans',
})
const mono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--geist-mono',
})

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE_NAME} — tool comparisons`, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: { siteName: SITE_NAME, type: 'website', locale: 'en_GB' },
  robots: { index: true, follow: true },
}

export const viewport = { themeColor: '#0B1220' }

export default function RootLayout({ children }) {
  const cls = `${sans.variable} ${mono.variable}`
  return (
    <html lang="en" className={cls}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>

        <header className="site-header">
          <div className="shell">
            <div className="masthead">
              <a className="wordmark" href="/" aria-label="playthetech, home">
                <Logo />
              </a>
              <p className="masthead-note">
                Prices and limits come from vendor documentation, with the date we
                checked them printed on every table.
              </p>
            </div>
            {/* Real hrefs, server-rendered. Nothing here links to /admin. */}
            <nav className="site-nav" aria-label="Sections">
              <a href="/">Comparisons</a>
              <a className="cta" href="/request">Request a comparison</a>
            </nav>
          </div>
        </header>

        {/* Pages supply their own .shell so a band can run full width when one is needed. */}
        <main id="main">{children}</main>

        <footer className="site-footer">
          <div className="shell">
            <p>
              <strong>Sourcing</strong> Prices, limits, and features come from vendor
              pricing pages, vendor documentation, or the product itself — never from
              other comparison sites. Where a vendor does not publish a figure, the
              table says so rather than estimating.
            </p>
            <p>
              <strong>Contact</strong> Corrections and comparison requests go to{' '}
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, and are read by
              the person who wrote the page.
            </p>
            {/* GUARDRAILS R1: the independence and ownership statement is site-wide
                furniture, not per-post. Shared ownership with a tool under review
                is disclosed above that post's table as well. */}
            <p>
              <strong>Independence</strong> No relation to Playtech plc. We take no
              payment from vendors for coverage or ranking position, and vendors do not
              review posts before publication.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
