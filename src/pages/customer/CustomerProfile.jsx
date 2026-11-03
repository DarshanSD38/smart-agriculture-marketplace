import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, MapPin, Phone, Mail, Save, CheckCircle2 } from 'lucide-react';

const CustomerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || 'Aarav Sharma',
    phone: user?.phone || '+91 99887 76655',
    email: user?.email || 'aarav.sharma@gmail.com',
    location: user?.location || 'Baner, Pune, Maharashtra',
    address: user?.address || 'Flat 402, Green Meadows Apt, Baner, Pune 411045'
  });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          My Account & Delivery Profile
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Manage your contact information and default grocery delivery address
        </p>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={profile.name}
                onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                value={profile.phone}
                onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={profile.email}
                onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">City / Region</label>
              <input
                type="text"
                className="form-input"
                value={profile.location}
                onChange={(e) => setProfile(p => ({ ...p, location: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Default Home Delivery Address</label>
            <textarea
              rows={3}
              className="form-textarea"
              value={profile.address}
              onChange={(e) => setProfile(p => ({ ...p, address: e.target.value }))}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Save size={16} />
            <span>{saved ? 'Address Saved Successfully!' : 'Update Profile'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerProfile;

