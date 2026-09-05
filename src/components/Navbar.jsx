import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronRight, User } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Only allow transparent/overlay mode on the home page hero
  const isHomePage = location.pathname === '/' || location.pathname === '';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Community', path: '/community' },
    { name: 'News', path: '/news' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Contact', path: '/contact' },
  ];

  const isSolid = isScrolled || !isHomePage;

  return (
    <header className={`navbar ${isSolid ? 'navbar--solid' : 'navbar--transparent'}`}>
      <div className="navbar__container container">
        {/* Brand / Logo */}
        <Link to="/" className="navbar__brand" aria-label="Tagaytay Country Homes 2 Home">
          <div className="navbar__logo-icon">
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="navbar__crest">
              <rect width="40" height="40" rx="6" fill="#173F35" />
              {/* Mountain ridge outline */}
              <path d="M6 31L16 18L24 27L29 21L34 31H6Z" fill="#205346" />
              {/* Pine tree symbol */}
              <path d="M20 9L13 22H17L11 29H29L23 22H27L20 9Z" fill="#B79B5B" />
              <line x1="20" y1="29" x2="20" y2="33" stroke="#B79B5B" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="navbar__brand-text">
            <span className="navbar__brand-title">Tagaytay Country Homes 2</span>
            <span className="navbar__brand-subtitle">Homeowners Association • Tagaytay</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar__nav" aria-label="Main Navigation">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.name} className="navbar__item">
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA */}
        <div className="navbar__actions">
          <Link to="/login" className="btn navbar__cta">
            <User size={16} aria-hidden="true" />
            <span>Resident Portal</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="navbar__hamburger"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop & Menu */}
      <div
        className={`navbar__drawer-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`navbar__drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation"
        role="dialog"
        aria-modal="true"
      >
        <div className="navbar__drawer-header">
          <div className="navbar__drawer-brand">
            <span className="navbar__brand-title">Tagaytay Country Homes 2</span>
            <span className="navbar__brand-subtitle">Tagaytay City, Cavite</span>
          </div>
          <button
            type="button"
            className="navbar__drawer-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="navbar__drawer-nav">
          <ul className="navbar__drawer-links">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `navbar__drawer-link ${isActive ? 'navbar__drawer-link--active' : ''}`
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{link.name}</span>
                  <ChevronRight size={18} className="navbar__drawer-chevron" />
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__drawer-footer">
          <Link
            to="/login"
            className="btn btn--accent navbar__drawer-cta"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={18} />
            <span>Resident Portal Login</span>
          </Link>
          <div className="navbar__drawer-emergency">
            <Shield size={16} />
            <span>24/7 Gate & Security: (046) 483-0291</span>
          </div>
        </div>
      </div>
    </header>
  );
}
