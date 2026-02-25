import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ApproveContent() {
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: 'The Hidden Secrets of Hampi', 
      author: 'Vikram Singh', 
      time: '2 hours ago', 
      category: 'History',
      excerpt: 'Discover the forgotten waterways and underground chambers of the Vijayanagara empire that most tourists completely miss. This article explores the newly excavated sites near the Vittala Temple complex.',
      status: 'Pending' 
    },
    { 
      id: 2, 
      title: 'Architectural Marvels of the Sun Temple', 
      author: 'Ananya Reddy', 
      time: '1 day ago', 
      category: 'Architecture',
      excerpt: 'A deep dive into the precise astronomical alignments built into the stone wheels of Konark. Learn how ancient architects calculated the exact movement of the sun to tell time down to the minute.',
      status: 'Pending' 
    },
    { 
      id: 3, 
      title: 'A Journey Through Ajanta Caves', 
      author: 'Neha Gupta', 
      time: '2 days ago', 
      category: 'Virtual Tour',
      excerpt: 'Exploring the ancient Buddhist rock-cut caves and the untold stories behind the intricate frescoes that have survived centuries of natural wear and tear.',
      status: 'Pending' 
    }
  ]);

  // State to control the popup modal
  const [selectedPost, setSelectedPost] = useState(null);

  const handleAction = (id, newStatus) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, status: newStatus } : post
    ));
    setSelectedPost(null); // Close modal after action
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh', position: 'relative' }}>
      <Link to="/admin-dashboard" style={{ color: '#d35400', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Dashboard
      </Link>
      <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '10px' }}>Approve Content 📝</h1>
      <p style={{ color: '#475569', fontSize: '1.1rem', marginBottom: '40px' }}>Review user-submitted heritage articles before they go live.</p>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {posts.map((post) => (
          <div key={post.id} style={{ background: 'white', padding: '25px 30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #f1f5f9' }}>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <h3 style={{ margin: '0', color: '#0f172a', fontSize: '1.3rem' }}>{post.title}</h3>
                <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>{post.category}</span>
              </div>
              <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem' }}>By <strong style={{color: '#64748b'}}>{post.author}</strong></p>
            </div>

            <div>
              {post.status === 'Pending' ? (
                <button 
                  onClick={() => setSelectedPost(post)} 
                  style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Review Matter
                </button>
              ) : (
                <span style={{ fontWeight: 'bold', padding: '10px 16px', borderRadius: '6px', background: post.status === 'Published' ? '#dcfce7' : '#fee2e2', color: post.status === 'Published' ? '#166534' : '#991b1b' }}>
                  {post.status === 'Published' ? 'Published 🌍' : 'Rejected ❌'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 PREMIUM LIQUID GLASS MODAL 🌟 */}
      {selectedPost && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}>
          
          {/* Glass Card */}
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.6) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)', borderRadius: '24px', padding: '40px', maxWidth: '600px', width: '90%', position: 'relative' }}>
            
            <button onClick={() => setSelectedPost(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✖</button>
            
            <span style={{ background: '#dbeafe', color: '#1e40af', padding: '6px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '15px', display: 'inline-block' }}>{selectedPost.category}</span>
            <h2 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '1.8rem' }}>{selectedPost.title}</h2>
            <p style={{ color: '#64748b', marginBottom: '25px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '15px' }}>Submitted by <strong>{selectedPost.author}</strong> • {selectedPost.time}</p>
            
            <p style={{ color: '#334155', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '35px' }}>
              "{selectedPost.excerpt}"
            </p>

            <div style={{ display: 'flex', gap: '15px' }}>
              <button onClick={() => handleAction(selectedPost.id, 'Published')} style={{ flex: 1, background: '#3b82f6', color: 'white', border: 'none', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}>Publish Content</button>
              <button onClick={() => handleAction(selectedPost.id, 'Rejected')} style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '2px solid #ef4444', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}