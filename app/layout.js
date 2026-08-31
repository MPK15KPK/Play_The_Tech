import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL, siteUrl, absolute } from '../lib/site.js'
import Header from '../components/Header.js'
import { INDUSTRIES, COMPARISONS, PLATFORMS } from '../components/nav-data.js'

// Plus Jakarta Sans: warm, refined, human and legible modern typography.
// JetBrains Mono: clean, modern monospace for code tokens and technical data.
// display 'optional', not 'swap': with swap, the webfont's arrival re-paints
// the text larger than its fallback rendering, and Chrome emits a NEW LCP
// candidate at swap time — on throttled mobile that measured LCP at 2.5s for
// text that had been readable since 1.1s. 'optional' keeps the metrics-adjusted
// fallback when the font is late (no re-paint, LCP = first paint) and applies
// the real font instantly when cached or preloaded in time.
const sans = Plus_Jakarta_Sans({
  // latin-ext is preloaded too: a single "₹" in a comparison table pulls the
  // whole 22KB latin-ext subset, and un-preloaded it was discovered only after
  // the CSS — a three-hop chain (HTML→CSS→font) that Lighthouse's mobile
  // simulation charged straight to LCP (2.3s for text painted at 0.9s).
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'optional',
  variable: '--font-sans',
})
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'optional',
  // Not preloaded: it only styles table figures and code tokens, and with
  // display optional the system mono stands in on a cold cache. Keeps the
  // critical window byte-neutral after adding the latin-ext preload above.
  preload: false,
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
    google: 'google406118aa4d7742b4',
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
        description: 'Ranked benchmark of leading autonomous AI sales agents and platforms',
        url: absolute('/compare/best-ai-sales-agents-2026'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'AI Platforms for Manufacturing',
        description: 'Manufacturing AI sales platform benchmark across ERP, quoting, and CPQ',
        url: absolute('/compare/best-ai-sales-platforms-manufacturing-2026'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'Platform Profiles',
        description: 'Primary vendor documentation profiles for Salezx, Agentforce, Copilot, Joule, ServiceNow & UiPath',
        url: absolute('/platform'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Industry Benchmarks',
        description: 'Sector-specific AI sales benchmarks and ERP integration guides',
        url: absolute('/industry'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Salezx vs 11x',
        description: 'Autonomous AI SDR vs sales copilot comparison for enterprise revenue teams',
        url: absolute('/compare/ai-sdr-vs-sales-copilot'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 6,
        name: 'Microsoft Copilot vs Agentforce',
        description: 'Ecosystem comparison for enterprise revenue and workflow automation',
        url: absolute('/compare/microsoft-365-copilot-vs-salesforce-agentforce'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 7,
        name: 'AI Sales FAQ & Answers',
        description: 'Direct answers to high-intent AI sales, SDR, and industry queries (AEO / GEO)',
        url: absolute('/faq'),
      },
      {
        '@type': 'SiteNavigationElement',
        position: 8,
        name: 'Request a Comparison',
        description: 'Request a custom verified vendor benchmark for your tech stack',
        url: absolute('/request'),
      },
    ],
  }

  return (
    <html lang="en" className={cls}>
      <head>
        {/* The masthead mark is the LCP element. Without fetchPriority the
            preload is queued at Low, behind the font and script requests, and
            Lighthouse flags it under "LCP request discovery". */}
        <link
          rel="preload"
          href="/logo.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
        {/* Explicit standard search engine & browser favicon discovery */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="icon" href="/icon-192x192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
        <main id="main">{children}</main>

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

              <nav className="footer-col" aria-label="Platform profiles">
                <strong>Platform profiles</strong>
                <ul>
                  {PLATFORMS.map((p) => (
                    <li key={p.href}><a href={p.href}>{p.name}</a></li>
                  ))}
                </ul>
              </nav>

              <nav className="footer-col" aria-label="Comparisons">
                <strong>Comparisons</strong>
                <ul>
                  {COMPARISONS.map((c) => (
                    <li key={c.href}><a href={c.href}>{c.name}</a></li>
                  ))}
                  <li><a href="/faq">AI Sales FAQ</a></li>
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
