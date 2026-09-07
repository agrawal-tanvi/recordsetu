import React, { useState } from 'react';
import './UploadDocumentPage.css';
import { useNavigate } from 'react-router-dom';
import { uploadDocument, processDocument } from '../services/api';
import DocumentPreview from '../components/DocumentPreview';
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
  const [documentId, setDocumentId] = useState(null);
  const [extractedRecord, setExtractedRecord] = useState(null);
  const [error, setError] = useState(null);

  const steps = [
    'Document Upload & Preprocessing',
    'OCR Text Extraction',
    'Field Extraction & Confidence Scoring',
    'Automated Validation',
    'Human Review & Verification'
  ];

  const mapBackendRecordToPreview = (processResult) => {
    const extraction = processResult?.extraction || {};
    const fields = extraction?.fields || {};
    const validation = processResult?.validation || {};

    return {
      id: processResult?.document_id || 'N/A',
      status: processResult?.status || 'PROCESSED',

      district: fields.district?.value || null,
      village: fields.village?.value || null,
      khasraNo: fields.khasra_no?.value || null,
      ownerName: fields.owner_name?.value || null,
      area: fields.area?.value || null,
      areaUnit: fields.area_unit?.value || null,

      confidence: extraction?.fields?.confidence ?? null,

      khasraConfidence: fields.khasra_no?.confidence ?? null,
      ownerConfidence: fields.owner_name?.confidence ?? null,
      villageConfidence: fields.village?.confidence ?? null,
      districtConfidence: fields.district?.confidence ?? null,
      areaConfidence: fields.area?.confidence ?? null,
      areaUnitConfidence: fields.area_unit?.confidence ?? null,

      validation
    };
  };

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setExtractedRecord(null);
    setDocumentId(null);
    setIsProcessing(true);
    setProgressStep(1);

    try {
      // Step 1: Upload document to backend
      const uploadResult = await uploadDocument(selectedFile);

      const id = uploadResult.document_id;
      setDocumentId(id);
      setProgressStep(2);

      // Step 2: Process document through OCR + extraction + validation
      const processResult = await processDocument(id);
      setProgressStep(5);
      setExtractedRecord(mapBackendRecordToPreview(processResult));
    } catch (err) {
      console.error('Document processing error:', err);
      setError(err.message || 'Document processing failed.');
      setProgressStep(0);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBrowseClick = () => {
    document.getElementById('document-file-input')?.click();
  };

  return (
    <div className="upload-doc-page">
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>Document Scanning & OCR</strong>
            </div>

            <span className="page-sub-badge">
              दस्तावेज़ प्रक्रमण व एआई निष्कर्षण | DOCUMENT SCANNING & OCR
            </span>

            <h1 className="page-title">
              भू-अभिलेख दस्तावेज़ अपलोड व सत्यापन • Document Upload & OCR Desk
            </h1>

            <p className="page-subtitle">
              Upload your registered land deed, certified Khatauni, or succession
              record for automated optical character recognition and revenue
              ledger matching.
            </p>
          </div>

          <div className="header-actions">
            <span className="badge-ai-model">
              🤖 Indic-OCR Engine v3.2 Active
            </span>
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
                <h3 className="card-heading">
                  दस्तावेज़ अपलोड करें / Upload Document
                </h3>

                <p className="card-subheading">
                  PDF, JPG or PNG up to 50 MB accepted
                </p>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              id="document-file-input"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={(e) => handleFileSelect(e.target.files[0])}
            />

            {/* Drag & Drop Area */}
            <div
              className="interactive-drop-zone"
              onClick={handleBrowseClick}
              title="Click to upload land record"
            >
              <div className="dropzone-icon">
                <Upload size={40} className="text-secondary-blue" />
              </div>

              <h4>
                Drag & drop your land record document here
              </h4>

              <p className="dropzone-sub">
                Supports certified registry copies, sale deeds, and revenue
                passbooks
              </p>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '0.75rem' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBrowseClick();
                }}
              >
                Browse Files on Computer
              </button>
            </div>

            {/* Selected File Card */}
            {file && (
              <div className="selected-file-chip">
                <FileText
                  size={18}
                  className="text-secondary-blue"
                />

                <div className="file-info-col">
                  <strong>{file.name}</strong>

                  <span>
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                    {documentId
                      ? ` • Document ID: ${documentId}`
                      : ' • Uploading...'}
                  </span>
                </div>

                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={handleBrowseClick}
                  disabled={isProcessing}
                >
                  Re-upload
                </button>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.85rem 1rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Automated AI OCR Progress Checklist */}
            <div className="ocr-progress-box">
              <h5 className="ocr-progress-title">
                <Cpu size={15} />
                5-Stage Document Processing Pipeline
              </h5>

              <div className="ocr-steps-list">
                {steps.map((step, idx) => {
                  const isDone = progressStep > idx;
                  const isCurrent =
                    progressStep === idx && isProcessing;

                  return (
                    <div
                      key={idx}
                      className={`ocr-step-item ${
                        isDone
                          ? 'done'
                          : isCurrent
                            ? 'active'
                            : ''
                      }`}
                    >
                      <div className="step-indicator">
                        {isDone ? (
                          <Check
                            size={13}
                            className="text-success"
                          />
                        ) : isCurrent ? (
                          <RefreshCw
                            size={13}
                            className="spinner-rotate"
                          />
                        ) : (
                          <span>{idx + 1}</span>
                        )}
                      </div>

                      <span className="step-text">
                        {step}
                      </span>

                      {isDone && (
                        <span className="step-tag-verified">
                          Done
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Extracted Document Preview */}
          <div className="upload-preview-col">
            <div className="preview-heading-row">
              <Eye
                size={17}
                className="text-primary-navy"
              />

              <h4 className="preview-card-title">
                निष्कर्षण परिणाम व पूर्वावलोकन / Extraction Result & Preview
              </h4>
            </div>

            {isProcessing ? (
              <div
                style={{
                  padding: '3rem 2rem',
                  textAlign: 'center',
                  background: '#FFFFFF',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}
              >
                <RefreshCw
                  size={42}
                  className="spinner-rotate text-primary-navy"
                  style={{ margin: '0 auto 1.25rem auto' }}
                />
                <h4 style={{ color: '#163A63', marginBottom: '0.5rem', fontWeight: 800 }}>
                  दस्तावेज़ प्रसंस्करण जारी है • Processing in Progress
                </h4>
                <p style={{ color: '#64748B', maxWidth: '440px', margin: '0 auto', fontSize: '0.9rem' }}>
                  Executing optical character recognition (OCR), extracting land record entities, and running automated validation checks.
                </p>
              </div>
            ) : extractedRecord ? (
              <>
                {extractedRecord.status === 'REVIEW_REQUIRED' && (
                  <div
                    style={{
                      background: '#FEF3C7',
                      border: '1px solid #F59E0B',
                      borderRadius: '8px',
                      padding: '1rem 1.25rem',
                      marginBottom: '1rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1rem',
                      flexWrap: 'wrap'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <AlertCircle size={22} style={{ color: '#B45309', flexShrink: 0 }} />
                      <div>
                        <strong style={{ color: '#92400E', fontSize: '0.92rem', display: 'block' }}>
                          REVIEW REQUIRED (मानव समीक्षा आवश्यक)
                        </strong>
                        <span style={{ color: '#78350F', fontSize: '0.82rem' }}>
                          One or more fields flagged during automated validation. Review and confirm values to finalize verification.
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate(`/verify?documentId=${documentId}`)}
                      style={{
                        background: '#163A63',
                        color: '#FFFFFF',
                        border: 'none',
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      Open for Verification & Correction →
                    </button>
                  </div>
                )}
                <DocumentPreview record={extractedRecord} />
              </>
            ) : (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  borderRadius: '10px'
                }}
              >
                <FileText
                  size={42}
                  style={{ marginBottom: '0.75rem' }}
                />

                <h4>
                  No document processed yet
                </h4>

                <p>
                  Upload a land record to view AI-extracted
                  fields and validation results here.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadDocumentPage;