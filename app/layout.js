import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, siteUrl } from '../lib/site.js'
import Header from '../components/Header.js'
import Motion from '../components/Motion.js'
import { INDUSTRIES, COMPARISONS } from '../components/nav-data.js'

// Plus Jakarta Sans: warm, refined, human and legible modern typography.
// JetBrains Mono: clean, modern monospace for code tokens and technical data.
const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
})

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE_NAME} — tool comparisons`, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  openGraph: { siteName: SITE_NAME, type: 'website', locale: 'en_GB' },
  robots: { index: true, follow: true },
}

export const viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  const cls = `${sans.variable} ${mono.variable}`
  const year = new Date().getFullYear()

  return (
    <html lang="en" className={cls}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>

        <Header />
        <Motion />

        {/* Pages supply their own .shell so a band can run full width when one is needed. */}
        <main id="main" className="page-enter">{children}</main>

        <footer className="site-footer">
          <div className="shell footer-grid">
            <div className="footer-col footer-col-wide">
              <p className="footer-brand">playthetech<span>.</span></p>
              <p>
                Independent B2B software and AI sales agent comparisons. Prices,
                limits, and features come from vendor pricing pages, vendor
                documentation, or the product itself — never from other comparison
                sites. Where a vendor does not publish a figure, the table says so
                rather than estimating.
              </p>
            </div>

            <div className="footer-nav-group">
              <nav className="footer-col" aria-label="Industry guides">
                <strong>Industry guides</strong>
                <ul>
                  {INDUSTRIES.map((ind) => (
                    <li key={ind.href}><a href={ind.href}>{ind.name}</a></li>
                  ))}
                </ul>
              </nav>

              <nav className="footer-col" aria-label="Comparisons">
                <strong>Comparisons</strong>
                <ul>
                  {COMPARISONS.map((c) => (
                    <li key={c.href}><a href={c.href}>{c.name}</a></li>
                  ))}
                  <li><a href="/request">Request a comparison</a></li>
                </ul>
              </nav>
            </div>

            <div className="footer-col footer-contact-box">
              <strong>Contact &amp; Inquiries</strong>
              <p>
                Corrections and comparison requests go to{' '}
                <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>, and are read
                by the editorial team.
              </p>
            </div>
          </div>

          <div className="shell footer-base">
            <span>© {year} {SITE_NAME}</span>
            <span>{SITE_DESCRIPTION}</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
