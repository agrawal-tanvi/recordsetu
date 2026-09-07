import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getDocument,
  getAuditLog,
  updateReview,
} from "../services/api";
import {
  ShieldCheck,
  AlertCircle,
  CheckCircle,
  ClipboardList,
  Upload,
  ArrowLeft,
  RefreshCw,
  Save,
  Clock,
  User,
  History
} from "lucide-react";
import "./AIVerificationPage.css";

function parseSafeArea(val) {
  if (val === null || val === undefined || val === "") return null;
  if (typeof val === "number") return isNaN(val) ? null : val;
  const match = String(val).match(/[-+]?[0-9]*\.?[0-9]+/);
  if (match) {
    const num = parseFloat(match[0]);
    return isNaN(num) ? null : num;
  }
  return null;
}

export default function AIVerificationPage() {
  const { user } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const documentId = params.get("documentId");

  const [document, setDocument] = useState(null);
  const [audit, setAudit] = useState(null);
  const [form, setForm] = useState({});
  const [reviewer, setReviewer] = useState(user?.name || "Revenue Officer");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadDocument = async () => {
    if (!documentId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await getDocument(documentId);
      setDocument(result);

      const record = result?.land_record || {};

      const getValue = (field) => {
        if (field === null || field === undefined) return "";
        if (typeof field === "object") return field.value ?? "";
        return field;
      };

      setForm({
        khasra_no: getValue(record.khasra_no),
        owner_name: getValue(record.owner_name),
        village: getValue(record.village),
        district: getValue(record.district),
        area: getValue(record.area),
        area_unit: getValue(record.area_unit),
      });

      try {
        const auditResult = await getAuditLog(documentId);
        setAudit(auditResult);
      } catch {
        setAudit(null);
      }
    } catch (err) {
      setError(err.message || "Failed to load document.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.name) {
      setReviewer(user.name);
    }
  }, [user]);

  useEffect(() => {
    loadDocument();
  }, [documentId]);

  const handleChange = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage("");
      setError("");

      const safeArea = parseSafeArea(form.area);

      const result = await updateReview(documentId, {
        reviewer: reviewer.trim() || "Revenue Officer",
        khasra_no: form.khasra_no || null,
        owner_name: form.owner_name || null,
        village: form.village || null,
        district: form.district || null,
        area: safeArea,
        area_unit: form.area_unit || null,
      });

      setMessage(result.message || "Correction and validation applied successfully.");
      await loadDocument();
    } catch (err) {
      setError(err.message || "Failed to save correction.");
    } finally {
      setSaving(false);
    }
  };

  // State 1: No document ID provided in query
  if (!documentId) {
    return (
      <div className="verification-page">
        <div className="page-header-bar">
          <div className="container header-bar-inner">
            <div>
              <div className="breadcrumbs">
                <span>Home</span> / <strong>AI Verification</strong>
              </div>
              <span className="page-sub-badge">मानव सत्यापन व सुधार | HUMAN VERIFICATION DESK</span>
              <h1 className="page-title">Human Verification Desk (मानव सत्यापन)</h1>
              <p className="page-subtitle">
                Review, confirm, or correct AI-extracted land record entities flagged during automated validation.
              </p>
            </div>
          </div>
        </div>

        <div className="container" style={{ maxWidth: "820px", margin: "3rem auto" }}>
          <div style={{
            background: "#FFFFFF",
            border: "1px solid #CBD5E1",
            borderRadius: "8px",
            padding: "3rem 2rem",
            textAlign: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
          }}>
            <ClipboardList size={48} style={{ color: "#163A63", margin: "0 auto 1rem auto" }} />
            <h2 style={{ color: "#163A63", fontSize: "1.4rem", fontWeight: 800, marginBottom: "0.5rem" }}>
              No Document Selected for Verification
            </h2>
            <p style={{ color: "#64748B", maxWidth: "520px", margin: "0 auto 1.75rem auto", fontSize: "0.95rem" }}>
              Human verification is performed on specific digitized records flagged with low-confidence or validation discrepancies.
              Please select a document from the Review Queue or upload a new record for digitization.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/review-queue" className="btn btn-primary" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <ClipboardList size={16} /> Open Human Review Queue
              </Link>
              <Link to="/upload" className="btn btn-outline" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <Upload size={16} /> Upload New Document
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // State 2: Loading document data
  if (loading) {
    return (
      <div className="verification-page">
        <div className="container" style={{ padding: "4rem 1rem", textAlign: "center" }}>
          <RefreshCw size={36} style={{ color: "#163A63", margin: "0 auto 1rem auto", animation: "spin 1s linear infinite" }} />
          <h3>Loading record details...</h3>
          <p style={{ color: "#64748B" }}>Fetching document extraction and validation state from backend.</p>
        </div>
      </div>
    );
  }

  // State 3: Error loading document
  if (error && !document) {
    return (
      <div className="verification-page">
        <div className="container" style={{ maxWidth: "700px", margin: "3rem auto" }}>
          <div style={{
            background: "#FFFFFF",
            border: "1px solid #FECACA",
            borderRadius: "8px",
            padding: "2.5rem",
            textAlign: "center"
          }}>
            <AlertCircle size={42} style={{ color: "#DC2626", margin: "0 auto 1rem auto" }} />
            <h3 style={{ color: "#DC2626", marginBottom: "0.5rem" }}>Could Not Load Document</h3>
            <p style={{ color: "#64748B", marginBottom: "1.5rem" }}>{error}</p>
            <Link to="/review-queue" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> Back to Review Queue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const record = document?.land_record || {};
  const validation = document?.validation || {};
  const docStatus = document?.status || document?.document?.status || "UNKNOWN";
  const isVerified = docStatus === "VERIFIED";

  const fields = [
    { key: "khasra_no", label: "Khasra / Survey Number (खसरा संख्या)", type: "text" },
    { key: "owner_name", label: "Landowner Name (खातेदार / स्वामी)", type: "text" },
    { key: "village", label: "Village / Mauza (ग्राम / मौजा)", type: "text" },
    { key: "district", label: "District (जनपद / जिला)", type: "text" },
    { key: "area", label: "Land Area (क्षेत्रफल)", type: "text" },
    { key: "area_unit", label: "Area Unit (इकाई)", type: "text" },
  ];

  const renderConfidenceBadge = (fieldKey) => {
    const fieldData = record[fieldKey];
    if (!fieldData || typeof fieldData !== "object" || fieldData.confidence === undefined || fieldData.confidence === null) {
      return null;
    }
    const pct = Math.round(fieldData.confidence * 100);
    const isHigh = fieldData.confidence >= 0.75;
    return (
      <span style={{
        fontSize: "0.74rem",
        fontWeight: 700,
        padding: "2px 8px",
        borderRadius: "4px",
        background: isHigh ? "#ECFDF5" : "#FEF3C7",
        color: isHigh ? "#065F46" : "#92400E",
        border: `1px solid ${isHigh ? "#A7F3D0" : "#FCD34D"}`,
        display: "inline-flex",
        alignItems: "center",
        gap: "4px"
      }}>
        {pct}% {isHigh ? "High Confidence" : "Flagged for Review"}
      </span>
    );
  };

  return (
    <div className="verification-page">
      {/* Header Bar */}
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/review-queue" className="btn btn-outline btn-sm">
              <ArrowLeft size={14} /> Back to Review Queue
            </Link>
            <div>
              <div className="breadcrumbs">
                <span>Home</span> / <Link to="/review-queue">Review Queue</Link> / <strong>{documentId}</strong>
              </div>
              <h1 className="page-title">Human Verification & Correction Desk</h1>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span style={{
              background: isVerified ? "#ECFDF5" : "#FEF3C7",
              color: isVerified ? "#065F46" : "#92400E",
              border: `1px solid ${isVerified ? "#A7F3D0" : "#FCD34D"}`,
              padding: "6px 14px",
              borderRadius: "4px",
              fontSize: "0.85rem",
              fontWeight: 800,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}>
              {isVerified ? <CheckCircle size={15} /> : <AlertCircle size={15} />}
              {docStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="container page-body-container" style={{ margin: "2rem auto", maxWidth: "1100px" }}>
        {message && (
          <div style={{
            background: "#ECFDF5",
            border: "1px solid #A7F3D0",
            color: "#065F46",
            borderRadius: "6px",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 600
          }}>
            <CheckCircle size={18} /> {message}
          </div>
        )}

        {error && (
          <div style={{
            background: "#FEF2F2",
            border: "1px solid #FECACA",
            color: "#991B1B",
            borderRadius: "6px",
            padding: "1rem 1.25rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}

        {/* 2-Column Layout: Left = Edit Form, Right = Validation & Audit */}
        <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: "1.5rem", alignItems: "start" }}>

          {/* Left Column: Editable Verification Form */}
          <div style={{
            background: "#FFFFFF",
            border: "1px solid #CBD5E1",
            borderRadius: "8px",
            padding: "1.75rem",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
          }}>
            <div style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "1rem", marginBottom: "1.25rem" }}>
              <h3 style={{ color: "#163A63", fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.35rem" }}>
                Extracted Land Record Details
              </h3>
              <p style={{ color: "#64748B", fontSize: "0.85rem" }}>
                Verify and amend fields extracted from the scanned deed. Confirmed values and human edits are recorded in the official audit trail.
              </p>
            </div>

            {/* Reviewer Field */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#163A63", marginBottom: "0.35rem" }}>
                Reviewer Official Name / ID <span style={{ color: "#DC2626" }}>*</span>
              </label>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <User size={15} style={{ position: "absolute", left: "12px", color: "#64748B" }} />
                <input
                  type="text"
                  value={reviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  placeholder="e.g. Officer R. K. Sharma"
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 36px",
                    border: "1px solid #CBD5E1",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: "#163A63"
                  }}
                  required
                />
              </div>
            </div>

            {/* Field Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              {fields.map(({ key, label, type }) => (
                <div key={key} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "#334155" }}>
                    {label}
                  </label>
                  <input
                    type={type}
                    value={form[key] ?? ""}
                    onChange={(e) => handleChange(key, e.target.value)}
                    style={{
                      padding: "8px 12px",
                      border: "1px solid #CBD5E1",
                      borderRadius: "6px",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#0F172A",
                      background: "#F8FAFC"
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "2px" }}>
                    <span style={{ fontSize: "0.72rem", color: "#64748B" }}>
                      AI: {typeof record[key] === "object" ? record[key]?.value ?? "—" : record[key] ?? "—"}
                    </span>
                    {renderConfidenceBadge(key)}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid #E2E8F0", paddingTop: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.8rem", color: "#64748B" }}>
                Confirming values transitions record to VERIFIED if no errors remain.
              </span>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                style={{
                  background: "#163A63",
                  color: "#FFFFFF",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  cursor: saving ? "not-allowed" : "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px"
                }}
              >
                {saving ? (
                  <>
                    <RefreshCw size={15} style={{ animation: "spin 1s linear infinite" }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={15} />
                    Save & Verify Record
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Validation Status & Audit Trail */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Validation Panel */}
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
            }}>
              <h4 style={{ color: "#163A63", fontSize: "1.05rem", fontWeight: 800, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
                <ShieldCheck size={18} /> Automated Validation Report
              </h4>

              <div style={{
                background: validation.valid ? "#ECFDF5" : "#FEF2F2",
                border: `1px solid ${validation.valid ? "#A7F3D0" : "#FECACA"}`,
                borderRadius: "6px",
                padding: "10px 14px",
                fontSize: "0.85rem",
                fontWeight: 700,
                color: validation.valid ? "#065F46" : "#991B1B",
                marginBottom: "1rem"
              }}>
                {validation.valid ? "✓ Validation Passed" : "⚠ Validation Issues Detected"}
              </div>

              {validation.errors?.length > 0 && (
                <div style={{ marginBottom: "1rem" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#DC2626", textTransform: "uppercase" }}>
                    Errors (Invalid Fields):
                  </span>
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "1.2rem", fontSize: "0.82rem", color: "#7F1D1D" }}>
                    {validation.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              {validation.warnings?.length > 0 && (
                <div>
                  <span style={{ fontSize: "0.78rem", fontWeight: 800, color: "#D97706", textTransform: "uppercase" }}>
                    Warnings / Human Review Flags:
                  </span>
                  <ul style={{ margin: "4px 0 0 0", paddingLeft: "1.2rem", fontSize: "0.82rem", color: "#92400E" }}>
                    {validation.warnings.map((warn, i) => (
                      <li key={i}>{warn}</li>
                    ))}
                  </ul>
                </div>
              )}

              {!validation.errors?.length && !validation.warnings?.length && (
                <p style={{ fontSize: "0.85rem", color: "#059669", margin: 0 }}>
                  No errors or warnings recorded. All validation checks passed.
                </p>
              )}
            </div>

            {/* Audit Trail Panel */}
            <div style={{
              background: "#FFFFFF",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              padding: "1.5rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
            }}>
              <h4 style={{ color: "#163A63", fontSize: "1.05rem", fontWeight: 800, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "6px" }}>
                <History size={18} /> Official Audit Trail ({audit?.count || 0})
              </h4>

              {!audit?.items?.length ? (
                <p style={{ fontSize: "0.85rem", color: "#64748B", margin: 0 }}>
                  No human modifications recorded for this document yet.
                </p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "280px", overflowY: "auto" }}>
                  {audit.items.map((entry, idx) => (
                    <div key={idx} style={{
                      background: "#F8FAFC",
                      border: "1px solid #E2E8F0",
                      borderRadius: "6px",
                      padding: "8px 10px",
                      fontSize: "0.78rem"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                        <strong style={{ color: "#163A63" }}>{entry.field_name}</strong>
                        <span style={{
                          fontWeight: 700,
                          color: entry.action === "CORRECTED" ? "#2563EB" : "#059669"
                        }}>
                          {entry.action}
                        </span>
                      </div>
                      <div style={{ color: "#475569" }}>
                        <span>{entry.old_value || "—"}</span> → <strong style={{ color: "#0F172A" }}>{entry.new_value || "—"}</strong>
                      </div>
                      <div style={{ fontSize: "0.7rem", color: "#94A3B8", marginTop: "2px" }}>
                        By {entry.actor} • {new Date(entry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}