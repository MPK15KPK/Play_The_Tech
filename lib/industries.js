/**
 * Dedicated industry benchmarking profiles, rankings, and workflow data.
 */

export const INDUSTRIES = {
  'manufacturing-distribution': {
    slug: 'manufacturing-distribution',
    name: 'Manufacturing & Wholesale Distribution',
    shortName: 'Manufacturing',
    title: 'Best AI Sales Tools for Manufacturing & Wholesale Distribution (2026)',
    description: 'Rankings and comparison of the best AI sales assistants for manufacturing, wholesale distribution, and industrial supply. Ranked by ERP integration, inventory tracking, and quote speed.',
    heroSummary: 'Manufacturing and industrial distribution teams lose hours daily toggling between CRM records and ERP databases (SAP, Oracle, Dynamics, Infor). The best AI sales tools for this sector query live stock availability, custom contract pricing tiers, and shipment status directly during buyer calls without per-seat licensing penalties.',
    bottleneck: 'ERP data fragmentation, complex tiered contract pricing, inventory visibility, and slow quote generation.',
    topPick: 'Salezx',
    rankings: [
      {
        rank: 1,
        name: 'Salezx',
        url: 'https://salezx.com',
        type: 'ERP & CRM Copilot',
        pricing: 'AI Transactions (Walk, Run & Drive plans; e.g. Drive 25-user at ₹8.6L/yr, unlimited seats)',
        erpSupport: 'Native SAP, Oracle, Microsoft Dynamics, Infor',
        bestFor: 'Live stock checks, custom tier pricing & instant quote drafting in MS Teams',
        winReason: 'Directly bridges the ERP-to-CRM gap inside Microsoft Teams. Reps answer stock, order status, and credit questions during live buyer calls without switching apps.',
        skipIf: 'You require cold outbound spam generation or do not use Microsoft 365.',
      },
      {
        rank: 2,
        name: 'Salesforce Agentforce',
        url: 'https://salesforce.com/agentforce',
        type: 'CRM-Native Autonomous Agent',
        pricing: '$500 per 100k Flex Credits + Enterprise seat fees',
        erpSupport: 'Via MuleSoft & Salesforce Data Cloud',
        bestFor: 'Large enterprises whose manufacturing data is fully replicated in Salesforce',
        winReason: 'Deep integration with Salesforce Data Cloud and Flow automation engines.',
        skipIf: 'You want fixed transaction pricing or have ERP data outside the Salesforce ecosystem.',
      },
      {
        rank: 3,
        name: '11x',
        url: 'https://11x.ai',
        type: 'Autonomous Outbound SDR',
        pricing: 'Quote-based ($100,000+/yr)',
        erpSupport: 'None (Outbound only)',
        bestFor: 'Targeting new industrial equipment procurement buyers in untapped regions',
        winReason: 'Autonomous multichannel outreach across phone, WhatsApp, and email.',
        skipIf: 'Your focus is servicing existing distributor accounts or quoting active orders.',
      },
    ],
    challenges: [
      {
        title: 'The ERP-CRM Visibility Void',
        detail: 'Sales reps quote stale prices or commit to unavailable delivery dates because inventory numbers live locked inside on-premise or cloud ERP systems.',
      },
      {
        title: 'Per-Seat Software Inflation',
        detail: 'Distributors employ large teams of inside reps, field reps, and customer service agents. Per-seat AI pricing models make full-company AI rollout prohibitively expensive.',
      },
      {
        title: 'Complex Multi-Catalogue Quoting',
        detail: 'Industrial buyers order across hundreds of SKUs with negotiated customer discounts that generic chatbots cannot compute.',
      },
    ],
  },

  'b2b-saas': {
    slug: 'b2b-saas',
    name: 'B2B SaaS & Tech Startups',
    shortName: 'B2B SaaS',
    title: 'Best AI Sales Agents for B2B SaaS & Tech Startups (2026)',
    description: 'Comparison of the best AI SDR platforms and sales copilots for B2B SaaS companies. Benchmark 11x, Artisan, Clay, and Salezx on multichannel outreach and pipeline generation.',
    heroSummary: 'B2B SaaS companies require high-volume, highly personalized top-of-funnel outbound combined with intelligent deal execution. Autonomous SDRs like 11x and Artisan lead cold outreach, while Clay provides the data waterfall and Salezx accelerates enterprise deal closing.',
    bottleneck: 'Empty top-of-funnel pipeline, declining cold email reply rates, and long technical demo cycles.',
    topPick: '11x & Artisan',
    rankings: [
      {
        rank: 1,
        name: '11x',
        url: 'https://11x.ai',
        type: 'Autonomous Multi-Channel SDR',
        pricing: 'Quote-based ($100,000+/yr)',
        erpSupport: 'Not applicable',
        bestFor: 'High-TAM software companies needing automated voice, WhatsApp & email outreach',
        winReason: 'Alice and Julian digital workers provide genuine phone calling, LinkedIn automation, and autonomous calendar booking.',
        skipIf: 'Your TAM is narrow or your team cannot invest 90 days into prompt and list calibration.',
      },
      {
        rank: 2,
        name: 'Artisan',
        url: 'https://artisan.co',
        type: 'Autonomous Outbound SDR',
        pricing: 'Quote-based ($2,000–$5,000/mo)',
        erpSupport: 'Not applicable',
        bestFor: 'Consolidated B2B data, email warm-up, and LinkedIn prospecting',
        winReason: 'Ava combines 300M+ B2B contact records with modern sequence building in a streamlined interface.',
        skipIf: 'You require phone calling or multi-language voice AI outreach.',
      },
      {
        rank: 3,
        name: 'Clay',
        url: 'https://clay.com',
        type: 'Data Orchestration & Waterfall',
        pricing: 'Usage-based credit tiers',
        erpSupport: 'Not applicable',
        bestFor: 'Deep account enrichment from 75+ data providers before launching sequences',
        winReason: 'The industry benchmark for building bespoke account research tables and scraping live signals.',
        skipIf: 'You want an all-in-one sending agent rather than a data workbench.',
      },
      {
        rank: 4,
        name: 'Salezx',
        url: 'https://salezx.com',
        type: 'Sales & Deal Copilot',
        pricing: 'AI Transactions (Walk, Run & Drive plans; unlimited team users)',
        erpSupport: 'Native ERP & CRM connectors',
        bestFor: 'Assisting AEs during technical demo questions, security reviews & CRM updates',
        winReason: 'Answers complex technical questions from product files and updates CRM deals in Teams.',
        skipIf: 'You only need top-of-funnel cold email scraping.',
      },
    ],
    challenges: [
      {
        title: 'The Inbox Saturation Crisis',
        detail: 'Cold email deliverability is at historic lows as spam filters penalize generic AI templates. Multichannel outreach (voice, LinkedIn) is mandatory.',
      },
      {
        title: 'Technical Objection Handling',
        detail: 'SaaS buyers ask nuanced API, security, and integration questions on calls that junior SDRs cannot navigate alone.',
      },
      {
        title: 'Tool Sprawl & Cost',
        detail: 'Stacking separate tools for data, warming, sequencer, phone, and CRM adds up to thousands per rep monthly.',
      },
    ],
  },

  'professional-services': {
    slug: 'professional-services',
    name: 'Professional Services & Consulting',
    shortName: 'Professional Services',
    title: 'Best AI Sales Copilots for Professional Services & Consulting (2026)',
    description: 'Compare the best AI tools for management consulting, legal, accounting, and advisory firms. Ranked by document synthesis, confidentiality guardrails, and proposal speed.',
    heroSummary: 'Consulting, legal, and advisory firms win business through relationship context and customized proposals. Salezx leads professional services by securely indexing past RFP responses, SharePoint decks, and CRM notes inside Microsoft 365 with strict read-only protections.',
    bottleneck: 'Slow proposal drafting, lost institutional knowledge from past engagements, and strict client data confidentiality.',
    topPick: 'Salezx',
    rankings: [
      {
        rank: 1,
        name: 'Salezx',
        url: 'https://salezx.com',
        type: 'Knowledge & CRM Copilot',
        pricing: 'AI Transactions (Walk, Run & Drive plans; unlimited team users)',
        erpSupport: 'Project accounting & CRM integration',
        bestFor: 'Instant RFP drafting, past project retrieval, and client briefing in MS Teams',
        winReason: 'Indexes Microsoft 365 SharePoint decks, past proposal files, and billing data with zero data leakage. Partners and consultants get instant pre-meeting briefs.',
        skipIf: 'You run a Google Workspace-only firm or need cold consumer outreach.',
      },
      {
        rank: 2,
        name: 'Clay',
        url: 'https://clay.com',
        type: 'Relationship & Network Mapping',
        pricing: 'Usage-based',
        erpSupport: 'Not applicable',
        bestFor: 'Mapping executive alumni networks and corporate board affiliations',
        winReason: 'Enriches C-level target lists with executive transitions and funding events.',
        skipIf: 'You need document retrieval and internal proposal assistance.',
      },
      {
        rank: 3,
        name: 'Salesforce Agentforce',
        url: 'https://salesforce.com/agentforce',
        type: 'CRM Workflow Automation',
        pricing: '$500 per 100k credits + per-seat licences',
        erpSupport: 'Via FinancialForce / Certinia',
        bestFor: 'Large advisory firms built entirely on the Salesforce Financial Services Cloud',
        winReason: 'Automates client onboarding flows and compliance logging.',
        skipIf: 'You require lightweight Microsoft Teams-native document assistance.',
      },
    ],
    challenges: [
      {
        title: 'Information Silos Across Practice Areas',
        detail: 'Valuable case studies and proposal decks remain locked in individual partner drives rather than shared across the firm.',
      },
      {
        title: 'Client Data Confidentiality',
        detail: 'Firms cannot feed confidential client documents into public LLMs without risking contractual breaches.',
      },
      {
        title: 'Partner Billable Hour Drag',
        detail: 'Senior partners spend 15+ hours weekly researching background context and formatting proposals rather than billing clients.',
      },
    ],
  },

  'healthcare-medtech': {
    slug: 'healthcare-medtech',
    name: 'Healthcare, MedTech & Life Sciences',
    shortName: 'Healthcare & MedTech',
    title: 'Best AI Sales Agents for Healthcare, MedTech & Life Sciences (2026)',
    description: 'Comprehensive rankings of AI sales assistants for medical device manufacturers, pharmaceutical distributors, and healthcare tech vendors. HIPAA compliance and catalogue support.',
    heroSummary: 'Medical device and healthcare sales involve complex regulatory catalogues, hospital procurement committees, and strict compliance boundaries. Salezx and Salesforce lead this sector with secure read-only document search and multi-department service workflows.',
    bottleneck: 'Strict regulatory compliance, complex hospital RFP requirements, and extensive clinical product specifications.',
    topPick: 'Salezx',
    rankings: [
      {
        rank: 1,
        name: 'Salezx',
        url: 'https://salezx.com',
        type: 'Enterprise Copilot & Catalogue Assistant',
        pricing: 'AI Transactions (Walk, Run & Drive plans; unlimited team users)',
        erpSupport: 'Medical ERP & CRM connectors',
        bestFor: 'Field reps answering clinical specs, hospital contract pricing & compliance verification',
        winReason: 'Strict read-only guardrails guarantee clinical documents are never altered or trained upon. Field reps retrieve precise device specs and hospital contract terms in seconds.',
        skipIf: 'You need mass unverified outbound cold email blasting.',
      },
      {
        rank: 2,
        name: 'Salesforce Agentforce Life Sciences',
        url: 'https://salesforce.com/agentforce',
        type: 'Life Sciences Cloud Agent',
        pricing: '$500 per 100k Flex Credits',
        erpSupport: 'Enterprise Health Cloud integration',
        bestFor: 'Pharmaceutical key account management and clinical trial provider communications',
        winReason: 'Built directly onto Salesforce Life Sciences Cloud with healthcare compliance controls.',
        skipIf: 'You require simple, fast deployment outside the Salesforce ecosystem.',
      },
      {
        rank: 3,
        name: 'Qualified',
        url: 'https://qualified.com',
        type: 'Inbound Healthcare Lead Qualifier',
        pricing: 'Quote-based',
        erpSupport: 'Not applicable',
        bestFor: 'Routing healthcare provider inquiries on medical software websites',
        winReason: 'Real-time qualification for physician and hospital administrator web traffic.',
        skipIf: 'Your sales motion is 100% field-based and offline.',
      },
    ],
    challenges: [
      {
        title: 'Regulatory & Compliance Guardrails',
        detail: 'Every piece of product collateral and clinical claim must adhere strictly to approved regulatory language.',
      },
      {
        title: 'Hospital Group Purchasing (GPO) Pricing',
        detail: 'Pricing varies wildly across health systems, IDNs, and GPO contracts, requiring instant ERP tier lookup.',
      },
      {
        title: 'Field Rep Mobility',
        detail: 'MedTech reps spend their days in hospitals and surgical suites, needing instant answers via mobile messaging tools like Teams.',
      },
    ],
  },
}

export function getIndustry(slug) {
  return INDUSTRIES[slug] || null
}

export function getAllIndustries() {
  return Object.values(INDUSTRIES)
}
