import React, { useState } from 'react';
import { Bell, Calendar, Tag, ChevronRight, FileText } from 'lucide-react';
import { noticesData } from '../data/notices';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';

const NoticesPage = () => {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'Digitization', 'Maintenance', 'Regulations', 'Citizen Awareness', 'New Services'];

  const filteredNotices = activeCategory === 'ALL'
    ? noticesData
    : noticesData.filter(n => n.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="notices-page">
      <div className="page-hero">
        <div className="container">
          <div className="gov-badge-emblem" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)', marginBottom: '0.75rem' }}>
            <Bell size={14} />
            <span>PRESS RELEASES & GAZETTE NOTICES</span>
          </div>
          <h1>Notices & Announcements</h1>
          <p>
            Official circulars, regulatory advisories and technological upgrades from the Department of Land Resources.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingBottom: '5rem' }}>
        {/* Category Filters */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              className={`btn btn-sm ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notices Cards List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {filteredNotices.map((notice) => (
            <div key={notice.id} className="card card-hover" style={{ padding: '1.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
                <span className="badge badge-info">{notice.category}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  <Calendar size={14} />
                  <span>{notice.date}</span>
                </div>
              </div>

              <h2 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)', marginBottom: '0.5rem' }}>
                {notice.title}
              </h2>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                {notice.summary}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                <span>Issued by: <strong>{notice.department}</strong></span>
                <button
                  type="button"
                  onClick={() => setSelectedNotice(notice)}
                  style={{ color: 'var(--government-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <span>Read Notice</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Read Notice Modal */}
        <Modal
          isOpen={!!selectedNotice}
          onClose={() => setSelectedNotice(null)}
          title={selectedNotice?.title || "Notice Details"}
          footer={
            <Button variant="secondary" onClick={() => setSelectedNotice(null)}>
              Close
            </Button>
          }
        >
          {selectedNotice && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span>Reference: <strong>{selectedNotice.id}</strong></span>
                <span>Date: <strong>{selectedNotice.date}</strong></span>
              </div>
              <div style={{ background: 'var(--light-bg)', padding: '0.85rem', borderRadius: '6px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                <strong>Department:</strong> {selectedNotice.department}
              </div>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'var(--text-main)' }}>
                {selectedNotice.content}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default NoticesPage;