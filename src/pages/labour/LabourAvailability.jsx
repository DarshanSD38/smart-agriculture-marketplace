import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, Clock, Save } from 'lucide-react';

const LabourAvailability = () => {
  const [status, setStatus] = useState('Immediate');
  const [preferredDays, setPreferredDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);
  const [maxTravelKm, setMaxTravelKm] = useState('25');
  const [saved, setSaved] = useState(false);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const toggleDay = (day) => {
    if (preferredDays.includes(day)) {
      setPreferredDays(preferredDays.filter(d => d !== day));
    } else {
      setPreferredDays([...preferredDays, day]);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Manage Work Availability Schedule
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Control when farmers can discover and contact you for farm jobs
        </p>
      </div>

      <div className="card" style={{ padding: '28px' }}>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">Current Work Availability Status</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
              {[
                { id: 'Immediate', label: 'Immediately Available', desc: 'Can start field work today' },
                { id: 'Available Tomorrow', label: 'Available Tomorrow', desc: 'Next day dispatch' },
                { id: 'Next Week', label: 'Next Week Onwards', desc: 'Pre-booking harvest slots' },
                { id: 'Not Available', label: 'Temporarily Busy', desc: 'On active contract' }
              ].map(st => (
                <div
                  key={st.id}
                  onClick={() => setStatus(st.id)}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: status === st.id ? '2px solid var(--primary-600)' : '1px solid var(--slate-200)',
                    background: status === st.id ? 'var(--primary-50)' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <strong style={{ fontSize: '0.86rem', color: 'var(--slate-900)', display: 'block' }}>{st.label}</strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--slate-500)', marginTop: '2px', display: 'block' }}>{st.desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label className="form-label">Available Days of the Week</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {daysOfWeek.map(day => {
                const isSelected = preferredDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    style={{
                      padding: '8px 16px',
                      borderRadius: 'var(--radius-full)',
                      border: isSelected ? '1px solid var(--primary-600)' : '1px solid var(--slate-300)',
                      background: isSelected ? 'var(--primary-600)' : '#ffffff',
                      color: isSelected ? '#ffffff' : 'var(--slate-700)',
                      fontSize: '0.84rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Maximum Travel Distance from Home (km): {maxTravelKm} km</label>
            <input
              type="range"
              min="5"
              max="60"
              value={maxTravelKm}
              onChange={(e) => setMaxTravelKm(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--primary-600)' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '10px 24px' }}>
            <Save size={16} />
            <span>{saved ? 'Availability Updated!' : 'Save Schedule'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default LabourAvailability;

