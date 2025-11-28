import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import { getCurrentNetwork, isEVMWalletInstalled, connectEVMWallet, CHAIN_CONFIG } from './config';
import Header from './Header';
import Footer from './Footer';

function Paywall() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paywallData, setPaywallData] = useState(null);
  const [paid, setPaid] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [verifying, setVerifying] = useState(false);
  const resolvedNetwork = 'Monad';
  const resolvedCurrency = 'MON';

  // Validate and sanitize URL
  const validateUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    
    const trimmed = url.trim();
    if (!trimmed) return null;
    
    // Block suspicious/malicious domains
    const blockedDomains = ['bedpage.com', 'bedpage', 'porn', 'xxx', 'adult'];
    const lowerUrl = trimmed.toLowerCase();
    if (blockedDomains.some(domain => lowerUrl.includes(domain))) {
      return null;
    }
    
    try {
      // Ensure URL has protocol
      let urlToValidate = trimmed;
      if (!urlToValidate.match(/^https?:\/\//i)) {
        urlToValidate = `https://${urlToValidate}`;
      }
      
      const urlObj = new URL(urlToValidate);
      
      // Only allow http and https
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return null;
      }
      
      return urlObj.href;
    } catch (err) {
      return null;
    }
  };

  useEffect(() => {
    // Fetch paywall data from API
    const fetchPaywall = async () => {
      try {
        const response = await fetch(`/api/get-paywall?id=${id}`);
        const data = await response.json();
        
        // Validate and sanitize the URL
        if (data?.url) {
          const validatedUrl = validateUrl(data.url);
          if (!validatedUrl) {
            setError('Invalid or blocked URL in paywall. Please contact the paywall creator.');
            setLoading(false);
            return;
          }
          data.url = validatedUrl;
        }
        
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

  const handleVerifyTx = async () => {
    if (!txHash || !txHash.trim()) {
      setError('Please enter a transaction hash');
      return;
    }

    try {
      setVerifying(true);
      setError(null);

      console.log('Verifying transaction:', txHash);

      // Verify the transaction via API
      const response = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          txHash: txHash.trim(),
          network: 'Monad'
        })
      });

      const txData = await response.json();

      if (!txData.confirmed) {
        setError('Transaction not found or not yet confirmed. Please wait a few minutes and try again.');
        setVerifying(false);
        return;
      }

      console.log('Transaction verified:', txData);

      // Record the purchase
      try {
        await fetch('/api/record-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paywallId: id,
            buyerWalletAddress: txData.settled_to || 'unknown',
            transactionHash: txHash.trim(),
            network: 'Monad',
            amountPaid: parseFloat(paywallData?.price ?? '0'),
            currency: 'MON'
          })
        });
        console.log('Purchase recorded successfully');
      } catch (err) {
        console.warn('Failed to record purchase (non-critical):', err);
      }

      setPaid(true);
      setVerifying(false);
    } catch (err) {
      console.error('Verification error:', err);
      setError(err.message || 'Failed to verify transaction. Please try again.');
      setVerifying(false);
    }
  };

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

      // Handle Monad/EVM payment
      console.log('Starting Monad payment...');
      
      if (!isEVMWalletInstalled()) {
        setError('Please install MetaMask or another EVM-compatible wallet to make payments.');
        setLoading(false);
        return;
      }

      console.log('EVM wallet is installed, connecting...');

      // Connect to wallet
      let userAddress;
      try {
        userAddress = await connectEVMWallet();
        console.log('Connected to wallet:', userAddress);
      } catch (err) {
        console.error('Wallet connection error:', err);
        setError(err.message || 'Failed to connect to wallet. Please try again.');
        setLoading(false);
        return;
      }

      // Validate addresses
      if (!ethers.isAddress(paywallData.walletAddress)) {
        setError('Invalid recipient address');
        setLoading(false);
        return;
      }

      // Prevent self-payment
      if (userAddress.toLowerCase() === paywallData.walletAddress.toLowerCase()) {
        setError('You cannot pay yourself. This paywall is set to your own wallet address.');
        setLoading(false);
        return;
      }

      // Get provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Switch to Monad network if needed
      const config = getCurrentNetwork('Monad');
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${config.chainId.toString(16)}` }],
        });
      } catch (switchError) {
        // If chain doesn't exist, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: `0x${config.chainId.toString(16)}`,
                chainName: 'Monad Mainnet',
                nativeCurrency: {
                  name: 'MON',
                  symbol: 'MON',
                  decimals: 18
                },
                rpcUrls: [config.rpcUrl],
                blockExplorerUrls: [config.explorer]
              }],
            });
          } catch (addError) {
            setError('Failed to add Monad network. Please add it manually in your wallet.');
            setLoading(false);
            return;
          }
        } else {
          setError('Failed to switch to Monad network.');
          setLoading(false);
          return;
        }
      }

      // Convert price to wei (assuming 18 decimals for MON token)
      const priceInWei = ethers.parseEther(priceNum.toString());
      console.log(`Amount: ${priceNum} MON = ${priceInWei.toString()} wei`);

      // Create transaction
      console.log('Creating transaction...');
      let tx;
      try {
        tx = await signer.sendTransaction({
          to: paywallData.walletAddress,
          value: priceInWei,
        });
        console.log('Transaction sent:', tx.hash);
      } catch (err) {
        console.error('Transaction error:', err);
        
        // Handle user rejection
        if (err.code === 4001 || err.code === 'ACTION_REJECTED' || 
            (err.message && err.message.toLowerCase().includes('user rejected'))) {
          setError('Transaction was rejected. Please approve the transaction in your wallet.');
          setLoading(false);
          return;
        }
        
        // Handle insufficient funds
        if (err.message && err.message.includes('insufficient')) {
          setError('Insufficient balance to complete this transaction.');
          setLoading(false);
          return;
        }
        
        // Handle self-payment error (same from/to address)
        if (err.code === 'CALL_EXCEPTION' || (err.message && err.message.includes('revert data'))) {
          if (userAddress.toLowerCase() === paywallData.walletAddress.toLowerCase()) {
            setError('You cannot pay yourself. This paywall is set to your own wallet address.');
          } else {
            setError('Transaction failed. Please check that you have sufficient balance and are on the correct network.');
          }
          setLoading(false);
          return;
        }
        
        // Generic error
        setError(err.message || 'Failed to send transaction. Please try again.');
        setLoading(false);
        return;
      }
      
      console.log('Transaction submitted. View on explorer:', `${config.explorer}/tx/${tx.hash}`);

      // Grant access immediately (optimistic) - transaction is already submitted
      // Background verification will happen automatically
      console.log('Transaction submitted. Access granted immediately.');

      // Record purchase
      try {
        await fetch('/api/record-purchase', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paywallId: id,
            buyerWalletAddress: userAddress,
            transactionHash: tx.hash,
            network: 'Monad',
            amountPaid: priceNum,
            currency: 'MON'
          })
        });
        console.log('Purchase recorded successfully');
      } catch (err) {
        console.warn('Failed to record purchase (non-critical):', err);
      }

      setPaid(true);
      setLoading(false);
    } catch (err) {
      console.error('Payment error:', err);
      if (err.code === 'ACTION_REJECTED' || err.code === 4001) {
        setError('Transaction was rejected. Please try again.');
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        setError('Insufficient balance to complete payment.');
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
              <p style={{ textAlign: 'center', fontSize: '16px', marginBottom: '24px' }}>Content unlocked</p>
              <a
                href={paywallData.url && validateUrl(paywallData.url) ? validateUrl(paywallData.url) : '#'}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px 28px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)',
                  color: '#000000',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #e5e5e5 100%)'}
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
              <h2>{paywallData?.id || 'Content Locked'}</h2>
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
                  {(!isNaN(parseFloat(paywallData?.price ?? '0')) ? parseFloat(paywallData?.price ?? '0').toFixed(4) : '0.0000')} {resolvedCurrency}
                </div>
          </div>

          {resolvedNetwork && (
            <div className="result-section">
              <div className="result-label">Network</div>
              <div className="result-value">{resolvedNetwork}</div>
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            style={{ marginTop: '32px' }}
          >
            {loading ? 'Processing...' : (parseFloat(paywallData?.price ?? '0') <= 0 ? 'Access for Free' : 'Pay with Wallet')}
          </button>

          <div className="info-box" style={{ marginTop: '32px' }}>
            <p>⚡ Instant settlement on {resolvedNetwork}</p>
            <p>🔐 Secure Web3 payment</p>
            <p>💰 Pay with MON on Monad</p>
          </div>

          {paywallData?.walletAddress && (
            <div className="result-section" style={{ marginTop: '24px' }}>
              <div className="result-label">Payment Address</div>
              <code className="wallet-address">{paywallData.walletAddress}</code>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: '32px', padding: '24px', background: '#111', border: '1px solid #1a1a1a', borderRadius: '12px' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#ccc' }}>HTTP 402 Protocol Support</h4>
          <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#888' }}>
            This paywall implements the HTTP 402 Payment Required protocol, enabling AI agents and automated systems to discover payment requirements programmatically.
          </p>
          <code style={{ display: 'block', background: '#0a0a0a', padding: '12px', borderRadius: '6px', fontSize: '11px', color: '#0070f3' }}>
            HTTP/1.1 402 Payment Required<br/>
            X-Payment-Required: {(!isNaN(parseFloat(paywallData?.price ?? '0')) ? parseFloat(paywallData?.price ?? '0').toFixed(4) : '0.0000')} {resolvedCurrency}<br/>
            X-Payment-Address: {paywallData?.walletAddress || 'Loading...'}<br/>
            X-Payment-Network: {resolvedNetwork.toLowerCase()}
          </code>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Paywall;


