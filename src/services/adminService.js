import { api } from './api';
import { INITIAL_ADMIN_STATS, INITIAL_FARMERS, INITIAL_LABOURERS } from '../data/mockData';

export const adminService = {
  getStats: async () => {
    try {
      const res = await api.get('/admin/stats');
      if (res.success && res.stats) {
        return res.stats;
      }
    } catch (err) {
      console.warn('[AdminService] Backend offline, fetching stats locally');
    }
    return INITIAL_ADMIN_STATS;
  },

  getAllUsers: async () => {
    try {
      const res = await api.get('/admin/users');
      if (res.success && res.users) {
        return res.users;
      }
    } catch (err) {
      console.warn('[AdminService] Backend offline, fetching users locally');
    }

    const farmers = INITIAL_FARMERS.map(f => ({
      id: f.id,
      name: f.name,
      role: 'Farmer',
      phone: f.phone,
      location: f.location,
      joined: f.joinedDate,
      status: 'Active',
      verified: f.verified
    }));

    const customers = [
      { id: 'c-1', name: 'Aarav Sharma', role: 'Customer', phone: '+91 99887 76655', location: 'Pune, MH', joined: 'February 2024', status: 'Active', verified: true },
      { id: 'c-2', name: 'Pooja Varma', role: 'Customer', phone: '+91 98765 43210', location: 'Mumbai, MH', joined: 'March 2024', status: 'Active', verified: true },
      { id: 'c-3', name: 'Vikram Sen', role: 'Customer', phone: '+91 97654 32109', location: 'Nashik, MH', joined: 'April 2024', status: 'Active', verified: false }
    ];

    const labourers = INITIAL_LABOURERS.map(l => ({
      id: l.id,
      name: l.name,
      role: 'Labourer',
      phone: l.phone,
      location: l.location,
      joined: 'January 2024',
      status: 'Active',
      verified: true
    }));

    return [...farmers, ...customers, ...labourers];
  },

  toggleUserStatus: async (userId) => {
    try {
      const res = await api.put(`/admin/users/${userId}/toggle-status`);
      if (res.success) {
        return res.user;
      }
    } catch (err) {
      console.warn('[AdminService] Backend offline, toggling status locally');
    }
    return null;
  },

  getSystemAnalytics: async () => {
    try {
      const res = await api.get('/admin/analytics');
      if (res.success && res.analytics) {
        return res.analytics;
      }
    } catch (err) {
      console.warn('[AdminService] Backend offline, fetching analytics locally');
    }

    return {
      monthlySales: [
        { month: 'May', amount: 280000 },
        { month: 'Jun', amount: 350000 },
        { month: 'Jul', amount: 410000 },
        { month: 'Aug', amount: 490000 },
        { month: 'Sep', amount: 560000 },
        { month: 'Oct', amount: 680000 }
      ],
      categoryDistribution: [
        { category: 'Vegetables', percentage: 48, count: 680 },
        { category: 'Fruits', percentage: 26, count: 370 },
        { category: 'Grains', percentage: 16, count: 227 },
        { category: 'Dairy & Milk', percentage: 10, count: 143 }
      ],
      userGrowth: [
        { label: 'Farmers', count: 428, growth: '+14%' },
        { label: 'Customers', count: 3890, growth: '+32%' },
        { label: 'Labourers', count: 312, growth: '+9%' }
      ]
    };
  }
};
