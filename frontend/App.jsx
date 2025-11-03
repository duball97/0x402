import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function App() {
  const navigate = useNavigate();

  return (
    <>
      <Header transparent />

      {/* Hero Section */}
      <section className="landing-hero" >
        <div className="landing-hero-content">
          

          <h1 className="landing-hero-title" style={{ marginTop: '50px' }}>
            Monetize Your Content<br />
            <span className="gradient-text">With Crypto Paywalls</span>
          </h1>

          <p className="landing-hero-subtitle">
            Accept crypto payments instantly. No platform fees. Non-custodial. Built on the HTTP 402 protocol 
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
              <div className="stat-value">$LOCK</div>
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

      {/* Showcase Section */}
      <section className="landing-showcase">
        <div className="showcase-container">
          <div className="showcase-image">
            <div className="paywall-preview">
              <div className="paywall-preview-header">
                <div className="paywall-preview-dot"></div>
                <div className="paywall-preview-dot"></div>
                <div className="paywall-preview-dot"></div>
              </div>
              <div className="paywall-preview-content">
                <div className="paywall-preview-title">Premium Content</div>
                <div className="paywall-preview-price">0.01 SOL</div>
                <div className="paywall-preview-button">Pay with Phantom</div>
                <div className="paywall-preview-features">
                  <div className="paywall-preview-feature">🔒 Secure Payment</div>
                  <div className="paywall-preview-feature">⚡ Instant Access</div>
                </div>
              </div>
            </div>
          </div>
          <div className="showcase-content">
            <h2 className="showcase-title">Simple, Secure, Instant</h2>
            <p className="showcase-description">
              LockPay makes monetizing digital content effortless. Create a paywall in seconds, 
              share a single link, and receive payments directly to your wallet. No middlemen, 
              no platform fees—just pure, decentralized commerce.
            </p>
            <div className="showcase-features">
              <div className="showcase-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="url(#checkGrad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="checkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#01c3f3" />
                      <stop offset="100%" stopColor="#0178c8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>One-click paywall creation</span>
              </div>
              <div className="showcase-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="url(#checkGrad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="checkGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#01c3f3" />
                      <stop offset="100%" stopColor="#0178c8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Direct wallet-to-wallet payments</span>
              </div>
              <div className="showcase-feature-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="url(#checkGrad3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <defs>
                    <linearGradient id="checkGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#01c3f3" />
                      <stop offset="100%" stopColor="#0178c8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span>Works with BNB Chain & Solana</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="landing-features">
        <div className="section-header">
          <h2 className="section-title">
            <svg className="section-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#whyGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="url(#whyGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#whyGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="whyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#01c3f3" />
                  <stop offset="100%" stopColor="#0178c8" />
                </linearGradient>
              </defs>
            </svg>
            Why LockPay
          </h2>
          <p className="section-subtitle">
            Built for creators, developers, and businesses who want full control
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="url(#icon1)" strokeWidth="2"/>
                <path d="M12 6V12L16 14" stroke="url(#icon1)" strokeWidth="2" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="icon1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 11H6C4.9 11 4 11.9 4 13V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V13C20 11.9 19.1 11 18 11Z" stroke="url(#icon2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 11V7C7 4.24 9.24 2 12 2C14.76 2 17 4.24 17 7V11" stroke="url(#icon2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="icon2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h3 className="feature-title">Non-Custodial Control</h3>
            <p className="feature-description">
              You own your wallet. LockPay never holds your funds. Payments flow directly 
              from buyer to seller on-chain with full transparency and auditability.
            </p>
            <div className="feature-metric">
              <span className="metric-value">100%</span>
              <span className="metric-label">self-custodial</span>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="url(#icon3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="url(#icon3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 15L11 17L15 13" stroke="url(#icon3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="icon3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="url(#icon4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="icon4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="url(#icon5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="icon5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className="feature-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#icon6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="url(#icon6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="url(#icon6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="icon6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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

      {/* How It Works Section */}
      <section className="landing-how-it-works">
        <div className="how-it-works-container">
          <div className="how-it-works-header">
            <h2 className="how-it-works-title">How It Works</h2>
            <p className="how-it-works-description">
              Get started with LockPay in three simple steps. No complex setup, no lengthy integrations—just 
              create, share, and get paid.
            </p>
          </div>
          <div className="how-it-works-steps">
            <div className="how-it-works-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-title">Create Your Paywall</h3>
                <p className="step-description">
                  Enter your content URL, set a price, and choose your wallet address. 
                  Get a unique paywall link in seconds.
                </p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="how-it-works-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-title">Share the Link</h3>
                <p className="step-description">
                  Share your paywall link anywhere—social media, email, or embed it directly 
                  in your website. One link, unlimited access.
                </p>
              </div>
            </div>
            <div className="step-arrow">→</div>
            <div className="how-it-works-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-title">Receive Payments</h3>
                <p className="step-description">
                  Payments flow directly to your wallet. No waiting, no fees, no intermediaries. 
                  Instant settlements in 2-5 seconds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="landing-tech">
        <div className="section-header">
          <h2 className="section-title">
            <svg className="section-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#useCaseGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="url(#useCaseGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#useCaseGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="useCaseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#01c3f3" />
                  <stop offset="100%" stopColor="#0178c8" />
                </linearGradient>
              </defs>
            </svg>
            Built for Every Use Case
          </h2>
          <p className="section-subtitle">
            From content creators to enterprise APIs
          </p>
        </div>

        <div className="use-cases-grid">
          <div className="use-case-item">
            <div className="use-case-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="url(#useIcon1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 2V8H20" stroke="url(#useIcon1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="useIcon1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className="use-case-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="url(#useIcon2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="useIcon2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className="use-case-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15V19C21 20.1 20.1 21 19 21H5C3.9 21 3 20.1 3 19V15" stroke="url(#useIcon3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7 10L12 15L17 10" stroke="url(#useIcon3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 15V3" stroke="url(#useIcon3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="useIcon3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
            <div className="use-case-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="url(#useIcon4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="url(#useIcon4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="url(#useIcon4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="useIcon4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#01c3f3" />
                    <stop offset="100%" stopColor="#0178c8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
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
          <h2 className="cta-title">
            Ready to Get Started?
          </h2>
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
