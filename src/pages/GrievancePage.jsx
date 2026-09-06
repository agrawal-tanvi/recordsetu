import React, { useState } from 'react';
import './GrievancePage.css';
import { useLanguage } from '../context/LanguageContext';
import { 
  MessageSquare, 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  FileText, 
  AlertCircle,
  Printer
} from 'lucide-react';

export const GrievancePage = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    category: 'Delay in Mutation / Dakhil-Kharij (दाखिल-खारिज में विलंब)',
    description: '',
    khasraNo: '',
    village: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `RS-GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(newId);
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      fullName: '',
      mobile: '',
      category: 'Delay in Mutation / Dakhil-Kharij (दाखिल-खारिज में विलंब)',
      description: '',
      khasraNo: '',
      village: ''
    });
  };

  return (
    <div className="grievance-page">
      {/* Top Header Bar */}
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>Revenue Grievance Redressal Desk</strong>
            </div>
            <span className="page-sub-badge">राजस्व जनसुनवाई पोर्टल | REVENUE GRIEVANCE REDRESSAL</span>
            <h1 className="page-title">जनसुनवाई व जनसंपर्क निवारण • Public Grievance Redressal</h1>
            <p className="page-subtitle">
              Lodge complaints directly with the Sub-Divisional Magistrate (SDM) or District Revenue Officer regarding mutation delays, clerical discrepancies or survey disputes.
            </p>
          </div>
          <div className="header-actions">
            <span className="badge-sla">⚡ RTS Act Guaranteed: 15-30 Days Resolution</span>
          </div>
        </div>
      </div>

      <div className="container page-body-container">
        <div className="grievance-layout-grid">
          {/* Left Column: Form / Success Card */}
          <div className="grievance-main-col">
            {submitted ? (
              <div className="gov-card grievance-success-card">
                <div className="success-icon-wrap">
                  <CheckCircle size={54} className="text-success" />
                </div>
                <span className="badge-ticket-success">शिकायत सफलतापूर्वक दर्ज • REGISTRATION CONFIRMED</span>
                <h2 className="success-title">Grievance Registered Successfully</h2>
                <div className="ticket-id-box">
                  <span className="ticket-lbl">Grievance Ticket Number</span>
                  <strong className="ticket-val">{ticketId}</strong>
                </div>

                <div className="ticket-summary-grid">
                  <div className="summary-item">
                    <span>Complainant:</span>
                    <strong>{formData.fullName || 'Rajesh Kumar'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Mobile:</span>
                    <strong>+91 {formData.mobile || '9876543210'}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Category:</span>
                    <strong>{formData.category}</strong>
                  </div>
                  <div className="summary-item">
                    <span>Assigned To:</span>
                    <strong>Sub-Divisional Magistrate (SDM) Sadar</strong>
                  </div>
                </div>

                <div className="sla-notice-banner">
                  <Clock size={16} />
                  <span>
                    Under the Right to Public Services (RTS) Act, 2011, your grievance will be investigated and resolved within <strong>15 to 30 working days</strong>. SMS updates will be dispatched to your registered mobile.
                  </span>
                </div>

                <div className="success-action-btns">
                  <button type="button" className="btn btn-outline btn-sm" onClick={() => window.print()}>
                    <Printer size={15} /> Print Acknowledgment Receipt
                  </button>
                  <button type="button" className="btn btn-primary btn-sm" onClick={handleReset}>
                    Lodge Another Grievance
                  </button>
                </div>
              </div>
            ) : (
              <div className="gov-card grievance-form-card">
                <div className="card-top-title-row">
                  <div className="title-icon-badge">
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <h3 className="card-heading">शिकायत दर्ज करें / Register Grievance</h3>
                    <p className="card-subheading">Submit your issue with land records, Tehsil hearings, or boundary demarcation</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="grievance-form">
                  <div className="form-grid-2col">
                    <div className="form-group">
                      <label className="form-label">
                        नागरिक का नाम (Full Name) <span className="req-star">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full name as per Aadhaar"
                        className="gov-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        मोबाइल नंबर (Mobile Number) <span className="req-star">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        pattern="[0-9]{10}"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        className="gov-input"
                      />
                    </div>
                  </div>

                  <div className="form-grid-2col">
                    <div className="form-group">
                      <label className="form-label">
                        खसरा / प्लॉट संख्या (Khasra No.)
                      </label>
                      <input
                        type="text"
                        name="khasraNo"
                        value={formData.khasraNo}
                        onChange={handleChange}
                        placeholder="e.g. 45/2 or 124/2"
                        className="gov-input"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        ग्राम / मौजा (Village / Mauza)
                      </label>
                      <input
                        type="text"
                        name="village"
                        value={formData.village}
                        onChange={handleChange}
                        placeholder="e.g. Gomti Nagar, Khairpur"
                        className="gov-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      शिकायत का प्रकार (Category) <span className="req-star">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="gov-select"
                    >
                      <option>Delay in Mutation / Dakhil-Kharij (दाखिल-खारिज में विलंब)</option>
                      <option>Typographical / Spelling Error in RoR (खतौनी में नाम अशुद्धि)</option>
                      <option>Demarcation / Boundary Dispute (सीमांकन व मेड़ विवाद)</option>
                      <option>Illegal Encroachment on Gram Sabha Land (ग्राम सभा भूमि पर अवैध कब्जा)</option>
                      <option>Survey Inspection / Bhu-Naksha Discrepancy (भू-नक्शा त्रुटि सुधार)</option>
                      <option>Other Revenue Matter (अन्य राजस्व विषय)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      विवरण (Grievance Description) <span className="req-star">*</span>
                    </label>
                    <textarea
                      name="description"
                      rows={5}
                      required
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Provide Khasra number, Tehsil name, previous application number, and complete context of your issue..."
                      className="gov-textarea"
                    ></textarea>
                  </div>

                  <div className="form-actions-row">
                    <button type="submit" className="btn btn-primary btn-lg">
                      <MessageSquare size={16} /> शिकायत दर्ज करें / Submit Grievance
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Helpline & Support Card */}
          <div className="grievance-sidebar-col">
            <div className="gov-card helpline-support-card">
              <div className="helpline-header">
                <div className="help-icon-badge">
                  <Phone size={22} />
                </div>
                <div>
                  <h4 className="helpline-title">राजस्व सहायता केंद्र (Helpline)</h4>
                  <span className="helpline-sub">Citizen Assistance & Grievance Desk</span>
                </div>
              </div>

              <div className="helpline-body">
                <div className="help-detail-row">
                  <Phone size={16} className="text-secondary-blue" />
                  <div>
                    <span className="help-lbl">टोल फ्री नंबर (Toll-Free):</span>
                    <strong className="help-contact-number">1800-11-2026</strong>
                    <span className="help-timing-note">09:00 AM – 06:00 PM (Mon – Sat)</span>
                  </div>
                </div>

                <div className="help-detail-row">
                  <Mail size={16} className="text-secondary-blue" />
                  <div>
                    <span className="help-lbl">आधिकारिक ईमेल (Email):</span>
                    <strong className="help-contact-email">grievance-recordsetu@gov.in</strong>
                  </div>
                </div>

                <div className="help-detail-row">
                  <Clock size={16} className="text-secondary-blue" />
                  <div>
                    <span className="help-lbl">निवारण समय सीमा (SLA):</span>
                    <strong className="text-success">7 से 15 कार्य दिवस (Working Days)</strong>
                  </div>
                </div>
              </div>

              <div className="escalation-matrix-box">
                <h5 className="matrix-title">Escalation Matrix:</h5>
                <ol className="matrix-steps">
                  <li><strong>Level 1:</strong> Tehsildar / Nayab Tehsildar (10 Days)</li>
                  <li><strong>Level 2:</strong> Sub-Divisional Magistrate / SDM (15 Days)</li>
                  <li><strong>Level 3:</strong> District Magistrate / Collector (30 Days)</li>
                </ol>
              </div>

              <div className="digital-seal-tag">
                <ShieldCheck size={14} />
                <span>Secured by NIC e-District Grievance Portal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievancePage;
