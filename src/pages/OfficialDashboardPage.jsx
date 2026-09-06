import React from 'react';
import { Database, FileCheck, Clock, Users, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import StatCard from '../components/dashboard/StatCard';
import ActivityList from '../components/dashboard/ActivityList';
import RequestTable from '../components/dashboard/RequestTable';
import { initialApplications } from '../data/applications';
import { useAuth } from '../context/AuthContext';

const OfficialDashboardPage = () => {
  const { user } = useAuth();
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="dashboard-layout">
      <Sidebar type="official" />

      <main className="dashboard-main">
        {/* Official Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="gov-badge-emblem" style={{ background: '#0F2742', color: '#FFFFFF', borderColor: '#FF9933', marginBottom: '0.4rem' }}>
              <span>OFFICIAL ACCESS</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>
              Welcome back, {user?.name || 'Admin Officer'}
            </h1>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
              Revenue Department | Lucknow Division Administration
            </p>
          </div>

          <div style={{ textAlign: 'right', background: '#FFFFFF', padding: '0.65rem 1.25rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--government-blue)', textTransform: 'uppercase' }}>
              System Date & Status
            </div>
            <div style={{ fontWeight: 600, color: 'var(--primary-navy)', fontSize: '0.92rem' }}>
              {today}
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <StatCard
            title="Total Records"
            value="5.4 Cr+"
            icon={Database}
            subtitle="Land parcels mapped"
          />
          <StatCard
            title="Digitized Records"
            value="4.97 Cr"
            icon={FileCheck}
            subtitle="ULPIN / Bhu-Aadhaar synced"
          />
          <StatCard
            title="Pending Requests"
            value="1,284"
            icon={Clock}
            subtitle="Awaiting officer order"
          />
          <StatCard
            title="Applications Today"
            value="326"
            icon={Users}
            subtitle="Across 18 tehsils"
          />
        </div>

        {/* Digitization Progress Strip */}
        <div className="card" style={{ marginBottom: '2.5rem', background: 'linear-gradient(90deg, #FFFFFF 0%, var(--light-blue) 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <div>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-navy)', margin: 0 }}>
                Digitization Progress (Statewide Cadastral GIS Vectorization)
              </h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Phase-IV DILRMP Target: 100% boundary coordinates verification
              </span>
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--government-blue)' }}>
              92% completed
            </div>
          </div>
          <div style={{ width: '100%', height: '10px', background: 'rgba(36, 90, 148, 0.15)', borderRadius: '9999px', overflow: 'hidden' }}>
            <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, var(--government-blue) 0%, var(--success) 100%)', borderRadius: '9999px' }}></div>
          </div>
        </div>

        {/* Two-column requests & activities */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '2rem' }}>
          <div>
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '1rem' }}>
              <div>
                <h2 className="card-title">Recent Citizen Requests</h2>
                <p style={{ fontSize: '0.85rem' }}>Action required on incoming petitions</p>
              </div>
            </div>
            <RequestTable requests={initialApplications} />
          </div>

          <div>
            <div className="card-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '1rem' }}>
              <div>
                <h2 className="card-title">Recent System Activity</h2>
                <p style={{ fontSize: '0.85rem' }}>Audited administrative events log</p>
              </div>
            </div>
            <ActivityList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfficialDashboardPage;