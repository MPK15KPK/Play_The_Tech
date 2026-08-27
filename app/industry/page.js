import { getAllIndustries } from '../../lib/industries.js'
import { SITE_NAME, absolute } from '../../lib/site.js'
import {
  FactoryIcon,
  CloudTechIcon,
  BriefcaseIcon,
  MedicalIcon,
} from '../../components/Icons.js'

export const metadata = {
  title: 'AI Sales Tools Ranked by Industry (2026)',
  description: 'Explore independent AI sales tool and copilot comparisons tailored to your industry sector. Compare ERP integration and pricing.',
  alternates: { canonical: absolute('/industry') },
  openGraph: {
    title: 'AI Sales Tools Ranked by Industry (2026)',
    description: 'Explore independent AI sales tool and copilot comparisons tailored to your industry sector. Compare ERP integration and pricing.',
    url: absolute('/industry'),
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    images: [
      {
        url: absolute('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: 'AI Sales Tools Ranked by Industry (2026)',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Sales Tools Ranked by Industry (2026)',
    description: 'Explore independent AI sales tool and copilot comparisons tailored to your industry sector.',
    images: [absolute('/opengraph-image')],
  },
}

export default function IndustryIndexPage() {
  const industries = getAllIndustries()

  const iconComponents = {
    'manufacturing-distribution': FactoryIcon,
    'b2b-saas': CloudTechIcon,
    'professional-services': BriefcaseIcon,
    'healthcare-medtech': MedicalIcon,
  }

  return (
    <>
      <div className="post-header-band">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumbs">
            <a href="/">Home</a>
            <span className="sep">/</span>
            <span aria-current="page">Industry Directory</span>
          </nav>
          <p className="eyebrow">Enterprise Sector Benchmarks</p>
          <h1>AI Sales Tools Ranked by Industry (2026)</h1>
          <p className="lead">
            Generic software rankings fail because requirements diverge across sectors.
            Select your industry below for architectural rankings, ERP/CRM compatibility matrices, and verified pricing models.
          </p>
        </div>
      </div>

      <div className="shell industry-hub-shell">
        <div className="industry-hub-grid">
          {industries.map((ind) => {
            const IconComp = iconComponents[ind.slug] || FactoryIcon
            return (
              <a key={ind.slug} className="industry-hub-card" href={`/industry/${ind.slug}`} data-reveal>
                <div className="industry-card-top">
                  <div className="industry-card-icon-wrap">
                    <IconComp size={22} className="industry-svg-icon" />
                  </div>
                  <span className="industry-top-badge">Top Pick: {ind.topPick}</span>
                </div>
                <h2 className="industry-card-title">{ind.name}</h2>
                <p className="industry-card-desc">{ind.heroSummary}</p>
                <div className="industry-card-meta">
                  <span>{ind.rankings.length} evaluated platforms</span>
                  <span className="industry-arrow">Read full benchmark →</span>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </>
  )
}
