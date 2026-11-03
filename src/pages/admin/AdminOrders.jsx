import React, { useState, useEffect } from 'react';
import { orderService } from '../../services/orderService';
import { ShoppingBag, Eye, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.getAll().then(data => setOrders(data));
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Platform Orders & Logistics Oversight
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Real-time tracking of all customer orders moving through farm dispatch centers
        </p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td><strong>#{order.id.toUpperCase()}</strong></td>
                <td>{order.customerName}</td>
                <td>{order.date}</td>
                <td>{order.items?.length} items</td>
                <td><strong style={{ color: 'var(--primary-700)' }}>₹{order.total}</strong></td>
                <td>
                  <span className={`badge ${order.orderStatus === 'Delivered' ? 'badge-green' : 'badge-amber'}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td>
                  <Link to={`/customer/orders/track/${order.id}`} className="btn btn-secondary btn-sm" style={{ padding: '4px 8px', fontSize: '0.76rem' }}>
                    <Truck size={13} />
                    <span>Track</span>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;

