function Header() {
  return (
    <nav>
      <div className="nav-logo">
        <a href="/">
          <img src="/logo.png" alt="Payx402" />
        </a>
      </div>
      <div className="nav-links">
        <a href="/marketplace" className="nav-link">Marketplace</a>
        <a href="https://x.com/payx402" target="_blank" rel="noopener noreferrer" className="nav-link">Community</a>
        <a href="/docs" className="nav-link">Documentation</a>
        <a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-highlight">Buy $PAYX402</a>
      </div>
    </nav>
  );
}

export default Header;

