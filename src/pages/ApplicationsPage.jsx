import React from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Clock, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const ApplicationsPage = () => {
  const applications = [
    {
      id: 'RS-APP-2026-8941',
      date: '28 Aug 2026',
      service: 'Mutation / Dakhil-Kharij (नामांतरण)',
      khasra: '45/2 (Khata: 00142)',
      location: 'Gomti Nagar, Lucknow Sadar',
      status: 'Under Field Inspection',
      statusType: 'progress'
    },
    {
      id: 'RS-APP-2026-4412',
      date: '14 Jan 2026',
      service: 'Certified Copy of RoR (खतौनी नकल)',
      khasra: '124/2 (Khata: 00318)',
      location: 'Khairpur, Rampur, Sitapur',
      status: 'Approved & Issued',
      statusType: 'success'
    }
  ];

  return (
    <div className="applications-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>Citizen Applications</strong>
            </div>
            <h1 className="page-title">मेरे आवेदन • Land Revenue Applications</h1>
            <p className="page-subtitle">Track real-time status of mutations, certified copies, and demarcation orders.</p>
          </div>
          <div className="header-actions">
            <Link to="/applications/new" className="btn btn-primary">
              <PlusCircle size={15} /> New Revenue Application
            </Link>
          </div>
        </div>
      </div>

      <div className="container page-body-container" style={{ margin: '2rem auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {applications.map(app => (
            <div key={app.id} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ background: '#EEF5FB', color: '#163A63', fontWeight: 'bold', padding: '2px 8px', borderRadius: '4px', fontSize: '0.85rem' }}>
                    {app.id}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600', color: app.statusType === 'success' ? '#059669' : '#D97706', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {app.statusType === 'success' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                    {app.status}
                  </span>
                </div>
                <h3 style={{ color: '#163A63', fontSize: '1.15rem', marginBottom: '0.25rem' }}>{app.service}</h3>
                <p style={{ color: '#475569', fontSize: '0.9rem' }}>
                  Plot: <strong>{app.khasra}</strong> • Jurisdiction: {app.location}
                </p>
                <span style={{ fontSize: '0.82rem', color: '#64748B', display: 'block', marginTop: '0.4rem' }}>
                  Submitted on: {app.date} • SLA: 15 Working Days
                </span>
              </div>
              <div>
                <Link to="/citizen/dashboard" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsPage;
