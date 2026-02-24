import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function GuideDashboard() {
  const { user } = useAuth();
  return (
    <div className="container">
      <h1>Tour Guide Hub 🚩</h1>
      <p>Welcome, {user?.name}. Manage your virtual tours and queries.</p>
      <div className="grid-4" style={{marginTop: '20px'}}>
        <div className="card"><h3>Upcoming Tours</h3><p>Taj Mahal Walk (Tomorrow)</p></div>
        <div className="card"><h3>User Queries</h3><p style={{color:'red'}}>5 New Questions</p></div>
        <div className="card"><h3>Earnings</h3><p>₹ 4,500 this week</p></div>
      </div>
    </div>
  );
}