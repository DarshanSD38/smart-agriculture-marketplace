import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { PlusCircle, Search, Edit3, Trash2, Eye, Filter, CheckCircle2 } from 'lucide-react';
import Rating from '../../components/Rating';

const FarmerProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const data = await productService.getAll();
    setProducts(data);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this product listing?')) {
      await productService.delete(id);
      loadProducts();
    }
  };

  const categories = ['All', 'Fruits', 'Vegetables', 'Grains', 'Milk/Farm Products'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            My Listed Products
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            Manage your crop listings, current stock levels, and marketplace prices
          </p>
        </div>

        <Link to="/farmer/add-product" className="btn btn-primary">
          <PlusCircle size={16} />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by crop name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: selectedCategory === cat ? '1px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  background: selectedCategory === cat ? 'var(--primary-600)' : '#ffffff',
                  color: selectedCategory === cat ? '#ffffff' : 'var(--slate-700)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Category</th>
              <th>Price</th>
              <th>Available Stock</th>
              <th>Harvest Date</th>
              <th>Status</th>
              <th>Rating</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', padding: '30px', color: 'var(--slate-400)' }}>
                  No products found matching your search.
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img 
                        src={p.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=80&auto=format&fit=crop&q=80"} 
                        alt={p.name} 
                        style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'cover' }} 
                      />
                      <div>
                        <Link to={`/products/${p.id}`} style={{ fontWeight: 700, color: 'var(--slate-900)' }}>
                          {p.name}
                        </Link>
                        <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)' }}>{p.source || 'Farm Harvest'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-blue">{p.category}</span>
                  </td>
                  <td>
                    <strong style={{ color: 'var(--primary-700)' }}>₹{p.price}</strong> / {p.unit}
                  </td>
                  <td>
                    <strong>{p.availableQuantity}</strong> {p.unit}
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--slate-600)' }}>
                    {p.harvestDate}
                  </td>
                  <td>
                    <span className={`badge ${p.status === 'Fresh Harvest' ? 'badge-green' : 'badge-amber'}`}>
                      {p.status || 'Active'}
                    </span>
                  </td>
                  <td>
                    <Rating value={p.rating} count={p.reviewsCount} size={12} />
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px' }}>
                      <Link to={`/products/${p.id}`} className="btn btn-secondary btn-sm" title="View Details" style={{ padding: '6px 8px' }}>
                        <Eye size={14} />
                      </Link>
                      <Link to={`/farmer/edit-product/${p.id}`} className="btn btn-secondary btn-sm" title="Edit Product" style={{ padding: '6px 8px' }}>
                        <Edit3 size={14} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="btn btn-secondary btn-sm" 
                        title="Delete Product"
                        style={{ padding: '6px 8px', color: 'var(--danger-600)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerProducts;

