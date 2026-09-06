import React, { useState } from 'react';
import './AIVerificationPage.css';
import DocumentPreview from '../components/DocumentPreview';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  FileCheck, 
  Printer, 
  Download,
  Lock,
  QrCode,
  MapPin
} from 'lucide-react';

export const AIVerificationPage = () => {
  const [recordIdQuery, setRecordIdQuery] = useState('RS-2026-001');
  const [searchStatus, setSearchStatus] = useState('found'); // found, not_found, searching

  const sampleRecord = {
    id: 'RS-2026-001',
    ownerName: 'Rajesh Kumar',
    relationName: 'S/O Ram Swaroop Kumar',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    tehsil: 'Mohanlalganj',
    village: 'Khairpur',
    surveyNumber: '45/2',
    plotNumber: 'PL-8812',
    area: '1.45 Hectares (3.58 Acres)',
    landType: 'Agricultural / Irrigated',
    registrationDate: '14 May 2018',
    lastUpdated: '04 Feb 2026',
    status: 'Verified',
    khataNumber: 'KH-9021',
    khasraNumber: '45/2-A',
    marketValue: '₹ 48,50,000',
    encumbrance: 'Nil (Clear Title)',
    mutationNumber: 'MUT-UP-2018-9921',
    coordinates: '26.8524° N, 80.9982° E',
    digitalSignature: 'CERT-IN-NIC-UP-98214B87A'
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const query = recordIdQuery.trim().toUpperCase();
    if (query === 'RS-2026-001' || query === '45/2' || query === 'RAJESH KUMAR') {
      setSearchStatus('found');
    } else {
      setSearchStatus('not_found');
    }
  };

  return (
    <div className="verification-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>Digital Record Verification</strong>
            </div>
            <span className="page-sub-badge">केंद्रीय अभिलेख सत्यापन प्रणाली | RECORDSETU VERIFICATION PORTAL</span>
            <h1 className="page-title">डिजिटल भू-अभिलेख प्रमाणिकता सत्यापन • Official Verification Desk</h1>
            <p className="page-subtitle">
              Authenticate the cryptographic integrity, digital signature and cadastral coordinates of any RecordSetu document under the Information Technology Act, 2000.
            </p>
          </div>
          <div className="header-actions">
            <span className="badge-verified-cert">🔒 Section 65B IT Act Certified Repository</span>
          </div>
        </div>
      </div>

      <div className="container page-body-container">
        {/* Verification Search Bar Card */}
        <div className="gov-card verification-search-card">
          <form onSubmit={handleVerify} className="verify-form-row">
            <div className="verify-input-wrap">
              <label className="form-label">
                डिजिटल रिकॉर्ड पहचान संख्या (Digital Record ID)
              </label>
              <div className="search-input-with-icon">
                <Search size={18} className="search-icon-inside" />
                <input
                  type="text"
                  value={recordIdQuery}
                  onChange={(e) => setRecordIdQuery(e.target.value)}
                  placeholder="e.g. RS-2026-001 or 45/2"
                  className="gov-input verify-text-input"
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg btn-verify-action">
              <ShieldCheck size={17} /> सत्यापित करें / Verify Record
            </button>
          </form>

          <div className="quick-verify-hints">
            <span className="hints-label">Sample Test IDs: </span>
            <button 
              type="button" 
              className="btn-hint" 
              onClick={() => { setRecordIdQuery('RS-2026-001'); setSearchStatus('found'); }}
            >
              RS-2026-001 (Valid RoR)
            </button>
            <button 
              type="button" 
              className="btn-hint" 
              onClick={() => { setRecordIdQuery('INVALID-999'); setSearchStatus('not_found'); }}
            >
              INVALID-999 (Unverified)
            </button>
          </div>
        </div>

        {/* Verification Result Display */}
        {searchStatus === 'found' && (
          <div className="verification-result-stage">
            {/* Green Certificate Verification Banner */}
            <div className="verification-banner-success">
              <div className="banner-left-icon">
                <CheckCircle size={38} className="text-success" />
              </div>
              <div className="banner-details">
                <h3 className="banner-title">
                  ✓ RECORD VERIFIED — वैध व प्रामाणिक डिजिटल अभिलेख
                </h3>
                <p className="banner-sub">
                  Cryptographically authenticated under the Information Technology Act, 2000. Public key issued by National Informatics Centre (NIC) Certifying Authority.
                </p>
                <div className="cert-meta-grid">
                  <div className="meta-card">
                    <span className="meta-label">Digital Record ID:</span>
                    <strong className="meta-value text-primary-navy">RS-2026-001</strong>
                  </div>
                  <div className="meta-card">
                    <span className="meta-label">Document Type:</span>
                    <strong className="meta-value">Certified RoR (Khatauni)</strong>
                  </div>
                  <div className="meta-card">
                    <span className="meta-label">Issued By:</span>
                    <strong className="meta-value">Dept. of Land Resources, GoI</strong>
                  </div>
                  <div className="meta-card">
                    <span className="meta-label">Digital Signature:</span>
                    <strong className="meta-value text-success">✓ VALID (SHA-256)</strong>
                  </div>
                  <div className="meta-card">
                    <span className="meta-label">Record Integrity:</span>
                    <strong className="meta-value text-success">✓ TAMPER-FREE</strong>
                  </div>
                  <div className="meta-card">
                    <span className="meta-label">Geo-Reference:</span>
                    <strong className="meta-value">✓ 26.8524° N, 80.9982° E</strong>
                  </div>
                </div>

                <div className="cert-actions-row">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => window.print()}>
                    <Printer size={14} /> Print Record
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" onClick={() => alert('Downloading Certified Official Copy...')}>
                    <Download size={14} /> Download Certified Copy
                  </button>
                </div>
              </div>
            </div>

            {/* Official Document Preview Component */}
            <DocumentPreview record={sampleRecord} />
          </div>
        )}

        {searchStatus === 'not_found' && (
          <div className="verification-banner-failure">
            <AlertTriangle size={42} className="text-danger" />
            <div>
              <h3>Record Not Found or Tampered</h3>
              <p>
                No active land record was found matching ID: <strong>{recordIdQuery}</strong> in the central DILRMP revenue ledger.
                Please ensure you have entered a valid ULPIN or Certificate number, or verify with your local Tehsil office.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIVerificationPage;
