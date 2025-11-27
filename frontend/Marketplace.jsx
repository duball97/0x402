import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Marketplace() {
  const [paywalls, setPaywalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [networkFilter, setNetworkFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('recent');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaywalls = async () => {
      try {
        const response = await fetch('/api/get-all-paywalls');
        if (!response.ok) {
          const text = await response.text();
          throw new Error(`API ${response.status}: ${text.slice(0, 140)}`);
        }
        const data = await response.json();
        setPaywalls(Array.isArray(data.paywalls) ? data.paywalls : []);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to load marketplace');
        setLoading(false);
      }
    };

    fetchPaywalls();
  }, []);

  const handleBuyClick = (id) => {
    navigate(`/paywall/${id}`);
  };

  const filteredPaywalls = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return paywalls
      .filter((paywall) => {
        const normalizedNetwork = (paywall.network || 'Monad').toLowerCase();
        const normalizedCurrency = (paywall.currency || '').toLowerCase();
        
        // Exclude BNB and BNB Chain paywalls
        if (normalizedNetwork.includes('bnb') || normalizedCurrency.includes('bnb')) {
          return false;
        }
        
        const matchesNetwork = networkFilter === 'all' ||
          normalizedNetwork === networkFilter ||
          (networkFilter === 'zcash' && (normalizedNetwork.includes('zcash') || normalizedNetwork.includes('zec')));
        const matchesTerm = term
          ? [paywall.id, paywall.description, paywall.currency]
              .filter(Boolean)
              .some((field) => field.toLowerCase().includes(term))
          : true;
        return matchesNetwork && matchesTerm;
      })
      .sort((a, b) => {
        if (sortOption === 'price-asc') {
          return (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0);
        }
        if (sortOption === 'price-desc') {
          return (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0);
        }
        return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      });
  }, [paywalls, networkFilter, searchTerm, sortOption]);

  const stats = useMemo(() => {
    let solanaVolume = 0;
    let solanaCount = 0;
    let zcashVolume = 0;
    let zcashCount = 0;
    let totalListings = 0;

    paywalls.forEach((item) => {
      const network = (item.network || 'Monad').toLowerCase();
      const currency = (item.currency || '').toLowerCase();
      
      // Exclude BNB and BNB Chain paywalls from stats
      if (network.includes('bnb') || currency.includes('bnb')) {
        return;
      }
      
      totalListings += 1;
      const price = parseFloat(item.price) || 0;

      if (network.includes('sol')) {
        solanaVolume += price;
        solanaCount += 1;
      } else if (network.includes('zcash') || network.includes('zec')) {
        zcashVolume += price;
        zcashCount += 1;
      }
    });

    return {
      listings: totalListings,
      solanaVolume,
      solanaCount,
      zcashVolume,
      zcashCount,
    };
  }, [paywalls]);

  const hasAny = useMemo(() => {
    return paywalls.some((paywall) => {
      const network = (paywall.network || 'Monad').toLowerCase();
      const currency = (paywall.currency || '').toLowerCase();
      return !network.includes('bnb') && !currency.includes('bnb');
    });
  }, [paywalls]);
  const hasFiltered = filteredPaywalls.length > 0;

  const resetFilters = () => {
    setNetworkFilter('all');
    setSearchTerm('');
    setSortOption('recent');
  };

  return (
    <>
      <Header />

      <main className="market-shell">
        <section className="market-hero">
          <div className="market-hero-copy">
            <span className="market-tag">MonPay Marketplace</span>
            <h1>Explore paywalls built for instant crypto settlement</h1>
            <p>
              Browse live MonPay paywalls on Monad chain, compare pricing structures, and unlock access in seconds. Discover new
              revenue models powered by MonPay tokens.
            </p>
            <div className="market-cta">
              <button type="button" className="gradient-btn" onClick={() => navigate('/create')}>
                Launch a paywall
              </button>
              <button type="button" className="tertiary-btn" onClick={() => navigate('/docs')}>
                View docs
              </button>
            </div>
          </div>

          <div className="market-metrics">
            <div className="metric-chip metric-chip--accent">
              <span className="metric-chip-label">Live listings</span>
              <span className="metric-chip-value">{stats.listings}</span>
            </div>
            <div className="metric-chip">
              <span className="metric-chip-label">MonPay volume</span>
              <span className="metric-chip-value">{stats.solanaVolume.toFixed(3)} MonPay</span>
              <span className="metric-chip-footnote">{stats.solanaCount} paywalls</span>
            </div>
          </div>
        </section>

        <section className="market-controls">
          <div className="market-search">
            <span className="search-icon">⌕</span>
            <input
              type="text"
              placeholder="Search by paywall ID, description, or currency"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" type="button" onClick={() => setSearchTerm('')} aria-label="Clear search">
                ✕
              </button>
            )}
          </div>

          <div className="market-filters">
            <div className="network-pills" role="tablist" aria-label="Network filters">
              {[
                { id: 'all', label: 'All' },
                { id: 'monad', label: 'Monad' },
              ].map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  className={`network-pill ${networkFilter === chip.id ? 'network-pill-active' : ''}`}
                  onClick={() => setNetworkFilter(chip.id)}
                  role="tab"
                  aria-selected={networkFilter === chip.id}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            <div className="market-select-group">
              <label htmlFor="market-sort">Sort</label>
              <select
                id="market-sort"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="recent">Newest first</option>
                <option value="price-asc">Price · Low to high</option>
                <option value="price-desc">Price · High to low</option>
              </select>
            </div>
          </div>
        </section>

        {loading && (
          <div className="market-placeholder">
            <div className="loading-spinner"></div>
            <p className="loading-text">Loading marketplace…</p>
          </div>
        )}

        {error && !loading && (
          <div className="market-placeholder error" role="alert">
            <div className="error-icon">⚠</div>
            <h3>Unable to load marketplace</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && !hasAny && (
          <div className="market-placeholder empty">
            <div className="empty-icon">📦</div>
            <h3>No paywalls yet</h3>
            <p>Be the first to deploy a MonPay paywall on Monad and showcase it here.</p>
            <button className="gradient-btn" type="button" onClick={() => navigate('/create')}>
              Launch your first paywall
            </button>
          </div>
        )}

        {!loading && !error && hasAny && (
          <>
            <section className="market-grid-section">
              <div className="market-grid-heading">
                <h2>All paywalls</h2>
                <p>
                  Filter and sort to find the perfect monetization model. Reset filters anytime to see the full inventory.
                </p>
              </div>

              {!hasFiltered && (
                <div className="market-placeholder empty">
                  <h3>No matches found</h3>
                  <p>Try another search term or clear your filters to explore more paywalls.</p>
                  <button className="gradient-btn" type="button" onClick={resetFilters}>
                    Reset filters
                  </button>
                </div>
              )}

              {hasFiltered && (
                <div className="market-grid">
                  {filteredPaywalls.map((paywall) => (
                    <article key={paywall.id} className="market-card">
                      <header className="market-card__header">
                        <span className="market-chip">{paywall.network || 'Monad'}</span>
                        <span className="market-chip market-chip--outline">{paywall.currency}</span>
                      </header>
                      <div className="market-card__body">
                        <h3>{paywall.id}</h3>
                        <p>{paywall.description || 'No description provided.'}</p>
                      </div>
                      <dl className="market-card__meta">
                        <div>
                          <dt>Price</dt>
                          <dd>{!isNaN(parseFloat(paywall.price)) ? parseFloat(paywall.price).toFixed(4) : paywall.price} {paywall.currency}</dd>
                        </div>
                        <div>
                          <dt>Network</dt>
                          <dd>{paywall.network || 'Monad'}</dd>
                        </div>
                      </dl>
                      <footer className="market-card__footer">
                        <button type="button" className="market-card__action" onClick={() => handleBuyClick(paywall.id)}>
                          Unlock paywall
                        </button>
                        <div className="market-card__flags">
                          <span>⚡ Instant settlement</span>
                          <span>🔐 Non-custodial</span>
                        </div>
                      </footer>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Marketplace;
