import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sprout, ShoppingBag, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

const RegisterPage = () => {
  const [role, setRole] = useState('farmer');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    farmName: '',
    farmSize: '',
    skills: '',
    dailyWage: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email address is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.location.trim()) newErrors.location = 'City / District is required';
    if (!formData.password || formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (role === 'farmer' && !formData.farmName.trim()) {
      newErrors.farmName = 'Farm name is required';
    }
    if (role === 'labour' && !formData.skills.trim()) {
      newErrors.skills = 'Please enter your key skills';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    register(role, formData);

    if (role === 'farmer') navigate('/farmer/dashboard');
    else if (role === 'customer') navigate('/customer/dashboard');
    else if (role === 'labour') navigate('/labour/dashboard');
  };

  return (
    <div style={{ maxWidth: '580px', margin: '40px auto', padding: '0 20px' }}>
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
            Join the AgriSmart Network
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--slate-500)', marginTop: '4px' }}>
            Direct agricultural marketplace & AI support system
          </p>
        </div>

        {/* ROLE SELECTION */}
        <div style={{ marginBottom: '24px' }}>
          <label className="form-label" style={{ textAlign: 'center', marginBottom: '8px' }}>
            Select Your Role
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[
              { id: 'farmer', label: 'Farmer / Grower', desc: 'Sell produce & AI advice', icon: <Sprout size={16} /> },
              { id: 'customer', label: 'Buyer / Consumer', desc: 'Fresh farm purchases', icon: <ShoppingBag size={16} /> },
              { id: 'labour', label: 'Agri Labourer', desc: 'Find farm field jobs', icon: <Users size={16} /> }
            ].map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                style={{
                  padding: '12px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: role === r.id ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  backgroundColor: role === r.id ? 'var(--primary-50)' : '#ffffff',
                  color: role === r.id ? 'var(--primary-800)' : 'var(--slate-700)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.15s ease'
                }}
              >
                {r.icon}
                <strong style={{ fontSize: '0.82rem' }}>{r.label}</strong>
                <span style={{ fontSize: '0.68rem', color: 'var(--slate-400)' }}>{r.desc}</span>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleRegister}>
          <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name *</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="e.g. Ramesh Patel"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.name}</span>}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Mobile Number *</label>
              <input
                type="tel"
                name="phone"
                className="form-input"
                placeholder="+91 98231 44550"
                value={formData.phone}
                onChange={handleChange}
              />
              {errors.phone && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.phone}</span>}
            </div>
          </div>

          <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email Address *</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.email}</span>}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Location / District *</label>
              <input
                type="text"
                name="location"
                className="form-input"
                placeholder="e.g. Nashik, Maharashtra"
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.location}</span>}
            </div>
          </div>

          {/* ROLE SPECIFIC FIELDS */}
          {role === 'farmer' && (
            <div className="grid-2" style={{ gap: '14px', marginBottom: '14px', background: 'var(--primary-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Farm / Estate Name *</label>
                <input
                  type="text"
                  name="farmName"
                  className="form-input"
                  placeholder="e.g. Green Valley Organics"
                  value={formData.farmName}
                  onChange={handleChange}
                />
                {errors.farmName && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.farmName}</span>}
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Total Land Holding (Acres)</label>
                <input
                  type="number"
                  name="farmSize"
                  className="form-input"
                  placeholder="e.g. 10"
                  value={formData.farmSize}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {role === 'labour' && (
            <div className="grid-2" style={{ gap: '14px', marginBottom: '14px', background: 'var(--earth-50)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Primary Agricultural Skills *</label>
                <input
                  type="text"
                  name="skills"
                  className="form-input"
                  placeholder="e.g. Harvesting, Ploughing, Drip"
                  value={formData.skills}
                  onChange={handleChange}
                />
                {errors.skills && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.skills}</span>}
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label">Expected Daily Wage (₹)</label>
                <input
                  type="number"
                  name="dailyWage"
                  className="form-input"
                  placeholder="e.g. 600"
                  value={formData.dailyWage}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="grid-2" style={{ gap: '14px', marginBottom: '20px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Password *</label>
              <input
                type="password"
                name="password"
                className="form-input"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.password}</span>}
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <span style={{ color: 'var(--danger-600)', fontSize: '0.74rem' }}>{errors.confirmPassword}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px' }}>
            <span>Create {role.toUpperCase()} Account</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--slate-600)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-700)', fontWeight: 700 }}>
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

