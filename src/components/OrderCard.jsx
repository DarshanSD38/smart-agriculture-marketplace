import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, ChevronRight, Truck } from 'lucide-react';

const OrderCard = ({ order, isFarmer = false, onUpdateStatus }) => {
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Delivered': return 'badge-green';
      case 'Out for Delivery': return 'badge-blue';
      case 'Preparing': return 'badge-amber';
      case 'Confirmed': return 'badge-blue';
      default: return 'badge-amber';
    }
  };

  return (
    <div className="card" style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--slate-100)', paddingBottom: '12px', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 800, fontSize: '0.98rem', color: 'var(--slate-900)' }}>
              Order #{order.id.toUpperCase()}
            </span>
            <span className={`badge ${getStatusBadgeClass(order.orderStatus)}`}>
              {order.orderStatus}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            {order.date}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-700)' }}>
            ₹{order.total}
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--slate-400)' }}>
            {order.paymentMethod}
          </span>
        </div>
      </div>

      {/* Items list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
        {order.items?.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.86rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={item.image || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=80&auto=format&fit=crop&q=80"} 
                alt={item.name} 
                style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'cover' }} 
              />
              <div>
                <span style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{item.name}</span>
                <span style={{ color: 'var(--slate-500)', marginLeft: '6px' }}>× {item.quantity} {item.unit}</span>
              </div>
            </div>
            <span style={{ fontWeight: 600, color: 'var(--slate-700)' }}>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      {/* Footer & Actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--slate-100)', paddingTop: '12px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
          Deliver to: <strong>{order.customerName}</strong> ({order.deliveryAddress?.split(',')[0]})
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {isFarmer && onUpdateStatus && order.orderStatus !== 'Delivered' && (
            <button
              onClick={() => onUpdateStatus(order.id, getNextStatus(order.orderStatus))}
              className="btn btn-secondary btn-sm"
            >
              Advance: {getNextStatus(order.orderStatus)}
            </button>
          )}

          <Link to={`/customer/orders/track/${order.id}`} className="btn btn-primary btn-sm">
            <Truck size={14} />
            <span>Track Order</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const getNextStatus = (current) => {
  const steps = ["Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];
  const idx = steps.indexOf(current);
  if (idx < steps.length - 1) return steps[idx + 1];
  return "Delivered";
};

export default OrderCard;

