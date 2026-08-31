/**
 * Platform entity profiles for the manufacturing / complex-B2B benchmark.
 *
 * SOURCING RULE (GUARDRAILS 2.1, 2.2, 2.4)
 * Every value below was read from the vendor's own site or documentation on the
 * date in VERIFIED_ON. Nothing here came from another comparison site. Where a
 * vendor does not publish a figure, the value is the literal string
 * NOT_PUBLISHED — never a guess, never an em-dash, never a number carried over
 * from a third party.
 *
 * If you change a fact, change the matching entry in `sources` too. A claim
 * without a source URL in the same object is a bug.
 */

export const NOT_PUBLISHED = 'Not published'

/** The date every fact on these pages was last read from source. */
export const VERIFIED_ON = '2026-08-31'

/**
 * The nine buying criteria for complex-catalogue B2B sales. Order matters:
 * commercial and data-connectivity rows first, ecosystem last.
 */
export const CRITERIA = [
  { key: 'erpConnectivity', label: 'ERP connectivity', short: 'ERP' },
  { key: 'catalogueComplexity', label: 'Product catalogue complexity', short: 'Catalogue' },
  { key: 'technicalSpecs', label: 'Technical specifications', short: 'Specs' },
  { key: 'quoteGeneration', label: 'Quote generation', short: 'Quoting' },
  { key: 'marginProtection', label: 'Margin protection', short: 'Margin' },
  { key: 'dealerDistributor', label: 'Dealer / distributor management', short: 'Channel' },
  { key: 'crmAutomation', label: 'CRM automation', short: 'CRM' },
  { key: 'implementationTime', label: 'Implementation time', short: 'Time to live' },
  { key: 'microsoftEcosystem', label: 'Microsoft ecosystem compatibility', short: 'Microsoft' },
]

