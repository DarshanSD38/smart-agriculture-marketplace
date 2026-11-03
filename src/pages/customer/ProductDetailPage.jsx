import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { api } from '../../services/api';
import { useCart } from '../../context/CartContext';
import Rating from '../../components/Rating';
import { 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  ShieldCheck, 
  ShoppingCart, 
  ArrowLeft, 
  Sprout, 
  Scale, 
  Truck, 
  Award, 
  Star 
} from 'lucide-react';
import { INITIAL_REVIEWS } from '../../data/mockData';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [newReview, setNewReview] = useState({ name: 'Aarav Sharma', rating: 5, comment: '' });
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    productService.getById(id).then(data => {
      setProduct(data);
      setLoading(false);
    });

    api.get(`/reviews/product/${id}`)
      .then(res => {
        if (res.success && res.reviews && res.reviews.length > 0) {
          setReviews(res.reviews);
        }
      })
      .catch(() => {});
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, Number(qty));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;

    // Send to backend
    api.post('/reviews', {
      productId: id,
      rating: Number(newReview.rating),
      comment: newReview.comment
    }).catch(err => {
      console.warn('Backend review API call note:', err.message);
    });

    const addedRev = {
      id: `rev-${Date.now()}`,
      productId: id,
      customerName: newReview.name,
      rating: Number(newReview.rating),
      date: new Date().toISOString().split('T')[0],
      verified: true,
      comment: newReview.comment
    };

    setReviews([addedRev, ...reviews]);
    setNewReview(p => ({ ...p, comment: '' }));
  };

  if (loading) {
    return <div style={{ padding: '60px', textAlign: 'center' }}>Loading product details...</div>;
  }

  if (!product) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/marketplace" className="btn btn-secondary" style={{ marginTop: '16px' }}>
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link to="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 600 }}>
          <ArrowLeft size={16} /> Back to Marketplace
        </Link>
      </div>

      <div className="grid-2" style={{ gap: '32px', marginBottom: '40px', alignItems: 'flex-start' }}>
        {/* PRODUCT IMAGE & TRUST BADGES */}
        <div>
          <div style={{ position: 'relative', height: '380px', borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--slate-200)', boxShadow: 'var(--shadow-sm)' }}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            {product.organic && (
              <div style={{ position: 'absolute', top: '14px', left: '14px', background: '#166534', color: 'white', padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sprout size={14} /> 100% Certified Organic
              </div>
            )}
            <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)', padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.78rem', fontWeight: 800, color: 'var(--primary-800)' }}>
              {product.status || 'Fresh Harvest'}
            </div>
          </div>

          {/* Trust Highlights */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '16px' }}>
            <div style={{ background: 'var(--primary-50)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={22} color="#16a34a" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--primary-900)' }}>Zero Chemical Residue</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--primary-700)' }}>Tested pesticide-free</div>
              </div>
            </div>

            <div style={{ background: 'var(--earth-50)', padding: '12px', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Truck size={22} color="#d97706" />
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 800, color: 'var(--earth-700)' }}>Dawn Harvest & Dispatch</div>
                <div style={{ fontSize: '0.74rem', color: 'var(--earth-700)' }}>Direct within 24 hours</div>
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS & PURCHASING */}
        <div>
          <div style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700, color: 'var(--slate-400)', marginBottom: '4px' }}>
            {product.category} • Grade: {product.grade || 'Grade A'}
          </div>

          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--slate-900)', lineHeight: 1.25, marginBottom: '8px' }}>
            {product.name}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
            <Rating value={product.rating} count={product.reviewsCount} size={16} />
            <span style={{ color: 'var(--slate-300)' }}>|</span>
            <span style={{ fontSize: '0.84rem', color: '#16a34a', fontWeight: 700 }}>
              ✓ Verified Farm Source
            </span>
          </div>

          {/* Price & Stock */}
          <div style={{ background: 'var(--slate-50)', padding: '18px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--slate-200)', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <span style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                ₹{product.price}
              </span>
              <span style={{ fontSize: '1rem', color: 'var(--slate-500)', fontWeight: 600 }}>/ {product.unit}</span>
            </div>

            <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: '0.82rem', color: 'var(--slate-600)' }}>
              <div>Available Harvest: <strong>{product.availableQuantity} {product.unit}</strong></div>
              <div>Harvest Date: <strong>{product.harvestDate}</strong></div>
            </div>
          </div>

          {/* FARMER / SOURCE PROFILE (Mandated by Section 18) */}
          <div className="card" style={{ padding: '16px', marginBottom: '20px', background: '#ffffff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {product.farmerName ? product.farmerName[0] : 'F'}
                </div>
                <div>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                    {product.farmerName}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <MapPin size={12} /> {product.farmerLocation} ({product.distanceKm || 4.2} km away)
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>4.8 ★ Grower</span>
              </div>
            </div>

            <div style={{ fontSize: '0.82rem', color: 'var(--slate-600)', background: 'var(--slate-50)', padding: '8px 12px', borderRadius: 'var(--radius-sm)' }}>
              Plot Origin: <strong>{product.source || 'Green Valley Organics, Plot #14'}</strong>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-900)', marginBottom: '6px' }}>
              Cultivation & Product Details
            </h4>
            <p style={{ fontSize: '0.86rem', color: 'var(--slate-600)', lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>

          {/* Action Row */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--slate-300)', borderRadius: 'var(--radius-md)', padding: '4px 10px', background: '#ffffff' }}>
              <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', padding: '4px' }}>-</button>
              <span style={{ minWidth: '32px', textAlign: 'center', fontWeight: 800 }}>{qty}</span>
              <button onClick={() => setQty(qty + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', padding: '4px' }}>+</button>
            </div>

            <button
              onClick={handleAddToCart}
              className={`btn ${added ? 'btn-secondary' : 'btn-primary'}`}
              style={{ flex: 1, padding: '12px' }}
            >
              <ShoppingCart size={16} />
              <span>{added ? 'Added to Smart Basket!' : `Add ${qty} ${product.unit} to Basket (₹${product.price * qty})`}</span>
            </button>

            <Link
              to={`/customer/price-comparison?commodity=${product.category === 'Vegetables' ? 'Tomato' : 'Onion'}`}
              className="btn btn-secondary"
              title="Compare price across other farms"
            >
              <Scale size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* REVIEWS & RATINGS SECTION (Mandated by Section 18) */}
      <section style={{ borderTop: '1px solid var(--slate-200)', paddingTop: '32px', marginBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Verified Customer Reviews & Feedback
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--slate-500)' }}>
              Authentic feedback from verified neighborhood consumers
            </p>
          </div>
        </div>

        <div className="grid-3" style={{ gap: '24px', alignItems: 'flex-start' }}>
          {/* REVIEWS LIST (2 COLS) */}
          <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {reviews.map(rev => (
              <div key={rev.id} className="card" style={{ padding: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--slate-900)', fontSize: '0.92rem' }}>{rev.customerName}</span>
                    {rev.verified && (
                      <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>Verified Buyer</span>
                    )}
                  </div>
                  <Rating value={rev.rating} showCount={false} size={13} />
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--slate-400)', marginBottom: '8px' }}>Reviewed on {rev.date}</div>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-700)', lineHeight: 1.5 }}>
                  "{rev.comment}"
                </p>
              </div>
            ))}
          </div>

          {/* WRITE A REVIEW FORM (1 COL) */}
          <div className="card" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '14px' }}>
              Write a Verified Review
            </h3>

            <form onSubmit={handleAddReview}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={newReview.name}
                  onChange={(e) => setNewReview(p => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Rating</label>
                <select
                  className="form-select"
                  value={newReview.rating}
                  onChange={(e) => setNewReview(p => ({ ...p, rating: e.target.value }))}
                >
                  <option value="5">5 ★★★★★ (Exceptional Freshness)</option>
                  <option value="4">4 ★★★★☆ (Very Good)</option>
                  <option value="3">3 ★★★☆☆ (Average)</option>
                  <option value="2">2 ★★☆☆☆ (Below Expectation)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Review Comments</label>
                <textarea
                  rows={3}
                  className="form-textarea"
                  placeholder="Share details about taste, freshness, and packaging..."
                  value={newReview.comment}
                  onChange={(e) => setNewReview(p => ({ ...p, comment: e.target.value }))}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px' }}>
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;

