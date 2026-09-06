import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Clock, ShieldCheck, UserCheck, Calendar } from 'lucide-react';
import { initialApplications } from '../data/applications';
import ApplicationTimeline from '../components/applications/ApplicationTimeline';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const TrackApplicationPage = () => {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id') || '';

  const [searchId, setSearchId] = useState(urlId || 'APP-2026-002');
  const [application, setApplication] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (urlId) {
      setSearchId(urlId);
      performSearch(urlId);
    } else {
      performSearch('APP-2026-002');
    }
  }, [urlId]);

  const performSearch = (idToSearch) => {
    setHasSearched(true);
    const found = initialApplications.find(a => a.id.toLowerCase() === idToSearch.trim().toLowerCase());
    if (found) {
      setApplication(found);
    } else {
      // Create mock result for unknown ID
      setApplication({
        id: idToSearch.trim().toUpperCase(),
        applicantName: "Rajesh Kumar",
        service: "Succession Mutation of Land Parcel",
        date: "2026-03-04",
        status: "Under Review",
        assignedOfficer: "Revenue Inspector Circle 2",
        remarks: "Public scrutiny notice published. Scrutiny in progress.",
        timeline: [
          { stage: "Application Submitted", date: "2026-03-04 10:00 AM", status: "completed", note: "Application acknowledged." },
          { stage: "Document Verification", date: "2026-03-04 03:30 PM", status: "completed", note: "Documents found authentic." },
          { stage: "Under Review", date: "2026-03-05 11:00 AM", status: "in_progress", note: "Awaiting local revenue patwari verification." },
          { stage: "Officer Approval", date: "Pending", status: "pending", note: "Pending approval." },
          { stage: "Completed", date: "Pending", status: "pending", note: "Issue of certified order." }
        ]
      });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim()) {
      performSearch(searchId);
    }
  };

  return (
    <div className="track-application-page">
      <div className="page-hero">
        <div className="container">
          <h1>Track Your Application</h1>
          <p>
            Check real-time processing milestones, assigned revenue officer remarks and clearance timelines.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        {/* Search Input Box */}
        <div className="card" style={{ maxWidth: '650px', margin: '-2rem auto 2.5rem', position: 'relative', zIndex: 10, boxShadow: 'var(--shadow-lg)' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <Input
                label="Application Reference Number"
                name="appId"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. APP-2026-001 or APP-2026-002"
                required
                icon={Search}
              />
            </div>
            <div style={{ marginTop: '9px' }}>
              <Button type="submit" variant="primary" size="md">
                Track Status
              </Button>
            </div>
          </form>
        </div>

        {/* Tracking Details */}
        {application && (
          <div className="card" style={{ maxWidth: '850px', margin: '0 auto' }}>
            <div className="card-header" style={{ flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                  Application Tracking Details
                </span>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                  {application.id}
                </div>
              </div>
              <div>
                <Badge status={application.status} />
              </div>
            </div>

            <div className="doc-details-grid" style={{ marginBottom: '2rem' }}>
              <div className="doc-field">
                <span className="doc-field-label">Applicant Name</span>
                <span className="doc-field-val">{application.applicantName}</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Service Type</span>
                <span className="doc-field-val">{application.service}</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Filing Date</span>
                <span className="doc-field-val">{application.date}</span>
              </div>
              <div className="doc-field">
                <span className="doc-field-label">Assigned Revenue Officer</span>
                <span className="doc-field-val">{application.assignedOfficer}</span>
              </div>
            </div>

            {application.remarks && (
              <div style={{ background: 'var(--light-blue)', borderLeft: '4px solid var(--government-blue)', padding: '0.85rem 1.25rem', borderRadius: '4px', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
                <strong>Current Stage Remarks:</strong> {application.remarks}
              </div>
            )}

            <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
              Application Progression Timeline
            </h3>

            <ApplicationTimeline timeline={application.timeline} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackApplicationPage;