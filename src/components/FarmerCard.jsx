import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { MapPin, CheckCircle, Sprout, Phone } from 'lucide-react';

const FarmerCard = ({ farmer }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
        <img 
          src={farmer.avatar} 
          alt={farmer.name} 
          style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-300)' }} 
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--slate-900)' }}>
              {farmer.name}
            </h3>
            {farmer.verified && (
              <CheckCircle size={16} fill="#16a34a" color="#ffffff" />
            )}
          </div>
          <div style={{ fontSize: '0.84rem', color: 'var(--primary-700)', fontWeight: 600 }}>
            {farmer.farmName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            <MapPin size={13} /> {farmer.location}
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.84rem', color: 'var(--slate-600)', marginBottom: '14px', flex: 1, lineClamp: 2 }}>
        {farmer.bio}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '14px' }}>
        {farmer.crops?.map((crop, i) => (
          <span key={i} className="badge badge-green">
            <Sprout size={12} /> {crop}
          </span>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Rating value={farmer.rating} count={farmer.reviewsCount} size={14} />
        <Link to={`/marketplace?farmer=${encodeURIComponent(farmer.name)}`} className="btn btn-outline btn-sm">
          View Harvest
        </Link>
      </div>
    </div>
  );
};

export default FarmerCard;

