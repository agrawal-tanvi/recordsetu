import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';

const OfficialSettingsPage = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar type="official" />
      <main className="dashboard-main">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>Administrative Settings</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Configure security, session duration, and revenue notification rules.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '650px' }}>
          {saved && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Administrative settings updated successfully.
            </div>
          )}

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Auto-Lock Idle Workstation</label>
              <Select
                options={[
                  { value: '15', label: '15 Minutes' },
                  { value: '30', label: '30 Minutes (Recommended)' },
                  { value: '60', label: '60 Minutes' }
                ]}
                defaultValue="30"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Notification Channels for Urgent Petitions</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked />
                  <span>NIC Official Email Alert</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input type="checkbox" defaultChecked />
                  <span>Government SMS Gateway</span>
                </label>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <Button type="submit" variant="primary">Save Configuration</Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default OfficialSettingsPage;