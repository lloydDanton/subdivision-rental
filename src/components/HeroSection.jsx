import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import './HeroSection.css';

export default function HeroSection() {
  const navigate = useNavigate();

  function handleSearch(params) {
    const query = new URLSearchParams();
    if (params.location) query.set('location', params.location);
    if (params.checkIn)  query.set('checkIn', params.checkIn);
    if (params.checkOut) query.set('checkOut', params.checkOut);
    if (params.guests)   query.set('guests', params.guests);
    navigate(`/browse?${query.toString()}`);
  }

  return (
    <section className="hero" aria-labelledby="hero-heading">
      {/* Background overlay */}
      <div className="hero__bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&auto=format&fit=crop"
          alt=""
          className="hero__bg-img"
        />
        <div className="hero__bg-overlay" />
      </div>

      {/* Content */}
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-dot" aria-hidden="true" />
          Premium Subdivision Homes
        </div>

        <h1 id="hero-heading" className="hero__headline">
          Find Your Perfect
          <br />
          <span className="hero__headline-accent">Home Away From Home</span>
        </h1>

        <p className="hero__description">
          Browse handpicked houses inside premier subdivisions. Private, secure,
          and fully furnished — ready for your family&apos;s next stay.
        </p>

        {/* Search bar */}
        <div className="hero__search">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Trust badges */}
        <div className="hero__stats" role="list" aria-label="Platform highlights">
          <div className="hero__stat" role="listitem">
            <strong className="hero__stat-number">200+</strong>
            <span className="hero__stat-label">Listed Homes</span>
          </div>
          <div className="hero__stat-sep" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <strong className="hero__stat-number">50+</strong>
            <span className="hero__stat-label">Subdivisions</span>
          </div>
          <div className="hero__stat-sep" aria-hidden="true" />
          <div className="hero__stat" role="listitem">
            <strong className="hero__stat-number">4.9★</strong>
            <span className="hero__stat-label">Average Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}
