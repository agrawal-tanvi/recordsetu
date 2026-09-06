import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { Download, BarChart2, TrendingUp, CheckCircle } from 'lucide-react';

const OfficialReportsPage = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar type="official" />
      <main className="dashboard-main">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>Reports & Analytics</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Official statistical abstracts on land records digitization, mutation disposal rates and revenue metrics.
          </p>
        </div>

        <div className="form-grid-3" style={{ marginBottom: '2rem' }}>
          <Card title="Monthly Mutation Disposal" subtitle="February 2026">
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-navy)', margin: '0.5rem 0' }}>94.2%</div>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Disposed within the 30-day statutory limit.</p>
            <Button variant="outline" size="sm" icon={Download}>Download Report</Button>
          </Card>

          <Card title="ULPIN Geo-Tagging" subtitle="All 36 States & UTs">
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)', margin: '0.5rem 0' }}>98.6%</div>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Parcels assigned unique 14-digit identifier.</p>
            <Button variant="outline" size="sm" icon={Download}>Download Report</Button>
          </Card>

          <Card title="Revenue Court Grievances" subtitle="Dispute Redressal">
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--government-blue)', margin: '0.5rem 0' }}>81.4%</div>
            <p style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>Grievances resolved via e-Court portal.</p>
            <Button variant="outline" size="sm" icon={Download}>Download Report</Button>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OfficialReportsPage;