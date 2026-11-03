import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { ShieldCheck, Truck, CheckCircle2, ArrowLeft, CreditCard, Banknote } from 'lucide-react';

const CheckoutPage = () => {
  const { cartItems, cartSubtotal, deliveryFee, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || 'Aarav Sharma',
    phone: user?.phone || '+91 99887 76655',
    address: user?.address || 'Flat 402, Green Meadows Apt, Baner, Pune 411045',
    paymentMethod: 'UPI'
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);
    const order = await orderService.createOrder({
      items: cartItems,
      deliveryAddress: formData.address,
      customerName: formData.name,
      customerPhone: formData.phone,
      paymentMethod: formData.paymentMethod === 'UPI' ? 'UPI / Online Paid' : 'Cash on Delivery'
    });

    clearCart();
    setLoading(false);
    navigate(`/customer/orders/confirmation/${order.id}`);
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center', padding: '0 20px' }}>
        <h2>Your basket is empty</h2>
        <Link to="/marketplace" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Back to Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/customer/basket" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
          <ArrowLeft size={16} /> Back to Smart Basket
        </Link>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Order Checkout & Delivery Details
        </h1>
      </div>

      <div className="grid-3" style={{ gap: '24px', alignItems: 'flex-start' }}>
        {/* CHECKOUT FORM (2 COLS) */}
        <div style={{ gridColumn: 'span 2' }}>
          <form onSubmit={handleSubmit} className="card" style={{ padding: '24px' }}>
            <h3 className="card-title" style={{ marginBottom: '16px' }}>1. Delivery Address</h3>

            <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Recipient Name *</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Contact Phone *</label>
                <input
                  type="tel"
                  className="form-input"
                  value={formData.phone}
                  onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Complete Delivery Address *</label>
              <textarea
                rows={3}
                className="form-textarea"
                value={formData.address}
                onChange={(e) => setFormData(p => ({ ...p, address: e.target.value }))}
                required
              />
            </div>

            <h3 className="card-title" style={{ marginTop: '24px', marginBottom: '16px' }}>2. Payment Method</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
              <label
                style={{
                  border: formData.paymentMethod === 'UPI' ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  background: formData.paymentMethod === 'UPI' ? 'var(--primary-50)' : '#ffffff',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'UPI'}
                  onChange={() => setFormData(p => ({ ...p, paymentMethod: 'UPI' }))}
                  style={{ accentColor: 'var(--primary-600)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>UPI / Online Payment</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)' }}>GPay, PhonePe, Cards</div>
                </div>
              </label>

              <label
                style={{
                  border: formData.paymentMethod === 'COD' ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  background: formData.paymentMethod === 'COD' ? 'var(--primary-50)' : '#ffffff',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'COD'}
                  onChange={() => setFormData(p => ({ ...p, paymentMethod: 'COD' }))}
                  style={{ accentColor: 'var(--primary-600)' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Cash on Delivery</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--slate-500)' }}>Pay when delivered</div>
                </div>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', padding: '14px', fontSize: '1rem' }}>
              <span>{loading ? 'Confirming with Farmer...' : `Place Direct Farm Order (₹${cartTotal})`}</span>
            </button>
          </form>
        </div>

        {/* ORDER REVIEW SUMMARY (1 COL) */}
        <div className="card" style={{ padding: '20px' }}>
          <h4 style={{ fontSize: '0.96rem', fontWeight: 700, marginBottom: '14px', color: 'var(--slate-900)' }}>
            Order Items ({cartItems.length})
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px', maxHeight: '220px', overflowY: 'auto' }}>
            {cartItems.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <span style={{ color: 'var(--slate-700)' }}>{item.name} × {item.quantity} {item.unit}</span>
                <strong>₹{item.price * item.quantity}</strong>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--slate-100)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.84rem', color: 'var(--slate-600)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal:</span>
              <span>₹{cartSubtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Delivery Fee:</span>
              <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '8px' }}>
              <span>Total:</span>
              <span style={{ color: 'var(--primary-700)' }}>₹{cartTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

