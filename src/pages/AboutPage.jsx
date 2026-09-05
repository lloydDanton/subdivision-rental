import React from 'react';
import PageBanner from '../components/PageBanner';
import { ShieldCheck, HeartHandshake, Mountain, Award } from 'lucide-react';
import './PageShell.css';

export default function AboutPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBanner
        title="About Tagaytay Country Homes 2"
        subtitle="A premier highland residential community committed to peaceful living, security, and neighborly camaraderie in Tagaytay City."
        crumbs={[{ label: 'About' }]}
      />

      <section className="section-spacing container">
        <div className="section-header">
          <span className="eyebrow">Our Heritage & Mission</span>
          <h2>A Heritage of Highland Serenity</h2>
          <p>
            Established with a vision for peaceful suburban living amidst the cool pine breeze of Tagaytay, Tagaytay Country Homes 2 has flourished into an idyllic sanctuary for families, retirees, and homeowners seeking tranquil living.
          </p>
        </div>

        <div className="page-shell__grid">
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><ShieldCheck size={28} /></div>
            <h3>Safety & Peace of Mind</h3>
            <p>Dedicated round-the-clock security personnel, automated RFID gate verification, and CCTV monitoring across key intersections.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Mountain size={28} /></div>
            <h3>Highland Climate & Greenery</h3>
            <p>Abundant open spaces, mature pine trees, and fresh mountain air providing a refreshing reprieve from urban congestion.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><HeartHandshake size={28} /></div>
            <h3>Cohesive Community</h3>
            <p>An active, transparent Homeowners Association fostering community events, neighborhood watch, and sustainable upkeep.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
