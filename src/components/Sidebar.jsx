import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Warehouse,
  ShoppingBag,
  TrendingUp,
  BrainCircuit,
  AlertTriangle,
  HeartPulse,
  Sprout,
  Users,
  BarChart3,
  Bell,
  User,
  LogOut,
  Compass,
  ShoppingCart,
  Scale,
  Users2,
  CheckSquare,
  Briefcase,
  Star,
  CalendarCheck,
  ShieldAlert,
  Settings,
  Store,
  MapPin
} from 'lucide-react';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const role = user.role || 'farmer';

  const farmerNav = [
    { label: 'Dashboard', path: '/farmer/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'My Products', path: '/farmer/products', icon: <Package size={18} /> },
    { label: 'Add Product', path: '/farmer/add-product', icon: <PlusCircle size={18} /> },
    { label: 'Inventory', path: '/farmer/inventory', icon: <Warehouse size={18} /> },
    { label: 'Orders', path: '/farmer/orders', icon: <ShoppingBag size={18} /> },
    { label: 'AI Price Reco', path: '/farmer/ai-price', icon: <TrendingUp size={18} /> },
    { label: 'Demand Prediction', path: '/farmer/demand-prediction', icon: <BrainCircuit size={18} /> },
    { label: 'Surplus Management', path: '/farmer/surplus', icon: <AlertTriangle size={18} /> },
    { label: 'Crop Health', path: '/farmer/crop-health', icon: <HeartPulse size={18} /> },
    { label: 'Crop Recommendation', path: '/farmer/crop-recommendation', icon: <Sprout size={18} /> },
    { label: 'Find Labour', path: '/farmer/find-labour', icon: <Users size={18} /> },
    { label: 'Sales Analytics', path: '/farmer/analytics', icon: <BarChart3 size={18} /> },
    { label: 'Agri-Input Store', path: '/agri-input', icon: <Store size={18} /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell size={18} /> },
    { label: 'Profile', path: '/farmer/profile', icon: <User size={18} /> }
  ];

  const customerNav = [
    { label: 'Dashboard', path: '/customer/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Marketplace', path: '/marketplace', icon: <Store size={18} /> },
    { label: 'Nearby Farmers', path: '/customer/nearby-farmers', icon: <MapPin size={18} /> },
    { label: 'AI Recommendations', path: '/customer/recommendations', icon: <BrainCircuit size={18} /> },
    { label: 'Smart Basket', path: '/customer/basket', icon: <ShoppingCart size={18} /> },
    { label: 'Price Comparison', path: '/customer/price-comparison', icon: <Scale size={18} /> },
    { label: 'Group Buying', path: '/customer/group-buying', icon: <Users2 size={18} /> },
    { label: 'My Orders', path: '/customer/orders', icon: <ShoppingBag size={18} /> },
    { label: 'Reviews', path: '/customer/reviews', icon: <Star size={18} /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell size={18} /> },
    { label: 'Profile', path: '/customer/profile', icon: <User size={18} /> }
  ];

  const labourNav = [
    { label: 'Dashboard', path: '/labour/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Available Jobs', path: '/labour/jobs', icon: <Briefcase size={18} /> },
    { label: 'My Applications', path: '/labour/applications', icon: <CheckSquare size={18} /> },
    { label: 'Availability', path: '/labour/availability', icon: <CalendarCheck size={18} /> },
    { label: 'My Profile & Skills', path: '/labour/profile', icon: <User size={18} /> },
    { label: 'Notifications', path: '/notifications', icon: <Bell size={18} /> }
  ];

  const adminNav = [
    { label: 'Overview', path: '/admin/dashboard', icon: <LayoutDashboard size={18} /> },
    { label: 'Manage Users', path: '/admin/users', icon: <Users size={18} /> },
    { label: 'Manage Products', path: '/admin/products', icon: <Package size={18} /> },
    { label: 'Manage Orders', path: '/admin/orders', icon: <ShoppingBag size={18} /> },
    { label: 'Manage Jobs', path: '/admin/jobs', icon: <Briefcase size={18} /> },
    { label: 'Reviews & Disputes', path: '/admin/reviews', icon: <ShieldAlert size={18} /> },
    { label: 'Platform Analytics', path: '/admin/analytics', icon: <BarChart3 size={18} /> }
  ];

  let currentNav = farmerNav;
  if (role === 'customer') currentNav = customerNav;
  else if (role === 'labour') currentNav = labourNav;
  else if (role === 'admin') currentNav = adminNav;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-user">
          <img 
            src={user.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"} 
            alt={user.name} 
            className="sidebar-avatar" 
          />
          <div className="sidebar-user-info">
            <h4>{user.name}</h4>
            <span className="sidebar-user-role">
              {role.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {currentNav.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          onClick={() => { logout(); navigate('/'); }}
          className="btn btn-secondary btn-sm"
          style={{ width: '100%', justifyContent: 'flex-start' }}
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;

