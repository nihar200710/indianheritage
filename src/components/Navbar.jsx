import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth(); // Accessing auth context

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '1rem 2rem', 
      background: 'white', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Globe color="#d35400" />
        <h2 style={{ margin: 0, color: '#d35400' }}>Sanchari</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Home</Link>
        
        {user ? (
          <>
            <span style={{ fontWeight: 'bold', color: '#d35400' }}>{user.name}</span>
            <button onClick={logout} className="btn" style={{ background: '#333', fontSize: '0.8rem', marginLeft: '10px' }}>Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </nav>
  );
}