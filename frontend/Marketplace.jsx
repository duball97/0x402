import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Marketplace() {
  const [paywalls, setPaywalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaywalls = async () => {
      try {
        const response = await fetch('/api/get-all-paywalls');
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`API ${response.status}: ${text.slice(0, 140)}`);
        }
        const data = await response.json();
        setPaywalls(data.paywalls || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPaywalls();
  }, []);

  const handleBuyClick = (id) => {
    navigate(`/paywall/${id}`);
  };

  return (
    <>
      <Header />

      <div className="marketplace-container">
        <section className="marketplace-hero">
          <h1>Marketplace</h1>
          <p className="marketplace-subtitle">
            Discover premium content from creators around the world
          </p>
        </section>

        {loading && (
          <div className="marketplace-loading">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading marketplace...</p>
          </div>
        )}

        {error && (
          <div className="marketplace-error">
            <div className="error-icon">❌</div>
            <h3>Error Loading Marketplace</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && paywalls.length === 0 && (
          <div className="marketplace-empty">
            <div className="empty-icon">📦</div>
            <h3>No Products Yet</h3>
            <p>Be the first to create a paywall and list it in the marketplace!</p>
            <a href="/" className="empty-cta-btn">
              Create Your First Paywall
            </a>
          </div>
        )}

        {!loading && !error && paywalls.length > 0 && (
          <div className="marketplace-grid">
            {paywalls.map((paywall) => (
              <div key={paywall.id} className="product-card">
                <div className="product-header">
                  <div className="product-icon">🔒</div>
                  <span className="product-badge">{paywall.currency}</span>
                </div>

                <div className="product-content">
                  <h3 className="product-title">
                    {paywall.id}
                  </h3>
                  {paywall.description && (
                    <p style={{ margin: '0 0 12px 0', color: '#aaa', lineHeight: 1.6 }}>
                      {paywall.description}
                    </p>
                  )}

                  {/* Destination link intentionally hidden on marketplace */}

                  <div className="product-price-section">
                    <div className="product-price">
                      <span className="price-value">{!isNaN(parseFloat(paywall.price)) ? parseFloat(paywall.price).toFixed(4) : paywall.price}</span>
                      <span className="price-currency">{paywall.currency}</span>
                    </div>
                  </div>
                </div>

                <div className="product-footer">
                  <button
                    onClick={() => handleBuyClick(paywall.id)}
                    className="product-buy-btn"
                  >
                    Buy Access
                  </button>
                  <div className="product-meta">
                    <span className="meta-item">
                      <span className="meta-icon">⚡</span>
                      Instant
                    </span>
                    <span className="meta-item">
                      <span className="meta-icon">🔐</span>
                      Secure
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>⚡ Payx402</h4>
            <p>Crypto-native paywalls powered by Coinbase CDP and the x402 protocol</p>
          </div>
          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li>Native BNB Payments</li>
              <li>Instant Settlements</li>
              <li>Non-custodial Wallets</li>
              <li>Zero Platform Fees</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Technology</h4>
            <ul>
              <li>Built on BNB Chain</li>
              <li>Web3 Integration</li>
              <li>MetaMask Compatible</li>
              <li>HTTP 402 Protocol</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Community</h4>
            <ul>
              <li><a href="/marketplace">Marketplace</a></li>
              <li><a href="/community">Join Community</a></li>
              <li><a href="https://x.com/payx402" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
              <li><a href="/docs">Documentation</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Payx402. MIT License.</p>
        </div>
      </footer>
    </>
  );
}

export default Marketplace;
