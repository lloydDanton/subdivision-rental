import { useState } from 'react';
import './PropertyGallery.css';

/**
 * PropertyGallery — displays a hero image + thumbnail strip with lightbox.
 *
 * Props:
 *   images   string[]   — array of image URLs (min 1)
 *   title    string     — property title used for alt text
 */
export default function PropertyGallery({ images = [], title = 'Property' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const safeImages = images.length > 0 ? images : [
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop',
  ];

  function openLightbox(index) {
    setActiveIndex(index);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
  }

  function prev(e) {
    e.stopPropagation();
    setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  }

  function next(e) {
    e.stopPropagation();
    setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') setActiveIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
    if (e.key === 'ArrowRight') setActiveIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
  }

  return (
    <div className="gallery">
      {/* Main image */}
      <div className="gallery__main" onClick={() => openLightbox(activeIndex)}>
        <img
          src={safeImages[activeIndex]}
          alt={`${title} — photo ${activeIndex + 1} of ${safeImages.length}`}
          className="gallery__main-img"
        />
        <button
          className="gallery__show-all"
          onClick={(e) => { e.stopPropagation(); openLightbox(0); }}
          aria-label="Show all photos"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          Show all photos
        </button>
        {safeImages.length > 1 && (
          <span className="gallery__counter" aria-live="polite">
            {activeIndex + 1} / {safeImages.length}
          </span>
        )}
      </div>

      {/* Thumbnail strip */}
      {safeImages.length > 1 && (
        <div className="gallery__thumbs" role="list" aria-label="Property photo thumbnails">
          {safeImages.map((src, i) => (
            <button
              key={i}
              role="listitem"
              className={`gallery__thumb${i === activeIndex ? ' gallery__thumb--active' : ''}`}
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1}`}
              aria-current={i === activeIndex}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button className="gallery__lightbox-close" onClick={closeLightbox} aria-label="Close photo viewer">
            ✕
          </button>

          {safeImages.length > 1 && (
            <>
              <button className="gallery__lightbox-nav gallery__lightbox-nav--prev" onClick={prev} aria-label="Previous photo">‹</button>
              <button className="gallery__lightbox-nav gallery__lightbox-nav--next" onClick={next} aria-label="Next photo">›</button>
            </>
          )}

          <div className="gallery__lightbox-img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={safeImages[activeIndex]}
              alt={`${title} — photo ${activeIndex + 1} of ${safeImages.length}`}
              className="gallery__lightbox-img"
            />
          </div>

          <span className="gallery__lightbox-counter">
            {activeIndex + 1} / {safeImages.length}
          </span>
        </div>
      )}
    </div>
  );
}
