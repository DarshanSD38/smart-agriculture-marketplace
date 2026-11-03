import React from 'react';
import { INITIAL_REVIEWS } from '../../data/mockData';
import Rating from '../../components/Rating';
import { Star, CheckCircle2 } from 'lucide-react';

const CustomerReviews = () => {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Community Farm Reviews & Ratings
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Real feedback from shoppers who received direct farm harvests
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {INITIAL_REVIEWS.map(r => (
          <div key={r.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '0.94rem', color: 'var(--slate-900)' }}>{r.customerName}</span>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Verified Purchase</span>
              </div>
              <Rating value={r.rating} size={14} showCount={false} />
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--slate-400)', marginBottom: '8px' }}>{r.date}</div>
            <p style={{ fontSize: '0.86rem', color: 'var(--slate-700)', lineHeight: 1.5 }}>
              "{r.comment}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;

