import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { TrendingUp, Sparkles, MapPin, Scale, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

const FarmerAiPrice = () => {
  const [formData, setFormData] = useState({
    product: 'Organic Hybrid Tomatoes',
    quantity: '100',
    location: 'Nashik, Maharashtra',
    currentPrice: '30'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    product: "Organic Hybrid Tomatoes",
    enteredPrice: 30,
    recommendedMin: 28,
    recommendedMax: 32,
    formattedRange: "₹28 - ₹32 / kg",
    demandLevel: "High Demand",
    priceTrend: "+8% upward trend in coming 7 days",
    mandiBenchmark: 31,
    confidenceScore: 94,
    explanation: "Based on 14% drop in arrival arrivals at Nashik APMC mandi and surging weekend consumer culinary orders, pricing within ₹28 - ₹32 maximizes total sales realization while remaining cheaper than supermarket retail."
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = await aiService.getPriceRecommendation(formData);
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Sparkles size={18} />
          <span>Intelligent Pricing Engine</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          AI Price Recommendation
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Evaluate regional Mandi arrivals, consumer demand velocity, and seasonal factors to discover the optimum market price.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '24px', alignItems: 'flex-start' }}>
        {/* INPUT FORM */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Enter Crop Parameters</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Crop / Product *</label>
              <select
                className="form-select"
                value={formData.product}
                onChange={(e) => setFormData(p => ({ ...p, product: e.target.value }))}
              >
                <option value="Organic Hybrid Tomatoes">Organic Hybrid Tomatoes</option>
                <option value="Fresh Red Onions">Fresh Red Onions</option>
                <option value="Desi Table Potatoes">Desi Table Potatoes</option>
                <option value="Kashmiri Gala Apples">Kashmiri Gala Apples</option>
                <option value="Sharbati Wheat Grain">Sharbati Wheat Grain</option>
                <option value="Fresh Baby Spinach">Fresh Baby Spinach</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Harvest Quantity (kg) *</label>
              <input
                type="number"
                className="form-input"
                value={formData.quantity}
                onChange={(e) => setFormData(p => ({ ...p, quantity: e.target.value }))}
                placeholder="e.g. 100"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Market Location / APMC Mandi *</label>
              <input
                type="text"
                className="form-input"
                value={formData.location}
                onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                placeholder="e.g. Nashik, Maharashtra"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Your Current Planned Price (₹/kg) *</label>
              <input
                type="number"
                className="form-input"
                value={formData.currentPrice}
                onChange={(e) => setFormData(p => ({ ...p, currentPrice: e.target.value }))}
                placeholder="e.g. 30"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', marginTop: '10px' }}
            >
              <Sparkles size={16} />
              <span>{loading ? 'Analyzing Market Signals...' : 'Generate AI Price Recommendation'}</span>
            </button>
          </form>
        </div>

        {/* AI PREDICTION RESULT CARD */}
        <div>
          {result ? (
            <div className="card" style={{ padding: '28px', border: '2px solid var(--primary-300)', background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="badge badge-green" style={{ fontSize: '0.78rem' }}>
                  AI Confidence: {result.confidenceScore}%
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                  Computed Just Now
                </span>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                  Recommended Sale Price:
                </div>
                <div style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--primary-700)', lineHeight: 1.1, marginTop: '4px' }}>
                  {result.formattedRange}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginTop: '4px' }}>
                  Planned Price: <strong>₹{result.enteredPrice}/kg</strong>
                </div>
              </div>

              {/* Signals Grid */}
              <div className="grid-2" style={{ gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: '#ffffff', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Demand Level
                  </div>
                  <div style={{ fontWeight: 800, color: '#16a34a', fontSize: '1rem', marginTop: '2px' }}>
                    {result.demandLevel}
                  </div>
                </div>

                <div style={{ background: '#ffffff', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Price Trend (7 Days)
                  </div>
                  <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.85rem', marginTop: '2px' }}>
                    {result.priceTrend}
                  </div>
                </div>
              </div>

              {/* Simple Explanation */}
              <div style={{ background: '#ffffff', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--slate-200)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '6px' }}>
                  <HelpCircle size={15} color="#16a34a" />
                  <span>AI Market Explanation</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', lineHeight: 1.55 }}>
                  {result.explanation}
                </p>
              </div>

              {/* Benchmark bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', background: 'var(--slate-100)', borderRadius: 'var(--radius-md)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--slate-600)' }}>Nearby APMC Mandi Benchmark:</span>
                <strong style={{ color: 'var(--slate-800)' }}>₹{result.mandiBenchmark} / kg</strong>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
              Fill the parameters on the left to view the AI analysis.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerAiPrice;

