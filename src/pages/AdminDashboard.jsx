import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '10px' }}>
        Admin Dashboard 🛡️
      </h1>
      <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '40px' }}>
        Welcome, Super Admin. You can manage the entire platform here.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Card 1 */}
        <div style={{ background: 'white', padding: '40px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', marginBottom: '25px', fontSize: '1.4rem' }}>Verify Guides</h3>
          <Link to="/verify-guides" style={{ textDecoration: 'none' }}>
            <button style={{ background: '#d35400', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s' }}>
              View List
            </button>
          </Link>
        </div>

        {/* Card 2 */}
        <div style={{ background: 'white', padding: '40px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', marginBottom: '25px', fontSize: '1.4rem' }}>Approve Content</h3>
          <Link to="/approve-content" style={{ textDecoration: 'none' }}>
            <button style={{ background: '#d35400', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s' }}>
              View Pending
            </button>
          </Link>
        </div>

        {/* Card 3 */}
        <div style={{ background: 'white', padding: '40px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', marginBottom: '25px', fontSize: '1.4rem' }}>User Reports</h3>
          <Link to="/user-reports" style={{ textDecoration: 'none' }}>
            <button style={{ background: '#d35400', color: 'white', border: 'none', padding: '12px 30px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', transition: 'background 0.2s' }}>
              Check Reports
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}