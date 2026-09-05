import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import { Shield, Lock, Mail, UserCheck, AlertCircle } from 'lucide-react';
import './AuthPortal.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="page-shell">
      <PageBanner
        title="Resident Portal Login"
        subtitle="Exclusive access for registered homeowners and residents of Tagaytay Country Homes 2."
        crumbs={[{ label: 'Resident Portal' }]}
      />

      <section className="section-spacing container auth-portal">
        <div className="auth-portal__card">
          <div className="auth-portal__badge">
            <Shield size={20} />
            <span>Verified Resident Access</span>
          </div>

          <h2>Sign In to Your Account</h2>
          <p className="auth-portal__desc">
            Access HOA announcements, dues ledger, RFID requests, and amenity reservations.
          </p>

          {submitted ? (
            <div className="auth-portal__alert">
              <UserCheck size={20} />
              <div>
                <strong>Authentication Simulator</strong>
                <p>Resident credentials recognized. Dashboard module is scheduled in Phase 4.</p>
              </div>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="auth-portal__form">
            <div className="auth-portal__field">
              <label htmlFor="resident-email">Registered Email Address</label>
              <div className="auth-portal__input-wrapper">
                <Mail size={18} className="auth-portal__icon" />
                <input
                  id="resident-email"
                  type="email"
                  required
                  placeholder="resident@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="auth-portal__field">
              <div className="auth-portal__field-header">
                <label htmlFor="resident-password">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Please contact the Admin Office at (046) 483-0291 to reset your resident portal password.'); }}>
                  Forgot password?
                </a>
              </div>
              <div className="auth-portal__input-wrapper">
                <Lock size={18} className="auth-portal__icon" />
                <input
                  id="resident-password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="btn btn--primary auth-portal__btn">
              Sign In to Resident Portal
            </button>
          </form>

          <div className="auth-portal__footer">
            <AlertCircle size={16} />
            <span>New homeowner or need access credentials? Visit the HOA Admin Office at the Clubhouse.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
