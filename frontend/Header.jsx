import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header({ transparent = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={transparent ? 'nav-transparent' : ''}>
      <div className="nav-logo">
        <Link to="/" onClick={closeMenu}>
          <img src="/newlogo.png" alt="StealthPayx402" />
        </Link>
      </div>
      <button 
        className="hamburger-menu"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {isMenuOpen ? (
            <path d="M18 6L6 18M6 6L18 18" stroke="url(#hamburgerGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <path d="M3 12H21M3 6H21M3 18H21" stroke="url(#hamburgerGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          )}
          <defs>
            <linearGradient id="hamburgerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#a3a3a3" />
            </linearGradient>
          </defs>
        </svg>
      </button>
      <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
        <Link to="/create" className="nav-link" onClick={closeMenu}>Create Paywall</Link>
        <Link to="/marketplace" className="nav-link" onClick={closeMenu}>Marketplace</Link>
        <Link to="/my-purchases" className="nav-link" onClick={closeMenu}>My Purchases</Link>
        <a href="https://x.com/vaultx402sol?s=21" target="_blank" rel="noopener noreferrer" className="nav-link nav-link-icon" aria-label="X (Twitter)" onClick={closeMenu}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="currentColor"/>
          </svg>
        </a>
        <Link to="/docs" className="nav-link" onClick={closeMenu}>Documentation</Link>
      </div>
      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </nav>
  );
}

export default Header;

