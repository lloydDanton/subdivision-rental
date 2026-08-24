import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  function validate() {
    const errs = {};
    if (!form.email.trim()) {
      errs.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      errs.password = 'Password is required.';
    } else if (form.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }
    return errs;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    // Simulate a short async operation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Navigate to dashboard after brief success flash
      setTimeout(() => navigate('/dashboard'), 1200);
    }, 900);
  }

  const showHideBtn = (
    <button
      type="button"
      className="auth__show-hide"
      onClick={() => setShowPassword((v) => !v)}
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      )}
    </button>
  );

  return (
    <main id="main-content" className="auth">
      <div className="auth__card">
        {/* Logo */}
        <Link to="/" className="auth__logo" aria-label="SubdivisionStay home">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="#2563EB"/>
            <path d="M16 6L6 14v12h7v-7h6v7h7V14L16 6z" fill="white"/>
          </svg>
          <span>SubdivisionStay</span>
        </Link>

        <h1 className="auth__heading">Welcome back</h1>
        <p className="auth__subheading">Sign in to your account to continue</p>

        {/* Success state */}
        {submitted && (
          <div className="auth__success" role="status" aria-live="polite">
            <span className="auth__success-icon" aria-hidden="true">✓</span>
            Signed in successfully! Redirecting…
          </div>
        )}

        {!submitted && (
          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <FormInput
              id="login-email"
              label="Email address"
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              error={errors.email}
              required
              autoComplete="email"
            />

            <FormInput
              id="login-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={update('password')}
              placeholder="Enter your password"
              error={errors.password}
              required
              autoComplete="current-password"
              rightSlot={showHideBtn}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Signing in…' : 'Log in'}
            </Button>
          </form>
        )}

        <div className="auth__footer">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="auth__link">Create one</Link>
          </p>
          <Link to="/" className="auth__back">← Back to Home</Link>
        </div>
      </div>

      {/* Decorative side panel */}
      <div className="auth__panel" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&auto=format&fit=crop"
          alt=""
          className="auth__panel-img"
        />
        <div className="auth__panel-overlay">
          <blockquote className="auth__panel-quote">
            "The best home away from home — right inside the subdivision."
          </blockquote>
        </div>
      </div>
    </main>
  );
}
