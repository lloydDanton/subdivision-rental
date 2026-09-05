import React from 'react';
import PageBanner from '../components/PageBanner';
import { Home, Trees, Shield, Sparkles } from 'lucide-react';
import './PageShell.css';

export default function CommunityPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBanner
        title="Community & Amenities"
        subtitle="Explore our village facilities, parklands, and recreational areas designed for recreation, celebration, and wellness."
        crumbs={[{ label: 'Community' }]}
      />

      <section className="section-spacing container">
        <div className="section-header">
          <span className="eyebrow">Living in Tagaytay Country Homes 2</span>
          <h2>Village Facilities & Green Spaces</h2>
          <p>
            From our multi-purpose clubhouse and refreshing swimming pool to scenic tree-lined jogging paths, our community provides leisure for every generation.
          </p>
        </div>

        <div className="page-shell__grid">
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Home size={28} /></div>
            <h3>Community Clubhouse</h3>
            <p>Spacious multi-purpose pavilion suitable for family celebrations, HOA assemblies, and festive gatherings.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Trees size={28} /></div>
            <h3>Nature Parks & Walkways</h3>
            <p>Lush landscape gardens and shaded walking lanes lined with native pine trees and Tagaytay flora.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Sparkles size={28} /></div>
            <h3>Sports & Recreation</h3>
            <p>Covered basketball court, tennis court, and dedicated children's playground for active recreation.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
