// Centralized API Client for AI-Powered Smart Agriculture System
// Connects React Frontend to Node.js/Express Backend with automatic JWT token management

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const getAuthToken = () => {
  return localStorage.getItem('agrismart_token') || null;
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('agrismart_token', token);
  } else {
    localStorage.removeItem('agrismart_token');
  }
};

/**
 * Universal API request wrapper
 * @param {string} endpoint - Relative path (e.g., '/products')
 * @param {object} options - Fetch options (method, body, headers)
 */
export const apiRequest = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    ...options.headers
  };

  // Only set Content-Type if not FormData (for file uploads)
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    // If backend is unreachable or connection refused
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.warn(`[AgriSmart API] Backend server at ${API_BASE_URL} is unreachable. Falling back to offline client cache.`);
    }
    throw error;
  }
};

export const api = {
  get: (endpoint, queryParams = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, val);
      }
    });
    const queryString = searchParams.toString();
    const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;
    return apiRequest(fullEndpoint, { method: 'GET' });
  },

  post: (endpoint, body) => {
    const payload = body instanceof FormData ? body : JSON.stringify(body);
    return apiRequest(endpoint, { method: 'POST', body: payload });
  },

  put: (endpoint, body) => {
    const payload = body instanceof FormData ? body : JSON.stringify(body);
    return apiRequest(endpoint, { method: 'PUT', body: payload });
  },

  delete: (endpoint) => {
    return apiRequest(endpoint, { method: 'DELETE' });
  }
};

export default api;

