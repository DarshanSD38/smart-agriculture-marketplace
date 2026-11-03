import React, { useState, useEffect } from 'react';
import { labourService } from '../../services/labourService';
import LabourCard from '../../components/LabourCard';
import Modal from '../../components/Modal';
import { Users, Search, Filter, Phone, Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';

const FarmerFindLabour = () => {
  const [labourers, setLabourers] = useState([]);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedLabourer, setSelectedLabourer] = useState(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Hire form state
  const [hireForm, setHireForm] = useState({
    crop: 'Tomatoes',
    task: 'Harvesting & Sorting',
    date: new Date().toISOString().split('T')[0],
    days: '3',
    offeredWage: '650'
  });
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    loadLabourers();
  }, [skillFilter, availabilityFilter]);

  const loadLabourers = async () => {
    setLoading(true);
    const data = await labourService.filterLabourers({
      skill: skillFilter,
      availability: availabilityFilter
    });
    setLabourers(data);
    setLoading(false);
  };

  const handleOpenContact = (labourer) => {
    setSelectedLabourer(labourer);
    setHireForm(p => ({ ...p, offeredWage: labourer.dailyWage }));
    setRequestSent(false);
    setContactModalOpen(true);
  };

  const handleOpenProfile = (labourer) => {
    setSelectedLabourer(labourer);
    setProfileModalOpen(true);
  };

  const handleSendRequest = (e) => {
    e.preventDefault();
    setRequestSent(true);
  };

  const skillsList = ['All', 'Harvesting', 'Ploughing', 'Drip Irrigation Setup', 'Weeding', 'Pesticide Spraying', 'Tractor Driving'];

  const filteredLabourers = labourers.filter(l => 
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.location.toLowerCase().includes(search.toLowerCase()) ||
    l.skills.some(s => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Find Agricultural Labour
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            Directly connect and hire verified agricultural labourers and field crews
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <span className="badge badge-green">4 Verified Workers Ready</span>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="card" style={{ padding: '18px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', alignItems: 'center' }}>
          <div>
            <label className="form-label">Search by Worker Name or Skill</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Babu Rao or Harvesting..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Skill Requirement</label>
            <select
              className="form-select"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              {skillsList.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Worker Availability</label>
            <select
              className="form-select"
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
            >
              <option value="All">All Availabilities</option>
              <option value="Immediate">Immediate</option>
              <option value="Available Tomorrow">Available Tomorrow</option>
              <option value="Next Week">Next Week</option>
            </select>
          </div>
        </div>
      </div>

      {/* LABOUR CARDS GRID */}
      {filteredLabourers.length === 0 ? (
        <div className="card" style={{ padding: '40px', textAlign: 'center', color: 'var(--slate-400)' }}>
          No labourers matched your criteria.
        </div>
      ) : (
        <div className="grid-2">
          {filteredLabourers.map(labourer => (
            <LabourCard
              key={labourer.id}
              labourer={labourer}
              onContactRequest={handleOpenContact}
              onViewProfile={handleOpenProfile}
            />
          ))}
        </div>
      )}

      {/* VIEW PROFILE MODAL */}
      <Modal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        title="Labourer Professional Profile"
      >
        {selectedLabourer && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
              <img
                src={selectedLabourer.avatar}
                alt={selectedLabourer.name}
                style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--primary-300)' }}
              />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {selectedLabourer.name}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--slate-500)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {selectedLabourer.location}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 700, marginTop: '2px' }}>
                  Verified Worker ID: #AGR-LBR-882
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--slate-50)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '4px' }}>
                Professional Experience & Background
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--slate-700)', lineHeight: 1.5 }}>
                {selectedLabourer.bio}
              </p>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Certified Agricultural Competencies:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {selectedLabourer.skills.map((sk, i) => (
                  <span key={i} className="badge badge-green" style={{ fontSize: '0.78rem' }}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--slate-100)', paddingTop: '16px', marginTop: '16px' }}>
              <div>
                <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>Standard Daily Wage:</span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  ₹{selectedLabourer.dailyWage} / day
                </div>
              </div>

              <button
                onClick={() => { setProfileModalOpen(false); handleOpenContact(selectedLabourer); }}
                className="btn btn-primary"
              >
                Book / Contact Now
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* CONTACT / HIRE MODAL */}
      <Modal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        title={`Hire / Request Worker: ${selectedLabourer?.name}`}
      >
        {selectedLabourer && (
          <div>
            {requestSent ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <CheckCircle2 size={54} color="#16a34a" style={{ margin: '0 auto 14px' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  Work Request Sent to {selectedLabourer.name}!
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--slate-600)', margin: '8px auto 20px', maxWidth: '380px' }}>
                  The worker has received an SMS alert and in-app notification. You can call directly if urgent.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', background: 'var(--primary-50)', borderRadius: 'var(--radius-md)', fontWeight: 700, color: 'var(--primary-800)', fontSize: '0.92rem', marginBottom: '20px' }}>
                  <Phone size={16} /> Direct Phone: {selectedLabourer.phone}
                </div>
                <div>
                  <button onClick={() => setContactModalOpen(false)} className="btn btn-secondary">
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendRequest}>
                <div className="grid-2" style={{ gap: '14px', marginBottom: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Crop Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={hireForm.crop}
                      onChange={(e) => setHireForm(p => ({ ...p, crop: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Primary Task *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={hireForm.task}
                      onChange={(e) => setHireForm(p => ({ ...p, task: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="grid-3" style={{ gap: '14px', marginBottom: '14px' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Start Date *</label>
                    <input
                      type="date"
                      className="form-input"
                      value={hireForm.date}
                      onChange={(e) => setHireForm(p => ({ ...p, date: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Duration (Days) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hireForm.days}
                      onChange={(e) => setHireForm(p => ({ ...p, days: e.target.value }))}
                      min="1"
                      required
                    />
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Daily Wage Offer (₹) *</label>
                    <input
                      type="number"
                      className="form-input"
                      value={hireForm.offeredWage}
                      onChange={(e) => setHireForm(p => ({ ...p, offeredWage: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div style={{ background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-md)', marginBottom: '18px', fontSize: '0.82rem', color: 'var(--slate-600)' }}>
                  Estimated Total Compensation: <strong>₹{Number(hireForm.days) * Number(hireForm.offeredWage)}</strong> (Direct cash/UPI to labourer after daily work completion).
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
                    Send Formal Hire Request
                  </button>
                  <button type="button" onClick={() => setContactModalOpen(false)} className="btn btn-secondary">
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default FarmerFindLabour;

