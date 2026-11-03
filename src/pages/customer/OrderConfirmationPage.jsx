import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { CheckCircle2, Truck, ArrowRight, Home, ShoppingBag } from 'lucide-react';

const OrderConfirmationPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    orderService.getById(id).then(data => setOrder(data));
  }, [id]);

  return (
    <div style={{ maxWidth: '640px', margin: '40px auto', padding: '0 20px', textAlign: 'center' }}>
      <div className="card" style={{ padding: '36px 24px' }}>
        <div style={{
          width: '68px',
          height: '68px',
          borderRadius: '50%',
          background: 'var(--primary-100)',
          color: 'var(--primary-600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px'
        }}>
          <CheckCircle2 size={40} />
        </div>

        <span className="badge badge-green" style={{ marginBottom: '8px' }}>
          Direct Farm Order Placed
        </span>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)', marginBottom: '8px' }}>
          Thank You for Supporting Local Farmers!
        </h1>

        <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', maxWidth: '440px', margin: '0 auto 20px', lineHeight: 1.55 }}>
          Your order has been routed directly to the farm. Produce will be freshly harvested, weighed, and safely packed in biodegradable crates.
        </p>

        {order && (
          <div style={{ background: 'var(--slate-50)', padding: '16px', borderRadius: 'var(--radius-md)', textAlign: 'left', marginBottom: '24px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--slate-500)' }}>Order Tracking ID:</span>
              <strong>#{order.id.toUpperCase()}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ color: 'var(--slate-500)' }}>Total Amount:</span>
              <strong style={{ color: 'var(--primary-700)' }}>₹{order.total}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--slate-500)' }}>Delivery Address:</span>
              <span style={{ textAlign: 'right', maxWidth: '240px', color: 'var(--slate-800)' }}>{order.deliveryAddress}</span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <Link to={`/customer/orders/track/${id}`} className="btn btn-primary">
            <Truck size={16} />
            <span>Track Live Delivery Status</span>
          </Link>
          <Link to="/marketplace" className="btn btn-secondary">
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

