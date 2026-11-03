import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminService';
import DashboardCard from '../../components/DashboardCard';
import { 
  ShieldCheck, 
  Users, 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Briefcase, 
  AlertCircle, 
  BarChart3,
  ArrowRight,
  CheckCircle2 
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminService.getStats(),
      adminService.getSystemAnalytics()
    ]).then(([s, a]) => {
      setStats(s);
      setAnalytics(a);
      setLoading(false);
    });
  }, []);

  if (loading || !stats) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading administration console...</div>;
  }

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#7c3aed', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
            <ShieldCheck size={18} />
            <span>Master Governance & Moderation</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            System Administration Dashboard
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            System Health: 99.98% Uptime • Platform Transactions: ₹42.5 Lakhs GMV
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/admin/users" className="btn btn-secondary">
            <Users size={16} />
            <span>Manage All Users</span>
          </Link>
          <Link to="/admin/analytics" className="btn btn-primary">
            <BarChart3 size={16} />
            <span>Platform Analytics</span>
          </Link>
        </div>
      </div>

      {/* ADMIN STAT CARDS (Mandated 6 metrics) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        <DashboardCard
          icon={<Users size={22} />}
          title="Total Farmers"
          value={stats.totalFarmers}
          subtitle="Verified producers"
          trend="+14% MoM"
          color="green"
        />
        <DashboardCard
          icon={<ShoppingBag size={22} />}
          title="Total Customers"
          value={stats.totalCustomers.toLocaleString()}
          subtitle="Active shoppers"
          trend="+32% MoM"
          color="blue"
        />
        <DashboardCard
          icon={<Users size={22} />}
          title="Total Labourers"
          value={stats.totalLabourers}
          subtitle="Field specialists"
          trend="+9% MoM"
          color="amber"
        />
        <DashboardCard
          icon={<Package size={22} />}
          title="Total Products"
          value={stats.totalProducts.toLocaleString()}
          subtitle="Listed in catalog"
          trend="+45 this wk"
          color="green"
        />
        <DashboardCard
          icon={<CheckCircle2 size={22} />}
          title="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          subtitle="Platform checkouts"
          trend="99.2% Success"
          color="blue"
        />
        <DashboardCard
          icon={<TrendingUp size={22} />}
          title="Total Sales (GMV)"
          value={`₹${(stats.totalSalesGmv / 100000).toFixed(1)}L`}
          subtitle="Gross Merchandise Value"
          trend="+28%"
          color="green"
        />
      </div>

      {/* MANAGEMENT SUB-MODULE SHORTCUTS */}
      <div className="grid-3" style={{ marginBottom: '28px' }}>
        <Link to="/admin/users" className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-100)', color: 'var(--primary-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)' }}>Manage Users</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Farmers, Customers, Labourers</div>
            </div>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--slate-600)', flex: 1, marginBottom: '14px' }}>
            Verify grower KYC documents, approve labour badges, and moderate consumer accounts.
          </p>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--primary-700)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Open User Directory →
          </span>
        </Link>

        <Link to="/admin/products" className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: '#dbeafe', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Package size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)' }}>Manage Products</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Quality Audit & Categories</div>
            </div>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--slate-600)', flex: 1, marginBottom: '14px' }}>
            Audit organic certifications, monitor mandi price ceilings, and remove expired harvests.
          </p>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#1d4ed8', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Audit Listings →
          </span>
        </Link>

        <Link to="/admin/reviews" className="card" style={{ display: 'flex', flexDirection: 'column', transition: 'transform 0.2s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--earth-100)', color: 'var(--earth-700)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertCircle size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)' }}>Disputes & Complaints</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>3 Active Inquiries</div>
            </div>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--slate-600)', flex: 1, marginBottom: '14px' }}>
            Review customer quality complaints, refund requests, and labour wage arbitration.
          </p>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--earth-700)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            Resolve Disputes →
          </span>
        </Link>
      </div>

      {/* MONTHLY REVENUE GROWTH CHART */}
      {analytics && (
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 className="card-title">Platform Gross Sales Turnover (Last 6 Months)</h3>
              <p className="card-subtitle">Values in ₹ Lakhs</p>
            </div>
            <span className="badge badge-green">32% Cumulative Growth</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '170px', paddingTop: '20px', borderBottom: '1px solid var(--slate-200)', gap: '12px' }}>
            {analytics.monthlySales.map((m, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--slate-700)', marginBottom: '4px' }}>
                  ₹{(m.amount / 100000).toFixed(1)}L
                </div>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '44px',
                    height: `${(m.amount / 700000) * 100}%`,
                    backgroundColor: i === analytics.monthlySales.length - 1 ? '#15803d' : '#22c55e',
                    borderRadius: '6px 6px 0 0'
                  }}
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--slate-600)', marginTop: '6px', fontWeight: 600 }}>{m.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

