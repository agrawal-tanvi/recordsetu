import React from 'react';
import { FolderSearch } from 'lucide-react';
import Button from './Button';

const EmptyState = ({
  title = 'No Records Found',
  description = 'No matching land records or applications were located for your query.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">
        <FolderSearch size={28} />
      </div>
      <h4 style={{ fontSize: '1.15rem', color: '#163A63', marginBottom: '0.5rem' }}>{title}</h4>
      <p style={{ maxWidth: '420px', margin: '0 auto 1.5rem', fontSize: '0.9rem' }}>{description}</p>
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;