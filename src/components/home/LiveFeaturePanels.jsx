import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Map, 
  FileText, 
  Download, 
  CheckSquare, 
  ShieldCheck, 
  Check, 
  RefreshCw, 
  X, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  ArrowRight 
} from 'lucide-react';
import { CadastralSatelliteMap } from '../../assets/visuals';

const LiveFeaturePanels = () => {
  return (
    <div className="container live-panels-wrapper">
      <div className="four-panel-grid">
        
        {/* PANEL 1: Citizen Dashboard Live Preview */}
        <div className="live-preview-panel">
          <div className="panel-header-bar navy-bar">
            <span>नागरिक डैशबोर्ड | Citizen Dashboard</span>
            <Link to="/citizen/dashboard" className="view-all-link">View All</Link>
          </div>
          <div className="panel-inner-content">
            <div className="citizen-welcome-row">
              <div className="welcome-avatar-icon">
                <ShieldCheck size={24} style={{ color: '#2E7D5B' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#163A63', fontSize: '0.95rem' }}>
                  नमस्ते, स्वागत है
                </div>
                <div style={{ color: '#64748B', fontSize: '0.8rem' }}>
                  Welcome, Citizen
                </div>
              </div>
            </div>

            {/* 6 Action Tiles */}
            <div className="citizen-action-tiles-grid">
              <Link to="/land-records/search" className="action-tile">
                <Search size={18} style={{ color: '#245A94' }} />
                <span>भूमि अभिलेख खोजें<br/><small>Search Record</small></span>
              </Link>
              <Link to="/maps" className="action-tile">
                <Map size={18} style={{ color: '#2E7D5B' }} />
                <span>भू-नक्शा देखें<br/><small>View Map</small></span>
              </Link>
              <Link to="/land-records/RS-2026-001" className="action-tile">
                <FileText size={18} style={{ color: '#D97706' }} />
                <span>खतौनी देखें<br/><small>View Khatauni</small></span>
              </Link>
              <Link to="/applications/new" className="action-tile">
                <Download size={18} style={{ color: '#2563EB' }} />
                <span>दस्तावेज़ डाउनलोड<br/><small>Download Docs</small></span>
              </Link>
              <Link to="/citizen/track" className="action-tile">
                <CheckSquare size={18} style={{ color: '#7C3AED' }} />
                <span>मेरे आवेदन<br/><small>Track Application</small></span>
              </Link>
              <Link to="/verify" className="action-tile">
                <ShieldCheck size={18} style={{ color: '#059669' }} />
                <span>दस्तावेज़ सत्यापित<br/><small>Verify Document</small></span>
              </Link>
            </div>
          </div>
        </div>

        {/* PANEL 2: Government Official Dashboard Live Preview */}
        <div className="live-preview-panel">
          <div className="panel-header-bar dark-teal-bar">
            <span>अधिकारी डैशबोर्ड | Government Official Dashboard</span>
            <Link to="/official/dashboard" className="view-all-link">View All</Link>
          </div>
          <div className="panel-inner-content">
            <div className="official-welcome-row">
              <div className="welcome-avatar-icon official-avatar">
                <ShieldCheck size={24} style={{ color: '#245A94' }} />
              </div>
              <div>
                <div style={{ fontWeight: 700, color: '#163A63', fontSize: '0.95rem' }}>
                  नमस्ते, अमित कुमार जी
                </div>
                <div style={{ color: '#64748B', fontSize: '0.8rem' }}>
                  Revenue Officer, Sitapur
                </div>
              </div>
            </div>

            {/* 4 Stats counters */}
            <div className="official-stats-strip">
              <div className="stat-pill-box">
                <div className="stat-pill-val">1,248</div>
                <div className="stat-pill-lbl">दस्तावेज़ प्राप्त<br/><small>Docs Received</small></div>
              </div>
              <div className="stat-pill-box">
                <div className="stat-pill-val" style={{ color: '#2563EB' }}>1,102</div>
                <div className="stat-pill-lbl">AI प्रसंस्कृत<br/><small>AI Processed</small></div>
              </div>
              <div className="stat-pill-box">
                <div className="stat-pill-val" style={{ color: '#2E7D5B' }}>934</div>
                <div className="stat-pill-lbl">सत्यापित<br/><small>Verified</small></div>
              </div>
              <div className="stat-pill-box">
                <div className="stat-pill-val" style={{ color: '#DC2626' }}>168</div>
                <div className="stat-pill-lbl">समीक्षा हेतु<br/><small>Requires Review</small></div>
              </div>
            </div>

            {/* Pipeline progress steps */}
            <div className="official-pipeline-steps">
              <div className="pipe-step done"><span>दस्तावेज़ अपलोड</span></div>
              <div className="pipe-step done"><span>OCR/HTR</span></div>
              <div className="pipe-step done"><span>AI निष्कर्षण</span></div>
              <div className="pipe-step done"><span>सत्यापन</span></div>
              <div className="pipe-step active"><span>मानव समीक्षा</span></div>
              <div className="pipe-step pending"><span>अंतिम रिकॉर्ड</span></div>
            </div>
          </div>
        </div>

        {/* PANEL 3: AI Verification Live Preview */}
        <div className="live-preview-panel">
          <div className="panel-header-bar blue-bar">
            <span>AI सत्यापन | AI Verification</span>
            <Link to="/verify" className="view-all-link">View All</Link>
          </div>
          <div className="panel-inner-content">
            <div className="ai-scrutiny-two-col">
              {/* Document with bounding boxes */}
              <div className="ai-doc-bounding-box-view">
                <div className="sample-urdu-doc">
                  <div className="ocr-bbox red-box" style={{ top: '15%', left: '20%', width: '60%', height: '14%' }}>
                    <span className="bbox-tag">Name</span>
                  </div>
                  <div className="ocr-bbox blue-box" style={{ top: '35%', left: '15%', width: '40%', height: '12%' }}>
                    <span className="bbox-tag">124/2</span>
                  </div>
                  <div className="ocr-bbox green-box" style={{ top: '55%', left: '25%', width: '50%', height: '14%' }}>
                    <span className="bbox-tag">1.25 Ha</span>
                  </div>
                </div>
              </div>

              {/* Extracted Information Table */}
              <div className="ai-extracted-table">
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#163A63', marginBottom: '6px' }}>
                  निकाले गए विवरण | Extracted Information
                </div>
                <table className="mini-ai-table">
                  <tbody>
                    <tr><td>Owner Name</td><td>राम कुमार</td><td><span className="conf-chip conf-high">98%</span></td></tr>
                    <tr><td>Khasra No.</td><td>124/2</td><td><span className="conf-chip conf-high">99%</span></td></tr>
                    <tr><td>Village</td><td>खैरपुर</td><td><span className="conf-chip conf-high">97%</span></td></tr>
                    <tr><td>Tehsil</td><td>रामपुर</td><td><span className="conf-chip conf-high">96%</span></td></tr>
                    <tr><td>District</td><td>सीतापुर</td><td><span className="conf-chip conf-high">95%</span></td></tr>
                    <tr><td>Area</td><td>1.25 Hectare</td><td><span className="conf-chip conf-mid">91%</span></td></tr>
                    <tr><td>Land Type</td><td>कृषि भूमि</td><td><span className="conf-chip conf-high">96%</span></td></tr>
                  </tbody>
                </table>

                <div className="ai-action-buttons-strip">
                  <button type="button" className="btn-ocr-approve"><Check size={13} /> Approve</button>
                  <button type="button" className="btn-ocr-review"><RefreshCw size={13} /> Review</button>
                  <button type="button" className="btn-ocr-reject"><X size={13} /> Reject</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 4: Bhu-Naksha GIS Live Preview */}
        <div className="live-preview-panel">
          <div className="panel-header-bar teal-bar">
            <span>भू-नक्शा | Bhu-Naksha</span>
            <Link to="/maps" className="view-all-link">View Full</Link>
          </div>
          <div className="panel-inner-content">
            <div className="naksha-two-col-layout">
              <div className="naksha-canvas-box">
                <CadastralSatelliteMap />
              </div>
              <div className="naksha-details-sidebar">
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#163A63', marginBottom: '6px' }}>
                  खसरा विवरण | Parcel Details
                </div>
                <div className="mini-parcel-info">
                  <div><span>Khasra No.:</span> <strong>124/2</strong></div>
                  <div><span>Owner Name:</span> <strong>Ram Kumar</strong></div>
                  <div><span>Village:</span> <strong>Khairpur</strong></div>
                  <div><span>Tehsil:</span> <strong>Rampur</strong></div>
                  <div><span>District:</span> <strong>Sitapur</strong></div>
                  <div><span>Area:</span> <strong>1.25 Hectare</strong></div>
                  <div><span>Land Type:</span> <strong>Agricultural</strong></div>
                  <div><span>Status:</span> <strong style={{ color: '#2E7D5B' }}>Verified</strong></div>
                </div>

                <div className="naksha-buttons-strip">
                  <Link to="/land-records/RS-2026-001" className="btn-naksha-action">View Khatauni</Link>
                  <button type="button" className="btn-naksha-outline" onClick={() => alert('Downloading official geo-referenced parcel map...')}>Download Map</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveFeaturePanels;