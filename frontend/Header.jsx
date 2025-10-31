import { Link } from 'react-router-dom';
function Header({ transparent = false }) {
  return (
    <nav className={transparent ? 'nav-transparent' : ''}>
      <div className="nav-logo">
        <Link to="/">
          <img src="/logo.png" alt="Payx402" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/create" className="nav-link">Create Paywall</Link>
        <Link to="/marketplace" className="nav-link">Marketplace</Link>
        <a href="https://x.com/payx402" target="_blank" rel="noopener noreferrer" className="nav-link">Community</a>
        <Link to="/docs" className="nav-link">Documentation</Link>
        <a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-highlight">Buy $PAYX402</a>
      </div>
    </nav>
  );
}

export default Header;

