import React, { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

const CitizenProfilePage = () => {
  const { user, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || 'Rajesh Kumar',
    mobile: user?.mobile || '9876543210',
    email: user?.email || 'rajesh.kumar@example.com',
    state: user?.state || 'Uttar Pradesh',
    district: user?.district || 'Lucknow',
    village: user?.village || 'Gomti Nagar'
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar type="citizen" />
      <main className="dashboard-main">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', color: 'var(--primary-navy)' }}>Citizen Profile</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Official citizen demographic information linked to Bhu-Aadhaar registry.
          </p>
        </div>

        <div className="card" style={{ maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '0.75rem', background: 'var(--light-blue)', borderRadius: '6px' }}>
            <ShieldCheck size={24} style={{ color: 'var(--success)' }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--primary-navy)' }}>
                Aadhaar e-KYC Verified
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Linked with UIDAI token: XXXX-XXXX-9021
              </div>
            </div>
          </div>

          {saved && (
            <div style={{ background: 'var(--success-light)', color: 'var(--success)', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              Profile details updated successfully.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Full Legal Name"
              name="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              required
            />
            <div className="form-grid-2">
              <Input
                label="Registered Mobile"
                name="mobile"
                value={profile.mobile}
                onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                required
              />
              <Input
                label="Email ID"
                name="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
            <div className="form-grid-3">
              <Input
                label="State"
                name="state"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                required
              />
              <Input
                label="District"
                name="district"
                value={profile.district}
                onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                required
              />
              <Input
                label="Village / Tehsil"
                name="village"
                value={profile.village}
                onChange={(e) => setProfile({ ...profile, village: e.target.value })}
                required
              />
            </div>

            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CitizenProfilePage;