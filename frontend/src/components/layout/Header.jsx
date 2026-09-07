import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { AshokaEmblem, DigitalIndiaLogo, AbhilekhSetuLogo } from '../../assets/visuals';
import { HelpCircle, Phone, User, LogOut } from 'lucide-react';

export const Header = () => {
  const {
    language,
    setLanguage,
    t,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize
  } = useLanguage();

  const { user, logout, isAuthenticated } = useAuth();

  const languages = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी' },
    { code: 'mr', label: 'मराठी' },
    { code: 'bn', label: 'বাংলা' }
  ];

  return (
    <header className="gov-header-main">
      <div className="container header-container">
        {/* Left: National Emblem & Department Information */}
        <div className="header-left-group">
          <div className="national-emblem-wrapper">
            <AshokaEmblem width={46} height={68} />
          </div>
          <div className="gov-dept-text">
            <h3 className="gov-india-title">{t('govTitle')}</h3>
            <h4 className="gov-dept-name">{t('deptTitle')}</h4>
            <p className="gov-program-name">{t('programTitle')}</p>
          </div>
        </div>

        {/* Center: AbhilekhSetu Brand Logo */}
        <Link to="/" className="portal-brand-center" title="AbhilekhSetu Portal Home">
          <div className="brand-logo-icon">
            <AbhilekhSetuLogo width={46} height={46} />
          </div>
          <div className="brand-titles-block">
            <h1 className="portal-main-name">{t('portalName')}</h1>
            <p className="portal-tagline-text">"{t('portalTagline')}"</p>
          </div>
        </Link>

        {/* Right: Digital India Logo, Language Switcher, Font Controls, Login */}
        <div className="header-right-group">
          <div className="header-controls-row">
            <DigitalIndiaLogo width={95} height={36} />

            {/* Language Switcher Pills */}
            <div className="language-pills-group" role="group" aria-label="Select Language">
              {languages.map(lang => (
                <button
                  key={lang.code}
                  type="button"
                  className={`lang-pill-btn ${language === lang.code ? 'active' : ''}`}
                  onClick={() => setLanguage(lang.code)}
                  aria-pressed={language === lang.code}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Font Resize Controls */}
            <div className="font-controls-group">
              <button type="button" className="font-ctrl-btn" onClick={decreaseFontSize} title="Decrease Font">A-</button>
              <button type="button" className="font-ctrl-btn" onClick={resetFontSize} title="Reset Font">A</button>
              <button type="button" className="font-ctrl-btn" onClick={increaseFontSize} title="Increase Font">A+</button>
            </div>
          </div>

          <div className="header-links-row">
            <Link to="/about" className="header-link-item">
              <HelpCircle size={13} /> {t('help')}
            </Link>
            <span style={{ color: '#CBD5E1' }}>|</span>
            <Link to="/grievance" className="header-link-item">
              <Phone size={13} /> {t('contactUs')}
            </Link>
            <span style={{ color: '#CBD5E1' }}>|</span>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 'bold', color: '#163A63' }}>{user.name}</span>
                <button type="button" onClick={logout} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#DC2626' }} title="Logout">
                  <LogOut size={13} />
                </button>
              </div>
            ) : (
              <Link to="/citizen/login" className="header-login-btn">
                <User size={12} /> {t('login')}
              </Link>
            )}

            <span className="header-motto-tag">🇮🇳 {t('serviceMotto')}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;