import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import ProductCard from '../../components/ProductCard';
import { Sparkles, BrainCircuit, Heart, ThumbsUp, Leaf } from 'lucide-react';

const CustomerRecommendations = () => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then(all => {
      // Mock personalized scoring and tagging
      const tagged = all.slice(0, 4).map((p, idx) => {
        const reasons = [
          "Peak seasonal nutrition & lowest price today",
          "Frequently bought together with your pantry staples",
          "Harvested < 12 hours ago at nearby Gaushala",
          "Matches your preference for certified chemical-free produce"
        ];
        return {
          ...p,
          aiReason: reasons[idx % reasons.length]
        };
      });
      setRecommended(tagged);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Sparkles size={18} />
          <span>AI Personalization Engine</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Recommended for You
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Smart suggestions generated from your dietary preferences, neighborhood harvest freshness, and peak nutritional value.
        </p>
      </div>

      {loading ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
          Generating personalized recommendations...
        </div>
      ) : (
        <div className="grid-2" style={{ gap: '24px' }}>
          {recommended.map(product => (
            <div key={product.id} className="card" style={{ padding: '20px', border: '1px solid var(--primary-200)', background: '#ffffff', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary-50)', padding: '6px 12px', borderRadius: 'var(--radius-full)', marginBottom: '14px', width: 'fit-content' }}>
                <BrainCircuit size={15} color="#16a34a" />
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary-800)' }}>
                  Why AI Picked This: {product.aiReason}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '130px', height: '110px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />

                <div style={{ flex: 1, minWidth: '180px' }}>
                  <div style={{ fontSize: '0.74rem', textTransform: 'uppercase', color: 'var(--slate-400)', fontWeight: 700 }}>
                    {product.category}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '2px' }}>
                    {product.name}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginTop: '4px' }}>
                    By {product.farmerName} • {product.farmerLocation}
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '8px' }}>
                    ₹{product.price} <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--slate-400)' }}>/ {product.unit}</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginTop: '12px', flex: 1, lineHeight: 1.5 }}>
                {product.description}
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-100)', paddingTop: '12px', marginTop: '14px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                  Harvest Date: <strong>{product.harvestDate}</strong>
                </span>

                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerRecommendations;

