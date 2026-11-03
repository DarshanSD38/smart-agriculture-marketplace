import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Truck,
  PlusCircle
} from 'lucide-react';

const CustomerSmartBasket = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    cartSubtotal, 
    deliveryFee, 
    cartTotal,
    addToCart,
    clearCart
  } = useCart();
  const navigate = useNavigate();

  // Smart Complementary Suggestions
  const smartSuggestions = [
    {
      id: "prod-7",
      name: "Desi Table Potatoes (Jyoti)",
      price: 26,
      unit: "kg",
      farmerName: "Suresh Kumar",
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&auto=format&fit=crop&q=80",
      reason: "Essential kitchen pairing with onions & tomatoes for vegetable curries"
    },
    {
      id: "prod-6",
      name: "Fresh Baby Spinach (Palak)",
      price: 25,
      unit: "bunch",
      farmerName: "Ramesh Patel",
      image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&auto=format&fit=crop&q=80",
      reason: "Harvested this morning at Green Valley Organics — perfect for nutritious greens"
    }
  ];

  const handleAddSuggestion = (item) => {
    addToCart(item, 1);
  };

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Sparkles size={18} />
          <span>AI-Assisted Cart</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          My Smart Basket
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Review direct farm produce and unlock combo pairing discounts
        </p>
      </div>

      {cartItems.length === 0 ? (
        <div className="card" style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--slate-400)' }}>
          <ShoppingCart size={54} style={{ margin: '0 auto 16px', opacity: 0.4 }} />
          <h2 style={{ fontSize: '1.3rem', color: 'var(--slate-800)', fontWeight: 700 }}>Your basket is empty</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--slate-500)', margin: '8px auto 20px', maxWidth: '360px' }}>
            Explore fresh vegetables, seasonal fruits, and raw farm milk directly from verified farmers.
          </p>
          <Link to="/marketplace" className="btn btn-primary">
            Browse Farm Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid-3" style={{ gap: '24px', alignItems: 'flex-start' }}>
          {/* BASKET ITEMS LIST (2 COLS) */}
          <div style={{ gridColumn: 'span 2' }}>
            <div className="card" style={{ padding: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--slate-100)', paddingBottom: '12px', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Selected Farm Products ({cartItems.length})
                </h3>
                <button
                  onClick={clearCart}
                  style={{ background: 'none', border: 'none', color: 'var(--danger-500)', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Clear All
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      paddingBottom: '14px', 
                      borderBottom: '1px solid var(--slate-100)',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                      />
                      <div>
                        <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                          {item.name}
                        </h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>
                          Farmer: {item.farmerName}
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '2px' }}>
                          ₹{item.price} <span style={{ fontSize: '0.75rem', fontWeight: 500, color: 'var(--slate-400)' }}>/ {item.unit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--slate-300)', borderRadius: 'var(--radius-md)', background: '#ffffff' }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-600)', display: 'flex' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ padding: '0 8px', fontWeight: 700, fontSize: '0.88rem', minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-600)', display: 'flex' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <div style={{ textAlign: 'right', minWidth: '70px' }}>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-900)' }}>
                          ₹{item.price * item.quantity}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--slate-400)', padding: '4px' }}
                        title="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SMART SUGGESTIONS CARD (Mandated by Section 11) */}
            <div className="card" style={{ padding: '20px', background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 100%)', border: '1px solid var(--primary-200)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Sparkles size={18} color="#16a34a" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--primary-900)' }}>
                  Smart Suggestions: Complementary Pairings
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginBottom: '16px' }}>
                You have tomatoes and onions in your basket. <strong>You may also like onions and potatoes</strong> for complete culinary preparations:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {smartSuggestions.map(s => {
                  const alreadyInBasket = cartItems.some(ci => ci.id === s.id);
                  return (
                    <div
                      key={s.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: '#ffffff',
                        border: '1px solid var(--slate-200)',
                        flexWrap: 'wrap',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                          src={s.image}
                          alt={s.name}
                          style={{ width: '48px', height: '48px', borderRadius: '6px', objectFit: 'cover' }}
                        />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--slate-900)' }}>
                            {s.name}
                          </div>
                          <div style={{ fontSize: '0.76rem', color: 'var(--slate-500)' }}>
                            {s.reason}
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontWeight: 800, color: 'var(--primary-700)', fontSize: '0.95rem' }}>
                          ₹{s.price}/{s.unit}
                        </span>

                        <button
                          onClick={() => handleAddSuggestion(s)}
                          disabled={alreadyInBasket}
                          className="btn btn-secondary btn-sm"
                          style={{ borderColor: 'var(--primary-300)', color: 'var(--primary-700)' }}
                        >
                          {alreadyInBasket ? (
                            <>
                              <CheckCircle2 size={14} color="#16a34a" />
                              <span>In Basket</span>
                            </>
                          ) : (
                            <>
                              <PlusCircle size={14} />
                              <span>+ Add to Basket</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ORDER SUMMARY (1 COL) */}
          <div className="card" style={{ padding: '24px', position: 'sticky', top: '120px' }}>
            <h3 className="card-title" style={{ marginBottom: '16px' }}>Order Bill Summary</h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', borderBottom: '1px solid var(--slate-100)', paddingBottom: '14px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                <span>Direct Eco Delivery</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#16a34a' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--slate-600)' }}>
                <span>Packaging & Handling</span>
                <span style={{ color: '#16a34a' }}>₹0 (Zero Markup)</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)' }}>Total Payable</span>
              <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-700)' }}>₹{cartTotal}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#16a34a', background: 'var(--primary-50)', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>
              <CheckCircle2 size={16} />
              <span>You save ₹38 vs supermarket retail prices today!</span>
            </div>

            <Link to="/customer/checkout" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem' }}>
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--slate-400)' }}>
              <ShieldCheck size={14} />
              <span>100% Direct Farmer Payment Guarantee</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSmartBasket;

