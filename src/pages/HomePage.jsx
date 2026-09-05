import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Trees, Users, Building, ArrowRight, PhoneCall, Download } from 'lucide-react';
import './HomePage.css';

export default function HomePage() {
  return (
    <main id="main-content" className="home-page">
      {/* Hero Section */}
      <section className="hero" aria-label="Welcome Hero">
        <div className="hero__background">
          <div className="hero__overlay" />
        </div>

        <div className="hero__container container">
          <div className="hero__content">
            <span className="eyebrow hero__eyebrow">Tagaytay City • Premier Highland Village</span>
            <h1 className="hero__title">
              Building a Better Community Together
            </h1>
            <p className="hero__lead">
              A safe, connected, and vibrant residential haven designed for serene everyday living amidst the cool breezes of Tagaytay.
            </p>
            <div className="hero__actions">
              <Link to="/community" className="btn btn--accent">
                <span>Explore Community</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn btn--outline-white">
                <PhoneCall size={16} />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Access Badges Bar */}
        <div className="hero__quickbar">
          <div className="hero__quickbar-inner container">
            <div className="hero__badge">
              <Shield size={20} className="hero__badge-icon" />
              <div>
                <strong>24/7 Guarded Gated Village</strong>
                <span>RFID & Monitored Access Control</span>
              </div>
            </div>
            <div className="hero__badge">
              <Trees size={20} className="hero__badge-icon" />
              <div>
                <strong>Lush Highland Living</strong>
                <span>High-Elevation Cool Mountain Climate</span>
              </div>
            </div>
            <div className="hero__badge">
              <Users size={20} className="hero__badge-icon" />
              <div>
                <strong>Active HOA Stewardship</strong>
                <span>Registered Homeowners Association</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1 Overview Section */}
      <section className="section-spacing home-preview container">
        <div className="section-header section-header--center">
          <span className="eyebrow">Tagaytay Country Homes 2</span>
          <h2>Welcome to Our Peaceful Mountain Sanctuary</h2>
          <p>
            Established along the rolling ridges of Tagaytay City, Tagaytay Country Homes 2 provides homeowners and families with clean air, secure neighborhood streets, manicured green landscapes, and modern community amenities.
          </p>
        </div>

        <div className="home-preview__grid">
          <div className="home-preview__card">
            <div className="home-preview__card-icon">
              <Building size={28} />
            </div>
            <h3>Community Facilities</h3>
            <p>
              Discover our clubhouse, landscaped family parks, sports facilities, and scenic gathering pavilions.
            </p>
            <Link to="/community" className="home-preview__link">
              <span>View Amenities</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-preview__card">
            <div className="home-preview__card-icon">
              <Download size={28} />
            </div>
            <h3>Forms & Permits</h3>
            <p>
              Easily access HOA vehicle sticker forms, gate passes, renovation permits, and association bylaws.
            </p>
            <Link to="/downloads" className="home-preview__link">
              <span>Access Downloads</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="home-preview__card">
            <div className="home-preview__card-icon">
              <Shield size={28} />
            </div>
            <h3>Resident Portal</h3>
            <p>
              Exclusive access for registered homeowners: view dues status, village notices, and emergency contacts.
            </p>
            <Link to="/login" className="home-preview__link">
              <span>Resident Login</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
