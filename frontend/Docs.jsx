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
            Everything you need to build, deploy, and monetize with Vaultx402
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
              Vaultx402 is a decentralized paywall protocol that enables instant monetization of any web content through native cryptocurrency payments. Built on Solana with first-class Phantom integration, Vaultx402 brings the vision of HTTP 402 "Payment Required" to life in the Web3 era.
            </p>
            <div className="info-card">
              <div className="info-card-icon">💡</div>
              <div>
                <strong>What makes Vaultx402 unique?</strong>
                <p>Unlike traditional paywalls that require accounts, subscriptions, and credit cards, Vaultx402 enables instant, permissionless payments using native SOL on Solana. No middlemen, no platform fees, no accounts needed.</p>
              </div>
            </div>
          </section>

          {/* HTTP 402 Protocol */}
          <section id="http-402" className="docs-section">
            <h2>HTTP 402 Protocol</h2>
            <p>
              The HTTP 402 status code was reserved in 1997 for future use as "Payment Required" but remained largely unimplemented for decades. Vaultx402 brings this protocol to life for the blockchain era.
            </p>
            
            <h3>Protocol Specification</h3>
            <div className="code-block">
              <div className="code-header">
                <span>HTTP Response Headers</span>
                <span className="code-lang">HTTP</span>
              </div>
              <pre><code>{`HTTP/1.1 402 Payment Required
X-Payment-Required: 0.01 SOL
X-Payment-Address: 7zQd9dJLEu6v5iVtA9sMkvk9w1k7iXbK8GXWUfPz1VQ5
X-Payment-Network: solana
X-Payment-Memo: paywall-abc123`}</code></pre>
            </div>

            <h3>Why HTTP 402 Matters</h3>
            <div className="feature-grid">
              <div className="feature-item">
                <div className="feature-icon">🤖</div>
                <h4>AI Agent Payments</h4>
                <p>AI agents can programmatically detect and fulfill payment requirements by parsing HTTP headers</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔗</div>
                <h4>Machine-Readable</h4>
                <p>Standardized headers make payments discoverable and automatable across the web</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚡</div>
                <h4>Instant Settlement</h4>
                <p>Payments settle on-chain in 2-5 seconds with sub-cent gas fees</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🌐</div>
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
                  <p>Choose your price in SOL. Most creators start between 0.01 and 0.05 SOL, but you can set any amount you like.</p>
                </div>
              </div>
              
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h4>Add Wallet Address</h4>
                  <p>Provide your Solana wallet address to receive payments. If omitted, we'll generate a non-custodial wallet for you.</p>
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
            <p>Vaultx402 uses a simple but powerful architecture:</p>
            
            <div className="architecture-diagram">
              <div className="arch-step">
                <div className="arch-icon">🌐</div>
                <h4>1. User Visits Link</h4>
                <p>User clicks your paywall link</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <div className="arch-icon">🔒</div>
                <h4>2. Paywall Displayed</h4>
                <p>Shows price & payment button</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <div className="arch-icon">💳</div>
                <h4>3. Phantom Opens</h4>
                <p>User confirms transaction</p>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-step">
                <div className="arch-icon">✅</div>
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
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
const fromPublicKey = window.solana.publicKey;
const toPublicKey = new PublicKey(paywall.walletAddress);
const lamports = Math.floor(paywall.price * LAMPORTS_PER_SOL);

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports,
  })
);

const { signature } = await window.solana.signAndSendTransaction(transaction);
await connection.confirmTransaction(signature, 'confirmed');

