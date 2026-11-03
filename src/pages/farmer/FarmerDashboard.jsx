import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import DashboardCard from '../../components/DashboardCard';
import {
  Package,
  Warehouse,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Clock,
  PlusCircle,
  BrainCircuit,
  HeartPulse,
  Users,
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';

const FarmerDashboard = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      productService.getAll(),
      orderService.getAll()
    ]).then(([prods, ords]) => {
      setProducts(prods);
      setOrders(ords);
      setLoading(false);
    });
  }, []);

  const totalInventory = products.reduce((sum, p) => sum + (p.availableQuantity || 0), 0);
  const totalSalesAmount = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const pendingOrdersCount = orders.filter(o => o.orderStatus !== 'Delivered').length;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      {/* Top Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Welcome, {user?.name || 'Farmer Ramesh'}! 👋
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            {user?.farmName || 'Green Valley Organics'} • Nashik, Maharashtra • Real-Time Farm Intelligence
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/farmer/add-product" className="btn btn-primary">
            <PlusCircle size={16} />
            <span>Add New Harvest</span>
          </Link>
          <Link to="/farmer/crop-health" className="btn btn-secondary">
            <HeartPulse size={16} />
            <span>Check Crop Health</span>
          </Link>
        </div>
      </div>

      {/* DASHBOARD CARDS (6 Metrics Required) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <DashboardCard
          icon={<Package size={22} />}
          title="Total Products"
          value={products.length}
          subtitle="Listed in Marketplace"
          trend="+2 New"
          color="green"
        />
        <DashboardCard
          icon={<Warehouse size={22} />}
          title="Total Inventory"
          value={`${totalInventory} kg`}
          subtitle="Current harvest in stock"
          trend="Optimal"
          color="blue"
        />
        <DashboardCard
          icon={<ShoppingBag size={22} />}
          title="Total Orders"
          value={orders.length}
          subtitle="All-time customer orders"
          trend="+18% MoM"
          color="green"
        />
        <DashboardCard
          icon={<TrendingUp size={22} />}
          title="Total Sales"
          value={`₹${(totalSalesAmount * 12).toLocaleString()}`}
          subtitle="Gross direct realizations"
          trend="+24%"
          color="green"
        />
        <DashboardCard
          icon={<AlertTriangle size={22} />}
          title="Surplus Products"
          value="2 Items"
          subtitle="Discount recommended"
          trend="Action Needed"
          color="amber"
        />
        <DashboardCard
          icon={<Clock size={22} />}
          title="Pending Orders"
          value={pendingOrdersCount}
          subtitle="Awaiting dispatch"
          trend="Urgent"
          color="red"
        />
      </div>

      {/* CHARTS SECTION (Mock data for Sales, Product Demand, and Inventory) */}
      <div className="grid-3" style={{ marginBottom: '28px' }}>
        {/* Sales Trend Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="card-title">Weekly Sales Trend</h3>
              <p className="card-subtitle">Revenue earned directly (₹ in thousands)</p>
            </div>
            <span className="badge badge-green">Last 7 Days</span>
          </div>

          {/* Simple Visual SVG Bar Chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '140px', paddingTop: '20px', borderBottom: '1px solid var(--slate-200)', gap: '8px' }}>
            {[
              { day: 'Mon', val: 45, amt: '₹4.5k' },
              { day: 'Tue', val: 60, amt: '₹6.0k' },
              { day: 'Wed', val: 55, amt: '₹5.5k' },
              { day: 'Thu', val: 80, amt: '₹8.0k' },
              { day: 'Fri', val: 75, amt: '₹7.5k' },
              { day: 'Sat', val: 110, amt: '₹11.0k' },
              { day: 'Sun', val: 95, amt: '₹9.5k' }
            ].map((col, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                <div 
                  title={col.amt}
                  style={{
                    width: '100%',
                    maxWidth: '24px',
                    height: `${(col.val / 120) * 100}%`,
                    backgroundColor: i === 5 ? '#15803d' : '#22c55e',
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease'
                  }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--slate-500)', marginTop: '6px' }}>{col.day}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '0.78rem', color: 'var(--slate-600)' }}>
            <span>Weekly Peak: <strong>Saturday (₹11,000)</strong></span>
            <span style={{ color: '#16a34a', fontWeight: 700 }}>+19% vs Last Week</span>
          </div>
        </div>

        {/* Product Demand Level */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="card-title">Live Product Demand</h3>
              <p className="card-subtitle">AI regional market sentiment</p>
            </div>
            <Link to="/farmer/demand-prediction" style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 700 }}>
              Forecast →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { name: 'Organic Hybrid Tomatoes', demand: 'Very High', score: 94, color: '#16a34a' },
              { name: 'Fresh Red Onions', demand: 'High', score: 78, color: '#22c55e' },
              { name: 'Kashmiri Gala Apples', demand: 'High', score: 82, color: '#22c55e' },
              { name: 'Fresh Baby Spinach', demand: 'Moderate', score: 60, color: '#eab308' }
            ].map((d, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{d.name}</span>
                  <span style={{ fontWeight: 700, color: d.color }}>{d.demand} ({d.score}%)</span>
                </div>
                <div style={{ width: '100%', height: '7px', background: 'var(--slate-100)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${d.score}%`, height: '100%', background: d.color, borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory Breakdown by Category */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="card-title">Inventory Allocation</h3>
              <p className="card-subtitle">Distribution by crop category</p>
            </div>
            <Link to="/farmer/inventory" style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 700 }}>
              Details →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { cat: 'Vegetables', qty: '430 kg', pct: 44, color: '#16a34a' },
              { cat: 'Grains & Cereals', qty: '500 kg', pct: 36, color: '#eab308' },
              { cat: 'Fruits', qty: '115 kg', pct: 12, color: '#f97316' },
              { cat: 'Dairy & Farm Milk', qty: '45 L', pct: 8, color: '#06b6d4' }
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.color }} />
                  <span style={{ color: 'var(--slate-700)', fontWeight: 500 }}>{item.cat}</span>
                </div>
                <div>
                  <strong style={{ color: 'var(--slate-900)' }}>{item.qty}</strong>
                  <span style={{ color: 'var(--slate-400)', fontSize: '0.75rem', marginLeft: '6px' }}>({item.pct}%)</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', padding: '10px', background: 'var(--slate-50)', borderRadius: 'var(--radius-md)', fontSize: '0.78rem', color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Warehouse size={16} color="#16a34a" />
            <span>Optimal storage condition. Average shelf life: 5.4 days.</span>
          </div>
        </div>
      </div>

      {/* RECENT ORDERS & QUICK ACTIONS */}
      <div className="grid-2" style={{ gap: '24px' }}>
        {/* Recent Orders */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="card-title">Recent Customer Orders</h3>
              <p className="card-subtitle">Orders directly placed by consumers</p>
            </div>
            <Link to="/farmer/orders" className="btn btn-secondary btn-sm">
              View All ({orders.length})
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.slice(0, 3).map((ord) => (
              <div 
                key={ord.id} 
                style={{ 
                  padding: '12px', 
                  borderRadius: 'var(--radius-md)', 
                  border: '1px solid var(--slate-200)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  background: 'var(--slate-50)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--slate-900)' }}>#{ord.id.toUpperCase()}</strong>
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>{ord.orderStatus}</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                    {ord.customerName} • {ord.items?.length} items
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--primary-700)', fontSize: '0.96rem' }}>₹{ord.total}</div>
                  <Link to={`/customer/orders/track/${ord.id}`} style={{ fontSize: '0.74rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                    Track Status →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Decision Hub Quick Access */}
        <div className="card" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdf4 100%)' }}>
          <div style={{ marginBottom: '16px' }}>
            <span className="badge badge-green" style={{ marginBottom: '6px' }}>Decision Intelligence</span>
            <h3 className="card-title">AI Agriculture Assistant</h3>
            <p className="card-subtitle">Use AI models to maximize profit and protect your field</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Link to="/farmer/ai-price" style={{ padding: '12px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <TrendingUp size={20} color="#16a34a" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--slate-900)' }}>AI Price Recommendation</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--slate-500)' }}>Calculate best selling price based on mandi trends</div>
                </div>
              </div>
              <ArrowRight size={16} color="#16a34a" />
            </Link>

            <Link to="/farmer/crop-health" style={{ padding: '12px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <HeartPulse size={20} color="#dc2626" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--slate-900)' }}>Crop Health Diagnosis</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--slate-500)' }}>Upload foliage leaf photo to detect disease (87% Acc.)</div>
                </div>
              </div>
              <ArrowRight size={16} color="#dc2626" />
            </Link>

            <Link to="/farmer/surplus" style={{ padding: '12px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <AlertTriangle size={20} color="#ea580c" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--slate-900)' }}>Surplus Spoilage Avoidance</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--slate-500)' }}>2 items at risk: Auto-generate flash discounts</div>
                </div>
              </div>
              <ArrowRight size={16} color="#ea580c" />
            </Link>

            <Link to="/farmer/find-labour" style={{ padding: '12px', background: '#ffffff', borderRadius: 'var(--radius-md)', border: '1px solid var(--primary-200)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Users size={20} color="#d97706" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--slate-900)' }}>Hire Agricultural Labour</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--slate-500)' }}>4 verified harvest & irrigation specialists available</div>
                </div>
              </div>
              <ArrowRight size={16} color="#d97706" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;

