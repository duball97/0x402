import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
// Monad address validation utilities can be imported here if needed

function Create() {
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [paywallId, setPaywallId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationError, setValidationError] = useState(null);
  const [network, setNetwork] = useState('Monad');

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
    if (!walletAddress || !walletAddress.trim()) {
      setValidationError('Please enter a Monad wallet address');
      return;
    }
    // Validate Monad address format (0x followed by 40 hex characters)
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress.trim())) {
      setValidationError('Please enter a valid Monad wallet address (0x followed by 40 hexadecimal characters)');
      return;
    }

    setLoading(true);
    setError(null);
    setValidationError(null);
    setResult(null);

    // Validate and process URL
    let processedUrl = url.trim();
    
    // Remove any whitespace
    processedUrl = processedUrl.replace(/\s+/g, '');
    
    // Block suspicious/malicious domains
    const blockedDomains = ['bedpage.com', 'bedpage', 'porn', 'xxx', 'adult'];
    const lowerUrl = processedUrl.toLowerCase();
    if (blockedDomains.some(domain => lowerUrl.includes(domain))) {
      setValidationError('This URL contains blocked content. Please use a valid URL.');
      setLoading(false);
      return;
    }
    
    // Validate URL format
    try {
      // Auto-add https:// if protocol is missing
      if (!processedUrl.match(/^https?:\/\//i)) {
        processedUrl = `https://${processedUrl}`;
      }
      
      // Validate URL is properly formatted
      const urlObj = new URL(processedUrl);
      
      // Ensure it's http or https
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        setValidationError('URL must use http:// or https:// protocol');
        setLoading(false);
        return;
      }
      
      // Block localhost and private IPs in production
      const hostname = urlObj.hostname.toLowerCase();
      if (hostname === 'localhost' || hostname.startsWith('127.') || hostname.startsWith('192.168.') || hostname.startsWith('10.') || hostname.startsWith('172.')) {
        setValidationError('Localhost and private IP addresses are not allowed');
        setLoading(false);
        return;
      }
      
    } catch (err) {
      setValidationError('Please enter a valid URL (e.g., https://example.com/page)');
      setLoading(false);
      return;
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
          walletAddress: walletAddress.trim(),
          network,
        }),
      });

      // Check if response is OK
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Unknown error occurred' }));
        console.error('API error response:', { status: res.status, error: errorData });
        throw new Error(errorData.error || `Server error: ${res.status}`);
      }

      const data = await res.json();
      
      // Log the response for debugging
      console.log('API response received:', { 
        hasPaywallLink: !!data?.paywall_link, 
        paywallId: data?.paywall_id,
        network: data?.network 
      });
      
      // Validate that we have the required data
      if (!data || !data.paywall_id) {
        throw new Error('Invalid response from server. Paywall ID not found.');
      }

      // Always use current origin for paywall link to prevent redirects
      // Ignore paywall_link from API and construct it ourselves for security
      const safePaywallLink = `${window.location.origin}/paywall/${data.paywall_id}`;
      setResult({ ...data, paywall_link: safePaywallLink });
    } catch (err) {
      console.error('Error creating paywall:', err);
      setError(err.message || 'Failed to create paywall. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async (link) => {
    try {
      await navigator.clipboard.writeText(link);
      // Optional: Show a toast notification
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = link;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (e) {
        console.error('Fallback copy failed:', e);
      }
      document.body.removeChild(textArea);
    }
  };

  const paywallCurrencyLabel = 'MON';
  const paywallNetworkLabel = network;
  const previewDomain = (() => {
    if (!url) return 'your-url.com';
    try {
      const normalized = url.includes('://') ? url : `https://${url}`;
      return new URL(normalized).hostname;
    } catch (err) {
      return url;
    }
  })();
  const formattedPrice = (() => {
    if (!price) return '0.0000';
    const parsed = parseFloat(price);
    if (Number.isNaN(parsed)) return price;
    return parsed.toFixed(4);
  })();

  // Always construct paywall link using current origin to prevent redirects
  const resolvedResultLink = (result && result.paywall_id ? `${window.location.origin}/paywall/${result.paywall_id}` : null) || null;

  return (
    <>
      <Header />

      <main className="builder-shell">
        <section className="builder-header">
          <div className="builder-header-content">
            <h1 className="builder-main-title">Create Your Paywall</h1>
            <p className="builder-main-subtitle">
              Monetize any content in seconds. Set your price, share your link, start earning.
            </p>
          </div>
        </section>

        <section className="builder-layout">
          <form className="builder-form" onSubmit={createPaywall}>
            {validationError && (
              <div className="validation-banner" role="alert">
                <span>⚠</span>
                <p>{validationError}</p>
              </div>
            )}

            <div className="form-cluster">
              <div className="cluster-header">
                <h3>Content & Link</h3>
              </div>
              <div className="field-grid">
                <div className="input-group wide">
                  <label htmlFor="urlInput">
                    Content URL <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="urlInput"
                    placeholder="https://example.com/premium-content"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                  <p className="input-hint">Supports any reachable URL, API endpoint, or downloadable asset.</p>
                </div>

                <div className="input-group">
                  <label htmlFor="paywallIdInput">
                    Paywall ID <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="paywallIdInput"
                    placeholder="my-paywall-id"
                    value={paywallId}
                    onChange={(e) => setPaywallId(e.target.value.toLowerCase())}
                    pattern="[a-zA-Z0-9-_]+"
                  />
                  <p className="input-hint">Your paywall will be available at /paywall/{paywallId || 'your-id'}</p>
                </div>
              </div>
            </div>

            <div className="form-cluster">
              <div className="cluster-header">
                <h3>Pricing & Wallet</h3>
              </div>

              <div className="network-badge">
                <span className="network-label">Monad</span>
                <span className="network-tag">EVM · MON</span>
              </div>

              <div className="field-grid">
                <div className="input-group">
                  <label htmlFor="priceInput">
                    Price ({paywallCurrencyLabel}) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="priceInput"
                    placeholder="0.0000 (0 = free access)"
                    step="0.0001"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="walletAddress">
                    Wallet to receive the payment <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="walletAddress"
                    placeholder="Enter a Monad wallet address (0x...)"
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    required
                  />
                  <p className="input-hint">
                    Your Monad wallet address where payments will be received.
                  </p>
                </div>
              </div>
            </div>

            <div className="form-cluster">
              <div className="cluster-header">
                <h3>Description</h3>
              </div>
              <div className="input-group wide">
                <label htmlFor="descriptionInput">What buyers unlock (optional)</label>
                <textarea
                  id="descriptionInput"
                  placeholder="Describe what buyers receive when they pay..."
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? (
                  <>
                    <span className="btn-spinner"></span> Creating…
                  </>
                ) : (
                  <>Deploy paywall</>
                )}
              </button>
              <p className="form-helper">Funds settle instantly on Monad. MonPay never takes custody.</p>
            </div>
          </form>

          <aside className="builder-aside">
            {loading && (
              <div className="aside-card loading-card">
                <div className="loading-spinner"></div>
                <p className="loading-text">Minting your paywall…</p>
                <p className="loading-footnote">Signing payload on {paywallNetworkLabel}</p>
              </div>
            )}

            {error && (
              <div className="aside-card error-card" role="alert">
                <div className="error-icon">⚠</div>
                <h3>Could not create paywall</h3>
                <p>{error}</p>
                <button type="button" className="tertiary-btn" onClick={() => setError(null)}>
                  Dismiss
                </button>
              </div>
            )}

            {result && !loading && !error && (
              <div className="aside-stack">
                <div className="aside-card success-card">
                  <div className="card-heading">
                    <span className="pill-gradient">Live link</span>
                    <h3>Paywall deployed</h3>
                  </div>
                  {resolvedResultLink && (
                    <div className="link-box">
                      <code>{resolvedResultLink}</code>
                      <button type="button" onClick={() => copyLink(resolvedResultLink)} className="copy-btn">
                        Copy link
                      </button>
                    </div>
                  )}

                  <div className="result-grid">
                    <div>
                      <span className="metric-label">Price</span>
                      <span className="metric-value">{result.price} {result.currency}</span>
                    </div>
                    <div>
                      <span className="metric-label">Network</span>
                      <span className="metric-value">{result.network || paywallNetworkLabel}</span>
                    </div>
                  </div>

                  {result.walletAddress && (
                    <div className="result-section">
                      <span className="result-label">Payout wallet</span>
                      <code className="wallet-address">{result.walletAddress}</code>
                    </div>
                  )}

                  <div className="success-actions">
                    {resolvedResultLink && (
                      <a className="gradient-btn" href={resolvedResultLink} target="_blank" rel="noopener noreferrer">
                        Open paywall ↗
                      </a>
                    )}
                    {result.paywall_id && (
                      <button
                        type="button"
                        className="tertiary-btn"
                        onClick={() => window.open(`/paywall/${result.paywall_id}`, '_blank')}
                      >
                        View checkout screen
                      </button>
                    )}
                  </div>
                </div>

                <div className="aside-card">
                  <h4>Next steps</h4>
                  <ul className="insight-list">
                    <li>Embed the link behind your website CTAs or share it directly with your audience.</li>
                    <li>Use the library page so buyers can reconnect wallets and revisit unlocked content.</li>
                    <li>Clone this paywall with alternate pricing for bundles, upgrades, or limited drops.</li>
                  </ul>
                </div>
              </div>
            )}

            {!loading && !error && !result && (
              <div className="aside-stack">
                <div className="aside-card preview-card">
                  <div className="card-heading">
                    <span className="pill-outline">Live preview</span>
                    <h3>{paywallId || 'monpay/paywall'}</h3>
                  </div>
                  <div className="preview-pane">
                    <div className="preview-price">
                      <span className="metric-label">Price</span>
                      <span className="metric-value">{formattedPrice} {paywallCurrencyLabel}</span>
                    </div>
                    <div className="preview-destination">
                      <span className="metric-label">Unlocks</span>
                      <span className="metric-value">{previewDomain}</span>
                    </div>
                    <p className="preview-copy">{description || 'Describe the value buyers receive once they complete payment.'}</p>
                    <button className="preview-pay-btn" type="button" disabled>
                      Pay with Web3 Wallet
                    </button>
                    <div className="preview-flags">
                      <span>⚡ Instant settlement</span>
                      <span>🔐 Non-custodial</span>
                      <span>🧠 HTTP 402 native</span>
                    </div>
                  </div>
                </div>

                <div className="aside-card">
                  <h4>Launch checklist</h4>
                  <ul className="insight-list">
                    <li>Verify the destination URL loads correctly behind the paywall.</li>
                    <li>Share the link with a test wallet to review the checkout experience.</li>
                    <li>Update the description so buyers instantly know what they unlock.</li>
                  </ul>
                </div>
              </div>
            )}
          </aside>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Create;
