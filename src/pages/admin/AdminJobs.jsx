import React, { useState, useEffect } from 'react';
import { labourService } from '../../services/labourService';
import { Briefcase, CheckCircle2 } from 'lucide-react';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    labourService.getAllJobs().then(data => setJobs(data));
  }, []);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Manage Labour Job Postings
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Oversight of active farm labor requests and minimum wage compliance
        </p>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Farmer</th>
              <th>Skill</th>
              <th>Daily Wage</th>
              <th>Workers (Applied/Needed)</th>
              <th>Start Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map(job => (
              <tr key={job.id}>
                <td><strong>{job.title}</strong></td>
                <td>{job.farmerName}</td>
                <td><span className="badge badge-blue">{job.requiredSkill}</span></td>
                <td><strong>₹{job.dailyPayment} / day</strong></td>
                <td>{job.workersApplied} / {job.workersNeeded}</td>
                <td>{job.startDate}</td>
                <td>
                  <span className="badge badge-green">{job.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminJobs;

