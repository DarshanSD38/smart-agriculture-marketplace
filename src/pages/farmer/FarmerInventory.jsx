import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { Warehouse, AlertTriangle, ArrowUpRight, TrendingDown, CheckCircle2, RefreshCw } from 'lucide-react';

const FarmerInventory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getAll().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const totalStock = products.reduce((acc, p) => acc + (p.availableQuantity || 0), 0);
  const totalValue = products.reduce((acc, p) => acc + (p.availableQuantity * p.price || 0), 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Farm Inventory & Storage
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            Live tracking of harvested stocks, shelf-life indicators, and warehouse valuation
          </p>
        </div>

        <Link to="/farmer/surplus" className="btn btn-accent">
          <AlertTriangle size={16} />
          <span>Surplus Management</span>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Total Warehouse Volume</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '4px' }}>
            {totalStock} kg
          </div>
          <div style={{ fontSize: '0.78rem', color: '#16a34a', marginTop: '4px' }}>
            ● Normal optimal capacity across 8 bins
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Total Stock Market Value</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '4px' }}>
            ₹{totalValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', marginTop: '4px' }}>
            Based on current farmgate prices
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Perishable Risk Alert</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ea580c', marginTop: '4px' }}>
            2 Items
          </div>
          <div style={{ fontSize: '0.78rem', color: '#ea580c', marginTop: '4px' }}>
            Spinach & Tomatoes require fast dispatch
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Unit Price</th>
              <th>Stock Value</th>
              <th>Storage Type</th>
              <th>Shelf Life Remaining</th>
              <th>Health Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const isPerishable = p.category === 'Vegetables' || p.category === 'Milk/Farm Products';
              const shelfLife = p.category === 'Milk/Farm Products' ? '12 Hours' : (p.category === 'Vegetables' ? '2-3 Days' : '45+ Days');

              return (
                <tr key={p.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={p.image} 
                        alt={p.name} 
                        style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} 
                      />
                      <strong>{p.name}</strong>
                    </div>
                  </td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td><strong>{p.availableQuantity}</strong> {p.unit}</td>
                  <td>₹{p.price}</td>
                  <td><strong>₹{(p.availableQuantity * p.price).toLocaleString()}</strong></td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--slate-600)' }}>
                    {isPerishable ? 'Cold Room / Aerated Crates' : 'Dry Grain Silo'}
                  </td>
                  <td style={{ fontSize: '0.82rem', fontWeight: 600, color: isPerishable ? '#ea580c' : '#16a34a' }}>
                    {shelfLife}
                  </td>
                  <td>
                    <span className={`badge ${p.availableQuantity > 50 ? 'badge-green' : 'badge-amber'}`}>
                      {p.availableQuantity > 50 ? 'Healthy Stock' : 'Low Stock'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FarmerInventory;

