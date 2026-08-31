import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'
export const alt = 'playthetech — AI & B2B Software Comparisons'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
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
        {/* Top brand header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #1B5FE8 0%, #0D47A1 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: '28px',
                fontWeight: '900',
              }}
            >
              ▶
            </div>
            <div style={{ display: 'flex', fontSize: '36px', fontWeight: '800', letterSpacing: '-0.03em', color: '#FFFFFF' }}>
              playthetech<span style={{ color: '#38BDF8' }}>.</span>
            </div>
          </div>
          <div
            style={{
              padding: '8px 20px',
              borderRadius: '999px',
              background: 'rgba(56, 189, 248, 0.15)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              color: '#38BDF8',
              fontSize: '18px',
              fontWeight: '700',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            AI Benchmark 2026
          </div>
        </div>

        {/* Main hero title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '980px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: '800',
              lineHeight: '1.15',
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
            }}
          >
            Compare B2B Software & AI Sales Agents Before You Commit Budget
          </div>
          <div
            style={{
              fontSize: '24px',
              lineHeight: '1.45',
              color: '#94A3B8',
            }}
          >
            Unbiased, evidence-based benchmarks evaluated against official vendor pricing, architecture fit, and real enterprise workflows.
          </div>
        </div>

        {/* Bottom stats ticker */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            paddingTop: '28px',
          }}
        >
          <div style={{ display: 'flex', gap: '48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '16px', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Leading Tools</span>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#F1F5F9' }}>Agentforce · Copilot · Salezx · 11x</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '16px', color: '#64748B', textTransform: 'uppercase', fontWeight: '700' }}>Methodology</span>
              <span style={{ fontSize: '24px', fontWeight: '700', color: '#F1F5F9' }}>100% Primary Vendor Sourced</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#38BDF8', fontSize: '20px', fontWeight: '600' }}>
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
