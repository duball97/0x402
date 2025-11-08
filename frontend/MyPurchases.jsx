import { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { isPhantomInstalled, connectPhantom } from './config';
import Header from './Header';
import Footer from './Footer';

function MyPurchases() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!isPhantomInstalled()) {
        setError('Please install Phantom wallet. Get it at https://phantom.app/');
        setLoading(false);
        return;
      }

      const publicKeyStr = await connectPhantom();
      setWalletAddress(publicKeyStr);
      await fetchPurchases(publicKeyStr);
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchases = async (address) => {
    if (!address) return;

    try {
      setFetching(true);
      setError(null);

      const response = await fetch(`/api/get-purchases?walletAddress=${address}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch purchases');
      }

      const data = await response.json();
      setPurchases(data.purchases || []);
    } catch (err) {
      console.error('Error fetching purchases:', err);
      setError(err.message || 'Failed to load purchases');
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (walletAddress) {
      fetchPurchases(walletAddress);
    }
  }, [walletAddress]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getExplorerUrl = (txHash) => `https://solscan.io/tx/${txHash}`;

  return (
    <>
      <Header />
      
      <main className="my-purchases-page">
        <div className="my-purchases-shell">
          <header className="my-purchases-hero">
            <span className="my-purchases-eyebrow">Your Library</span>
            <h1>My Purchases</h1>
            <p className="my-purchases-description">
              View all the paywalls you've purchased
            </p>
          </header>

          {!walletAddress ? (
            <section className="my-purchases-panel wallet-connect-panel">
              <div className="wallet-connect-copy">
                <h3>Connect a wallet</h3>
                <p>
                  Choose the network you used to unlock content. We&apos;ll surface every purchase tied to that address.
                </p>
              </div>

              <div className="wallet-connect-options">
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="wallet-option"
                >
                  <div className="wallet-option-main">
                    <span className="wallet-option-label">Phantom</span>
                    <span className="wallet-option-sub">Solana</span>
                  </div>
                  <span className="wallet-option-action">
                    {loading ? 'Connecting...' : 'Connect'}
                  </span>
                </button>
              </div>

              <p className="wallet-connect-hint">
                Connect your Phantom wallet to restore purchases tied to your Solana address. We only read your public key.
              </p>

              {error && (
                <div className="validation-error wallet-connect-error">
                  {error}
                </div>
              )}
            </section>
          ) : (
            <section className="my-purchases-panel purchases-panel">
              <div className="wallet-summary">
                <div className="wallet-summary-info">
                  <span className="wallet-summary-label">Connected wallet</span>
                  <p className="wallet-summary-address">
                    <code>{walletAddress}</code>
                  </p>
                </div>
                <div className="wallet-summary-actions">
                  <span className="wallet-network-pill">
                    Solana
                  </span>
                  <button
                    onClick={() => {
                      setWalletAddress(null);
                      setPurchases([]);
                    }}
                    className="cta-secondary wallet-disconnect-btn"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {fetching ? (
                <div className="purchases-loading">
                  <div className="loading-spinner"></div>
                  <p className="loading-text">Loading purchases...</p>
                </div>
              ) : error ? (
                <div className="validation-error">
                  {error}
                </div>
              ) : purchases.length === 0 ? (
                <div className="purchases-empty">
                  <h4>No purchases yet</h4>
                  <p>
                    Purchases made with this wallet will appear here. Head to the marketplace to discover new paywalls.
                  </p>
                </div>
              ) : (
                <div className="purchases-list">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="purchase-card">
                      <div className="purchase-header">
                        <div className="purchase-heading">
                          <h3 className="purchase-title">
                            {purchase.paywall?.description || `Paywall ${purchase.paywallId}`}
                          </h3>
                          <p className="purchase-date">
                            Purchased {formatDate(purchase.purchasedAt)}
                          </p>
                        </div>
                        <div className="purchase-meta">
                          <span className="purchase-amount">
                            {purchase.amountPaid} {purchase.currency}
                          </span>
                          <span className="purchase-network">Solana</span>
                        </div>
                      </div>

                      {purchase.paywall && (
                        <div className="purchase-body">
                          <p className="purchase-detail">
                            <span className="purchase-label">Content URL</span>
                            <a
                              href={purchase.paywall.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="purchase-link"
                            >
                              {purchase.paywall.url}
                            </a>
                          </p>
                          <p className="purchase-detail">
                            <span className="purchase-label">Paywall ID</span>
                            <code className="purchase-code">{purchase.paywallId}</code>
                          </p>
                          <p className="purchase-detail">
                            <span className="purchase-label">Transaction</span>
                            <a
                              href={getExplorerUrl(purchase.transactionHash)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="purchase-link"
                            >
                              {purchase.transactionHash.slice(0, 8)}...{purchase.transactionHash.slice(-8)}
                            </a>
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default MyPurchases;

