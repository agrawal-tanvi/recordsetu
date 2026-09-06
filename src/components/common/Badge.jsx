import React from 'react';
import { CheckCircle, Clock, AlertCircle, XCircle } from 'lucide-react';

const Badge = ({ status = 'Verified', children }) => {
  const val = children || status;
  const lower = String(val).toLowerCase();

  let typeClass = 'badge-info';
  let Icon = AlertCircle;

  if (lower.includes('verified') || lower.includes('approved') || lower.includes('completed') || lower.includes('success')) {
    typeClass = 'badge-verified';
    Icon = CheckCircle;
  } else if (lower.includes('pending') || lower.includes('waiting')) {
    typeClass = 'badge-pending';
    Icon = Clock;
  } else if (lower.includes('review') || lower.includes('progress')) {
    typeClass = 'badge-review';
    Icon = Clock;
  } else if (lower.includes('reject') || lower.includes('cancel')) {
    typeClass = 'badge-rejected';
    Icon = XCircle;
  }

  return (
    <span className={`badge ${typeClass}`}>
      <Icon size={12} />
      <span>{val}</span>
    </span>
  );
};

export default Badge;