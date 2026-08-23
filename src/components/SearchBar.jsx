import { useState } from 'react';
import './SearchBar.css';

/**
 * SearchBar — collects location, check-in, check-out, and guest count.
 *
 * Props:
 *   onSearch({ location, checkIn, checkOut, guests }) — called when the user
 *   submits. Parent decides what to do with the values (filter listings, etc.)
 */
export default function SearchBar({ onSearch }) {
  const today = new Date().toISOString().split('T')[0];

  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (typeof onSearch === 'function') {
      onSearch({ location, checkIn, checkOut, guests });
    }
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search" aria-label="Search properties">
      {/* Location */}
      <div className="search-bar__field">
        <label htmlFor="sb-location" className="search-bar__label">
          Location
        </label>
        <div className="search-bar__input-wrap">
          <span className="search-bar__icon" aria-hidden="true">
            {/* Map-pin icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <input
            id="sb-location"
            type="text"
            className="search-bar__input"
            placeholder="Which subdivision?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="search-bar__divider" aria-hidden="true" />

      {/* Check-in */}
      <div className="search-bar__field">
        <label htmlFor="sb-checkin" className="search-bar__label">
          Check-in
        </label>
        <input
          id="sb-checkin"
          type="date"
          className="search-bar__input search-bar__input--date"
          min={today}
          value={checkIn}
          onChange={(e) => {
            setCheckIn(e.target.value);
            if (checkOut && e.target.value >= checkOut) setCheckOut('');
          }}
        />
      </div>

      <div className="search-bar__divider" aria-hidden="true" />

      {/* Check-out */}
      <div className="search-bar__field">
        <label htmlFor="sb-checkout" className="search-bar__label">
          Check-out
        </label>
        <input
          id="sb-checkout"
          type="date"
          className="search-bar__input search-bar__input--date"
          min={checkIn || today}
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="search-bar__divider" aria-hidden="true" />

      {/* Guests */}
      <div className="search-bar__field search-bar__field--guests">
        <label htmlFor="sb-guests" className="search-bar__label">
          Guests
        </label>
        <div className="search-bar__stepper">
          <button
            type="button"
            className="search-bar__stepper-btn"
            onClick={() => setGuests((g) => Math.max(1, g - 1))}
            aria-label="Decrease guests"
            disabled={guests <= 1}
          >
            −
          </button>
          <input
            id="sb-guests"
            type="number"
            className="search-bar__input search-bar__input--number"
            min="1"
            max="20"
            value={guests}
            onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
            aria-label="Number of guests"
            readOnly
          />
          <button
            type="button"
            className="search-bar__stepper-btn"
            onClick={() => setGuests((g) => Math.min(20, g + 1))}
            aria-label="Increase guests"
            disabled={guests >= 20}
          >
            +
          </button>
        </div>
      </div>

      {/* Search button */}
      <button type="submit" className="search-bar__submit" aria-label="Search properties">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>Search</span>
      </button>
    </form>
  );
}
