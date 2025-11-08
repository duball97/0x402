import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getCurrentNetwork, isPhantomInstalled, connectPhantom, CHAIN_CONFIG } from './config';
import Header from './Header';
import Footer from './Footer';

function Paywall() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paywallData, setPaywallData] = useState(null);
  const [paid, setPaid] = useState(false);
  const resolvedNetwork = (paywallData?.network && paywallData.network.toLowerCase().includes('sol')) ? 'Solana' : 'Solana';
  const resolvedCurrency = 'SOL';

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

      const network = (paywallData?.network || 'Solana').toLowerCase().includes('sol') ? 'Solana' : 'Solana';

      if (network !== 'Solana') {
        setError('This paywall currently only supports Solana payments.');
        setLoading(false);
        return;
      }

      // Handle Solana payment
        console.log('Starting Solana payment...');
        
        if (!isPhantomInstalled()) {
          setError('Please install Phantom wallet to make Solana payments. Get it at https://phantom.app/');
          setLoading(false);
          return;
        }

        console.log('Phantom is installed, connecting...');

        // Connect to Phantom FIRST - this will open the wallet popup
        let publicKeyStr;
        try {
          publicKeyStr = await connectPhantom();
          console.log('Connected to Phantom:', publicKeyStr);
        } catch (err) {
          console.error('Phantom connection error:', err);
          setError(err.message || 'Failed to connect to Phantom wallet. Please try again.');
          setLoading(false);
          return;
        }

        // Validate addresses
        let fromPublicKey, toPublicKey;
        try {
          fromPublicKey = new PublicKey(publicKeyStr);
          toPublicKey = new PublicKey(paywallData.walletAddress);
          console.log('Addresses validated:', { from: fromPublicKey.toString(), to: toPublicKey.toString() });
        } catch (err) {
          setError(`Invalid address: ${err.message}`);
          setLoading(false);
          return;
        }

        // Calculate amount in lamports
        const priceInLamports = Math.floor(priceNum * LAMPORTS_PER_SOL);
        console.log(`Amount: ${priceNum} SOL = ${priceInLamports} lamports`);

        // Create a connection for transaction creation (we'll skip balance check)
        const connection = new Connection(CHAIN_CONFIG.SOLANA_MAINNET_RPC, 'confirmed');
        
        // Skip balance check - Phantom will handle it and show error if insufficient
        // This avoids RPC rate limit issues blocking the payment flow
        console.log('Skipping balance check - Phantom will handle it');

        // Create transaction
        console.log('Creating transaction...');
        const transaction = new Transaction();

        // Add transfer instruction
        transaction.add(
          SystemProgram.transfer({
            fromPubkey: fromPublicKey,
            toPubkey: toPublicKey,
            lamports: priceInLamports,
          })
        );

        // Get recent blockhash and set fee payer
        console.log('Getting blockhash...');
        let blockhash;
        try {
          const blockhashResult = await connection.getLatestBlockhash('finalized');
          blockhash = blockhashResult.blockhash;
        } catch (err) {
          console.warn('Failed to get finalized blockhash, trying confirmed:', err.message);
          try {
            const blockhashResult = await connection.getLatestBlockhash('confirmed');
            blockhash = blockhashResult.blockhash;
          } catch (err2) {
            console.error('Failed to get blockhash from both sources:', err2);
            setError('Failed to connect to Solana network. Please try again.');
            setLoading(false);
            return;
          }
        }
        transaction.recentBlockhash = blockhash;
        transaction.feePayer = fromPublicKey;

        console.log('Transaction prepared, requesting signature from Phantom...');
        console.log('This should open Phantom wallet now...');

        // Request signature and send from Phantom
        // THIS IS WHERE PHANTOM SHOULD POP UP
        let signature;
        try {
          // Phantom's signAndSendTransaction signs and sends the transaction
          // It returns the signature as a string or wrapped in an object
          console.log('Calling window.solana.signAndSendTransaction...');
          const result = await window.solana.signAndSendTransaction(transaction);
          console.log('Phantom returned:', result);
          
          // Phantom can return signature as string or { signature: string }
          if (typeof result === 'string') {
            signature = result;
          } else if (result?.signature) {
            signature = result.signature;
          } else {
            // Log the result to debug
            console.error('Unexpected Phantom response:', result);
            throw new Error('Unexpected response from Phantom wallet. Please try again.');
          }
          
          console.log('Transaction signature:', signature);
        } catch (err) {
          console.error('Transaction error:', err);
          
          // Handle user rejection
          if (err.code === 4001 || err.code === 'ACTION_REJECTED' || 
              (err.message && err.message.toLowerCase().includes('user rejected'))) {
            setError('Transaction was rejected. Please approve the transaction in Phantom.');
            setLoading(false);
            return;
          }
          
          // Handle insufficient funds
          if (err.message && (err.message.includes('insufficient') || err.message.includes('0x1'))) {
            setError('Insufficient SOL balance to complete this transaction.');
            setLoading(false);
            return;
          }
          
          // Generic error
          setError(err.message || 'Failed to send transaction. Please check Phantom wallet and try again.');
          setLoading(false);
          return;
        }
        
        const config = getCurrentNetwork('Solana');
        console.log('Transaction submitted. View on explorer:', `${config.explorer}/tx/${signature}`);

        // Wait for confirmation (optional - transaction is already sent)
        try {
          // Use a shorter timeout for confirmation
          const confirmation = await Promise.race([
            connection.confirmTransaction(signature, 'confirmed'),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Confirmation timeout')), 30000)
            )
          ]);
          console.log('Transaction confirmed!', confirmation);
        } catch (err) {
          console.warn('Confirmation timeout or error:', err.message);
          // Transaction is already submitted, continue
          console.log('Transaction submitted but confirmation pending. Access granted.');
        }

        // Record purchase
        try {
          await fetch('/api/record-purchase', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              paywallId: id,
              buyerWalletAddress: publicKeyStr,
              transactionHash: signature,
              network: 'Solana',
              amountPaid: priceNum,
              currency: 'SOL'
            })
          });
          console.log('Purchase recorded successfully');
        } catch (err) {
          console.warn('Failed to record purchase (non-critical):', err);
          // Don't block the user if purchase recording fails
        }

        setPaid(true);
        setLoading(false);
    } catch (err) {
      console.error('Payment error:', err);
      if (err.code === 'ACTION_REJECTED' || err.code === 4001) {
        setError('Transaction was rejected. Please try again.');
      } else if (err.code === 'INSUFFICIENT_FUNDS') {
        setError('Insufficient SOL balance to complete payment.');
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
                  background: 'linear-gradient(135deg, #0178c8 0%, #01c3f3 100%)',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0198d8 0%, #01c3f3 100%)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #0178c8 0%, #01c3f3 100%)'}
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
              {loading ? 'Processing...' : (parseFloat(paywallData?.price ?? '0') <= 0 ? 'Access for Free' : 'Pay with Phantom')}
          </button>

          <div className="info-box" style={{ marginTop: '32px' }}>
            <p>⚡ Instant settlement on {resolvedNetwork}</p>
            <p>🔐 Secure Web3 payment</p>
            <p>💰 Pay with SOL via Phantom</p>
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
                   X-Payment-Required: {(!isNaN(parseFloat(paywallData?.price ?? '0')) ? parseFloat(paywallData?.price ?? '0').toFixed(4) : '0.0000')} {resolvedCurrency}<br/>
            X-Payment-Address: {paywallData?.walletAddress || 'Loading...'}<br/>
            X-Payment-Network: solana
          </code>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Paywall;


