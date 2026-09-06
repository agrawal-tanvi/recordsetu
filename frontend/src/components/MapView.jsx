import React, { useState } from 'react';
import { 
  Plus, 
  Minus, 
  Compass, 
  Layers, 
  MapPin, 
  CheckCircle2, 
  ExternalLink, 
  Printer, 
  Download 
} from 'lucide-react';

const MapView = ({ onSelectPlot, initialSelected = "45/2" }) => {
  const [selectedPlotId, setSelectedPlotId] = useState(initialSelected);
  const [activeLayer, setActiveLayer] = useState("cadastral"); // 'cadastral', 'satellite', 'hybrid'
  const [zoomLevel, setZoomLevel] = useState(1);

  // Realistic Cadastral Village Land Parcels
  const parcels = [
    {
      id: "45/1",
      ulpin: "UP-LKO-451-88120",
      owner: "Rameshwar Singh",
      area: "0.95 Hectare",
      type: "Agricultural / Irrigated",
      status: "Digitally Geo-Referenced",
      path: "M 40,40 L 170,30 L 180,140 L 50,150 Z",
      labelPos: { x: 105, y: 95 }
    },
    {
      id: "45/2",
      ulpin: "UP-LKO-452-98124",
      owner: "Rajesh Kumar",
      area: "1.45 Hectares",
      type: "Agricultural / Irrigated",
      status: "Digitally Geo-Referenced",
      path: "M 195,145 L 360,135 L 340,300 L 175,290 Z",
      labelPos: { x: 265, y: 220 }
    },
    {
      id: "45/3",
      ulpin: "UP-LKO-453-11029",
      owner: "Harish Chandra",
      area: "1.10 Hectares",
      type: "Agricultural / Double Crop",
      status: "Digitally Geo-Referenced",
      path: "M 190,30 L 370,20 L 360,130 L 185,140 Z",
      labelPos: { x: 275, y: 85 }
    },
    {
      id: "46/1",
      ulpin: "UP-LKO-461-00192",
      owner: "Gram Sabha Community Land",
      area: "3.20 Hectares",
      type: "Panchayat Grazing / Public Utility",
      status: "Digitally Geo-Referenced",
      path: "M 380,20 L 560,35 L 550,150 L 370,135 Z",
      labelPos: { x: 465, y: 90 }
    },
    {
      id: "46/2",
      ulpin: "UP-LKO-462-44109",
      owner: "Suresh Chandra Verma",
      area: "1.80 Hectares",
      type: "Agricultural",
      status: "Digitally Geo-Referenced",
      path: "M 370,145 L 550,160 L 530,310 L 350,300 Z",
      labelPos: { x: 450, y: 230 }
    },
    {
      id: "47/1",
      ulpin: "UP-LKO-471-55821",
      owner: "Mahesh Prasad Gupta",
      area: "1.25 Hectares",
      type: "Agricultural / Horticultural",
      status: "Digitally Geo-Referenced",
      path: "M 50,160 L 185,150 L 165,305 L 40,285 Z",
      labelPos: { x: 105, y: 235 }
    }
  ];

  const handlePlotClick = (plot) => {
    setSelectedPlotId(plot.id);
    if (onSelectPlot) {
      onSelectPlot(plot);
    }
  };

  const selectedPlot = parcels.find(p => p.id === selectedPlotId) || parcels[1];

  return (
    <div className="cadastral-map-view">
      {/* Top Map Action Toolbar */}
      <div className="map-toolbar">
        <div className="layer-tabs">
          <button 
            type="button" 
            className={`tab-btn ${activeLayer === 'cadastral' ? 'active' : ''}`}
            onClick={() => setActiveLayer('cadastral')}
          >
            कैडस्ट्रल नक्शा / Cadastral
          </button>
          <button 
            type="button" 
            className={`tab-btn ${activeLayer === 'satellite' ? 'active' : ''}`}
            onClick={() => setActiveLayer('satellite')}
          >
            उपग्रह दृश्य / Satellite
          </button>
          <button 
            type="button" 
            className={`tab-btn ${activeLayer === 'hybrid' ? 'active' : ''}`}
            onClick={() => setActiveLayer('hybrid')}
          >
            हाइब्रिड / Hybrid
          </button>
        </div>

        <div className="village-badge">
          <span>मौजा: <strong>खैरपुर (Khairpur)</strong> | तहसील: <strong>मोहनलालगंज</strong> | जिला: <strong>लखनऊ</strong></span>
        </div>
      </div>

      {/* Main Map Canvas */}
      <div className="map-canvas-viewport">
        <svg 
          viewBox="0 0 600 360" 
          className={`map-svg ${activeLayer}`}
          style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease' }}
        >
          <defs>
            {/* Satellite Landscape gradient */}
            <linearGradient id="aerialGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E392B" />
              <stop offset="30%" stopColor="#284E38" />
              <stop offset="70%" stopColor="#1C3526" />
              <stop offset="100%" stopColor="#13241A" />
            </linearGradient>
            <pattern id="gridOverlay" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Layer Background */}
          {activeLayer === 'cadastral' ? (
            <rect width="600" height="360" fill="#F4F8F5" />
          ) : (
            <rect width="600" height="360" fill="url(#aerialGrad)" />
          )}

          <rect width="600" height="360" fill="url(#gridOverlay)" />

          {/* Water channel / Canal */}
          <path 
            d="M -10,120 Q 200,160 350,90 T 610,125" 
            stroke="#2563EB" 
            strokeWidth="9" 
            fill="none" 
            strokeLinecap="round"
          />
          <text x="520" y="115" fill="#38BDF8" fontSize="8" fontWeight="bold">नहर (Canal)</text>

          {/* Road Network */}
          <path d="M 120,-10 L 150,370" stroke="#CBD5E1" strokeWidth="5" strokeDasharray="6 3" fill="none" />
          <path d="M -10,290 L 610,305" stroke="#CBD5E1" strokeWidth="4" fill="none" />
          <text x="20" y="282" fill="#64748B" fontSize="8" fontWeight="bold">पक्का मार्ग (Road)</text>

          {/* Cadastral Parcels */}
          {parcels.map((parcel) => {
            const isSelected = parcel.id === selectedPlotId;
            return (
              <g 
                key={parcel.id} 
                onClick={() => handlePlotClick(parcel)}
                style={{ cursor: 'pointer' }}
                className="parcel-group"
              >
                <path
                  d={parcel.path}
                  fill={
                    isSelected 
                      ? "rgba(244, 185, 66, 0.45)" 
                      : activeLayer === 'cadastral' 
                        ? "rgba(235, 248, 242, 0.75)" 
                        : "rgba(255, 255, 255, 0.08)"
                  }
                  stroke={isSelected ? "#F4B942" : activeLayer === 'cadastral' ? "#1F5A4F" : "#F8FAFC"}
                  strokeWidth={isSelected ? "3.5" : "1.5"}
                  strokeDasharray={isSelected ? "none" : "3 2"}
                />
                
                {/* Parcel Number Label */}
                <text
                  x={parcel.labelPos.x}
                  y={parcel.labelPos.y}
                  textAnchor="middle"
                  fill={isSelected ? "#163A63" : activeLayer === 'cadastral' ? "#163A63" : "#FFFFFF"}
                  fontSize={isSelected ? "14" : "11"}
                  fontWeight="bold"
                  filter={activeLayer !== 'cadastral' ? "drop-shadow(0px 1px 2px rgba(0,0,0,0.8))" : "none"}
                >
                  {parcel.id}
                </text>
              </g>
            );
          })}

          {/* Selected Pin Marker over active plot */}
          {selectedPlot && (
            <g transform={`translate(${selectedPlot.labelPos.x - 10}, ${selectedPlot.labelPos.y - 32})`}>
              <circle cx="10" cy="10" r="14" fill="#2563EB" opacity="0.25" />
              <path d="M10 0 C4.5 0 0 4.5 0 10 C0 17 10 28 10 28 C10 28 20 17 20 10 C20 4.5 15.5 0 10 0 Z" fill="#245A94" stroke="#FFFFFF" strokeWidth="2" />
              <circle cx="10" cy="10" r="3.5" fill="#FFFFFF" />
            </g>
          )}

          {/* Compass Rose */}
          <g transform="translate(555, 35)">
            <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
            <polygon points="0,-12 4,0 0,-3" fill="#DC2626" />
            <polygon points="0,12 4,0 0,3" fill="#1E293B" />
            <polygon points="0,-12 -4,0 0,-3" fill="#B91C1C" />
            <polygon points="0,12 -4,0 0,3" fill="#475569" />
            <text x="0" y="-14" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#DC2626">N</text>
          </g>
        </svg>

        {/* Floating Zoom & Tool Controls */}
        <div className="map-controls-box">
          <button type="button" onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 1.8))} title="Zoom In">
            <Plus size={15} />
          </button>
          <button type="button" onClick={() => setZoomLevel(prev => Math.max(prev - 0.2, 0.8))} title="Zoom Out">
            <Minus size={15} />
          </button>
          <button type="button" onClick={() => setZoomLevel(1)} title="Reset Zoom">
            <Compass size={15} />
          </button>
        </div>

        {/* Bottom Legend Strip */}
        <div className="map-legend-strip">
          <div className="legend-item"><span className="legend-box boundary-box"></span> ग्राम सीमा (Boundary)</div>
          <div className="legend-item"><span className="legend-box selected-box"></span> चयनित खसरा (Selected)</div>
          <div className="legend-item"><span className="legend-box water-box"></span> नहर/जल निकाय (Water)</div>
          <div className="legend-item"><span className="legend-box road-box"></span> सड़क मार्ग (Roads)</div>
          <div className="map-scale-metric">पैमाना / Scale: 1 : 2000</div>
        </div>
      </div>
    </div>
  );
};

export default MapView;