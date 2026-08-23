import HeroSection from '../components/HeroSection';
import PropertyListings from '../components/PropertyListings';

/**
 * HomePage — the landing page.
 * Composed from independent section components. Add or reorder sections here
 * without touching the individual components.
 */
export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <PropertyListings />
    </main>
  );
}
