import './GuestSelector.css';

/**
 * GuestSelector — +/- stepper for selecting guest count.
 *
 * Props:
 *   value     number   — current guest count (controlled)
 *   onChange  fn(n)    — called with new value
 *   min       number   — minimum guests (default: 1)
 *   max       number   — maximum guests (default: 20)
 *   label     string   — accessible label (default: "Guests")
 */
export default function GuestSelector({
  value,
  onChange,
  min = 1,
  max = 20,
  label = 'Guests',
}) {
  function decrement() {
    if (value > min) onChange(value - 1);
  }

  function increment() {
    if (value < max) onChange(value + 1);
  }

  return (
    <div className="guest-selector">
      <span className="guest-selector__label">{label}</span>
      <div className="guest-selector__controls">
        <button
          type="button"
          className="guest-selector__btn"
          onClick={decrement}
          disabled={value <= min}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          −
        </button>
        <output
          className="guest-selector__value"
          aria-live="polite"
          aria-label={`${value} ${value === 1 ? 'guest' : 'guests'}`}
        >
          {value}
        </output>
        <button
          type="button"
          className="guest-selector__btn"
          onClick={increment}
          disabled={value >= max}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          +
        </button>
      </div>
      <span className="guest-selector__hint">
        {value === max ? `Max ${max} guests` : `Up to ${max} guests`}
      </span>
    </div>
  );
}
