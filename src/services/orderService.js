import { api } from './api';
import { INITIAL_ORDERS } from '../data/mockData';

const ORDERS_KEY = 'agrismart_orders';

const getLocalOrders = () => {
  const data = localStorage.getItem(ORDERS_KEY);
  if (!data) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(INITIAL_ORDERS));
    return INITIAL_ORDERS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_ORDERS;
  }
};

const saveLocalOrders = (orders) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const orderService = {
  getAll: async () => {
    try {
      const res = await api.get('/orders/farmer');
      if (res.success && res.orders) {
        saveLocalOrders(res.orders);
        return res.orders;
      }
    } catch (err) {
      console.warn('[OrderService] Backend offline, fetching orders locally');
    }
    return getLocalOrders();
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/orders/${id}`);
      if (res.success && res.order) {
        return res.order;
      }
    } catch (err) {
      console.warn(`[OrderService] Backend offline, finding order ${id} locally`);
    }
    const orders = getLocalOrders();
    return orders.find(o => o.id === id || o._id === id) || null;
  },

  getCustomerOrders: async () => {
    try {
      const res = await api.get('/orders/my');
      if (res.success && res.orders) {
        return res.orders;
      }
    } catch (err) {
      console.warn('[OrderService] Backend offline, fetching customer orders locally');
    }
    return getLocalOrders();
  },

  getFarmerOrders: async () => {
    try {
      const res = await api.get('/orders/farmer');
      if (res.success && res.orders) {
        return res.orders;
      }
    } catch (err) {
      console.warn('[OrderService] Backend offline, fetching farmer orders locally');
    }
    return getLocalOrders();
  },

  createOrder: async ({ items, deliveryAddress, customerName, customerPhone, paymentMethod = 'UPI' }) => {
    try {
      const res = await api.post('/orders', {
        items,
        deliveryAddress,
        customerName,
        customerPhone,
        paymentMethod
      });
      if (res.success && res.order) {
        const local = getLocalOrders();
        saveLocalOrders([res.order, ...local]);
        return res.order;
      }
    } catch (err) {
      console.warn('[OrderService] Backend offline, creating order locally:', err.message);
    }

    // Local fallback order creation
    const orders = getLocalOrders();
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = subtotal > 300 ? 0 : 30;
    const total = subtotal + deliveryFee;

    const newOrder = {
      id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      _id: `ord-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: customerName || 'Aarav Sharma',
      customerPhone: customerPhone || '+91 99887 76655',
      deliveryAddress: deliveryAddress || 'Baner, Pune, Maharashtra 411045',
      date: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      items: items.map(i => ({
        productId: i.id || i._id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        unit: i.unit || 'kg',
        image: i.image
      })),
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      paymentStatus: paymentMethod.includes('Cash') ? 'Pending (COD)' : 'Paid',
      orderStatus: 'Placed',
      trackingSteps: [
        { status: 'Placed', timestamp: 'Just now', done: true, desc: 'Order placed successfully by customer' },
        { status: 'Confirmed', timestamp: 'Pending farmer check', done: false, desc: 'Farmer confirmation awaited' },
        { status: 'Preparing', timestamp: 'Awaiting prep', done: false, desc: 'Fresh harvest & packaging' },
        { status: 'Out for Delivery', timestamp: 'Pending dispatch', done: false, desc: 'Handover to direct courier' },
        { status: 'Delivered', timestamp: 'Estimated 2-3 hours', done: false, desc: 'Delivered to door' }
      ]
    };

    saveLocalOrders([newOrder, ...orders]);
    return newOrder;
  },

  updateStatus: async (orderId, newStatus) => {
    try {
      const res = await api.put(`/orders/${orderId}/status`, { status: newStatus });
      if (res.success && res.order) {
        const local = getLocalOrders();
        saveLocalOrders(local.map(o => (o.id === orderId || o._id === orderId ? res.order : o)));
        return res.order;
      }
    } catch (err) {
      console.warn('[OrderService] Backend offline, updating status locally');
    }

    const orders = getLocalOrders();
    const updated = orders.map(order => {
      if (order.id === orderId || order._id === orderId) {
        const statusOrder = ['Placed', 'Confirmed', 'Preparing', 'Out for Delivery', 'Delivered'];
        const targetIndex = statusOrder.indexOf(newStatus);
        const steps = order.trackingSteps.map((step, idx) => ({
          ...step,
          done: idx <= targetIndex,
          timestamp: idx <= targetIndex ? (step.timestamp.includes('Pending') ? 'Completed just now' : step.timestamp) : step.timestamp
        }));

        return {
          ...order,
          orderStatus: newStatus,
          trackingSteps: steps
        };
      }
      return order;
    });

    saveLocalOrders(updated);
    return updated.find(o => o.id === orderId || o._id === orderId);
  }
};
