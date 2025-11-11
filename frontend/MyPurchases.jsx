import { useState, useEffect } from 'react';
import { PublicKey } from '@solana/web3.js';
import { isPhantomInstalled, connectPhantom } from './config';
import { isValidZcashAddress, getZcashTxExplorerUrl } from './zcashUtils';
import Header from './Header';
import Footer from './Footer';

function MyPurchases() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletNetwork, setWalletNetwork] = useState(null); // 'solana' or 'zcash'
  const [zcashAddressInput, setZcashAddressInput] = useState('');
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const connectSolanaWallet = async () => {
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
      setWalletNetwork('solana');
      await fetchPurchases(publicKeyStr, 'solana');
    } catch (err) {
      console.error('Wallet connection error:', err);
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setLoading(false);
    }
  };

  const connectZcashWallet = () => {
    setError(null);
    const address = zcashAddressInput.trim();

    if (!address) {
      setError('Please enter a Zcash address');
      return;
    }

    if (!isValidZcashAddress(address)) {
      setError('Invalid Zcash address. Please enter a valid transparent or shielded address.');
      return;
    }

    setWalletAddress(address);
    setWalletNetwork('zcash');
    fetchPurchases(address, 'zcash');
  };

  const fetchPurchases = async (address, network = 'solana') => {
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
    if (walletAddress && walletNetwork) {
      fetchPurchases(walletAddress, walletNetwork);
    }
  }, [walletAddress, walletNetwork]);

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
    if (walletNetwork === 'zcash') {
      return getZcashTxExplorerUrl(txHash);
    }
    return `https://solscan.io/tx/${txHash}`;
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
              
              {/* Solana */}
              <div className="connect-box">
                <div className="connect-label">
                  <strong>Phantom (Solana)</strong>
                </div>
                <button
                  onClick={connectSolanaWallet}
                  disabled={loading}
                  className="connect-btn"
                >
                  {loading ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </div>

              {/* Zcash */}
              <div className="connect-box">
                <div className="connect-label">
                  <strong>Zcash</strong>
                  <span>Enter your address</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter Zcash address"
                  value={zcashAddressInput}
                  onChange={(e) => setZcashAddressInput(e.target.value)}
                  className="zcash-input"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      connectZcashWallet();
                    }
                  }}
                />
                <button
                  onClick={connectZcashWallet}
                  className="connect-btn"
                >
                  Connect
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
                    {walletNetwork === 'zcash' ? 'Zcash' : 'Solana'}
                  </span>
                  <button
                    onClick={() => {
                      setWalletAddress(null);
                      setWalletNetwork(null);
                      setZcashAddressInput('');
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
                        {purchase.network || (walletNetwork === 'zcash' ? 'Zcash' : 'Solana')}
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

