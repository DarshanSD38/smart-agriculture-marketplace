import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Rating from '../../components/Rating';
import { User, MapPin, Briefcase, Award, Save, CheckCircle2 } from 'lucide-react';

const LabourProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState({
    name: user?.name || 'Babu Rao Shinde',
    phone: user?.phone || '+91 98555 43210',
    email: user?.email || 'baburao.shinde@agriwork.in',
    location: user?.location || 'Nashik, Maharashtra',
    experience: '7 Years',
    dailyWage: 650,
    skills: 'Harvesting, Ploughing, Drip Irrigation Setup, Tractor Driving, Vegetable Grading',
    bio: 'Specialist in perishable horticulture harvesting. Trained tractor driver and experienced irrigation pipe maintenance lead.'
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
          Agricultural Labour Profile & Skills
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Your verified work qualifications visible to local farm employers
        </p>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px solid var(--slate-100)' }}>
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80"}
            alt="Profile Avatar"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-400)' }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--slate-900)' }}>{profile.name}</h2>
              <span className="badge badge-green">Top Rated Specialist</span>
            </div>
            <div style={{ marginTop: '4px' }}>
              <Rating value={4.9} count={48} size={15} />
            </div>
            <div style={{ color: 'var(--slate-500)', fontSize: '0.82rem', marginTop: '2px' }}>
              48 Completed Field Contracts • 100% On-Time Completion
            </div>
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
                required
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Mobile Number</label>
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
              <label className="form-label">Total Experience (Years)</label>
              <input
                type="text"
                className="form-input"
                value={profile.experience}
                onChange={(e) => setProfile(p => ({ ...p, experience: e.target.value }))}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Standard Daily Wage (₹ / Day)</label>
              <input
                type="number"
                className="form-input"
                value={profile.dailyWage}
                onChange={(e) => setProfile(p => ({ ...p, dailyWage: e.target.value }))}
              />
            </div>
          </div>

          <div className="form-group" id="skills">
            <label className="form-label">Core Agricultural Competencies & Skills</label>
            <textarea
              rows={2}
              className="form-textarea"
              value={profile.skills}
              onChange={(e) => setProfile(p => ({ ...p, skills: e.target.value }))}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Work Bio & References</label>
            <textarea
              rows={3}
              className="form-textarea"
              value={profile.bio}
              onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Save size={16} />
            <span>{saved ? 'Profile Updated!' : 'Update Profile'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LabourProfile;

