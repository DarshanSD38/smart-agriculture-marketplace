import React, { useState, useEffect } from 'react';
import { labourService } from '../../services/labourService';
import Modal from '../../components/Modal';
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Search, 
  Filter 
} from 'lucide-react';

const LabourJobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [appliedJobs, setAppliedJobs] = useState({});
  const [selectedJob, setSelectedJob] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    labourService.getAllJobs().then(data => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  const handleOpenApply = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleConfirmApply = async (e) => {
    e.preventDefault();
    await labourService.applyForJob(selectedJob.id);
    setAppliedJobs(p => ({ ...p, [selectedJob.id]: true }));
    setModalOpen(false);
  };

  const skills = ['All', 'Harvesting', 'Sowing & Transplanting', 'Drip Irrigation Setup', 'Weeding', 'Tractor Driving'];

  const filteredJobs = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) || 
                          j.farmerName.toLowerCase().includes(search.toLowerCase());
    const matchesSkill = skillFilter === 'All' || j.requiredSkill.toLowerCase().includes(skillFilter.toLowerCase());
    return matchesSearch && matchesSkill;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-700)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <Briefcase size={18} />
          <span>Verified Farm Employment</span>
        </div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Available Agricultural Jobs
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Direct daily field labor jobs posted by verified growers with transparent wage terms.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="card" style={{ padding: '20px', marginBottom: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', alignItems: 'center' }}>
          <div>
            <label className="form-label">Search Job or Farm</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Tomato harvesting, Ramesh..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">Required Skill</label>
            <select
              className="form-select"
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              {skills.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Location / Taluka</label>
            <select
              className="form-select"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="All">All Locations</option>
              <option value="Nashik">Nashik Region</option>
              <option value="Pune">Pune Rural</option>
            </select>
          </div>
        </div>
      </div>

      {/* JOB CARDS LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredJobs.map(job => {
          const hasApplied = appliedJobs[job.id] || job.hasApplied;

          return (
            <div key={job.id} className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-green">{job.requiredSkill}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--slate-400)' }}>Posted 1 day ago</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '4px' }}>
                    {job.title}
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary-700)', fontWeight: 600, marginTop: '2px' }}>
                    Farmer: {job.farmerName}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                    ₹{job.dailyPayment}
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--slate-500)' }}>per day / worker</span>
                </div>
              </div>

              <p style={{ fontSize: '0.86rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: '16px' }}>
                {job.description}
              </p>

              {/* Job Details Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '12px',
                background: 'var(--slate-50)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                marginBottom: '18px',
                fontSize: '0.82rem'
              }}>
                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block' }}>Farm Location:</span>
                  <strong style={{ color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <MapPin size={13} /> {job.location}
                  </strong>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block' }}>Workers Needed:</span>
                  <strong style={{ color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Users size={13} /> {job.workersNeeded} Workers ({job.workersApplied} applied)
                  </strong>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block' }}>Start Date & Duration:</span>
                  <strong style={{ color: 'var(--slate-800)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Calendar size={13} /> {job.startDate} ({job.duration})
                  </strong>
                </div>

                <div>
                  <span style={{ color: 'var(--slate-500)', display: 'block' }}>Extra Perks:</span>
                  <strong style={{ color: '#16a34a', display: 'block', marginTop: '2px' }}>
                    {job.perks}
                  </strong>
                </div>
              </div>

              {/* Application Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                {hasApplied ? (
                  <button disabled className="btn btn-secondary" style={{ color: '#16a34a' }}>
                    <CheckCircle2 size={16} />
                    <span>Application Submitted (Pending Farmer Confirmation)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleOpenApply(job)}
                    className="btn btn-primary"
                    style={{ padding: '10px 24px' }}
                  >
                    <span>Apply for this Job</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* APPLY CONFIRMATION MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Field Job Application"
      >
        {selectedJob && (
          <form onSubmit={handleConfirmApply}>
            <div style={{ background: 'var(--slate-50)', padding: '14px', borderRadius: 'var(--radius-md)', marginBottom: '16px' }}>
              <h4 style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--slate-900)' }}>{selectedJob.title}</h4>
              <div style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginTop: '4px' }}>
                Farmer: <strong>{selectedJob.farmerName}</strong> • {selectedJob.location}
              </div>
              <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--primary-700)', marginTop: '6px' }}>
                Daily Wage: ₹{selectedJob.dailyPayment} / day
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '20px', lineHeight: 1.5 }}>
              By confirming, your verified profile and agricultural skills will be submitted directly to Farmer {selectedJob.farmerName}. You will receive an SMS confirmation once approved.
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '12px' }}>
                Confirm Application
              </button>
              <button type="button" onClick={() => setModalOpen(false)} className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default LabourJobSearch;

