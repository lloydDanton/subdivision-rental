import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import GuestSelector from '../components/GuestSelector';
import PriceSummary from '../components/PriceSummary';
import Button from '../components/Button';
import { getPropertyById } from '../services/propertyService';
import './Booking.css';

export default function Booking() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const [property, setProperty]   = useState(null);
  const [loading, setLoading]     = useState(true);
  const [notFound, setNotFound]   = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Pre-fill from query params (set by BookingForm / PropertyDetails)
  const [checkIn, setCheckIn]   = useState(searchParams.get('checkIn') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkOut') || '');
  const [guests, setGuests]     = useState(Number(searchParams.get('guests')) || 1);

  const nights =
    checkIn && checkOut
      ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86_400_000))
      : 0;

  useEffect(() => {
    let cancelled = false;
    getPropertyById(id).then((data) => {
      if (cancelled) return;
      if (!data) setNotFound(true);
      else setProperty(data);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, [id]);

  function handleConfirm(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setConfirmed(true);
    }, 1000);
  }

  const fmt = (n) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(n);

  /* ── Loading ── */
  if (loading) {
    return (
      <main id="main-content" className="booking">
        <div className="booking__inner booking__inner--loading">
          <div className="booking__skeleton" />
        </div>
      </main>
    );
  }

  /* ── Not found ── */
  if (notFound || !property) {
    return (
      <main id="main-content" className="booking">
        <div className="booking__not-found">
          <h1>Property Not Found</h1>
          <p>We couldn&apos;t find the property you&apos;re trying to book.</p>
          <Button as="a" href="/#/browse" variant="primary">Browse Properties</Button>
        </div>
      </main>
    );
  }

  /* ── Confirmed state ── */
  if (confirmed) {
    return (
      <main id="main-content" className="booking">
        <div className="booking__confirmed" role="status" aria-live="polite">
          <div className="booking__confirmed-icon" aria-hidden="true">🎉</div>
          <h1 className="booking__confirmed-title">Booking Request Submitted</h1>
          <p className="booking__confirmed-desc">
            This is currently a frontend demonstration. Real booking functionality
            will be implemented when the backend is connected in a future phase.
          </p>
          <div className="booking__confirmed-details">
            <div className="booking__confirmed-row">
              <span>Property</span>
              <strong>{property.title}</strong>
            </div>
            {checkIn && (
              <div className="booking__confirmed-row">
                <span>Check-in</span>
                <strong>{new Date(checkIn + 'T00:00:00').toLocaleDateString('en-PH', { dateStyle: 'long' })}</strong>
              </div>
            )}
            {checkOut && (
              <div className="booking__confirmed-row">
                <span>Check-out</span>
                <strong>{new Date(checkOut + 'T00:00:00').toLocaleDateString('en-PH', { dateStyle: 'long' })}</strong>
              </div>
            )}
            <div className="booking__confirmed-row">
              <span>Guests</span>
              <strong>{guests}</strong>
            </div>
            {nights > 0 && (
              <div className="booking__confirmed-row booking__confirmed-row--total">
                <span>Estimated Total</span>
                <strong>
                  {fmt(property.pricePerNight * nights + Math.round(property.pricePerNight * nights * 0.1))}
                </strong>
              </div>
            )}
          </div>
          <div className="booking__confirmed-actions">
            <Link to="/" className="booking__confirmed-btn-primary">Return Home</Link>
            <Link to="/dashboard" className="booking__confirmed-btn-outline">View Dashboard</Link>
          </div>
        </div>
      </main>
    );
  }

  /* ── Main booking form ── */
  return (
    <main id="main-content" className="booking">
      <div className="booking__inner">

        {/* Breadcrumb */}
        <nav className="booking__breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="booking__breadcrumb-link">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to={`/properties/${property.id}`} className="booking__breadcrumb-link">{property.title}</Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Booking</span>
        </nav>

        <h1 className="booking__heading">Confirm your booking</h1>

        <div className="booking__layout">

          {/* Left — form */}
          <form className="booking__form" onSubmit={handleConfirm} aria-label="Booking form">

            {/* Date section */}
            <section className="booking__section" aria-labelledby="dates-heading">
              <h2 id="dates-heading" className="booking__section-title">Your stay</h2>
              <div className="booking__dates">
                <div className="booking__date-field">
                  <label htmlFor="bk-checkin" className="booking__date-label">Check-in</label>
                  <input
                    id="bk-checkin"
                    type="date"
                    className="booking__date-input"
                    min={today}
                    value={checkIn}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && e.target.value >= checkOut) setCheckOut('');
                    }}
                    required
                  />
                </div>
                <div className="booking__date-field">
                  <label htmlFor="bk-checkout" className="booking__date-label">Check-out</label>
                  <input
                    id="bk-checkout"
                    type="date"
                    className="booking__date-input"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    required
                  />
                </div>
              </div>
              {nights > 0 && (
                <p className="booking__nights-badge">
                  {nights} {nights === 1 ? 'night' : 'nights'} selected
                </p>
              )}
            </section>

            {/* Guest section */}
            <section className="booking__section" aria-labelledby="guests-heading">
              <h2 id="guests-heading" className="booking__section-title">Guests</h2>
              <div className="booking__guest-wrap">
                <GuestSelector
                  value={guests}
                  onChange={setGuests}
                  min={1}
                  max={property.maxGuests}
                />
              </div>
            </section>

            {/* Policy note */}
            <section className="booking__section booking__section--policy">
              <h2 className="booking__section-title">Cancellation policy</h2>
              <p className="booking__policy-text">
                Free cancellation for 48 hours after booking. After that, cancel before
                check-in for a partial refund. <strong>Note:</strong> This is a demo —
                no real booking or charge will be processed.
              </p>
            </section>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={submitting}
              disabled={!checkIn || !checkOut || nights === 0}
            >
              {submitting ? 'Processing…' : 'Confirm Booking'}
            </Button>

            {(!checkIn || !checkOut) && (
              <p className="booking__submit-hint">Please select check-in and check-out dates to continue.</p>
            )}
          </form>

          {/* Right — summary */}
          <aside className="booking__summary" aria-label="Booking summary">

            {/* Property card */}
            <div className="booking__property-card">
              <img
                src={property.image}
                alt={`Exterior of ${property.title}`}
                className="booking__property-img"
              />
              <div className="booking__property-info">
                <p className="booking__property-location">{property.location}</p>
                <h3 className="booking__property-title">{property.title}</h3>
                <div className="booking__property-meta">
                  <span className="booking__property-rating" aria-label={`Rating ${property.rating}`}>
                    <span aria-hidden="true">★</span> {property.rating?.toFixed(1)}
                  </span>
                  <span className="booking__property-price">{fmt(property.pricePerNight)} / night</span>
                </div>
              </div>
            </div>

            {/* Price summary */}
            <div className="booking__price-wrap">
              <PriceSummary pricePerNight={property.pricePerNight} nights={nights} />
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
