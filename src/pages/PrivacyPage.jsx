import React from 'react';
import PageBanner from '../components/PageBanner';
import { Shield, Lock, FileCheck } from 'lucide-react';
import './PageShell.css';

export default function PrivacyPage() {
  return (
    <main id="main-content" className="page-shell">
      <PageBanner
        title="Privacy Policy & Village Charter"
        subtitle="Data protection and privacy guidelines for homeowners, tenants, and visitors of Tagaytay Country Homes 2."
        crumbs={[{ label: 'Privacy Policy' }]}
      />

      <section className="section-spacing container">
        <div className="section-header">
          <span className="eyebrow">Data Privacy & Terms</span>
          <h2>Resident Information Protection</h2>
          <p>
            In compliance with the Data Privacy Act of 2012 (Republic Act No. 10173), Tagaytay Country Homes 2 Homeowners Association, Inc. is dedicated to protecting the privacy, security, and confidentiality of all homeowner records, visitor logs, and vehicle registration data.
          </p>
        </div>

        <div className="page-shell__grid">
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Shield size={28} /></div>
            <h3>Collection of Information</h3>
            <p>We collect essential identity, contact, and vehicle details solely for village security, emergency management, and association billing.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><Lock size={28} /></div>
            <h3>Gate & CCTV Surveillance</h3>
            <p>CCTV recordings and visitor logbooks are stored securely and accessed strictly by authorized security officers for safety verification.</p>
          </div>
          <div className="page-shell__card">
            <div className="page-shell__card-icon"><FileCheck size={28} /></div>
            <h3>Resident Rights</h3>
            <p>Homeowners have the full right to review, update, and request corrections to their personal membership records on file.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
