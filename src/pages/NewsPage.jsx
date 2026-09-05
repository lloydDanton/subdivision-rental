import React from 'react';
import PageBanner from '../components/PageBanner';
import { Calendar, Bell, ArrowRight } from 'lucide-react';
import './PageShell.css';

export default function NewsPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBanner
        title="News & Village Notices"
        subtitle="Stay informed with official circulars, maintenance schedules, and community events from the Tagaytay Country Homes 2 HOA."
        crumbs={[{ label: 'News' }]}
      />

      <section className="section-spacing container">
        <div className="section-header">
          <span className="eyebrow">Latest Updates</span>
          <h2>HOA Bulletins & Events</h2>
          <p>Important community announcements and updates for all residents and lot owners.</p>
        </div>

        <div className="page-shell__grid">
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Calendar size={28} /></div>
            <span className="eyebrow" style={{ marginBottom: '8px' }}>September 2026</span>
            <h3>2026 Annual Homeowners General Assembly</h3>
            <p>Notice of the upcoming Annual General Meeting and election of the Board of Trustees at the Main Clubhouse.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Bell size={28} /></div>
            <span className="eyebrow" style={{ marginBottom: '8px' }}>Security Advisory</span>
            <h3>Updated Vehicle RFID System Implementation</h3>
            <p>Registration and distribution of new electronic gate access stickers for all resident and commercial vehicles.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Bell size={28} /></div>
            <span className="eyebrow" style={{ marginBottom: '8px' }}>Maintenance</span>
            <h3>Scheduled Tree Trimming & Drainage Check</h3>
            <p>Preventative seasonal maintenance along Country Homes Drive in preparation for highland rainy periods.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
