import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sprout, ShoppingBag, Users, ShieldCheck, RefreshCw } from 'lucide-react';

const RoleSwitcher = () => {
  const { user, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    switchRole(role);
    if (role === 'farmer') navigate('/farmer/dashboard');
    else if (role === 'customer') navigate('/customer/dashboard');
    else if (role === 'labour') navigate('/labour/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div className="demo-role-banner">
      <div className="demo-role-left">
        <Sprout size={16} />
        <span>AgriSmart Prototype Mode</span>
        <span className="demo-role-badge">Current Role: {user ? user.role.toUpperCase() : 'GUEST'}</span>
      </div>

      <div className="demo-role-buttons">
        <span style={{ fontSize: '0.78rem', opacity: 0.9 }}>Quick Switch Demo:</span>
        <button
          className={`role-btn ${user?.role === 'farmer' ? 'active' : ''}`}
          onClick={() => handleRoleChange('farmer')}
        >
          <Sprout size={13} /> Farmer
        </button>
        <button
          className={`role-btn ${user?.role === 'customer' ? 'active' : ''}`}
          onClick={() => handleRoleChange('customer')}
        >
          <ShoppingBag size={13} /> Customer
        </button>
        <button
          className={`role-btn ${user?.role === 'labour' ? 'active' : ''}`}
          onClick={() => handleRoleChange('labour')}
        >
          <Users size={13} /> Labour
        </button>
        <button
          className={`role-btn ${user?.role === 'admin' ? 'active' : ''}`}
          onClick={() => handleRoleChange('admin')}
        >
          <ShieldCheck size={13} /> Admin
        </button>
      </div>
    </div>
  );
};

export default RoleSwitcher;

