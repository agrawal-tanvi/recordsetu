import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { statesData } from '../../data/states';
import { 
  FileText, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  MapPin, 
  Briefcase, 
  FileCheck, 
  Trash2, 
  Printer, 
  ArrowRight 
} from 'lucide-react';

export const ApplicationForm = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Location Hierarchy State
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Sitapur');
  const [selectedTehsil, setSelectedTehsil] = useState('Rampur');
  const [selectedVillage, setSelectedVillage] = useState('Khairpur');

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: '',
    fatherHusbandName: '',
    aadhaarNumber: '',
    mobileNumber: '',
    emailAddress: '',
    residentialAddress: '',
    serviceType: 'Mutation / Dakhil-Kharij (नामांतरण)',
    khasraNumber: '',
    khataNumber: '',
    areaSize: '',
    areaUnit: 'Hectares',
    landClassification: 'Agricultural (कृषि भूमि)',
    purposeRemarks: '',
    declarationAccepted: false
  });

  // File Upload State
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedReceipt, setSubmittedReceipt] = useState(null);

  const currentStateObj = statesData.find(s => s.state === selectedState) || statesData[0];
  const currentDistricts = currentStateObj ? currentStateObj.districts : [];
  const currentDistrictObj = currentDistricts.find(d => d.name === selectedDistrict) || currentDistricts[0];
  const currentTehsils = currentDistrictObj ? currentDistrictObj.tehsils : [];
  const currentTehsilObj = currentTehsils.find(t => t.name === selectedTehsil) || currentTehsils[0];
  const currentVillages = currentTehsilObj ? currentTehsilObj.villages : ['Khairpur', 'Rampur', 'Shahpur'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setFormErrors(prev => ({ ...prev, file: 'Only PDF, JPG, or PNG files are supported.' }));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFormErrors(prev => ({ ...prev, file: 'File size exceeds the 10MB limit.' }));
      return;
    }
    setUploadedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type
    });
    setFormErrors(prev => ({ ...prev, file: null }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.mobileNumber.trim() || formData.mobileNumber.length < 10) {
      errors.mobileNumber = 'Valid 10-digit mobile number is required.';
    }
    if (!formData.khasraNumber.trim()) errors.khasraNumber = 'Khasra / Plot Number is required.';
    if (!formData.khataNumber.trim()) errors.khataNumber = 'Khata Number is required.';
    if (!formData.purposeRemarks.trim()) errors.purposeRemarks = 'Purpose of application is required.';
    if (!uploadedFile) errors.file = 'Please upload supporting deed or succession order.';
    if (!formData.declarationAccepted) {
      errors.declaration = 'You must accept the legal declaration before submitting.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 180, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `RS-APP-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      setSubmittedReceipt({
        id: generatedId,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        applicant: formData.fullName,
        service: formData.serviceType,
        plot: `${formData.khasraNumber} (Khata: ${formData.khataNumber})`,
        location: `${selectedVillage}, ${selectedTehsil}, ${selectedDistrict}, ${selectedState}`,
        officer: 'Revenue Inspector / Nayab Tehsildar Desk'
      });
      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }, 1200);
  };

  if (submittedReceipt) {
    return (
      <div className="form-submission-success-wrap">
        <div className="official-ack-slip">
          <div className="ack-header">
            <div className="ack-header-emblem">
              <span className="gov-seal-circle">🏛️</span>
            </div>
            <div className="ack-header-text">
              <h4>भारत सरकार • राजस्व एवं भूमि सुधार विभाग</h4>
              <h3>GOVERNMENT OF INDIA • REVENUE & LAND RECORDS PORTAL</h3>
              <p>ACKNOWLEDGEMENT RECEIPT OF CITIZEN REVENUE APPLICATION</p>
            </div>
          </div>

          <div className="ack-success-banner">
            <CheckCircle2 size={24} className="text-success" />
            <div>
              <strong>Application Submitted Successfully!</strong>
              <p>Your application has been registered with the Tehsil Revenue Desk.</p>
            </div>
          </div>

          <div className="ack-details-grid">
            <div className="ack-field">
              <span className="ack-label">Application Reference ID</span>
              <span className="ack-val-badge">{submittedReceipt.id}</span>
            </div>
            <div className="ack-field">
              <span className="ack-label">Submission Date & Time</span>
              <span className="ack-val">{submittedReceipt.date} at {submittedReceipt.time}</span>
            </div>
            <div className="ack-field">
              <span className="ack-label">Applicant Name</span>
              <span className="ack-val">{submittedReceipt.applicant}</span>
            </div>
            <div className="ack-field">
              <span className="ack-label">Selected Service</span>
              <span className="ack-val">{submittedReceipt.service}</span>
            </div>
            <div className="ack-field">
              <span className="ack-label">Land Plot & Khata</span>
              <span className="ack-val">{submittedReceipt.plot}</span>
            </div>
            <div className="ack-field">
              <span className="ack-label">Revenue Jurisdiction</span>
              <span className="ack-val">{submittedReceipt.location}</span>
            </div>
            <div className="ack-field">
              <span className="ack-label">Assigned Desk</span>
              <span className="ack-val">{submittedReceipt.officer}</span>
            </div>
            <div className="ack-field">
              <span className="ack-label">Expected Processing Time</span>
              <span className="ack-val">15 Working Days (RTS Act)</span>
            </div>
          </div>

          <div className="ack-instructions-box">
            <h6>Important Citizen Instructions:</h6>
            <ul>
              <li>Keep this Application ID handy to track progress under the <strong>Applications</strong> tab.</li>
              <li>An automated SMS confirmation has been triggered to <strong>{formData.mobileNumber}</strong>.</li>
              <li>No physical visit to Tehsil is required unless notified by the Revenue Inspector.</li>
            </ul>
          </div>

          <div className="ack-actions-bar">
            <button type="button" className="btn btn-outline" onClick={() => window.print()}>
              <Printer size={16} /> Print Acknowledgement
            </button>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/citizen/dashboard')}>
              Go to Citizen Dashboard <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="application-form-container">
      <div className="form-portal-header-card">
        <div className="header-seal-block">
          <div className="gold-seal-badge">
            <span>सत्यमेव जयते</span>
          </div>
          <div>
            <span className="badge-form-type">FORM 1-A • REVENUE MUTATION & ROR</span>
            <h2 className="form-page-main-heading">{t('appFormTitle')}</h2>
            <p className="form-page-subtext">{t('appFormSubtitle')}</p>
          </div>
        </div>
        <div className="form-sla-note">
          <span className="sla-pill">⏳ SLA: 15 Days</span>
          <span className="fee-pill">Free Citizen Service</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="gov-formal-application" noValidate>
        {/* SECTION 1: APPLICANT DETAILS */}
        <section className="form-section-card">
          <div className="section-title-bar">
            <User size={18} className="sec-icon" />
            <h3 className="section-heading-text">{t('secApplicantDetails')}</h3>
          </div>

          <div className="form-grid-2col">
            <div className="form-input-group">
              <label htmlFor="fullName" className="gov-input-label">
                {t('fullName')} <span className="req-star">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className={`gov-text-input ${formErrors.fullName ? 'has-error' : ''}`}
                placeholder="e.g. Ramesh Kumar Verma"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
              {formErrors.fullName && <span className="error-hint">{formErrors.fullName}</span>}
            </div>

            <div className="form-input-group">
              <label htmlFor="fatherHusbandName" className="gov-input-label">
                Father's / Husband's Name <span className="req-star">*</span>
              </label>
              <input
                type="text"
                id="fatherHusbandName"
                name="fatherHusbandName"
                className="gov-text-input"
                placeholder="e.g. Late Shri Ramprasad Verma"
                value={formData.fatherHusbandName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="aadhaarNumber" className="gov-input-label">
                {t('aadhaarNumber')}
              </label>
              <input
                type="text"
                id="aadhaarNumber"
                name="aadhaarNumber"
                maxLength={12}
                className="gov-text-input"
                placeholder="XXXX-XXXX-9842"
                value={formData.aadhaarNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-input-group">
              <label htmlFor="mobileNumber" className="gov-input-label">
                {t('mobileNumber')} <span className="req-star">*</span>
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                maxLength={10}
                className={`gov-text-input ${formErrors.mobileNumber ? 'has-error' : ''}`}
                placeholder="e.g. 9876543210"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
              {formErrors.mobileNumber && <span className="error-hint">{formErrors.mobileNumber}</span>}
            </div>

            <div className="form-input-group">
              <label htmlFor="emailAddress" className="gov-input-label">
                {t('emailAddress')}
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                className="gov-text-input"
                placeholder="e.g. ramesh.verma@example.com"
                value={formData.emailAddress}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-input-group full-width-col">
              <label htmlFor="residentialAddress" className="gov-input-label">
                {t('residentialAddress')}
              </label>
              <input
                type="text"
                id="residentialAddress"
                name="residentialAddress"
                className="gov-text-input"
                placeholder="House No., Street, Post Office, Pin Code"
                value={formData.residentialAddress}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: LAND & PROPERTY LOCATION */}
        <section className="form-section-card">
          <div className="section-title-bar">
            <MapPin size={18} className="sec-icon" />
            <h3 className="section-heading-text">{t('secPropertyDetails')}</h3>
          </div>

          <div className="form-grid-2col">
            <div className="form-input-group">
              <label htmlFor="selectedState" className="gov-input-label">
                {t('stateLabel')} <span className="req-star">*</span>
              </label>
              <select
                id="selectedState"
                className="gov-select-input"
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  const st = statesData.find(s => s.state === e.target.value);
                  if (st && st.districts.length > 0) setSelectedDistrict(st.districts[0].name);
                }}
              >
                {statesData.map(st => (
                  <option key={st.state} value={st.state}>{st.state}</option>
                ))}
              </select>
            </div>

            <div className="form-input-group">
              <label htmlFor="selectedDistrict" className="gov-input-label">
                {t('districtLabel')} <span className="req-star">*</span>
              </label>
              <select
                id="selectedDistrict"
                className="gov-select-input"
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  const dist = currentDistricts.find(d => d.name === e.target.value);
                  if (dist && dist.tehsils.length > 0) setSelectedTehsil(dist.tehsils[0].name);
                }}
              >
                {currentDistricts.map(dist => (
                  <option key={dist.name} value={dist.name}>{dist.name}</option>
                ))}
              </select>
            </div>

            <div className="form-input-group">
              <label htmlFor="selectedTehsil" className="gov-input-label">
                {t('tehsilLabel')} <span className="req-star">*</span>
              </label>
              <select
                id="selectedTehsil"
                className="gov-select-input"
                value={selectedTehsil}
                onChange={(e) => setSelectedTehsil(e.target.value)}
              >
                {currentTehsils.map(teh => (
                  <option key={teh.name} value={teh.name}>{teh.name}</option>
                ))}
              </select>
            </div>

            <div className="form-input-group">
              <label htmlFor="selectedVillage" className="gov-input-label">
                {t('villageLabel')} <span className="req-star">*</span>
              </label>
              <select
                id="selectedVillage"
                className="gov-select-input"
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
              >
                {currentVillages.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div className="form-input-group">
              <label htmlFor="khasraNumber" className="gov-input-label">
                {t('khasraNo')} <span className="req-star">*</span>
              </label>
              <input
                type="text"
                id="khasraNumber"
                name="khasraNumber"
                className={`gov-text-input ${formErrors.khasraNumber ? 'has-error' : ''}`}
                placeholder="e.g. 124/2 or 45/1"
                value={formData.khasraNumber}
                onChange={handleInputChange}
                required
              />
              {formErrors.khasraNumber && <span className="error-hint">{formErrors.khasraNumber}</span>}
            </div>

            <div className="form-input-group">
              <label htmlFor="khataNumber" className="gov-input-label">
                {t('khataNo')} <span className="req-star">*</span>
              </label>
              <input
                type="text"
                id="khataNumber"
                name="khataNumber"
                className={`gov-text-input ${formErrors.khataNumber ? 'has-error' : ''}`}
                placeholder="e.g. 00342"
                value={formData.khataNumber}
                onChange={handleInputChange}
                required
              />
              {formErrors.khataNumber && <span className="error-hint">{formErrors.khataNumber}</span>}
            </div>

            <div className="form-input-group">
              <label htmlFor="areaSize" className="gov-input-label">
                {t('areaSize')}
              </label>
              <div className="input-with-select">
                <input
                  type="text"
                  id="areaSize"
                  name="areaSize"
                  className="gov-text-input"
                  placeholder="e.g. 1.25"
                  value={formData.areaSize}
                  onChange={handleInputChange}
                />
                <select
                  name="areaUnit"
                  value={formData.areaUnit}
                  onChange={handleInputChange}
                  className="gov-unit-select"
                >
                  <option value="Hectares">Hectares</option>
                  <option value="Acres">Acres</option>
                  <option value="Bigha">Bigha</option>
                </select>
              </div>
            </div>

            <div className="form-input-group">
              <label htmlFor="landClassification" className="gov-input-label">
                Land Classification (भूमि की श्रेणी)
              </label>
              <select
                id="landClassification"
                name="landClassification"
                className="gov-select-input"
                value={formData.landClassification}
                onChange={handleInputChange}
              >
                <option value="Agricultural (कृषि भूमि)">Agricultural (कृषि भूमि)</option>
                <option value="Residential (आवासीय)">Residential (आवासीय)</option>
                <option value="Commercial (व्यावसायिक)">Commercial (व्यावसायिक)</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICE DETAILS & PURPOSE */}
        <section className="form-section-card">
          <div className="section-title-bar">
            <Briefcase size={18} className="sec-icon" />
            <h3 className="section-heading-text">{t('secServiceDetails')}</h3>
          </div>

          <div className="form-grid-2col">
            <div className="form-input-group full-width-col">
              <label htmlFor="serviceType" className="gov-input-label">
                {t('serviceType')} <span className="req-star">*</span>
              </label>
              <select
                id="serviceType"
                name="serviceType"
                className="gov-select-input"
                value={formData.serviceType}
                onChange={handleInputChange}
              >
                <option value="Mutation / Dakhil-Kharij (नामांतरण)">Mutation / Dakhil-Kharij (नामांतरण - Sale / Succession / Gift)</option>
                <option value="Certified RoR Copy (प्रमाणित खतौनी नकल)">Certified Record of Rights (RoR / Khatauni नकल)</option>
                <option value="Boundary Demarcation (सीमांकन / पैमाइश)">Boundary Demarcation & Map Verification (सीमांकन / पैमाइश)</option>
                <option value="Land Use Conversion (कृषि से गैर-कृषि परिवर्तन)">Land Use Conversion / 143 Order (भू-उपयोग परिवर्तन)</option>
              </select>
            </div>

            <div className="form-input-group full-width-col">
              <label htmlFor="purposeRemarks" className="gov-input-label">
                {t('purposeRemarks')} <span className="req-star">*</span>
              </label>
              <textarea
                id="purposeRemarks"
                name="purposeRemarks"
                rows={4}
                className={`gov-textarea-input ${formErrors.purposeRemarks ? 'has-error' : ''}`}
                placeholder="Provide details regarding the reason for mutation, sale deed number, or certified copy request..."
                value={formData.purposeRemarks}
                onChange={handleInputChange}
                required
              ></textarea>
              {formErrors.purposeRemarks && (
                <span className="error-hint">{formErrors.purposeRemarks}</span>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 4: DOCUMENT ATTACHMENTS */}
        <section className="form-section-card">
          <div className="section-title-bar">
            <FileCheck size={18} className="sec-icon" />
            <h3 className="section-heading-text">{t('secDocumentUpload')}</h3>
          </div>

          <div className="upload-dropzone-wrapper">
            <div
              className={`gov-upload-dropzone ${dragActive ? 'drag-active' : ''} ${uploadedFile ? 'has-file' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!uploadedFile ? (
                <div className="dropzone-empty-state">
                  <div className="dropzone-icon-circle">
                    <Upload size={32} />
                  </div>
                  <h4 className="dropzone-main-title">{t('uploadDocTitle')}</h4>
                  <p className="dropzone-sub-hint">{t('uploadDocHint')}</p>
                  <label className="btn-browse-file">
                    <span>Browse File from Device</span>
                    <input
                      type="file"
                      className="hidden-file-input"
                      onChange={handleFileInput}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                  <div className="accepted-formats-badges">
                    <span className="format-badge">PDF (recommended)</span>
                    <span className="format-badge">JPG / JPEG</span>
                    <span className="format-badge">PNG</span>
                    <span className="format-badge">Max 10 MB</span>
                  </div>
                </div>
              ) : (
                <div className="uploaded-file-card">
                  <div className="file-info-left">
                    <FileText size={36} className="text-primary-blue" />
                    <div>
                      <h5 className="file-title-text">{uploadedFile.name}</h5>
                      <span className="file-meta-text">{uploadedFile.size} • Ready for verification</span>
                    </div>
                  </div>
                  <div className="file-card-actions">
                    <span className="file-ready-tag">
                      <CheckCircle2 size={16} /> Attached
                    </span>
                    <button
                      type="button"
                      className="btn-remove-file"
                      onClick={() => setUploadedFile(null)}
                      title="Remove file"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
            {formErrors.file && <span className="error-hint mt-2">{formErrors.file}</span>}
          </div>
        </section>

        {/* SECTION 5: LEGAL DECLARATION & SUBMISSION */}
        <div className="form-submission-footer-card">
          <label className="gov-checkbox-row">
            <input
              type="checkbox"
              name="declarationAccepted"
              checked={formData.declarationAccepted}
              onChange={handleInputChange}
            />
            <span className="checkbox-legal-text">
              I hereby solemnly declare that all particulars furnished above and attachments provided are true, correct, and authentic. I understand that submitting false declarations or forged documents is punishable under the Indian Penal Code and the Information Technology Act, 2000.
            </span>
          </label>
          {formErrors.declaration && (
            <span className="error-hint block mt-2">{formErrors.declaration}</span>
          )}

          <div className="form-btn-actions-row">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => {
                setFormData({
                  fullName: '',
                  fatherHusbandName: '',
                  aadhaarNumber: '',
                  mobileNumber: '',
                  emailAddress: '',
                  residentialAddress: '',
                  serviceType: 'Mutation / Dakhil-Kharij (नामांतरण)',
                  khasraNumber: '',
                  khataNumber: '',
                  areaSize: '',
                  areaUnit: 'Hectares',
                  landClassification: 'Agricultural (कृषि भूमि)',
                  purposeRemarks: '',
                  declarationAccepted: false
                });
                setUploadedFile(null);
                setFormErrors({});
              }}
            >
              Reset Form
            </button>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="submitting-spinner-row">
                  <span className="btn-spinner"></span>
                  <span>Transmitting to Revenue Authority...</span>
                </span>
              ) : (
                <span>{t('btnSubmitApplication')}</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ApplicationForm;