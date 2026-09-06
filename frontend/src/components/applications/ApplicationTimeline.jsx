import React from 'react';
import { Check, Clock, Circle } from 'lucide-react';

const ApplicationTimeline = ({ timeline = [] }) => {
  return (
    <div className="timeline">
      {timeline.map((step, idx) => {
        const isCompleted = step.status === 'completed';
        const isInProgress = step.status === 'in_progress';

        return (
          <div key={idx} className={`timeline-item ${step.status}`}>
            <div className="timeline-dot">
              {isCompleted ? (
                <Check size={12} strokeWidth={3} />
              ) : isInProgress ? (
                <Clock size={11} style={{ color: 'var(--government-blue)' }} />
              ) : (
                <Circle size={8} style={{ color: 'var(--text-muted)' }} />
              )}
            </div>
            <div className="timeline-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.95rem', color: isCompleted ? 'var(--primary-navy)' : isInProgress ? 'var(--government-blue)' : 'var(--text-muted)' }}>
                  {step.stage}
                </h4>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  {step.date}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {step.note}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ApplicationTimeline;