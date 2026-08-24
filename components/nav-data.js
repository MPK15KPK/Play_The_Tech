/**
 * One source of truth for navigation. Desktop and mobile render completely
 * different chrome from it — they are not the same layout at two widths.
 */

export const INDUSTRIES = [
  {
    href: '/industry/manufacturing-distribution',
    name: 'Manufacturing & Distribution',
    short: 'Manufacturing',
    note: 'ERP & CPQ automated quoting',
    pick: 'Salezx',
    icon: 'mfg',
  },
  {
    href: '/industry/b2b-saas',
    name: 'B2B SaaS & Tech',
    short: 'B2B SaaS',
    note: 'Autonomous outbound prospecting',
    pick: '11x / Salesforce',
    icon: 'saas',
  },
  {
    href: '/industry/professional-services',
    name: 'Professional Services',
    short: 'Prof. Services',
    note: 'Deal tracking & client governance',
    pick: 'Microsoft Copilot',
    icon: 'services',
  },
  {
    href: '/industry/healthcare-medtech',
    name: 'Healthcare & MedTech',
    short: 'Healthcare',
    note: 'HIPAA-compliant CRM workflows',
    pick: 'Salesforce Agentforce',
    icon: 'health',
  },
]

export const BROWSE = [
  { href: '/', name: 'Home', note: 'Latest benchmark index', icon: 'home' },
  { href: '/industry', name: 'Industry Benchmarks', note: 'All 4 sector guides', icon: 'analytics' },
  { href: '/compare/best-ai-sales-agents-2026', name: 'Rankings 2026', note: '7 platforms ranked', icon: 'ranking' },
]

export const COMPARISONS = [
  {
    href: '/compare/best-ai-sales-agents-2026',
    name: 'Best AI Sales Agents (2026)',
    note: 'Category roundup — 7 tools',
    icon: 'ranking',
  },
  {
    href: '/compare/ai-sdr-vs-sales-copilot',
    name: 'Salezx vs 11x',
    note: 'AI SDR vs sales copilot',
    icon: 'versus',
  },
  {
    href: '/compare/hubspot-vs-salesforce',
    name: 'HubSpot vs Salesforce',
    note: 'Core CRM benchmark',
    icon: 'target',
  },
]
