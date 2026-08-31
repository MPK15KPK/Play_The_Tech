import { siteUrl } from '../lib/site.js'

// Naming the AI crawlers explicitly is half the job. The other half is the
// Azure WAF — allowing them here and blocking them at the edge is the silent
// failure this whole project is most exposed to. LAUNCH-CHECKLIST §1.
// Comprehensive list of all major modern AI search and LLM crawlers.
// Allows OpenAI (ChatGPT/SearchGPT), Anthropic (Claude), Google (Gemini/AI Overviews),
// Perplexity, Microsoft (Copilot/Bing), Apple Intelligence, Brave Leo, Meta AI, and Amazon.
const AI_AGENTS = [
  // OpenAI (ChatGPT, SearchGPT, GPT-4/o)
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic (Claude, Claude 3.5/3.7, Artifacts)
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-Web',
  'anthropic-ai',
  // Google (Gemini, AI Overviews, Search)
  'Google-Extended',
  'GoogleOther',
  'GoogleOther-Image',
  'GoogleOther-Video',
  'Googlebot',
  'Googlebot-Image',
  'Googlebot-News',
  // Perplexity AI
  'PerplexityBot',
  'Perplexity-Search',
  // Microsoft Copilot & Bing
  'Bingbot',
  'MSNBot',
  'BingPreview',
  'Copilot',
  // Apple Intelligence
  'Applebot',
  'Applebot-Extended',
  // Brave AI (Leo)
  'Bravebot',
  // Meta AI (LLaMA)
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'FacebookBot',
  // Amazon AI (Bedrock / Rufus)
  'Amazonbot',
  // Cohere & Open Datasets
  'cohere-ai',
  'CCBot',
  'Diffbot',
  'Bytespider',
  'YouBot',
  'DuckDuckBot',
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
