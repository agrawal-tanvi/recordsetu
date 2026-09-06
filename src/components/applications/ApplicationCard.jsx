import React from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const ApplicationCard = ({ icon: Icon, title, description, onApply }) => {
  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="service-icon">
        <Icon size={24} />
      </div>
      <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1.5rem', flex: 1 }}>
        {description}
      </p>
      <div>
        <Button variant="primary" onClick={onApply} icon={ArrowRight}>
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default ApplicationCard;