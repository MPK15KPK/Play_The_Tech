/** @type {import('next').NextConfig} */

// Report-only to start with. A CSP mistake blocks your own analytics or your
// schema markup, and you find out from a support email — DEPLOYMENT §4.
// Watch the reports, then rename this header to Content-Security-Policy.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
].join('; ')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  // Only after the http→https redirect is confirmed working. HSTS is hard to undo.
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
  { key: 'Content-Security-Policy-Report-Only', value: csp },
]

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // The OG card reads the Plex woff files off disk at render time; without this
  // they are not traced into the deployed output.
  outputFileTracingIncludes: {
    '/opengraph-image': ['./assets/fonts/**'],
    '/compare/[slug]/opengraph-image': ['./assets/fonts/**'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  experimental: {
    optimizePackageImports: ['marked'],
    optimizeCss: true,
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(logo\\.webp|logo\\.png|icon\\.svg|favicon\\.ico)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Belt and braces: these are also disallowed in robots.txt, but a header
      // survives someone editing robots.js.
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      { source: '/request', headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }] },
    ]
  },
}

export default nextConfig
