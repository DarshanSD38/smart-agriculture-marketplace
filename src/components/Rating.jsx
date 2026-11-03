import React from 'react';
import { Star } from 'lucide-react';

const Rating = ({ value = 0, count, showCount = true, size = 15 }) => {
  const numericValue = Number(value) || 0;

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
      <div style={{ display: 'flex', color: '#f59e0b' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            fill={star <= Math.round(numericValue) ? '#f59e0b' : 'transparent'}
            stroke={star <= Math.round(numericValue) ? '#f59e0b' : '#cbd5e1'}
            strokeWidth={1.8}
          />
        ))}
      </div>
      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155' }}>
        {numericValue.toFixed(1)}
      </span>
      {showCount && count !== undefined && (
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
          ({count})
        </span>
      )}
    </div>
  );
};

export default Rating;

