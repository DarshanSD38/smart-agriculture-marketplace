import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Star, ShieldAlert } from 'lucide-react';

const AdminReviews = () => {
  const [disputes, setDisputes] = useState([
    {
      id: "disp-101",
      customer: "Vikram Sen",
      farmer: "Suresh Kumar",
      orderId: "ORD-1002",
      type: "Packaging Spoilage",
      details: "Customer reported 2 crushed tomatoes during heavy crate delivery.",
      status: "Resolved - Partial Refund ₹30",
      resolved: true
    },
    {
      id: "disp-102",
      customer: "Ananya Iyer",
      farmer: "Ramesh Patel",
      orderId: "ORD-1008",
      type: "Delayed Delivery Dispatch",
      details: "Morning harvest was delayed by 1 hour due to sudden rain shower.",
      status: "In Mediation",
      resolved: false
    }
  ]);

  const handleResolve = (id) => {
    setDisputes(disputes.map(d => d.id === id ? { ...d, resolved: true, status: "Resolved by Admin" } : d));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Disputes & Customer Complaints Queue
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Arbitrate consumer reports and quality disputes for platform integrity
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {disputes.map(d => (
          <div key={d.id} className="card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <div>
                <span className={`badge ${d.resolved ? 'badge-green' : 'badge-amber'}`}>
                  {d.status}
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--slate-900)', marginTop: '4px' }}>
                  {d.type} (Order #{d.orderId})
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  Filed by: <strong>{d.customer}</strong> against Farmer: <strong>{d.farmer}</strong>
                </div>
              </div>

              {!d.resolved && (
                <button onClick={() => handleResolve(d.id)} className="btn btn-primary btn-sm">
                  Mark as Resolved
                </button>
              )}
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--slate-700)', lineHeight: 1.5, background: 'var(--slate-50)', padding: '12px', borderRadius: 'var(--radius-sm)', marginTop: '8px' }}>
              {d.details}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminReviews;

