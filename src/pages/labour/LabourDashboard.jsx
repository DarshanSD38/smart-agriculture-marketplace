import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { labourService } from '../../services/labourService';
import DashboardCard from '../../components/DashboardCard';
import Rating from '../../components/Rating';
import { 
  Briefcase, 
  CheckSquare, 
  CalendarCheck, 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const LabourDashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    labourService.getAllJobs().then(data => {
      setJobs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--slate-900)' }}>
            Welcome, {user?.name || 'Babu Rao'}! 🌾
          </h1>
          <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
            Agricultural Field Specialist • Nashik, Maharashtra • Status: <strong style={{ color: '#16a34a' }}>Active & Ready for Work</strong>
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/labour/jobs" className="btn btn-primary">
            <Briefcase size={16} />
            <span>Browse Available Field Jobs</span>
          </Link>
          <Link to="/labour/availability" className="btn btn-secondary">
            <CalendarCheck size={16} />
            <span>Update Availability</span>
          </Link>
        </div>
      </div>

      {/* DASHBOARD METRICS CARDS (Mandated by Section 15) */}
      <div className="grid-4" style={{ marginBottom: '32px' }}>
        <DashboardCard
          icon={<Briefcase size={22} />}
          title="Available Jobs"
          value={jobs.length}
          subtitle="Openings in your taluka"
          trend="+3 New"
          color="green"
        />
        <DashboardCard
          icon={<CheckSquare size={22} />}
          title="Applied Jobs"
          value="4 Positions"
          subtitle="Awaiting farmer review"
          trend="In Review"
          color="blue"
        />
        <DashboardCard
          icon={<CheckCircle2 size={22} />}
          title="Accepted Jobs"
          value="3 Completed"
          subtitle="This harvest season"
          trend="100% On-Time"
          color="green"
        />
        <DashboardCard
          icon={<Star size={22} />}
          title="Worker Rating"
          value="4.9 ★"
          subtitle="From 48 farmer reviews"
          trend="Top Rated"
          color="amber"
        />
      </div>

      {/* RECENT FIELD JOB OPENINGS */}
      <div className="card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span className="badge badge-green" style={{ marginBottom: '4px' }}>Recommended Openings</span>
            <h3 className="card-title">Urgent Field Work In Your District</h3>
            <p className="card-subtitle">Direct hiring with prompt daily wage disbursements</p>
          </div>

          <Link to="/labour/jobs" className="btn btn-secondary btn-sm">
            <span>View All Job Postings</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {jobs.map(job => (
            <div
              key={job.id}
              style={{
                padding: '18px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--slate-200)',
                background: 'var(--slate-50)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '14px'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                    {job.title}
                  </h4>
                  <span className="badge badge-blue">{job.requiredSkill}</span>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '6px', fontSize: '0.82rem', color: 'var(--slate-600)', flexWrap: 'wrap' }}>
                  <span>Farmer: <strong>{job.farmerName}</strong></span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={13} /> {job.location}</span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={13} /> Start: {job.startDate} ({job.duration})</span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
                  ✓ Perks: {job.perks}
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                    ₹{job.dailyPayment}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>per day / worker</span>
                </div>

                <Link to="/labour/jobs" className="btn btn-primary btn-sm">
                  Apply Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LabourDashboard;

