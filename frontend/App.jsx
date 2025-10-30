import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createPaywall = async (e) => {
    e.preventDefault();

    // Validation
    if (!url) {
      alert('Please enter a URL');
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      alert('Please enter a valid price');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/create-paywall', {
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
    alert('Link copied to clipboard! 📋');
  };

  return (
    <>
      <nav>
        <h1>⚡ Payfirst</h1>
      </nav>

      <section className="hero">
        <h2>Turn any link into crypto revenue ⚡</h2>
        <p>Paywall any URL. Accept any crypto. Get paid in stablecoins instantly.</p>

        <form className="form-container" onSubmit={createPaywall}>
          <div className="input-group">
            <label htmlFor="urlInput">🔗 Your URL</label>
            <input
              type="url"
              id="urlInput"
              placeholder="https://example.com/article"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="priceInput">💰 Price (USDC)</label>
            <input
              type="number"
              id="priceInput"
              placeholder="2.99"
              step="0.01"
              min="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="wallet-section">
            <label htmlFor="walletAddress">🏦 Wallet Address (optional)</label>
            <input
              type="text"
              id="walletAddress"
              placeholder="0x..."
              pattern="^0x[a-fA-F0-9]{40}$"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
            <p className="help-text">Leave empty to create a new wallet</p>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Paywall'}
          </button>
        </form>
      </section>

      <div id="result">
        {loading && <p className="loading">Creating paywall... ⏳</p>}

        {error && (
          <div className="error-container">
            <h3>❌ Error</h3>
            <p>Failed to create paywall. Make sure the server is running.</p>
            <code>{error}</code>
          </div>
        )}

        {result && (
          <div className="result-container">
            <h3>✅ Paywall Created!</h3>
            <div className="result-item">
              <strong>Paywall ID:</strong> <code>{result.paywall_id}</code>
            </div>
            <div className="result-item">
              <strong>Your Paywall Link:</strong>
              <div className="link-box">
                <code>{result.paywall_link}</code>
                <button
                  type="button"
                  onClick={() => copyLink(result.paywall_link)}
                >
                  📋 Copy
                </button>
              </div>
            </div>
            <div className="result-item">
              <strong>Price:</strong> {result.price} {result.currency}
            </div>
            {result.walletAddress && (
              <div className="result-item">
                <strong>Payout Wallet:</strong> <code>{result.walletAddress}</code>
              </div>
            )}
            <div className="result-item">
              <strong>Status:</strong>{' '}
              <span className="status-badge">{result.status}</span>
            </div>
            <div className="info-box">
              <p>🔗 Share this link to monetize your content</p>
              <p>💰 Payments settle to your wallet on BNB Chain</p>
              <p>⚡ Instant payouts in USDC</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
