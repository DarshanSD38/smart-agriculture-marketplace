import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, Upload, CheckCircle2, Sprout, Image } from 'lucide-react';

const FarmerAddProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    quantity: '',
    unit: 'kg',
    price: '',
    harvestDate: new Date().toISOString().split('T')[0],
    location: user?.location || 'Nashik, Maharashtra',
    description: '',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80',
    organic: true,
    status: 'Fresh Harvest'
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Preset sample images for convenient instant selection
  const sampleImages = [
    { label: 'Tomatoes', url: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop&q=80' },
    { label: 'Onions', url: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80' },
    { label: 'Apples', url: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80' },
    { label: 'Wheat', url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80' },
    { label: 'Milk', url: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&auto=format&fit=crop&q=80' },
    { label: 'Spinach', url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&auto=format&fit=crop&q=80' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};

    if (!formData.name.trim()) errs.name = 'Product name is required';
    if (!formData.quantity || formData.quantity <= 0) errs.quantity = 'Valid quantity is required';
    if (!formData.price || formData.price <= 0) errs.price = 'Valid price is required';
    if (!formData.harvestDate) errs.harvestDate = 'Harvest date is required';
    if (!formData.description.trim()) errs.description = 'Brief description is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    await productService.create({
      ...formData,
      quantity: Number(formData.quantity),
      availableQuantity: Number(formData.quantity),
      price: Number(formData.price),
      farmerId: user?.id || 'f-1',
      farmerName: user?.name || 'Ramesh Patel',
      farmerLocation: formData.location,
      source: user?.farmName || 'Direct Organic Farm'
    });

    setSubmitting(false);
    navigate('/farmer/products');
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/farmer/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
          <ArrowLeft size={16} /> Back to My Products
        </Link>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Add New Agricultural Product
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          List a new harvest in the marketplace for direct customer purchasing
        </p>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Organic Hybrid Tomatoes"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span style={{ color: 'var(--danger-600)', fontSize: '0.75rem' }}>{errors.name}</span>}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Category *</label>
              <select
                name="category"
                className="form-select"
                value={formData.category}
                onChange={handleChange}
              >
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Grains">Grains</option>
                <option value="Milk/Farm Products">Milk/Farm Products</option>
              </select>
            </div>
          </div>

          <div className="grid-3" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Quantity Available *</label>
              <input
                type="number"
                name="quantity"
                className="form-input"
                placeholder="e.g. 150"
                value={formData.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <span style={{ color: 'var(--danger-600)', fontSize: '0.75rem' }}>{errors.quantity}</span>}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Unit of Measure *</label>
              <select
                name="unit"
                className="form-select"
                value={formData.unit}
                onChange={handleChange}
              >
                <option value="kg">kg (Kilogram)</option>
                <option value="bunch">bunch</option>
                <option value="litre">litre</option>
                <option value="dozen">dozen</option>
                <option value="quintal">quintal</option>
              </select>
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Price per Unit (₹) *</label>
              <input
                type="number"
                name="price"
                className="form-input"
                placeholder="e.g. 30"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <span style={{ color: 'var(--danger-600)', fontSize: '0.75rem' }}>{errors.price}</span>}
            </div>
          </div>

          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Harvest Date *</label>
              <input
                type="date"
                name="harvestDate"
                className="form-input"
                value={formData.harvestDate}
                onChange={handleChange}
              />
              {errors.harvestDate && <span style={{ color: 'var(--danger-600)', fontSize: '0.75rem' }}>{errors.harvestDate}</span>}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Farm Location *</label>
              <input
                type="text"
                name="location"
                className="form-input"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Product Image URL</label>
            <input
              type="text"
              name="image"
              className="form-input"
              value={formData.image}
              onChange={handleChange}
              placeholder="Paste image link or choose sample below"
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', fontWeight: 600 }}>Quick sample photo presets: </span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                {sampleImages.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, image: s.url }))}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: formData.image === s.url ? '1px solid var(--primary-600)' : '1px solid var(--slate-200)',
                      background: formData.image === s.url ? 'var(--primary-100)' : '#ffffff',
                      color: formData.image === s.url ? 'var(--primary-800)' : 'var(--slate-600)',
                      fontSize: '0.75rem',
                      cursor: 'pointer'
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview image */}
            {formData.image && (
              <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src={formData.image} 
                  alt="Preview" 
                  style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--slate-300)' }} 
                />
                <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Live Image Preview</span>
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Description & Cultivation Highlights *</label>
            <textarea
              name="description"
              rows={3}
              className="form-textarea"
              placeholder="Detail harvest quality, seed variety, and farming methodology..."
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <span style={{ color: 'var(--danger-600)', fontSize: '0.75rem' }}>{errors.description}</span>}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', background: 'var(--slate-50)', padding: '12px 16px', borderRadius: 'var(--radius-md)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 600 }}>
              <input
                type="checkbox"
                name="organic"
                checked={formData.organic}
                onChange={handleChange}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary-600)' }}
              />
              <span>Certified Organic / Zero Chemical Residue</span>
            </label>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--slate-500)' }}>Status:</span>
              <select
                name="status"
                className="form-select"
                style={{ width: 'auto', padding: '4px 10px', fontSize: '0.82rem' }}
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Fresh Harvest">Fresh Harvest</option>
                <option value="In Stock">In Stock</option>
                <option value="Limited Stock">Limited Stock</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={submitting} className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
              <CheckCircle2 size={16} />
              <span>{submitting ? 'Publishing...' : 'Publish Product to Marketplace'}</span>
            </button>
            <button type="button" onClick={() => navigate('/farmer/products')} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FarmerAddProduct;

