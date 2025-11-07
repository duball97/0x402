import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      document.querySelectorAll('[data-animate]').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <Header transparent />

      {/* Enhanced Hero Section with Floating Elements */}
      <section className="landing-hero-v2">
        <video
          className="hero-background-video-v2"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        <div className="hero-background-overlay-v2"></div>

        <div className="hero-gradient-bg">
          <div className="gradient-orb gradient-orb-1"
               style={{
                 transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`
               }}></div>
          <div className="gradient-orb gradient-orb-2"
               style={{
                 transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`
               }}></div>
          <div className="gradient-orb gradient-orb-3"
               style={{
                 transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
               }}></div>
        </div>

        <div className="hero-grid-overlay"></div>

        <div className="hero-content-v2">
          <div className="hero-badge" data-animate id="hero-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Built on HTTP 402 Protocol
          </div>

          <h1 className="hero-title-v2" data-animate id="hero-title">
            The Future of Digital
            <br />
            <span className="hero-gradient-text">Payments is Here</span>
          </h1>

          <p className="hero-description-v2" data-animate id="hero-desc">
            Transform your content into revenue with blockchain-powered paywalls.
            Zero fees. Instant settlements. Complete control. Built for creators,
            developers, and AI agents.
          </p>

          <div className="hero-cta-v2" data-animate id="hero-cta">
            <button
              onClick={() => navigate('/create')}
              className="btn-primary-v2 btn-compact"
              style={{ width: 'min(260px, 100%)' }}
            >
              <span>Create Paywall</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => navigate('/docs')}
              className="btn-secondary-v2 btn-compact"
              style={{ width: 'min(260px, 100%)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor"/>
              </svg>
              View Docs
            </button>
          </div>

          <div className="hero-stats-v2" data-animate id="hero-stats">
            <div className="stat-box-v2">
              <div className="stat-icon-v2">⚡</div>
              <div className="stat-content-v2">
                <div className="stat-value-v2">2-5s</div>
                <div className="stat-label-v2">Settlement Time</div>
              </div>
            </div>
            <div className="stat-box-v2">
              <div className="stat-icon-v2">💎</div>
              <div className="stat-content-v2">
                <div className="stat-value-v2">0%</div>
                <div className="stat-label-v2">Platform Fees</div>
              </div>
            </div>
            <div className="stat-box-v2">
              <div className="stat-icon-v2">🔒</div>
              <div className="stat-content-v2">
                <div className="stat-value-v2">100%</div>
                <div className="stat-label-v2">Self-Custodial</div>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-floating-cards">
          <div className="floating-card floating-card-1">
            <div className="card-glow"></div>
            <div className="card-content-mini">
              <div className="card-mini-header">Payment Received ✓</div>
              <div className="card-mini-amount">0.05 SOL</div>
            </div>
          </div>
          <div className="floating-card floating-card-2">
            <div className="card-glow"></div>
            <div className="card-content-mini">
              <div className="card-mini-header">Transaction</div>
              <div className="card-mini-status">Confirmed in 2.3s</div>
            </div>
          </div>
          <div className="floating-card floating-card-3">
            <div className="card-glow"></div>
            <div className="card-content-mini">
              <div className="card-mini-header">Gas Fee</div>
              <div className="card-mini-amount">$0.008</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="bento-section" data-animate id="bento-section">
        <div className="section-header-v2">
          <span className="section-label">POWERFUL FEATURES</span>
          <h2 className="section-title-v2">Everything You Need, Nothing You Don't</h2>
          <p className="section-desc-v2">
            Built for speed, security, and simplicity. Every feature designed to help you
            monetize faster and earn more.
          </p>
        </div>

        <div className="bento-grid">
          <div className="bento-card bento-large" data-animate id="bento-1">
            <div className="bento-card-bg"></div>
            <div className="bento-icon-large">⚡</div>
            <h3 className="bento-title">Lightning Fast Settlements</h3>
            <p className="bento-desc">
              Payments settle in 2-5 seconds on Solana. No waiting days for
              traditional processors. Your money arrives instantly.
            </p>
            <div className="bento-metric-showcase">
              <div className="metric-bar">
                <div className="metric-bar-fill" style={{width: '95%'}}></div>
              </div>
              <div className="metric-labels">
                <span>Vaultx402: 2-5s</span>
                <span className="metric-muted">Traditional: 3-7 days</span>
              </div>
            </div>
          </div>

          <div className="bento-card" data-animate id="bento-2">
            <div className="bento-card-bg"></div>
            <div className="bento-icon">🔒</div>
            <h3 className="bento-title">100% Non-Custodial</h3>
            <p className="bento-desc">
              You own your wallet, you control your funds. We never touch your money.
            </p>
            <div className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Self-Custodial
            </div>
          </div>

          <div className="bento-card" data-animate id="bento-3">
            <div className="bento-card-bg"></div>
            <div className="bento-icon">💎</div>
            <h3 className="bento-title">Zero Platform Fees</h3>
            <p className="bento-desc">
              Keep 100% of your revenue. Only pay minimal gas fees (typically &lt;$0.01).
            </p>
            <div className="fee-comparison">
              <div className="fee-row">
                <span>Vaultx402</span>
                <span className="fee-value success">0%</span>
              </div>
              <div className="fee-row muted">
                <span>Competitors</span>
                <span className="fee-value">2-10%</span>
              </div>
            </div>
          </div>

          <div className="bento-card bento-wide" data-animate id="bento-4">
            <div className="bento-card-bg"></div>
            <div className="bento-icon">🤖</div>
            <h3 className="bento-title">Built for AI Agents & Automation</h3>
            <p className="bento-desc">
              HTTP 402 protocol enables autonomous agents to discover payment requirements
              and transact programmatically. The future of machine-to-machine commerce.
            </p>
            <div className="code-preview">
              <div className="code-line">
                <span className="code-comment">// AI agents can automatically detect and pay</span>
              </div>
              <div className="code-line">
                <span className="code-keyword">const</span> paywall = <span className="code-keyword">await</span> <span className="code-function">detectPaywall</span>(<span className="code-string">url</span>);
              </div>
              <div className="code-line">
                <span className="code-keyword">await</span> paywall.<span className="code-function">pay</span>();
              </div>
            </div>
          </div>

          <div className="bento-card" data-animate id="bento-5">
            <div className="bento-card-bg"></div>
            <div className="bento-icon">🌐</div>
            <h3 className="bento-title">Multi-Chain Support</h3>
            <p className="bento-desc">
              Runs on Solana. More chains coming soon.
            </p>
            <div className="chain-badges">
              <div className="chain-badge">SOL</div>
              <div className="chain-badge chain-badge-soon">More Chains Soon</div>
            </div>
          </div>

          <div className="bento-card" data-animate id="bento-6">
            <div className="bento-card-bg"></div>
            <div className="bento-icon">🚀</div>
            <h3 className="bento-title">Setup in 60 Seconds</h3>
            <p className="bento-desc">
              No signup, no complex integration. Just create and share.
            </p>
            <div className="setup-steps-mini">
              <div className="step-mini">1. Create</div>
              <div className="step-arrow-mini">→</div>
              <div className="step-mini">2. Share</div>
              <div className="step-arrow-mini">→</div>
              <div className="step-mini">3. Earn</div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual How It Works Section */}
      <section className="workflow-section" data-animate id="workflow">
        <div className="section-header-v2">
          <span className="section-label">SIMPLE PROCESS</span>
          <h2 className="section-title-v2">From Idea to Revenue in 3 Steps</h2>
          <p className="section-desc-v2">
            No complex setup, no technical knowledge required. Create, share, and start earning.
          </p>
        </div>

        <div className="workflow-container">
          <div className="workflow-line"></div>

          <div className="workflow-step" data-animate id="workflow-1">
            <div className="workflow-card">
              <div className="workflow-number">01</div>
              <div className="workflow-icon-wrapper">
                <div className="workflow-icon">✏️</div>
              </div>
              <h3 className="workflow-step-title">Create Your Paywall</h3>
              <p className="workflow-step-desc">
                Enter your content URL, set your price in SOL, add your wallet
                address. Takes less than 60 seconds.
              </p>
              <div className="workflow-visual">
                <div className="mini-form">
                  <div className="mini-input">Content URL</div>
                  <div className="mini-input">Price: 0.01 SOL</div>
                  <div className="mini-input">Wallet Address</div>
                  <div className="mini-button">Create Paywall</div>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step" data-animate id="workflow-2">
            <div className="workflow-card">
              <div className="workflow-number">02</div>
              <div className="workflow-icon-wrapper">
                <div className="workflow-icon">🔗</div>
              </div>
              <h3 className="workflow-step-title">Share Your Link</h3>
              <p className="workflow-step-desc">
                Get a unique paywall link. Share it on social media, embed on your website,
                or send directly to customers.
              </p>
              <div className="workflow-visual">
                <div className="share-preview">
                  <div className="share-link">vaultx402.com/p/abc123</div>
                  <div className="share-icons">
                    <div className="share-icon">🐦</div>
                    <div className="share-icon">📧</div>
                    <div className="share-icon">💬</div>
                    <div className="share-icon">📋</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="workflow-step" data-animate id="workflow-3">
            <div className="workflow-card">
              <div className="workflow-number">03</div>
              <div className="workflow-icon-wrapper">
                <div className="workflow-icon">💰</div>
              </div>
              <h3 className="workflow-step-title">Get Paid Instantly</h3>
              <p className="workflow-step-desc">
                Customers pay with their wallet, funds arrive in yours within seconds.
                No middlemen, no delays, no fees.
              </p>
              <div className="workflow-visual">
                <div className="payment-flow">
                  <div className="flow-box">Customer 👤</div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-box">Blockchain ⛓️</div>
                  <div className="flow-arrow">→</div>
                  <div className="flow-box success">You 💎</div>
                </div>
                <div className="payment-time">⚡ 2-5 seconds</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" data-animate id="stats">
        <div className="stats-grid">
          <div className="stat-card-large" data-animate id="stat-1">
            <div className="stat-card-bg"></div>
            <div className="stat-large-number">$0</div>
            <div className="stat-large-label">Setup Cost</div>
            <p className="stat-large-desc">No signup fees, no monthly subscriptions, no hidden charges</p>
          </div>

          <div className="stat-card-large" data-animate id="stat-2">
            <div className="stat-card-bg"></div>
            <div className="stat-large-number">
              <span className="counting-number">2.4</span>s
            </div>
            <div className="stat-large-label">Average Settlement</div>
            <p className="stat-large-desc">Lightning fast payments on Solana</p>
          </div>

          <div className="stat-card-large" data-animate id="stat-3">
            <div className="stat-card-bg"></div>
            <div className="stat-large-number">100%</div>
            <div className="stat-large-label">Revenue Kept</div>
            <p className="stat-large-desc">Zero platform fees means you keep everything you earn</p>
          </div>

          <div className="stat-card-large" data-animate id="stat-4">
            <div className="stat-card-bg"></div>
            <div className="stat-large-number">&lt;60s</div>
            <div className="stat-large-label">Setup Time</div>
            <p className="stat-large-desc">From creation to your first paywall in under a minute</p>
          </div>
        </div>
      </section>

      {/* Use Cases Cards Section */}
      <section className="use-cases-section-v2" data-animate id="use-cases">
        <div className="section-header-v2">
          <span className="section-label">USE CASES</span>
          <h2 className="section-title-v2">Perfect for Every Creator & Developer</h2>
          <p className="section-desc-v2">
            Whether you're a solo creator or building the next big platform,
            Vaultx402 scales with you.
          </p>
        </div>

        <div className="use-cases-grid-v2">
          <div className="use-case-card-v2" data-animate id="usecase-1">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">📝</div>
              <span className="use-case-badge">Content Creators</span>
            </div>
            <h3 className="use-case-title-v2">Premium Content & Media</h3>
            <p className="use-case-desc-v2">
              Monetize articles, videos, podcasts, research papers, exclusive tutorials,
              and more. One-time payments or recurring access.
            </p>
            <div className="use-case-examples">
              <div className="example-tag">Articles</div>
              <div className="example-tag">Videos</div>
              <div className="example-tag">Courses</div>
              <div className="example-tag">Research</div>
            </div>
          </div>

          <div className="use-case-card-v2" data-animate id="usecase-2">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">⚡</div>
              <span className="use-case-badge">Developers</span>
            </div>
            <h3 className="use-case-title-v2">API & Service Monetization</h3>
            <p className="use-case-desc-v2">
              Per-request pricing for AI models, data feeds, compute resources,
              and developer tools. Perfect for automation and high-volume use.
            </p>
            <div className="use-case-examples">
              <div className="example-tag">AI APIs</div>
              <div className="example-tag">Data Feeds</div>
              <div className="example-tag">Compute</div>
              <div className="example-tag">Tools</div>
            </div>
          </div>

          <div className="use-case-card-v2" data-animate id="usecase-3">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">📦</div>
              <span className="use-case-badge">Merchants</span>
            </div>
            <h3 className="use-case-title-v2">Digital Products & Downloads</h3>
            <p className="use-case-desc-v2">
              Sell software, templates, design assets, ebooks, music, and any digital
              file. Instant delivery with blockchain verification.
            </p>
            <div className="use-case-examples">
              <div className="example-tag">Software</div>
              <div className="example-tag">Templates</div>
              <div className="example-tag">Assets</div>
              <div className="example-tag">Ebooks</div>
            </div>
          </div>

          <div className="use-case-card-v2" data-animate id="usecase-4">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">🤖</div>
              <span className="use-case-badge">AI & Automation</span>
            </div>
            <h3 className="use-case-title-v2">Autonomous Agent Payments</h3>
            <p className="use-case-desc-v2">
              Enable AI agents to discover, negotiate, and pay for services autonomously.
              HTTP 402 native for machine-to-machine commerce.
            </p>
            <div className="use-case-examples">
              <div className="example-tag">AI Agents</div>
              <div className="example-tag">Bots</div>
              <div className="example-tag">M2M</div>
              <div className="example-tag">IoT</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="cta-section-v2" data-animate id="cta">
        <div className="cta-gradient-bg">
          <div className="cta-orb cta-orb-1"></div>
          <div className="cta-orb cta-orb-2"></div>
        </div>

        <div className="cta-container-v2">
          <div className="cta-content-v2">
            <div className="cta-badge-v2">
              <span className="pulse-dot"></span>
              Ready to Launch
            </div>

            <h2 className="cta-title-v2">
              Start Earning in the Next
              <br />
              <span className="cta-highlight">60 Seconds</span>
            </h2>

            <p className="cta-desc-v2">
              No signup. No credit card. No technical knowledge required.
              <br />
              Just create your paywall and start monetizing your content today.
            </p>

            <div className="cta-buttons-v2">
              <button onClick={() => navigate('/create')} className="cta-btn-primary-v2">
                <span>Create Free Paywall</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <button onClick={() => navigate('/docs')} className="cta-btn-secondary-v2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
                <span>Read Docs</span>
              </button>
            </div>

            <div className="cta-trust-line">
              <div className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                No Credit Card
              </div>
              <div className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Free Forever
              </div>
              <div className="trust-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Setup in 60s
              </div>
            </div>
          </div>

          <div className="cta-visual">
            <div className="floating-paywall-card">
              <div className="paywall-card-glow"></div>
              <div className="paywall-card-header">
                <div className="paywall-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="paywall-card-body">
                <div className="paywall-card-title">Your Premium Content</div>
                <div className="paywall-card-price">0.01 SOL</div>
                <div className="paywall-card-button">Pay with Wallet</div>
                <div className="paywall-card-features">
                  <div className="paywall-feature">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Secure Payment
                  </div>
                  <div className="paywall-feature">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    Instant Access
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
