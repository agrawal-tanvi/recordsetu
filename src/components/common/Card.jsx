import React from 'react';

const Card = ({
  title,
  subtitle,
  actions,
  children,
  hover = false,
  className = '',
  style = {}
}) => {
  return (
    <div className={`card ${hover ? 'card-hover' : ''} ${className}`} style={style}>
      {(title || actions) && (
        <div className="card-header">
          <div>
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p style={{ fontSize: '0.85rem', marginTop: '2px' }}>{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;