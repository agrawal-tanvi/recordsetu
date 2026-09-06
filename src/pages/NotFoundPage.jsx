import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '5rem', fontWeight: '800', color: '#163A63', margin: 0 }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', color: '#1E293B', marginBottom: '0.75rem' }}>Page Not Found / पृष्ठ उपलब्ध नहीं है</h2>
        <p style={{ color: '#64748B', marginBottom: '1.5rem' }}>
          The requested page or land record service does not exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#163A63', color: '#FFF', borderRadius: '4px', textDecoration: 'none', fontWeight: '600' }}>
          <Home size={16} /> Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
