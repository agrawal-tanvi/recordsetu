import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  Layers, 
  MapPin, 
  Maximize2, 
  Plus, 
  Minus, 
  Compass, 
  User, 
  Shield, 
  CheckCircle2, 
  Lock 
} from 'lucide-react';
import { statesData } from '../../data/states';
import { CadastralSatelliteMap } from '../../assets/visuals';

const HeroPortalSection = () => {
  const navigate = useNavigate();

  // Search by location state
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [selectedDistrict, setSelectedDistrict] = useState('Lucknow');
  const [selectedTehsil, setSelectedTehsil] = useState('Lucknow Sadar');
  const [selectedVillage, setSelectedVillage] = useState('Gomti Nagar');

  // Search type radio
  const [searchBy, setSearchBy] = useState('khasra'); // 'khasra', 'khata', 'owner', 'ulpin'

  // Map view tab
  const [mapMode, setMapMode] = useState('satellite'); // 'map', 'satellite', 'hybrid'

  const stateObj = statesData.find(s => s.state === selectedState);
  const districtObj = stateObj?.districts.find(d => d.name === selectedDistrict);
  const tehsilObj = districtObj?.tehsils.find(t => t.name === selectedTehsil);

  const districts = stateObj ? stateObj.districts.map(d => d.name) : [];
  const tehsils = districtObj ? districtObj.tehsils.map(t => t.name) : [];
  const villages = tehsilObj ? tehsilObj.villages : [];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/land-records/search?state=${encodeURIComponent(selectedState)}&district=${encodeURIComponent(selectedDistrict)}&village=${encodeURIComponent(selectedVillage)}`);
  };

  return (
    <section className="hero-portal-section">
      <div className="container hero-three-column-grid">
        
        {/* COLUMN 1: Search Form Panel */}
        <div className="hero-form-panel">
          <div className="panel-title-block">
            <h2 className="title-hi">भारत के भूमि अभिलेखों तक आसान और विश्वसनीय पहुंच</h2>
            <p className="title-en">Simple, Secure & Trusted Access to Land Records</p>
          </div>

          <form onSubmit={handleHeroSearch}>
            {/* Cascading dropdowns 2x2 grid */}
            <div className="form-cascade-grid">
              <div className="cascade-item">
                <label>राज्य / State</label>
                <select 
                  value={selectedState} 
                  onChange={(e) => {
                    setSelectedState(e.target.value);
                    setSelectedDistrict('');
                    setSelectedTehsil('');
                    setSelectedVillage('');
                  }}
                >
                  {statesData.map(s => <option key={s.state} value={s.state}>{s.state}</option>)}
                </select>
              </div>

              <div className="cascade-item">
                <label>जिला / District</label>
                <select 
                  value={selectedDistrict} 
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value);
                    setSelectedTehsil('');
                    setSelectedVillage('');
                  }}
                >
                  <option value="">Select District</option>
                  {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div className="cascade-item">
                <label>तहसील / Tehsil</label>
                <select 
                  value={selectedTehsil} 
                  onChange={(e) => {
                    setSelectedTehsil(e.target.value);
                    setSelectedVillage('');
                  }}
                >
                  <option value="">Select Tehsil</option>
                  {tehsils.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="cascade-item">
                <label>ग्राम / Village</label>
                <select 
                  value={selectedVillage} 
                  onChange={(e) => setSelectedVillage(e.target.value)}
                >
                  <option value="">Select Village</option>
                  {villages.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
            </div>

            {/* Radio Filter Selector */}
            <div className="search-by-cluster">
              <div className="search-by-label">खोजें / Search by:</div>
              <div className="radio-options-row">
                <label className="radio-pill">
                  <input type="radio" name="searchFilter" checked={searchBy === 'khasra'} onChange={() => setSearchBy('khasra')} />
                  <span>खसरा संख्या<br/><small>Khasra Number</small></span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="searchFilter" checked={searchBy === 'khata'} onChange={() => setSearchBy('khata')} />
                  <span>खाता संख्या<br/><small>Khata Number</small></span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="searchFilter" checked={searchBy === 'owner'} onChange={() => setSearchBy('owner')} />
                  <span>स्वामी का नाम<br/><small>Owner Name</small></span>
                </label>
                <label className="radio-pill">
                  <input type="radio" name="searchFilter" checked={searchBy === 'ulpin'} onChange={() => setSearchBy('ulpin')} />
                  <span>ULPIN / भू-आधार<br/><small>ULPIN / Bhu-Aadhaar</small></span>
                </label>
              </div>
            </div>

            {/* Search Submit Button */}
            <button type="submit" className="btn-hero-search">
              <Search size={18} />
              <span>खोजें / Search Records</span>
            </button>
          </form>
        </div>

        {/* COLUMN 2: Live Cadastral / Satellite Map Component */}
        <div className="hero-map-panel">
          <div className="map-toolbar-top">
            <div className="map-tab-cluster">
              <button type="button" className={mapMode === 'map' ? 'active' : ''} onClick={() => setMapMode('map')}>नक्शा Map</button>
              <button type="button" className={mapMode === 'satellite' ? 'active' : ''} onClick={() => setMapMode('satellite')}>उपग्रह Satellite</button>
              <button type="button" className={mapMode === 'hybrid' ? 'active' : ''} onClick={() => setMapMode('hybrid')}>हाइब्रिड Hybrid</button>
            </div>
            <Link to="/maps" className="btn-full-map-link">
              <Maximize2 size={13} />
              <span>पूर्ण मानचित्र देखें View Full Map</span>
            </Link>
          </div>

          <div className="map-canvas-container">
            <CadastralSatelliteMap />

            {/* Floating map controls */}
            <div className="map-floating-controls">
              <button type="button" title="Zoom In"><Plus size={14} /></button>
              <button type="button" title="Zoom Out"><Minus size={14} /></button>
              <button type="button" title="Reset Orientation"><Compass size={14} /></button>
              <button type="button" title="Map Layers"><Layers size={14} /></button>
            </div>

            {/* Bottom Map Legend */}
            <div className="map-bottom-legend">
              <div className="legend-chip"><span className="dot dot-village"></span> ग्राम सीमा Village Boundary</div>
              <div className="legend-chip"><span className="dot dot-parcel"></span> खसरा सीमा Parcel Boundary</div>
              <div className="legend-chip"><span className="dot dot-road"></span> सड़क Roads</div>
              <div className="legend-chip"><span className="dot dot-water"></span> जल निकाय Water Bodies</div>
            </div>
          </div>
        </div>

        {/* COLUMN 3: Role-based Portal Access Cards */}
        <div className="hero-roles-panel">
          <div className="roles-heading-box">
            <div className="roles-hi">आप किस रूप में प्रवेश करना चाहते हैं?</div>
            <div className="roles-en">How would you like to access Record Setu?</div>
          </div>

          {/* Citizen Card */}
          <div className="role-entry-card citizen-card">
            <div className="role-card-header">
              <div className="role-icon-circle green-circle">
                <User size={20} />
              </div>
              <div>
                <div className="role-title-hi">नागरिक लॉगिन</div>
                <div className="role-title-en">CITIZEN LOGIN</div>
              </div>
            </div>
            <p className="role-summary-text">
              Search your land records, view maps, download verified documents and track requests.
            </p>
            <ul className="role-feature-bullets">
              <li><CheckCircle2 size={13} style={{ color: '#2E7D5B' }} /> Search Land Records</li>
              <li><CheckCircle2 size={13} style={{ color: '#2E7D5B' }} /> View Bhulekh / RoR</li>
              <li><CheckCircle2 size={13} style={{ color: '#2E7D5B' }} /> View Bhu-Naksha</li>
              <li><CheckCircle2 size={13} style={{ color: '#2E7D5B' }} /> Download Records</li>
              <li><CheckCircle2 size={13} style={{ color: '#2E7D5B' }} /> Track Applications</li>
            </ul>
            <div className="role-action-buttons">
              <Link to="/citizen/login" className="btn-role-primary green-btn">
                नागरिक लॉगिन Citizen Login
              </Link>
              <Link to="/land-records/search" className="btn-role-outline">
                बिना लॉगिन खोजें Search Without Login
              </Link>
            </div>
          </div>

          {/* Government Official Card */}
          <div className="role-entry-card official-card">
            <div className="role-card-header">
              <div className="role-icon-circle navy-circle">
                <Shield size={20} />
              </div>
              <div>
                <div className="role-title-hi">सरकारी अधिकारी</div>
                <div className="role-title-en">GOVERNMENT OFFICIAL</div>
              </div>
            </div>
            <p className="role-summary-text">
              For authorized revenue officials to digitize, verify and manage land records.
            </p>
            <ul className="role-feature-bullets">
              <li><CheckCircle2 size={13} style={{ color: '#245A94' }} /> Upload Legacy Documents</li>
              <li><CheckCircle2 size={13} style={{ color: '#245A94' }} /> AI/OCR Verification</li>
              <li><CheckCircle2 size={13} style={{ color: '#245A94' }} /> Record Validation</li>
              <li><CheckCircle2 size={13} style={{ color: '#245A94' }} /> GIS Parcel Management</li>
              <li><CheckCircle2 size={13} style={{ color: '#245A94' }} /> Reports & Analytics</li>
            </ul>
            <div className="role-action-buttons">
              <Link to="/official/login" className="btn-role-primary navy-btn">
                अधिकारी लॉगिन Official Login
              </Link>
            </div>
          </div>

          {/* Bottom Security Assurance Tag */}
          <div className="role-security-tag">
            <Lock size={13} />
            <span>सुरक्षित • पारदर्शी • जनहित में | Secure • Transparent • Citizen Centric</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroPortalSection;