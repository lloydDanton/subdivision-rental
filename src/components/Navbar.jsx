import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen((prev) => !prev);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo" onClick={closeMenu} aria-label="SubdivisionStay home">
          <span className="navbar__logo-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#2563EB" />
              <path d="M16 6L6 14v12h7v-7h6v7h7V14L16 6z" fill="white" />
            </svg>
          </span>
          <span className="navbar__logo-text">SubdivisionStay</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <NavLink
            to="/browse"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Browse
          </NavLink>
          <NavLink
            to="/become-a-host"
            className={({ isActive }) =>
              isActive ? 'navbar__link navbar__link--active' : 'navbar__link'
            }
          >
            Become a Host
          </NavLink>
        </nav>

        {/* Desktop auth buttons */}
        <div className="navbar__auth">
          <Link to="/login" className="navbar__btn navbar__btn--ghost">
            Log in
          </Link>
          <Link to="/register" className="navbar__btn navbar__btn--primary">
            Register
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger${menuOpen ? ' navbar__hamburger--open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
          <span className="navbar__hamburger-bar" />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile${menuOpen ? ' navbar__mobile--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <nav className="navbar__mobile-nav" aria-label="Mobile navigation">
          <NavLink to="/browse" className="navbar__mobile-link" onClick={closeMenu}>
            Browse
          </NavLink>
          <NavLink to="/become-a-host" className="navbar__mobile-link" onClick={closeMenu}>
            Become a Host
          </NavLink>
          <div className="navbar__mobile-divider" />
          <Link to="/login" className="navbar__mobile-link" onClick={closeMenu}>
            Log in
          </Link>
          <Link to="/register" className="navbar__mobile-btn" onClick={closeMenu}>
            Register
          </Link>
        </nav>
      </div>
    </header>
  );
}
