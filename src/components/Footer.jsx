import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Shield, ArrowUpRight } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      {/* Highland Pine Subtle Border Accent */}
      <div className="footer__top-accent" aria-hidden="true" />

      <div className="footer__container container">
        <div className="footer__grid">
          {/* Column 1: About & Crest */}
          <div className="footer__col footer__col--brand">
            <div className="footer__brand">
              <div className="footer__crest-wrapper">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="footer__crest">
                  <rect width="40" height="40" rx="6" fill="#173F35" />
                  <path d="M6 31L16 18L24 27L29 21L34 31H6Z" fill="#205346" />
                  <path d="M20 9L13 22H17L11 29H29L23 22H27L20 9Z" fill="#B79B5B" />
                  <line x1="20" y1="29" x2="20" y2="33" stroke="#B79B5B" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="footer__brand-title">Tagaytay Country Homes 2</h3>
                <span className="footer__brand-subtitle">Homeowners Association, Inc.</span>
              </div>
            </div>
            <p className="footer__desc">
              A private, scenic highland sanctuary nestled in the cool hills of Tagaytay City. Committed to fostering safety, enduring fellowship, environmental preservation, and exceptional community living.
            </p>
            <div className="footer__socials" aria-label="Social Media Links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer__social-btn" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/">Home Overview</Link></li>
              <li><Link to="/about">About TCH2 & History</Link></li>
              <li><Link to="/community">Community & Amenities</Link></li>
              <li><Link to="/news">Village Announcements</Link></li>
              <li><Link to="/downloads">Downloadable Forms & Guidelines</Link></li>
              <li><Link to="/contact">Association Directory</Link></li>
            </ul>
          </div>

          {/* Column 3: Community & Resident Resources */}
          <div className="footer__col">
            <h4 className="footer__heading">Community Services</h4>
            <ul className="footer__links">
              <li>
                <Link to="/login" className="footer__link-highlight">
                  <span>Resident Portal</span>
                  <ArrowUpRight size={14} />
                </Link>
              </li>
              <li><Link to="/downloads">Vehicle RFID & Sticker Application</Link></li>
              <li><Link to="/downloads">Construction & Renovation Permits</Link></li>
              <li><Link to="/community">Clubhouse & Gazebo Booking</Link></li>
              <li><Link to="/community">Security & Gate Entry Protocols</Link></li>
              <li><Link to="/contact">Report a Village Concern</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="footer__col">
            <h4 className="footer__heading">Association Office</h4>
            <ul className="footer__contact-list">
              <li className="footer__contact-item">
                <MapPin size={18} className="footer__contact-icon" />
                <span>Clubhouse Drive, Tagaytay Country Homes 2, Tagaytay City, Cavite 4120</span>
              </li>
              <li className="footer__contact-item">
                <Phone size={18} className="footer__contact-icon" />
                <div>
                  <div>(046) 483-0291 (Admin Office)</div>
                  <div className="footer__contact-sub">0917 882 2482 (24/7 Main Gate)</div>
                </div>
              </li>
              <li className="footer__contact-item">
                <Mail size={18} className="footer__contact-icon" />
                <span>admin@tagaytaycountryhomes2.ph</span>
              </li>
              <li className="footer__contact-item">
                <Clock size={18} className="footer__contact-icon" />
                <span>Mon – Sat: 8:00 AM – 5:00 PM<br />Sun & Holidays: Guardhouse Only</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Security Alert Badge */}
        <div className="footer__emergency-strip">
          <div className="footer__emergency-badge">
            <Shield size={18} />
            <strong>24/7 Security Command:</strong>
            <span>Main Gate Security Radio & Dispatch is monitored round-the-clock.</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            © 2026 Tagaytay Country Homes 2 Homeowners Association, Inc. All rights reserved.
          </div>
          <div className="footer__legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <span className="footer__divider">•</span>
            <Link to="/privacy">Terms of Association</Link>
            <span className="footer__divider">•</span>
            <Link to="/privacy">Village Charter</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
