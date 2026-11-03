import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { 
  CheckCircle2, 
  Clock, 
  Truck, 
  MapPin, 
  ArrowLeft, 
  Package, 
  Phone, 
  User,
  ShieldCheck 
} from 'lucide-react';

const CustomerOrderTrack = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getById(id).then(data => {
      setOrder(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading order tracking details...</div>;
  }

  if (!order) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', textAlign: 'center' }}>
        <h3>Order #{id} not found</h3>
        <Link to="/customer/orders" className="btn btn-secondary" style={{ marginTop: '14px' }}>
          Back to Orders
        </Link>
      </div>
    );
  }

  const allStatuses = ["Placed", "Confirmed", "Preparing", "Out for Delivery", "Delivered"];
  const currentStepIndex = allStatuses.indexOf(order.orderStatus);

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/customer/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--slate-500)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '8px' }}>
          <ArrowLeft size={16} /> Back to My Orders
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Tracking Order #{order.id.toUpperCase()}
            </h1>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.86rem' }}>
              Ordered on {order.date} • Direct Farm to Consumer Pipeline
            </p>
          </div>
          <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '6px 14px' }}>
            ● Current Status: {order.orderStatus}
          </span>
        </div>
      </div>

      {/* TRACKING STEPPER BAR */}
      <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
        <h3 className="card-title" style={{ marginBottom: '24px' }}>Live Order Progression</h3>

        <div className="stepper">
          {allStatuses.map((statusName, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div key={statusName} className={`step-item ${isCompleted ? 'active' : ''}`}>
                <div 
                  className="step-circle" 
                  style={{
                    backgroundColor: isCompleted ? '#16a34a' : 'var(--slate-200)',
                    color: isCompleted ? '#ffffff' : 'var(--slate-500)',
                    border: isCurrent ? '3px solid #bbf7d0' : 'none'
                  }}
                >
                  {isCompleted ? <CheckCircle2 size={20} /> : idx + 1}
                </div>
                <div className="step-label" style={{ fontWeight: isCurrent ? 800 : 600, color: isCurrent ? '#16a34a' : 'var(--slate-700)' }}>
                  {statusName}
                </div>
              </div>
            );
          })}
        </div>

        {/* DETAILED TIMELINE LIST */}
        <div style={{ marginTop: '30px', borderTop: '1px solid var(--slate-100)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {order.trackingSteps?.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: step.done ? 'var(--primary-100)' : 'var(--slate-100)',
                  color: step.done ? 'var(--primary-700)' : 'var(--slate-400)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {step.done ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: step.done ? 'var(--slate-900)' : 'var(--slate-400)' }}>
                      {step.status}
                    </h4>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-400)' }}>{step.timestamp}</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: step.done ? 'var(--slate-600)' : 'var(--slate-400)', marginTop: '2px' }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* DELIVERY & FARM DETAILS */}
      <div className="grid-2" style={{ gap: '20px' }}>
        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '14px' }}>Delivery Destination</h3>
          <div style={{ fontSize: '0.88rem', color: 'var(--slate-700)', lineHeight: 1.5 }}>
            <div style={{ fontWeight: 700, color: 'var(--slate-900)' }}>{order.customerName}</div>
            <div style={{ color: 'var(--slate-500)', marginTop: '2px' }}>{order.customerPhone}</div>
            <div style={{ marginTop: '8px', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <MapPin size={16} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{order.deliveryAddress}</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="card-title" style={{ marginBottom: '14px' }}>Eco Dispatch Courier</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '50%', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--slate-900)' }}>AgriSmart Farm-Direct Courier</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Electric 2-Wheeler • Insulated Fresh Crates</div>
              <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, marginTop: '2px' }}>ETA: Within 45 Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderTrack;

