import React from 'react';
import { INITIAL_FARMERS } from '../../data/mockData';
import FarmerCard from '../../components/FarmerCard';
import { MapPin } from 'lucide-react';

const CustomerNearbyFarmers = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <MapPin size={18} />
          <span>Local Producers</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Nearby Verified Farms
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Connect with growers within your district for fastest doorstep harvest deliveries
        </p>
      </div>

      <div className="grid-2" style={{ gap: '20px' }}>
        {INITIAL_FARMERS.map(farmer => (
          <FarmerCard key={farmer.id} farmer={farmer} />
        ))}
      </div>
    </div>
  );
};

export default CustomerNearbyFarmers;