// Funds arrive in the creator's wallet within seconds`}</code></pre>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="docs-section">
            <h2>Features</h2>
            
            <div className="feature-list">
              <div className="feature-detail">
                <h3>🪙 Native SOL Payments</h3>
                <p>Accept payments in native SOL on Solana. No token contracts, no wrapping, no complexity. Pure, simple cryptocurrency payments with sub-second finality.</p>
              </div>
              
              <div className="feature-detail">
                <h3>🔐 Non-Custodial Architecture</h3>
                <p>Vaultx402 <strong>never</strong> holds your funds. Payments go directly from payer to your wallet address. You retain full custody and control of your earnings at all times.</p>
              </div>
              
              <div className="feature-detail">
                <h3>⚡ Instant Settlements</h3>
                <p>Solana's lightning-fast finality means payments confirm in seconds. No waiting periods, no settlement delays, no payment processors.</p>
              </div>
              
              <div className="feature-detail">
                <h3>💰 Zero Platform Fees</h3>
                <p>We take <strong>0%</strong> of your revenue. The only costs are Solana network fees (typically fractions of a cent per transaction).</p>
              </div>
              
              <div className="feature-detail">
                <h3>🌍 Permissionless & Global</h3>
                <p>No KYC, no accounts, no bank connections required. If you have a wallet address, you can receive payments from anyone, anywhere in the world.</p>
              </div>
              
              <div className="feature-detail">
                <h3>🔗 Standard HTTP Protocol</h3>
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
                <strong>Blockchain:</strong> Solana
              </div>
              <div className="tech-item">
                <strong>Web3:</strong> @solana/web3.js + Phantom
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
                <span>Native SOL Transfer</span>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre><code>{`import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

// Connect to Phantom
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');
const fromPublicKey = window.solana.publicKey;
const toPublicKey = new PublicKey('CreatorWalletPublicKey');

const transaction = new Transaction().add(
  SystemProgram.transfer({
    fromPubkey: fromPublicKey,
    toPubkey: toPublicKey,
    lamports: Math.floor(0.01 * LAMPORTS_PER_SOL),
  })
);

const { signature } = await window.solana.signAndSendTransaction(transaction);
await connection.confirmTransaction(signature, 'confirmed');
console.log('Payment confirmed!', signature);`}</code></pre>
            </div>
          </section>

          {/* Web3 Integration */}
          <section id="web3-integration" className="docs-section">
            <h2>Web3 Integration</h2>
            
            <h3>Network Configuration</h3>
            <div className="code-block">
              <div className="code-header">
                <span>Solana Config</span>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre><code>{`export const SOLANA_CONFIG = {
  rpcUrl: import.meta.env.VITE_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
  explorer: 'https://solscan.io'
};

const connection = new Connection(SOLANA_CONFIG.rpcUrl, 'confirmed');`}</code></pre>
            </div>

            <h3>Phantom Detection</h3>
            <div className="code-block">
              <div className="code-header">
                <span>Check for Web3 Wallet</span>
                <span className="code-lang">JavaScript</span>
              </div>
              <pre><code>{`// Check if Phantom is installed
if (!window.solana || !window.solana.isPhantom) {
  alert('Please install Phantom to make payments');
  return;
}

// Request account access
const { publicKey } = await window.solana.connect();
const address = publicKey.toString();`}</code></pre>
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
  "paywall_link": "https://vaultx402.io/paywall/abc123",
  "price": "0.01",
  "currency": "SOL",
  "status": "created",
  "walletAddress": "7zQd9dJLEu6v5iVtA9sMkvk9w1k7iXbK8GXWUfPz1VQ5",
  "network": "Solana"
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
  "currency": "SOL",
  "status": "active",
  "walletAddress": "7zQd9dJL...",
  "network": "Solana",
  "createdAt": "2025-10-31T12:00:00Z"
}`}</code></pre>
            </div>
          </section>

          {/* Security */}
          <section id="security" className="docs-section">
            <h2>Security</h2>
            
            <div className="security-grid">
              <div className="security-item">
                <h4>🔐 Non-Custodial</h4>
                <p>Vaultx402 never holds or accesses your funds. All payments go directly to your wallet address.</p>
              </div>
              
              <div className="security-item">
                <h4>🛡️ Solana Security</h4>
                <p>Built on Solana, secured by a high-performance proof-of-stake network with rapid finality.</p>
              </div>
              
              <div className="security-item">
                <h4>✅ Verified Transactions</h4>
                <p>All payments are transparent and verifiable on Solscan. No hidden fees, no opaque processing.</p>
              </div>
              
              <div className="security-item">
                <h4>🔒 Phantom Security</h4>
                <p>Transactions require explicit user approval through Phantom. No automatic or hidden charges.</p>
              </div>
            </div>

            <h3>Best Practices</h3>
            <ul className="best-practices">
              <li>Always verify the recipient address before sending payments</li>
              <li>Use hardware wallets (Ledger, Trezor) for large amounts</li>
              <li>Double-check you're on the correct network (Solana mainnet)</li>
              <li>Keep your seed phrase secure and never share it</li>
              <li>Enable Phantom's transaction security features</li>
            </ul>
          </section>

          {/* Use Cases */}
          <section id="use-cases" className="docs-section">
            <h2>Use Cases</h2>
            
            <div className="use-case-grid">
              <div className="use-case">
                <div className="use-case-icon">📰</div>
                <h4>Premium Content</h4>
                <p>Monetize articles, research papers, whitepapers, and long-form journalism</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">🎥</div>
                <h4>Video Content</h4>
                <p>Sell access to educational videos, tutorials, courses, or entertainment</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">🎵</div>
                <h4>Digital Downloads</h4>
                <p>Music, ebooks, software, templates, and other downloadable files</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">🔌</div>
                <h4>API Access</h4>
                <p>Monetize API endpoints with per-request or subscription-based payments</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">💼</div>
                <h4>B2B Services</h4>
                <p>Sell access to data, analytics, reports, or specialized business tools</p>
              </div>
              
              <div className="use-case">
                <div className="use-case-icon">🤖</div>
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
                <p>Vaultx402 charges <strong>0% platform fees</strong>. The only costs are Solana network fees (typically fractions of a cent per transaction).</p>
              </div>
              
              <div className="faq-item">
                <h4>Do I need an account?</h4>
                <p>No. Vaultx402 is completely permissionless. Just provide a wallet address and start earning.</p>
              </div>
              
              <div className="faq-item">
                <h4>Which wallets are supported?</h4>
                <p>Phantom is the primary supported wallet today. Any Solana wallet that implements <code>signAndSendTransaction</code> can integrate.</p>
              </div>
              
              <div className="faq-item">
                <h4>How fast are payments?</h4>
                <p>Payments confirm in 2-5 seconds on Solana. Instant compared to traditional payment processors.</p>
              </div>
              
              <div className="faq-item">
                <h4>Can I accept other currencies?</h4>
                <p>Currently we support native SOL payments on Solana. Additional token support may be added based on community demand.</p>
              </div>
              
              <div className="faq-item">
                <h4>Is this production-ready?</h4>
                <p>Yes! Vaultx402 is live on Solana mainnet and ready for production use.</p>
              </div>
              
              <div className="faq-item">
                <h4>How do refunds work?</h4>
                <p>Since payments go directly to your wallet, refunds must be handled manually. Send SOL back to the payer's address if needed.</p>
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

