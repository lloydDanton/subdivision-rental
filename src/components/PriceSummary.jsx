import './PriceSummary.css';

/**
 * PriceSummary — displays a booking price breakdown.
 *
 * Props:
 *   pricePerNight  number   — base nightly rate in PHP
 *   nights         number   — number of nights (0 = no dates selected)
 *   serviceFeeRate number   — fraction of subtotal used as service fee (default: 0.10)
 */
export default function PriceSummary({ pricePerNight, nights = 0, serviceFeeRate = 0.10 }) {
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * serviceFeeRate);
  const total = subtotal + serviceFee;

  const fmt = (n) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <div className="price-summary">
      {/* Per-night rate */}
      <div className="price-summary__row price-summary__row--rate">
        <span>{fmt(pricePerNight)} × {nights > 0 ? `${nights} ${nights === 1 ? 'night' : 'nights'}` : '— nights'}</span>
        <span>{nights > 0 ? fmt(subtotal) : '—'}</span>
      </div>

      {/* Service fee */}
      <div className="price-summary__row">
        <span className="price-summary__label-with-info">
          Service fee
          <span className="price-summary__info" aria-label="10% of subtotal">
            (10%)
          </span>
        </span>
        <span>{nights > 0 ? fmt(serviceFee) : '—'}</span>
      </div>

      <div className="price-summary__divider" />

      {/* Total */}
      <div className="price-summary__row price-summary__row--total">
        <span>Total</span>
        <span>{nights > 0 ? fmt(total) : '—'}</span>
      </div>

      {nights === 0 && (
        <p className="price-summary__hint">
          Select check-in and check-out dates to see the total price.
        </p>
      )}
    </div>
  );
}
