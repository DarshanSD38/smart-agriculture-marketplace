import React, { useState } from 'react';
import Rating from './Rating';
import { MapPin, Briefcase, Clock, Phone, CheckCircle, ShieldCheck } from 'lucide-react';

const LabourCard = ({ labourer, onContactRequest, onViewProfile }) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
        <img 
          src={labourer.avatar} 
          alt={labourer.name} 
          style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-400)' }} 
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--slate-900)' }}>
              {labourer.name}
            </h3>
            <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
              {labourer.badge || 'Verified'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--slate-500)', marginTop: '2px' }}>
            <MapPin size={13} /> {labourer.location}
          </div>
          <div style={{ marginTop: '3px' }}>
            <Rating value={labourer.rating} count={labourer.completedJobs} showCount={true} size={13} />
          </div>
        </div>
      </div>

      <p style={{ fontSize: '0.82rem', color: 'var(--slate-600)', marginBottom: '12px', flex: 1 }}>
        {labourer.bio}
      </p>

      {/* Skills */}
      <div style={{ marginBottom: '14px' }}>
        <div style={{ fontSize: '0.74rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--slate-400)', marginBottom: '6px' }}>
          Skills
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {labourer.skills?.map((skill, index) => (
            <span key={index} style={{ fontSize: '0.73rem', background: 'var(--slate-100)', color: 'var(--slate-700)', padding: '2px 8px', borderRadius: '4px', fontWeight: 500 }}>
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Info bar */}
      <div style={{ background: 'var(--slate-50)', padding: '10px 12px', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', fontSize: '0.82rem' }}>
        <div>
          <span style={{ color: 'var(--slate-500)' }}>Exp: </span>
          <strong>{labourer.experienceYears} Years</strong>
        </div>
        <div>
          <span style={{ color: 'var(--slate-500)' }}>Wage: </span>
          <strong style={{ color: 'var(--primary-700)' }}>₹{labourer.dailyWage}/day</strong>
        </div>
        <div style={{ color: labourer.availability === 'Immediate' ? '#16a34a' : '#d97706', fontWeight: 600 }}>
          ● {labourer.availability}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
        <button 
          onClick={() => onViewProfile && onViewProfile(labourer)}
          className="btn btn-secondary btn-sm"
          style={{ flex: 1 }}
        >
          View Profile
        </button>
        <button 
          onClick={() => onContactRequest && onContactRequest(labourer)}
          className="btn btn-primary btn-sm"
          style={{ flex: 1 }}
        >
          Contact / Hire
        </button>
      </div>
    </div>
  );
};

export default LabourCard;

