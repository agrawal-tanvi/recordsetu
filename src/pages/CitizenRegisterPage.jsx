import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { statesData } from '../data/states';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';

const CitizenRegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    state: '',
    district: '',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const currentDistricts = formData.state 
    ? (statesData.find(s => s.state === formData.state)?.districts.map(d => d.name) || [])
    : [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreeTerms) {
      setError('You must accept the terms and conditions.');
      return;
    }

    setError('');
    setSuccess(true);
    setTimeout(() => {
      navigate('/citizen/login');
    }, 2000);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card" style={{ maxWidth: '580px' }}>
        <div className="auth-header">
          <div className="gov-badge-emblem">
            <UserPlus size={14} />
            <span>NEW REGISTRATION</span>
          </div>
          <h2>Citizen Registration</h2>
          <p style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Create an account to manage, verify and petition your land holdings.
          </p>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={48} style={{ color: 'var(--success)', margin: '0 auto 1rem' }} />
            <h3 style={{ color: 'var(--primary-navy)' }}>Account Created Successfully</h3>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
              Redirecting to citizen login portal...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <div className="form-grid-2">
              <Input
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="As per Aadhaar card"
                required
              />
              <Input
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile"
                required
              />
            </div>

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />

            <div className="form-grid-2">
              <Select
                label="State"
                name="state"
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value, district: '' }))}
                options={statesData.map(s => s.state)}
                placeholder="Select State"
                required
              />

              <Select
                label="District"
                name="district"
                value={formData.district}
                onChange={handleChange}
                options={currentDistricts}
                placeholder="Select District"
                disabled={!formData.state}
                required
              />
            </div>

            <div className="form-grid-2">
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min 8 characters"
                required
              />

              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                required
              />
            </div>

            <div style={{ margin: '1rem 0 1.5rem', fontSize: '0.85rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <span>I agree to the government digital services terms and conditions.</span>
              </label>
            </div>

            <Button type="submit" variant="primary" block size="lg">
              Create Citizen Account
            </Button>

            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
              Already have an account?{' '}
              <Link to="/citizen/login" style={{ fontWeight: 600, color: 'var(--government-blue)' }}>
                Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CitizenRegisterPage;