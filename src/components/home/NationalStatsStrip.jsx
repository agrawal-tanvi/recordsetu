import React from 'react';
import { Home, Map, Building2, FileCheck } from 'lucide-react';

const NationalStatsStrip = () => {
  return (
    <div className="national-stats-container container">
      <div className="stats-ticker-grid">
        {/* Card 1: Computerized RoRs */}
        <div className="stat-ticker-box">
          <div className="stat-ticker-icon">
            <Home size={22} style={{ color: '#D97706' }} />
          </div>
          <div>
            <div className="ticker-val">6,25,137</div>
            <div className="ticker-label">गाँवों में कम्प्यूटरीकृत खसरा/खतौनी</div>
            <div className="ticker-sub">Villages with Computerized RoR</div>
          </div>
        </div>

        {/* Card 2: Cadastral Maps */}
        <div className="stat-ticker-box">
          <div className="stat-ticker-icon">
            <Map size={22} style={{ color: '#2563EB' }} />
          </div>
          <div>
            <div className="ticker-val">3.33 Lakh+</div>
            <div className="ticker-label">डिजिटाइज़्ड भू-नक्शा</div>
            <div className="ticker-sub">Digitized Cadastral Maps</div>
          </div>
        </div>

        {/* Card 3: SRO Offices */}
        <div className="stat-ticker-box">
          <div className="stat-ticker-icon">
            <Building2 size={22} style={{ color: '#163A63' }} />
          </div>
          <div>
            <div className="ticker-val">5,000+</div>
            <div className="ticker-label">उप-पंजीयक कार्यालय</div>
            <div className="ticker-sub">Sub-Registrar Offices</div>
          </div>
        </div>

        {/* Card 4: Digital Records */}
        <div className="stat-ticker-box">
          <div className="stat-ticker-icon">
            <FileCheck size={22} style={{ color: '#2E7D5B' }} />
          </div>
          <div>
            <div className="ticker-val">99%+</div>
            <div className="ticker-label">डिजिटल भूमि अभिलेख</div>
            <div className="ticker-sub">Digital Land Records</div>
          </div>
        </div>

        {/* Farmer Prosperity Banner */}
        <div className="ticker-prosperity-banner">
          <div className="banner-content">
            <div className="banner-hi">सशक्त किसान, समृद्ध भारत</div>
            <div className="banner-en">Empowered Farmers, Prosperous India</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalStatsStrip;