import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { BarChart3, TrendingUp, Users, PieChart, ShieldCheck } from 'lucide-react';

const AdminAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getSystemAnalytics().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading platform metrics...</div>;
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Platform Analytics & GMV Growth
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Macro economic trends, category distribution, and user adoption rates
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '28px' }}>
        {data.userGrowth.map((ug, idx) => (
          <div key={idx} className="card">
            <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Total Registered {ug.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '4px' }}>
              {ug.count.toLocaleString()}
            </div>
            <span style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 700 }}>{ug.growth} MoM Acquisition</span>
          </div>
        ))}
      </div>

      <div className="grid-2" style={{ gap: '24px' }}>
        {/* Category distribution */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 className="card-title" style={{ marginBottom: '16px' }}>Catalog Category Share</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {data.categoryDistribution.map((cat, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--slate-800)' }}>{cat.category}</span>
                  <strong>{cat.percentage}% ({cat.count} Items)</strong>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'var(--slate-100)', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${cat.percentage}%`, height: '100%', background: i === 0 ? '#16a34a' : (i === 1 ? '#0284c7' : '#eab308'), borderRadius: '999px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="card" style={{ padding: '24px' }}>
          <h3 className="card-title" style={{ marginBottom: '16px' }}>System Infrastructure Status</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)' }}>
              <span>Database Cluster Connection:</span>
              <strong style={{ color: '#16a34a' }}>Mock / Ready for MongoDB</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)' }}>
              <span>Backend API Server:</span>
              <strong style={{ color: '#16a34a' }}>Mock / Ready for Node.js</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)' }}>
              <span>AI Computer Vision Inference:</span>
              <strong style={{ color: '#16a34a' }}>Client-Simulated (87% Acc)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--slate-50)', borderRadius: 'var(--radius-sm)' }}>
              <span>Order Delivery SLA:</span>
              <strong style={{ color: 'var(--slate-800)' }}>Under 3 Hours</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

