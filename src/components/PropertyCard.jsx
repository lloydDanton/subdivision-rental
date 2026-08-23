import './PropertyCard.css';

/**
 * PropertyCard — purely presentational, driven entirely by props.
 *
 * Expected prop shape:
 *   property: {
 *     id: number,
 *     title: string,
 *     location: string,
 *     image: string,
 *     rating: number,      // e.g. 4.8
 *     bedrooms: number,
 *     bathrooms: number,
 *     maxGuests: number,
 *     pricePerNight: number,  // in PHP ₱
 *   }
 *
 * onViewProperty(id) — optional callback when "View Property" is clicked.
 */
export default function PropertyCard({ property, onViewProperty }) {
  const {
    id,
    title,
    location,
    image,
    rating,
    bedrooms,
    bathrooms,
    maxGuests,
    pricePerNight,
  } = property;

  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pricePerNight);

  function handleView() {
    if (typeof onViewProperty === 'function') {
      onViewProperty(id);
    }
  }

  return (
    <article className="property-card" aria-label={title}>
      {/* Image */}
      <div className="property-card__image-wrap">
        <img
          src={image}
          alt={`Exterior view of ${title}`}
          className="property-card__image"
          loading="lazy"
        />
        {/* Rating badge */}
        <div className="property-card__rating" aria-label={`Rating: ${rating} out of 5`}>
          <span className="property-card__rating-star" aria-hidden="true">★</span>
          {rating.toFixed(1)}
        </div>
      </div>

      {/* Body */}
      <div className="property-card__body">
        {/* Location */}
        <p className="property-card__location">
          <svg
            className="property-card__pin-icon"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </p>

        {/* Title */}
        <h3 className="property-card__title">{title}</h3>

        {/* Specs */}
        <ul className="property-card__specs" aria-label="Property specifications">
          <li className="property-card__spec">
            <span className="property-card__spec-icon" aria-hidden="true">
              {/* Bed icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                <path d="M2 12V8a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v4" />
              </svg>
            </span>
            <span>{bedrooms} {bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
          </li>
          <li className="property-card__spec">
            <span className="property-card__spec-icon" aria-hidden="true">
              {/* Bath icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                <line x1="3" y1="12" x2="22" y2="12" />
              </svg>
            </span>
            <span>{bathrooms} {bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
          </li>
          <li className="property-card__spec">
            <span className="property-card__spec-icon" aria-hidden="true">
              {/* Users icon */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            <span>Up to {maxGuests} guests</span>
          </li>
        </ul>

        {/* Footer: price + CTA */}
        <div className="property-card__footer">
          <div className="property-card__price">
            <span className="property-card__price-amount">{formattedPrice}</span>
            <span className="property-card__price-unit"> / night</span>
          </div>
          <button
            className="property-card__cta"
            onClick={handleView}
            aria-label={`View property: ${title}`}
          >
            View Property
          </button>
        </div>
      </div>
    </article>
  );
}
