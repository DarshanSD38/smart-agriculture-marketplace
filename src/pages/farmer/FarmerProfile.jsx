import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, MapPin, Phone, Mail, Sprout, CheckCircle2, ShieldCheck, Save } from 'lucide-react';

const FarmerProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || 'Ramesh Patel',
    farmName: user?.farmName || 'Green Valley Organics',
    phone: user?.phone || '+91 98231 44550',
    email: user?.email || 'ramesh.patel@agrifarm.in',
    location: user?.location || 'Nashik, Maharashtra',
    farmSize: user?.farmSize || '12 Acres',
    bio: 'Dedicated organic vegetable cultivator specializing in hybrid tomatoes, hydroponic leafy greens, and rainfed MP wheat with drip fertigation.',
    crops: 'Organic Hybrid Tomatoes, Fresh Spinach, Sharbati Wheat'
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
          Farmer Profile & Farm Credentials
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Your verified credentials visible to direct marketplace consumers
        </p>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--slate-100)' }}>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"}
            alt="Profile Avatar"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-400)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>{profile.name}</h2>
              <span className="badge badge-green" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle2 size={13} /> Verified Grower
              </span>
            </div>
            <div style={{ color: 'var(--primary-700)', fontWeight: 600, fontSize: '0.9rem' }}>{profile.farmName}</div>
            <div style={{ color: 'var(--slate-500)', fontSize: '0.82rem', marginTop: '2px' }}>Member since March 2024 • Rating 4.8 / 5.0 (145 reviews)</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                value={profile.name}
                onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Farm / Estate Name</label>
              <input
                type="text"
                className="form-input"
                value={profile.farmName}
                onChange={(e) => setProfile(p => ({ ...p, farmName: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-input"
                value={profile.phone}
                onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                value={profile.email}
                onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '16px', marginBottom: '16px' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Farm Location / Taluka</label>
              <input
                type="text"
                className="form-input"
                value={profile.location}
                onChange={(e) => setProfile(p => ({ ...p, location: e.target.value }))}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Total Cultivated Area</label>
              <input
                type="text"
                className="form-input"
                value={profile.farmSize}
                onChange={(e) => setProfile(p => ({ ...p, farmSize: e.target.value }))}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Farm Bio & Farming Philosophy</label>
            <textarea
              rows={3}
              className="form-textarea"
              value={profile.bio}
              onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Save size={16} />
            <span>{saved ? 'Profile Saved Successfully!' : 'Update Profile'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default FarmerProfile;

