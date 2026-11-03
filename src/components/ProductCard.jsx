import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Rating from './Rating';
import { MapPin, Calendar, ShoppingCart, Check, Scale } from 'lucide-react';

const ProductCard = ({ product, showFarmer = true }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrap">
        <img 
          src={product.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&auto=format&fit=crop&q=80"} 
          alt={product.name} 
          className="product-image"
          loading="lazy" 
        />
        {product.status && (
          <span className="product-badge-overlay">
            {product.status}
          </span>
        )}
        {product.organic && (
          <span 
            className="product-badge-overlay" 
            style={{ left: 'auto', right: '10px', background: '#dcfce7', color: '#166534' }}
          >
            Organic
          </span>
        )}
      </Link>

      <div className="product-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--slate-400)', fontWeight: 700 }}>
            {product.category}
          </span>
          <Rating value={product.rating} count={product.reviewsCount} size={13} />
        </div>

        <Link to={`/products/${product.id}`} className="product-title">
          {product.name}
        </Link>

        {showFarmer && (
          <div className="product-farmer">
            <span style={{ fontWeight: 600, color: 'var(--slate-700)' }}>{product.farmerName}</span>
            <span>•</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <MapPin size={12} /> {product.farmerLocation?.split(',')[0]}
            </span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px', fontSize: '0.78rem', color: 'var(--slate-500)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={13} /> Harvest: {product.harvestDate}
          </span>
          <span>Stock: <strong>{product.availableQuantity} {product.unit}</strong></span>
        </div>

        <div className="product-price-row">
          <div>
            <span className="product-price">₹{product.price}</span>
            <span className="product-unit"> / {product.unit}</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <Link 
              to={`/customer/price-comparison?commodity=${product.category === 'Vegetables' ? 'Tomato' : 'Onion'}`}
              className="btn btn-secondary btn-sm"
              title="Compare with other farmers"
              style={{ padding: '6px 8px' }}
            >
              <Scale size={14} />
            </Link>
            <button
              onClick={handleAddToCart}
              className={`btn btn-sm ${added ? 'btn-secondary' : 'btn-primary'}`}
              style={{ minWidth: '105px' }}
            >
              {added ? (
                <>
                  <Check size={14} style={{ color: '#16a34a' }} />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={14} />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

