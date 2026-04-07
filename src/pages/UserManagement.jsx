import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Shield, User as UserIcon, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:8080/api/users');
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await axios.delete(`http://localhost:8080/api/users/${id}`);
        setUsers(users.filter(u => u.id !== id));
      } catch (err) {
        alert("Action failed. Check if Backend is running.");
      }
    }
  };

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '10px' }}>
      <RefreshCw className="animate-spin" /> Loading User Registry...
    </div>
  );

  return (
    <div style={{ padding: '30px', background: '#f8fafc', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <Link to="/admin-dashboard" style={{ textDecoration: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px', fontWeight: '500' }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#1e3a8a', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield /> System User Registry
        </h2>
        <span style={{ background: '#e2e8f0', padding: '5px 15px', borderRadius: '20px', fontSize: '0.9rem', color: '#475569' }}>
          Total Users: **{users.length}**
        </span>
      </div>
      
      <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
              <th style={thStyle}>ID</th>
              <th style={thStyle}>Username</th>
              <th style={thStyle}>Role</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s' }}>
                <td style={tdStyle}>#{u.id}</td>
                <td style={{ ...tdStyle, fontWeight: '600', color: '#0f172a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ background: '#e2e8f0', padding: '6px', borderRadius: '50%' }}>
                      <UserIcon size={14} />
                    </div>
                    {/* KEY FIX: Tries all common naming variations */}
                    {u.user || u.username || u.name || `User_${u.id}`}
                  </div>
                </td>
                <td style={tdStyle}>
                  <span style={{ 
                    padding: '5px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '0.5px',
                    background: u.role?.toLowerCase() === 'admin' ? '#fee2e2' : '#dcfce7',
                    color: u.role?.toLowerCase() === 'admin' ? '#991b1b' : '#166534'
                  }}>
                    {u.role?.toUpperCase()}
                  </span>
                </td>
                <td style={tdStyle}>
                  <button 
                    onClick={() => handleDelete(u.id, u.user || u.username || u.id)}
                    style={{ color: '#ef4444', border: 'none', background: 'none', cursor: 'pointer', padding: '8px', borderRadius: '6px' }}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = { padding: '18px 20px', color: '#64748b', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' };
const tdStyle = { padding: '18px 20px', color: '#334155', fontSize: '0.95rem' };