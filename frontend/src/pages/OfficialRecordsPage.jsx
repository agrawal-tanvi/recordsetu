import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import RecordTable from '../components/land-records/RecordTable';
import { initialRecords } from '../data/records';

const OfficialRecordsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar type="official" />
      <main className="dashboard-main">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>Land Records Master Registry</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Administrative master view of all registered land parcels, mutation logs and ownership deeds.
          </p>
        </div>

        <RecordTable records={initialRecords} />
      </main>
    </div>
  );
};

export default OfficialRecordsPage;