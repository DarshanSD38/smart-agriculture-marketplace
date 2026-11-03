import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, Users, Calendar } from 'lucide-react';

const FarmerAnalytics = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Farmer Sales & Harvest Analytics
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Historical revenue realization, crop volume turnover, and customer satisfaction metrics
        </p>
      </div>

      <div className="grid-3" style={{ marginBottom: '24px' }}>
        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Monthly Revenue</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '4px' }}>₹78,400</div>
          <span style={{ fontSize: '0.76rem', color: '#16a34a', fontWeight: 700 }}>+22% vs previous month</span>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Direct Middleman Savings</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#2563eb', marginTop: '4px' }}>₹19,200</div>
          <span style={{ fontSize: '0.76rem', color: '#2563eb', fontWeight: 700 }}>Commission saved by direct selling</span>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', fontWeight: 600 }}>Average Repeat Customer Rate</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '4px' }}>68%</div>
          <span style={{ fontSize: '0.76rem', color: '#16a34a', fontWeight: 700 }}>Based on 145 verified ratings</span>
        </div>
      </div>

      {/* Monthly Sales Breakdown Table */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="card-title" style={{ marginBottom: '16px' }}>Monthly Sales Realization Breakdown</h3>
        <div className="table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Month</th>
                <th>Crops Sold</th>
                <th>Volume Dispatched</th>
                <th>Gross Earnings</th>
                <th>Avg Price Realized</th>
                <th>Growth</th>
              </tr>
            </thead>
            <tbody>
              {[
                { month: 'October 2026', crops: 'Tomatoes, Onions, Spinach', vol: '1,420 kg', gross: '₹58,600', avg: '₹41.2/kg', growth: '+18%' },
                { month: 'September 2026', crops: 'Tomatoes, Apples', vol: '1,180 kg', gross: '₹49,400', avg: '₹41.8/kg', growth: '+14%' },
                { month: 'August 2026', crops: 'Wheat, Tomatoes', vol: '1,350 kg', gross: '₹43,200', avg: '₹32.0/kg', growth: '+9%' },
                { month: 'July 2026', crops: 'Vegetables', vol: '980 kg', gross: '₹39,500', avg: '₹40.3/kg', growth: '+11%' }
              ].map((row, idx) => (
                <tr key={idx}>
                  <td><strong>{row.month}</strong></td>
                  <td>{row.crops}</td>
                  <td>{row.vol}</td>
                  <td><strong style={{ color: 'var(--primary-700)' }}>{row.gross}</strong></td>
                  <td>{row.avg}</td>
                  <td><span className="badge badge-green">{row.growth}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerAnalytics;

