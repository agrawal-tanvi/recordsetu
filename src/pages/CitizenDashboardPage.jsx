import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './CitizenDashboardPage.css';
import { 
  FileText, 
  Map, 
  Clock, 
  ShieldCheck, 
  Download, 
  ArrowUpRight, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  Building,
  User
} from 'lucide-react';

export const CitizenDashboardPage = () => {
  const { user } = useAuth();
  const userName = user ? user.name : 'Rajesh Kumar Verma';

  return (
    <div className="citizen-dashboard-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div className="dash-greeting-block">
            <div className="user-avatar-pill">
              <User size={24} />
            </div>
            <div>
              <h1 className="page-title">नमस्ते, {userName}</h1>
              <p className="page-subtitle">Aadhaar Linked: <strong>XXXX-XXXX-9842</strong> • Primary Residence: Lucknow, UP</p>
            </div>
          </div>
          <div className="header-actions">
            <Link to="/applications/new" className="btn btn-primary">
              <PlusCircle size={15} /> New Revenue Application
            </Link>
          </div>
        </div>
      </div>

      <div className="container page-body-container">
        {/* 4 Dashboard Metric Cards */}
        <div className="dash-stats-grid">
          <div className="dash-stat-card">
            <div className="stat-card-icon icon-blue"><FileText size={20} /></div>
            <div className="stat-card-body">
              <span className="stat-label">Land Holdings</span>
              <h3 className="stat-val">2 Parcels</h3>
              <span className="stat-sub">Total 2.65 Hectares</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-card-icon icon-green"><ShieldCheck size={20} /></div>
            <div className="stat-card-body">
              <span className="stat-label">Verified Certificates</span>
              <h3 className="stat-val">3 RoR Copies</h3>
              <span className="stat-sub">Digitally Signed & Valid</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-card-icon icon-amber"><Clock size={20} /></div>
            <div className="stat-card-body">
              <span className="stat-label">Active Applications</span>
              <h3 className="stat-val">1 In-Progress</h3>
              <span className="stat-sub">SLA: 12 Days Remaining</span>
            </div>
          </div>

          <div className="dash-stat-card">
            <div className="stat-card-icon icon-teal"><Building size={20} /></div>
            <div className="stat-card-body">
              <span className="stat-label">Revenue Circle</span>
              <h3 className="stat-val">Lucknow Sadar</h3>
              <span className="stat-sub">Tehsil Jurisdiction</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout: Land Holdings & Recent Applications */}
        <div className="dash-content-grid">
          {/* Left Column: Registered Land Parcels */}
          <div className="dash-column-card">
            <div className="dash-card-header">
              <h3>My Registered Land Holdings (मेरी भू-संपत्ति)</h3>
              <Link to="/maps" className="btn-header-link">View in Bhu-Naksha</Link>
            </div>

            <div className="land-holdings-list">
              {/* Parcel 1 */}
              <div className="land-holding-card">
                <div className="holding-top-row">
                  <div>
                    <span className="holding-khasra-badge">Khasra No. 45/2</span>
                    <h4 className="holding-location-name">Mauza Gomti Nagar, Lucknow Sadar</h4>
                  </div>
                  <span className="badge-status-verified">✓ Verified</span>
                </div>
                <div className="holding-meta-grid">
                  <div><span>Area:</span> <strong>1.4500 Ha (3.58 Acres)</strong></div>
                  <div><span>ULPIN:</span> <code>UP-LKO-452-98124</code></div>
                  <div><span>Khata:</span> <strong>00142</strong></div>
                  <div><span>Classification:</span> Agricultural</div>
                </div>
                <div className="holding-actions-bar">
                  <Link to="/land-records/1" className="btn btn-outline btn-sm">
                    <FileText size={13} /> View RoR 7/12
                  </Link>
                  <Link to="/maps" className="btn btn-outline btn-sm">
                    <Map size={13} /> Inspect on Map
                  </Link>
                </div>
              </div>

              {/* Parcel 2 */}
              <div className="land-holding-card">
                <div className="holding-top-row">
                  <div>
                    <span className="holding-khasra-badge">Khasra No. 124/2</span>
                    <h4 className="holding-location-name">Mauza Khairpur, Tehsil Rampur, Sitapur</h4>
                  </div>
                  <span className="badge-status-verified">✓ Verified</span>
                </div>
                <div className="holding-meta-grid">
                  <div><span>Area:</span> <strong>1.2000 Ha (2.96 Acres)</strong></div>
                  <div><span>ULPIN:</span> <code>UP-STP-124-33910</code></div>
                  <div><span>Khata:</span> <strong>00318</strong></div>
                  <div><span>Classification:</span> Agricultural</div>
                </div>
                <div className="holding-actions-bar">
                  <Link to="/land-records/2" className="btn btn-outline btn-sm">
                    <FileText size={13} /> View RoR 7/12
                  </Link>
                  <Link to="/maps" className="btn btn-outline btn-sm">
                    <Map size={13} /> Inspect on Map
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Applications & Quick Shortcuts */}
          <div className="dash-column-card">
            <div className="dash-card-header">
              <h3>Recent Applications (आवेदन स्थिति)</h3>
              <Link to="/applications" className="btn-header-link">View All</Link>
            </div>

            <div className="applications-timeline-list">
              <div className="app-timeline-item">
                <div className="timeline-marker marker-amber"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="app-id-tag">RS-APP-2026-8941</span>
                    <span className="status-badge-progress">Under Field Verification</span>
                  </div>
                  <h5 className="app-title-text">Mutation Request (Khasra 45/2)</h5>
                  <p className="app-meta-text">Filed on 28 Aug 2026 • Revenue Inspector Desk</p>
                </div>
              </div>

              <div className="app-timeline-item">
                <div className="timeline-marker marker-green"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="app-id-tag">RS-APP-2026-4412</span>
                    <span className="status-badge-approved">Approved & Dispatched</span>
                  </div>
                  <h5 className="app-title-text">Certified Copy of Khatauni RoR</h5>
                  <p className="app-meta-text">Completed on 14 Jan 2026 • Digitally Signed</p>
                </div>
              </div>
            </div>

            <div className="quick-utilities-box">
              <h4>Citizen Revenue Services</h4>
              <div className="utility-buttons-grid">
                <Link to="/applications/new" className="util-btn">
                  <PlusCircle size={16} /> Apply for Mutation
                </Link>
                <Link to="/upload" className="util-btn">
                  <FileText size={16} /> AI OCR Digitization
                </Link>
                <Link to="/verify" className="util-btn">
                  <ShieldCheck size={16} /> Verify Digital Stamp
                </Link>
                <Link to="/grievance" className="util-btn">
                  <AlertCircle size={16} /> Lodge Revenue Grievance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboardPage;