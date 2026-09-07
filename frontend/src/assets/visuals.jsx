import React from 'react';

// 1. Ashoka Lion Emblem (Government of India)
export const AshokaEmblem = ({ width = 46, height = 68, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 100 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`ashoka-emblem-svg ${className}`}
    aria-label="Lion Capital of Ashoka - State Emblem of India"
  >
    {/* Base Pedestal */}
    <rect x="15" y="115" width="70" height="8" rx="2" fill="#8B7355" />
    <rect x="20" y="107" width="60" height="8" rx="1" fill="#A89078" />
    
    {/* Ashoka Chakra in Pedestal */}
    <circle cx="50" cy="111" r="5" stroke="#163A63" strokeWidth="1.5" fill="#FFFFFF" />
    <circle cx="50" cy="111" r="1.5" fill="#163A63" />
    <path d="M50 106v10M45 111h10M46.5 107.5l7 7M46.5 114.5l7-7" stroke="#163A63" strokeWidth="0.8" />
    
    {/* Galloping Horse & Bull Reliefs */}
    <path d="M26 112c2-2 4-1 6-1" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M68 112c2 0 4-1 6 1" stroke="#5D4037" strokeWidth="1.2" strokeLinecap="round" />
    
    {/* Bell Lotus Capital Base */}
    <path d="M25 107c5-7 15-10 25-10s20 3 25 10H25z" fill="#BDBDBD" />
    <path d="M30 107c4-5 12-7 20-7s16 2 20 7" stroke="#757575" strokeWidth="1" fill="none" />

    {/* Center Forward Lion */}
    <path d="M42 35c-2-8 1-18 8-18s10 10 8 18c3 2 5 6 5 11 0 10-6 20-13 20s-13-10-13-20c0-5 2-9 5-11z" fill="#D4AF37" stroke="#8C6D1F" strokeWidth="1.2" />
    <circle cx="46" cy="38" r="2" fill="#3E2723" />
    <circle cx="54" cy="38" r="2" fill="#3E2723" />
    <path d="M47 43h6l-3 4-3-4z" fill="#8C6D1F" />
    <path d="M44 48c3 2 9 2 12 0" stroke="#3E2723" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M35 48c0 15 5 28 15 32 10-4 15-17 15-32-4-2-8-3-15-3s-11 1-15 3z" fill="#E6C65A" stroke="#8C6D1F" strokeWidth="1" />
    
    {/* Mane Details */}
    <path d="M38 32c-4 4-5 10-3 15M62 32c4 4 5 10 3 15M34 42c-3 6-2 13 2 18M66 42c3 6 2 13-2 18" stroke="#8C6D1F" strokeWidth="1.5" strokeLinecap="round" />

    {/* Left Lion Profile */}
    <path d="M22 40c-3-6-2-14 3-17 4-2 9 0 11 4 2 5 1 12-2 16-3 4-8 5-12-3z" fill="#C5A028" stroke="#785B10" strokeWidth="1" />
    <circle cx="27" cy="37" r="1.5" fill="#3E2723" />
    <path d="M18 48c0 10 6 18 14 20-1-6-1-12 1-18-5-1-11-1-15-2z" fill="#D4AF37" stroke="#785B10" strokeWidth="0.8" />

    {/* Right Lion Profile */}
    <path d="M78 40c3-6 2-14-3-17-4-2-9 0-11 4-2 5-1 12 2 16 3 4 8 5 12-3z" fill="#C5A028" stroke="#785B10" strokeWidth="1" />
    <circle cx="73" cy="37" r="1.5" fill="#3E2723" />
    <path d="M82 48c0 10-6 18-14 20 1-6 1-12-1-18 5-1 11-1 15-2z" fill="#D4AF37" stroke="#785B10" strokeWidth="0.8" />

    {/* Lion Paws on Abacus */}
    <ellipse cx="37" cy="94" rx="6" ry="3" fill="#8C6D1F" />
    <ellipse cx="63" cy="94" rx="6" ry="3" fill="#8C6D1F" />
    <ellipse cx="45" cy="95" rx="5" ry="3" fill="#A48227" />
    <ellipse cx="55" cy="95" rx="5" ry="3" fill="#A48227" />

    {/* Satyameva Jayate Banner */}
    <rect x="18" y="127" width="64" height="10" rx="2" fill="#FFFFFF" stroke="#8C6D1F" strokeWidth="0.8" />
    <text x="50" y="134" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#163A63" fontFamily="Arial, sans-serif">
      सत्यमेव जयते
    </text>
  </svg>
);

// 2. Digital India Logo
export const DigitalIndiaLogo = ({ width = 110, height = 42, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 220 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`digital-india-logo ${className}`}
  >
    {/* Tricolor Swooshes */}
    <path d="M20 50 C 40 20, 70 20, 85 45 C 95 62, 115 62, 125 50" stroke="#FF9933" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M15 58 C 38 28, 68 28, 83 53 C 93 70, 113 70, 123 58" stroke="#138808" strokeWidth="6" strokeLinecap="round" fill="none" />
    <circle cx="50" cy="40" r="14" fill="#1B4D89" />
    <circle cx="50" cy="40" r="11" fill="#FFFFFF" />
    <circle cx="50" cy="40" r="3" fill="#1B4D89" />
    <path d="M50 29v22M39 40h22M42 32l16 16M42 48l16-16" stroke="#1B4D89" strokeWidth="1.2" />

    {/* Text */}
    <text x="95" y="38" fontSize="22" fontWeight="800" fill="#1A365D" fontFamily="'Inter', system-ui, sans-serif">
      Digital India
    </text>
    <text x="96" y="54" fontSize="10.5" fontWeight="600" fill="#E65100" letterSpacing="0.06em" fontFamily="'Inter', system-ui, sans-serif">
      Power To Empower
    </text>
  </svg>
);

// 3. AbhilekhSetu Logo
export const AbhilekhSetuLogo = ({ width = 44, height = 44, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`abhilekhsetu-logo-svg ${className}`}
  >
    {/* Background Shield */}
    <path
      d="M32 4 L56 14 V32 C56 46 45 56 32 60 C19 56 8 46 8 32 V14 L32 4 Z"
      fill="url(#setuGradient)"
    />
    {/* Cadastral Grid Facet */}
    <path d="M32 12 L48 20 V32 C48 42 40 49 32 52 V12 Z" fill="#2E7D32" fillOpacity="0.35" />
    
    {/* Bridge / Setu Curve */}
    <path
      d="M18 36 C24 24, 40 24, 46 36"
      stroke="#FFFFFF"
      strokeWidth="4"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M22 38 V44 M32 32 V44 M42 38 V44"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    
    {/* Sprouting Green Leaf at Top */}
    <path
      d="M32 16 C32 16, 38 12, 42 16 C42 20, 36 24, 32 24 C32 24, 30 18, 32 16 Z"
      fill="#81C784"
    />
    <path
      d="M32 24 C32 24, 26 20, 26 16 C26 12, 32 14, 32 16"
      stroke="#C8E6C9"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />

    <defs>
      <linearGradient id="setuGradient" x1="8" y1="4" x2="56" y2="60" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1B4D47" />
        <stop offset="1" stopColor="#0B2E28" />
      </linearGradient>
    </defs>
  </svg>
);

export const RecordSetuLogo = AbhilekhSetuLogo;

// 4. Tricolor Ribbon
export const TricolorRibbon = ({ width = 90, height = 18, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 120 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`tricolor-ribbon ${className}`}
  >
    <path d="M0 4 Q 40 0, 80 4 T 120 4 L 120 10 Q 80 10, 40 6 T 0 10 Z" fill="#FF9933" />
    <path d="M0 10 Q 40 6, 80 10 T 120 10 L 120 16 Q 80 16, 40 12 T 0 16 Z" fill="#FFFFFF" />
    <path d="M0 16 Q 40 12, 80 16 T 120 16 L 120 22 Q 80 22, 40 18 T 0 22 Z" fill="#138808" />
    <circle cx="60" cy="13" r="2.5" fill="#000080" />
  </svg>
);

// 5. Cadastral Map Preview (Interactive village plots: 123, 124/1, 124/2, 125, 126, 127)
export const CadastralMapPreview = ({
  layer = 'satellite',
  activePlot = '124/2',
  width = '100%',
  height = '100%',
  isThumb = false
}) => {
  const isSat = layer === 'satellite' || layer === 'hybrid';

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 500 350"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="cadastral-map-svg"
    >
      <defs>
        {/* Agricultural Satellite Texture Pattern */}
        <pattern id="satAgri" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="60" fill="#2E4A28" />
          <path d="M0 15h60M0 30h60M0 45h60" stroke="#375530" strokeWidth="1" strokeDasharray="3 3" />
          <rect x="5" y="5" width="20" height="20" fill="#3D5F35" fillOpacity="0.6" />
          <rect x="35" y="25" width="18" height="25" fill="#294024" fillOpacity="0.7" />
          <rect x="10" y="35" width="22" height="18" fill="#4B7042" fillOpacity="0.5" />
        </pattern>

        <pattern id="cadastralGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#FAFBFD" />
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E8F0" strokeWidth="0.8" />
        </pattern>
      </defs>

      {/* Base Layer */}
      <rect width="500" height="350" fill={isSat ? 'url(#satAgri)' : 'url(#cadastralGrid)'} />

      {/* Meandering Canal / Water Body */}
      <path
        d="M 0 60 Q 120 90, 210 50 T 400 70 T 500 40 L 500 65 Q 400 95, 210 75 T 0 85 Z"
        fill="#38BDF8"
        fillOpacity={isSat ? '0.75' : '0.4'}
        stroke="#0284C7"
        strokeWidth="1.5"
      />

      {/* Village Main Road */}
      <path
        d="M 120 0 L 160 120 L 220 220 L 310 350"
        stroke="#F59E0B"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 120 0 L 160 120 L 220 220 L 310 350"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeDasharray="8 6"
        fill="none"
      />

      {/* Parcel 123 */}
      <polygon
        points="170,120 270,110 250,210 160,195"
        fill={isSat ? '#3B6B38' : '#F1F5F9'}
        fillOpacity={isSat ? '0.5' : '0.9'}
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <text x="210" y="165" fontSize="13" fontWeight="bold" fill={isSat ? '#FFFFFF' : '#334155'} textAnchor="middle">
        123
      </text>

      {/* Parcel 124/1 */}
      <polygon
        points="270,110 370,100 350,180 250,195"
        fill={isSat ? '#4D7C45' : '#F8FAFC'}
        fillOpacity={isSat ? '0.55' : '0.9'}
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <text x="310" y="145" fontSize="13" fontWeight="bold" fill={isSat ? '#FFFFFF' : '#334155'} textAnchor="middle">
        124/1
      </text>

      {/* Parcel 124/2 (HIGHLIGHTED ACTIVE TARGET PLOT) */}
      <polygon
        points="250,195 350,180 320,290 230,280"
        fill="#EAB308"
        fillOpacity="0.65"
        stroke="#CA8A04"
        strokeWidth="3.5"
        strokeDasharray="none"
      />
      {/* Selected Plot Badge */}
      <rect x="260" y="222" width="60" height="22" rx="4" fill="#FFFFFF" stroke="#CA8A04" strokeWidth="1.5" />
      <text x="290" y="238" fontSize="12" fontWeight="800" fill="#854D0E" textAnchor="middle">
        124/2
      </text>

      {/* Map Locator Pin on 124/2 */}
      <circle cx="290" cy="254" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />

      {/* Parcel 125 */}
      <polygon
        points="160,195 250,210 230,280 145,265"
        fill={isSat ? '#345E31' : '#F1F5F9'}
        fillOpacity={isSat ? '0.5' : '0.85'}
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <text x="200" y="245" fontSize="13" fontWeight="bold" fill={isSat ? '#FFFFFF' : '#334155'} textAnchor="middle">
        125
      </text>

      {/* Parcel 126 */}
      <polygon
        points="145,265 230,280 210,350 130,340"
        fill={isSat ? '#416B3C' : '#F8FAFC'}
        fillOpacity={isSat ? '0.5' : '0.85'}
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <text x="180" y="315" fontSize="13" fontWeight="bold" fill={isSat ? '#FFFFFF' : '#334155'} textAnchor="middle">
        126
      </text>

      {/* Parcel 127 */}
      <polygon
        points="230,280 320,290 300,350 210,350"
        fill={isSat ? '#4D7546' : '#F1F5F9'}
        fillOpacity={isSat ? '0.5' : '0.85'}
        stroke="#E2E8F0"
        strokeWidth="1.5"
      />
      <text x="265" y="325" fontSize="13" fontWeight="bold" fill={isSat ? '#FFFFFF' : '#334155'} textAnchor="middle">
        127
      </text>

      {/* North Compass Indicator */}
      {!isThumb && (
        <g transform="translate(455, 35)">
          <circle cx="0" cy="0" r="16" fill="#FFFFFF" fillOpacity="0.9" stroke="#94A3B8" strokeWidth="1" />
          <polygon points="0,-12 4,0 0,2 -4,0" fill="#DC2626" />
          <polygon points="0,12 4,0 0,-2 -4,0" fill="#64748B" />
          <text x="0" y="-14" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#DC2626">N</text>
        </g>
      )}

      {/* Scale Bar */}
      {!isThumb && (
        <g transform="translate(20, 325)">
          <rect x="0" y="0" width="120" height="16" rx="3" fill="#FFFFFF" fillOpacity="0.9" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="10" y1="11" x2="110" y2="11" stroke="#1E293B" strokeWidth="2" />
          <line x1="10" y1="6" x2="10" y2="11" stroke="#1E293B" strokeWidth="2" />
          <line x1="60" y1="8" x2="60" y2="11" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="110" y1="6" x2="110" y2="11" stroke="#1E293B" strokeWidth="2" />
          <text x="10" y="6" fontSize="7" fill="#475569">0</text>
          <text x="60" y="6" fontSize="7" fill="#475569" textAnchor="middle">200</text>
          <text x="110" y="6" fontSize="7" fill="#475569" textAnchor="end">400 m</text>
        </g>
      )}
    </svg>
  );
};

// 6. Document Preview Graphic
export const DocumentPreviewGraphic = ({ width = 90, height = 110, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 120 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`document-preview-graphic ${className}`}
  >
    {/* Parchment Base */}
    <rect x="5" y="5" width="110" height="140" rx="3" fill="#FFFDF8" stroke="#D1D5DB" strokeWidth="1.5" />
    <rect x="9" y="9" width="102" height="132" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="0.8" strokeDasharray="2 2" />

    {/* Header & Emblem */}
    <circle cx="60" cy="22" r="7" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
    <line x1="25" y1="36" x2="95" y2="36" stroke="#163A63" strokeWidth="2" />
    <line x1="35" y1="42" x2="85" y2="42" stroke="#64748B" strokeWidth="1" />

    {/* Ledger Table Grid */}
    <rect x="16" y="50" width="88" height="60" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
    <line x1="16" y1="62" x2="104" y2="62" stroke="#94A3B8" strokeWidth="1" />
    <line x1="16" y1="76" x2="104" y2="76" stroke="#CBD5E1" strokeWidth="0.8" />
    <line x1="16" y1="90" x2="104" y2="90" stroke="#CBD5E1" strokeWidth="0.8" />
    <line x1="45" y1="50" x2="45" y2="110" stroke="#CBD5E1" strokeWidth="0.8" />
    <line x1="75" y1="50" x2="75" y2="110" stroke="#CBD5E1" strokeWidth="0.8" />

    {/* Stamp Seal */}
    <circle cx="88" cy="124" r="11" fill="#DC2626" fillOpacity="0.12" stroke="#DC2626" strokeWidth="1.2" strokeDasharray="3 1" />
    <text x="88" y="126" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#DC2626">VERIFIED</text>

    {/* QR Code Graphic */}
    <rect x="18" y="116" width="16" height="16" fill="#1E293B" />
    <rect x="21" y="119" width="4" height="4" fill="#FFFFFF" />
    <rect x="27" y="119" width="4" height="4" fill="#FFFFFF" />
    <rect x="21" y="125" width="4" height="4" fill="#FFFFFF" />
  </svg>
);

