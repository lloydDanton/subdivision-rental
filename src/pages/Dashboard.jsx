import { Link } from 'react-router-dom';
import './Dashboard.css';

const STAT_CARDS = [
  {
    label: 'Upcoming Bookings',
    value: 0,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/>
        <line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    color: 'blue',
  },
  {
    label: 'Past Bookings',
    value: 0,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    color: 'green',
  },
  {
    label: 'Saved Properties',
    value: 0,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    color: 'red',
  },
];

export default function Dashboard() {
  return (
    <main id="main-content" className="dashboard">
      <div className="dashboard__inner">

        {/* Header */}
        <header className="dashboard__header">
          <div>
            <p className="dashboard__eyebrow">Dashboard</p>
            <h1 className="dashboard__welcome">Welcome back!</h1>
            <p className="dashboard__subtitle">
              Manage your bookings, saved properties, and account settings.
            </p>
          </div>
          <Link to="/browse" className="dashboard__browse-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            Browse Properties
          </Link>
        </header>

        {/* Stat cards */}
        <div className="dashboard__stats" role="list" aria-label="Account summary">
          {STAT_CARDS.map((card) => (
            <div
              key={card.label}
              className={`dashboard__stat-card dashboard__stat-card--${card.color}`}
              role="listitem"
            >
              <div className="dashboard__stat-icon">{card.icon}</div>
              <div className="dashboard__stat-info">
                <span className="dashboard__stat-value">{card.value}</span>
                <span className="dashboard__stat-label">{card.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Sections grid */}
        <div className="dashboard__grid">

          {/* Upcoming bookings */}
          <section className="dashboard__section" aria-labelledby="upcoming-heading">
            <div className="dashboard__section-header">
              <h2 id="upcoming-heading" className="dashboard__section-title">Upcoming Bookings</h2>
            </div>
            <div className="dashboard__empty">
              <div className="dashboard__empty-icon" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <p className="dashboard__empty-title">No upcoming bookings</p>
              <p className="dashboard__empty-desc">Your confirmed bookings will appear here.</p>
              <Link to="/browse" className="dashboard__empty-cta">Explore Homes</Link>
            </div>
          </section>

          {/* Booking history */}
          <section className="dashboard__section" aria-labelledby="history-heading">
            <div className="dashboard__section-header">
              <h2 id="history-heading" className="dashboard__section-title">Booking History</h2>
            </div>
            <div className="dashboard__empty">
              <div className="dashboard__empty-icon" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <p className="dashboard__empty-title">No past bookings</p>
              <p className="dashboard__empty-desc">Your completed stays will show up here.</p>
            </div>
          </section>

          {/* Saved properties */}
          <section className="dashboard__section" aria-labelledby="saved-heading">
            <div className="dashboard__section-header">
              <h2 id="saved-heading" className="dashboard__section-title">Saved Properties</h2>
            </div>
            <div className="dashboard__empty">
              <div className="dashboard__empty-icon" aria-hidden="true">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <p className="dashboard__empty-title">No saved properties</p>
              <p className="dashboard__empty-desc">
                Start exploring and save your favourite homes.
              </p>
              <Link to="/browse" className="dashboard__empty-cta">Browse Homes</Link>
            </div>
          </section>

          {/* Profile */}
          <section className="dashboard__section" aria-labelledby="profile-heading">
            <div className="dashboard__section-header">
              <h2 id="profile-heading" className="dashboard__section-title">Profile Information</h2>
              <button className="dashboard__edit-btn" aria-label="Edit profile">Edit</button>
            </div>
            <div className="dashboard__profile">
              <div className="dashboard__profile-avatar" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
              <div className="dashboard__profile-info">
                <div className="dashboard__profile-row">
                  <span className="dashboard__profile-key">Name</span>
                  <span className="dashboard__profile-val dashboard__profile-val--placeholder">Not set</span>
                </div>
                <div className="dashboard__profile-row">
                  <span className="dashboard__profile-key">Email</span>
                  <span className="dashboard__profile-val dashboard__profile-val--placeholder">Not set</span>
                </div>
                <div className="dashboard__profile-row">
                  <span className="dashboard__profile-key">Member since</span>
                  <span className="dashboard__profile-val">—</span>
                </div>
                <div className="dashboard__profile-row">
                  <span className="dashboard__profile-key">Account type</span>
                  <span className="dashboard__profile-badge">Guest</span>
                </div>
              </div>
            </div>
            <p className="dashboard__profile-note">
              Profile editing will be available once the backend is connected.
            </p>
          </section>

        </div>
      </div>
    </main>
  );
}
