import React from 'react';
import { Briefcase, Calendar, CheckCircle2, Clock } from 'lucide-react';

const LabourApplications = () => {
  const applications = [
    {
      id: "app-1",
      jobTitle: "Tomato Harvesting & Sorting Crew",
      farmerName: "Ramesh Patel",
      location: "Nashik Plot #14",
      appliedDate: "Yesterday",
      status: "Accepted",
      dailyWage: 650,
      workDates: "Nov 3 - Nov 6, 2026"
    },
    {
      id: "app-2",
      jobTitle: "Onion Sowing & Field Ridging",
      farmerName: "Suresh Kumar",
      location: "Pune Rural",
      appliedDate: "2 Days ago",
      status: "Under Review",
      dailyWage: 600,
      workDates: "Nov 5 - Nov 9, 2026"
    }
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          My Job Applications
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Track status of your applications submitted to local farm owners
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {applications.map(app => (
          <div key={app.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span className={`badge ${app.status === 'Accepted' ? 'badge-green' : 'badge-blue'}`} style={{ marginBottom: '6px' }}>
                  {app.status}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)' }}>
                  {app.jobTitle}
                </h3>
                <div style={{ fontSize: '0.84rem', color: 'var(--slate-600)', marginTop: '2px' }}>
                  Farmer: <strong>{app.farmerName}</strong> • {app.location}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-700)' }}>
                  ₹{app.dailyWage} / day
                </div>
                <span style={{ fontSize: '0.76rem', color: 'var(--slate-400)' }}>Applied {app.appliedDate}</span>
              </div>
            </div>

            <div style={{ marginTop: '14px', borderTop: '1px solid var(--slate-100)', paddingTop: '10px', fontSize: '0.82rem', color: 'var(--slate-600)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={14} color="#16a34a" />
              <span>Work Schedule: <strong>{app.workDates}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabourApplications;

