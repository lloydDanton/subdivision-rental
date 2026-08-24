import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './Auth.css';

function passwordStrength(pw) {
  if (!pw) return null;
  if (pw.length < 6) return 'weak';
  if (pw.length < 10 || !/[0-9]/.test(pw)) return 'fair';
  return 'strong';
}

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm]   = useState(false);
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const strength = passwordStrength(form.password);

  function update(field) {
    return (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
    };
  }

  function validate() {
    const errs = {};
    if (!form.fullName.trim()) {
      errs.fullName = 'Full name is required.';
    } else if (form.fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }
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
    if (!form.confirmPassword) {
      errs.confirmPassword = 'Please confirm your password.';
    } else if (form.confirmPassword !== form.password) {
      errs.confirmPassword = 'Passwords do not match.';
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
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard'), 1200);
    }, 900);
  }

  function toggleBtn(visible, setVisible, label) {
    return (
      <button
        type="button"
        className="auth__show-hide"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? `Hide ${label}` : `Show ${label}`}
      >
        {visible ? (
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
  }

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

        <h1 className="auth__heading">Create your account</h1>
        <p className="auth__subheading">Join SubdivisionStay and find your perfect home away from home</p>

        {/* Success state */}
        {submitted && (
          <div className="auth__success" role="status" aria-live="polite">
            <span className="auth__success-icon" aria-hidden="true">✓</span>
            Account created! Redirecting to your dashboard…
          </div>
        )}

        {!submitted && (
          <form className="auth__form" onSubmit={handleSubmit} noValidate>
            <FormInput
              id="reg-name"
              label="Full name"
              type="text"
              value={form.fullName}
              onChange={update('fullName')}
              placeholder="Juan dela Cruz"
              error={errors.fullName}
              required
              autoComplete="name"
            />

            <FormInput
              id="reg-email"
              label="Email address"
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              error={errors.email}
              required
              autoComplete="email"
            />

            <div>
              <FormInput
                id="reg-password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={update('password')}
                placeholder="At least 6 characters"
                error={errors.password}
                required
                autoComplete="new-password"
                rightSlot={toggleBtn(showPassword, setShowPassword, 'password')}
              />
              {/* Password strength indicator */}
              {form.password && (
                <div className="auth__strength">
                  <div className="auth__strength-bar">
                    <div className={`auth__strength-fill auth__strength-fill--${strength}`} />
                  </div>
                  <span className="auth__strength-label">
                    Password strength:{' '}
                    <strong>
                      {strength === 'weak' ? 'Weak' : strength === 'fair' ? 'Fair' : 'Strong'}
                    </strong>
                  </span>
                </div>
              )}
            </div>

            <FormInput
              id="reg-confirm"
              label="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={update('confirmPassword')}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
              required
              autoComplete="new-password"
              rightSlot={toggleBtn(showConfirm, setShowConfirm, 'confirm password')}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>
        )}

        <div className="auth__footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth__link">Log in</Link>
          </p>
          <Link to="/" className="auth__back">← Back to Home</Link>
        </div>
      </div>

      {/* Decorative side panel */}
      <div className="auth__panel" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop"
          alt=""
          className="auth__panel-img"
        />
        <div className="auth__panel-overlay">
          <blockquote className="auth__panel-quote">
            "200+ handpicked homes across premier subdivisions — all in one place."
          </blockquote>
        </div>
      </div>
    </main>
  );
}
