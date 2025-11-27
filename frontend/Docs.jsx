import Header from './Header';
import Footer from './Footer';

function Docs() {
  return (
    <>
      <Header />
      
      <div className="docs-container">
        {/* Hero Section */}
        <div className="docs-hero">
          <h1>Documentation</h1>
          <p className="docs-subtitle">
            Everything you need to build, deploy, and monetize with MonPay
          </p>
        </div>

        {/* Table of Contents */}
        <div className="docs-toc">
          <h3>On This Page</h3>
          <nav>
            <a href="#introduction">Introduction</a>
            <a href="#http-402">HTTP 402 Protocol</a>
            <a href="#getting-started">Getting Started</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#features">Features</a>
            <a href="#architecture">Architecture</a>
            <a href="#web3-integration">Web3 Integration</a>
            <a href="#api-reference">API Reference</a>
            <a href="#security">Security</a>
            <a href="#use-cases">Use Cases</a>
            <a href="#faq">FAQ</a>
          </nav>
        </div>

        {/* Main Content */}
        <div className="docs-content">
          
          {/* Introduction */}
          <section id="introduction" className="docs-section">
            <h2>Introduction</h2>
            <p>
              MonPay is a decentralized paywall protocol that enables instant monetization of any web content through native MonPay token payments. Built on Monad chain with EVM compatibility, MonPay brings the vision of HTTP 402 "Payment Required" to life in the Web3 era.
            </p>
            <div className="info-card">
              <div className="info-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  <circle cx="12" cy="12" r="5"/>
                </svg>
              </div>
              <div>
                <strong>What makes MonPay unique?</strong>
                <p>Unlike traditional paywalls that require accounts, subscriptions, and credit cards, MonPay enables instant, permissionless payments using MonPay tokens on Monad chain. No middlemen, no platform fees, no accounts needed.</p>
              </div>
            </div>
          </section>

          {/* HTTP 402 Protocol */}
          <section id="http-402" className="docs-section">
            <h2>HTTP 402 Protocol</h2>
            <p>
              The HTTP 402 status code was reserved in 1997 for future use as "Payment Required" but remained largely unimplemented for decades. MonPay brings this protocol to life for the blockchain era on Monad.
            </p>
            
            <h3>Protocol Specification</h3>
            <div className="code-block">
              <div className="code-header">
                <span>HTTP Response Headers</span>
                <span className="code-lang">HTTP</span>
              </div>
              <pre><code>{`HTTP/1.1 402 Payment Required
X-Payment-Required: 0.01 MonPay
X-Payment-Address: 0x...
X-Payment-Network: monad
X-Payment-Memo: paywall-abc123`}</code></pre>
            </div>

            <h3>Why HTTP 402 Matters</h3>
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="12" rx="2"/>
                    <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
                    <circle cx="9" cy="14" r="1"/>
                    <circle cx="15" cy="14" r="1"/>
                    <path d="M9 18h6"/>
                  </svg>
                </div>
                <h4>AI Agent Payments</h4>
                <p>AI agents can programmatically detect and fulfill payment requirements by parsing HTTP headers</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                </div>
                <h4>Machine-Readable</h4>
                <p>Standardized headers make payments discoverable and automatable across the web</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                </div>
                <h4>Instant Settlement</h4>
                <p>Payments settle on-chain in 2-5 seconds with sub-cent gas fees</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <h4>Universal Standard</h4>
                <p>Works with any HTTP client, browser, or API that supports custom headers</p>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section id="getting-started" className="docs-section">
            <h2>Getting Started</h2>
            <p>Create your first paywall in under 60 seconds:</p>
            
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h4>Enter Your URL</h4>
                  <p>Paste the URL of the content you want to monetize. Can be an article, video, file, API endpoint, or any web resource.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h4>Set Your Price</h4>
                  <p>Choose your price in MonPay tokens. Most creators start between 0.01 and 0.05 MonPay, but you can set any amount you like.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Add Wallet Address</h4>
                  <p>Provide your Monad wallet address to receive payments. If omitted, we'll generate a non-custodial wallet for you.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h4>Share Your Link</h4>
                  <p>Get your unique paywall link and start earning. Payments go directly to your wallet with zero platform fees.</p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="docs-section">
            <h2>How It Works</h2>
            <p>MonPay uses a simple but powerful architecture on Monad:</p>
            
            <div className="architecture-diagram">
              <div className="arch-step">
                <div className="arch-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <h4>1. User Visits Link</h4>
                <p>User clicks your paywall link</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <div className="arch-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h4>2. Paywall Displayed</h4>
                <p>Shows price & payment button</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <div className="arch-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                    <line x1="1" y1="10" x2="23" y2="10"/>
                  </svg>
                </div>
                <h4>3. Wallet Opens</h4>
                <p>User confirms transaction</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <div className="arch-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h4>4. Content Unlocked</h4>
                <p>Instant access after payment</p>
              </div>
            </div>

            <h3>Payment Flow</h3>
            <div className="code-block">
              <div className="code-header">
                <span>Transaction Flow</span>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre><code>{`// 1. User initiates payment
import { ethers } from 'ethers';

const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// Switch to Monad network
await window.ethereum.request({
  method: 'wallet_switchEthereumChain',
  params: [{ chainId: '0x2797' }], // Monad mainnet chain ID
});

// Send payment
const tx = await signer.sendTransaction({
  to: paywall.walletAddress,
  value: ethers.parseEther(paywall.price.toString()),
});

await tx.wait();

// Funds arrive in the creator's wallet within seconds`}</code></pre>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="docs-section">
            <h2>Features</h2>
            
            <div className="feature-list">
              <div className="feature-detail">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '8px'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="6" x2="12" y2="18"/>
                    <line x1="6" y1="12" x2="18" y2="12"/>
                  </svg>
                  Native MonPay Token Payments
                </h3>
                <p>Accept payments in native MonPay tokens on Monad chain. EVM compatible, fast, and efficient. Pure, simple cryptocurrency payments with instant settlement.</p>
              </div>
              
              <div className="feature-detail">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '8px'}}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Non-Custodial Architecture
                </h3>
                <p>MonPay <strong>never</strong> holds your funds. Payments go directly from payer to your wallet address on Monad. You retain full custody and control of your earnings at all times.</p>
              </div>
              
              <div className="feature-detail">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '8px'}}>
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                  Instant Settlements
                </h3>
                <p>Monad chain provides lightning-fast finality. Payments confirm in seconds. No waiting periods, no settlement delays, no payment processors.</p>
              </div>
              
              <div className="feature-detail">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '8px'}}>
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  Zero Platform Fees
                </h3>
                <p>We take <strong>0%</strong> of your revenue. The only costs are minimal network fees on Monad (typically fractions of a cent per transaction).</p>
              </div>
              
              <div className="feature-detail">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '8px'}}>
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  Permissionless & Global
                </h3>
                <p>No KYC, no accounts, no bank connections required. If you have a wallet address, you can receive payments from anyone, anywhere in the world.</p>
              </div>
              
              <div className="feature-detail">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '8px'}}>
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  Standard HTTP Protocol
                </h3>
                <p>Built on HTTP 402 standard, making your paywalls machine-readable and compatible with AI agents, bots, and automated systems.</p>
              </div>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="docs-section">
            <h2>Architecture</h2>
            
            <h3>Tech Stack</h3>
            <div className="tech-stack">
              <div className="tech-item">
                <strong>Frontend:</strong> React + Vite
              </div>
              <div className="tech-item">
                <strong>Blockchain:</strong> Monad
              </div>
              <div className="tech-item">
                <strong>Web3:</strong> EVM-compatible wallets & MonPay tokens
              </div>
              <div className="tech-item">
                <strong>Backend:</strong> Vercel Serverless Functions
              </div>
              <div className="tech-item">
                <strong>Database:</strong> Supabase (PostgreSQL)
              </div>
              <div className="tech-item">
                <strong>Protocol:</strong> HTTP 402 Payment Required
              </div>
            </div>

            <h3>Smart Contract Interaction</h3>
            <div className="code-block">
              <div className="code-header">
                <span>MonPay Token Transfer</span>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre><code>{`import { ethers } from 'ethers';

// Connect to Monad
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();

// MonPay token contract address
const monpayAddress = '0x...'; // MonPay token address on Monad
const monpayABI = [...]; // ERC20 ABI

const monpayContract = new ethers.Contract(monpayAddress, monpayABI, signer);

// Transfer MonPay tokens
const tx = await monpayContract.transfer(
  'CreatorWalletAddress',
  ethers.utils.parseEther('0.01')
);

await tx.wait();
console.log('Payment confirmed!', tx.hash);`}</code></pre>
            </div>
          </section>

          {/* Web3 Integration */}
          <section id="web3-integration" className="docs-section">
            <h2>Web3 Integration</h2>
            
            <h3>Network Configuration</h3>
            <div className="code-block">
              <div className="code-header">
                <span>Monad Config</span>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre><code>{`export const MONAD_CONFIG = {
  chainId: 0x...,
  rpcUrl: import.meta.env.VITE_MONAD_RPC_URL || 'https://rpc.monad.xyz',
  explorer: 'https://monad.xyz'
};

const provider = new ethers.providers.JsonRpcProvider(MONAD_CONFIG.rpcUrl);`}</code></pre>
            </div>

            <h3>Web3 Wallet Detection</h3>
            <div className="code-block">
              <div className="code-header">
                <span>Check for Web3 Wallet</span>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre><code>{`// Check if Web3 wallet is installed
if (!window.ethereum) {
  alert('Please install a Web3 wallet (MetaMask, etc.) to make payments');
  return;
}

// Request account access
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send('eth_requestAccounts', []);
const signer = provider.getSigner();
const address = await signer.getAddress();`}</code></pre>
            </div>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="docs-section">
            <h2>API Reference</h2>
            
            <h3>Create Paywall</h3>
            <div className="api-endpoint">
              <div className="endpoint-method">POST</div>
              <div className="endpoint-path">/api/create-paywall</div>
            </div>
            
            <div className="code-block">
              <div className="code-header">
                <span>Request Body</span>
                <span className="code-lang">JSON</span>
              </div>
              <pre><code>{`{
  "url": "https://example.com/premium-content",
  "price": "0.01",
  "description": "Access to premium article",
  "walletAddress": "7zQd9dJLEu6v5iVtA9sMkvk9w1k7iXbK8GXWUfPz1VQ5"
}`}</code></pre>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span>Response</span>
                <span className="code-lang">JSON</span>
              </div>
              <pre><code>{`{
  "paywall_id": "abc123",
  "paywall_link": "https://monpay.io/paywall/abc123",
  "price": "0.01",
  "currency": "MonPay",
  "status": "created",
  "walletAddress": "7zQd9dJLEu6v5iVtA9sMkvk9w1k7iXbK8GXWUfPz1VQ5",
  "network": "Monad"
}`}</code></pre>
            </div>

            <h3>Get Paywall</h3>
            <div className="api-endpoint">
              <div className="endpoint-method get">GET</div>
              <div className="endpoint-path">/api/get-paywall?id=abc123</div>
            </div>

            <div className="code-block">
              <div className="code-header">
                <span>Response</span>
                <span className="code-lang">JSON</span>
              </div>
              <pre><code>{`{
  "id": "abc123",
  "url": "https://example.com/premium-content",
  "price": "0.01",
  "currency": "MonPay",
  "status": "active",
  "walletAddress": "7zQd9dJL...",
  "network": "Monad",
  "createdAt": "2025-10-31T12:00:00Z"
}`}</code></pre>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="docs-section">
            <h2>Security</h2>
            
            <div className="security-grid">
              <div className="security-item">
                <h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Non-Custodial
                </h4>
                <p>MonPay never holds or accesses your funds. All payments go directly to your wallet address on Monad.</p>
              </div>
              
              <div className="security-item">
                <h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}}>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                  Monad Security
                </h4>
                <p>Built on Monad, secured by a high-performance EVM-compatible network with rapid finality.</p>
              </div>
              
              <div className="security-item">
                <h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}}>
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  Verified Transactions
                </h4>
                <p>All payments are transparent and verifiable on Monad explorer. No hidden fees, no opaque processing.</p>
              </div>
              
              <div className="security-item">
                <h4>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline-block', verticalAlign: 'middle', marginRight: '6px'}}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Web3 Wallet Security
                </h4>
                <p>Transactions require explicit user approval through your Web3 wallet. No automatic or hidden charges.</p>
              </div>
            </div>

            <h3>Best Practices</h3>
            <ul className="best-practices">
              <li>Always verify the recipient address before sending payments</li>
              <li>Use hardware wallets (Ledger, Trezor) for large amounts</li>
              <li>Double-check you're on the correct network (Monad mainnet)</li>
              <li>Keep your seed phrase secure and never share it</li>
              <li>Enable your Web3 wallet's transaction security features</li>
            </ul>
          </section>

          {/* Use Cases */}
          <section id="use-cases" className="docs-section">
            <h2>Use Cases</h2>
            
            <div className="use-case-grid">
              <div className="use-case">
                <div className="use-case-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/>
                    <path d="M18 14h-8"/>
                    <path d="M15 18h-5"/>
                    <path d="M10 6h8v4h-8z"/>
                  </svg>
                </div>
                <h4>Premium Content</h4>
                <p>Monetize articles, research papers, whitepapers, and long-form journalism</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="23 7 16 12 23 17 23 7"/>
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                </div>
                <h4>Video Content</h4>
                <p>Sell access to educational videos, tutorials, courses, or entertainment</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="18" r="4"/>
                    <path d="M16 18V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v14"/>
                  </svg>
                </div>
                <h4>Digital Downloads</h4>
                <p>Music, ebooks, software, templates, and other downloadable files</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <h4>API Access</h4>
                <p>Monetize API endpoints with per-request or subscription-based payments</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h4>B2B Services</h4>
                <p>Sell access to data, analytics, reports, or specialized business tools</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="8" width="18" height="12" rx="2"/>
                    <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
                    <circle cx="9" cy="14" r="1"/>
                    <circle cx="15" cy="14" r="1"/>
                    <path d="M9 18h6"/>
                  </svg>
                </div>
                <h4>AI Agent Commerce</h4>
                <p>Enable AI agents to autonomously purchase data, compute, or services</p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="docs-section">
            <h2>Frequently Asked Questions</h2>
            
            <div className="faq-list">
              <div className="faq-item">
                <h4>What are the fees?</h4>
                <p>MonPay charges <strong>0% platform fees</strong>. The only costs are Monad network fees (typically fractions of a cent per transaction).</p>
              </div>
              
              <div className="faq-item">
                <h4>Do I need an account?</h4>
                <p>No. MonPay is completely permissionless. Just provide a wallet address on Monad and start earning.</p>
              </div>
              
              <div className="faq-item">
                <h4>Which wallets are supported?</h4>
                <p>Any EVM-compatible wallet works with MonPay on Monad. MetaMask, WalletConnect, and other Web3 wallets are supported.</p>
              </div>
              
              <div className="faq-item">
                <h4>How fast are payments?</h4>
                <p>Payments confirm in 2-5 seconds on Monad. Instant compared to traditional payment processors.</p>
              </div>
              
              <div className="faq-item">
                <h4>Can I accept other currencies?</h4>
                <p>Currently we support native MonPay token payments on Monad. Additional token support may be added based on community demand.</p>
              </div>
              
              <div className="faq-item">
                <h4>Is this production-ready?</h4>
                <p>Yes! MonPay is live on Monad chain and ready for production use.</p>
              </div>
              
              <div className="faq-item">
                <h4>How do refunds work?</h4>
                <p>Since payments go directly to your wallet, refunds must be handled manually. Send MonPay tokens back to the payer's address if needed.</p>
              </div>
              
              <div className="faq-item">
                <h4>Can I integrate this into my app?</h4>
                <p>Absolutely! Use our API endpoints to create and manage paywalls programmatically. Full documentation above.</p>
              </div>
            </div>
          </section>

          {/* Footer CTA */}
          <div className="docs-cta">
            <h2>Ready to Start?</h2>
            <p>Create your first paywall in seconds</p>
            <a href="/" className="cta-button">Create Paywall</a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Docs;

