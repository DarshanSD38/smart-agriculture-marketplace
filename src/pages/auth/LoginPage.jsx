import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, ROLE_PROFILES } from '../../context/AuthContext';
import { Sprout, ShoppingBag, Users, ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const LoginPage = () => {
  const [role, setRole] = useState('farmer');
  const [email, setEmail] = useState('ramesh.patel@agrifarm.in');
  const [password, setPassword] = useState('password123');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'farmer') {
      setEmail('ramesh.patel@agrifarm.in');
    } else if (selectedRole === 'customer') {
      setEmail('aarav.sharma@gmail.com');
    } else if (selectedRole === 'labour') {
      setEmail('baburao.shinde@agriwork.in');
    } else if (selectedRole === 'admin') {
      setEmail('admin@agrismart.gov.in');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!email.trim()) newErrors.email = 'Email or phone number is required';
    if (!password.trim()) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    login(role, { email });

    // Navigate to respective role dashboard
    if (role === 'farmer') navigate('/farmer/dashboard');
    else if (role === 'customer') navigate('/customer/dashboard');
    else if (role === 'labour') navigate('/labour/dashboard');
    else if (role === 'admin') navigate('/admin/dashboard');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', padding: '0 20px' }}>
      <div className="card" style={{ padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--primary-100)',
            color: 'var(--primary-700)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px'
          }}>
            <Sprout size={26} />
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Welcome Back to AgriSmart
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--slate-500)', marginTop: '4px' }}>
            Select your account role to sign in to your dashboard
          </p>
        </div>

        {/* ROLE SELECTOR TABS */}
        <div style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ textAlign: 'center', marginBottom: '8px' }}>
            Choose Login Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
            {[
              { id: 'farmer', label: 'Farmer', icon: <Sprout size={14} /> },
              { id: 'customer', label: 'Customer', icon: <ShoppingBag size={14} /> },
              { id: 'labour', label: 'Labour', icon: <Users size={14} /> },
              { id: 'admin', label: 'Admin', icon: <ShieldCheck size={14} /> }
            ].map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleRoleSelect(r.id)}
                style={{
                  padding: '8px 4px',
                  borderRadius: 'var(--radius-md)',
                  border: role === r.id ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  backgroundColor: role === r.id ? 'var(--primary-50)' : '#ffffff',
                  color: role === r.id ? 'var(--primary-800)' : 'var(--slate-600)',
                  fontWeight: 700,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email or Phone Number</label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                className="form-input"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
                placeholder="name@example.com or +91 98..."
              />
            </div>
            {errors.email && <span style={{ color: 'var(--danger-600)', fontSize: '0.76rem' }}>{errors.email}</span>}
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label className="form-label" style={{ margin: 0 }}>Password</label>
              <a href="#forgot" style={{ fontSize: '0.78rem', color: 'var(--primary-700)', fontWeight: 600 }}>
                Forgot?
              </a>
            </div>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
              placeholder="••••••••"
            />
            {errors.password && <span style={{ color: 'var(--danger-600)', fontSize: '0.76rem' }}>{errors.password}</span>}
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', marginTop: '12px' }}>
            <span>Sign In to {role.toUpperCase()} Dashboard</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--slate-100)', textAlign: 'center', fontSize: '0.85rem', color: 'var(--slate-600)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--primary-700)', fontWeight: 700 }}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

