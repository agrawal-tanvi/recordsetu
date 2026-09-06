import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { initialApplications } from '../data/applications';

const CitizenApplicationsPage = () => {
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filtered = filterStatus === 'ALL'
    ? initialApplications
    : initialApplications.filter(a => a.status.toUpperCase() === filterStatus);

  return (
    <div className="dashboard-layout">
      <Sidebar type="citizen" />
      <main className="dashboard-main">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>My Applications</h1>
            <p style={{ color: 'var(--text-muted)' }}>
              Historical registry of all mutation, boundary survey and certified copy petitions.
            </p>
          </div>

          <Link to="/applications/new" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <PlusCircle size={16} />
            <span>New Application</span>
          </Link>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {['ALL', 'APPROVED', 'UNDER REVIEW', 'PENDING'].map(st => (
            <button
              key={st}
              type="button"
              className={`btn btn-sm ${filterStatus === st ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setFilterStatus(st)}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="table-responsive">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Service Name</th>
                <th>Filing Date</th>
                <th>Assigned Officer</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id}>
                  <td><strong>{app.id}</strong></td>
                  <td>{app.service}</td>
                  <td>{app.date}</td>
                  <td style={{ fontSize: '0.85rem' }}>{app.assignedOfficer}</td>
                  <td><Badge status={app.status} /></td>
                  <td>
                    <Link to={`/citizen/track?id=${app.id}`} className="btn btn-secondary btn-sm">
                      Track Progress
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default CitizenApplicationsPage;