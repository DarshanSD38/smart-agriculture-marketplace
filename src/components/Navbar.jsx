import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { 
  Sprout, 
  ShoppingCart, 
  Bell, 
  User, 
  Menu, 
  X, 
  Store, 
  LayoutDashboard, 
  LogOut,
  Layers,
  Wrench
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const getDashboardLink = () => {
    if (!user) return '/login';
    if (user.role === 'farmer') return '/farmer/dashboard';
    if (user.role === 'customer') return '/customer/dashboard';
    if (user.role === 'labour') return '/labour/dashboard';
    if (user.role === 'admin') return '/admin/dashboard';
    return '/';
  };

  return (
    <header className="main-navbar">
      <Link to="/" className="brand-logo">
        <div className="brand-icon">
          <Sprout size={24} />
        </div>
        <span>AgriSmart</span>
      </Link>

      <nav className="nav-links">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
        <a href="/#about" className="nav-link">
          About
        </a>
        <a href="/#features" className="nav-link">
          Features
        </a>
        <NavLink to="/marketplace" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Store size={16} />
          Marketplace
        </NavLink>
        <NavLink to="/agri-input" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Wrench size={16} />
          Agri-Inputs
        </NavLink>
        {user && (
          <NavLink to={getDashboardLink()} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={16} />
            Dashboard
          </NavLink>
        )}
      </nav>

      <div className="nav-actions">
        {/* Cart */}
        <Link to="/customer/basket" className="cart-button" title="View Smart Basket">
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>

        {/* Notifications */}
        <Link to="/notifications" className="cart-button" title="Notifications">
          <Bell size={20} />
          <span className="cart-badge" style={{ backgroundColor: '#f59e0b' }}>3</span>
        </Link>

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link to={getDashboardLink()} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 10px', background: 'var(--slate-100)', borderRadius: 'var(--radius-full)' }}>
              <img 
                src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"} 
                alt={user.name} 
                style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} 
              />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-800)' }}>
                {user.name.split(' ')[0]}
              </span>
            </Link>
            <button 
              onClick={() => { logout(); navigate('/'); }} 
              className="btn btn-secondary btn-sm"
              title="Logout"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/login" className="btn btn-secondary btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </div>
        )}

        {/* Mobile Toggle */}
        <button 
          className="cart-button" 
          style={{ display: 'none' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;

