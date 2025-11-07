import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <img src="/newlogo.png" alt="Vaultx402" className="footer-logo" />
          <p>Crypto-native paywalls powered by BNB Chain and the x402 protocol</p>
        </div>
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>Native BNB Payments</li>
            <li>Instant Settlements</li>
            <li>Non-custodial Wallets</li>
            <li>Zero Platform Fees</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Technology</h4>
          <ul>
            <li>Built on BNB Chain</li>
            <li>Web3 Integration</li>
            <li>MetaMask Compatible</li>
            <li>HTTP 402 Protocol</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><a href="https://x.com/vaultx402sol?s=21" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
            <li><Link to="/docs">Documentation</Link></li>
            <li><a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer">Buy Token</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Vaultx402. MIT License.</p>
      </div>
    </footer>
  );
}

export default Footer;

