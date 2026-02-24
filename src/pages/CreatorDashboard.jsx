import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function CreatorDashboard() {
  const { user } = useAuth();
  return (
    <div className="container">
      <h1>Content Creator Studio 🎥</h1>
      <p>Welcome, {user?.name}. Create and manage educational content.</p>
      <div style={{marginTop: '20px', padding: '20px', background: 'white', borderRadius: '10px'}}>
        <h3>Upload New Content</h3>
        <input type="text" placeholder="Title of Monument" style={{display:'block', margin:'10px 0', padding:'10px', width:'50%'}} />
        <textarea placeholder="Description..." style={{display:'block', margin:'10px 0', padding:'10px', width:'50%', height:'100px'}}></textarea>
        <button className="btn">Publish Content</button>
      </div>
    </div>
  );
}