import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import ProductCard from '../../components/ProductCard';
import DashboardCard from '../../components/DashboardCard';
import { 
  Store, 
  MapPin, 
  BrainCircuit, 
  ShoppingCart, 
  Scale, 
  Users2, 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Percent, 
  Leaf,
  Clock 
} from 'lucide-react';

const CustomerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productService.getAll(),
      orderService.getCustomerOrders()
    ]).then(([prods, ords]) => {
      setProducts(prods);
      setOrders(ords);
      setLoading(false);
    });
  }, []);

  const freshHarvests = products.filter(p => p.status === 'Fresh Harvest').slice(0, 4);
  const bestDeals = products.filter(p => p.price <= 35).slice(0, 4);
  const nearbyProducts = products.filter(p => p.distanceKm <= 8).slice(0, 4);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Aarav'}! 🛒
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            Delivering farm-fresh harvest to <strong>{user?.location || 'Baner, Pune'}</strong> within 2 hours
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/marketplace" className="btn btn-primary">
            <Store size={16} />
            <span>Browse Full Marketplace</span>
          </Link>
          <Link to="/customer/basket" className="btn btn-secondary">
            <ShoppingCart size={16} />
            <span>Smart Basket</span>
          </Link>
        </div>
      </div>

      {/* QUICK HIGHLIGHT CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <DashboardCard
          icon={<Leaf size={22} />}
          title="Fresh Today"
          value={`${freshHarvests.length} Batches`}
          subtitle="Harvested < 24h ago"
          color="green"
        />
        <DashboardCard
          icon={<Percent size={22} />}
          title="Best Value Deals"
          value="From ₹25/kg"
          subtitle="Surplus farm savings"
          color="amber"
        />
        <DashboardCard
          icon={<MapPin size={22} />}
          title="Nearby Farmers"
          value="4 Local Farms"
          subtitle="Within 8 km radius"
          color="blue"
        />
        <DashboardCard
          icon={<ShoppingBag size={22} />}
          title="Recent Orders"
          value={`${orders.length} Placed`}
          subtitle="1 Out for Delivery"
          color="green"
        />
      </div>

      {/* 1. FRESH HARVEST SECTION */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-green">Fresh Harvest</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Field-Fresh Harvests (Harvested Today)
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Picked at dawn and packed without cold storage preservatives
            </p>
          </div>
          <Link to="/marketplace?filter=fresh" style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary-700)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>See All</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid-4">
          {freshHarvests.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 2. NEARBY PRODUCTS & FARMERS */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-blue">Hyperlocal</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Nearby Farm Produce (&lt; 8 km)
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Lower carbon footprint and guaranteed faster direct farm dispatch
            </p>
          </div>
          <Link to="/customer/nearby-farmers" style={{ fontSize: '0.84rem', fontWeight: 700, color: '#2563eb', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>View Nearby Farms</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid-4">
          {nearbyProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 3. BEST DEALS & SMART PROMOTIONS */}
      <section style={{ marginBottom: '36px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="badge badge-amber">Super Saver</span>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Best Value Farm Deals
              </h2>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginTop: '2px' }}>
              Direct price comparisons from multi-farmer surplus listings
            </p>
          </div>
          <Link to="/customer/price-comparison" style={{ fontSize: '0.84rem', fontWeight: 700, color: '#d97706', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>Price Comparison Tool</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid-4">
          {bestDeals.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* 4. ACTIVE ORDER TRACKER PREVIEW */}
      {orders.length > 0 && (
        <section style={{ background: '#ffffff', border: '1px solid var(--primary-200)', borderRadius: 'var(--radius-xl)', padding: '24px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: '4px' }}>Live Order Status</span>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                Active Delivery for Order #{orders[0].id.toUpperCase()}
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--slate-500)' }}>
                Placed: {orders[0].date} • {orders[0].items?.length} items • ₹{orders[0].total}
              </p>
            </div>

            <Link to={`/customer/orders/track/${orders[0].id}`} className="btn btn-primary btn-sm">
              <span>View Live Delivery Progress</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--slate-50)', padding: '14px', borderRadius: 'var(--radius-md)' }}>
            <Clock size={20} color="#16a34a" />
            <div style={{ fontSize: '0.86rem', color: 'var(--slate-700)' }}>
              Status: <strong style={{ color: '#16a34a' }}>{orders[0].orderStatus}</strong> — Expected arrival at your doorstep shortly.
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CustomerDashboard;

