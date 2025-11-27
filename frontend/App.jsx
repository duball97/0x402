import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function App() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});
  const [carouselIndex, setCarouselIndex] = useState(0);

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
          <h1 className="hero-title-v2" data-animate id="hero-title">
            Buy and sell
            <br />
            <span className="hero-gradient-text">Links Privately</span>
          </h1>

          <p className="hero-description-v2" data-animate id="hero-desc">
            Transform your content into revenue with MonPay on Monad chain.
            Zero fees. Instant settlements. Native MonPay token payments. Built for creators,
            developers, and AI agents on the fastest EVM-compatible blockchain.
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
              <div className="stat-content-v2">
                <div className="stat-value-v2">2-5s</div>
                <div className="stat-label-v2">Settlement Time</div>
              </div>
            </div>
            <div className="stat-box-v2">
              <div className="stat-content-v2">
                <div className="stat-value-v2">0%</div>
                <div className="stat-label-v2">Platform Fees</div>
              </div>
            </div>
            <div className="stat-box-v2">
              <div className="stat-content-v2">
                <div className="stat-value-v2">100%</div>
                <div className="stat-label-v2">Self-Custodial</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Single Sentence Section */}
      <section className="single-sentence-section" data-animate id="single-sentence">
        <p className="single-sentence-text">
          The future of content monetization is here, powered by Monad blockchain.
        </p>
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
            <div className="bento-icon-large">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <h3 className="bento-title">Lightning Fast Settlements</h3>
            <p className="bento-desc">
              Payments settle in seconds on Monad chain. No waiting days for
              traditional processors. Your MonPay tokens arrive instantly with EVM compatibility.
            </p>
            <div className="bento-metric-showcase">
              <div className="metric-bar">
                <div className="metric-bar-fill" style={{width: '95%'}}></div>
              </div>
              <div className="metric-labels">
                <span>MonPay: 2-5s</span>
                <span className="metric-muted">Traditional: 3-7 days</span>
              </div>
            </div>
          </div>

          <div className="bento-card" data-animate id="bento-2">
            <div className="bento-card-bg"></div>
            <div className="bento-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
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
            <div className="bento-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 3h12l4 6-10 12L2 9z"/>
                <path d="M11 3L8 9l4 12 4-12-3-6"/>
                <path d="M2 9h20"/>
              </svg>
            </div>
            <h3 className="bento-title">Zero Platform Fees</h3>
            <p className="bento-desc">
              Keep 100% of your revenue. Only pay minimal gas fees on Monad (typically &lt;$0.01).
            </p>
            <div className="fee-comparison">
              <div className="fee-row">
                <span>MonPay</span>
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
            <div className="bento-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="8" width="18" height="12" rx="2"/>
                <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
                <circle cx="9" cy="14" r="1"/>
                <circle cx="15" cy="14" r="1"/>
                <path d="M9 18h6"/>
              </svg>
            </div>
            <h3 className="bento-title">Built for AI Agents & Automation</h3>
            <p className="bento-desc">
              HTTP 402 protocol enables autonomous agents to discover payment requirements
              and transact programmatically on Monad. The future of machine-to-machine commerce.
            </p>
            <div className="code-preview">
              <div className="code-line">
                <span className="code-comment">// AI agents can automatically detect and pay with MonPay</span>
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
            <div className="bento-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3 className="bento-title">Monad Native</h3>
            <p className="bento-desc">
              Built for Monad chain with EVM compatibility. Fast, efficient, and scalable payments.
            </p>
            <div className="chain-badges">
              <div className="chain-badge">MonPay</div>
              <div className="chain-badge">Monad</div>
              <div className="chain-badge chain-badge-soon">EVM Compatible</div>
            </div>
          </div>

          <div className="bento-card" data-animate id="bento-6">
            <div className="bento-card-bg"></div>
            <div className="bento-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
              </svg>
            </div>
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

      {/* Carousel Section - Replaces workflow */}
      <section className="carousel-section" data-animate id="workflow">
        <div className="section-header-v2">
          <span className="section-label">SIMPLE PROCESS</span>
          <h2 className="section-title-v2">From Idea to Revenue in 3 Steps</h2>
          <p className="section-desc-v2">
            No complex setup, no technical knowledge required. Create, share, and start earning.
          </p>
        </div>

        <div className="carousel-container">
          <div className="carousel-wrapper" style={{ transform: `translateX(-${carouselIndex * 100}%)` }}>
            <div className="carousel-slide">
              <div className="workflow-card">
                <div className="workflow-icon-wrapper">
                  <div className="workflow-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                  </div>
                </div>
                <h3 className="workflow-step-title">Create Your Paywall</h3>
                <p className="workflow-step-desc">
                  Enter your content URL, set your price in MonPay tokens, add your wallet address. Takes less than 60 seconds.
                </p>
              </div>
            </div>

            <div className="carousel-slide">
              <div className="workflow-card">
                <div className="workflow-icon-wrapper">
                  <div className="workflow-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                  </div>
                </div>
                <h3 className="workflow-step-title">Share Your Link</h3>
                <p className="workflow-step-desc">
                  Get a unique paywall link. Share it on social media, embed on your website, or send directly to customers.
                </p>
              </div>
            </div>

            <div className="carousel-slide">
              <div className="workflow-card">
                <div className="workflow-icon-wrapper">
                  <div className="workflow-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="1" x2="12" y2="23"/>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                    </svg>
                  </div>
                </div>
                <h3 className="workflow-step-title">Get Paid Instantly</h3>
                <p className="workflow-step-desc">
                  Customers pay with their wallet, funds arrive in yours within seconds. No middlemen, no delays, no fees.
                </p>
                <div className="payment-time">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '4px'}}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  2-5 seconds
                </div>
              </div>
            </div>
          </div>

          <div className="carousel-controls">
            <button 
              className="carousel-btn carousel-btn-prev"
              onClick={() => setCarouselIndex((prev) => (prev === 0 ? 2 : prev - 1))}
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <div className="carousel-dots">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`carousel-dot ${carouselIndex === index ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button 
              className="carousel-btn carousel-btn-next"
              onClick={() => setCarouselIndex((prev) => (prev === 2 ? 0 : prev + 1))}
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Use Cases Grid Section */}
      <section className="use-cases-section-v2" data-animate id="use-cases">
        <div className="section-header-v2">
          <span className="section-label">USE CASES</span>
          <h2 className="section-title-v2">Perfect for Every Creator & Developer</h2>
          <p className="section-desc-v2">
            Whether you're a solo creator or building the next big platform,
            MonPay scales with you on Monad.
          </p>
        </div>

        <div className="use-cases-grid-v2">
          <div className="use-case-card-v2">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <path d="M14 2v6h6"/>
                  <path d="M16 13H8"/>
                  <path d="M16 17H8"/>
                  <path d="M10 9H8"/>
                </svg>
              </div>
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

          <div className="use-case-card-v2">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
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

          <div className="use-case-card-v2">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                  <line x1="12" y1="22.08" x2="12" y2="12"/>
                </svg>
              </div>
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

          <div className="use-case-card-v2">
            <div className="use-case-bg"></div>
            <div className="use-case-header-v2">
              <div className="use-case-icon-v2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="8" width="18" height="12" rx="2"/>
                  <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
                  <circle cx="9" cy="14" r="1"/>
                  <circle cx="15" cy="14" r="1"/>
                  <path d="M9 18h6"/>
                </svg>
              </div>
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
                <div className="paywall-card-price">0.01 MonPay</div>
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
