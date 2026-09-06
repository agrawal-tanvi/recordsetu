import React, { useState } from 'react';
import './CitizenLoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AshokaEmblem, RecordSetuLogo, TricolorRibbon } from '../assets/visuals';
import { 
  UserCheck, 
  Building2, 
  KeyRound, 
  ArrowRight, 
  ShieldCheck, 
  Smartphone, 
  Lock, 
  RefreshCw, 
  AlertCircle,
  Phone,
  Search,
  CheckCircle
} from 'lucide-react';

export const CitizenLoginPage = () => {
  const { loginAsCitizen, loginAsOfficial } = useAuth();
  const navigate = useNavigate();
  
  const [role, setRole] = useState('citizen'); // 'citizen' or 'official'
  const [mobileOrId, setMobileOrId] = useState('9876543210');
  const [otpOrPass, setOtpOrPass] = useState('123456');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('7R9K4');
  const [captchaError, setCaptchaError] = useState('');

  const refreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setCaptchaInput('');
    setCaptchaError('');
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (newRole === 'citizen') {
      setMobileOrId('9876543210');
      setOtpOrPass('123456');
    } else {
      setMobileOrId('OFFICIAL001');
      setOtpOrPass('admin123');
    }
    setCaptchaError('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setCaptchaError('Invalid Security Captcha code. Please enter the characters shown.');
      return;
    }

    if (role === 'citizen') {
      loginAsCitizen(mobileOrId);
      navigate('/citizen/dashboard');
    } else {
      loginAsOfficial(mobileOrId, otpOrPass);
      navigate('/citizen/dashboard');
    }
  };

  return (
    <div className="citizen-login-page-wrapper">
      <div className="login-card-container">
        {/* Tricolor Ribbon at top of Card */}
        <div className="login-card-tricolor-strip"></div>

        <div className="login-card-inner">
          {/* Emblem & Portal Branding */}
          <div className="login-portal-header">
            <div className="login-emblems-row">
              <AshokaEmblem width={38} height={52} />
              <div className="emblem-sep-line"></div>
              <RecordSetuLogo width={44} height={44} />
            </div>
            <span className="login-gov-dept-tag">
              भारत सरकार • GOVERNMENT OF INDIA | NIC SSO PORTAL
            </span>
            <h1 className="login-main-heading">
              RecordSetu Central Gateway
            </h1>
            <p className="login-main-subtext">
              सिंगल साइन-ऑन (SSO) डिजिटल पहचान प्रणाली • Digital Revenue Access
            </p>
          </div>

          {/* Role Switcher Tabs */}
          <div className="login-role-tabs-bar">
            <button
              type="button"
              className={`login-role-tab-btn ${role === 'citizen' ? 'active' : ''}`}
              onClick={() => handleRoleChange('citizen')}
            >
              <UserCheck size={16} />
              <span>नागरिक लॉगिन / Citizen</span>
            </button>
            <button
              type="button"
              className={`login-role-tab-btn ${role === 'official' ? 'active' : ''}`}
              onClick={() => handleRoleChange('official')}
            >
              <Building2 size={16} />
              <span>राजस्व अधिकारी / Official</span>
            </button>
          </div>

          {/* Demo Credentials Quick-Fill Banner */}
          <div className="login-demo-credentials-banner">
            <div className="demo-banner-header">
              <AlertCircle size={14} className="text-secondary-blue" />
              <strong>Quick Demo Access ({role === 'citizen' ? 'Citizen' : 'Officer'} Mode):</strong>
            </div>
            <div className="demo-credentials-text">
              {role === 'citizen' ? (
                <>
                  <span>Mobile: <strong>9876543210</strong></span>
                  <span className="demo-sep">•</span>
                  <span>OTP: <strong>123456</strong></span>
                  <span className="demo-sep">•</span>
                  <span>Captcha: <strong>{captchaCode}</strong></span>
                </>
              ) : (
                <>
                  <span>Officer ID: <strong>OFFICIAL001</strong></span>
                  <span className="demo-sep">•</span>
                  <span>Pass: <strong>admin123</strong></span>
                  <span className="demo-sep">•</span>
                  <span>Captcha: <strong>{captchaCode}</strong></span>
                </>
              )}
            </div>
          </div>

          {/* Main Login Form */}
          <form onSubmit={handleLogin} className="login-fields-form">
            {/* Field 1: Identifier */}
            <div className="form-group">
              <label className="form-label">
                {role === 'citizen' 
                  ? 'आधार लिंक मोबाइल नंबर / Mobile Number' 
                  : 'राजस्व अधिकारी आईडी / Official Badge ID'} <span className="req-star">*</span>
              </label>
              <div className="login-input-with-icon">
                {role === 'citizen' ? (
                  <Smartphone size={17} className="login-field-icon" />
                ) : (
                  <Building2 size={17} className="login-field-icon" />
                )}
                <input
                  type={role === 'citizen' ? 'tel' : 'text'}
                  value={mobileOrId}
                  onChange={(e) => setMobileOrId(e.target.value)}
                  required
                  placeholder={role === 'citizen' ? '10-digit registered mobile number' : 'e.g. OFFICIAL001 or RO-UP-8841'}
                  className="gov-input login-text-input"
                />
              </div>
            </div>

            {/* Field 2: Password / OTP */}
            <div className="form-group">
              <div className="label-with-hint-row">
                <label className="form-label">
                  {role === 'citizen' 
                    ? 'ओटीपी सत्यापन कोड / OTP Code' 
                    : 'सुरक्षा पासवर्ड / Passcode'} <span className="req-star">*</span>
                </label>
                {role === 'citizen' && (
                  <button 
                    type="button" 
                    className="resend-otp-btn"
                    onClick={() => alert('Demo OTP "123456" resent to ' + mobileOrId)}
                  >
                    Resend OTP
                  </button>
                )}
              </div>
              <div className="login-input-with-icon">
                {role === 'citizen' ? (
                  <KeyRound size={17} className="login-field-icon" />
                ) : (
                  <Lock size={17} className="login-field-icon" />
                )}
                <input
                  type="password"
                  value={otpOrPass}
                  onChange={(e) => setOtpOrPass(e.target.value)}
                  required
                  placeholder={role === 'citizen' ? '6-digit OTP (123456)' : 'Enter security passcode'}
                  className="gov-input login-text-input"
                />
              </div>
            </div>

            {/* Field 3: Captcha Verification */}
            <div className="form-group">
              <label className="form-label">
                सुरक्षा कोड / Security Captcha <span className="req-star">*</span>
              </label>
              <div className="login-captcha-row">
                <div className="captcha-display-box" title="Case-insensitive security captcha">
                  <span className="captcha-code-text">{captchaCode}</span>
                </div>
                <button
                  type="button"
                  className="btn-refresh-captcha"
                  onClick={refreshCaptcha}
                  title="Generate new Captcha"
                >
                  <RefreshCw size={15} />
                </button>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(''); }}
                  required
                  placeholder={`Enter ${captchaCode}`}
                  className="gov-input captcha-input-box"
                />
              </div>
              {captchaError && (
                <span className="captcha-error-msg">{captchaError}</span>
              )}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              className="btn btn-primary btn-lg btn-login-submit"
            >
              <span>डैशबोर्ड में प्रवेश करें / Proceed to Dashboard</span>
              <ArrowRight size={17} />
            </button>
          </form>

          {/* Quick Links Row */}
          <div className="login-sub-links-row">
            <Link to="/land-records/search" className="sub-link-item">
              <Search size={13} />
              <span>Search Without Login</span>
            </Link>
            <span className="link-divider">|</span>
            <Link to="/grievance" className="sub-link-item">
              <span>Lodge Grievance</span>
            </Link>
            <span className="link-divider">|</span>
            <a href="tel:1800112026" className="sub-link-item">
              <Phone size={13} />
              <span>Helpline: 1800-11-2026</span>
            </a>
          </div>

          {/* Legal Compliance Notice */}
          <div className="login-legal-warning-box">
            <ShieldCheck size={16} className="text-secondary-blue" />
            <p>
              <strong>वैधानिक चेतावनी:</strong> सूचना प्रौद्योगिकी अधिनियम (IT Act), 2000 की धारा 66 के अंतर्गत राज्य के राजस्व डेटाबेस में अनधिकृत प्रवेश या डेटा छेड़छाड़ एक दंडनीय अपराध है।
            </p>
          </div>

          {/* Security Certifications Footer */}
          <div className="login-security-footer">
            <span>🔒 256-Bit SSL Encrypted</span>
            <span className="sec-sep">•</span>
            <span>Cert-In Empanelled</span>
            <span className="sec-sep">•</span>
            <span>NIC National Cloud</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenLoginPage;
