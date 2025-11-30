import { Link } from 'react-router-dom';
function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <img src="/logo.png" alt="MonPay" className="footer-logo" />
          <p>Crypto native paywalls powered by Monad chain, MON token payments, and the x402 protocol</p>
        </div>
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>MON Token Payments</li>
            <li>EVM Compatible</li>
            <li>Non-custodial Wallets</li>
            <li>Zero Platform Fees</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Technology</h4>
          <ul>
            <li>Monad Chain</li>
            <li>EVM Compatible</li>
            <li>Web3 Wallets</li>
            <li>HTTP 402 Protocol</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Community</h4>
          <ul>
            <li><Link to="/marketplace">Explore</Link></li>
            <li><a href="https://x.com/Monpayio" target="_blank" rel="noopener noreferrer">Twitter/X</a></li>
            <li><Link to="/docs">Docs</Link></li>
            <li><a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer">Buy Token</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MonPay. MIT License.</p>
      </div>
    </footer>
  );
}

export default Footer;

