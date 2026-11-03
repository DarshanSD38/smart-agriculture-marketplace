import React, { useState, useEffect } from 'react';
import { notificationService } from '../services/notificationService';
import NotificationCard from '../components/NotificationCard';
import { Bell, CheckCheck, Filter } from 'lucide-react';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    setLoading(true);
    const data = await notificationService.getAll();
    setNotifications(data);
    setLoading(false);
  };

  const handleMarkRead = async (id) => {
    const updated = await notificationService.markAsRead(id);
    setNotifications(updated);
  };

  const handleMarkAllRead = async () => {
    const updated = await notificationService.markAllAsRead();
    setNotifications(updated);
  };

  const types = [
    { id: 'All', label: 'All Notifications' },
    { id: 'new_order', label: 'Orders' },
    { id: 'price_alert', label: 'Price Alerts' },
    { id: 'surplus_alert', label: 'Surplus Warnings' },
    { id: 'job_alert', label: 'Labour Jobs' },
    { id: 'crop_health_alert', label: 'Crop Health' }
  ];

  const filteredNotifs = notifications.filter(n => {
    if (filterType === 'All') return true;
    return n.type === filterType;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--slate-900)' }}>
              Notifications & Alerts
            </h1>
            {unreadCount > 0 && (
              <span className="badge badge-amber">{unreadCount} Unread</span>
            )}
          </div>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.86rem' }}>
            Live updates for orders, AI market price alerts, surplus hazards, and crop diagnoses
          </p>
        </div>

        {unreadCount > 0 && (
          <button onClick={handleMarkAllRead} className="btn btn-secondary btn-sm">
            <CheckCheck size={16} />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* FILTER BUTTONS */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', marginBottom: '20px', paddingBottom: '4px' }}>
        {types.map(t => (
          <button
            key={t.id}
            onClick={() => setFilterType(t.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              border: filterType === t.id ? '1px solid var(--primary-600)' : '1px solid var(--slate-200)',
              background: filterType === t.id ? 'var(--primary-600)' : '#ffffff',
              color: filterType === t.id ? '#ffffff' : 'var(--slate-700)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* NOTIFICATIONS LIST */}
      <div>
        {filteredNotifs.length === 0 ? (
          <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
            <Bell size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
            <h3>No notifications under this filter</h3>
          </div>
        ) : (
          filteredNotifs.map(n => (
            <NotificationCard
              key={n.id}
              notification={n}
              onMarkRead={handleMarkRead}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
