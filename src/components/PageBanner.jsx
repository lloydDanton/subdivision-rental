import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './PageBanner.css';

export default function PageBanner({ title, subtitle, crumbs = [] }) {
  return (
    <div className="page-banner">
      <div className="page-banner__container container">
        <nav className="page-banner__breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="page-banner__crumb-link">Home</Link>
          {crumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={14} className="page-banner__crumb-sep" />
              {crumb.path ? (
                <Link to={crumb.path} className="page-banner__crumb-link">{crumb.label}</Link>
              ) : (
                <span className="page-banner__crumb-current" aria-current="page">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <h1 className="page-banner__title">{title}</h1>
        {subtitle && <p className="page-banner__subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}
