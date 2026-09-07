import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, Award, Calendar, Hash, Building2 } from 'lucide-react';
import { initialRecords } from '../data/records';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const VerifyPage = () => {
  const [recordId, setRecordId] = useState('RS-2026-001');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setSearched(true);
    const found = initialRecords.find(r => r.id.toLowerCase() === recordId.trim().toLowerCase());
    if (found) {
      setResult(found);
    } else {
      setResult(null);
    }
  };

  return (
    <div className="verify-page">
      <div className="page-hero">
        <div className="container">
          <div className="gov-badge-emblem" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)', marginBottom: '0.75rem' }}>
            <ShieldCheck size={14} />
            <span>PROTOTYPE RECORD VALIDATOR</span>
          </div>
          <h1>Digital Land Record Verification</h1>
          <p>
            Authenticate verification status, validation audit trail, and local coordinates for any AbhilekhSetu record.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        {/* Verification Form */}
        <div className="card" style={{ maxWidth: '650px', margin: '-2rem auto 2.5rem', position: 'relative', zIndex: 10, boxShadow: 'var(--shadow-lg)' }}>
          <form onSubmit={handleVerify} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Digital Record ID"
                name="recordId"
                value={recordId}
                onChange={(e) => setRecordId(e.target.value)}
                placeholder="e.g. RS-2026-001 or RS-2026-002"
                required
                icon={Search}
              />
            </div>
            <div style={{ marginTop: '9px' }}>
              <Button type="submit" variant="primary">
                Verify Record
              </Button>
            </div>
          </form>
        </div>

        {/* Verification Outcome Card */}
        {result ? (
          <div className="card" style={{ maxWidth: '800px', margin: '0 auto', borderTop: '6px solid var(--success)', padding: '2.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--success-light)', color: 'var(--success)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <CheckCircle2 size={36} />
              </div>
              <span className="badge badge-verified" style={{ fontSize: '0.88rem', padding: '0.35rem 0.85rem' }}>
                VERIFIED PROTOTYPE RECORD
              </span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)', marginTop: '0.5rem' }}>
                {result.id} — {result.ownerName}
              </h2>
            </div>

            <div className="doc-details-grid" style={{ marginBottom: '2rem' }}>
              <div className="doc-field">
                <span className="doc-field-label">Owner Name</span>
                <span className="doc-field-val">{result.ownerName}</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Parentage / Relation</span>
                <span className="doc-field-val">{result.relationName}</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Revenue Jurisdiction</span>
                <span className="doc-field-val">{result.village}, Tehsil {result.tehsil}, {result.district} ({result.state})</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Survey / Plot Number</span>
                <span className="doc-field-val">{result.surveyNumber} ({result.plotNumber})</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Area Extent</span>
                <span className="doc-field-val">{result.area}</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Encumbrance Status</span>
                <span className="doc-field-val">{result.encumbrance}</span>
              </div>
            </div>

            <div style={{ background: 'var(--light-bg)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1rem', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: 700, color: 'var(--primary-navy)', marginBottom: '4px' }}>
                Prototype Verification Metadata:
              </div>
              <div>Record Hash / Reference: <strong>{result.digitalSignature}</strong></div>
              <div>Timestamp of Verification: <strong>{new Date().toLocaleString()}</strong></div>
              <div>Scope / Authority: <strong>AbhilekhSetu Local Demo Dataset</strong></div>
            </div>
          </div>
        ) : searched ? (
          <div className="card" style={{ maxWidth: '650px', margin: '0 auto', textAlign: 'center', padding: '3rem 2rem' }}>
            <h2 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Record Not Verified</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              No land record corresponding to identifier <strong>{recordId}</strong> was located in the AbhilekhSetu prototype dataset.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerifyPage;