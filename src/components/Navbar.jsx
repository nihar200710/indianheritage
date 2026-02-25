import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, logout }) {
  
  // Figures out exactly which dashboard to open based on the role
  const getDashboardRoute = () => {
    if (!user) return '/';
    return `/${user.role}-dashboard`; 
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 30px', background: 'white', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
      
      {/* Brand / Logo */}
      <Link to="/" style={{ textDecoration: 'none', color: '#d35400', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        🌐 Sanchari
      </Link>

      {/* Navigation Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500' }}>Home</Link>
        
        {user ? (
          <>
            {/* THE CLICKABLE PROFILE NAME (Role removed!) */}
            <Link 
              to={getDashboardRoute()} 
              style={{ textDecoration: 'none', color: '#d35400', fontWeight: 'bold', borderBottom: '2px solid transparent', transition: 'border 0.2s' }}
              onMouseOver={(e) => e.target.style.borderBottom = '2px solid #d35400'}
              onMouseOut={(e) => e.target.style.borderBottom = '2px solid transparent'}
            >
              {user.name || 'User'}
            </Link>
            
            {/* Logout Button */}
            <button 
              onClick={logout} 
              style={{ background: '#1e293b', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', transition: 'background 0.2s' }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: '#475569', fontWeight: '500' }}>Login</Link>
            <Link to="/signup" style={{ background: '#d35400', color: 'white', textDecoration: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: 'bold' }}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}