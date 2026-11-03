import React from 'react';

const DashboardCard = ({ icon, title, value, subtitle, trend, color = 'green' }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>
      <div className="stat-info" style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div className="stat-value">{value}</div>
          {trend && (
            <span style={{ 
              fontSize: '0.75rem', 
              fontWeight: 700, 
              color: trend.startsWith('+') ? '#16a34a' : '#ea580c',
              background: trend.startsWith('+') ? '#dcfce7' : '#ffedd5',
              padding: '2px 6px',
              borderRadius: '9999px'
            }}>
              {trend}
            </span>
          )}
        </div>
        <div className="stat-label">{title}</div>
        {subtitle && (
          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '2px' }}>
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;

