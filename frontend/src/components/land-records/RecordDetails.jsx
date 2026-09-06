import React from 'react';
import { ShieldCheck, Building2, CheckCircle, Hash, QrCode } from 'lucide-react';
import Badge from '../common/Badge';

const RecordDetails = ({ record }) => {
  return (
    <div className="document-container">
      {/* Official Government Header Banner */}
      <div className="doc-header">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
          <div style={{ background: '#163A63', color: '#FFFFFF', padding: '8px', borderRadius: '8px' }}>
            <Building2 size={32} />
          </div>
        </div>
        <h2>GOVERNMENT OF INDIA</h2>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Department of Land Resources | State Revenue Administration
        </div>
        <h3>RECORD OF RIGHTS (RoR) / KHATAUNI EXTRACT</h3>
        <span className="badge badge-verified" style={{ marginTop: '0.5rem' }}>
          OFFICIALLY VERIFIED & DIGITALLY ATTESTED
        </span>
      </div>

      {/* Primary Key Grid */}
      <div className="doc-details-grid">
        <div className="doc-field">
          <span className="doc-field-label">Record Identifier</span>
          <span className="doc-field-val">{record.id}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Khata / Khasra Number</span>
          <span className="doc-field-val">{record.khataNumber || 'KH-8821'} / {record.khasraNumber || record.surveyNumber}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Full Name of Landholder (Owner)</span>
          <span className="doc-field-val">{record.ownerName}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Father / Husband Name</span>
          <span className="doc-field-val">{record.relationName || 'N/A'}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">State</span>
          <span className="doc-field-val">{record.state}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">District</span>
          <span className="doc-field-val">{record.district}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Tehsil</span>
          <span className="doc-field-val">{record.tehsil}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Revenue Village</span>
          <span className="doc-field-val">{record.village}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Survey Number</span>
          <span className="doc-field-val">{record.surveyNumber}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Plot Number</span>
          <span className="doc-field-val">{record.plotNumber}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Registered Area Extent</span>
          <span className="doc-field-val">{record.area}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Land Classification Type</span>
          <span className="doc-field-val">{record.landType}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Original Registration Date</span>
          <span className="doc-field-val">{record.registrationDate}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Last Ledger Update</span>
          <span className="doc-field-val">{record.lastUpdated}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Encumbrance / Loan Details</span>
          <span className="doc-field-val">{record.encumbrance || 'Nil (Clear Title)'}</span>
        </div>
        <div className="doc-field">
          <span className="doc-field-label">Record Verification Status</span>
          <span className="doc-field-val" style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle size={16} />
            <span>{record.status}</span>
          </span>
        </div>
      </div>

      {/* Official Footprint & Attestation */}
      <div className="doc-footer-stamp">
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            Digital Signature Token: <strong>{record.digitalSignature || 'CERT-IN-NIC-UP-98214B87A'}</strong>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ULPIN Coordinates: <strong>{record.coordinates || '26.8524° N, 80.9982° E'}</strong>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Document authenticated under IT Act 2000. No physical revenue officer signature required.
          </div>
        </div>

        <div style={{ textAlign: 'center', border: '1px solid var(--border-color)', padding: '8px 14px', borderRadius: '6px', background: 'var(--light-bg)' }}>
          <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: 700, color: 'var(--government-blue)' }}>
            Verification Seal
          </div>
          <div style={{ fontWeight: 800, color: 'var(--primary-navy)', fontSize: '0.9rem' }}>
            RECORDSETU NIC
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;