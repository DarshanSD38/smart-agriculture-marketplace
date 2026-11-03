import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import OrderCard from '../../components/OrderCard';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getCustomerOrders().then(data => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            My Orders & Purchase History
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            Track direct farm orders and reorder your weekly groceries
          </p>
        </div>

        <Link to="/marketplace" className="btn btn-primary">
          <ShoppingBag size={16} />
          <span>Shop More Produce</span>
        </Link>
      </div>

      {loading ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
          Loading your farm orders...
        </div>
      ) : orders.length === 0 ? (
        <div className="card" style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--slate-400)' }}>
          <ShoppingBag size={48} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
          <h3>No orders placed yet</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
            Explore local farm harvests and order directly from local farmers.
          </p>
          <Link to="/marketplace" className="btn btn-primary btn-sm" style={{ marginTop: '16px' }}>
            Explore Marketplace
          </Link>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;

