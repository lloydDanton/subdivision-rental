import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import './App.css';

/**
 * App — root component.
 *
 * Routing structure:
 *   /            → HomePage (landing page)
 *   /browse      → (placeholder — add BrowsePage when ready)
 *   /property/:id → (placeholder — add PropertyDetailPage when ready)
 *   /become-a-host → (placeholder)
 *   /login        → (placeholder)
 *   /register     → (placeholder)
 *   *            → NotFoundPage
 *
 * The Navbar and Footer are rendered in a shared layout wrapper so they
 * appear on every route without repeating them in each page component.
 */
function Layout({ children }) {
  return (
    <div className="app-layout">
      {/* Skip to main content — accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

function PlaceholderPage({ title }) {
  return (
    <main id="main-content" className="placeholder-page">
      <div className="placeholder-page__inner">
        <h1>{title}</h1>
        <p>This page is coming soon.</p>
        <a href="/" className="placeholder-page__back">← Back to Home</a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<PlaceholderPage title="Browse Properties" />} />
          <Route path="/property/:id" element={<PlaceholderPage title="Property Details" />} />
          <Route path="/become-a-host" element={<PlaceholderPage title="Become a Host" />} />
          <Route path="/login" element={<PlaceholderPage title="Log In" />} />
          <Route path="/register" element={<PlaceholderPage title="Register" />} />
          <Route path="*" element={<PlaceholderPage title="404 — Page Not Found" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
