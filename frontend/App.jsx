import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);

  const createPaywall = async (e) => {
    e.preventDefault();

    // Validation
    if (!url) {
      setValidationError('Please enter a URL');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      setValidationError('Please enter a valid price');
      return;
    }

    setLoading(true);
    setError(null);
    setValidationError(null);
    setResult(null);

    try {
      const res = await fetch('/api/create-paywall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          price,
          walletAddress: walletAddress || null,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          <img src="/logore.png" alt="Payx402" />
        </div>
        <span className="nav-subtitle">Turn links into revenue</span>
      </nav>

      <div className="main-layout">
        <section className="hero">
          <div className="hero-content">
            <h2>Create Your Paywall</h2>
            <p className="hero-description">Monetize content with crypto payments in seconds</p>
          </div>

          <form className="form-container compact-form" onSubmit={createPaywall}>
            {validationError && (
              <div className="validation-error">
                {validationError}
              </div>
            )}
            
            {/* Content URL - Full Width */}
            <div className="input-group full-width">
              <label htmlFor="urlInput">
                Content URL <span className="required">*</span>
              </label>
              <input
                type="url"
                id="urlInput"
                placeholder="https://example.com/premium-content"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Price and Wallet - Two Column */}
            <div className="form-row">
              <div className="input-group">
                <label htmlFor="priceInput">
                  Price (USDC) <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="priceInput"
                  placeholder="5.00"
                  step="0.01"
                  min="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="walletAddress">Wallet Address</label>
                <input
                  type="text"
                  id="walletAddress"
                  placeholder="0x742d35Cc..."
                  pattern="^0x[a-fA-F0-9]{40}$"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                />
              </div>
            </div>

            {/* Description - Full Width */}
            <div className="input-group full-width">
              <label htmlFor="descriptionInput">Description (Optional)</label>
              <textarea
                id="descriptionInput"
                placeholder="Brief description of your content..."
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <>
                  <span className="btn-spinner"></span> Creating...
                </>
              ) : (
                <>⚡ Create Paywall</>
              )}
            </button>

            <p className="form-footer-text">
              💡 Auto-generates wallet if not provided • Instant BNB Chain settlement
            </p>
          </form>
        </section>

        <aside className="result-panel">
          {loading && (
            <div className="result-container">
              <div className="loading-spinner"></div>
              <p className="loading-text">Creating paywall...</p>
            </div>
          )}

          {error && (
            <div className="result-container error-container">
              <div className="error-icon">❌</div>
              <h3>Error</h3>
              <p>Failed to create paywall</p>
              <code>{error}</code>
            </div>
          )}

          {result && (
            <div className="result-container success-container">
              <div className="success-icon">✓</div>
              <h3>Paywall Created!</h3>
              
              <div className="result-section">
                <div className="result-label">Paywall Link</div>
                <div className="link-box">
                  <code>{result.paywall_link}</code>
                  <button
                    type="button"
                    onClick={() => copyLink(result.paywall_link)}
                    className="copy-btn"
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div className="result-section">
                <div className="result-label">Price</div>
                <div className="result-value">{result.price} {result.currency}</div>
              </div>

              {result.walletAddress && (
                <div className="result-section">
                  <div className="result-label">Payout Wallet</div>
                  <code className="wallet-address">{result.walletAddress}</code>
                </div>
              )}

              <div className="info-box">
                <p>🔗 Share this link to monetize your content</p>
                <p>💰 Payments settle to your wallet on BNB Chain</p>
                <p>⚡ Instant payouts in USDC</p>
              </div>
            </div>
          )}

          {!loading && !error && !result && (
            <div className="preview-placeholder">
              <div className="preview-header">
                <h3>Preview</h3>
                <span className="preview-badge">Live Preview</span>
              </div>
              
              <div className="preview-paywall-card">
                <div className="preview-lock-icon">🔒</div>
                <h4>Content Locked</h4>
                <p className="preview-description">
                  {description || "Your content description will appear here"}
                </p>
                
                <div className="preview-price-box">
                  <span className="preview-price-label">Price</span>
                  <span className="preview-price-value">
                    ${price || "0.00"} USDC
                  </span>
                </div>

                <div className="preview-url-box">
                  <span className="preview-url-label">🔗 Unlocks</span>
                  <span className="preview-url-value">
                    {url ? (url.includes('://') ? new URL(url).hostname : url) : "your-url.com"}
                  </span>
                </div>

                <button className="preview-pay-btn" disabled>
                  Pay with Crypto
                </button>

                <div className="preview-features">
                  <span>⚡ Instant</span>
                  <span>🔐 Secure</span>
                  <span>💰 Multi-crypto</span>
                </div>
              </div>

              <div className="preview-info">
                <p className="preview-info-text">
                  👆 This is how your paywall will look to users
                </p>
              </div>
            </div>
          )}
        </aside>
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
              <li>Accept BTC, ETH, SOL & more</li>
              <li>Instant USDC settlements</li>
              <li>Non-custodial wallets</li>
              <li>Zero platform fees</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Technology</h4>
            <ul>
              <li>Powered by Coinbase CDP</li>
              <li>Built on BNB Chain</li>
              <li>ERC-4337 Wallets</li>
              <li>HTTP 402 Protocol</li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="https://payx402.com/docs" target="_blank" rel="noopener noreferrer">Documentation</a></li>
              <li><a href="https://x.com/payx402" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://github.com/payx402" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="mailto:support@payx402.com">Support</a></li>
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

export default App;
