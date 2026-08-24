import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from './PropertyCard';
import { getAllProperties } from '../services/propertyService';
import './PropertyListings.css';

export default function PropertyListings() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    async function fetchProperties() {
      try {
        setLoading(true);
        const data = await getAllProperties();
        if (!cancelled) setProperties(data);
      } catch (err) {
        if (!cancelled) setError('Unable to load properties. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProperties();
    return () => { cancelled = true; };
  }, []);

  function handleViewProperty(id) {
    navigate(`/properties/${id}`);
  }

  return (
    <section className="listings" aria-labelledby="listings-heading">
      <div className="listings__inner">
        {/* Section header */}
        <div className="listings__header">
          <div>
            <p className="listings__eyebrow">Browse Homes</p>
            <h2 id="listings-heading" className="listings__title">
              Featured Properties
            </h2>
            <p className="listings__subtitle">
              Handpicked houses across premier subdivisions — fully furnished and
              ready for your stay.
            </p>
          </div>
          <a href="/browse" className="listings__see-all" aria-label="See all available properties">
            See all properties →
          </a>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="listings__grid" aria-busy="true" aria-label="Loading properties">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="listings__skeleton" aria-hidden="true">
                <div className="listings__skeleton-img" />
                <div className="listings__skeleton-body">
                  <div className="listings__skeleton-line listings__skeleton-line--short" />
                  <div className="listings__skeleton-line" />
                  <div className="listings__skeleton-line listings__skeleton-line--med" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="listings__error" role="alert">
            <p>{error}</p>
            <button
              className="listings__retry-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && properties.length === 0 && (
          <div className="listings__empty">
            <p>No properties found. Check back soon!</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && properties.length > 0 && (
          <div className="listings__grid">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewProperty={handleViewProperty}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
