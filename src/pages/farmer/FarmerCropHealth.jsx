import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';
import { 
  HeartPulse, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Leaf, 
  ShoppingBag,
  RefreshCw 
} from 'lucide-react';

const FarmerCropHealth = () => {
  const [selectedImage, setSelectedImage] = useState('https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80');
  const [selectedFile, setSelectedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState(null);

  const sampleLeafImages = [
    {
      title: 'Tomato Leaf (Blight Symptoms)',
      url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
      crop: 'Tomato'
    },
    {
      title: 'Potato Leaf Spot',
      url: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80',
      crop: 'Potato'
    },
    {
      title: 'Spinach Chlorosis',
      url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80',
      crop: 'Spinach'
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setDiagnosis(null);
    }
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const result = await aiService.diagnoseCropHealth("Tomato", selectedFile, selectedImage);
    setDiagnosis(result);
    setAnalyzing(false);
  };

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <HeartPulse size={18} />
          <span>Computer Vision Agricultural Pathology</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Crop Health Assistance
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Capture or upload an image of an affected leaf to identify fungal, bacterial or viral diseases and receive recommended organic solutions.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '24px', alignItems: 'flex-start' }}>
        {/* UPLOAD & PREVIEW CARD */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 className="card-title" style={{ marginBottom: '14px' }}>1. Upload Foliage Leaf Image</h3>

          {/* Upload Dropzone */}
          <div style={{
            border: '2px dashed var(--slate-300)',
            borderRadius: 'var(--radius-lg)',
            padding: '24px',
            textAlign: 'center',
            backgroundColor: 'var(--slate-50)',
            marginBottom: '16px'
          }}>
            <input
              type="file"
              id="leaf-upload"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileUpload}
            />
            <label htmlFor="leaf-upload" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Upload size={22} />
              </div>
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-800)' }}>
                Click to browse or take crop photo
              </span>
              <span style={{ fontSize: '0.76rem', color: 'var(--slate-400)' }}>
                Supports JPG, PNG, WEBP from mobile camera or storage
              </span>
            </label>
          </div>

          {/* Quick preset selector for instant testing */}
          <div style={{ marginBottom: '18px' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
              Or choose sample diseased specimen:
            </span>
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
              {sampleLeafImages.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => { setSelectedImage(s.url); setDiagnosis(null); }}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: selectedImage === s.url ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                    background: selectedImage === s.url ? 'var(--primary-50)' : '#ffffff',
                    color: selectedImage === s.url ? 'var(--primary-800)' : 'var(--slate-700)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          {selectedImage && (
            <div style={{ position: 'relative', height: '220px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--slate-200)', marginBottom: '18px' }}>
              <img
                src={selectedImage}
                alt="Selected Crop Foliage"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.65)', color: 'white', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem' }}>
                Foliage Preview Ready
              </div>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="btn btn-primary"
            style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}
          >
            <Sparkles size={18} />
            <span>{analyzing ? 'Scanning leaf cell patterns...' : 'Analyze Crop Health with AI'}</span>
          </button>
        </div>

        {/* AI DIAGNOSIS RESULT CARD */}
        <div>
          {diagnosis ? (
            <div className="card" style={{ padding: '24px', border: '2px solid var(--primary-400)', background: '#ffffff' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                <span className="badge badge-red" style={{ fontSize: '0.76rem' }}>
                  Pathogen Identified
                </span>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  AI Confidence: {diagnosis.confidence}%
                </span>
              </div>

              {/* Possible Issue & Confidence */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 600 }}>
                  Possible Issue:
                </div>
                <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#dc2626', lineHeight: 1.2, marginTop: '2px' }}>
                  {diagnosis.issue}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginTop: '4px' }}>
                  Detected on: <strong>{diagnosis.crop}</strong> • Severity: <strong>{diagnosis.severity}</strong>
                </div>
              </div>

              {/* Observed Symptoms */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Identified Visual Indicators:
                </div>
                <ul style={{ paddingLeft: '18px', fontSize: '0.84rem', color: 'var(--slate-700)', lineHeight: 1.5 }}>
                  {diagnosis.symptoms.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>

              {/* Crop Care Guidance */}
              <div style={{ background: 'var(--primary-50)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--primary-900)', marginBottom: '4px' }}>
                  🌱 Recommended General Crop-Care Guidance:
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--primary-800)', lineHeight: 1.5, marginBottom: '6px' }}>
                  <strong>Organic Remedy:</strong> {diagnosis.organicRemedy}
                </p>
                <p style={{ fontSize: '0.82rem', color: 'var(--primary-800)', lineHeight: 1.5 }}>
                  <strong>Chemical Control:</strong> {diagnosis.chemicalRemedy}
                </p>
              </div>

              {/* Recommended Input Category Link */}
              <div style={{ background: 'var(--slate-50)', padding: '12px 14px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', border: '1px solid var(--slate-200)' }}>
                <div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--slate-500)', fontWeight: 600 }}>Suggested Agri-Input:</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--slate-900)' }}>{diagnosis.recommendedInputName}</div>
                </div>
                <Link to="/agri-input?category=Fertilizers" className="btn btn-primary btn-sm">
                  <ShoppingBag size={14} />
                  <span>Get Bio-Fungicide</span>
                </Link>
              </div>

              {/* Mandated AI Disclaimer Warning */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', padding: '10px 12px', background: '#fffbeb', borderRadius: 'var(--radius-md)', border: '1px solid #fef3c7', fontSize: '0.76rem', color: '#92400e' }}>
                <AlertTriangle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
                <span>{diagnosis.warningNote}</span>
              </div>
            </div>
          ) : (
            <div className="card" style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--slate-400)' }}>
              <Leaf size={44} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--slate-700)' }}>AI Diagnosis Ready</h3>
              <p style={{ fontSize: '0.85rem', maxWidth: '300px', margin: '6px auto 0' }}>
                Click the "Analyze Crop Health with AI" button to run the diagnostic classification model.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerCropHealth;

