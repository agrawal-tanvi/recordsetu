import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BhuNakshaPage.css';
import { 
  MapPin, 
  Layers, 
  Printer, 
  Download, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  ShieldCheck, 
  FileText, 
  Compass, 
  ExternalLink,
  CheckCircle2
} from 'lucide-react';

export const BhuNakshaPage = () => {
  const [mapLayer, setMapLayer] = useState('cadastral'); // 'cadastral', 'satellite', 'hybrid'
  const [selectedPlotId, setSelectedPlotId] = useState('45/2');
  const [zoomLevel, setZoomLevel] = useState(1);

  const plotsData = {
    '45/1': {
      id: '45/1',
      ulpin: 'UP-LKO-451-98123',
      owner: 'Suresh Chandra',
      father: 'Late Munna Lal',
      khata: 'KH-00141',
      area: '1.1000 Hectares (2.72 Acres)',
      type: 'Agricultural / Irrigated (फसली भूमि)',
      status: 'Digitally Geo-Referenced',
      village: 'Khairpur',
      tehsil: 'Mohanlalganj',
      district: 'Lucknow'
    },
    '45/2': {
      id: '45/2',
      ulpin: 'UP-LKO-452-98124',
      owner: 'Rajesh Kumar',
      father: 'Late Ramprasad Verma',
      khata: 'KH-00142',
      area: '1.4500 Hectares (3.58 Acres)',
      type: 'Agricultural / Irrigated (फसली भूमि)',
      status: 'Digitally Geo-Referenced',
      village: 'Khairpur',
      tehsil: 'Mohanlalganj',
      district: 'Lucknow'
    },
    '45/3': {
      id: '45/3',
      ulpin: 'UP-LKO-453-98125',
      owner: 'Anil Kumar Yadav',
      father: 'S/O Jagdish Yadav',
      khata: 'KH-00143',
      area: '0.9500 Hectares (2.35 Acres)',
      type: 'Agricultural / Irrigated (फसली भूमि)',
      status: 'Digitally Geo-Referenced',
      village: 'Khairpur',
      tehsil: 'Mohanlalganj',
      district: 'Lucknow'
    },
    '46/1': {
      id: '46/1',
      ulpin: 'UP-LKO-461-98126',
      owner: 'Gram Sabha / Panchayat Land',
      father: 'Public Land Ledger',
      khata: 'KH-00001',
      area: '1.3000 Hectares (3.21 Acres)',
      type: 'Gram Sabha / Pasture (चारागाह)',
      status: 'Digitally Geo-Referenced',
      village: 'Khairpur',
      tehsil: 'Mohanlalganj',
      district: 'Lucknow'
    },
    '46/2': {
      id: '46/2',
      ulpin: 'UP-LKO-462-98127',
      owner: 'Mahesh Prasad',
      father: 'Late Shiv Dayal',
      khata: 'KH-00144',
      area: '1.2000 Hectares (2.96 Acres)',
      type: 'Agricultural / Irrigated (फसली भूमि)',
      status: 'Digitally Geo-Referenced',
      village: 'Khairpur',
      tehsil: 'Mohanlalganj',
      district: 'Lucknow'
    },
    '47/1': {
      id: '47/1',
      ulpin: 'UP-LKO-471-98128',
      owner: 'Rameshwar Dayal',
      father: 'S/O Bhagwati Prasad',
      khata: 'KH-00145',
      area: '1.6000 Hectares (3.95 Acres)',
      type: 'Residential / Abadi (आबादी)',
      status: 'Digitally Geo-Referenced',
      village: 'Khairpur',
      tehsil: 'Mohanlalganj',
      district: 'Lucknow'
    }
  };

  const currentPlot = plotsData[selectedPlotId] || plotsData['45/2'];

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 1.8));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.7));
  const handleResetZoom = () => setZoomLevel(1);

  const isSat = mapLayer === 'satellite' || mapLayer === 'hybrid';

  return (
    <div className="bhu-naksha-page">
      {/* Header Bar */}
      <div className="page-header-bar">
        <div className="container header-bar-inner">
          <div>
            <div className="breadcrumbs">
              <span>Home</span> / <span>Land Records</span> / <strong>Bhu-Naksha GIS Portal</strong>
            </div>
            <span className="page-sub-badge">भू-नक्शा भू-स्थानिक पोर्टल | BHU-NAKSHA GIS PORTAL</span>
            <h1 className="page-title">डिजीटाइज़्ड भू-नक्शा व सर्वेक्षण मानचित्र • Cadastral GIS Map</h1>
            <p className="page-subtitle">
              Explore geo-referenced cadastral maps, boundary demarcations and village land parcel coordinates under the Digital India Land Records Modernization Programme.
            </p>
          </div>
          <div className="header-actions">
            <button type="button" className="btn btn-outline btn-sm" onClick={() => window.print()}>
              <Printer size={15} /> Print Map
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={() => alert('Downloading high-resolution Cadastral Map (PDF)...')}>
              <Download size={15} /> Download Map (PDF)
            </button>
          </div>
        </div>
      </div>

      <div className="container page-body-container">
        {/* Top Control Toolbar */}
        <div className="bhu-naksha-toolbar-card">
          <div className="layer-switcher-pills">
            <button
              type="button"
              className={`gis-layer-btn ${mapLayer === 'cadastral' ? 'active' : ''}`}
              onClick={() => setMapLayer('cadastral')}
            >
              कैडेस्ट्रल नक्शा / Cadastral
            </button>
            <button
              type="button"
              className={`gis-layer-btn ${mapLayer === 'satellite' ? 'active' : ''}`}
              onClick={() => setMapLayer('satellite')}
            >
              उपग्रह दृश्य / Satellite
            </button>
            <button
              type="button"
              className={`gis-layer-btn ${mapLayer === 'hybrid' ? 'active' : ''}`}
              onClick={() => setMapLayer('hybrid')}
            >
              हाइब्रिड / Hybrid
            </button>
          </div>

          <div className="active-mauza-info-pill">
            <MapPin size={16} className="text-primary-navy" />
            <span>
              मौजा: <strong>Khairpur (Khairpur)</strong> | तहसील: <strong>Mohanlalganj</strong> | जिला: <strong>Lucknow</strong>
            </span>
          </div>

          <div className="geo-wgs-badge">
            <CheckCircle2 size={13} />
            <span>WGS-84 / EPSG:4326 Geo-Referenced</span>
          </div>
        </div>

        {/* 2-Column Split: Map View + Parcel Inspector */}
        <div className="bhu-naksha-split-grid">
          
          {/* Left Column: Interactive Cadastral Map */}
          <div className="bhu-naksha-map-card">
            <div className="map-canvas-container">
              
              {/* Floating Map Zoom Controls */}
              <div className="map-floating-zoom-bar">
                <button type="button" className="map-ctrl-btn" onClick={handleZoomIn} title="Zoom In">
                  <ZoomIn size={15} />
                </button>
                <button type="button" className="map-ctrl-btn" onClick={handleZoomOut} title="Zoom Out">
                  <ZoomOut size={15} />
                </button>
                <button type="button" className="map-ctrl-btn" onClick={handleResetZoom} title="Reset View">
                  <RotateCcw size={15} />
                </button>
              </div>

              {/* Floating North Compass */}
              <div className="map-floating-compass" title="North Indicator">
                <div className="compass-circle">
                  <span className="compass-n">N</span>
                  <div className="compass-arrow-up"></div>
                  <div className="compass-arrow-down"></div>
                </div>
              </div>

              {/* Cadastral SVG Canvas */}
              <div className="map-svg-viewport">
                <svg
                  viewBox="0 0 540 360"
                  className="cadastral-svg-graphic"
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.25s ease'
                  }}
                >
                  <defs>
                    <pattern id="gisSatAgri" width="60" height="60" patternUnits="userSpaceOnUse">
                      <rect width="60" height="60" fill="#2D4727" />
                      <path d="M0 20h60M0 40h60" stroke="#3A5932" strokeWidth="1" strokeDasharray="3 3" />
                      <rect x="5" y="5" width="25" height="25" fill="#3D6334" fillOpacity="0.6" />
                      <rect x="35" y="25" width="20" height="30" fill="#283E23" fillOpacity="0.7" />
                    </pattern>
                    <pattern id="gisCadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <rect width="40" height="40" fill="#F8FAFC" />
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
                    </pattern>
                  </defs>

                  {/* Background Layer */}
                  <rect width="540" height="360" fill={isSat ? 'url(#gisSatAgri)' : 'url(#gisCadGrid)'} />

                  {/* Village Road (पक्की सड़क / Road) */}
                  <path
                    d="M 80 0 L 100 120 L 120 240 L 140 360"
                    stroke="#CBD5E1"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="5 5"
                  />
                  <text x="75" y="340" fontSize="8" fill="#94A3B8" fontWeight="600">पक्की मार्ग (Road)</text>

                  {/* Canal / Water Body (नहर / Canal) */}
                  <path
                    d="M 0 145 Q 120 165, 230 140 T 420 110 T 540 140"
                    stroke="#3B82F6"
                    strokeWidth="14"
                    fill="none"
                    strokeOpacity={isSat ? 0.9 : 0.7}
                  />
                  <text x="360" y="130" fontSize="8" fill="#3B82F6" fontWeight="bold">नहर (Canal)</text>

                  {/* Plot 45/1 */}
                  <g onClick={() => setSelectedPlotId('45/1')} style={{ cursor: 'pointer' }}>
                    <polygon
                      points="35,80 120,70 110,210 25,200"
                      fill={selectedPlotId === '45/1' ? '#F6DE95' : isSat ? '#3B6B38' : '#F8FAFC'}
                      fillOpacity={selectedPlotId === '45/1' ? 0.95 : isSat ? 0.5 : 0.85}
                      stroke={selectedPlotId === '45/1' ? '#D97706' : '#2D6A4F'}
                      strokeWidth={selectedPlotId === '45/1' ? 2.8 : 1.5}
                      strokeDasharray={selectedPlotId === '45/1' ? 'none' : '4 3'}
                    />
                    {selectedPlotId === '45/1' && (
                      <g transform="translate(75, 125)">
                        <path d="M 0,-18 C -7,-18 -12,-12 -12,-5 C -12,4 0,16 0,16 C 0,16 12,4 12,-5 C 12,-12 7,-18 0,-18 Z" fill="#1E40AF" />
                        <circle cx="0" cy="-6" r="4.5" fill="#FFFFFF" />
                      </g>
                    )}
                    <text x="75" y={selectedPlotId === '45/1' ? 160 : 145} fontSize="12" fontWeight="bold" fill="#163A63" textAnchor="middle">45/1</text>
                  </g>

                  {/* Plot 45/3 */}
                  <g onClick={() => setSelectedPlotId('45/3')} style={{ cursor: 'pointer' }}>
                    <polygon
                      points="130,65 240,60 230,195 125,205"
                      fill={selectedPlotId === '45/3' ? '#F6DE95' : isSat ? '#3B6B38' : '#F8FAFC'}
                      fillOpacity={selectedPlotId === '45/3' ? 0.95 : isSat ? 0.5 : 0.85}
                      stroke={selectedPlotId === '45/3' ? '#D97706' : '#2D6A4F'}
                      strokeWidth={selectedPlotId === '45/3' ? 2.8 : 1.5}
                      strokeDasharray={selectedPlotId === '45/3' ? 'none' : '4 3'}
                    />
                    {selectedPlotId === '45/3' && (
                      <g transform="translate(180, 115)">
                        <path d="M 0,-18 C -7,-18 -12,-12 -12,-5 C -12,4 0,16 0,16 C 0,16 12,4 12,-5 C 12,-12 7,-18 0,-18 Z" fill="#1E40AF" />
                        <circle cx="0" cy="-6" r="4.5" fill="#FFFFFF" />
                      </g>
                    )}
                    <text x="180" y={selectedPlotId === '45/3' ? 150 : 135} fontSize="12" fontWeight="bold" fill="#163A63" textAnchor="middle">45/3</text>
                  </g>

                  {/* Plot 46/1 */}
                  <g onClick={() => setSelectedPlotId('46/1')} style={{ cursor: 'pointer' }}>
                    <polygon
                      points="250,60 365,65 350,195 240,195"
                      fill={selectedPlotId === '46/1' ? '#F6DE95' : isSat ? '#3B6B38' : '#F8FAFC'}
                      fillOpacity={selectedPlotId === '46/1' ? 0.95 : isSat ? 0.5 : 0.85}
                      stroke={selectedPlotId === '46/1' ? '#D97706' : '#2D6A4F'}
                      strokeWidth={selectedPlotId === '46/1' ? 2.8 : 1.5}
                      strokeDasharray={selectedPlotId === '46/1' ? 'none' : '4 3'}
                    />
                    {selectedPlotId === '46/1' && (
                      <g transform="translate(300, 115)">
                        <path d="M 0,-18 C -7,-18 -12,-12 -12,-5 C -12,4 0,16 0,16 C 0,16 12,4 12,-5 C 12,-12 7,-18 0,-18 Z" fill="#1E40AF" />
                        <circle cx="0" cy="-6" r="4.5" fill="#FFFFFF" />
                      </g>
                    )}
                    <text x="300" y={selectedPlotId === '46/1' ? 150 : 135} fontSize="12" fontWeight="bold" fill="#163A63" textAnchor="middle">46/1</text>
                  </g>

                  {/* Plot 47/1 */}
                  <g onClick={() => setSelectedPlotId('47/1')} style={{ cursor: 'pointer' }}>
                    <polygon
                      points="35,215 110,225 100,345 25,335"
                      fill={selectedPlotId === '47/1' ? '#F6DE95' : isSat ? '#3B6B38' : '#F8FAFC'}
                      fillOpacity={selectedPlotId === '47/1' ? 0.95 : isSat ? 0.5 : 0.85}
                      stroke={selectedPlotId === '47/1' ? '#D97706' : '#2D6A4F'}
                      strokeWidth={selectedPlotId === '47/1' ? 2.8 : 1.5}
                      strokeDasharray={selectedPlotId === '47/1' ? 'none' : '4 3'}
                    />
                    {selectedPlotId === '47/1' && (
                      <g transform="translate(70, 260)">
                        <path d="M 0,-18 C -7,-18 -12,-12 -12,-5 C -12,4 0,16 0,16 C 0,16 12,4 12,-5 C 12,-12 7,-18 0,-18 Z" fill="#1E40AF" />
                        <circle cx="0" cy="-6" r="4.5" fill="#FFFFFF" />
                      </g>
                    )}
                    <text x="70" y={selectedPlotId === '47/1' ? 295 : 280} fontSize="12" fontWeight="bold" fill="#163A63" textAnchor="middle">47/1</text>
                  </g>

                  {/* Plot 45/2 (TARGET SELECTED PLOT IN SCREENSHOT) */}
                  <g onClick={() => setSelectedPlotId('45/2')} style={{ cursor: 'pointer' }}>
                    <polygon
                      points="125,215 235,205 220,345 115,335"
                      fill={selectedPlotId === '45/2' ? '#F6DE95' : isSat ? '#3B6B38' : '#F8FAFC'}
                      fillOpacity={selectedPlotId === '45/2' ? 0.95 : isSat ? 0.5 : 0.85}
                      stroke={selectedPlotId === '45/2' ? '#D97706' : '#2D6A4F'}
                      strokeWidth={selectedPlotId === '45/2' ? 2.8 : 1.5}
                      strokeDasharray={selectedPlotId === '45/2' ? 'none' : '4 3'}
                    />
                    {selectedPlotId === '45/2' && (
                      <g transform="translate(175, 252)">
                        <path d="M 0,-18 C -7,-18 -12,-12 -12,-5 C -12,4 0,16 0,16 C 0,16 12,4 12,-5 C 12,-12 7,-18 0,-18 Z" fill="#1E40AF" />
                        <circle cx="0" cy="-6" r="4.5" fill="#FFFFFF" />
                      </g>
                    )}
                    <text x="175" y={selectedPlotId === '45/2' ? 292 : 275} fontSize="13" fontWeight="900" fill="#1E293B" textAnchor="middle">45/2</text>
                  </g>

                  {/* Plot 46/2 */}
                  <g onClick={() => setSelectedPlotId('46/2')} style={{ cursor: 'pointer' }}>
                    <polygon
                      points="245,210 360,215 345,345 230,345"
                      fill={selectedPlotId === '46/2' ? '#F6DE95' : isSat ? '#3B6B38' : '#F8FAFC'}
                      fillOpacity={selectedPlotId === '46/2' ? 0.95 : isSat ? 0.5 : 0.85}
                      stroke={selectedPlotId === '46/2' ? '#D97706' : '#2D6A4F'}
                      strokeWidth={selectedPlotId === '46/2' ? 2.8 : 1.5}
                      strokeDasharray={selectedPlotId === '46/2' ? 'none' : '4 3'}
                    />
                    {selectedPlotId === '46/2' && (
                      <g transform="translate(295, 260)">
                        <path d="M 0,-18 C -7,-18 -12,-12 -12,-5 C -12,4 0,16 0,16 C 0,16 12,4 12,-5 C 12,-12 7,-18 0,-18 Z" fill="#1E40AF" />
                        <circle cx="0" cy="-6" r="4.5" fill="#FFFFFF" />
                      </g>
                    )}
                    <text x="295" y={selectedPlotId === '46/2' ? 295 : 280} fontSize="12" fontWeight="bold" fill="#163A63" textAnchor="middle">46/2</text>
                  </g>
                </svg>
              </div>

              {/* Bottom Legend Strip */}
              <div className="map-bottom-legend-bar">
                <div className="legend-chip-item">
                  <span className="chip-symbol chip-border-dash"></span>
                  <span>ग्राम सीमा (Boundary)</span>
                </div>
                <div className="legend-chip-item">
                  <span className="chip-symbol chip-selected-gold"></span>
                  <span>चयनित खसरा (Selected Plot {selectedPlotId})</span>
                </div>
                <div className="legend-chip-item">
                  <span className="chip-symbol chip-canal-blue"></span>
                  <span>नहर/जल निकाय (Water Canal)</span>
                </div>
                <div className="legend-chip-item">
                  <span className="chip-symbol chip-road-grey"></span>
                  <span>सड़क मार्ग (Roads)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Polished Parcel Inspector Card */}
          <div className="bhu-naksha-sidebar-col">
            <div className="bhu-naksha-inspector-card">
              
              {/* Header */}
              <div className="inspector-card-header">
                <div>
                  <span className="inspector-sub-title">भू-नक्शा भूखंड विवरण</span>
                  <h3 className="inspector-plot-title">Plot / Khasra {currentPlot.id}</h3>
                </div>
                <div className="inspector-status-badge">
                  <ShieldCheck size={14} />
                  <span>Verified</span>
                </div>
              </div>

              {/* Details List */}
              <div className="inspector-details-list">
                <div className="inspector-detail-row">
                  <span className="detail-lbl">ULPIN:</span>
                  <strong className="detail-val mono-ulpin">{currentPlot.ulpin}</strong>
                </div>

                <div className="inspector-detail-row">
                  <span className="detail-lbl">वर्तमान स्वामी (Current Owner):</span>
                  <strong className="detail-val text-navy">{currentPlot.owner}</strong>
                </div>

                <div className="inspector-detail-row">
                  <span className="detail-lbl">पिता/संरक्षक (Parentage):</span>
                  <span className="detail-val">{currentPlot.father}</span>
                </div>

                <div className="inspector-detail-row">
                  <span className="detail-lbl">खाता संख्या (Khata No.):</span>
                  <span className="detail-val">{currentPlot.khata}</span>
                </div>

                <div className="inspector-detail-row">
                  <span className="detail-lbl">पंजीकृत रकबा (Registered Extent):</span>
                  <strong className="detail-val">{currentPlot.area}</strong>
                </div>

                <div className="inspector-detail-row">
                  <span className="detail-lbl">भूमि वर्गीकरण (Land Classification):</span>
                  <span className="detail-val">{currentPlot.type}</span>
                </div>

                <div className="inspector-detail-row">
                  <span className="detail-lbl">भू-नक्शा स्थिति (Bhu-Naksha Status):</span>
                  <span className="detail-val text-success font-semibold">
                    ✓ {currentPlot.status}
                  </span>
                </div>

                <div className="inspector-detail-row">
                  <span className="detail-lbl">राजस्व मौजा (Revenue Mauza):</span>
                  <span className="detail-val">{currentPlot.village}, {currentPlot.tehsil}, {currentPlot.district}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="inspector-action-buttons">
                <Link to="/land-records/search" className="btn btn-primary btn-sm btn-full-action">
                  <FileText size={15} />
                  <span>अधिकार अभिलेख देखें (View RoR)</span>
                </Link>
                <Link to="/verify" className="btn btn-outline btn-sm btn-full-action">
                  <ShieldCheck size={15} />
                  <span>डिजिटल सत्यापन (Verify Online)</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BhuNakshaPage;