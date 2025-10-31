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
        <a href="/community" className="nav-link">Community</a>
        <a href="https://app.uniswap.org" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-highlight">Buy $PAYX402</a>
        <a href="/docs" className="nav-link">Documentation</a>
      </div>
    </nav>
  );
}

export default Header;

