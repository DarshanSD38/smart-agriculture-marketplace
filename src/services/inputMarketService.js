import { api } from './api';
import { INITIAL_AGRI_INPUTS } from '../data/mockData';

const INPUTS_KEY = 'agrismart_agri_inputs';

const getLocalInputs = () => {
  const data = localStorage.getItem(INPUTS_KEY);
  if (!data) {
    localStorage.setItem(INPUTS_KEY, JSON.stringify(INITIAL_AGRI_INPUTS));
    return INITIAL_AGRI_INPUTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_AGRI_INPUTS;
  }
};

export const inputMarketService = {
  getAll: async () => {
    try {
      const res = await api.get('/products', { isAgriInput: 'true' });
      if (res.success && res.products && res.products.length > 0) {
        return res.products;
      }
    } catch (err) {
      console.warn('[InputMarketService] Backend offline, fetching agri-inputs locally');
    }
    return getLocalInputs();
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      if (res.success && res.product) {
        return res.product;
      }
    } catch (err) {
      console.warn(`[InputMarketService] Backend offline, finding input ${id} locally`);
    }
    const list = getLocalInputs();
    return list.find(item => item.id === id || item._id === id) || null;
  },

  getByCategory: async (category) => {
    try {
      const res = await api.get('/products', {
        isAgriInput: 'true',
        category: category !== 'All' ? category : undefined
      });
      if (res.success && res.products && res.products.length > 0) {
        return res.products;
      }
    } catch (err) {
      console.warn('[InputMarketService] Backend offline, filtering locally');
    }
    const list = getLocalInputs();
    if (!category || category === 'All') return list;
    return list.filter(item => item.category.toLowerCase() === category.toLowerCase());
  },

  search: async ({ query = '', category = 'All' }) => {
    try {
      const res = await api.get('/products', {
        isAgriInput: 'true',
        search: query,
        category: category !== 'All' ? category : undefined
      });
      if (res.success && res.products && res.products.length > 0) {
        return res.products;
      }
    } catch (err) {
      console.warn('[InputMarketService] Backend offline, searching locally');
    }

    let list = getLocalInputs();
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.brand?.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.recommendedFor && item.recommendedFor.some(r => r.toLowerCase().includes(q)))
      );
    }
    if (category && category !== 'All') {
      list = list.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  }
};
