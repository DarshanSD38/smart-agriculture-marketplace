import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import OrderCard from '../../components/OrderCard';
import { ShoppingBag, CheckCircle, Clock, Truck } from 'lucide-react';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    const data = await orderService.getAll();
    setOrders(data);
    setLoading(false);
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    await orderService.updateStatus(orderId, newStatus);
    loadOrders();
  };

  const filteredOrders = orders.filter(o => {
    if (statusFilter === 'All') return true;
    return o.orderStatus === statusFilter;
  });

  const statuses = ['All', 'Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Customer Orders Received
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            Direct consumer orders for farm-fresh produce
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }}>
          {statuses.map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                border: statusFilter === st ? '1px solid var(--primary-600)' : '1px solid var(--slate-200)',
                background: statusFilter === st ? 'var(--primary-600)' : '#ffffff',
                color: statusFilter === st ? '#ffffff' : 'var(--slate-700)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      <div>
        {filteredOrders.length === 0 ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
            <ShoppingBag size={48} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
            <h3>No orders found under "{statusFilter}"</h3>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              isFarmer={true}
              onUpdateStatus={handleStatusUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FarmerOrders;

