import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, setAuthToken, getAuthToken } from '../services/api';

const AuthContext = createContext();

export const ROLE_PROFILES = {
  farmer: {
    id: "f-1",
    _id: "f-1",
    role: "farmer",
    name: "Ramesh Patel",
    email: "ramesh.patel@agrifarm.in",
    phone: "+91 98231 44550",
    location: "Nashik, Maharashtra",
    farmName: "Green Valley Organics",
    farmSize: "12 Acres",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  customer: {
    id: "c-1",
    _id: "c-1",
    role: "customer",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 99887 76655",
    location: "Baner, Pune, Maharashtra",
    address: "Flat 402, Green Meadows Apt, Baner, Pune 411045",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  labour: {
    id: "l-1",
    _id: "l-1",
    role: "labour",
    name: "Babu Rao Shinde",
    email: "baburao.shinde@agriwork.in",
    phone: "+91 98555 43210",
    location: "Nashik, Maharashtra",
    skills: ["Harvesting", "Ploughing", "Drip Irrigation Setup", "Tractor Driving"],
    experience: "7 Years",
    dailyWage: 650,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
    verified: true
  },
  admin: {
    id: "adm-1",
    _id: "adm-1",
    role: "admin",
    name: "System Admin",
    email: "admin@agrismart.gov.in",
    phone: "+91 1800 233 4567",
    location: "Central AgriTech HQ, New Delhi",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    verified: true
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('agrismart_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return ROLE_PROFILES.farmer;
      }
    }
    return ROLE_PROFILES.farmer; // Default to farmer for instant rich demonstration
  });

  const [loading, setLoading] = useState(false);

  // Sync token and profile on load
  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (token) {
        try {
          const res = await api.get('/auth/me');
          if (res.success && res.user) {
            setUser(res.user);
            localStorage.setItem('agrismart_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.log('[AuthContext] Backend offline or token expired. Preserving local session state.');
        }
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('agrismart_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('agrismart_user');
    }
  }, [user]);

  // Real backend login with graceful fallback for demonstration
  const login = async (role, credentials = {}) => {
    setLoading(true);
    try {
      const email = credentials.email || ROLE_PROFILES[role]?.email;
      const password = credentials.password || 'password123';

      const res = await api.post('/auth/login', { email, password });
      if (res.success && res.token) {
        setAuthToken(res.token);
        setUser(res.user);
        setLoading(false);
        return res.user;
      }
    } catch (err) {
      console.warn('[Auth Login] Backend not responding, using authenticated demo profile:', err.message);
    }

    // Fallback demo profile
    const profile = ROLE_PROFILES[role] || ROLE_PROFILES.farmer;
    const loggedUser = { ...profile, ...credentials, role };
    setUser(loggedUser);
    setLoading(false);
    return loggedUser;
  };

  // Real backend registration with fallback
  const register = async (role, userData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { ...userData, role });
      if (res.success && res.token) {
        setAuthToken(res.token);
        setUser(res.user);
        setLoading(false);
        return res.user;
      }
    } catch (err) {
      console.warn('[Auth Register] Backend not responding, using created demo account:', err.message);
    }

    // Fallback demo registration
    const profile = ROLE_PROFILES[role] || {};
    const newUser = {
      ...profile,
      ...userData,
      id: `usr-${Date.now()}`,
      role,
      verified: true
    };
    setUser(newUser);
    setLoading(false);
    return newUser;
  };

  // Switch Role for evaluation demo
  const switchRole = (newRole) => {
    if (ROLE_PROFILES[newRole]) {
      setUser(ROLE_PROFILES[newRole]);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('agrismart_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, switchRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
