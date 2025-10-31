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
            <span className="badge-icon">⚡</span>
            <span>Powered by BNB Chain & HTTP 402 Protocol</span>
          </div>

          <h1 className="landing-hero-title">
            Monetize Your Content.<br />
            <span className="gradient-text">Instantly. On-Chain.</span>
          </h1>

          <p className="landing-hero-subtitle">
            Create crypto paywalls in seconds. Accept BNB payments. Zero platform fees.
            Built on the HTTP 402 protocol for seamless Web3 monetization.
          </p>

          <div className="landing-hero-cta">
            <button onClick={() => navigate('/create')} className="cta-primary">
              Create Paywall
              <span className="cta-arrow">→</span>
            </button>
            <button onClick={() => navigate('/marketplace')} className="cta-secondary">
              Explore Marketplace
            </button>
          </div>

          <div className="landing-hero-stats">
            <div className="stat-item">
              <div className="stat-value">$PAYX402</div>
              <div className="stat-label">Native Token on BNB</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">&lt;2s</div>
              <div className="stat-label">Settlement Time</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <div className="stat-value">0%</div>
              <div className="stat-label">Platform Fees</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="section-header">
          <h2 className="section-title">Built for the Future of Payments</h2>
          <p className="section-subtitle">
            Next-generation paywall infrastructure powered by Web3
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Instant Settlements</h3>
            <p className="feature-description">
              BNB payments settle in seconds. No waiting for traditional payment processors.
              Funds hit your wallet immediately.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3 className="feature-title">Non-Custodial</h3>
            <p className="feature-description">
              You own your wallet. We never touch your funds. Payments go directly from
              buyer to seller on-chain.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌐</div>
            <h3 className="feature-title">HTTP 402 Native</h3>
            <p className="feature-description">
              Built on the HTTP 402 "Payment Required" protocol. AI agents and automated
              systems can discover and pay programmatically.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h3 className="feature-title">$PAYX402 Token</h3>
            <p className="feature-description">
              Powered by the $PAYX402 token on BNB Chain. Trade on Uniswap, earn rewards,
              and participate in governance.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3 className="feature-title">Developer-First</h3>
            <p className="feature-description">
              Simple API integration. RESTful endpoints. Web3-compatible. Build paywalls
              into your apps with a few lines of code.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3 className="feature-title">Zero Fees</h3>
            <p className="feature-description">
              No platform fees. No transaction cuts. No hidden charges. Keep 100% of your
              revenue. Only pay gas fees.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="landing-tech">
        <div className="section-header">
          <h2 className="section-title">Built on Modern Infrastructure</h2>
          <p className="section-subtitle">
            Leveraging the best technologies in Web3
          </p>
        </div>

        <div className="tech-grid">
          <div className="tech-item">
            <div className="tech-icon">🔗</div>
            <div className="tech-name">BNB Chain</div>
            <div className="tech-description">Fast, low-cost blockchain</div>
          </div>
          <div className="tech-item">
            <div className="tech-icon">🦊</div>
            <div className="tech-name">MetaMask</div>
            <div className="tech-description">Easy wallet integration</div>
          </div>
          <div className="tech-item">
            <div className="tech-icon">⚡</div>
            <div className="tech-name">Instant Settlement</div>
            <div className="tech-description">On-chain payment finality</div>
          </div>
          <div className="tech-item">
            <div className="tech-icon">🔐</div>
            <div className="tech-name">HTTP 402</div>
            <div className="tech-description">Native payment protocol</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="landing-cta">
        <div className="cta-content">
          <h2 className="cta-title">Start Monetizing Today</h2>
          <p className="cta-description">
            Create your first paywall in less than 60 seconds. No signup required.
          </p>
          <div className="cta-buttons">
            <button onClick={() => navigate('/create')} className="cta-primary">
              Create Your Paywall
              <span className="cta-arrow">→</span>
            </button>
            <a
              href="https://app.uniswap.org"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
            >
              Buy $PAYX402 Token
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
