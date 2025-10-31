import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div className="hero-badge">
            <span>Powered by BNB Chain</span>
            <span className="badge-dot">•</span>
            <span>HTTP 402 Protocol</span>
          </div>

          <h1 className="landing-hero-title">
            Monetize Your Content<br />
            <span className="gradient-text">With Crypto Paywalls</span>
          </h1>

          <p className="landing-hero-subtitle">
            Accept BNB payments instantly. No platform fees. Non-custodial. Built on the HTTP 402 protocol 
            to enable programmable payments for AI agents and automated systems.
          </p>

          <div className="landing-hero-cta">
            <button onClick={() => navigate('/create')} className="cta-primary">
              Start Building
            </button>
            <button onClick={() => navigate('/docs')} className="cta-secondary">
              Documentation
            </button>
          </div>

          <div className="landing-hero-stats">
            <div className="stat-item">
              <div className="stat-value">$PAYX402</div>
              <div className="stat-label">Native Token</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">2-5s</div>
              <div className="stat-label">Settlement</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">0%</div>
              <div className="stat-label">Fees</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">&lt;$0.01</div>
              <div className="stat-label">Gas Cost</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="section-header">
          <h2 className="section-title">Why Payx402</h2>
          <p className="section-subtitle">
            Built for creators, developers, and businesses who want full control
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <h3 className="feature-title">Instant Settlements</h3>
            <p className="feature-description">
              Payments settle in 2-5 seconds on BNB Chain. No waiting days for traditional 
              payment processors. Funds arrive in your wallet immediately upon payment.
            </p>
            <div className="feature-metric">
              <span className="metric-value">2-5s</span>
              <span className="metric-label">average settlement time</span>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Non-Custodial Control</h3>
            <p className="feature-description">
              You own your wallet. Payx402 never holds your funds. Payments flow directly 
              from buyer to seller on-chain with full transparency and auditability.
            </p>
            <div className="feature-metric">
              <span className="metric-value">100%</span>
              <span className="metric-label">self-custodial</span>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">HTTP 402 Protocol</h3>
            <p className="feature-description">
              Built on the HTTP 402 "Payment Required" standard. Enables AI agents, bots, 
              and automated systems to discover payment requirements and transact programmatically.
            </p>
            <div className="feature-metric">
              <span className="metric-value">Machine-Readable</span>
              <span className="metric-label">protocol specification</span>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Zero Platform Fees</h3>
            <p className="feature-description">
              Keep 100% of your revenue. No platform cuts, transaction fees, or hidden charges. 
              Only pay minimal gas fees on BNB Chain (typically less than $0.01 per transaction).
            </p>
            <div className="feature-metric">
              <span className="metric-value">0%</span>
              <span className="metric-label">platform fees</span>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">Developer-Friendly API</h3>
            <p className="feature-description">
              RESTful API with comprehensive documentation. Integrate paywalls into your 
              application with a few lines of code. Web3-compatible with MetaMask support.
            </p>
            <div className="feature-metric">
              <span className="metric-value">RESTful</span>
              <span className="metric-label">API endpoints</span>
            </div>
          </div>

          <div className="feature-card">
            <h3 className="feature-title">BNB Chain Infrastructure</h3>
            <p className="feature-description">
              Built on BNB Chain for fast, low-cost transactions. EVM-compatible smart contracts 
              ensure security and transparency. Battle-tested infrastructure at scale.
            </p>
            <div className="feature-metric">
              <span className="metric-value">&lt;$0.01</span>
              <span className="metric-label">gas cost</span>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="landing-tech">
        <div className="section-header">
          <h2 className="section-title">Built for Every Use Case</h2>
          <p className="section-subtitle">
            From content creators to enterprise APIs
          </p>
        </div>

        <div className="use-cases-grid">
          <div className="use-case-item">
            <div className="use-case-header">
              <h3 className="use-case-name">Premium Content</h3>
              <span className="use-case-tag">Creators</span>
            </div>
            <p className="use-case-description">
              Articles, videos, research papers, courses, and exclusive content. 
              One-time purchases or subscription models.
            </p>
          </div>

          <div className="use-case-item">
            <div className="use-case-header">
              <h3 className="use-case-name">API Monetization</h3>
              <span className="use-case-tag">Developers</span>
            </div>
            <p className="use-case-description">
              Per-request pricing for AI models, data feeds, compute resources, 
              and developer tools. Built for automation.
            </p>
          </div>

          <div className="use-case-item">
            <div className="use-case-header">
              <h3 className="use-case-name">Digital Downloads</h3>
              <span className="use-case-tag">Merchants</span>
            </div>
            <p className="use-case-description">
              Software, templates, assets, and files. Instant delivery upon payment 
              with cryptographic verification.
            </p>
          </div>

          <div className="use-case-item">
            <div className="use-case-header">
              <h3 className="use-case-name">AI Agent Access</h3>
              <span className="use-case-tag">Automation</span>
            </div>
            <p className="use-case-description">
              Enable autonomous agents to pay for services programmatically. 
              HTTP 402 native for machine-to-machine payments.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="cta-content">
          <h2 className="cta-title">Ready to Get Started?</h2>
          <p className="cta-description">
            Create your first paywall in under 60 seconds. No signup required.
          </p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/create')} className="cta-primary">
              Create Paywall
            </button>
            <button onClick={() => navigate('/docs')} className="cta-secondary">
              View Documentation
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
