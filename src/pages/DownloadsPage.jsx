import React from 'react';
import PageBanner from '../components/PageBanner';
import { FileText, Download, Shield, Wrench } from 'lucide-react';
import './PageShell.css';

export default function DownloadsPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBanner
        title="Downloads & Forms"
        subtitle="Official association documents, gate sticker application forms, construction permits, and village guidelines."
        crumbs={[{ label: 'Downloads' }]}
      />

      <section className="section-spacing container">
        <div className="section-header">
          <span className="eyebrow">Resident Resources</span>
          <h2>Downloadable Forms & Guidelines</h2>
          <p>Easily access and download official association paperwork to submit to the Admin Office.</p>
        </div>

        <div className="page-shell__grid">
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Shield size={28} /></div>
            <h3>Vehicle RFID Sticker Application</h3>
            <p>Form required to register personal and household vehicles for fast-track automated gate entry.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Wrench size={28} /></div>
            <h3>Renovation & Construction Clearance</h3>
            <p>Guidelines and architectural review requirements for house renovations, extensions, and landscape work.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><FileText size={28} /></div>
            <h3>Association Bylaws & House Rules</h3>
            <p>Complete compendium of Tagaytay Country Homes 2 rules, noise regulations, pet etiquette, and community codes.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
