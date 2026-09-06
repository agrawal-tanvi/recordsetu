import React from 'react';

const Loading = ({ message = 'Accessing Central Land Registry Records...' }) => {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
      <div className="loading-spinner"></div>
      <p style={{ marginTop: '1rem', fontSize: '0.92rem', color: '#64748B', fontWeight: 500 }}>
        {message}
      </p>
    </div>
  );
};

export default Loading;