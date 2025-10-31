import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { switchToBNBChain, getCurrentNetwork } from './config';
import Header from './Header';
import Footer from './Footer';

function Paywall() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paywallData, setPaywallData] = useState(null);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    // Fetch paywall data from API
    const fetchPaywall = async () => {
      try {
        const response = await fetch(`/api/get-paywall?id=${id}`);
        const data = await response.json();
        setPaywallData(data);
        // Auto-unlock if free
        const priceNum = parseFloat(data?.price ?? '0');
        if (!isNaN(priceNum) && priceNum <= 0) {
          setPaid(true);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPaywall();
  }, [id]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError(null);

      // Free paywall: no wallet required
      const priceNum = parseFloat(paywallData?.price ?? '0');
      if (!isNaN(priceNum) && priceNum <= 0) {
        setPaid(true);
        setLoading(false);
        return;
      }
      
      // Check if MetaMask or other wallet is installed
      if (!window.ethereum) {
        setError('Please install MetaMask or another Web3 wallet to make payments');
        setLoading(false);
        return;
      }

      // Switch to BNB Chain if needed
      const networkSwitched = await switchToBNBChain();
      if (!networkSwitched) {
        setError('Please switch to BNB Smart Chain to continue');
        setLoading(false);
        return;
      }

      // Connect to wallet
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      
      // Verify we're on the correct network
      const network = await provider.getNetwork();
      const config = getCurrentNetwork();
      if (Number(network.chainId) !== config.chainId) {
        setError('Please switch to BNB Smart Chain in your wallet');
        setLoading(false);
        return;
      }
      
      // Prepare payment
      const priceInWei = ethers.parseEther(paywallData.price.toString()); // BNB native token
      const toAddress = paywallData.walletAddress || '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

      // Validate address
      if (!ethers.isAddress(toAddress)) {
        setError('Invalid payment address');
        setLoading(false);
        return;
      }

      // Check user balance
      const balance = await provider.getBalance(await signer.getAddress());
      if (balance < priceInWei) {
        setError(`Insufficient BNB balance. Required: ${paywallData.price} BNB`);
        setLoading(false);
        return;
      }

      // Send BNB transaction
      console.log(`Sending ${paywallData.price} BNB to ${toAddress}`);

      const tx = await signer.sendTransaction({
        to: toAddress,
        value: priceInWei,
        gasLimit: 21000, // Standard gas limit for BNB transfer
      });
      
      console.log('Transaction hash:', tx.hash);
      console.log('View on explorer:', `${config.explorer}/tx/${tx.hash}`);
      
      // Wait for confirmation
      await tx.wait();
      console.log('Transaction confirmed!');
      
      setPaid(true);
      setLoading(false);
    } catch (err) {
      console.error('Payment error:', err);
      if (err.code === 'ACTION_REJECTED') {
        setError('Transaction was rejected. Please try again.');
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        setError('Insufficient BNB balance to complete payment.');
      } else {
        setError(err.message || 'Payment failed. Please try again.');
      }
      setLoading(false);
    }
  };

  if (loading && !paywallData) {
    return (
      <>
        <Header />
        <section className="hero" style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
          <div className="loading-spinner" style={{ marginBottom: '24px' }}></div>
          <p className="loading-text">Loading paywall...</p>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <section className="hero" style={{ maxWidth: '600px', margin: '60px auto' }}>
          <div className="result-container error-container">
            <div className="error-icon">❌</div>
            <h3>Error</h3>
            <p>Paywall not found</p>
            <code>{error}</code>
          </div>
        </section>
      </>
    );
  }

  if (paid) {
    return (
      <>
        <Header />
        <section className="hero" style={{ maxWidth: '600px', margin: '60px auto' }}>
          <div className="result-container success-container">
            <div className="success-icon">✓</div>
            <h3>{parseFloat(paywallData?.price ?? '0') <= 0 ? 'Free Access' : 'Payment Complete!'}</h3>
            <div className="info-box">
              <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '24px' }}>🔓 Content unlocked!</p>
              <a
                href={paywallData.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 28px',
                  background: '#4a1a3d',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#5a2a4d'}
                onMouseOut={(e) => e.currentTarget.style.background = '#4a1a3d'}
              >
                Access Content →
              </a>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="hero" style={{ maxWidth: '600px', margin: '60px auto' }}>
        <h2>Content Locked</h2>
        <p>This content requires payment to unlock</p>

        <div className="form-container">
          {error && (
            <div className="validation-error">
              {error}
            </div>
          )}

            <div className="result-section">
            <div className="result-label">Paywall ID</div>
            <code className="wallet-address">{paywallData?.id}</code>
          </div>
          <div className="result-section">
            <div className="result-label">Price</div>
                <div className="result-value" style={{ fontSize: '28px' }}>
                  {(!isNaN(parseFloat(paywallData?.price ?? '0')) ? parseFloat(paywallData?.price ?? '0').toFixed(4) : '0.0000')} BNB
                </div>
          </div>

          <button
            onClick={handlePayment}
              disabled={loading}
            style={{ marginTop: '32px' }}
          >
              {loading ? 'Processing...' : (parseFloat(paywallData?.price ?? '0') <= 0 ? 'Access for Free' : 'Pay with Crypto')}
          </button>

          <div className="info-box" style={{ marginTop: '32px' }}>
            <p>⚡ Instant settlement on BNB Chain</p>
            <p>🔐 Secure Web3 payment</p>
            <p>💰 Pay with BNB via MetaMask</p>
          </div>

          {paywallData?.walletAddress && (
            <div className="result-section" style={{ marginTop: '24px' }}>
              <div className="result-label">Payment Address</div>
              <code className="wallet-address">{paywallData.walletAddress}</code>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: '32px', padding: '24px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#ccc' }}>🔗 HTTP 402 Protocol Support</h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#888' }}>
            This paywall implements the HTTP 402 "Payment Required" protocol, enabling AI agents and automated systems to discover payment requirements programmatically.
          </p>
                 <code style={{ display: 'block', background: '#0a0a0a', padding: '12px', borderRadius: '6px', fontSize: '11px', color: '#0070f3' }}>
            HTTP/1.1 402 Payment Required<br/>
                   X-Payment-Required: {(!isNaN(parseFloat(paywallData?.price ?? '0')) ? parseFloat(paywallData?.price ?? '0').toFixed(4) : '0.0000')} BNB<br/>
            X-Payment-Address: {paywallData?.walletAddress || 'Loading...'}<br/>
            X-Payment-Network: bnb-chain
          </code>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Paywall;

