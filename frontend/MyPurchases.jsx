import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { PublicKey } from '@solana/web3.js';
import { isPhantomInstalled, connectPhantom } from './config';
import Header from './Header';
import Footer from './Footer';

function MyPurchases() {
  const [walletAddress, setWalletAddress] = useState(null);
  const [walletType, setWalletType] = useState(null); // 'solana' or 'bnb'
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const connectWallet = async (type) => {
    try {
      setLoading(true);
      setError(null);

      if (type === 'solana') {
        if (!isPhantomInstalled()) {
          setError('Please install Phantom wallet. Get it at https://phantom.app/');
          setLoading(false);
          return;
        }

        const publicKeyStr = await connectPhantom();
        setWalletAddress(publicKeyStr);
        setWalletType('solana');
        await fetchPurchases(publicKeyStr);
      } else if (type === 'bnb') {
        if (!window.ethereum) {
          setError('Please install MetaMask or another Web3 wallet');
          setLoading(false);
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        
        setWalletAddress(address);
        setWalletType('bnb');
        await fetchPurchases(address);
      }
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

  const getExplorerUrl = (txHash, network) => {
    if (network === 'Solana') {
      return `https://solscan.io/tx/${txHash}`;
    } else {
      return `https://bscscan.com/tx/${txHash}`;
    }
  };

  return (
    <>
      <Header />
      
      <div className="main-layout">
        <section className="hero">
          <div className="hero-content">
            <h2>My Purchases</h2>
            <p className="hero-description">View all the paywalls you've purchased</p>
          </div>

          {!walletAddress ? (
            <div className="wallet-connect-section">
              <p style={{ marginBottom: '24px', color: '#aaaaaa' }}>
                Connect your wallet to view your purchases
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button
                  onClick={() => connectWallet('solana')}
                  disabled={loading}
                  className="submit-btn"
                  style={{ minWidth: '200px' }}
                >
                  {loading ? 'Connecting...' : 'Connect Phantom (Solana)'}
                </button>
                <button
                  onClick={() => connectWallet('bnb')}
                  disabled={loading}
                  className="submit-btn"
                  style={{ minWidth: '200px' }}
                >
                  {loading ? 'Connecting...' : 'Connect MetaMask (BNB)'}
                </button>
              </div>
              {error && (
                <div className="validation-error" style={{ marginTop: '16px' }}>
                  {error}
                </div>
              )}
            </div>
          ) : (
            <div className="purchases-section">
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '24px',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <p style={{ color: '#aaaaaa', margin: 0 }}>
                    Connected: <code style={{ color: '#01c3f3' }}>{walletAddress}</code>
                  </p>
                  <p style={{ color: '#888', margin: '4px 0 0 0', fontSize: '14px' }}>
                    Network: {walletType === 'solana' ? 'Solana' : 'BNB Chain'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setWalletAddress(null);
                    setWalletType(null);
                    setPurchases([]);
                  }}
                  className="cta-secondary"
                  style={{ padding: '8px 16px', fontSize: '14px' }}
                >
                  Disconnect
                </button>
              </div>

              {fetching ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <div className="loading-spinner" style={{ marginBottom: '16px' }}></div>
                  <p className="loading-text">Loading purchases...</p>
                </div>
              ) : error ? (
                <div className="validation-error">
                  {error}
                </div>
              ) : purchases.length === 0 ? (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '60px 20px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}>
                  <p style={{ color: '#aaaaaa', fontSize: '18px', margin: 0 }}>
                    No purchases found
                  </p>
                  <p style={{ color: '#888', fontSize: '14px', margin: '8px 0 0 0' }}>
                    Purchases made with this wallet will appear here
                  </p>
                </div>
              ) : (
                <div className="purchases-list">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="purchase-card">
                      <div className="purchase-header">
                        <div>
                          <h3 style={{ margin: '0 0 8px 0', color: '#ffffff' }}>
                            {purchase.paywall?.description || `Paywall ${purchase.paywallId}`}
                          </h3>
                          <p style={{ margin: 0, color: '#aaaaaa', fontSize: '14px' }}>
                            Purchased {formatDate(purchase.purchasedAt)}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ 
                            fontSize: '20px', 
                            fontWeight: '700', 
                            color: '#01c3f3',
                            marginBottom: '4px'
                          }}>
                            {purchase.amountPaid} {purchase.currency}
                          </div>
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#888',
                            textTransform: 'uppercase'
                          }}>
                            {purchase.network}
                          </div>
                        </div>
                      </div>

                      {purchase.paywall && (
                        <div style={{ 
                          marginTop: '16px',
                          padding: '12px',
                          background: 'rgba(1, 195, 243, 0.05)',
                          borderRadius: '8px',
                          border: '1px solid rgba(1, 195, 243, 0.1)'
                        }}>
                          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#aaaaaa' }}>
                            <strong style={{ color: '#ffffff' }}>Content URL:</strong>{' '}
                            <a 
                              href={purchase.paywall.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: '#01c3f3', textDecoration: 'none' }}
                            >
                              {purchase.paywall.url}
                            </a>
                          </p>
                          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#aaaaaa' }}>
                            <strong style={{ color: '#ffffff' }}>Paywall ID:</strong>{' '}
                            <code style={{ color: '#01c3f3' }}>{purchase.paywallId}</code>
                          </p>
                          <p style={{ margin: 0, fontSize: '14px', color: '#aaaaaa' }}>
                            <strong style={{ color: '#ffffff' }}>Transaction:</strong>{' '}
                            <a 
                              href={getExplorerUrl(purchase.transactionHash, purchase.network)}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{ color: '#01c3f3', textDecoration: 'none' }}
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
            </div>
          )}
        </section>
      </div>

      <Footer />
    </>
  );
}

export default MyPurchases;

