import React, { useState, useEffect } from 'react';
import { aiService } from '../../services/aiService';
import { BrainCircuit, TrendingUp, Calendar, Info, BarChart2, CheckCircle2 } from 'lucide-react';

const FarmerDemandPrediction = () => {
  const [selectedCrop, setSelectedCrop] = useState('Tomato');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPrediction(selectedCrop);
  }, [selectedCrop]);

  const fetchPrediction = async (crop) => {
    setLoading(true);
    const res = await aiService.getDemandPrediction(crop);
    setData(res);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <BrainCircuit size={18} />
          <span>Predictive Analytics</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          AI Crop Demand Prediction
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Anticipate retail household and commercial culinary demand for upcoming crop harvest cycles.
        </p>
      </div>

      {/* CROP SELECTOR BUTTONS */}
      <div className="card" style={{ padding: '16px', marginBottom: '24px' }}>
        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '10px' }}>
          Select Crop for Demand Analysis:
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {['Tomato', 'Onion', 'Potato'].map(crop => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              style={{
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                border: selectedCrop === crop ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                background: selectedCrop === crop ? 'var(--primary-50)' : '#ffffff',
                color: selectedCrop === crop ? 'var(--primary-800)' : 'var(--slate-700)',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s'
              }}
            >
              <span>{crop}</span>
              {selectedCrop === crop && <CheckCircle2 size={16} color="#16a34a" />}
            </button>
          ))}
        </div>
      </div>

      {loading || !data ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
          Loading AI forecast models...
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* TOP METRICS */}
          <div className="grid-3">
            <div className="card">
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Commodity Analyzed</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '4px' }}>
                {data.product}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-400)', marginTop: '4px' }}>Regional urban cluster</div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Total Expected Demand (30 Days)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '4px' }}>
                {data.expectedDemandKg} kg
              </div>
              <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700, marginTop: '4px' }}>
                {data.weeklyTrendPercentage} trend vs previous cycle
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>Demand Level</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#16a34a', marginTop: '4px' }}>
                {data.demandLevel}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '4px' }}>
                Deficit conditions expected
              </div>
            </div>
          </div>

          {/* SIMPLE PREDICTION CHART */}
          <div className="card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 className="card-title">Weekly Demand Forecast (Next 4 Weeks)</h3>
                <p className="card-subtitle">Projected consumer and restaurant buying volume in kg</p>
              </div>
              <span className="badge badge-green">AI Model: High Confidence</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '24px', borderBottom: '1px solid var(--slate-200)', gap: '20px' }}>
              {data.forecastData.map((item, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--slate-800)', marginBottom: '6px' }}>
                    {item.expectedKg} kg
                  </div>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '48px',
                      height: `${(item.expectedKg / 200) * 100}%`,
                      backgroundColor: item.color,
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.4s ease'
                    }}
                  />
                  <span style={{ fontSize: '0.78rem', color: 'var(--slate-600)', marginTop: '8px', textAlign: 'center', fontWeight: 600 }}>
                    {item.week}
                  </span>
                </div>
              ))}
            </div>

            {/* Seasonal insight & advice */}
            <div style={{ marginTop: '20px', padding: '16px', background: 'var(--primary-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '4px' }}>
                <Info size={18} color="#16a34a" />
                <span>AI Seasonal Cultivation Insight</span>
              </div>
              <p style={{ fontSize: '0.86rem', color: 'var(--primary-800)', lineHeight: 1.55 }}>
                {data.seasonalInsight}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerDemandPrediction;

