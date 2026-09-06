import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import RecordTable from '../components/land-records/RecordTable';
import { initialRecords } from '../data/records';

const CitizenRecordsPage = () => {
  const citizenRecords = initialRecords.slice(0, 3);

  return (
    <div className="dashboard-layout">
      <Sidebar type="citizen" />
      <main className="dashboard-main">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>My Land Records</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Authoritative Record of Rights (Khatauni / 7-12) linked to your citizen identity.
          </p>
        </div>

        <RecordTable records={citizenRecords} />
      </main>
    </div>
  );
};

export default CitizenRecordsPage;