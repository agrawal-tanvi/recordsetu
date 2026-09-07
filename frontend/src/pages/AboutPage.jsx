import React from 'react';
import { AshokaEmblem, DigitalIndiaLogo, AbhilekhSetuLogo } from '../assets/visuals';
import { ShieldCheck, Database, Map, CheckCircle2 } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>About AbhilekhSetu</strong>
            </div>
            <h1 className="page-title">हमारे बारे में • About AbhilekhSetu & Land Digitization</h1>
            <p className="page-subtitle">Intelligent Land Record Digitization & Validation • SIH26018 Prototype</p>
          </div>
        </div>
      </div>

      <div className="container page-body-container" style={{ maxWidth: '960px', margin: '2rem auto' }}>
        <div className="about-card" style={{ background: '#FFFFFF', padding: '2.5rem', borderRadius: '8px', border: '1px solid #D1D5DB' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1.5rem' }}>
            <AbhilekhSetuLogo width={64} height={64} />
            <div>
              <h2 style={{ color: '#163A63', fontSize: '1.8rem', fontWeight: '800' }}>AbhilekhSetu Prototype</h2>
              <p style={{ color: '#4B5563', fontSize: '1.05rem' }}>"भूमि अभिलेख से विश्वास तक" • From Land Records to Trusted Digital Records</p>
            </div>
          </div>

          <h3 style={{ color: '#163A63', marginBottom: '0.75rem' }}>National Mission Objective</h3>
          <p style={{ color: '#374151', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            The Digital India Land Records Modernization Programme (DILRMP) is a flagship initiative of the Ministry of Rural Development,
            Department of Land Resources, Government of India. The primary objective is to build a transparent, integrated, and accessible
            land record management system with conclusive land-titling system across all 36 States and Union Territories.
          </p>

          <h3 style={{ color: '#163A63', marginBottom: '1rem' }}>Key Technological Pillars</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <Database size={24} style={{ color: '#163A63', marginBottom: '0.5rem' }} />
              <h4 style={{ color: '#163A63', fontSize: '1rem', marginBottom: '0.4rem' }}>Centralized Ledgers</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Real-time synchronization between sub-registrar offices, tehsil revenue courts, and survey departments.</p>
            </div>
            <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <Map size={24} style={{ color: '#163A63', marginBottom: '0.5rem' }} />
              <h4 style={{ color: '#163A63', fontSize: '1rem', marginBottom: '0.4rem' }}>Bhu-Aadhaar (ULPIN)</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B' }}>14-digit alphanumeric Unique Land Parcel Identification Number based on geo-referenced parcel coordinates.</p>
            </div>
            <div style={{ padding: '1.25rem', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <ShieldCheck size={24} style={{ color: '#163A63', marginBottom: '0.5rem' }} />
              <h4 style={{ color: '#163A63', fontSize: '1rem', marginBottom: '0.4rem' }}>Validation & Audit Trails</h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B' }}>Automated entity validation and human audit trails ensuring land record accuracy and accountability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
