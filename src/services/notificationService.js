import { api } from './api';
import { INITIAL_NOTIFICATIONS } from '../data/mockData';

const NOTIF_KEY = 'agrismart_notifications';

const getLocalNotifs = () => {
  const data = localStorage.getItem(NOTIF_KEY);
  if (!data) {
    localStorage.setItem(NOTIF_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_NOTIFICATIONS;
  }
};

export const notificationService = {
  getAll: async () => {
    try {
      const res = await api.get('/notifications');
      if (res.success && res.notifications) {
        return res.notifications;
      }
    } catch (err) {
      console.warn('[NotificationService] Backend offline, fetching notifications locally');
    }
    return getLocalNotifs();
  },

  getByRole: async (role = 'farmer') => {
    try {
      const res = await api.get('/notifications', { role });
      if (res.success && res.notifications) {
        return res.notifications;
      }
    } catch (err) {
      console.warn('[NotificationService] Backend offline, filtering locally');
    }
    const list = getLocalNotifs();
    return list.filter(n => n.roleTarget === role || n.roleTarget === 'all');
  },

  markAsRead: async (id) => {
    try {
      const res = await api.put(`/notifications/${id}/read`);
      if (res.success && res.notification) {
        const list = getLocalNotifs();
        const updated = list.map(n => (n.id === id || n._id === id ? { ...n, read: true } : n));
        localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
        return updated;
      }
    } catch (err) {
      console.warn('[NotificationService] Backend offline, marking read locally');
    }

    const list = getLocalNotifs();
    const updated = list.map(n => (n.id === id || n._id === id ? { ...n, read: true } : n));
    localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
    return updated;
  },

  markAllAsRead: async () => {
    try {
      const res = await api.put('/notifications/read-all');
      if (res.success) {
        const list = getLocalNotifs();
        const updated = list.map(n => ({ ...n, read: true }));
        localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
        return updated;
      }
    } catch (err) {
      console.warn('[NotificationService] Backend offline, marking all read locally');
    }

    const list = getLocalNotifs();
    const updated = list.map(n => ({ ...n, read: true }));
    localStorage.setItem(NOTIF_KEY, JSON.stringify(updated));
    return updated;
  }
};
