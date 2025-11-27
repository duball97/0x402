import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { isEVMWalletInstalled, connectEVMWallet, getCurrentNetwork } from './config';
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

      if (!isEVMWalletInstalled()) {
        setError('Please install MetaMask or another EVM-compatible wallet.');
        setLoading(false);
        return;
      }

      const address = await connectEVMWallet();
      setWalletAddress(address);
      await fetchPurchases(address, 'monad');
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchases = async (address, network = 'monad') => {
    if (!address) return;

    try {
      setFetching(true);
      setError(null);

      const response = await fetch(`/api/get-purchases?walletAddress=${address}&network=${network}`);
      
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
      fetchPurchases(walletAddress, 'monad');
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

  const getExplorerUrl = (txHash) => {
    const config = getCurrentNetwork('Monad');
    return `${config.explorer}/tx/${txHash}`;
  };

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
            <section className="connect-section">
              <h3>Connect Wallet</h3>
              
              <div className="connect-box">
                <div className="connect-label">
                  <strong>EVM Wallet (Monad)</strong>
                </div>
                <button
                  onClick={connectWallet}
                  disabled={loading}
                  className="connect-btn"
                >
                  {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>

              {error && (
                <div className="error-box">
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
                    Monad
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
                      <div className="purchase-title">
                        {purchase.paywall?.description || `Paywall ${purchase.paywallId}`}
                      </div>
                      <div className="purchase-date">
                        {formatDate(purchase.purchasedAt)}
                      </div>
                      <div className="purchase-amount">
                        {purchase.amountPaid} {purchase.currency}
                      </div>
                      <div className="purchase-network">
                        {purchase.network || 'Monad'}
                      </div>
                      {purchase.paywall && (
                        <a
                          href={purchase.paywall.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="purchase-link"
                        >
                          View
                        </a>
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

