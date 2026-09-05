import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CommunityPage from './pages/CommunityPage';
import NewsPage from './pages/NewsPage';
import DownloadsPage from './pages/DownloadsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import LoginPage from './pages/LoginPage';

import './App.css';

function Layout({ children }) {
  return (
    <div className="app-layout">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Navbar />
      <div className="app-content">{children}</div>
      <Footer />
    </div>
  );
}

function NotFoundPage() {
  return (
    <main id="main-content" className="placeholder-page">
      <div className="placeholder-page__inner">
        <h1>404 — Page Not Found</h1>
        <p>The page you are looking for does not exist or has been relocated.</p>
        <Link to="/" className="btn btn--primary">← Return to Homepage</Link>
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
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
