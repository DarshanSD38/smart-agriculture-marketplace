import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  Briefcase, 
  HeartPulse, 
  Sparkles, 
  CheckCircle2,
  Clock 
} from 'lucide-react';

const NotificationCard = ({ notification, onMarkRead }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'new_order':
      case 'order_status':
        return <ShoppingBag size={18} color="#16a34a" />;
      case 'price_alert':
        return <TrendingUp size={18} color="#2563eb" />;
      case 'surplus_alert':
        return <AlertTriangle size={18} color="#dc2626" />;
      case 'job_alert':
        return <Briefcase size={18} color="#d97706" />;
      case 'crop_health_alert':
        return <HeartPulse size={18} color="#9333ea" />;
      default:
        return <Sparkles size={18} color="#16a34a" />;
    }
  };

  return (
    <div 
      className="card" 
      style={{ 
        marginBottom: '12px', 
        padding: '16px',
        backgroundColor: notification.read ? '#ffffff' : '#f0fdf4',
        borderLeft: notification.read ? '1px solid var(--slate-200)' : '4px solid var(--primary-600)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px'
      }}
    >
      <div style={{ 
        width: '38px', 
        height: '38px', 
        borderRadius: '50%', 
        background: '#ffffff', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        boxShadow: 'var(--shadow-xs)',
        flexShrink: 0
      }}>
        {getIcon(notification.type)}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--slate-900)' }}>
            {notification.title}
          </h4>
          <span style={{ fontSize: '0.74rem', color: 'var(--slate-400)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} /> {notification.timestamp}
          </span>
        </div>

        <p style={{ fontSize: '0.84rem', color: 'var(--slate-600)', marginBottom: '10px' }}>
          {notification.message}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {notification.link && (
            <Link to={notification.link} className="btn btn-secondary btn-sm" style={{ padding: '4px 10px', fontSize: '0.78rem' }}>
              View Details
            </Link>
          )}
          {!notification.read && onMarkRead && (
            <button 
              onClick={() => onMarkRead(notification.id)}
              style={{ background: 'none', border: 'none', color: 'var(--primary-700)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Mark as read
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;

