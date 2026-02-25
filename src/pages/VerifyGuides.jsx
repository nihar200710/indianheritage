import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function VerifyGuides() {
  // 1. Create a dynamic state to hold our list of guides
  const [guides, setGuides] = useState([
    { id: 1, name: 'Rahul Sharma', specialization: 'Taj Mahal & Agra Fort', experience: '5 Years', status: 'Pending' },
    { id: 2, name: 'Priya Patel', specialization: 'Ajanta Caves', experience: '2 Years', status: 'Pending' },
    { id: 3, name: 'Amit Kumar', specialization: 'Hampi Monuments', experience: '8 Years', status: 'Pending' }
  ]);

  // 2. The function that handles the button clicks
  const handleAction = (id, newStatus) => {
    // This updates the specific guide's status and triggers a re-render
    setGuides(guides.map(guide => 
      guide.id === id ? { ...guide, status: newStatus } : guide
    ));
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/admin-dashboard" style={{ color: '#d35400', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Dashboard
      </Link>
      <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '10px' }}>Verify Guides 📋</h1>
      <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '40px' }}>Review and approve pending tour guide applications.</p>
      
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #eee', color: '#475569' }}>
              <th style={{ padding: '15px' }}>Applicant Name</th>
              <th style={{ padding: '15px' }}>Specialization</th>
              <th style={{ padding: '15px' }}>Experience</th>
              <th style={{ padding: '15px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* 3. Loop through the state array to generate the table rows dynamically */}
            {guides.map((guide) => (
              <tr key={guide.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px', fontWeight: 'bold' }}>{guide.name}</td>
                <td style={{ padding: '15px' }}>{guide.specialization}</td>
                <td style={{ padding: '15px' }}>{guide.experience}</td>
                <td style={{ padding: '15px' }}>
                  
                  {/* 4. Conditional Rendering: Show buttons IF pending, show text IF already clicked */}
                  {guide.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleAction(guide.id, 'Approved')} 
                        style={{ background: '#22c55e', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: 'transform 0.1s' }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(guide.id, 'Rejected')} 
                        style={{ background: '#ef4444', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', transition: 'transform 0.1s' }}
                        onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
                        onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ 
                      fontWeight: 'bold', 
                      padding: '6px 12px', 
                      borderRadius: '20px',
                      background: guide.status === 'Approved' ? '#dcfce7' : '#fee2e2',
                      color: guide.status === 'Approved' ? '#166534' : '#991b1b' 
                    }}>
                      {guide.status === 'Approved' ? 'Approved ✅' : 'Rejected ❌'}
                    </span>
                  )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Bonus: Show a message when all guides have been processed */}
        {guides.every(g => g.status !== 'Pending') && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#f8fafc', color: '#64748b', textAlign: 'center', borderRadius: '8px', fontWeight: '500' }}>
            All pending applications have been reviewed! 🎉
          </div>
        )}

      </div>
    </div>
  );
}