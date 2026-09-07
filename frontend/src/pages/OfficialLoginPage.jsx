import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, ArrowRight, ShieldAlert } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';

const OfficialLoginPage = () => {
  const [officialId, setOfficialId] = useState('OFFICIAL001');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const { loginAsOfficial } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!officialId.trim()) {
      setError('Please enter your Official Employee ID.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your secure access key.');
      return;
    }

    loginAsOfficial(officialId, password);
    navigate('/official/dashboard');
  };

  return (
    <div className="auth-wrapper" style={{ background: '#0F2742' }}>
      <div className="auth-card official-border" style={{ boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }}>
        <div className="auth-header">
          <div className="gov-badge-emblem" style={{ background: '#0F2742', color: '#FFFFFF', borderColor: '#FF9933' }}>
            <Shield size={14} style={{ color: '#FF9933' }} />
            <span>INTERNAL REVENUE ADMINISTRATION</span>
          </div>
          <h2 style={{ color: '#0F2742' }}>Official Login</h2>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Secure access for government officials and revenue settlement officers.
          </p>
        </div>

        {/* Demo Official Credentials */}
        <div className="demo-credentials-box" style={{ background: '#F8FAFC', borderColor: '#163A63' }}>
          <div style={{ fontWeight: 700, color: '#163A63', marginBottom: '4px' }}>
            Official Access Credentials:
          </div>
          <div>Official ID: <strong>OFFICIAL001</strong></div>
          <div>Password: <strong>admin123</strong></div>
        </div>

        {error && (
          <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <Input
            label="Official ID / Username"
            name="officialId"
            value={officialId}
            onChange={(e) => setOfficialId(e.target.value)}
            placeholder="e.g. OFFICIAL001"
            required
            icon={UserCheck}
          />

          <Input
            label="Secure Access Key / Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
            icon={Lock}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={remember} 
                onChange={(e) => setRemember(e.target.checked)} 
              />
              <span>Remember me on this workstation</span>
            </label>
          </div>

          <Button type="submit" variant="official" block size="lg" icon={ArrowRight}>
            Official Sign In
          </Button>
        </form>

        <div style={{ marginTop: '1.75rem', background: '#F8FAFC', border: '1px solid var(--border-color)', padding: '0.85rem', borderRadius: '6px', display: 'flex', gap: '0.6rem', fontSize: '0.78rem', color: '#475569' }}>
          <ShieldAlert size={20} style={{ color: '#DC2626', flexShrink: 0 }} />
          <span>
            <strong>Secure Government Access:</strong> Authorized personnel only. Unauthorized access attempts to national land registry servers are monitored and punishable under Section 43 & 66 of the Information Technology Act.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OfficialLoginPage;