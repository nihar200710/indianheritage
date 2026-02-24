import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function EnthusiastDashboard() {
  const { user } = useAuth();
  return (
    <div className="container">
      <h1>Cultural Enthusiast Portal 🌏</h1>
      <p>Namaste, {user?.name}! Ready to explore India?</p>
      
      <div className="grid-4" style={{marginTop: '20px'}}>
        <div className="card">
            <h3>Virtual Tours</h3>
            <p>Join live sessions.</p>
            <Link to="/explore" className="btn">Explore Now</Link>
        </div>
        <div className="card">
            <h3>My Bookings</h3>
            <p>Check upcoming tours.</p>
            <button className="btn" style={{background: '#555'}}>View History</button>
        </div>
        <div className="card">
            <h3>Discussion Forum</h3>
            <p>Talk about heritage.</p>
            <button className="btn" style={{background: '#555'}}>Join Chat</button>
        </div>
      </div>
    </div>
  );
}