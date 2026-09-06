import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import RequestTable from '../components/dashboard/RequestTable';
import { initialApplications } from '../data/applications';

const OfficialRequestsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar type="official" />
      <main className="dashboard-main">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>Citizen Request Processing Ledger</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Review, scrutinize, approve or request additional documentation on citizen submissions.
          </p>
        </div>

        <RequestTable requests={initialApplications} />
      </main>
    </div>
  );
};

export default OfficialRequestsPage;