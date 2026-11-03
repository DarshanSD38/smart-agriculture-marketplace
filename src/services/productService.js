import { api } from './api';
import { INITIAL_PRODUCTS } from '../data/mockData';

const STORAGE_KEY = 'agrismart_products';

const getLocalProducts = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
};

const saveLocalProducts = (products) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};

export const productService = {
  // Fetch all products with backend API, fallback to local store
  getAll: async () => {
    try {
      const res = await api.get('/products', { isAgriInput: 'false' });
      if (res.success && res.products) {
        saveLocalProducts(res.products);
        return res.products;
      }
    } catch (err) {
      console.warn('[ProductService] Backend offline, serving local cache');
    }
    return getLocalProducts();
  },

  getById: async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      if (res.success && res.product) {
        return res.product;
      }
    } catch (err) {
      console.warn(`[ProductService] Backend offline, finding product ${id} locally`);
    }
    const local = getLocalProducts();
    return local.find(p => p.id === id || p._id === id) || null;
  },

  getByCategory: async (category) => {
    try {
      const res = await api.get('/products', { category: category === 'All' ? undefined : category, isAgriInput: 'false' });
      if (res.success && res.products) {
        return res.products;
      }
    } catch (err) {
      console.warn('[ProductService] Backend offline, filtering locally');
    }
    const local = getLocalProducts();
    if (!category || category === 'All') return local;
    return local.filter(p => p.category.toLowerCase() === category.toLowerCase());
  },

  getByFarmerId: async (farmerId) => {
    try {
      const res = await api.get('/products', { farmerId });
      if (res.success && res.products) {
        return res.products;
      }
    } catch (err) {
      console.warn('[ProductService] Backend offline, fetching farmer products locally');
    }
    const local = getLocalProducts();
    return local.filter(p => p.farmerId === farmerId || p.farmer === farmerId);
  },

  create: async (newProduct) => {
    try {
      const res = await api.post('/products', newProduct);
      if (res.success && res.product) {
        const local = getLocalProducts();
        saveLocalProducts([res.product, ...local]);
        return res.product;
      }
    } catch (err) {
      console.warn('[ProductService] Backend offline, saving product locally');
    }

    // Local fallback creation
    const local = getLocalProducts();
    const product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      _id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 0,
      priceHistory: [{ date: 'Current', price: Number(newProduct.price) }]
    };
    saveLocalProducts([product, ...local]);
    return product;
  },

  update: async (id, updatedFields) => {
    try {
      const res = await api.put(`/products/${id}`, updatedFields);
      if (res.success && res.product) {
        const local = getLocalProducts();
        const updated = local.map(p => (p.id === id || p._id === id ? res.product : p));
        saveLocalProducts(updated);
        return res.product;
      }
    } catch (err) {
      console.warn('[ProductService] Backend offline, updating locally');
    }

    const local = getLocalProducts();
    const updated = local.map(p => {
      if (p.id === id || p._id === id) {
        return { ...p, ...updatedFields };
      }
      return p;
    });
    saveLocalProducts(updated);
    return updated.find(p => p.id === id || p._id === id);
  },

  delete: async (id) => {
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.success) {
        const local = getLocalProducts();
        saveLocalProducts(local.filter(p => p.id !== id && p._id !== id));
        return true;
      }
    } catch (err) {
      console.warn('[ProductService] Backend offline, deleting locally');
    }

    const local = getLocalProducts();
    saveLocalProducts(local.filter(p => p.id !== id && p._id !== id));
    return true;
  },

  searchAndFilter: async ({ query = '', category = 'All', maxPrice = 500, sortBy = 'default', organicOnly = false }) => {
    try {
      const res = await api.get('/products', {
        search: query,
        category: category !== 'All' ? category : undefined,
        maxPrice,
        sortBy,
        organicOnly: organicOnly ? 'true' : undefined,
        isAgriInput: 'false'
      });
      if (res.success && res.products) {
        return res.products;
      }
    } catch (err) {
      console.warn('[ProductService] Backend offline, filtering locally');
    }

    let products = getLocalProducts();
    if (query.trim()) {
      const q = query.toLowerCase();
      products = products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.farmerName?.toLowerCase().includes(q) ||
        p.farmerLocation?.toLowerCase().includes(q)
      );
    }
    if (category && category !== 'All') {
      products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (maxPrice) {
      products = products.filter(p => p.price <= maxPrice);
    }
    if (organicOnly) {
      products = products.filter(p => p.organic);
    }
    if (sortBy === 'price_asc') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price_desc') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'freshness') {
      products.sort((a, b) => new Date(b.harvestDate) - new Date(a.harvestDate));
    }
    return products;
  }
};
