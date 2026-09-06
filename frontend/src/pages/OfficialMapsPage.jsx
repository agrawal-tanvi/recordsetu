import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import MapsPage from './MapsPage';

const OfficialMapsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar type="official" />
      <main className="dashboard-main">
        <div style={{ marginBottom: '1.5rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>Cadastral GIS Verification</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Spatial boundary demarcations, drone orthorectified survey vectors and parcel inspection.
          </p>
        </div>

        <MapsPage embedded />
      </main>
    </div>
  );
};

export default OfficialMapsPage;