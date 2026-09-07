import React, { useState, useEffect, useCallback } from 'react';
import './LandRecordsSearchPage.css';
import { Link, useSearchParams } from 'react-router-dom';
import SearchForm from '../components/land-records/SearchForm';
import { searchLandRecords } from '../services/api';
import { ShieldCheck, Database, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export const LandRecordsSearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState(initialQ ? { query: initialQ } : {});

  const fetchRecords = useCallback(async (criteria = {}) => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (criteria.district) params.district = criteria.district;
      if (criteria.village) params.village = criteria.village;

      if (criteria.type && criteria.query) {
        if (criteria.type === 'khasra') {
          params.khasra_no = criteria.query;
        } else if (criteria.type === 'owner') {
          params.owner_name = criteria.query;
        } else {
          params.q = criteria.query;
        }
      } else if (criteria.query) {
        params.q = criteria.query;
      }

      const res = await searchLandRecords(params);
      setRecords(res.items || []);
    } catch (err) {
      console.error('Failed to search land records:', err);
      setError(err.message || 'Failed to search land records');
      setRecords([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecords(filterCriteria);
  }, [fetchRecords, filterCriteria]);

  const handleSearch = (criteria) => {
    setFilterCriteria(criteria || {});
  };

  const handleReset = () => {
    setFilterCriteria({});
  };

  return (
    <div className="search-records-page">
      {/* Header Bar */}
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <strong>Land Records Search</strong>
            </div>
            <span className="page-sub-badge">केंद्रीय भू-अभिलेख पोर्टल | CENTRAL REVENUE LAND LEDGER</span>
            <h1 className="page-title">Search & Access Land Records (भू-अभिलेख)</h1>
            <p className="page-subtitle">
              Find land ownership details, survey information, property records and other government land services through the AbhilekhSetu digital portal.
            </p>
          </div>
          <div className="header-actions">
            <span className="badge-sync">
              <CheckCircle size={14} /> AbhilekhSetu Prototype Database
            </span>
          </div>
        </div>
      </div>

      <div className="container page-body-container">
        {/* SearchForm with 4-Column Location Grid & Record ID Tabs */}
        <SearchForm onSearch={handleSearch} onReset={handleReset} />

        {/* Results Section */}
        <div className="records-results-card">
          <div className="results-header-bar">
            <div className="results-title-group">
              <h3 className="results-count-title">
                {loading ? 'Searching...' : `All Digitized Records (${records.length})`}
              </h3>
              <span className="results-ledger-badge">
                ✓ AbhilekhSetu Prototype Dataset
              </span>
            </div>
            <span className="record-total-hint">Displaying digitized Land Records</span>
          </div>

          {/* Results Table */}
          <div className="table-responsive-wrapper">
            <table className="gov-records-table">
              <thead>
                <tr>
                  <th>Record ID</th>
                  <th>Owner Name</th>
                  <th>State</th>
                  <th>District</th>
                  <th>Village</th>
                  <th>Survey / Khasra No.</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="8" className="empty-table-cell">
                      <RefreshCw size={28} style={{ margin: '0 auto 0.75rem auto', color: '#163A63', animation: 'spin 1s linear infinite' }} />
                      <p>Searching revenue records database...</p>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="8" className="empty-table-cell">
                      <AlertCircle size={32} style={{ margin: '0 auto 0.75rem auto', color: '#DC2626' }} />
                      <p style={{ color: '#DC2626' }}>{error}</p>
                      <button type="button" className="btn btn-outline btn-sm" onClick={handleReset} style={{ marginTop: '0.75rem' }}>
                        Retry / Clear Filters
                      </button>
                    </td>
                  </tr>
                ) : records.length > 0 ? (
                  records.map((r) => (
                    <tr key={r.document_id || r.id}>
                      <td>
                        <span className="record-id-mono">{r.document_id || `REC-${r.id}`}</span>
                      </td>
                      <td>
                        <strong className="record-owner-name">{r.owner_name || '—'}</strong>
                      </td>
                      <td>Uttar Pradesh</td>
                      <td>{r.district || '—'}</td>
                      <td>{r.village || '—'}</td>
                      <td>
                        <strong className="khasra-number-tag">{r.khasra_no || '—'}</strong>
                      </td>
                      <td>
                        {r.status === 'VERIFIED' ? (
                          <span className="status-badge status-verified">
                            <ShieldCheck size={14} /> VERIFIED
                          </span>
                        ) : r.status === 'REVIEW_REQUIRED' ? (
                          <span className="status-badge" style={{ background: '#FEF3C7', color: '#92400E' }}>
                            <AlertCircle size={14} /> REVIEW REQUIRED
                          </span>
                        ) : (
                          <span className="status-badge status-verified">
                            <CheckCircle size={14} /> {r.status || 'DIGITIZED'}
                          </span>
                        )}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/land-records/${r.document_id || r.id}`}
                          className="btn-table-action"
                        >
                          View Record →
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="empty-table-cell">
                      <Database size={32} style={{ margin: '0 auto 0.75rem auto', color: '#94A3B8' }} />
                      <p>No land records found matching your selected criteria.</p>
                      <button type="button" className="btn btn-outline btn-sm" onClick={handleReset} style={{ marginTop: '0.75rem' }}>
                        Clear Filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandRecordsSearchPage;
