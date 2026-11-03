import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { INITIAL_PRICE_COMPARISONS } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import Rating from '../../components/Rating';
import { Scale, CheckCircle2, MapPin, Calendar, ShoppingCart, Award } from 'lucide-react';

const CustomerPriceComparison = () => {
  const [searchParams] = useSearchParams();
  const initialCommodity = searchParams.get('commodity') || 'Tomato';
  const [selectedCommodity, setSelectedCommodity] = useState(initialCommodity);
  const { addToCart } = useCart();
  const [addedFarmerId, setAddedFarmerId] = useState(null);

  const commodities = Object.keys(INITIAL_PRICE_COMPARISONS);
  const comparisons = INITIAL_PRICE_COMPARISONS[selectedCommodity] || INITIAL_PRICE_COMPARISONS['Tomato'];

  const handleAdd = (farmer) => {
    addToCart({
      id: `comp-${farmer.farmerId}-${selectedCommodity}`,
      name: `Fresh ${selectedCommodity} (${farmer.farm})`,
      price: farmer.price,
      unit: farmer.unit,
      farmerName: farmer.farmerName,
      image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&auto=format&fit=crop&q=80"
    }, 1);

    setAddedFarmerId(farmer.farmerId);
    setTimeout(() => setAddedFarmerId(null), 1500);
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Scale size={18} />
          <span>Fair Transparency Tool</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Multi-Farmer Price Comparison
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Compare offerings from multiple local growers of the same commodity. Evaluates price, distance, rating, and freshness.
        </p>
      </div>

      {/* COMMODITY SELECTOR */}
      <div className="card" style={{ padding: '16px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '8px' }}>
          Select Commodity to Compare:
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {commodities.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCommodity(c)}
              style={{
                padding: '9px 20px',
                borderRadius: 'var(--radius-md)',
                border: selectedCommodity === c ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                background: selectedCommodity === c ? 'var(--primary-50)' : '#ffffff',
                color: selectedCommodity === c ? 'var(--primary-800)' : 'var(--slate-700)',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer'
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* COMPARISON CARDS / BENCHMARK GRID */}
      <div className="grid-3" style={{ gap: '20px', marginBottom: '32px' }}>
        {comparisons.map((item, idx) => {
          const isBestValue = item.badge === 'Best Value';

          return (
            <div
              key={idx}
              className="card"
              style={{
                position: 'relative',
                padding: '24px',
                border: isBestValue ? '2px solid #16a34a' : '1px solid var(--slate-200)',
                boxShadow: isBestValue ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                background: isBestValue ? 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)' : '#ffffff',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {isBestValue && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '20px',
                  background: '#16a34a',
                  color: 'white',
                  padding: '3px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: 'var(--shadow-sm)'
                }}>
                  <Award size={13} /> BEST VALUE DEAL
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <span className="badge badge-blue" style={{ marginBottom: '6px' }}>{item.badge}</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {item.farmerName}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                  {item.farm}
                </div>
              </div>

              {/* Price display */}
              <div style={{ marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: isBestValue ? '#15803d' : 'var(--slate-900)' }}>
                  ₹{item.price}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--slate-400)', fontWeight: 600 }}> / {item.unit}</span>
              </div>

              {/* Specifications */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem', marginBottom: '20px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="#64748b" /> Distance:
                  </span>
                  <strong>{item.distanceKm} km away</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} color="#64748b" /> Harvest Time:
                  </span>
                  <strong>{item.harvestDate}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--slate-600)' }}>Farmer Rating:</span>
                  <Rating value={item.rating} size={13} showCount={false} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                  <span>Certification:</span>
                  <strong style={{ color: item.certifiedOrganic ? '#16a34a' : 'var(--slate-700)' }}>
                    {item.certifiedOrganic ? '✓ Certified Organic' : 'Conventional Safe'}
                  </strong>
                </div>
              </div>

              <button
                onClick={() => handleAdd(item)}
                className={`btn ${isBestValue ? 'btn-primary' : 'btn-secondary'}`}
                style={{ width: '100%', padding: '10px' }}
              >
                {addedFarmerId === item.farmerId ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Added to Basket!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart size={16} />
                    <span>Add to Basket (₹{item.price})</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerPriceComparison;

