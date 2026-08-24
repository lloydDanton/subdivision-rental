import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GuestSelector from './GuestSelector';
import PriceSummary from './PriceSummary';
import Button from './Button';
import './BookingForm.css';

/**
 * BookingForm — sticky booking card shown on the PropertyDetails page.
 *
 * Props:
 *   propertyId    number   — used to navigate to /booking/:id
 *   pricePerNight number   — nightly rate in PHP
 *   maxGuests     number   — hard cap on guest count
 *   rating        number   — displayed in the card header
 */
export default function BookingForm({ propertyId, pricePerNight, maxGuests, rating }) {
  const navigate = useNavigate();
  const today = new Date().toISOString().split('T')[0];

  const [checkIn, setCheckIn]   = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests]     = useState(1);

  const nights = checkIn && checkOut
    ? Math.max(0, Math.round((new Date(checkOut) - new Date(checkIn)) / 86_400_000))
    : 0;

  const fmt = (n) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(n);

  function handleReserve() {
    const params = new URLSearchParams();
    if (checkIn)  params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    params.set('guests', guests);
    navigate(`/booking/${propertyId}?${params.toString()}`);
  }

  return (
    <aside className="booking-form" aria-label="Booking summary">
      {/* Header */}
      <div className="booking-form__header">
        <div className="booking-form__price">
          <span className="booking-form__price-amount">{fmt(pricePerNight)}</span>
          <span className="booking-form__price-unit"> / night</span>
        </div>
        <div className="booking-form__rating" aria-label={`Rating: ${rating}`}>
          <span className="booking-form__star" aria-hidden="true">★</span>
          {rating?.toFixed(1)}
        </div>
      </div>

      {/* Date fields */}
      <div className="booking-form__dates">
        <div className="booking-form__date-field">
          <label htmlFor="bf-checkin" className="booking-form__date-label">Check-in</label>
          <input
            id="bf-checkin"
            type="date"
            className="booking-form__date-input"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut && e.target.value >= checkOut) setCheckOut('');
            }}
          />
        </div>
        <div className="booking-form__date-divider" aria-hidden="true" />
        <div className="booking-form__date-field">
          <label htmlFor="bf-checkout" className="booking-form__date-label">Check-out</label>
          <input
            id="bf-checkout"
            type="date"
            className="booking-form__date-input"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
      </div>

      {/* Guest selector */}
      <div className="booking-form__guests">
        <GuestSelector
          value={guests}
          onChange={setGuests}
          min={1}
          max={maxGuests}
          label="Guests"
        />
      </div>

      {/* Reserve button */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        onClick={handleReserve}
      >
        Reserve
      </Button>

      <p className="booking-form__no-charge">
        You won&apos;t be charged yet
      </p>

      {/* Price breakdown */}
      {nights > 0 && (
        <PriceSummary pricePerNight={pricePerNight} nights={nights} />
      )}

      {nights === 0 && (
        <p className="booking-form__select-dates">
          Select dates to see the total price
        </p>
      )}
    </aside>
  );
}
