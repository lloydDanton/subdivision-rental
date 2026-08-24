import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import PropertyDetails from './pages/PropertyDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Dashboard from './pages/Dashboard';
import './App.css';

function Layout({ children }) {
  return (
    <div className="app-layout">
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
        <Link to="/" className="placeholder-page__back">← Back to Home</Link>
      </div>
    </main>
  );
}

function NotFoundPage() {
  return (
    <main id="main-content" className="placeholder-page">
      <div className="placeholder-page__inner">
        <h1>404 — Page Not Found</h1>
        <p>The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link to="/" className="placeholder-page__back">← Back to Home</Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Phase 1 */}
          <Route path="/"                element={<HomePage />} />

          {/* Phase 2 */}
          <Route path="/properties/:id"  element={<PropertyDetails />} />
          <Route path="/booking/:id"     element={<Booking />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/register"        element={<Register />} />
          <Route path="/dashboard"       element={<Dashboard />} />

          {/* Phase 3 placeholders */}
          <Route path="/browse"          element={<PlaceholderPage title="Browse Properties" />} />
          <Route path="/become-a-host"   element={<PlaceholderPage title="Become a Host" />} />

          {/* Catch-all */}
          <Route path="*"                element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
