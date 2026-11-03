import React, { useState, useEffect } from 'react';
import { aiService } from '../../services/aiService';
import { AlertTriangle, Sparkles, TrendingDown, Percent, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

const FarmerSurplus = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedDiscounts, setAppliedDiscounts] = useState({});

  useEffect(() => {
    aiService.getSurplusAnalysis().then(data => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  const handleApplyDiscount = (id, discount) => {
    setAppliedDiscounts(prev => ({
      ...prev,
      [id]: discount
    }));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ea580c', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <AlertTriangle size={18} />
          <span>Zero Food Waste Engine</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Surplus Harvest Management
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Real-time perishable risk detection to prevent crop spoilage and recover capital via automated markdown incentives.
        </p>
      </div>

      {loading ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
          Analyzing harvest shelf-life velocity...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {items.map(item => {
            const isApplied = !!appliedDiscounts[item.id];
            const currentDiscount = isApplied ? appliedDiscounts[item.id] : item.suggestedDiscount;

            return (
              <div 
                key={item.id} 
                className="card"
                style={{
                  borderLeft: `5px solid ${item.surplusRisk === 'High' ? '#dc2626' : (item.surplusRisk === 'Medium' ? '#f59e0b' : '#16a34a')}`,
                  padding: '24px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                        {item.productName}
                      </h3>
                      <span className={`badge ${item.surplusRisk === 'High' ? 'badge-red' : (item.surplusRisk === 'Medium' ? 'badge-amber' : 'badge-green')}`}>
                        {item.surplusRisk} Surplus Risk
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginTop: '4px' }}>
                      Shelf life remaining: <strong>{item.shelfLifeHours} Hours</strong> before quality degrades
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Current Farmgate Price</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                      ₹{item.originalPrice} / kg
                    </div>
                  </div>
                </div>

                {/* Metrics Breakdown (As specified in requirement example) */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px',
                  background: 'var(--slate-50)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Current Stock
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '2px' }}>
                      {item.currentStockKg} kg
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Expected Sales
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '2px' }}>
                      {item.expectedSalesKg} kg
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Potential Surplus
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: item.surplusRisk === 'Low' ? '#16a34a' : '#dc2626', marginTop: '2px' }}>
                      {item.currentStockKg - item.expectedSalesKg} kg
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--slate-500)', fontWeight: 700, textTransform: 'uppercase' }}>
                      Suggested Discount
                    </span>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#d97706', marginTop: '2px' }}>
                      {item.suggestedDiscount > 0 ? `${item.suggestedDiscount}% OFF` : 'None Needed'}
                    </div>
                  </div>
                </div>

                {/* Strategy and Action row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ fontSize: '0.84rem', color: 'var(--slate-700)', fontWeight: 500 }}>
                      <strong>AI Strategy:</strong> {item.strategy}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                      ✓ {item.savingsPotential}
                    </div>
                  </div>

                  {item.suggestedDiscount > 0 && (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleApplyDiscount(item.id, item.suggestedDiscount)}
                        disabled={isApplied}
                        className={`btn btn-sm ${isApplied ? 'btn-secondary' : 'btn-accent'}`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 size={14} color="#16a34a" />
                            <span>{currentDiscount}% Discount Applied</span>
                          </>
                        ) : (
                          <>
                            <Percent size={14} />
                            <span>Apply {item.suggestedDiscount}% Flash Discount</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FarmerSurplus;

