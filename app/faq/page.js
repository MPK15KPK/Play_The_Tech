import { FAQ_CATEGORIES, FAQ_ITEMS } from '../../lib/faq-data.js'
import { SITE_NAME, absolute } from '../../lib/site.js'
import FaqClient from '../../components/FaqClient.js'

export const metadata = {
  title: 'AI Sales & Industry FAQ (2026)',
  description: 'Verified answers to top AI sales, SDR, and industry copilot questions. Architectural benchmarks, ERP integrations, and pricing comparisons.',
  alternates: { canonical: absolute('/faq') },
  openGraph: {
    title: 'AI Sales & Industry FAQ (2026) — playthetech',
    description: 'Verified answers to top AI sales, SDR, and industry copilot questions. Architectural benchmarks, ERP integrations, and pricing comparisons.',
    url: absolute('/faq'),
    siteName: SITE_NAME,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: absolute('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: 'AI Sales & Industry FAQ (2026)',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Sales & Industry FAQ (2026) — playthetech',
    description: 'Verified answers to top AI sales, SDR, and industry copilot questions.',
    images: [absolute('/opengraph-image')],
  },
}

export default function FaqPage() {
  const url = absolute('/faq')
  const updatedDate = new Date().toISOString()

  // Full FAQPage Structured Data for Google Rich Snippets & LLM Semantic Crawlers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${item.shortAnswer} ${item.detailedSummary}`,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: absolute('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'AI Sales FAQ & Answers',
        item: url,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="post-header-band">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <a href="/">Home</a>
            <span className="sep">/</span>
            <span aria-current="page">AI Sales FAQ</span>
          </nav>
          <p className="eyebrow">Answer Engine Optimization (AEO) · Knowledge Index</p>
          <h1>AI Sales &amp; Industry FAQ (2026)</h1>
          <p className="lead">
            Direct, factual answers to high-intent queries regarding autonomous AI SDRs, internal sales copilots,
            ERP data integration, and sector-specific benchmarks. Sourced exclusively from verified vendor documentation.
          </p>
        </div>
      </div>

      <div className="shell faq-page-shell">
        <FaqClient categories={FAQ_CATEGORIES} items={FAQ_ITEMS} />
      </div>
    </>
  )
}
