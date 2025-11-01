import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';

function Create() {
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [paywallId, setPaywallId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [network, setNetwork] = useState('BNB Chain');
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
          if (price === '' || parseFloat(price) < 0) {
            setValidationError('Please enter a valid price (0 for free, or more)');
      return;
    }
    if (!paywallId) {
      setValidationError('Please enter a Paywall ID');
      return;
    }
    if (!/^[a-zA-Z0-9-_]+$/.test(paywallId)) {
      setValidationError('Paywall ID can only contain letters, numbers, hyphens, and underscores');
      return;
    }

    setLoading(true);
    setError(null);
    setValidationError(null);
    setResult(null);

    // Auto-add https:// if protocol is missing
    let processedUrl = url.trim();
    if (!processedUrl.match(/^https?:\/\//i)) {
      processedUrl = `https://${processedUrl}`;
    }

    try {
      const res = await fetch('/api/create-paywall', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: processedUrl,
          price,
          description,
          paywallId,
          walletAddress: walletAddress || null,
          network,
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
      <Header />

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
                type="text"
                id="urlInput"
                placeholder="example.com/premium-content"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            {/* Paywall ID - Full Width */}
            <div className="input-group full-width">
              <label htmlFor="paywallIdInput">
                Paywall ID <span className="required">*</span>
              </label>
              <input
                type="text"
                id="paywallIdInput"
                placeholder="my-premium-article"
                value={paywallId}
                onChange={(e) => setPaywallId(e.target.value.toLowerCase())}
                pattern="[a-zA-Z0-9-_]+"
              />
              <p className="input-hint">Use letters, numbers, hyphens, and underscores only. Must be unique.</p>
            </div>

            {/* Network Selector - Full Width */}
            <div className="input-group full-width">
              <label htmlFor="networkSelect">
                Network <span className="required">*</span>
              </label>
              <select
                id="networkSelect"
                value={network}
                onChange={(e) => setNetwork(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: '#0a0a0a',
                  border: '1px solid #2a2a2a',
                  borderRadius: '8px',
                  color: '#e5e5e5',
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                <option value="BNB Chain">BNB Chain</option>
                <option value="Solana">Solana</option>
              </select>
            </div>

            {/* Price and Wallet - Two Column */}
            <div className="form-row">
              <div className="input-group">
                       <label htmlFor="priceInput">
                         Price ({network === 'Solana' ? 'SOL' : 'BNB'}) <span className="required">*</span>
                       </label>
                <input
                  type="number"
                  id="priceInput"
                         placeholder="0.0000 (0 = free)"
                         step="0.0001"
                         min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="input-group">
                <label htmlFor="walletAddress">Wallet Address</label>
                <input
                  type="text"
                  id="walletAddress"
                  placeholder={network === 'Solana' ? 'Solana address...' : '0x742d35Cc...'}
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
              💡 Auto-generates wallet if not provided • Instant {network === 'Solana' ? 'SOL' : 'BNB'} settlement on {network === 'Solana' ? 'Solana' : 'BNB Chain'}
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
                <p>💰 Payments settle to your wallet on {result.network || 'BNB Chain'}</p>
                <p>⚡ Instant payouts in {result.currency || 'BNB'}</p>
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
                    {price || "0.00"} {network === 'Solana' ? 'SOL' : 'BNB'}
                  </span>
                </div>

                <div className="preview-url-box" style={{ marginBottom: 12 }}>
                  <span className="preview-url-label">🌐 Network</span>
                  <span className="preview-url-value">{network}</span>
                </div>

                <div className="preview-url-box">
                  <span className="preview-url-label">🔗 Unlocks</span>
                  <span className="preview-url-value">
                    {url ? (url.includes('://') ? new URL(url).hostname : url) : "your-url.com"}
                  </span>
                </div>

                <button className="preview-pay-btn" disabled>
                  Pay with {network === 'Solana' ? 'Phantom' : 'Crypto'}
                </button>

                <div className="preview-features">
                  <span>⚡ Instant</span>
                  <span>🔐 Secure</span>
                  <span>💰 {network === 'Solana' ? 'SOL Native' : 'BNB Native'}</span>
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

      <Footer />
    </>
  );
}

export default Create;
