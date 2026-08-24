import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyGallery from '../components/PropertyGallery';
import BookingForm from '../components/BookingForm';
import Button from '../components/Button';
import { getPropertyById } from '../services/propertyService';
import './PropertyDetails.css';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setNotFound(false);

    getPropertyById(id).then((data) => {
      if (cancelled) return;
      if (!data) {
        setNotFound(true);
      } else {
        setProperty(data);
      }
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [id]);

  /* ── Loading ── */
  if (loading) {
    return (
      <main id="main-content" className="pd">
        <div className="pd__inner">
          <div className="pd__skeleton">
            <div className="pd__skeleton-title" />
            <div className="pd__skeleton-gallery" />
            <div className="pd__skeleton-body">
              <div className="pd__skeleton-text" />
              <div className="pd__skeleton-text pd__skeleton-text--short" />
              <div className="pd__skeleton-text" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  /* ── Not found ── */
  if (notFound) {
    return (
      <main id="main-content" className="pd">
        <div className="pd__not-found">
          <div className="pd__not-found-icon" aria-hidden="true">🏠</div>
          <h1 className="pd__not-found-title">Property Not Found</h1>
          <p className="pd__not-found-desc">
            The property you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>
          <Button as="a" href="/#/browse" variant="primary" size="lg">
            Browse Properties
          </Button>
        </div>
      </main>
    );
  }

  const {
    title, location, images, image, rating,
    bedrooms, bathrooms, maxGuests, pricePerNight,
    description, amenities, houseRules,
  } = property;

  const galleryImages = images?.length ? images : [image];

  const fmt = (n) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
    }).format(n);

  return (
    <main id="main-content" className="pd">
      <div className="pd__inner">

        {/* Breadcrumb */}
        <nav className="pd__breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="pd__breadcrumb-link">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to="/browse" className="pd__breadcrumb-link">Browse</Link>
          <span aria-hidden="true"> / </span>
          <span className="pd__breadcrumb-current" aria-current="page">{title}</span>
        </nav>

        {/* Title row */}
        <div className="pd__title-row">
          <div>
            <h1 className="pd__title">{title}</h1>
            <div className="pd__meta">
              <span className="pd__rating" aria-label={`Rating ${rating} out of 5`}>
                <span aria-hidden="true">★</span> {rating?.toFixed(1)}
              </span>
              <span className="pd__meta-sep" aria-hidden="true">·</span>
              <span className="pd__location">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Gallery */}
        <PropertyGallery images={galleryImages} title={title} />

        {/* Two-column layout */}
        <div className="pd__layout">

          {/* Left column — details */}
          <div className="pd__details">

            {/* Quick specs */}
            <div className="pd__specs">
              <div className="pd__spec-item">
                <span className="pd__spec-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8"/>
                    <path d="M2 12V8a6 6 0 0 1 6-6h8a6 6 0 0 1 6 6v4"/>
                  </svg>
                </span>
                <div>
                  <strong>{bedrooms}</strong>
                  <span>{bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                </div>
              </div>
              <div className="pd__spec-item">
                <span className="pd__spec-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5"/>
                    <line x1="3" y1="12" x2="22" y2="12"/>
                  </svg>
                </span>
                <div>
                  <strong>{bathrooms}</strong>
                  <span>{bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                </div>
              </div>
              <div className="pd__spec-item">
                <span className="pd__spec-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </span>
                <div>
                  <strong>{maxGuests}</strong>
                  <span>{maxGuests === 1 ? 'Guest' : 'Guests'}</span>
                </div>
              </div>
              <div className="pd__spec-item">
                <span className="pd__spec-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23"/>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </span>
                <div>
                  <strong>{fmt(pricePerNight)}</strong>
                  <span>Per night</span>
                </div>
              </div>
            </div>

            <hr className="pd__divider" />

            {/* Description */}
            <section className="pd__section" aria-labelledby="pd-desc-heading">
              <h2 id="pd-desc-heading" className="pd__section-title">About this property</h2>
              <p className="pd__description">{description}</p>
            </section>

            <hr className="pd__divider" />

            {/* Amenities */}
            {amenities?.length > 0 && (
              <section className="pd__section" aria-labelledby="pd-amenities-heading">
                <h2 id="pd-amenities-heading" className="pd__section-title">Amenities</h2>
                <ul className="pd__amenities">
                  {amenities.map((item, i) => (
                    <li key={i} className="pd__amenity-item">
                      <span className="pd__amenity-check" aria-hidden="true">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <hr className="pd__divider" />

            {/* House rules */}
            {houseRules?.length > 0 && (
              <section className="pd__section" aria-labelledby="pd-rules-heading">
                <h2 id="pd-rules-heading" className="pd__section-title">House Rules</h2>
                <ul className="pd__rules">
                  {houseRules.map((rule, i) => (
                    <li key={i} className="pd__rule-item">
                      <span className="pd__rule-icon" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 11 12 14 22 4"/>
                          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                        </svg>
                      </span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right column — booking card */}
          <div className="pd__sidebar">
            <div className="pd__booking-sticky">
              <BookingForm
                propertyId={property.id}
                pricePerNight={pricePerNight}
                maxGuests={maxGuests}
                rating={rating}
              />
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
