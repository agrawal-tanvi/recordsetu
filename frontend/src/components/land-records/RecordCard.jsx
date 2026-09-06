import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, User, ChevronRight } from 'lucide-react';
import Badge from '../common/Badge';

const RecordCard = ({ record }) => {
  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={{ fontWeight: 800, color: 'var(--government-blue)', fontSize: '0.95rem' }}>
          {record.id}
        </span>
        <Badge status={record.status} />
      </div>

      <h3 style={{ fontSize: '1.15rem', color: 'var(--primary-navy)', marginBottom: '0.4rem' }}>
        {record.ownerName}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
        <MapPin size={14} />
        <span>{record.village}, {record.district} ({record.state})</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', background: 'var(--light-bg)', padding: '0.5rem 0.75rem', borderRadius: '4px', margin: '0.75rem 0 1.25rem' }}>
        <span>Survey No: <strong>{record.surveyNumber}</strong></span>
        <span>Area: <strong>{record.area}</strong></span>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <Link to={`/land-records/${record.id}`} className="btn btn-primary btn-sm btn-block">
          <span>View Record</span>
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default RecordCard;