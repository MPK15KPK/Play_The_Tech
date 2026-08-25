import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, siteUrl, absolute } from '../lib/site.js'
import Header from '../components/Header.js'
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
  weight: ['400'],
  display: 'optional',
  variable: '--font-mono',
})

export const metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE_NAME} — tool comparisons`, template: `%s — ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
  },
  openGraph: {
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_GB',
    title: `${SITE_NAME} — Independent AI & B2B Tool Comparisons`,
    description: SITE_DESCRIPTION,
    url: siteUrl(),
    images: [
      {
        url: absolute('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — Independent AI & B2B Tool Comparisons`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Independent AI & B2B Tool Comparisons`,
    description: SITE_DESCRIPTION,
    images: [absolute('/opengraph-image')],
  },
  robots: { index: true, follow: true },
  verification: {
    google: 'googlee9488b1530d77b4b',
  },
}

export const viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  const cls = `${sans.variable} ${mono.variable} motion-on`
  const year = new Date().getFullYear()

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: ['Play The Tech', 'playthetech.com', 'PlayTheTech Benchmarks'],
    url: siteUrl(),
    description: SITE_DESCRIPTION,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl(),
      logo: {
        '@type': 'ImageObject',
        url: absolute('/icon-512x512.png'),
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl()}/#comparisons`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  const siteNavigationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Best AI Sales Agents (2026)',
        description: 'Ranked benchmark of leading autonomous AI sales agents',
        url: absolute('/compare/best-ai-sales-agents-2026'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Salezx vs 11x',
        description: 'Autonomous AI SDR vs sales copilot comparison',
        url: absolute('/compare/ai-sdr-vs-sales-copilot'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'HubSpot vs Salesforce',
        description: 'Mid-market CRM vs enterprise sales cloud',
        url: absolute('/compare/hubspot-vs-salesforce'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Microsoft Copilot vs Agentforce',
        description: 'Ecosystem comparison for enterprise revenue teams',
        url: absolute('/compare/microsoft-365-copilot-vs-salesforce-agentforce'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Industry Benchmarks',
        description: 'Sector-specific AI sales benchmarks and ERP integration guides',
        url: absolute('/industry'),
      },
    ],
  }

  return (
    <html lang="en" className={cls}>
      <head>
        <link
          rel="preload"
          href="/logo.webp"
          as="image"
          type="image/webp"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteNavigationSchema) }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>

        <Header />

        {/* Pages supply their own .shell so a band can run full width when one is needed. */}
        <main id="main" className="page-enter">{children}</main>

        <footer className="site-footer">
          <div className="shell footer-grid">
            <div className="footer-col footer-col-wide">
              <p className="footer-brand">
                PLAYTHE TECH
                <span className="footer-kicker">— BENCHMARKS —</span>
              </p>
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
