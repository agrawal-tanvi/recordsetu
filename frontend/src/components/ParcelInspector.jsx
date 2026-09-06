import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

const ParcelInspector = ({ 
  plot = {
    id: "45/2",
    ulpin: "UP-LKO-452-98124",
    owner: "Rajesh Kumar",
    area: "1.45 Hectares",
    type: "Agricultural / Irrigated",
    status: "Digitally Geo-Referenced"
  } 
}) => {
  return (
    <div className="parcel-inspector-card">
      <div className="inspector-head">
        <span className="sub-tag">भू-नक्शा भूखंड विवरण</span>
        <h3 className="plot-title">Plot / Khasra {plot.id}</h3>
        <div className="ulpin-ref">ULPIN: <strong>{plot.ulpin}</strong></div>
      </div>

      <div className="inspector-field-list">
        <div className="inspect-row">
          <span className="lbl">वर्तमान स्वामी (Current Owner):</span>
          <span className="val highlight">{plot.owner}</span>
        </div>

        <div className="inspect-row">
          <span className="lbl">पंजीकृत रकबा (Registered Extent):</span>
          <span className="val">{plot.area}</span>
        </div>

        <div className="inspect-row">
          <span className="lbl">भूमि वर्गीकरण (Land Classification):</span>
          <span className="val">{plot.type}</span>
        </div>

        <div className="inspect-row">
          <span className="lbl">भू-नक्शा स्थिति (Bhu-Naksha Status):</span>
          <span className="val status-green">
            <CheckCircle2 size={14} />
            <span>{plot.status}</span>
          </span>
        </div>
      </div>

      <div className="inspector-action-group">
        <Link to={`/land-records/RS-2026-001`} className="btn-inspect-primary">
          <FileText size={15} />
          <span>अधिकार अभिलेख देखें (View RoR)</span>
        </Link>
        <Link to={`/verify`} className="btn-inspect-outline">
          <ShieldCheck size={15} />
          <span>डिजिटल सत्यापन (Verify Online)</span>
        </Link>
      </div>
    </div>
  );
};

export default ParcelInspector;