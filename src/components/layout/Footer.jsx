import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { AshokaEmblem, TricolorRibbon } from '../../assets/visuals';
import { Phone, Mail, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="gov-footer-main">
      {/* Top Tricolor Decorative Strip */}
      <div className="footer-tricolor-strip"></div>

      {/* Main 4-Column Section */}
      <div className="gov-footer-top">
        <div className="container footer-grid-container">
          {/* Column 1: Government Mission */}
          <div className="footer-col-mission">
            <div className="footer-emblem-row">
              <AshokaEmblem width={36} height={52} />
              <div>
                <h4 className="footer-gov-title">{t('govTitle') || 'Government of India'}</h4>
                <p className="footer-dept-title">{t('deptTitle') || 'Department of Land Resources'}</p>
                <p className="footer-prog-sub">{t('programTitle') || 'Digital India Land Records Modernisation Programme (DILRMP)'}</p>
              </div>
            </div>
            <p className="footer-mission-desc">
              RecordSetu connects citizens, farmers, and administrators to authentic digitized land ownership data, geo-referenced cadastral maps, and paperless revenue services across India.
            </p>
            <div className="footer-nic-badge">
              <span>🇮🇳 Designed, Developed & Hosted by National Informatics Centre (NIC)</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col-links">
            <h5 className="footer-col-heading">{t('footerQuickLinks') || 'Quick Links'}</h5>
            <ul className="footer-links-list">
              <li><Link to="/">{t('navHome') || 'Home'}</Link></li>
              <li><Link to="/land-records/search">{t('navLandRecords') || 'Search Land Records'}</Link></li>
              <li><Link to="/maps">{t('navBhuNaksha') || 'Bhu-Naksha GIS Maps'}</Link></li>
              <li><Link to="/upload">{t('navUpload') || 'Upload & Digitize Deed'}</Link></li>
              <li><Link to="/verify">{t('navVerify') || 'Verify Authenticity'}</Link></li>
              <li><Link to="/grievance">{t('navGrievance') || 'Revenue Grievance Desk'}</Link></li>
            </ul>
          </div>

          {/* Column 3: Citizen Services */}
          <div className="footer-col-links">
            <h5 className="footer-col-heading">{t('footerCitizenServices') || 'Citizen Services'}</h5>
            <ul className="footer-links-list">
              <li><Link to="/citizen/login">Citizen Login (नागरिक लॉगिन)</Link></li>
              <li><Link to="/citizen/dashboard">Citizen Holding Dashboard</Link></li>
              <li><Link to="/services">All Revenue Services Directory</Link></li>
              <li><Link to="/applications">Track Application Status</Link></li>
              <li><Link to="/about">About DILRMP Mission</Link></li>
              <li><a href="https://dilrmp.gov.in" target="_blank" rel="noopener noreferrer">DILRMP National Portal ↗</a></li>
            </ul>
          </div>

          {/* Column 4: Helpline & Contact */}
          <div className="footer-col-contact">
            <h5 className="footer-col-heading">Help & Citizen Support</h5>
            <div className="footer-helpline-box">
              <div className="help-item">
                <Phone size={15} className="help-icon" />
                <div>
                  <span className="help-label">National Toll-Free Helpline</span>
                  <strong className="help-val">1800-11-2026</strong>
                  <span className="help-timing">09:00 AM – 06:00 PM (Mon – Sat)</span>
                </div>
              </div>
              <div className="help-item">
                <Mail size={15} className="help-icon" />
                <div>
                  <span className="help-label">Official Support Email</span>
                  <strong className="help-val">support-recordsetu@gov.in</strong>
                </div>
              </div>
            </div>
            <div className="footer-secure-stamp">
              <ShieldCheck size={14} />
              <span>256-Bit SSL Encrypted • IT Act 2000 Compliant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Tricolor Ribbon & Copyright */}
      <div className="gov-footer-bottom">
        <div className="container footer-bottom-inner">
          <div className="footer-bottom-links">
            <Link to="/about">Terms of Use</Link>
            <span className="dot-sep">•</span>
            <Link to="/about">Privacy Policy</Link>
            <span className="dot-sep">•</span>
            <Link to="/about">Hyperlink Policy</Link>
            <span className="dot-sep">•</span>
            <Link to="/about">Accessibility Statement</Link>
            <span className="dot-sep">•</span>
            <span>Last Updated: 06 September 2026</span>
          </div>

          <div className="footer-bottom-right">
            <span className="footer-motto-callout">🇮🇳 Always at your service</span>
            <TricolorRibbon width={90} height={18} />
          </div>
        </div>
        <div className="container footer-legal-row">
          <p className="footer-copyright-note">
            © 2026 RecordSetu • Department of Land Resources, Ministry of Rural Development, Government of India. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;