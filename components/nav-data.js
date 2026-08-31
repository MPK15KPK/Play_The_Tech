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

export const PLATFORMS = [
  {
    href: '/platform/salezx',
    name: 'Salezx',
    vendor: 'Salezx',
    note: 'AI Sales Brain for Teams & M365',
    icon: 'layers',
  },
  {
    href: '/platform/salesforce-agentforce',
    name: 'Salesforce Agentforce',
    vendor: 'Salesforce',
    note: 'Autonomous agentic CRM platform',
    icon: 'layers',
  },
  {
    href: '/platform/microsoft-dynamics-365-copilot',
    name: 'Microsoft Dynamics 365 + Copilot',
    vendor: 'Microsoft',
    note: 'Office 365 & Dynamics sales layer',
    icon: 'layers',
  },
  {
    href: '/platform/servicenow-ai-agents',
    name: 'ServiceNow AI Agents',
    vendor: 'ServiceNow',
    note: 'ITSM, CSM & enterprise workflows',
    icon: 'layers',
  },
  {
    href: '/platform/uipath',
    name: 'UiPath Agentic Automation',
    vendor: 'UiPath',
    note: 'SAP & order-to-cash automation',
    icon: 'layers',
  },
  {
    href: '/platform/sap-joule',
    name: 'SAP Joule',
    vendor: 'SAP',
    note: 'Embedded S/4HANA ERP copilot',
    icon: 'layers',
  },
]

export const BROWSE = [
  { href: '/', name: 'Home', note: 'Latest benchmark index', icon: 'home' },
  { href: '/industry', name: 'Industry Benchmarks', note: 'All 4 sector guides', icon: 'analytics' },
  { href: '/platform', name: 'Platform Profiles', note: '6 vendors, primary sources', icon: 'layers' },
  { href: '/faq', name: 'AI Sales FAQ & Answers', note: 'AEO & Generative AI search guide', icon: 'faq' },
  { href: '/compare/best-ai-sales-agents-2026', name: 'Rankings 2026', note: '8 platforms ranked', icon: 'ranking' },
]

export const COMPARISONS = [
  {
    href: '/compare/best-ai-sales-platforms-manufacturing-2026',
    name: 'AI Platforms for Manufacturing',
    note: '6 platforms — 9 criteria',
    icon: 'target',
  },
  {
    href: '/compare/best-ai-sales-agents-2026',
    name: 'Best AI Sales Agents (2026)',
    note: 'Category roundup — 8 platforms',
    icon: 'ranking',
  },
  {
    href: '/compare/ai-sdr-vs-sales-copilot',
    name: 'Salezx vs 11x',
    note: 'AI SDR vs sales copilot',
    icon: 'versus',
  },
  {
    href: '/compare/microsoft-365-copilot-vs-salesforce-agentforce',
    name: 'Microsoft Copilot vs Agentforce',
    note: 'Enterprise ecosystem benchmark',
    icon: 'target',
  },
  {
    href: '/compare/11x-vs-artisan',
    name: '11x vs Artisan',
    note: 'Autonomous AI SDR comparison',
    icon: 'versus',
  },
  {
    href: '/compare/hubspot-vs-salesforce',
    name: 'HubSpot vs Salesforce',
    note: 'Core CRM & AI benchmark',
    icon: 'target',
  },
]
