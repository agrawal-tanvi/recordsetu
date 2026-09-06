import React from 'react';
import './DocumentPreview.css';
import { AshokaEmblem } from '../assets/visuals';
import { Printer, Download, CheckCircle, ShieldCheck, QrCode } from 'lucide-react';

export const DocumentPreview = ({
  record = {
    id: 'RS-UP-LKO-2026-001',
    documentType: 'Record of Rights (खतौनी / RoR 7/12)',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    tehsil: 'Lucknow Sadar',
    village: 'Gomti Nagar',
    khasraNo: '45/2',
    khataNo: '00142',
    ulpin: 'UP-LKO-001-4528',
    ownerName: 'Rajesh Kumar Verma',
    fatherName: 'Late Ramprasad Verma',
    areaHectares: '1.4500 Hectares (3.58 Acres)',
    landClassification: 'Agricultural (फसली भूमि)',
    revenueRate: '₹ 145.00 / annum',
    mortgageStatus: 'Unencumbered (भारमुक्त)',
    mutationDate: '14 Jan 2024 (Order No. 892/SDM)',
    issuingAuthority: 'Office of Sub-Divisional Magistrate & Tehsildar, Lucknow Sadar',
    digitalSignDate: '06 Sep 2026, 11:42:18 IST',
    sha256Hash: '9a8f4c2e1b7d5e6a8f3b2c1d9e4a7b5f6c8d1e2f3a4b5c6d7e8f9a0b1c2d3e4f'
  },
  onPrint,
  onDownload
}) => {
  return (
    <div className="official-cert-container">
      {/* Action Toolbar */}
      <div className="cert-action-toolbar">
        <div className="cert-status-pill">
          <ShieldCheck size={16} className="text-success" />
          <span>Digitally Signed Under IT Act 2000</span>
        </div>
        <div className="cert-btn-group">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onPrint || (() => window.print())}
          >
            <Printer size={14} /> Print RoR
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onDownload || (() => alert('Downloading official certified RoR PDF...'))}
          >
            <Download size={14} /> Download PDF
          </button>
        </div>
      </div>

      {/* Official Government RoR Sheet */}
      <div className="official-cert-paper">
        {/* Subtle Security Watermark */}
        <div className="cert-watermark-overlay">
          <span>GOVT OF INDIA • DILRMP • RECORDSETU</span>
        </div>

        {/* Certificate Header with Emblem */}
        <div className="cert-header-block">
          <div className="cert-emblem-wrap">
            <AshokaEmblem width={42} height={60} />
          </div>
          <div className="cert-header-text">
            <h3>भारत सरकार • REVENUE DEPARTMENT • GOVERNMENT OF INDIA</h3>
            <h4>कार्यालय तहसीलदार, तहसील: {record.tehsil}, जिला: {record.district} ({record.state})</h4>
            <h2 className="cert-title-badge">प्रमाणित अधिकार अभिलेख (खतौनी नकल / ROR 7/12)</h2>
            <p className="cert-subtitle-law">Issued under Section 31 of Revenue Code & Section 4 of IT Act 2000</p>
          </div>
          <div className="cert-qr-wrap">
            <div className="cert-qr-box">
              <QrCode size={56} />
              <span className="qr-scan-label">Scan to Verify</span>
            </div>
          </div>
        </div>

        {/* ULPIN & Record Metadata Bar */}
        <div className="cert-meta-strip">
          <div className="meta-cell">
            <span className="meta-lbl">Unique Land Parcel ID (Bhu-Aadhaar / ULPIN):</span>
            <strong className="meta-val highlight-ulpin">{record.ulpin}</strong>
          </div>
          <div className="meta-cell">
            <span className="meta-lbl">Portal Record ID:</span>
            <strong className="meta-val">{record.id}</strong>
          </div>
          <div className="meta-cell">
            <span className="meta-lbl">Date of Issue:</span>
            <strong className="meta-val">{record.digitalSignDate}</strong>
          </div>
        </div>

        {/* Location & Jurisdiction Grid */}
        <div className="cert-section-title">1. क्षेत्र एवं अधिकार क्षेत्र विवरण (Jurisdiction & Location)</div>
        <table className="cert-table">
          <tbody>
            <tr>
              <th>State (राज्य):</th>
              <td>{record.state}</td>
              <th>District (जनपद):</th>
              <td>{record.district}</td>
            </tr>
            <tr>
              <th>Tehsil / Taluk (तहसील):</th>
              <td>{record.tehsil}</td>
              <th>Village / Mauza (ग्राम / मौजा):</th>
              <td>{record.village}</td>
            </tr>
          </tbody>
        </table>

        {/* Ownership & Parcel Details */}
        <div className="cert-section-title">2. खातेदार एवं भूखंड विवरण (Landholder & Parcel Details)</div>
        <table className="cert-table">
          <thead>
            <tr>
              <th>Khata No.</th>
              <th>Khasra / Plot No.</th>
              <th>Khatedar / Owner Name</th>
              <th>Father / Husband Name</th>
              <th>Total Area</th>
              <th>Classification</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>{record.khataNo}</strong></td>
              <td><strong className="text-primary-navy">{record.khasraNo}</strong></td>
              <td><strong>{record.ownerName}</strong></td>
              <td>{record.fatherName}</td>
              <td><strong>{record.areaHectares}</strong></td>
              <td>{record.landClassification}</td>
            </tr>
          </tbody>
        </table>

        {/* Encumbrances & Remarks */}
        <div className="cert-section-title">3. भार एवं आदेश विवरण (Encumbrance & Revenue Orders)</div>
        <table className="cert-table">
          <tbody>
            <tr>
              <th>Encumbrance / Mortgage:</th>
              <td colSpan="3">
                <span className="badge-unencumbered">
                  <CheckCircle size={13} /> {record.mortgageStatus}
                </span>
              </td>
            </tr>
            <tr>
              <th>Latest Mutation / Dakhil Kharij:</th>
              <td colSpan="3">{record.mutationDate}</td>
            </tr>
            <tr>
              <th>Annual Land Revenue / Lagaan:</th>
              <td colSpan="3">{record.revenueRate}</td>
            </tr>
          </tbody>
        </table>

        {/* Digital Signature & Verification Seal Footer */}
        <div className="cert-security-footer">
          <div className="cert-hash-block">
            <span className="hash-label">Cryptographic SHA-256 Checksum:</span>
            <code className="hash-code">{record.sha256Hash}</code>
            <p className="hash-note">
              This is a computer-generated, tamper-proof digital record fetched from the central Bhulekh database.
              Physical signature is not required under the Information Technology Act 2000.
            </p>
          </div>

          <div className="cert-stamp-block">
            <div className="digital-stamp-circle">
              <span className="stamp-dept">REVENUE DEPT</span>
              <span className="stamp-verified">DIGITALLY SIGNED</span>
              <span className="stamp-officer">SUB-REGISTRAR</span>
            </div>
            <span className="sign-timestamp">{record.digitalSignDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
