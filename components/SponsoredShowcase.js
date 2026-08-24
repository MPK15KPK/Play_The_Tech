import { LightningIcon, BullseyeIcon, CloudTechIcon } from './Icons.js'

export default function SponsoredShowcase() {
  return (
    <div className="sidebar-ads-wrap">
      {/* Ad 1: Zoxima Solutions Enterprise AI */}
      <div className="sponsor-card zoxima-ad">
        <div className="sponsor-head">
          <span className="sponsor-badge">Enterprise Spotlight</span>
          <span className="sponsor-flag">Partner</span>
        </div>
        <div className="sponsor-body">
          <h4 className="sponsor-title">Zoxima Solutions</h4>
          <p className="sponsor-tagline">Enterprise AI &amp; CRM Architecture</p>
          <p className="sponsor-desc">
            Deploy production-grade Salesforce Agentforce &amp; Microsoft Copilot workflows with bi-directional SAP / Oracle ERP sync.
          </p>
          <ul className="sponsor-points">
            <li>
              <span className="bullet-icon"><LightningIcon size={13} /></span>
              <span>Custom Agent Orchestration</span>
            </li>
            <li>
              <span className="bullet-icon"><CloudTechIcon size={13} /></span>
              <span>Real-time ERP Data Pipelines</span>
            </li>
            <li>
              <span className="bullet-icon"><BullseyeIcon size={13} /></span>
              <span>Multi-Tier Price Book Automation</span>
            </li>
          </ul>
          <a
            className="sponsor-cta"
            href="https://www.zoxima.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Explore Zoxima Solutions ↗
          </a>
        </div>
      </div>

      {/* Ad 2: Goed AI GenAI for Sales */}
      <div className="sponsor-card goed-ad">
        <div className="sponsor-head">
          <span className="sponsor-badge">AI Platform</span>
          <span className="sponsor-flag">Featured</span>
        </div>
        <div className="sponsor-body">
          <h4 className="sponsor-title">Goed AI</h4>
          <p className="sponsor-tagline">Autonomous RFQ &amp; Quoting Engine</p>
          <p className="sponsor-desc">
            Extract complex technical specifications from incoming RFQ emails and generate accurate distributor quotes in seconds.
          </p>
          <div className="sponsor-metric">
            <span className="metric-val">68%</span>
            <span className="metric-lbl">Faster quote turnaround with 0-error ERP validation</span>
          </div>
          <a
            className="sponsor-cta"
            href="https://www.zoxima.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn About Goed AI ↗
          </a>
        </div>
      </div>
    </div>
  )
}