// 7. Farmer Illustration (Empowered Farmer)
export const FarmerIllustration = ({ width = 140, height = 140, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 140 140"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`farmer-illustration ${className}`}
  >
    {/* Circular Background with Sunburst Glow */}
    <circle cx="70" cy="70" r="64" fill="#FEF9C3" stroke="#FACC15" strokeWidth="2" />
    <path d="M70 15 L70 8 M70 132 L70 125 M15 70 L8 70 M132 70 L125 70" stroke="#EAB308" strokeWidth="2" strokeLinecap="round" />

    {/* Green Crop Fields at base */}
    <path d="M12 105 C35 95, 105 95, 128 105 L128 134 L12 134 Z" fill="#4D7C0F" />
    <path d="M25 110 Q 35 90, 45 110 M60 110 Q 70 88, 80 110 M95 110 Q 105 92, 115 110" stroke="#A3E635" strokeWidth="2.5" strokeLinecap="round" />

    {/* Farmer Kurta Body */}
    <path d="M45 115 C45 95, 95 95, 95 115 L100 140 H40 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
    <path d="M60 100 L70 120 L80 100" stroke="#163A63" strokeWidth="1.5" fill="none" />

    {/* Farmer Face */}
    <ellipse cx="70" cy="72" rx="16" ry="19" fill="#D97706" />
    <path d="M63 70c2-1 5-1 7 0M73 70c2-1 5-1 7 0" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="65" cy="73" r="2" fill="#451A03" />
    <circle cx="75" cy="73" r="2" fill="#451A03" />
    <path d="M68 76c1 2 3 2 4 0" stroke="#92400E" strokeWidth="1.2" strokeLinecap="round" />
    {/* Smiling Moustache */}
    <path d="M62 82c3 2 8 2 16 0" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M65 85c3 3 7 3 10 0" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />

    {/* Saffron Turban (Pagri) */}
    <path
      d="M50 58 C48 42, 65 35, 75 35 C88 35, 94 45, 92 58 C90 62, 85 64, 70 63 C55 64, 51 61, 50 58 Z"
      fill="#EA580C"
    />
    <path
      d="M50 52 C58 45, 82 45, 92 52"
      stroke="#FFEDD5"
      strokeWidth="2.5"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M72 35 C75 28, 85 30, 84 38"
      stroke="#C2410C"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// 8. AI Verification Flow Graphic
export const AIVerificationFlowGraphic = ({ width = 130, height = 70, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 180 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`ai-flow-graphic ${className}`}
  >
    {/* Doc Icon */}
    <rect x="10" y="18" width="34" height="48" rx="3" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2" />
    <line x1="16" y1="28" x2="38" y2="28" stroke="#93C5FD" strokeWidth="2" />
    <line x1="16" y1="36" x2="38" y2="36" stroke="#93C5FD" strokeWidth="2" />
    <line x1="16" y1="44" x2="32" y2="44" stroke="#93C5FD" strokeWidth="2" />

    {/* Scanner Laser Beam */}
    <line x1="8" y1="40" x2="46" y2="40" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />

    {/* Arrow 1 */}
    <path d="M52 42 L68 42" stroke="#2563EB" strokeWidth="2" strokeDasharray="3 2" />

    {/* AI Brain Chip */}
    <rect x="74" y="22" width="36" height="40" rx="4" fill="#1E3A8A" stroke="#60A5FA" strokeWidth="2" />
    <text x="92" y="46" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#93C5FD">AI</text>
    <path d="M92 16v6M92 62v6M68 42h6M110 42h6" stroke="#60A5FA" strokeWidth="2" />

    {/* Arrow 2 */}
    <path d="M118 42 L134 42" stroke="#10B981" strokeWidth="2" strokeDasharray="3 2" />

    {/* Verified Ledger Database */}
    <ellipse cx="152" cy="28" rx="18" ry="7" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
    <path d="M134 28v24c0 4 8 7 18 7s18-3 18-7V28" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
    <circle cx="152" cy="46" r="6" fill="#10B981" />
    <path d="M149 46l2 2 4-4" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 9. Legacy Scanned Deed Graphic (Antique Revenue Record with OCR Bounding Boxes)
export const LegacyScannedDeedGraphic = ({ width = 100, height = 120, className = '' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 140 180"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`legacy-deed-graphic ${className}`}
  >
    {/* Aged Paper Texture Background */}
    <rect x="4" y="4" width="132" height="172" rx="2" fill="#FDF6E2" stroke="#D4C49E" strokeWidth="1.5" />
    
    {/* Ur/Devanagari Header Lines */}
    <line x1="20" y1="22" x2="120" y2="22" stroke="#8B6914" strokeWidth="1.5" />
    <line x1="30" y1="30" x2="110" y2="30" stroke="#A68026" strokeWidth="1" />

    {/* OCR Bounding Box 1: Owner Name (Green) */}
    <rect x="18" y="42" width="70" height="16" rx="1" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.2" strokeDasharray="2 1" />
    <text x="22" y="53" fontSize="8" fill="#064E3B" fontWeight="600">राम कुमार (Ram Kumar)</text>

    {/* OCR Bounding Box 2: Khasra Plot (Blue) */}
    <rect x="18" y="66" width="55" height="15" rx="1" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1.2" strokeDasharray="2 1" />
    <text x="22" y="77" fontSize="8" fill="#1E3A8A" fontWeight="bold">खसरा: 124/2</text>

    {/* OCR Bounding Box 3: Area (Amber) */}
    <rect x="18" y="88" width="60" height="15" rx="1" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="2 1" />
    <text x="22" y="99" fontSize="8" fill="#78350F" fontWeight="600">क्षेत्र: 1.25 हे.</text>

    {/* Legacy Script Scribble Marks */}
    <path d="M20 115h95M20 124h90M20 133h80M20 142h88" stroke="#C2B280" strokeWidth="0.8" strokeLinecap="round" />

    {/* Old Tehsil Stamp Impression */}
    <circle cx="105" cy="148" r="14" fill="#991B1B" fillOpacity="0.15" stroke="#991B1B" strokeWidth="1.2" strokeDasharray="3 1" />
    <text x="105" y="150" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#991B1B">TEHSIL SEAL</text>
  </svg>
);

// Backward-compatibility aliases for legacy imports
export {
  AshokaEmblem as IndiaEmblem,
  CadastralMapPreview as CadastralSatelliteMap,
  CadastralMapPreview as CadastralSheetPreview,
  DocumentPreviewGraphic as KhatauniExtractPreview,
  FarmerIllustration as FarmerPortrait,
  AIVerificationFlowGraphic as AiOcrWorkflowDiagram,
  LegacyScannedDeedGraphic as RevenueRecordDeed,
};