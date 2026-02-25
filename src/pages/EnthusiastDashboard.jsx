import React from 'react';
import { Link } from 'react-router-dom';

export default function EnthusiastDashboard() {
  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <h1 style={{ color: '#3b82f6', fontSize: '2.5rem', marginBottom: '10px' }}>My Itinerary 👤</h1>
      <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '40px' }}>
        Welcome back! Manage your upcoming virtual tours, saved heritage sites, and community discussions.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
        
        {/* Card 1: Virtual Tours & Bookings */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '15px', color: '#0f172a', fontSize: '1.3rem', margin: '0 0 15px 0' }}>🎟️ My Bookings</h3>
          <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: '1.6', flex: 1 }}>
            You have <strong>2 upcoming virtual tours</strong> scheduled. Make sure to join the live stream 5 minutes early!
          </p>
          <Link to="/bookings" style={{ display: 'block', textAlign: 'center', background: '#3b82f6', color: 'white', textDecoration: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', transition: 'background 0.2s' }}>
            View My Bookings
          </Link>
        </div>

        {/* Card 2: Discussion Forum */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '15px', color: '#0f172a', fontSize: '1.3rem', margin: '0 0 15px 0' }}>🏛️ Community Forum</h3>
          <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: '1.6', flex: 1 }}>
            Join the conversation! Ask travel advice, discuss architecture, or share your heritage photos with the community.
          </p>
          <Link to="/forum" style={{ display: 'block', textAlign: 'center', background: '#8b5cf6', color: 'white', textDecoration: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', transition: 'background 0.2s' }}>
            Open Discussions
          </Link>
        </div>

        {/* Card 3: AI Explorer */}
        <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '15px', color: '#0f172a', fontSize: '1.3rem', margin: '0 0 15px 0' }}>✨ Explore Heritage</h3>
          <p style={{ color: '#64748b', marginBottom: '25px', lineHeight: '1.6', flex: 1 }}>
            Use our AI-powered engine to generate deep historical insights and interactive maps for any monument in India.
          </p>
          <Link to="/explore" style={{ display: 'block', textAlign: 'center', background: '#d35400', color: 'white', textDecoration: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold', transition: 'background 0.2s' }}>
            Start Exploring
          </Link>
        </div>

      </div>
    </div>
  );
}