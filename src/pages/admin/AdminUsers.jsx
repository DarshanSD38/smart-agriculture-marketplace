import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import { Users, Search, CheckCircle2, Ban, ShieldCheck } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAllUsers().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const toggleStatus = (id) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
  };

  const filtered = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || 
                          u.location.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--slate-900)' }}>
          Platform User Management
        </h1>
        <p style={{ color: 'var(--slate-500)', fontSize: '0.88rem' }}>
          Directory of registered Farmers, Consumers, and Agricultural Labourers
        </p>
      </div>

      <div className="card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px' }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by name or district..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['All', 'Farmer', 'Customer', 'Labourer'].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: roleFilter === r ? '1px solid var(--primary-600)' : '1px solid var(--slate-200)',
                  background: roleFilter === r ? 'var(--primary-600)' : '#ffffff',
                  color: roleFilter === r ? '#ffffff' : 'var(--slate-700)',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Platform Role</th>
              <th>Phone</th>
              <th>Location</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong>{user.name}</strong>
                    {user.verified && <CheckCircle2 size={14} color="#16a34a" />}
                  </div>
                </td>
                <td>
                  <span className={`badge ${user.role === 'Farmer' ? 'badge-green' : (user.role === 'Customer' ? 'badge-blue' : 'badge-amber')}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.phone}</td>
                <td>{user.location}</td>
                <td>{user.joined}</td>
                <td>
                  <span className={`badge ${user.status === 'Active' ? 'badge-green' : 'badge-red'}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.76rem', padding: '4px 8px' }}
                  >
                    {user.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

