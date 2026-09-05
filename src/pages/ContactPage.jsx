import React from 'react';
import PageBanner from '../components/PageBanner';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './PageShell.css';

export default function ContactPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBanner
        title="Contact Us & Directory"
        subtitle="Get in touch with the Tagaytay Country Homes 2 Administration Office or reach out to 24/7 Security Command."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="section-spacing container">
        <div className="section-header">
          <span className="eyebrow">Administration & Support</span>
          <h2>We Are Here to Assist You</h2>
          <p>Whether you have questions about village guidelines, amenity booking, or security assistance, our office is ready to help.</p>
        </div>

        <div className="page-shell__grid">
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><MapPin size={28} /></div>
            <h3>Village Address</h3>
            <p>Clubhouse Drive, Tagaytay Country Homes 2, Tagaytay City, Cavite 4120, Philippines</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Phone size={28} /></div>
            <h3>Phone & Hotline</h3>
            <p>Admin Office: (046) 483-0291<br />24/7 Gate Guardhouse: 0917 882 2482</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Clock size={28} /></div>
            <h3>Office Hours</h3>
            <p>Monday to Saturday: 8:00 AM – 5:00 PM<br />Sunday & Holidays: Guardhouse On-Duty</p>
          </div>
        </div>
      </section>
    </main>
  );
}
