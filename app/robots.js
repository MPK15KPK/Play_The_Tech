import { siteUrl } from '../lib/site.js'

// Naming the AI crawlers explicitly is half the job. The other half is the
// Azure WAF — allowing them here and blocking them at the edge is the silent
// failure this whole project is most exposed to. LAUNCH-CHECKLIST §1.
const AI_AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot',
  'Bravebot', 'Googlebot', 'Bingbot',
]

export default function robots() {
  const base = siteUrl()
  const disallow = ['/admin', '/admin/', '/api', '/api/']

  return {
    rules: [
      { userAgent: '*', allow: '/', disallow },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/', disallow })),
    ],
    sitemap: [`${base}/sitemap.xml`, `${base}/feed.xml`],
    host: new URL(base).host,
  }
}
