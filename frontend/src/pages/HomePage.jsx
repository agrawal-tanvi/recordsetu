import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { statesData } from '../data/states';
import {
  CadastralMapPreview,
  DocumentPreviewGraphic,
  FarmerIllustration,
  AIVerificationFlowGraphic,
  LegacyScannedDeedGraphic
} from '../assets/visuals';
import {
  Search,
  MapPin,
  FileText,
  Map,
  ShieldCheck,
  UserCheck,
  Building2,
  CheckCircle,
  ArrowRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  Layers,
  ChevronRight,
  FileCheck
} from 'lucide-react';

export const HomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Search Card State
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Sitapur');
  const [selectedTehsil, setSelectedTehsil] = useState('Rampur');
  const [selectedVillage, setSelectedVillage] = useState('Khairpur');
  const [searchCriteria, setSearchCriteria] = useState('khasra');
  const [searchQueryValue, setSearchQueryValue] = useState('');

  // Map Tab State in Hero
  const [activeMapLayer, setActiveMapLayer] = useState('satellite');

  // Derive districts and tehsils
  const currentStateObj = statesData.find(s => s.state === selectedState) || statesData[0];
  const currentDistricts = currentStateObj ? currentStateObj.districts : [];
  const currentDistrictObj = currentDistricts.find(d => d.name === selectedDistrict) || currentDistricts[0];
  const currentTehsils = currentDistrictObj ? currentDistrictObj.tehsils : [];
  const currentTehsilObj = currentTehsils.find(t => t.name === selectedTehsil) || currentTehsils[0];
  const currentVillages = currentTehsilObj ? currentTehsilObj.villages : ['Khairpur', 'Rampur', 'Shahpur'];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const queryParam = searchQueryValue.trim() ? `&q=${encodeURIComponent(searchQueryValue.trim())}` : '';
    navigate(`/land-records/search?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}&tehsil=${encodeURIComponent(selectedTehsil)}&village=${encodeURIComponent(selectedVillage)}&criteria=${searchCriteria}${queryParam}`);
  };

  return (
    <div className="home-page-container">
      {/* 1. NATIONAL STAT RIBBON */}
      <section className="gov-stat-ribbon-bar">
        <div className="container stat-ribbon-grid">
          <div className="stat-ribbon-item">
            <span className="stat-icon-em">🏛️</span>
            <div>
              <h4 className="stat-number-callout">{t('stat1Val')}</h4>
              <p className="stat-label-text">{t('stat1Label')}</p>
            </div>
          </div>

          <div className="stat-ribbon-item">
            <span className="stat-icon-em">🗺️</span>
            <div>
              <h4 className="stat-number-callout">{t('stat2Val')}</h4>
              <p className="stat-label-text">{t('stat2Label')}</p>
            </div>
          </div>

          <div className="stat-ribbon-item">
            <span className="stat-icon-em">🏢</span>
            <div>
              <h4 className="stat-number-callout">{t('stat3Val')}</h4>
              <p className="stat-label-text">{t('stat3Label')}</p>
            </div>
          </div>

          <div className="stat-ribbon-item">
            <span className="stat-icon-em">📑</span>
            <div>
              <h4 className="stat-number-callout">{t('stat4Val')}</h4>
              <p className="stat-label-text">{t('stat4Label')}</p>
            </div>
          </div>

          <div className="stat-ribbon-banner-callout">
            <span className="farmer-badge-icon">🌾</span>
            <span className="farmer-badge-text">{t('farmerMotto')}</span>
          </div>
        </div>
      </section>

      {/* 2. HERO SECTION WITH 3-PANEL GRID */}
      <section className="gov-hero-section">
        <div className="hero-backdrop-overlay"></div>
        <div className="container hero-content-container">
          <div className="hero-header-banner">
            <h2 className="hero-main-title">{t('heroTitle')}</h2>
            <p className="hero-main-sub">{t('heroSubtitle')}</p>
          </div>

          <div className="hero-3panel-grid">
            {/* PANEL 1: CASCADING LAND RECORD SEARCH CARD */}
            <div className="hero-card hero-search-card">
              <div className="card-top-header">
                <MapPin size={18} className="text-secondary-blue" />
                <h3 className="card-top-title">{t('searchCardTitle')}</h3>
              </div>

              <form onSubmit={handleHeroSearch} className="hero-search-form">
                {/* 4 Cascading Dropdowns */}
                <div className="search-inputs-grid">
                  <div className="field-group">
                    <label className="field-label">{t('stateLabel')}</label>
                    <select
                      className="field-select"
                      value={selectedState}
                      onChange={(e) => {
                        setSelectedState(e.target.value);
                        const st = statesData.find(s => s.state === e.target.value);
                        if (st && st.districts.length > 0) {
                          setSelectedDistrict(st.districts[0].name);
                        }
                      }}
                    >
                      {statesData.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="field-label">{t('districtLabel')}</label>
                    <select
                      className="field-select"
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        const dist = currentDistricts.find(d => d.name === e.target.value);
                        if (dist && dist.tehsils.length > 0) {
                          setSelectedTehsil(dist.tehsils[0].name);
                        }
                      }}
                    >
                      {currentDistricts.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="field-label">{t('tehsilLabel')}</label>
                    <select
                      className="field-select"
                      value={selectedTehsil}
                      onChange={(e) => setSelectedTehsil(e.target.value)}
                    >
                      {currentTehsils.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="field-label">{t('villageLabel')}</label>
                    <select
                      className="field-select"
                      value={selectedVillage}
                      onChange={(e) => setSelectedVillage(e.target.value)}
                    >
                      {currentVillages.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                </div>

                {/* Search By Radio Options */}
                <div className="search-by-criteria-block">
                  <span className="criteria-label">{t('searchByLabel')}:</span>
                  <div className="radio-options-row">
                    <label className="radio-pill">
                      <input
                        type="radio"
                        name="criteria"
                        value="khasra"
                        checked={searchCriteria === 'khasra'}
                        onChange={() => setSearchCriteria('khasra')}
                      />
                      <span>{t('khasraNumber')}</span>
                    </label>

                    <label className="radio-pill">
                      <input
                        type="radio"
                        name="criteria"
                        value="khata"
                        checked={searchCriteria === 'khata'}
                        onChange={() => setSearchCriteria('khata')}
                      />
                      <span>{t('khataNumber')}</span>
                    </label>

                    <label className="radio-pill">
                      <input
                        type="radio"
                        name="criteria"
                        value="owner"
                        checked={searchCriteria === 'owner'}
                        onChange={() => setSearchCriteria('owner')}
                      />
                      <span>{t('ownerName')}</span>
                    </label>

                    <label className="radio-pill">
                      <input
                        type="radio"
                        name="criteria"
                        value="ulpin"
                        checked={searchCriteria === 'ulpin'}
                        onChange={() => setSearchCriteria('ulpin')}
                      />
                      <span>{t('ulpinAadhaar')}</span>
                    </label>
                  </div>
                </div>

                {/* Input for selected criteria */}
                <div className="criteria-input-row">
                  <input
                    type="text"
                    className="criteria-text-input"
                    placeholder={t('placeholderSearchCriteria')}
                    value={searchQueryValue}
                    onChange={(e) => setSearchQueryValue(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-search-hero">
                  <Search size={16} />
                  <span>{t('btnSearchRecords')}</span>
                </button>
              </form>
            </div>

            {/* PANEL 2: INTERACTIVE BHU-NAKSHA MAP PREVIEW */}
            <div className="hero-card hero-map-card">
              {/* Map Layer Switcher Header */}
              <div className="map-card-topbar">
                <div className="map-layer-pills">
                  <button
                    type="button"
                    className={`map-pill-btn ${activeMapLayer === 'cadastral' ? 'active' : ''}`}
                    onClick={() => setActiveMapLayer('cadastral')}
                  >
                    {t('tabCadastral')}
                  </button>
                  <button
                    type="button"
                    className={`map-pill-btn ${activeMapLayer === 'satellite' ? 'active' : ''}`}
                    onClick={() => setActiveMapLayer('satellite')}
                  >
                    {t('tabSatellite')}
                  </button>
                  <button
                    type="button"
                    className={`map-pill-btn ${activeMapLayer === 'hybrid' ? 'active' : ''}`}
                    onClick={() => setActiveMapLayer('hybrid')}
                  >
                    {t('tabHybrid')}
                  </button>
                </div>

                <Link to="/maps" className="btn-view-fullscreen-map">
                  <Maximize2 size={13} />
                  <span>{t('btnViewFullMap')}</span>
                </Link>
              </div>

              {/* Cadastral Interactive Visual Map */}
              <div className="map-viewport-frame">
                <CadastralMapPreview layer={activeMapLayer} activePlot="124/2" />
                
                {/* Floating Map Zoom Controls */}
                <div className="map-floating-controls">
                  <button type="button" className="map-zoom-btn" title="Zoom In"><ZoomIn size={14} /></button>
                  <button type="button" className="map-zoom-btn" title="Zoom Out"><ZoomOut size={14} /></button>
                  <button type="button" className="map-zoom-btn" title="Toggle Layers"><Layers size={14} /></button>
                </div>

                {/* Map Scale & Legend */}
                <div className="map-overlay-legend">
                  <div className="legend-item"><span className="legend-color village-box"></span> {t('villageBoundary')}</div>
                  <div className="legend-item"><span className="legend-color parcel-box"></span> {t('parcelBoundary')}</div>
                  <div className="legend-item"><span className="legend-color road-box"></span> {t('roads')}</div>
                  <div className="legend-item"><span className="legend-color water-box"></span> {t('waterBodies')}</div>
                </div>
              </div>
            </div>

            {/* PANEL 3: DUAL ACCESS GATEWAY (CITIZEN & OFFICIAL) */}
            <div className="hero-card hero-gateway-card">
              <div className="gateway-heading-wrap">
                <h3 className="gateway-main-title">{t('accessGatewayTitle')}</h3>
              </div>

              <div className="gateway-columns-split">
                {/* Left Column: Citizen Login */}
                <div className="gateway-column-box citizen-box">
                  <div className="box-avatar-header">
                    <div className="avatar-icon-circle citizen-avatar">
                      <UserCheck size={22} />
                    </div>
                    <h4 className="portal-type-title">{t('citizenTitle')}</h4>
                  </div>
                  <p className="portal-type-desc">{t('citizenDesc')}</p>
                  
                  <ul className="portal-features-list">
                    <li><CheckCircle size={13} className="text-success" /> {t('citizenPoint1')}</li>
                    <li><CheckCircle size={13} className="text-success" /> {t('citizenPoint2')}</li>
                    <li><CheckCircle size={13} className="text-success" /> {t('citizenPoint3')}</li>
                    <li><CheckCircle size={13} className="text-success" /> {t('citizenPoint4')}</li>
                    <li><CheckCircle size={13} className="text-success" /> {t('citizenPoint5')}</li>
                  </ul>

                  <Link to="/citizen/login" className="btn btn-gateway btn-citizen-gateway">
                    {t('btnCitizenLogin')}
                  </Link>
                  <Link to="/land-records/search" className="btn-subtext-link">
                    {t('btnSearchWithoutLogin')}
                  </Link>
                </div>

                {/* Right Column: Government Official Login */}
                <div className="gateway-column-box official-box">
                  <div className="box-avatar-header">
                    <div className="avatar-icon-circle official-avatar">
                      <Building2 size={22} />
                    </div>
                    <h4 className="portal-type-title">{t('officialTitle')}</h4>
                  </div>
                  <p className="portal-type-desc">{t('officialDesc')}</p>

                  <ul className="portal-features-list">
                    <li><CheckCircle size={13} className="text-primary-blue" /> {t('officialPoint1')}</li>
                    <li><CheckCircle size={13} className="text-primary-blue" /> {t('officialPoint2')}</li>
                    <li><CheckCircle size={13} className="text-primary-blue" /> {t('officialPoint3')}</li>
                    <li><CheckCircle size={13} className="text-primary-blue" /> {t('officialPoint4')}</li>
                    <li><CheckCircle size={13} className="text-primary-blue" /> {t('officialPoint5')}</li>
                  </ul>

                  <Link to="/citizen/login" className="btn btn-gateway btn-official-gateway">
                    {t('btnOfficialLogin')}
                  </Link>
                </div>
              </div>

              <div className="gateway-secure-tagline">
                <span>🔒 {t('secureCitizenCentric')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY SERVICES & FARMER BANNER SECTION */}
      <section className="gov-services-banner-section">
        <div className="container">
          <div className="section-title-strip">
            <h3 className="section-main-heading">{t('servicesTitle')}</h3>
            <div className="title-rule-line"></div>
          </div>

          <div className="services-and-farmer-grid">
            {/* 3 Key Service Cards */}
            <div className="three-services-cards">
              {/* Service 1: Bhulekh */}
              <div className="service-feature-card">
                <div className="service-number-badge">1</div>
                <div className="service-card-body">
                  <h4 className="service-feature-title">{t('service1Title')}</h4>
                  <p className="service-feature-desc">{t('service1Desc')}</p>
                  <div className="service-doc-thumb">
                    <DocumentPreviewGraphic width={90} height={110} />
                  </div>
                  <Link to="/land-records/search" className="btn btn-service-action">
                    <span>{t('btnViewRecords')}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Service 2: Bhu-Naksha */}
              <div className="service-feature-card">
                <div className="service-number-badge">2</div>
                <div className="service-card-body">
                  <h4 className="service-feature-title">{t('service2Title')}</h4>
                  <p className="service-feature-desc">{t('service2Desc')}</p>
                  <div className="service-doc-thumb">
                    <CadastralMapPreview width={130} height={95} isThumb={true} />
                  </div>
                  <Link to="/maps" className="btn btn-service-action">
                    <span>{t('btnOpenMap')}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Service 3: AI Verification */}
              <div className="service-feature-card">
                <div className="service-number-badge">3</div>
                <div className="service-card-body">
                  <h4 className="service-feature-title">{t('service3Title')}</h4>
                  <p className="service-feature-desc">{t('service3Desc')}</p>
                  <div className="service-doc-thumb">
                    <AIVerificationFlowGraphic width={130} height={70} />
                  </div>
                  <Link to="/upload" className="btn btn-service-action">
                    <span>{t('btnUploadVerify')}</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Farmer Mission Banner on the Right */}
            <div className="farmer-mission-card">
              <div className="farmer-photo-block">
                <FarmerIllustration width={140} height={140} />
              </div>
              <div className="farmer-quote-content">
                <blockquote className="farmer-quote-text">
                  "{t('farmerQuote')}"
                </blockquote>
                <p className="farmer-sub-text">{t('farmerSubText')}</p>
                <Link to="/about" className="btn btn-farmer-mission">
                  <span>{t('btnKnowMission')}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUR BOTTOM INTERACTIVE PANELS (Dashboard, Officer, AI Verification, Bhu-Naksha) */}
      <section className="gov-interactive-previews-section">
        <div className="container">
          <div className="section-title-strip">
            <h3 className="section-main-heading">{t('liveServicesTitle')}</h3>
            <div className="title-rule-line"></div>
          </div>

          <div className="four-panels-preview-grid">
            {/* Panel 1: Citizen Dashboard Preview */}
            <div className="preview-panel-card">
              <div className="panel-card-header">
                <div className="panel-header-left">
                  <UserCheck size={16} />
                  <h4>{t('citizenTitle')}</h4>
                </div>
                <Link to="/citizen/dashboard" className="panel-view-all">{t('viewAll')}</Link>
              </div>
              <div className="panel-card-body">
                <div className="dash-user-welcome">
                  <div className="user-icon-circle">👤</div>
                  <div>
                    <h5>{t('welcomeCitizen')}</h5>
                    <span className="user-aadhaar-tag">{t('aadhaarVerified')}</span>
                  </div>
                </div>
                <div className="dash-quick-shortcuts-grid">
                  <Link to="/land-records/search" className="shortcut-box">
                    <FileText size={18} />
                    <span>{t('shortcutSearchRecord')}</span>
                  </Link>
                  <Link to="/maps" className="shortcut-box">
                    <Map size={18} />
                    <span>{t('shortcutViewMap')}</span>
                  </Link>
                  <Link to="/land-records/search" className="shortcut-box">
                    <FileText size={18} />
                    <span>{t('shortcutViewKhatauni')}</span>
                  </Link>
                  <Link to="/applications/new" className="shortcut-box">
                    <FileCheck size={18} />
                    <span>{t('shortcutApplyMutation')}</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Panel 2: Official Dashboard Preview */}
            <div className="preview-panel-card">
              <div className="panel-card-header">
                <div className="panel-header-left">
                  <Building2 size={16} />
                  <h4>{t('officialTitle')}</h4>
                </div>
                <Link to="/citizen/login" className="panel-view-all">{t('viewAll')}</Link>
              </div>
              <div className="panel-card-body">
                <div className="official-officer-row">
                  <span className="officer-badge">RO</span>
                  <div>
                    <h5>{t('officerName')}</h5>
                    <span className="officer-jurisdiction">{t('officerJurisdiction')}</span>
                  </div>
                </div>
                <div className="officer-metrics-grid">
                  <div className="metric-cell">
                    <strong className="text-primary-navy">1,248</strong>
                    <span>{t('metricReceived')}</span>
                  </div>
                  <div className="metric-cell">
                    <strong className="text-info">1,102</strong>
                    <span>{t('metricProcessed')}</span>
                  </div>
                  <div className="metric-cell">
                    <strong className="text-success">934</strong>
                    <span>{t('metricVerified')}</span>
                  </div>
                  <div className="metric-cell">
                    <strong className="text-warning">168</strong>
                    <span>{t('metricReview')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: AI Verification Preview */}
            <div className="preview-panel-card">
              <div className="panel-card-header">
                <div className="panel-header-left">
                  <ShieldCheck size={16} />
                  <h4>{t('aiDeskTitle')}</h4>
                </div>
                <Link to="/verify" className="panel-view-all">{t('viewAll')}</Link>
              </div>
              <div className="panel-card-body">
                <div className="ai-split-preview">
                  <div className="scanned-thumb-side">
                    <LegacyScannedDeedGraphic width={100} height={120} />
                  </div>
                  <div className="extracted-meta-side">
                    <table className="mini-meta-table">
                      <tbody>
                        <tr><td>{t('labelOwner')}</td><td><strong>Ram Kumar</strong> <span className="conf-tag">98%</span></td></tr>
                        <tr><td>{t('labelKhasra')}</td><td><strong>124/2</strong> <span className="conf-tag">99%</span></td></tr>
                        <tr><td>{t('labelVillage')}</td><td><strong>Khairpur</strong> <span className="conf-tag">97%</span></td></tr>
                        <tr><td>{t('labelArea')}</td><td><strong>1.25 Ha</strong> <span className="conf-tag">96%</span></td></tr>
                      </tbody>
                    </table>
                    <div className="ai-preview-actions">
                      <Link to="/review-queue" className="btn-mini-approve">{t('btnApprove')}</Link>
                      <Link to="/review-queue" className="btn-mini-review">{t('btnReview')}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 4: Cadastral Bhu-Naksha Mini Preview */}
            <div className="preview-panel-card">
              <div className="panel-card-header">
                <div className="panel-header-left">
                  <Map size={16} />
                  <h4>{t('nakshaTitle')}</h4>
                </div>
                <Link to="/maps" className="panel-view-all">{t('viewAll')}</Link>
              </div>
              <div className="panel-card-body">
                <div className="naksha-split-preview">
                  <div className="naksha-mini-map">
                    <CadastralMapPreview width={110} height={120} activePlot="124/2" isThumb={true} />
                  </div>
                  <div className="naksha-plot-info">
                    <table className="mini-meta-table">
                      <tbody>
                        <tr><td>{t('labelPlot')}</td><td><strong>124/2</strong></td></tr>
                        <tr><td>{t('labelOwner')}</td><td><strong>Ram Kumar</strong></td></tr>
                        <tr><td>{t('labelArea')}</td><td><strong>1.25 Ha</strong></td></tr>
                        <tr><td>{t('statusVerified')}:</td><td><span className="status-verified-tag">{t('statusVerified')}</span></td></tr>
                      </tbody>
                    </table>
                    <div className="plot-preview-actions">
                      <Link to="/land-records/search?q=124/2" className="btn-mini-action">{t('btnViewRoR')}</Link>
                      <Link to="/maps" className="btn-mini-action">{t('btnMap')}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
