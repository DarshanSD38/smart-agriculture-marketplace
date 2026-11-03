import React, { useState } from 'react';
import { aiService } from '../../services/aiService';
import { Sprout, Sparkles, Droplets, Thermometer, FlaskConical, CloudRain, CheckCircle2, ArrowRight } from 'lucide-react';

const FarmerCropRecommendation = () => {
  const [formData, setFormData] = useState({
    N: 90,
    P: 42,
    K: 43,
    temperature: 20.8,
    humidity: 82.0,
    ph: 6.5,
    rainfall: 202.9
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({
    recommendedCrop: 'Rice',
    confidence: 93.5,
    topAlternatives: [
      { crop: 'Rice', confidence: 93.5 },
      { crop: 'Jute', confidence: 6.5 }
    ],
    guidance: 'Soil and climatic suitability indicates Rice will deliver optimal germination and commercial harvest yield.'
  });

  const presetSamples = [
    {
      name: 'Rice (Kharif / High Rain)',
      values: { N: 90, P: 42, K: 43, temperature: 20.8, humidity: 82.0, ph: 6.5, rainfall: 202.9 }
    },
    {
      name: 'Maize (Loamy Soil)',
      values: { N: 75, P: 45, K: 20, temperature: 24.5, humidity: 65.0, ph: 6.2, rainfall: 85.0 }
    },
    {
      name: 'Chickpea (Dry / Rabi)',
      values: { N: 40, P: 60, K: 80, temperature: 18.0, humidity: 35.0, ph: 7.2, rainfall: 70.0 }
    },
    {
      name: 'Apple (Hilly / Cool Temperate)',
      values: { N: 20, P: 130, K: 200, temperature: 22.0, humidity: 92.0, ph: 5.9, rainfall: 110.0 }
    }
  ];

  const handlePreset = (sample) => {
    setFormData(sample.values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await aiService.getCropRecommendation(formData);
    setResult(res);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Sparkles size={18} />
          <span>Soil & Climate Machine Learning Suite</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          AI Crop Recommendation
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Trained Scikit-Learn Random Forest model analyzes Nitrogen, Phosphorus, Potassium (NPK), soil pH, and environmental climate to recommend optimal high-yield crops.
        </p>
      </div>

      {/* Preset Quick Fill */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--slate-600)' }}>Load Test Presets:</span>
        {presetSamples.map((ps, idx) => (
          <button
            key={idx}
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => handlePreset(ps)}
            style={{ fontSize: '0.78rem' }}
          >
            {ps.name}
          </button>
        ))}
      </div>

      <div className="grid-2" style={{ gap: '24px', alignItems: 'flex-start' }}>
        {/* INPUT FORM */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Soil & Climate Parameters</h3>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Nitrogen (N) *</label>
                <input
                  type="number"
                  step="any"
                  className="form-input"
                  value={formData.N}
                  onChange={(e) => setFormData(p => ({ ...p, N: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Phosphorus (P) *</label>
                <input
                  type="number"
                  step="any"
                  className="form-input"
                  value={formData.P}
                  onChange={(e) => setFormData(p => ({ ...p, P: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Potassium (K) *</label>
                <input
                  type="number"
                  step="any"
                  className="form-input"
                  value={formData.K}
                  onChange={(e) => setFormData(p => ({ ...p, K: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>
                  <Thermometer size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Temperature (°C) *
                </label>
                <input
                  type="number"
                  step="any"
                  className="form-input"
                  value={formData.temperature}
                  onChange={(e) => setFormData(p => ({ ...p, temperature: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>
                  <Droplets size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Humidity (%) *
                </label>
                <input
                  type="number"
                  step="any"
                  className="form-input"
                  value={formData.humidity}
                  onChange={(e) => setFormData(p => ({ ...p, humidity: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>
                  <FlaskConical size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Soil pH (0 - 14) *
                </label>
                <input
                  type="number"
                  step="0.1"
                  className="form-input"
                  value={formData.ph}
                  onChange={(e) => setFormData(p => ({ ...p, ph: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>
                  <CloudRain size={14} style={{ display: 'inline', marginRight: '4px' }} />
                  Rainfall (mm) *
                </label>
                <input
                  type="number"
                  step="any"
                  className="form-input"
                  value={formData.rainfall}
                  onChange={(e) => setFormData(p => ({ ...p, rainfall: e.target.value }))}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Sprout size={18} />
              <span>{loading ? 'Evaluating ML Model...' : 'Predict Recommended Crop'}</span>
            </button>
          </form>
        </div>

        {/* RESULTS CARD */}
        <div>
          {result ? (
            <div className="card" style={{ padding: '24px', border: '2px solid var(--primary-300)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span className="badge badge-success" style={{ fontSize: '0.85rem', padding: '6px 12px' }}>
                  <CheckCircle2 size={16} /> Best Suited Crop
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                  Random Forest ML Classifier
                </span>
              </div>

              <div style={{ textAlign: 'center', padding: '20px 0', borderBottom: '1px solid var(--slate-100)', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.9rem', color: 'var(--slate-500)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Recommended Crop
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary-800)', margin: '8px 0' }}>
                  {result.recommendedCrop}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--primary-50)', color: 'var(--primary-700)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: '0.88rem' }}>
                  <span>Model Confidence: {result.confidence}%</span>
                </div>
              </div>

              {/* Top Alternatives */}
              {result.topAlternatives && result.topAlternatives.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-800)', marginBottom: '10px' }}>
                    Probability Breakdown:
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {result.topAlternatives.map((alt, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'var(--slate-50)', borderRadius: 'var(--radius-md)' }}>
                        <span style={{ fontWeight: 600, color: 'var(--slate-700)', fontSize: '0.85rem' }}>{alt.crop}</span>
                        <span style={{ fontWeight: 700, color: 'var(--primary-700)', fontSize: '0.85rem' }}>{alt.confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guidance Box */}
              <div style={{ backgroundColor: 'var(--slate-50)', padding: '14px', borderRadius: 'var(--radius-md)', borderLeft: '4px solid var(--primary-600)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-700)', marginBottom: '4px' }}>
                  Agronomic Guidance:
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--slate-600)', lineHeight: 1.5 }}>
                  {result.guidance}
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--slate-400)' }}>
              <Sprout size={48} style={{ margin: '0 auto 12px auto', opacity: 0.4 }} />
              <p>Enter soil values and click "Predict Recommended Crop" to run the machine learning model.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerCropRecommendation;

