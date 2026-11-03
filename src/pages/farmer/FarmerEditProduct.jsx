import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { ArrowLeft, CheckCircle2, Save } from 'lucide-react';

const FarmerEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    productService.getById(id).then(prod => {
      if (prod) {
        setFormData(prod);
      }
      setLoading(false);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await productService.update(id, {
      ...formData,
      quantity: Number(formData.quantity),
      availableQuantity: Number(formData.availableQuantity),
      price: Number(formData.price)
    });
    setSaving(false);
    navigate('/farmer/products');
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (!formData) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3>Product Not Found</h3>
        <Link to="/farmer/products" className="btn btn-secondary" style={{ marginTop: '16px' }}>
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/farmer/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
          <ArrowLeft size={16} /> Back to My Products
        </Link>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Edit: {formData.name}
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Update stock quantity, selling price, or product status
        </p>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Product Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Category</label>
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
              <label className="form-label">Available Stock</label>
              <input
                type="number"
                name="availableQuantity"
                className="form-input"
                value={formData.availableQuantity}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Unit</label>
              <input
                type="text"
                name="unit"
                className="form-input"
                value={formData.unit}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Price per Unit (₹)</label>
              <input
                type="number"
                name="price"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Harvest Date</label>
              <input
                type="date"
                name="harvestDate"
                className="form-input"
                value={formData.harvestDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Listing Status</label>
              <select
                name="status"
                className="form-select"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Fresh Harvest">Fresh Harvest</option>
                <option value="In Stock">In Stock</option>
                <option value="Limited Stock">Limited Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              rows={3}
              className="form-textarea"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={saving} className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
              <Save size={16} />
              <span>{saving ? 'Saving Changes...' : 'Save Product Changes'}</span>
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

export default FarmerEditProduct;

