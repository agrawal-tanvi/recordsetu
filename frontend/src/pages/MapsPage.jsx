import React, { useState } from 'react';
import { Map, Layers, ZoomIn, ZoomOut, Compass, Info, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';

const MapsPage = ({ embedded = false }) => {
  const [selectedPlot, setSelectedPlot] = useState({
    id: "Plot 45/2",
    khasra: "45/2-A",
    owner: "Rajesh Kumar",
    area: "1.45 Hectares",
    type: "Agricultural / Irrigated",
    ulpin: "UP-LKO-452-98124",
    coordinates: "26.8524° N, 80.9982° E"
  });

  const [activeLayer, setActiveLayer] = useState('cadastral'); // 'cadastral', 'satellite', 'roads'

  const plots = [
    { id: "Plot 45/1", khasra: "45/1", owner: "Rameshwar Singh", area: "0.95 Hectares", type: "Agricultural", ulpin: "UP-LKO-451-88120", top: "15%", left: "18%", width: "140px", height: "110px" },
    { id: "Plot 45/2", khasra: "45/2-A", owner: "Rajesh Kumar", area: "1.45 Hectares", type: "Agricultural / Irrigated", ulpin: "UP-LKO-452-98124", top: "15%", left: "42%", width: "170px", height: "130px" },
    { id: "Plot 45/3", khasra: "45/3", owner: "Harish Chandra", area: "1.10 Hectares", type: "Agricultural", ulpin: "UP-LKO-453-11029", top: "45%", left: "20%", width: "150px", height: "140px" },
    { id: "Plot 46/1", khasra: "46/1", owner: "Gram Sabha Community Land", area: "3.20 Hectares", type: "Panchayat Grazing", ulpin: "UP-LKO-461-00192", top: "48%", left: "55%", width: "190px", height: "120px" }
  ];

  return (
    <div className={embedded ? "" : "maps-page"}>
      {!embedded && (
        <div className="page-hero">
          <div className="container">
            <div className="gov-badge-emblem" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)', marginBottom: '0.75rem' }}>
              <Map size={14} />
              <span>BHU-NAKSHA GEOPORTAL</span>
            </div>
            <h1>Maps & Cadastral Surveys</h1>
            <p>
              Inspect geo-referenced village cadastral boundary sheets, drone imagery and parcel coordinates.
            </p>
          </div>
        </div>
      )}

      <div className={embedded ? "" : "container"} style={{ paddingBottom: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2.2fr 1fr', gap: '1.5rem' }}>
          {/* Mock Interactive Map Canvas */}
          <div className="card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button
                  type="button"
                  className={`btn btn-sm ${activeLayer === 'cadastral' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveLayer('cadastral')}
                >
                  Cadastral Vectors
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeLayer === 'satellite' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveLayer('satellite')}
                >
                  Drone Ortho
                </button>
                <button
                  type="button"
                  className={`btn btn-sm ${activeLayer === 'roads' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setActiveLayer('roads')}
                >
                  Canals & Roads
                </button>
              </div>

              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <button type="button" className="btn btn-secondary btn-sm" aria-label="Zoom In">
                  <ZoomIn size={14} />
                </button>
                <button type="button" className="btn btn-secondary btn-sm" aria-label="Zoom Out">
                  <ZoomOut size={14} />
                </button>
              </div>
            </div>

            {/* Simulated Map Canvas */}
            <div className="map-canvas-mock">
              <div className="map-grid-overlay"></div>

              {/* Cadastral Parcels rendered via CSS */}
              {plots.map((plot) => (
                <div
                  key={plot.id}
                  className={`cadastral-plot ${selectedPlot?.id === plot.id ? 'selected' : ''}`}
                  style={{
                    top: plot.top,
                    left: plot.left,
                    width: plot.width,
                    height: plot.height
                  }}
                  onClick={() => setSelectedPlot(plot)}
                >
                  <span>{plot.id}</span>
                  <span style={{ fontSize: '0.65rem', opacity: 0.8 }}>{plot.area}</span>
                </div>
              ))}

              <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(255,255,255,0.9)', padding: '4px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 600 }}>
                Scale: 1:4000 | Datum: WGS 84
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#FFFFFF', padding: '6px', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
                <Compass size={20} style={{ color: 'var(--primary-navy)' }} />
              </div>
            </div>
          </div>

          {/* Plot Inspector Panel */}
          <div className="card">
            <h2 className="card-title" style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '1rem', fontSize: '1.2rem' }}>
              <Info size={18} style={{ color: 'var(--government-blue)' }} />
              <span>Parcel Inspector</span>
            </h2>

            {selectedPlot ? (
              <div>
                <div style={{ background: 'var(--light-blue)', padding: '0.85rem', borderRadius: '6px', marginBottom: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--government-blue)', textTransform: 'uppercase' }}>
                    Selected Survey Number
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-navy)' }}>
                    {selectedPlot.id}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    ULPIN: {selectedPlot.ulpin}
                  </div>
                </div>

                <div className="doc-field" style={{ marginBottom: '0.75rem' }}>
                  <span className="doc-field-label">Current Owner</span>
                  <span className="doc-field-val">{selectedPlot.owner}</span>
                </div>

                <div className="doc-field" style={{ marginBottom: '0.75rem' }}>
                  <span className="doc-field-label">Extent of Area</span>
                  <span className="doc-field-val">{selectedPlot.area}</span>
                </div>

                <div className="doc-field" style={{ marginBottom: '0.75rem' }}>
                  <span className="doc-field-label">Land Classification</span>
                  <span className="doc-field-val">{selectedPlot.type}</span>
                </div>

                <div className="doc-field" style={{ marginBottom: '1.25rem' }}>
                  <span className="doc-field-label">Bhu-Naksha Status</span>
                  <span className="doc-field-val" style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} />
                    <span>Digitally Geo-Referenced</span>
                  </span>
                </div>

                <Button variant="primary" block size="sm" onClick={() => alert(`Opening Record of Rights for ${selectedPlot.id}`)}>
                  View Linked Record of Rights
                </Button>
              </div>
            ) : (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Click on any cadastral parcel on the map to inspect ownership and dimensions.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapsPage;