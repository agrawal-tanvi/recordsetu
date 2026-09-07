import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getReviewQueue } from '../services/api';
import { AlertCircle, RefreshCw, FileText, ClipboardList, CheckCircle, ArrowRight, Upload } from 'lucide-react';

export default function ReviewQueuePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadQueue = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getReviewQueue();
      setItems(data.items || []);
    } catch (err) {
      setError(err.message || 'Failed to load review queue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQueue();
  }, []);

  return (
    <div className="review-queue-page" style={{ background: '#F4F6F9', minHeight: 'calc(100vh - 280px)', paddingBottom: '3.5rem' }}>
      {/* Header Bar */}
      <div className="page-header-bar" style={{ background: '#FFFFFF', borderBottom: '1px solid #CBD5E1', padding: '1.25rem 0', marginBottom: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div className="container header-bar-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="breadcrumbs" style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '0.35rem' }}>
              <span>Home</span> / <strong>Review Queue</strong>
            </div>
            <span className="page-sub-badge" style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 800, color: '#245A94', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
              राजस्व समीक्षा कार्यक्षेत्र | REVENUE OFFICIAL WORKSPACE
            </span>
            <h1 className="page-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#163A63', lineHeight: 1.2, marginBottom: '0.35rem' }}>
              Human Review Queue (समीक्षा कतार)
            </h1>
            <p className="page-subtitle" style={{ fontSize: '0.88rem', color: '#64748B', maxWidth: '860px', margin: 0 }}>
              Scanned deeds and land records flagged for low-confidence OCR extraction or validation discrepancies awaiting official verification.
            </p>
          </div>
          <div className="header-actions" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={loadQueue}
              className="btn btn-outline btn-sm"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} className={loading ? 'spinner-rotate' : ''} /> Refresh Queue
            </button>
            <Link to="/upload" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Upload size={14} /> Upload Document
            </Link>
          </div>
        </div>
      </div>

      <div className="container page-body-container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '8px',
          padding: '1.75rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            paddingBottom: '0.85rem',
            borderBottom: '1px solid #E2E8F0'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#163A63', margin: 0 }}>
                Pending Review Documents
              </h3>
              <span style={{ fontSize: '0.82rem', color: '#64748B' }}>
                {items.length} {items.length === 1 ? 'record requires' : 'records require'} official inspection
              </span>
            </div>
            <span style={{
              background: '#FEF3C7',
              color: '#92400E',
              border: '1px solid #FCD34D',
              padding: '4px 12px',
              borderRadius: '4px',
              fontSize: '0.78rem',
              fontWeight: 700
            }}>
              Active Queue: {items.length}
            </span>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <RefreshCw size={32} style={{ color: '#163A63', margin: '0 auto 0.75rem auto', animation: 'spin 1s linear infinite' }} />
              <p style={{ color: '#64748B' }}>Loading pending review records from database...</p>
            </div>
          )}

          {error && (
            <div style={{
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              color: '#DC2626',
              borderRadius: '6px',
              padding: '1rem',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}

          {!loading && !error && items.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
              <CheckCircle size={48} style={{ color: '#059669', margin: '0 auto 1rem auto' }} />
              <h3 style={{ color: '#163A63', fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Review Queue is Clear! (कोई लंबित समीक्षा नहीं)
              </h3>
              <p style={{ color: '#64748B', maxWidth: '460px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>
                All uploaded land records have either passed automated validation or have been officially confirmed and verified.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <Link to="/upload" className="btn btn-primary btn-sm">
                  Upload Scanned Deed
                </Link>
                <Link to="/land-records/search" className="btn btn-outline btn-sm">
                  Search All Records
                </Link>
              </div>
            </div>
          )}

          {!loading && items.map((item) => {
            const record = item.land_record || {};
            const validation = item.validation || {};
            const warnings = validation.warnings || [];
            const errors = validation.errors || [];

            return (
              <div
                key={item.document_id}
                style={{
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  padding: '1.25rem',
                  marginBottom: '1rem',
                  background: '#FFFFFF',
                  transition: 'box-shadow 0.2s ease',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <span style={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        background: '#EEF5FB',
                        color: '#163A63',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {item.document_id}
                      </span>
                      <strong style={{ fontSize: '1rem', color: '#1E293B' }}>{item.filename}</strong>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px', display: 'block' }}>
                      Status: {item.status || 'REVIEW_REQUIRED'} • Needs official confirmation
                    </span>
                  </div>

                  <span style={{
                    background: '#FEF3C7',
                    color: '#92400E',
                    border: '1px solid #FCD34D',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <AlertCircle size={13} /> REVIEW REQUIRED
                  </span>
                </div>

                {/* Extracted Details Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                  gap: '0.75rem',
                  fontSize: '0.85rem',
                  background: '#F8FAFC',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  border: '1px solid #EDF2F7',
                  marginBottom: '0.85rem'
                }}>
                  <div><span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>Khasra No:</span> <strong style={{ color: '#163A63' }}>{record.khasra_no || '—'}</strong></div>
                  <div><span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>Owner:</span> <strong>{record.owner_name || '—'}</strong></div>
                  <div><span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>Village:</span> {record.village || '—'}</div>
                  <div><span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>District:</span> {record.district || '—'}</div>
                  <div><span style={{ color: '#64748B', display: 'block', fontSize: '0.72rem' }}>Area:</span> <strong>{record.area ? `${record.area} ${record.area_unit || ''}` : '—'}</strong></div>
                </div>

                {/* Validation Warnings / Reason */}
                {(warnings.length > 0 || errors.length > 0) && (
                  <div style={{ marginBottom: '0.85rem', fontSize: '0.8rem', color: '#92400E' }}>
                    <strong>Flagged reason: </strong>
                    <span>{[...errors, ...warnings].join(' • ')}</span>
                  </div>
                )}

                {/* Action Bar */}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Link
                    to={`/verify?documentId=${item.document_id}`}
                    className="btn btn-primary btn-sm"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      textDecoration: 'none',
                      fontWeight: 700
                    }}
                  >
                    Open for Verification & Correction <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}