export const PLATFORMS = {
  salezx: {
    slug: 'salezx',
    name: 'Salezx',
    shortName: 'Salezx',
    vendor: 'Salezx',
    homepage: 'https://salezx.com',
    category: 'AI sales brain inside Microsoft Teams and Microsoft 365',
    ownedByUs: true,
    metaTitle: 'Salezx Review (2026)',
    metaDescription:
      'What Salezx publishes: Teams-native AI sales brain, Ask-ERP report lookups, Quote & Propose, Margin Guard, and transaction pricing.',
    oneLine:
      'A conversational sales layer that runs inside Microsoft Teams and Microsoft 365 Copilot and answers from CRM records, ERP reports and your own documents.',
    whatItIs:
      'Salezx describes itself as the "AI Sales Brain for Microsoft Teams & Microsoft 365". It sits on top of systems a company already runs rather than replacing them: it reads the CRM, ERP reports, product and pricing catalogues, email and documents, then answers questions and drafts work in chat. The vendor splits the product into three components — Salezx (core sales brain), Salezx Grow (lead generation) and Salezx Customer (service).',
    surface: 'Microsoft Teams and Microsoft 365 Copilot. The vendor states no separate licences are needed for the chat surface.',
    capabilities: [
      { name: 'Brief-me', detail: 'Account 360, product and price questions, objection and battlecard recall.' },
      { name: 'Auto-CRM', detail: 'Voice, WhatsApp and chat capture, automatic activity logging, records updated by conversation.' },
      { name: 'Ask-ERP', detail: '"Stock, credit, billing & order status in chat — from your ERP reports".' },
      { name: 'Follow-up', detail: 'Cue-driven nudges, deal-slippage alerts, next-best-action.' },
      { name: 'Account Intel', detail: 'Buying-committee mapping, people-movement alerts, credit enrichment.' },
      { name: 'Quote & Propose / CPQ', detail: 'Listed as add-on sales services alongside RFP & Tender.' },
      { name: 'Margin Guard', detail: 'Listed as an add-on sales service.' },
      { name: 'Review & Forecast', detail: '"Live answers, commitment capture, forecast from discussion".' },
    ],
    integrations: {
      crm: ['Salesforce', 'Dynamics 365', 'Zoho'],
      erp: 'Reads "ERP reports" over secure API integration. Salezx names no ERP vendor — no SAP, Oracle or Infor claim appears on its own site.',
      other: ['Microsoft Teams', 'Microsoft 365', 'Microsoft 365 Copilot', 'LinkedIn', 'WhatsApp', 'IndiaMART', 'TradeIndia'],
    },
    pricing: {
      model: 'Annual plans priced on AI transactions rather than seats. "Cost scales with transactions, not headcount."',
      currency: 'INR',
      tiers: [
        { plan: 'Run', price: NOT_PUBLISHED, detail: 'Named as a plan tier. No price shown on the pricing page. "No setup fee on Run & Drive."' },
        { plan: 'Drive', price: '₹8.6 L/year', detail: '25 users, 70,000 AI transactions per year, 48-hour go-live. Listed against ₹9.5 L with "Save 10% · billed annually".' },
        { plan: 'Command', price: NOT_PUBLISHED, detail: 'Named as a plan tier. No price shown on the pricing page.' },
      ],
      note: 'Core (Brief-me, Auto-CRM, Follow-up, Ask-ERP, Account Intel) is always included; "Add up to 4 more services". Team-size options run 10, 25, 50, 100 and 100+. Only one of the three tiers carries a published price, and it is quoted in Indian rupees only.',
    },
    implementation: '48-hour go-live. The published path is "30 min Trial → 2 hours Setup → 2 days Complete Go-Live", staged as Connect and Unify on day one, Converse and Act & Update on day two.',
    governance:
      '"Reads widely. Acts only in your CRM." Salezx states it reads the CRM, documents, ERP reports and channels but "only ever writes back to your CRM". Files and email are read-only.',
    industries: ['Manufacturing', 'Machinery, Equipment & Parts', 'Building Materials', 'Consumer Goods', 'Professional Services', 'Local Business'],
    criteria: {
      erpConnectivity: {
        value: 'Reads ERP reports via API',
        note: 'Ask-ERP returns "Stock, credit, billing & order status in chat — from your ERP reports". No ERP product is named by the vendor, so depth of connection cannot be verified from the site.',
      },
      catalogueComplexity: {
        value: 'Ingests product and pricing catalogues',
        note: 'Unifies "PDFs, Excel, Word files, product catalogs, and email context" at setup.',
      },
      technicalSpecs: {
        value: 'Yes — specs, compatibility, lead times',
        note: 'The Machinery, Equipment & Parts page cites "specs, compatibility, pricing, and lead times — instantly, for machinery, equipment, auto & spare parts, and medical devices".',
      },
      quoteGeneration: {
        value: 'Quote & Propose plus CPQ',
        note: 'Both listed as sales services on top of Core; the how-it-works page says the system "drafts quotes" on day two.',
      },
      marginProtection: {
        value: 'Margin Guard',
        note: 'Named as a discrete add-on service. The vendor publishes no detail on how the control works.',
      },
      dealerDistributor: {
        value: 'Dealer and channel use cases',
        note: 'Building Materials: "Drive dealer and channel sales… keep distributor relationships earning". Consumer Goods: "Move faster across a fragmented distributor and retail base".',
      },
      crmAutomation: {
        value: 'Auto-CRM, writes to CRM only',
        note: 'Logs activity and updates records from conversation. The CRM is the single write target by design.',
      },
      implementationTime: {
        value: '48-hour go-live',
        note: 'The shortest published implementation of the six platforms here.',
      },
      microsoftEcosystem: {
        value: 'Native to Teams and M365 Copilot',
        note: 'The product is delivered as a Teams / Microsoft 365 Copilot experience rather than a separate app.',
      },
    },
    strengths: [
      'The only platform of the six that publishes a pricing model explicitly decoupled from seat count — relevant when inside sales, field sales and customer service all need access.',
      'Quoting, margin and channel are named product surfaces, not inferred from a generic agent platform.',
      'Publishes a concrete implementation time (48 hours) where four of the six publish none.',
      'The read-wide / write-only-to-CRM boundary is stated plainly, which is unusual and easy to audit.',
    ],
    limits: [
      'Names no ERP vendor anywhere on its own site. "ERP reports" is a materially weaker claim than a certified SAP or Oracle connector, and buyers running S/4HANA should treat it as unverified until scoped.',
      'Only the Drive tier carries a published price, and only in Indian rupees. Run and Command are Not published, so total cost outside India cannot be modelled from public information.',
      'It is not a CRM. It requires Salesforce, Dynamics 365 or Zoho underneath.',
      'Publishes no customer counts, deployment scale, or third-party security certifications on the pages reviewed.',
    ],
    skipIf: 'Your sales team does not run on Microsoft Teams or Microsoft 365, or your evaluation requires a named, certified connector into a specific ERP.',
    sources: [
      { label: 'Salezx — home', url: 'https://salezx.com' },
      { label: 'Salezx — features', url: 'https://salezx.com/features' },
      { label: 'Salezx — pricing', url: 'https://salezx.com/pricing' },
      { label: 'Salezx — how it works', url: 'https://salezx.com/how-it-works' },
      { label: 'Salezx — industries', url: 'https://salezx.com/industries' },
    ],
  },

  'salesforce-agentforce': {
    slug: 'salesforce-agentforce',
    name: 'Salesforce Agentforce',
    shortName: 'Agentforce',
    vendor: 'Salesforce',
    homepage: 'https://www.salesforce.com/agentforce/',
    category: 'CRM-native agent platform with consumption pricing',
    metaTitle: 'Agentforce Pricing & Limits (2026)',
    metaDescription:
      'Salesforce Agentforce pricing from the official rate card: $500 per 100k Flex Credits, $2 per conversation, and $125/user add-ons.',
    oneLine:
      'Salesforce\'s agent layer over its own CRM, sold on consumption (Flex Credits or Conversations) or per user, with unmetered add-ons for employee-facing agents.',
    whatItIs:
      'Agentforce is the agent tier of the Salesforce platform. Salesforce sells it four ways and expects buyers to mix them: consumption pricing through Flex Credits or per-Conversation billing for customer-facing agents, and per-user licensing for employee-facing agents through add-ons or the Agentforce 1 editions. Usage is tracked in a product Salesforce calls Digital Wallet.',
    surface: 'The Salesforce platform — Sales Cloud, Service Cloud, Field Service and the Industries clouds. Salesforce also lists Agentforce in Slack.',
    capabilities: [
      { name: 'Flex Credits', detail: 'A pooled unit of payment drawn down per Action. "Agentforce actions are 20 Flex Credits, while Agentforce Voice actions are 30 Flex Credits."' },
      { name: 'Actions', detail: '"A specific function that an AI agent executes on the platform, such as updating a record, summarizing a complex case, answering a product inquiry, or executing a custom prompt or flow".' },
      { name: 'Digital Wallet', detail: 'Near real-time consumption tracking with threshold alerts and usage trends.' },
      { name: 'Buying models', detail: 'Pre-Purchase (pay upfront, draw down), Pre-Commit (baseline commitment, billed monthly in arrears, true-up at term end) and PayGo (no upfront commitment).' },
      { name: 'Agentforce Vibes / Coworker / Voice', detail: 'Listed as products alongside the core agent tiers.' },
    ],
    integrations: {
      crm: ['Salesforce Sales Cloud', 'Service Cloud', 'Field Service', 'Industries clouds'],
      erp: 'The Agentforce pricing page names no ERP connector. Salesforce lists MuleSoft separately under its platform products.',
      other: ['Slack', 'Data 360', 'AgentExchange'],
    },
    pricing: {
      model: 'Consumption (Flex Credits or Conversations) for customer-facing agents; per-user licensing for employee-facing agents. Salesforce notes the page "is provided for information purposes only and is subject to change".',
      currency: 'USD (also published in EUR, GBP, AUD, JPY, SEK)',
      tiers: [
        { plan: 'Flex Credits', price: '$500 USD per 100k Credits', detail: 'Also €500, £400, AU$700, ¥60,000, kr5,000 per 100k Credits. Each Agentforce action consumes 20 Credits; Voice actions 30.' },
        { plan: 'Conversations', price: '$2 USD per conversation', detail: 'Also €2, £1.60, AU$2.80, ¥240, kr20. Customer-facing agents and Digital Wallet.' },
        { plan: 'Agentforce add-ons', price: '$125 user/month', detail: 'For Sales, Service and Field Service. "Unmetered Agentforce usage for employees", full AI suite, AI-powered analytics and Prompt Builder.' },
        { plan: 'Agentforce Industries add-ons', price: '$150 user/month', detail: 'For the Industries clouds. Everything in the Sales and Service add-ons plus industry-specific AI.' },
        { plan: 'Agentforce 1 Editions', price: 'from $550 user/month', detail: 'Sales, Service, Field Service and Industries editions. Agentforce add-on included plus 2.5M Flex Credits per org per year.' },
        { plan: 'Agentforce User License', price: '$5 USD/user/month', detail: 'Company-wide employee access. Requires Flex Credits. "Access to limited Salesforce CRM objects".' },
      ],
      note: 'The per-user prices sit on top of the underlying Salesforce licences, and the $5 and consumption tiers explicitly require a Flex Credit balance. Modelling total cost requires both numbers.',
    },
    implementation: NOT_PUBLISHED,
    governance: 'Digital Wallet provides near real-time consumption visibility with proactive threshold alerts. Salesforce states Pre-Commit is "widely available later this year".',
    industries: ['Manufacturing', 'Consumer Goods', 'Automotive', 'Communications', 'Life Sciences', 'and other industry clouds'],
    criteria: {
      erpConnectivity: {
        value: NOT_PUBLISHED,
        note: 'No ERP connector is named on the Agentforce pricing page. Salesforce lists MuleSoft as a separate platform product.',
      },
      catalogueComplexity: {
        value: NOT_PUBLISHED,
        note: 'Not addressed on the Agentforce pages reviewed. Salesforce sells a separate Manufacturing Cloud with its own pricing page.',
      },
      technicalSpecs: { value: NOT_PUBLISHED, note: 'Not addressed on the pages reviewed.' },
      quoteGeneration: { value: NOT_PUBLISHED, note: 'Not named on the Agentforce pricing page.' },
      marginProtection: { value: NOT_PUBLISHED, note: 'Not named on the pages reviewed.' },
      dealerDistributor: {
        value: 'Manufacturing Cloud, "Simplify Channel Engagement"',
        note: 'Salesforce lists "Modernize Commercial Operations", "Transform the Service Experience" and "Simplify Channel Engagement" as its manufacturing solutions, delivered through Manufacturing Cloud rather than Agentforce itself.',
      },
      crmAutomation: {
        value: 'Actions update CRM records',
        note: 'Record updates are a named Action type, metered at 20 Flex Credits each. Automation depth is the strongest of the six inside Salesforce data.',
      },
      implementationTime: { value: NOT_PUBLISHED, note: 'No implementation time is published on the pricing page.' },
      microsoftEcosystem: {
        value: 'Slack, not Microsoft',
        note: 'Salesforce lists Agentforce in Slack. No Teams or Microsoft 365 surface is published. Microsoft\'s own Sales agent can read Salesforce CRM data from Outlook and Teams.',
      },
    },
    strengths: [
      'The most transparent consumption rate card of the six — unit price, credits per action, and worked monthly examples are all published.',
      'Deepest automation over Salesforce\'s own CRM data, with record updates as a first-class metered Action.',
      'Three buying models (Pre-Purchase, Pre-Commit, PayGo) let a buyer start without an upfront commitment.',
      'Digital Wallet gives near real-time consumption visibility, which matters because the pricing is metered.',
    ],
    limits: [
      'Cost is genuinely hard to forecast. At 20 Credits per action and $500 per 100k Credits, a single rep running 20 requests a day is a published $120/month example — before the underlying Salesforce licence.',
      'Nothing manufacturing-specific is published at the Agentforce layer. Catalogue, quoting and margin work sit in separately licensed products.',
      'Salesforce publishes no implementation time.',
      'The pricing page carries an explicit "subject to change" disclaimer, so any model built from it has a shelf life.',
    ],
    skipIf: 'Your customer, pricing and inventory data does not already live in Salesforce, or you need a predictable annual cost rather than a metered one.',
    sources: [
      { label: 'Salesforce — Agentforce pricing', url: 'https://www.salesforce.com/agentforce/pricing/' },
      { label: 'Salesforce — Agentforce', url: 'https://www.salesforce.com/agentforce/' },
    ],
  },

  'microsoft-dynamics-365-copilot': {
    slug: 'microsoft-dynamics-365-copilot',
    name: 'Microsoft Dynamics 365 + Copilot',
    shortName: 'Dynamics 365',
    vendor: 'Microsoft',
    homepage: 'https://www.microsoft.com/en-us/dynamics-365/products/sales/pricing',
    category: 'CRM with Copilot and prebuilt agents included from the Enterprise tier',
    metaTitle: 'Dynamics 365 Copilot Review (2026)',
    metaDescription:
      'Official Dynamics 365 Sales pricing ($65, $105, $150/user/mo), Copilot integration capabilities, and published sales agent limits.',
    oneLine:
      'Microsoft\'s CRM, where Copilot and prebuilt agents are bundled into the $105 Enterprise tier and the Sales agent surfaces CRM data inside Outlook and Teams.',
    whatItIs:
      'Two things sold together. Dynamics 365 Sales is the CRM, and from the Enterprise tier upward Microsoft includes "Copilot in Dynamics 365 and agentic capabilities" in the seat price. Separately, the Sales agent — the product formerly marketed as Copilot for Sales — is an assistant that brings CRM insights into Outlook and Teams, and it works with Salesforce as well as Dynamics.',
    surface: 'Dynamics 365 Sales, plus Microsoft Outlook and Microsoft Teams through the Sales agent.',
    capabilities: [
      { name: 'Copilot in Dynamics 365', detail: 'Included from the Sales Enterprise tier: natural language insights, email and meeting assistance, opportunity summaries.' },
      { name: 'Prebuilt agents', detail: 'Microsoft names the Sales Close Agent as an example of a prebuilt agent available in Sales Enterprise.' },
      { name: 'Sales agent (in Outlook and Teams)', detail: '"Connect CRM data to get tailored insights from Dynamics 365 Sales or Salesforce." Captures insights and action items from Teams meetings; drafts email and next steps in Outlook.' },
      { name: 'Copilot Credits', detail: 'Sales Premium includes 1,000 Copilot Credits alongside Sales Insights and AI-powered data enrichment.' },
    ],
    integrations: {
      crm: ['Dynamics 365 Sales', 'Salesforce (via the Sales agent)'],
      erp: 'Dynamics 365 is Microsoft\'s own ERP and CRM family. The Sales pricing page publishes no third-party ERP connector.',
      other: ['Microsoft 365', 'Outlook', 'Teams', 'LinkedIn Sales Navigator (via Microsoft Relationship Sales)'],
    },
    pricing: {
      model: 'Per user per month, paid yearly. Copilot capability is tier-gated rather than sold separately for the CRM.',
      currency: 'USD',
      tiers: [
        { plan: 'Dynamics 365 Sales Professional', price: '$65.00 user/month', detail: 'Paid yearly. Core sales force automation, Microsoft 365 interoperation, reporting and dashboards. Copilot is not included.' },
        { plan: 'Dynamics 365 Sales Enterprise', price: '$105.00 user/month', detail: 'Paid yearly. "Includes Copilot in Dynamics 365 and agentic capabilities", access to prebuilt agents like the Sales Close Agent.' },
        { plan: 'Dynamics 365 Sales Premium', price: '$150.00 user/month', detail: 'Paid yearly. Everything in Enterprise plus 1,000 Copilot Credits, Sales Insights, AI-powered recommended actions and data enrichment.' },
        { plan: 'Microsoft Relationship Sales', price: 'Variable', detail: 'Sales Enterprise plus LinkedIn Sales Navigator. 10-seat minimum.' },
        { plan: 'Microsoft 365 Copilot (add-on)', price: '$18.00 user/month', detail: 'Paid yearly, discounted from $21.00 through 31 December 2026; $25.20 billed monthly. "A separate license for a qualifying Microsoft 365 plan is required."' },
      ],
      note: 'The Sales agent\'s own licensing is not published on the product page — Microsoft directs buyers to the Microsoft Product Terms or a Microsoft representative.',
    },
    implementation: NOT_PUBLISHED,
    governance:
      'Microsoft states the Sales agent "allows administrators and users to access content and share data outside of Microsoft 365, including with third-party customer relationship management (CRM) services", and that data sharing is not enabled until administrators and users consent. Admin and CRM security-role requirements are documented.',
    industries: [],
    criteria: {
      erpConnectivity: {
        value: 'Own ERP family; no third-party connector published',
        note: 'Dynamics 365 spans ERP and CRM, so the connection is internal. The Sales pricing page publishes no SAP, Oracle or Infor connector.',
      },
      catalogueComplexity: { value: NOT_PUBLISHED, note: 'Not addressed on the Sales pricing page.' },
      technicalSpecs: { value: NOT_PUBLISHED, note: 'Not addressed on the Sales pricing page.' },
      quoteGeneration: { value: NOT_PUBLISHED, note: 'Not named on the Sales pricing page or in the Sales agent overview.' },
      marginProtection: { value: NOT_PUBLISHED, note: 'Not named on the pages reviewed.' },
      dealerDistributor: { value: NOT_PUBLISHED, note: 'Not addressed on the Sales pricing page.' },
      crmAutomation: {
        value: 'Copilot and prebuilt agents from $105/user',
        note: 'Opportunity summaries, email and meeting assistance, and agents such as the Sales Close Agent are bundled rather than metered.',
      },
      implementationTime: { value: NOT_PUBLISHED, note: 'No implementation time is published.' },
      microsoftEcosystem: {
        value: 'Native, with two documented exclusions',
        note: 'Microsoft states the Sales agent "is not available on Microsoft Dynamics 365 Customer Engagement (on-premises)" and "is not supported in Government Community Cloud (GCC), including USG, and Department of Defense (DoD)".',
      },
    },
    strengths: [
      'Copilot is bundled into the seat price from $105/user/month rather than metered, which makes annual cost the easiest of the six to forecast.',
      'The Sales agent reads Salesforce as well as Dynamics, so a Microsoft-shop rep can keep Outlook and Teams as the working surface without moving CRM.',
      'Publishes exclusions plainly — the on-premises and GCC/DoD limits are documented rather than discovered during rollout.',
      'Dynamics 365 spans ERP and CRM in one family, removing the integration problem for companies already standardised on it.',
    ],
    limits: [
      'Nothing manufacturing-specific — catalogue depth, quoting, margin and channel management are all Not published on the Sales pricing page.',
      'Sales agent licensing is not published; Microsoft points to Product Terms, so the true per-seat cost needs a conversation with Microsoft.',
      'On-premises Dynamics 365 Customer Engagement is excluded outright, which rules out a real slice of manufacturing installed base.',
      'Costs stack: the CRM seat, optionally Microsoft 365 Copilot at $18/user/month, and a qualifying Microsoft 365 plan underneath it.',
    ],
    skipIf: 'You run Dynamics 365 Customer Engagement on-premises, operate in GCC or DoD environments, or need published quoting and margin capability rather than general CRM AI.',
    sources: [
      { label: 'Microsoft — Dynamics 365 Sales pricing', url: 'https://www.microsoft.com/en-us/dynamics-365/products/sales/pricing' },
      { label: 'Microsoft Learn — Sales agent overview', url: 'https://learn.microsoft.com/en-us/microsoft-sales-copilot/introduction' },
      { label: 'Microsoft — Microsoft 365 Copilot for business', url: 'https://www.microsoft.com/en-us/microsoft-365/copilot/business' },
    ],
  },

  'servicenow-ai-agents': {
    slug: 'servicenow-ai-agents',
    name: 'ServiceNow AI Agents',
    shortName: 'ServiceNow',
    vendor: 'ServiceNow',
    homepage: 'https://www.servicenow.com/products/ai-agents.html',
    category: 'Cross-departmental agent orchestration on the ServiceNow Platform',
    metaTitle: 'ServiceNow AI Agents Review (2026)',
    metaDescription:
      'ServiceNow AI Agent Orchestrator and Studio explained from official docs: features, Pro Plus bundling, and workflow pricing.',
    oneLine:
      'An agent control tower for companies already running ServiceNow, included at no additional cost for Pro Plus and Enterprise Plus customers.',
    whatItIs:
      'ServiceNow positions the platform itself as "the AI agent control tower — a connection layer across every corner of a business". AI Agent Orchestrator coordinates teams of specialised agents across departments; AI Agent Studio lets people build custom agents from natural-language prompts rather than code; Workflow Data Fabric supplies them with enterprise data through zero-copy integrations.',
    surface: 'The ServiceNow Platform — IT, customer service, HR and other workflows.',
    capabilities: [
      { name: 'AI Agent Orchestrator', detail: 'Coordinates collaboration among teams of AI agents, "enabling inter-agent communication and centralized coordination… regardless of where the process starts".' },
      { name: 'AI Agent Studio', detail: 'Builds custom agents "through natural language prompts—not code", then guides users through creating, testing and activating them.' },
      { name: 'Workflow Data Fabric', detail: '"Zero copy integrations… allow businesses to securely connect to their data sources without moving or duplicating data."' },
      { name: 'Prebuilt agents', detail: '"Thousands of pre-built AI agents for every workflow" across IT, customer service and HR.' },
    ],
    integrations: {
      crm: ['ServiceNow Customer Service Management'],
      erp: 'Workflow Data Fabric connects structured and unstructured enterprise data with zero-copy integrations. No ERP product is named in the announcement.',
      other: ['ServiceNow Platform workflows'],
    },
    pricing: {
      model: 'Bundled into platform tiers, with consumption on top. ServiceNow publishes no per-seat list price.',
      currency: NOT_PUBLISHED,
      tiers: [
        {
          plan: 'Pro Plus / Enterprise Plus',
          price: 'Included at no additional cost',
          detail: 'ServiceNow states the full suite — including AI Agent Orchestrator and AI Agent Studio — "will be included at no additional cost for all Pro Plus and Enterprise Plus customers". The underlying platform subscription is not published.',
        },
        { plan: 'Consumption', price: NOT_PUBLISHED, detail: 'ServiceNow describes "a consumption-based model" that "extends the value of customers\' existing ServiceNow generative AI packages" without publishing a unit rate.' },
      ],
      note: 'ServiceNow publishes no list price for the platform itself, so total cost cannot be modelled from public information.',
    },
    implementation: NOT_PUBLISHED,
    governance: 'ServiceNow frames the Orchestrator as "one central location to analyze, manage, and govern AI agents across every corner of a business", with a human operator approving execution in its worked example.',
    industries: [],
    criteria: {
      erpConnectivity: {
        value: 'Zero-copy data fabric, no ERP named',
        note: 'Workflow Data Fabric connects data "no matter where it resides" without moving or duplicating it, but the announcement names no ERP product.',
      },
      catalogueComplexity: { value: NOT_PUBLISHED, note: 'Not addressed in the material reviewed.' },
      technicalSpecs: { value: NOT_PUBLISHED, note: 'Not addressed in the material reviewed.' },
      quoteGeneration: {
        value: 'Order management scoped to technology providers',
        note: 'ServiceNow\'s Sales and Order Management product is published as "for Technology Providers". It is not positioned for manufacturing quoting.',
      },
      marginProtection: { value: NOT_PUBLISHED, note: 'Not addressed in the material reviewed.' },
      dealerDistributor: { value: NOT_PUBLISHED, note: 'Not addressed in the material reviewed.' },
      crmAutomation: {
        value: 'Cross-departmental agent orchestration',
        note: 'Strongest where a process crosses IT, service and HR. It is not a sales-force-automation CRM.',
      },
      implementationTime: { value: NOT_PUBLISHED, note: 'No implementation time is published.' },
      microsoftEcosystem: { value: NOT_PUBLISHED, note: 'No Teams or Microsoft 365 surface is published in the material reviewed.' },
    },
    strengths: [
      'If you already hold Pro Plus or Enterprise Plus, the agent suite arrives at no additional licence cost — the only platform of the six that says so outright.',
      'Zero-copy data access is a genuine architectural advantage where data cannot be replicated for compliance reasons.',
      'Orchestration across departments is the real strength: processes that span service, IT and operations rather than a single seller\'s workflow.',
      'Governance is a named product surface, not an afterthought.',
    ],
    limits: [
      'It is not a sales platform. The nearest product, Sales and Order Management, is explicitly scoped to technology providers.',
      'No list price for the platform is published, so "no additional cost" only means anything once you know the Pro Plus or Enterprise Plus subscription.',
      'Catalogue, specs, quoting, margin and channel are all Not published.',
      'Buying it purely for a manufacturing sales use case means paying for a platform whose value sits mostly elsewhere.',
    ],
    skipIf: 'You are not already a ServiceNow customer, or the problem you are solving is seller-facing rather than cross-departmental workflow.',
    sources: [
      {
        label: 'ServiceNow Newsroom — agentic AI innovations announcement',
        url: 'https://newsroom.servicenow.com/press-releases/details/2025/ServiceNow-announces-new-agentic-AI-innovations-to-autonomously-solve-the-most-complex-enterprise-challenges-01-29-2025-traffic/default.aspx',
      },
      { label: 'ServiceNow — AI Agents', url: 'https://www.servicenow.com/products/ai-agents.html' },
      { label: 'ServiceNow — Sales and Order Management for Technology Providers', url: 'https://www.servicenow.com/products/order-management-tech-providers.html' },
    ],
  },

  uipath: {
    slug: 'uipath',
    name: 'UiPath',
    shortName: 'UiPath',
    vendor: 'UiPath',
    homepage: 'https://www.uipath.com/pricing',
    category: 'Agentic process automation and orchestration',
    metaTitle: 'UiPath for Sales Ops Review (2026)',
    metaDescription:
      'UiPath pricing from $25/mo, Maestro agentic orchestration, and SAP process automation for back-office sales operations.',
    oneLine:
      'Process automation that orchestrates robots, AI agents and people across ERP-heavy back-office work — order-to-cash rather than the sales conversation.',
    whatItIs:
      'UiPath automates and orchestrates processes rather than assisting a seller. Maestro, its orchestration product, models processes in BPMN 2.0 and routes work to bots, agents or people, coordinating agents from UiPath, Claude, OpenAI, Gemini, Microsoft Copilot, LangChain and CrewAI under one identity, audit and policy layer.',
    surface: 'Automation Cloud, on-premises, or a customer\'s own region. Not a chat surface for sellers.',
    capabilities: [
      { name: 'Maestro', detail: 'BPMN 2.0 process modelling, real-time execution analytics, task routing to bots, agents or people.' },
      { name: 'Multi-agent management', detail: 'Orchestrates UiPath, Claude, OpenAI, Gemini, Microsoft Copilot, LangChain and CrewAI agents with shared context and unified identity, audit and policy.' },
      { name: 'Maestro Case', detail: 'Case intake and data capture, AI-powered triage and routing, SLA enforcement.' },
      { name: 'SAP automation', detail: 'Names SAP S/4HANA, SAP Business Technology Platform and SAP Build Process Automation; claims a "93% clean core score" for S/4HANA migration using automation over custom code.' },
      { name: 'Governance', detail: 'Policy and audit controls at the orchestration layer, human-in-the-loop exception handling, complete audit trails.' },
    ],
    integrations: {
      crm: [],
      erp: 'Names SAP S/4HANA, SAP BTP and SAP Build Process Automation, and automates order-to-cash, procure-to-pay, invoice processing, purchase orders and approvals, and inventory tracking and replenishment.',
      other: ['Microsoft Copilot', 'Claude', 'OpenAI', 'Gemini', 'LangChain', 'CrewAI'],
    },
    pricing: {
      model: 'Per-plan subscription with user and robot limits at the entry tier; contact sales above it.',
      currency: 'USD',
      tiers: [
        { plan: 'Automation Cloud Basic', price: 'Starting at $25 per month', detail: 'Up to 5 Basic, 5 Plus and 1 Pro user, 2 robots, hosted in the European region, 99.9% service uptime.' },
        { plan: 'Automation Cloud Standard', price: 'Contact Sales for pricing', detail: '"No limits to scale". Enterprise automations, agents, document classification and extraction, orchestration and governance controls.' },
        { plan: 'Automation Cloud Enterprise', price: 'Contact Sales for pricing', detail: 'Unlimited users and robots, self-healing UI automation, bring your own model, encryption keys, credential vaults, CI/CD integration.' },
      ],
      note: 'Only the entry tier carries a published price, and its limits (2 robots, 1 Pro user) put it below the threshold of a production sales-operations deployment.',
    },
    implementation: NOT_PUBLISHED,
    governance: 'Policy and audit controls applied at the orchestration layer, complete audit trails, and human-in-the-loop exception handling across every actor.',
    industries: [],
    criteria: {
      erpConnectivity: {
        value: 'Strongest published SAP process coverage',
        note: 'Names SAP S/4HANA, BTP and Build Process Automation, and covers order-to-cash, procure-to-pay, invoice processing and inventory replenishment.',
      },
      catalogueComplexity: { value: NOT_PUBLISHED, note: 'Not addressed as a product capability.' },
      technicalSpecs: { value: NOT_PUBLISHED, note: 'Not addressed as a product capability.' },
      quoteGeneration: { value: NOT_PUBLISHED, note: 'Quoting is not among the business processes UiPath names.' },
      marginProtection: { value: NOT_PUBLISHED, note: 'Not addressed as a product capability.' },
      dealerDistributor: { value: NOT_PUBLISHED, note: 'Not addressed as a product capability.' },
      crmAutomation: {
        value: 'No CRM of its own',
        note: 'UiPath automates across existing systems. It does not hold customer records or drive a seller\'s workflow.',
      },
      implementationTime: { value: NOT_PUBLISHED, note: 'No implementation time is published.' },
      microsoftEcosystem: {
        value: 'Orchestrates Microsoft Copilot agents',
        note: 'Microsoft Copilot is one of the agent types Maestro coordinates. There is no Teams-native seller experience.',
      },
    },
    strengths: [
      'The deepest published SAP process coverage of the six, named at product level rather than implied.',
      'Vendor-agnostic agent orchestration — Copilot, Claude, OpenAI and Gemini agents run under one audit and policy layer.',
      'Governance and audit trails are architectural, which matters when automation touches pricing and orders.',
      'A published entry price at $25/month, unusual in this category.',
    ],
    limits: [
      'It is not a sales tool. Quoting, margin, catalogue and channel are all absent from what UiPath publishes.',
      'No CRM and no seller-facing surface: reps do not use UiPath, operations does.',
      'The published $25 tier caps at 2 robots and 1 Pro user — everything at production scale is "Contact Sales".',
      'Buying it to fix a selling problem solves the back-office half at best.',
    ],
    skipIf: 'The problem is a rep who cannot get an answer during a call. UiPath addresses the process behind the order, not the conversation in front of it.',
    sources: [
      { label: 'UiPath — pricing', url: 'https://www.uipath.com/pricing' },
      { label: 'UiPath — Maestro (agentic orchestration)', url: 'https://www.uipath.com/product/agentic-orchestration' },
      { label: 'UiPath — SAP automation', url: 'https://www.uipath.com/solutions/technology/sap-automation' },
    ],
  },

  'sap-joule': {
    slug: 'sap-joule',
    name: 'SAP Joule',
    shortName: 'SAP Joule',
    vendor: 'SAP',
    homepage: 'https://www.sap.com/products/artificial-intelligence/ai-assistant.html',
    category: 'AI assistant embedded in SAP applications',
    metaTitle: 'SAP Joule for Sales (2026)',
    metaDescription:
      'What SAP Joule does in Sales from the official capabilities guide: quotation retrieval, price renewal, and sales order status.',
    oneLine:
      'SAP\'s assistant living inside S/4HANA, where the ERP is not an integration target but the application it runs in.',
    whatItIs:
      'Joule is a conversational assistant embedded across SAP solutions. SAP documents four capability types: transactional (create or retrieve business data and complete tasks), navigational (find and open apps), informational (conversational search over SAP Help Portal and documents you upload) and analytical insights (explore your data through SAP Analytics Cloud).',
    surface: 'SAP S/4HANA Cloud Public Edition and Private Edition, SAP SuccessFactors, SAP Analytics Cloud and other SAP solutions.',
    capabilities: [
      { name: 'Transactional', detail: '"Joule works with you to help you create or retrieve business data, complete your tasks… update business data, and much more."' },
      { name: 'Navigational', detail: 'Finds and navigates to functionality or apps "without having to go through multiple links to reach a destination".' },
      { name: 'Informational', detail: 'Conversational search over the SAP Help Portal and documents uploaded through document grounding, returning a summary plus the top three search results.' },
      { name: 'Analytical insights', detail: 'Explores data through SAP Analytics Cloud, with suggested follow-up questions that generate further charts.' },
      { name: 'Sales area', detail: '"In the Sales area, you can ask Joule to check and renew expiring prices, review sales order status, and perform some other operations."' },
      { name: 'Sales quotation skills', detail: 'Retrieves and filters sales quotations by sold-to party, sales organisation, division, product, reference status, overall status, rejection status, type and reference sales inquiry.' },
    ],
    integrations: {
      crm: ['SAP business objects within S/4HANA'],
      erp: 'Native. Joule runs inside SAP S/4HANA Cloud Public and Private Edition — the ERP is the host application, not a connected system.',
      other: ['SAP SuccessFactors', 'SAP Analytics Cloud', 'SAP Help Portal'],
    },
    pricing: {
      model: NOT_PUBLISHED,
      currency: NOT_PUBLISHED,
      tiers: [
        { plan: 'Joule', price: NOT_PUBLISHED, detail: 'No list price appears in the Joule Capabilities guide. Entitlement is handled through "Activating Business AI and Assigning Users" within an SAP solution.' },
      ],
      note: 'Joule is not sold as a standalone line item in the documentation reviewed; availability depends on which capabilities ship with your SAP solution.',
    },
    implementation: 'Not published as a duration. SAP documents an activation step — "Activating Business AI and Assigning Users" — rather than a deployment timeline.',
    governance:
      'SAP notes that Joule "can return responses from SAP content as well as content from its own knowledge base. Only responses that contain links to the source content contain SAP content." Conversational search returns no document links unless a product filter is selected.',
    industries: [],
    criteria: {
      erpConnectivity: {
        value: 'Native — it runs inside S/4HANA',
        note: 'No connector, no data replication, no integration project. Nothing else in this comparison can match it inside SAP.',
      },
      catalogueComplexity: {
        value: 'Acts on SAP business objects',
        note: 'Joule works over master data already in SAP rather than ingesting external catalogues.',
      },
      technicalSpecs: {
        value: 'Document grounding over uploaded documents',
        note: 'The informational capability searches the SAP Help Portal and documents uploaded to the Joule service, summarising and returning the top three results.',
      },
      quoteGeneration: {
        value: 'Quotation retrieval and price renewal',
        note: 'The Sales section lists checking and renewing expiring prices and reviewing sales order status. Quotation skills are retrieval and filtering by party, org, division, product and status.',
      },
      marginProtection: { value: NOT_PUBLISHED, note: 'Not listed among the Sales capabilities in the guide.' },
      dealerDistributor: { value: NOT_PUBLISHED, note: 'Not listed among the Sales capabilities in the guide.' },
      crmAutomation: {
        value: 'Updates SAP data, not a third-party CRM',
        note: 'The transactional capability creates and updates SAP business data. There is no published connection to Salesforce, Dynamics or Zoho.',
      },
      implementationTime: { value: NOT_PUBLISHED, note: 'SAP documents an activation procedure rather than a time to value.' },
      microsoftEcosystem: { value: NOT_PUBLISHED, note: 'No Teams or Microsoft 365 surface appears in the Joule Capabilities guide.' },
    },
    strengths: [
      'Unbeatable inside SAP: no integration layer to build, no data to replicate, no connector to certify.',
      'The most precisely documented capability set of the six — SAP publishes the exact skills, sample requests and required business catalogues.',
      'Sales quotation and sales order skills are real, named and filterable, not marketing language.',
      'Governance is explicit about what is SAP content and what is model knowledge.',
    ],
    limits: [
      'No price is published anywhere in the capabilities guide, so cost cannot be modelled at all.',
      'It only helps where SAP already is. There is no published bridge to Salesforce, Dynamics, Teams or Microsoft 365.',
      'The published Sales capabilities lean towards retrieval and status — margin protection and channel management do not appear.',
      'Sellers who work in email and chat rather than in SAP get no surface here.',
    ],
    skipIf: 'Your sales team works outside SAP, or you need one assistant spanning CRM, documents and ERP rather than one that is excellent inside a single system.',
    sources: [
      { label: 'SAP Help Portal — Joule Capabilities (PUBLIC, document version 1.0.0, 2026-08-27)', url: 'https://help.sap.com/doc/1b82af8383e2443eaa95a034a70beb1b/CLOUD/en-US/c0bb884c3e27438695f4750b547aac77.pdf' },
      { label: 'SAP Help Portal — Joule in SAP S/4HANA Cloud Public Edition', url: 'https://help.sap.com/docs/joule/capabilities-guide/joule-in-sap-s-4hana-cloud-public-edition' },
      { label: 'SAP — AI assistant', url: 'https://www.sap.com/products/artificial-intelligence/ai-assistant.html' },
    ],
  },
}

/** Display order for the benchmark. Not a ranking — see the roundup for the verdict. */
export const PLATFORM_ORDER = [
  'salezx',
  'salesforce-agentforce',
  'microsoft-dynamics-365-copilot',
  'sap-joule',
  'servicenow-ai-agents',
  'uipath',
]

export function getPlatform(slug) {
  return PLATFORMS[slug] || null
}

export function getAllPlatforms() {
  return PLATFORM_ORDER.map((slug) => PLATFORMS[slug]).filter(Boolean)
}

/** True when a platform shares ownership with this site — drives the disclosure (GUARDRAILS 1.1). */
export function needsDisclosure(platforms) {
  return platforms.some((p) => p.ownedByUs)
}
