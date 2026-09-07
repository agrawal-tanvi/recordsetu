import React from 'react';
import './DocumentPreview.css';
import {
  Printer,
  CheckCircle,
  AlertCircle,
  FileText
} from 'lucide-react';

export const DocumentPreview = ({
  record,
  onPrint
}) => {
  if (!record) {
    return (
      <div className="official-cert-container">
        <div className="official-cert-paper">
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <FileText size={42} style={{ marginBottom: '1rem', color: '#64748B' }} />
            <h3 style={{ color: '#163A63', fontWeight: 800 }}>AbhilekhSetu Extraction Result</h3>
            <p style={{ color: '#64748B' }}>
              Upload and process a land record to view extracted information and validation results here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const validation = record.validation || {};
  const isValid = validation.valid === true;
  const reviewRequired = record.status === 'REVIEW_REQUIRED' || validation.review_required === true;
  const isVerified = record.status === 'VERIFIED';

  const getStatusInfo = () => {
    if (isVerified) {
      return {
        label: 'VERIFIED',
        icon: CheckCircle,
        className: 'status-verified'
      };
    }
    if (reviewRequired) {
      return {
        label: 'REVIEW REQUIRED',
        icon: AlertCircle,
        className: 'status-review'
      };
    }
    if (!isValid) {
      return {
        label: 'VALIDATION ISSUES',
        icon: AlertCircle,
        className: 'status-invalid'
      };
    }
    return {
      label: 'VALIDATION PASSED',
      icon: CheckCircle,
      className: 'status-valid'
    };
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;

  const lowConfidenceFields = validation.low_confidence_fields || [];

  const extractedFields = [
    {
      key: 'khasra_no',
      label: 'Khasra / Survey No. (खसरा संख्या)',
      value: record.khasraNo,
      confidence: record.khasraConfidence
    },
    {
      key: 'owner_name',
      label: 'Landowner Name (भूस्वामी / खातेदार)',
      value: record.ownerName,
      confidence: record.ownerConfidence
    },
    {
      key: 'village',
      label: 'Village / Mauza (ग्राम / मौजा)',
      value: record.village,
      confidence: record.villageConfidence
    },
    {
      key: 'district',
      label: 'District (जनपद / जिला)',
      value: record.district,
      confidence: record.districtConfidence
    },
    {
      key: 'area',
      label: 'Land Area (क्षेत्रफल)',
      value: record.area,
      confidence: record.areaConfidence
    },
    {
      key: 'area_unit',
      label: 'Area Unit (इकाई)',
      value: record.areaUnit,
      confidence: record.areaUnitConfidence
    }
  ];

  return (
    <div className="official-cert-container">
      {/* Action Toolbar */}
      <div className="cert-action-toolbar">
        <div className={`cert-status-badge ${statusInfo.className}`}>
          <StatusIcon size={15} />
          <span>{statusInfo.label}</span>
        </div>

        <div className="cert-btn-group">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={onPrint || (() => window.print())}
            title="Print or save extraction report as PDF"
          >
            <Printer size={14} />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* AbhilekhSetu Result Sheet */}
      <div className="official-cert-paper">
        {/* Report Header */}
        <div className="cert-header-block">
          <div className="cert-header-text">
            <h3>ABHILEKHSETU • LAND RECORD DIGITIZATION & VALIDATION</h3>
            <h4>Extraction & Automated Validation Report</h4>
            <p className="cert-subtitle-law">
              Automated document processing output with field-level confidence scoring
            </p>
          </div>
        </div>

        {/* Metadata Strip */}
        <div className="cert-meta-strip">
          <div className="meta-cell">
            <span className="meta-lbl">Document ID:</span>
            <strong className="meta-val highlight-ulpin">
              {record.id || 'N/A'}
            </strong>
          </div>

          <div className="meta-cell">
            <span className="meta-lbl">Processing Status:</span>
            <strong className="meta-val">
              {statusInfo.label}
            </strong>
          </div>

          <div className="meta-cell">
            <span className="meta-lbl">Confidence:</span>
            <strong className="meta-val">
              {record.confidence != null
                ? `${Math.round(record.confidence * 100)}%`
                : 'Field-level'}
            </strong>
          </div>
        </div>

        {/* Extracted Fields Table */}
        <div className="cert-section-title">
          1. Extracted Land Record Fields
        </div>

        <table className="cert-table">
          <thead>
            <tr>
              <th style={{ width: '38%' }}>Field Name</th>
              <th style={{ width: '40%' }}>Extracted Value</th>
              <th style={{ width: '22%' }}>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {extractedFields.map(({ key, label, value, confidence }) => {
              const isMissing = !value || String(value).trim() === '';
              const isLowConf = confidence !== null && confidence !== undefined && confidence < 0.75;
              const isFlagged = lowConfidenceFields.includes(key) || (isMissing && !isValid);

              return (
                <tr
                  key={key}
                  className={isFlagged || isLowConf || isMissing ? 'row-flagged' : ''}
                >
                  <td className="field-label-cell">
                    <strong>{label}</strong>
                  </td>
                  <td className="field-value-cell">
                    {isMissing ? (
                      <span className="val-missing">Not extracted</span>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span className="val-extracted">{value}</span>
                        {isLowConf && (
                          <span className="val-flag-tag">Needs review</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="field-conf-cell">
                    {confidence !== null && confidence !== undefined ? (
                      <span className={`badge-conf ${confidence >= 0.75 ? 'badge-conf-ok' : 'badge-conf-low'}`}>
                        {Math.round(confidence * 100)}%
                        {confidence < 0.75 ? ' (Low)' : ''}
                      </span>
                    ) : (
                      <span className="conf-na">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Automated Validation Section */}
        <div className="cert-section-title">
          2. Automated Validation Results
        </div>

        <table className="cert-table">
          <tbody>
            <tr>
              <th style={{ width: '30%' }}>Validation Status:</th>
              <td>
                <span className={`badge-val-status ${isValid ? 'val-status-ok' : 'val-status-err'}`}>
                  {isValid ? '✓ Passed Automated Rules' : '⚠ Validation Issues Flagged'}
                </span>
              </td>
            </tr>

            <tr>
              <th>Human Review Required:</th>
              <td>
                <strong style={{ color: reviewRequired ? '#B45309' : '#059669' }}>
                  {reviewRequired ? 'YES — Officer confirmation required' : 'NO — All checks within thresholds'}
                </strong>
              </td>
            </tr>

            {validation.errors?.length > 0 && (
              <tr>
                <th>Validation Errors:</th>
                <td>
                  <ul className="cert-issues-list text-danger">
                    {validation.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}

            {validation.warnings?.length > 0 && (
              <tr>
                <th>Validation Warnings:</th>
                <td>
                  <ul className="cert-issues-list text-warning">
                    {validation.warnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            )}

            {!validation.errors?.length && !validation.warnings?.length && (
              <tr>
                <th>Rule Checks:</th>
                <td style={{ color: '#059669' }}>
                  Required entity presence, numeric area limits, duplicate Khasra scope, and confidence checks passed.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Truthful Trust Note */}
        <div className="cert-security-footer">
          <div className="cert-trust-note">
            <span className="trust-label">AbhilekhSetu Intelligent Verification Architecture</span>
            <p className="trust-desc">
              Values are extracted via optical character recognition and revenue entity parsing.
              Rules-based automated validation checks boundary area units, mandatory fields, duplicate Khasras,
              and confidence thresholds. Flagged or low-confidence values are routed to the Human Review Queue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;