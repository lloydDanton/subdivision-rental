import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        {/* Top row */}
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo" aria-label="SubdivisionStay home">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="32" height="32" rx="8" fill="#2563EB" />
                <path d="M16 6L6 14v12h7v-7h6v7h7V14L16 6z" fill="white" />
              </svg>
              <span>SubdivisionStay</span>
            </Link>
            <p className="footer__tagline">
              Your home away from home — inside the subdivision.
            </p>
          </div>

          {/* Link columns */}
          <nav className="footer__links" aria-label="Footer navigation">
            <div className="footer__col">
              <h3 className="footer__col-heading">Explore</h3>
              <ul className="footer__col-list">
                <li><Link to="/browse" className="footer__link">Browse Homes</Link></li>
                <li><Link to="/browse?location=Greenfield" className="footer__link">Greenfield Estates</Link></li>
                <li><Link to="/browse?location=Sunrise" className="footer__link">Sunrise Village</Link></li>
                <li><Link to="/browse?location=Palm" className="footer__link">Palm Ridge</Link></li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-heading">Hosting</h3>
              <ul className="footer__col-list">
                <li><Link to="/become-a-host" className="footer__link">Become a Host</Link></li>
                <li><Link to="/become-a-host" className="footer__link">List Your Property</Link></li>
                <li><Link to="/become-a-host" className="footer__link">Host Resources</Link></li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-heading">Support</h3>
              <ul className="footer__col-list">
                <li><Link to="/help" className="footer__link">Help Center</Link></li>
                <li><Link to="/safety" className="footer__link">Safety Information</Link></li>
                <li><Link to="/contact" className="footer__link">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__col-heading">Company</h3>
              <ul className="footer__col-list">
                <li><Link to="/about" className="footer__link">About Us</Link></li>
                <li><Link to="/careers" className="footer__link">Careers</Link></li>
                <li><Link to="/press" className="footer__link">Press</Link></li>
              </ul>
            </div>
          </nav>
        </div>

        {/* Bottom row */}
        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} SubdivisionStay. All rights reserved.
          </p>
          <div className="footer__legal">
            <Link to="/privacy" className="footer__link footer__link--small">Privacy Policy</Link>
            <span className="footer__legal-sep" aria-hidden="true">·</span>
            <Link to="/terms" className="footer__link footer__link--small">Terms of Service</Link>
            <span className="footer__legal-sep" aria-hidden="true">·</span>
            <Link to="/sitemap" className="footer__link footer__link--small">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
