import React, { useState } from 'react';
import './LandRecordsSearchPage.css';
import { Link, useSearchParams } from 'react-router-dom';
import SearchForm from '../components/land-records/SearchForm';
import { initialRecords } from '../data/records';
import { ShieldCheck, ArrowRight, FileText, Database, CheckCircle } from 'lucide-react';

export const LandRecordsSearchPage = () => {
  const [searchParams] = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const [filterCriteria, setFilterCriteria] = useState({ query: initialQ });

  const handleSearch = (criteria) => {
    setFilterCriteria(criteria);
  };

  const handleReset = () => {
    setFilterCriteria({});
  };

  const filtered = initialRecords.filter(r => {
    if (filterCriteria.state && r.state !== filterCriteria.state) return false;
    if (filterCriteria.district && r.district !== filterCriteria.district) return false;
    if (filterCriteria.tehsil && r.tehsil !== filterCriteria.tehsil) return false;
    if (filterCriteria.village && r.village !== filterCriteria.village) return false;
    if (filterCriteria.query) {
      const q = filterCriteria.query.toLowerCase();
      return (
        r.ownerName.toLowerCase().includes(q) ||
        r.surveyNumber.includes(q) ||
        (r.khasraNumber && r.khasraNumber.toLowerCase().includes(q)) ||
        (r.khataNumber && r.khataNumber.toLowerCase().includes(q)) ||
        r.id.toLowerCase().includes(q) ||
        r.village.toLowerCase().includes(q)
      );
    }
    return true;
  });

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
              Find land ownership details, survey information, property records and other government land services through the RecordSetu digital portal.
            </p>
          </div>
          <div className="header-actions">
            <span className="badge-sync">
              <CheckCircle size={14} /> DILRMP Central Ledger Synced
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
                All Verified Records ({filtered.length})
              </h3>
              <span className="results-ledger-badge">
                ✓ Synchronized with State Revenue Ledger
              </span>
            </div>
            <span className="record-total-hint">Displaying verified Cadastral RoRs</span>
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
                {filtered.length > 0 ? (
                  filtered.map(r => (
                    <tr key={r.id}>
                      <td>
                        <span className="record-id-mono">{r.id}</span>
                      </td>
                      <td>
                        <strong className="record-owner-name">{r.ownerName}</strong>
                        {r.relationName && (
                          <span className="record-relation-sub">{r.relationName}</span>
                        )}
                      </td>
                      <td>{r.state}</td>
                      <td>{r.district}</td>
                      <td>{r.village}</td>
                      <td>
                        <strong className="khasra-number-tag">{r.surveyNumber}</strong>
                      </td>
                      <td>
                        <span className="status-badge status-verified">
                          <ShieldCheck size={14} /> {r.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/land-records/${r.id}`}
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
