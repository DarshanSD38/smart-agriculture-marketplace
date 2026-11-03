import React, { useState, useEffect } from 'react';
import { productService } from '../../services/productService';
import { Package, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Admin Action: Remove this product from platform?')) {
      await productService.delete(id);
      const data = await productService.getAll();
      setProducts(data);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Manage Platform Products
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Quality compliance, fair pricing audits, and catalog oversight
        </p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Farmer</th>
              <th>Category</th>
              <th>Listed Price</th>
              <th>Stock</th>
              <th>Harvest Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                    <div>
                      <strong>{p.name}</strong>
                      <div style={{ fontSize: '0.74rem', color: 'var(--slate-400)' }}>ID: {p.id}</div>
                    </div>
                  </div>
                </td>
                <td>{p.farmerName}</td>
                <td><span className="badge badge-blue">{p.category}</span></td>
                <td><strong>₹{p.price}</strong> / {p.unit}</td>
                <td>{p.availableQuantity} {p.unit}</td>
                <td>{p.harvestDate}</td>
                <td>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ color: 'var(--danger-500)', padding: '4px 8px' }}
                    title="Remove Listing"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;

