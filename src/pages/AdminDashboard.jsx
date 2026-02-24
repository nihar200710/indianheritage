import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  return (
    <div className="container">
      <h1>Admin Dashboard 🛡️</h1>
      <p>Welcome, {user?.name}. You can manage the entire platform here.</p>
      <div className="grid-4" style={{marginTop: '20px'}}>
        <div className="card"><h3>Verify Guides</h3><button className="btn">View List</button></div>
        <div className="card"><h3>Approve Content</h3><button className="btn">View Pending</button></div>
        <div className="card"><h3>User Reports</h3><button className="btn">Check Reports</button></div>
      </div>
    </div>
  );
}