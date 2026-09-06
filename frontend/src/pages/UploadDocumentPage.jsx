import React, { useState } from 'react';
import './UploadDocumentPage.css';
import { useNavigate } from 'react-router-dom';
import DocumentPreview from '../components/DocumentPreview';
import { LegacyScannedDeedGraphic, AIVerificationFlowGraphic } from '../assets/visuals';
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Check, 
  RefreshCw,
  Eye
} from 'lucide-react';

export const UploadDocumentPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState(0);

  const sampleExtractedRecord = {
    id: "RS-2026-001",
    ownerName: "Rajesh Kumar",
    relationName: "S/O Ram Swaroop Kumar",
    state: "Uttar Pradesh",
    district: "Lucknow",
    tehsil: "Mohanlalganj",
    village: "Khairpur",
    surveyNumber: "45/2",
    plotNumber: "PL-8812",
    area: "1.45 Hectares (3.58 Acres)",
    landType: "Agricultural / Irrigated",
    registrationDate: "14 May 2018",
    lastUpdated: "04 Feb 2026",
    status: "Verified",
    khataNumber: "KH-9021",
    khasraNumber: "45/2-A",
    marketValue: "₹ 48,50,000",
    encumbrance: "Nil (Clear Title)",
    mutationNumber: "MUT-UP-2018-9921",
    coordinates: "26.8524° N, 80.9982° E",
    digitalSignature: "CERT-IN-NIC-UP-98214B87A"
  };

  const steps = [
    'Scanning Document & Enhancing Contrast',
    'AI Text Extraction (OCR for Hindi / Urdu / English)',
    'Identifying Landowner & Khasra / Khata Identifiers',
    'Matching Boundary Metrics Against Tehsil Cadastral Master',
    'Generating Cryptographic Verification Hash'
  ];

  const handleDemoUpload = () => {
    setFile({
      name: 'Mohanlalganj_Khasra_Deed_scanned.pdf',
      size: '2.45 MB',
      type: 'application/pdf'
    });
    startProcessing();
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProgressStep(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgressStep(current);
      if (current >= 5) {
        clearInterval(interval);
        setIsProcessing(false);
      }
    }, 500);
  };

  return (
    <div className="upload-doc-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>Document Scanning & OCR</strong>
            </div>
            <span className="page-sub-badge">दस्तावेज़ प्रक्रमण व एआई निष्कर्षण | DOCUMENT SCANNING & OCR</span>
            <h1 className="page-title">भू-अभिलेख दस्तावेज़ अपलोड व सत्यापन • Document Upload & OCR Desk</h1>
            <p className="page-subtitle">
              Upload your registered land deed, certified Khatauni, or succession record for automated optical character recognition and revenue ledger matching.
            </p>
          </div>
          <div className="header-actions">
            <span className="badge-ai-model">🤖 Indic-OCR Engine v3.2 Active</span>
          </div>
        </div>
      </div>

      <div className="container page-body-container">
        <div className="upload-stage-grid">
          {/* Left Column: Upload Dropzone & AI Steps */}
          <div className="upload-panel-card gov-card">
            <div className="card-top-title-row">
              <div className="title-icon-badge">
                <Upload size={20} />
              </div>
              <div>
                <h3 className="card-heading">दस्तावेज़ अपलोड करें / Upload Document</h3>
                <p className="card-subheading">PDF, JPG or PNG up to 10 MB accepted</p>
              </div>
            </div>

            {/* Drag & Drop Area */}
            <div 
              className="interactive-drop-zone"
              onClick={handleDemoUpload}
              title="Click to upload sample land deed"
            >
              <div className="dropzone-icon">
                <Upload size={40} className="text-secondary-blue" />
              </div>
              <h4>Drag & drop your land record document here</h4>
              <p className="dropzone-sub">Supports certified registry copies, sale deeds, and revenue passbooks</p>
              <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '0.75rem' }}>
                Browse Files on Computer
              </button>
            </div>

            {/* Selected File Card & Demo Button */}
            {file && (
              <div className="selected-file-chip">
                <FileText size={18} className="text-secondary-blue" />
                <div className="file-info-col">
                  <strong>{file.name}</strong>
                  <span>{file.size} • Ready for extraction</span>
                </div>
                <button type="button" className="btn btn-outline btn-sm" onClick={handleDemoUpload}>
                  Re-upload
                </button>
              </div>
            )}

            {/* Automated AI OCR Progress Checklist */}
            <div className="ocr-progress-box">
              <h5 className="ocr-progress-title">
                <Cpu size={15} /> 5-Stage Automated OCR Extraction Pipeline
              </h5>
              <div className="ocr-steps-list">
                {steps.map((step, idx) => {
                  const isDone = progressStep > idx;
                  const isCurrent = progressStep === idx && isProcessing;

                  return (
                    <div key={idx} className={`ocr-step-item ${isDone ? 'done' : isCurrent ? 'active' : ''}`}>
                      <div className="step-indicator">
                        {isDone ? (
                          <Check size={13} className="text-success" />
                        ) : isCurrent ? (
                          <RefreshCw size={13} className="spinner-rotate" />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>
                      <span className="step-text">{step}</span>
                      {isDone && <span className="step-tag-verified">Done</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Verified Document Preview */}
          <div className="upload-preview-col">
            <div className="preview-heading-row">
              <Eye size={17} className="text-primary-navy" />
              <h4 className="preview-card-title">सत्यापित दस्तावेज़ पूर्वावलोकन / Verified Document Preview</h4>
            </div>
            <DocumentPreview record={sampleExtractedRecord} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDocumentPage;
