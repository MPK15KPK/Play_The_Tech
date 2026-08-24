import { ImageResponse } from 'next/og'
import { getIndustry } from '../../../lib/industries.js'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }) {
  const { slug } = await params
  const ind = getIndustry(slug)

  const title = ind?.title || 'Industry AI Sales Benchmark 2026'
  const sector = ind?.name || 'Enterprise Sector'
  const topPick = ind?.topPick || 'Top Evaluated Platform'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 80px',
          background: 'linear-gradient(135deg, #0B1220 0%, #152238 60%, #1A2E4C 100%)',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#FFFFFF',
        }}
      >
        {/* Top header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #1B5FE8 0%, #0D47A1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '24px',
                fontWeight: '900',
              }}
            >
              ▶
            </div>
            <div style={{ display: 'flex', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              playthetech<span style={{ color: '#38BDF8' }}>.</span>
            </div>
          </div>
          <div
            style={{
              padding: '6px 18px',
              borderRadius: '999px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38BDF8',
              fontSize: '16px',
              fontWeight: '700',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            Sector Benchmark 2026
          </div>
        </div>

        {/* Industry Title and Top Pick */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: '1000px' }}>
          <div
            style={{
              fontSize: title.length > 50 ? '46px' : '54px',
              fontWeight: '800',
              lineHeight: '1.2',
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              fontSize: '22px',
              color: '#94A3B8',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#38BDF8', fontWeight: '700' }}>Top Pick:</span>
              <span style={{ color: '#FFFFFF', fontWeight: '700' }}>{topPick}</span>
            </div>
            <span>•</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#38BDF8', fontWeight: '700' }}>Sector:</span>
              <span>{sector}</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '40px', fontSize: '18px', color: '#94A3B8' }}>
            <span>✓ Verified against vendor documentation</span>
            <span>✓ Zero sponsored ranking bias</span>
          </div>
          <div style={{ color: '#38BDF8', fontSize: '20px', fontWeight: '700' }}>
            playthetech.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
