import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'enthusiast'
  });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(formData.name, formData.email, formData.password, formData.role);
    
    if (result.success) {
      alert("Account Created Successfully! Please Login.");
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fdfbf7', width: '100%', padding: '20px' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '30px', textAlign: 'left' }}>
        <h2 style={{ color: '#d35400', textAlign: 'center' }}>Create Account</h2>
        
        {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <label style={{fontWeight:'bold'}}>Full Name</label>
          <input 
            type="text" name="name" required placeholder="Enter your name"
            value={formData.name} onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '5px 0 15px', border:'1px solid #ccc', borderRadius:'5px' }} 
          />

          <label style={{fontWeight:'bold'}}>Email</label>
          <input 
            type="email" name="email" required placeholder="Enter email"
            value={formData.email} onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '5px 0 15px', border:'1px solid #ccc', borderRadius:'5px' }} 
          />

          <label style={{fontWeight:'bold'}}>Password</label>
          <input 
            type="password" name="password" required placeholder="Create password"
            value={formData.password} onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '5px 0 15px', border:'1px solid #ccc', borderRadius:'5px' }} 
          />

          <label style={{fontWeight:'bold'}}>Select Role</label>
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange}
            style={{ width: '100%', padding: '10px', margin: '5px 0 20px', border:'1px solid #ccc', borderRadius:'5px' }} 
          >
            <option value="enthusiast">Cultural Enthusiast</option>
            <option value="guide">Tour Guide</option>
            <option value="creator">Content Creator</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn" style={{ width: '100%' }}>Sign Up</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#d35400', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}