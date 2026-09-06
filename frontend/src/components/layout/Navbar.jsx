import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Home, FileText, Map, Upload, ShieldCheck, MessageSquare, Info, Search } from 'lucide-react';

export const Navbar = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [navSearchQuery, setNavSearchQuery] = useState('');

  const handleNavSearch = (e) => {
    e.preventDefault();
    if (navSearchQuery.trim()) {
      navigate(`/land-records/search?q=${encodeURIComponent(navSearchQuery.trim())}`);
    } else {
      navigate('/land-records/search');
    }
  };

  const navItems = [
    { path: '/', label: t('navHome'), icon: Home, end: true },
    { path: '/land-records/search', label: t('navLandRecords'), icon: FileText },
    { path: '/maps', label: t('navBhuNaksha'), icon: Map },
    { path: '/upload', label: t('navUpload'), icon: Upload },
    { path: '/verify', label: t('navVerify'), icon: ShieldCheck },
    { path: '/grievance', label: t('navGrievance'), icon: MessageSquare },
    { path: '/about', label: t('navAbout'), icon: Info },
  ];

  return (
    <nav className="gov-main-navbar" aria-label="Main Navigation">
      <div className="container navbar-container">
        <ul className="navbar-links-list">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className="navbar-link-item">
                <NavLink
                  to={item.path}
                  end={item.end}
                  className={({ isActive }) =>
                    `nav-link-anchor ${isActive ? 'active-nav-link' : ''}`
                  }
                >
                  <Icon size={15} className="nav-icon" />
                  <span className="nav-link-text">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <form onSubmit={handleNavSearch} className="navbar-quicksearch-form">
          <input
            type="text"
            className="navbar-search-input"
            placeholder={t('searchPlaceholderNav')}
            value={navSearchQuery}
            onChange={(e) => setNavSearchQuery(e.target.value)}
          />
          <button type="submit" className="navbar-search-btn" title={t('search')}>
            <Search size={15} />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;