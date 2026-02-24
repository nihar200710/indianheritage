import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Users, Video, X, Shield, Camera, User } from 'lucide-react';

export default function Home() {
  const [isRolesModalOpen, setIsRolesModalOpen] = useState(false);

  return (
    <div style={{ width: '100%', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#fdfbf7' }}>
      
      <style>
        {`
          @keyframes fadeInDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          .animate-down { animation: fadeInDown 1.2s ease-out forwards; }
          .animate-up { animation: fadeInUp 1.2s ease-out forwards; animation-delay: 0.3s; opacity: 0; }
          .animate-btn { animation: fadeInUp 1.2s ease-out forwards; animation-delay: 0.6s; opacity: 0; }
          
          .hover-btn:hover { transform: translateY(-3px); box-shadow: 0 5px 15px rgba(211, 84, 0, 0.3); }
          .hover-card:hover { transform: translateY(-5px); border-color: #d35400; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        `}
      </style>

      {/* 1. HERO SECTION WITH BACKGROUND VIDEO */}
      <div style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: -2 }}>
          <source src="https://cdn.pixabay.com/video/2020/05/25/40140-424813583_large.mp4" type="video/mp4" />
        </video>

        {/* FIXED: Light frosted overlay guarantees dark text is ALWAYS readable, even if video loads */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(253, 251, 247, 0.85)', zIndex: -1 }}></div>

        <div style={{ textAlign: 'center', zIndex: 1, padding: '20px', maxWidth: '900px' }}>
          {/* FIXED: Text is now Deep Navy (#0f172a) so it shows up beautifully */}
          <h1 className="animate-down" style={{ fontSize: '4.5rem', fontWeight: '800', margin: '0 0 20px 0', textShadow: '0 2px 5px rgba(0,0,0,0.05)', letterSpacing: '2px', color: '#0f172a' }}>
            Discover India's Soul
          </h1>
          <p className="animate-up" style={{ fontSize: '1.4rem', marginBottom: '40px', lineHeight: '1.6', color: '#475569' }}>
            Experience the magic of heritage sites through AI-driven insights, live virtual tours, and expert local guides. Step into history from anywhere.
          </p>
          
          <div className="animate-btn" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/explore" className="hover-btn" style={{ background: '#d35400', color: 'white', padding: '15px 35px', borderRadius: '30px', textDecoration: 'none', fontSize: '1.2rem', fontWeight: 'bold', transition: 'all 0.3s' }}>
              Start Exploring
            </Link>
            
            {/* FIXED: Secondary button is now Saffron outline so it doesn't vanish */}
            <button 
              onClick={() => setIsRolesModalOpen(true)}
              className="hover-btn" 
              style={{ background: 'transparent', border: '2px solid #d35400', color: '#d35400', padding: '15px 35px', borderRadius: '30px', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold', transition: 'all 0.3s' }}
            >
              View Platform Roles
            </button>
          </div>
        </div>
      </div>

      {/* 2. QUICK FEATURES SECTION */}
      <div style={{ padding: '100px 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#0f172a', marginBottom: '50px' }}>Why Choose Our Platform?</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          
          <div className="hover-card" style={{ padding: '40px 30px', background: '#ffffff', borderRadius: '15px', border: '1px solid #e2e8f0', transition: 'all 0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <Compass size={48} color="#d35400" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#0f172a' }}>AI Heritage Tours</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>Use our Gemini-powered AI engine to generate rich historical data and dynamic maps for any monument in India instantly.</p>
          </div>
          
          <div className="hover-card" style={{ padding: '40px 30px', background: '#ffffff', borderRadius: '15px', border: '1px solid #e2e8f0', transition: 'all 0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <Video size={48} color="#d35400" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#0f172a' }}>Live Virtual Streaming</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>Join official guides live from the monuments. Ask questions in real-time and experience the architecture as if you were there.</p>
          </div>
          
          <div className="hover-card" style={{ padding: '40px 30px', background: '#ffffff', borderRadius: '15px', border: '1px solid #e2e8f0', transition: 'all 0.3s', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
            <Users size={48} color="#d35400" style={{ marginBottom: '20px' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#0f172a' }}>Role-Based Access</h3>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>Whether you are a Creator, an Enthusiast, a Guide, or an Admin, get a personalized dashboard tailored to your specific needs.</p>
          </div>

        </div>
      </div>

      {/* --- ROLES MODAL --- */}
      {isRolesModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          
          <div style={{ background: '#ffffff', borderRadius: '15px', border: '1px solid #e2e8f0', maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            
            <button onClick={() => setIsRolesModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#0f172a'} onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}>
              <X size={32} />
            </button>

            <h2 style={{ fontSize: '2.5rem', color: '#d35400', margin: '0 0 10px 0', textAlign: 'center' }}>Platform Roles & Access</h2>
            <p style={{ color: '#475569', textAlign: 'center', marginBottom: '40px', fontSize: '1.1rem' }}>Our ecosystem is built on 4 distinct user roles, each with unique privileges.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
              
              <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <Shield size={28} color="#ef4444" style={{ marginRight: '15px' }} />
                  <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>Administrator</h3>
                </div>
                <ul style={{ color: '#475569', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                  <li>Platform oversight and content moderation.</li>
                  <li>Verify and approve official Tour Guides.</li>
                  <li>Manage user disputes and platform health.</li>
                  <li>Access to global analytics dashboard.</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', borderLeft: '4px solid #d35400' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <Compass size={28} color="#d35400" style={{ marginRight: '15px' }} />
                  <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>Official Guide</h3>
                </div>
                <ul style={{ color: '#475569', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                  <li>Verified local historians and experts.</li>
                  <li>Schedule and host live virtual video tours.</li>
                  <li>Answer real-time Q&A from users.</li>
                  <li>Monetize cultural expertise through bookings.</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', borderLeft: '4px solid #8b5cf6' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <Camera size={28} color="#8b5cf6" style={{ marginRight: '15px' }} />
                  <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>Content Creator</h3>
                </div>
                <ul style={{ color: '#475569', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                  <li>Upload high-quality heritage photographs.</li>
                  <li>Publish detailed travel blogs and articles.</li>
                  <li>Share engaging video content and reels.</li>
                  <li>Build a following of cultural enthusiasts.</li>
                </ul>
              </div>

              <div style={{ background: '#f8fafc', padding: '25px', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
                  <User size={28} color="#3b82f6" style={{ marginRight: '15px' }} />
                  <h3 style={{ margin: 0, color: '#0f172a', fontSize: '1.5rem' }}>Heritage Enthusiast</h3>
                </div>
                <ul style={{ color: '#475569', lineHeight: '1.8', margin: 0, paddingLeft: '20px' }}>
                  <li>Search monuments using the AI Database.</li>
                  <li>Join live virtual tours with official guides.</li>
                  <li>Interact with Creator content (like/comment).</li>
                  <li>Save favorite locations to a personal itinerary.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}