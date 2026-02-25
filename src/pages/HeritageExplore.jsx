import React, { useState } from 'react';
import { MapPin, X, Info, Sparkles, Search, Clock, Calendar } from 'lucide-react';

export default function HeritageExplore() {
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

  const [selectedMonument, setSelectedMonument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // States for the new glassmorphism action modals
  const [activeActionModal, setActiveActionModal] = useState(null); // 'join' or 'connect'
  const [messageSent, setMessageSent] = useState(false);

  // Initial data without images
  const [monuments, setMonuments] = useState([
    { 
      id: 1, name: "Taj Mahal", location: "Agra, Uttar Pradesh", 
      desc: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.",
      history: "Commissioned in 1632, the Taj Mahal took over 20 years to build and employed roughly 20,000 artisans.",
      architecture: "It features perfect symmetrical planning, a massive white marble dome, and intricate pietra dura using semi-precious stones.",
      mapQuery: "Taj Mahal, Agra, India",
      guide: "Rahul Sharma"
    },
    { 
      id: 2, name: "Hampi Monuments", location: "Vijayanagara, Karnataka", 
      desc: "The grandiose site of Hampi was the last capital of the last great Hindu Kingdom of Vijayanagar.",
      history: "Founded in the 14th century, Hampi was a prosperous, wealthy, and grand city. By 1500 CE, it was the world's second-largest medieval-era city after Beijing.",
      architecture: "Famous for its large-scale Dravidian architecture, particularly the Virupaksha Temple and the iconic Stone Chariot.",
      mapQuery: "Hampi, Karnataka, India",
      guide: "Priya Patel"
    },
    { 
      id: 3, name: "Konark Sun Temple", location: "Konark, Odisha", 
      desc: "On the shores of the Bay of Bengal, the temple at Konarak is a monumental representation of the sun god Surya's chariot, featuring 24 intricately carved wheels.",
      history: "Built in the 13th century by King Narasimhadeva I of the Eastern Ganga dynasty. It was called the 'Black Pagoda' by European sailors.",
      architecture: "Designed as a massive chariot drawn by seven majestic horses. The wheels act as sundials, which can be used to calculate time to the exact minute.",
      mapQuery: "Konark Sun Temple, Odisha, India",
      guide: "Amit Kumar"
    },
    { 
      id: 4, name: "Ajanta Caves", location: "Aurangabad, Maharashtra", 
      desc: "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.",
      history: "Abandoned and forgotten for centuries, these caves were accidentally rediscovered in 1819 by a British officer named John Smith during a tiger hunting expedition.",
      architecture: "Entirely carved out of the solid rock of a horseshoe-shaped cliff. The caves include sanctuaries and monasteries adorned with expressive mural paintings.",
      mapQuery: "Ajanta Caves, Maharashtra, India",
      guide: "Neha Gupta"
    }
  ]);

  const handleAISearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setErrorMsg('');
    setIsGenerating(true);

    try {
      if (!GEMINI_API_KEY) throw new Error("API Key is missing from .env file!");

      const cleanSearch = searchQuery.trim().replace(/[^a-zA-Z0-9 ]/g, "");
      const prompt = `Act as an expert Indian Heritage Tour Guide. Provide accurate information about the Indian heritage site or city: "${cleanSearch}". 
      Format your response EXACTLY like this with no other text:
      DESC: [Provide a 2-sentence overview]
      HISTORY: [Provide a 2-sentence history]
      ARCH: [Provide 2 sentences about its architecture or layout]`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error.message);

      const aiText = data.candidates[0].content.parts[0].text;
      const descMatch = aiText.match(/DESC:\s*(.*)/i);
      const historyMatch = aiText.match(/HISTORY:\s*(.*)/i);
      const archMatch = aiText.match(/ARCH:\s*(.*)/i);

      const finalDesc = descMatch ? descMatch[1] : `A famous heritage location in India.`;
      const finalHistory = historyMatch ? historyMatch[1] : `Has a rich and deep historical significance.`;
      const finalArch = archMatch ? archMatch[1] : `Features classic Indian architectural styles.`;

      const newMonument = {
        id: Date.now(),
        name: searchQuery.toUpperCase(),
        location: "Verified by AI Database",
        desc: `✨ ${finalDesc}`,
        history: `✨ ${finalHistory}`,
        architecture: `✨ ${finalArch}`,
        mapQuery: `${cleanSearch}, India`,
        guide: "AI Virtual Guide"
      };

      setMonuments([newMonument, ...monuments]);
      setSelectedMonument(newMonument);
      setSearchQuery(''); 

    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Failed to generate AI Tour. Check console.");
    } finally {
      setIsGenerating(false);
    }
  };

  const openActionModal = (type, e) => {
    e.stopPropagation(); 
    setActiveActionModal(type);
    setMessageSent(false);
  };

  return (
    <div className="container" style={{ position: 'relative' }}>
      
      {/* HEADER & AI SEARCH BAR */}
      <div style={{ margin: '30px 0', background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color: '#d35400', margin: '0 0 10px 0' }}>Explore Heritage 🇮🇳</h1>
        <p style={{ color: '#666', marginBottom: '20px' }}>Select a popular site or use AI to generate a detailed history for any Indian monument.</p>
        
        {errorMsg && <div style={{ color: 'red', marginBottom: '10px', background: '#ffe6e6', padding: '10px', borderRadius: '5px', fontWeight: 'bold' }}>{errorMsg}</div>}

        <form onSubmit={handleAISearch} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ flex: 1, minWidth: '250px', display: 'flex', alignItems: 'center', border: '2px solid #ddd', borderRadius: '8px', padding: '0 15px', background: '#fdfbf7' }}>
            <Search size={20} color="#888" />
            <input 
              type="text" 
              placeholder="E.g., Charminar, Red Fort, Mysore Palace, Golden Temple..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '15px 10px', border: 'none', outline: 'none', background: 'transparent', fontSize: '1rem' }}
            />
          </div>
          <button type="submit" disabled={isGenerating} className="btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: isGenerating ? '#aaa' : '#8e44ad', fontSize: '1rem', padding: '15px 25px' }}>
            {isGenerating ? 'Analyzing with AI...' : <><Sparkles size={20} /> Generate AI Data</>}
          </button>
        </form>
      </div>

      {/* GRID */}
      <div className="grid-4">
        {monuments.map((m) => (
          <div key={m.id} className="card" style={{ padding: '25px', textAlign: 'left', display: 'flex', flexDirection: 'column', borderTop: '4px solid #d35400' }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.4rem' }}>{m.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: '0.9rem', marginBottom: '15px' }}>
                <MapPin size={16} style={{ marginRight: '5px' }} />
                {m.location}
              </div>
              <p style={{ fontSize: '1rem', color: '#555', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                {m.desc}
              </p>
              <button 
                onClick={() => setSelectedMonument(m)} 
                className="btn" 
                style={{ width: '100%', marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Info size={18} /> View Full Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🌟 UPGRADED PREMIUM LIQUID GLASS MODAL: MAIN MONUMENT DETAILS 🌟 */}
      {selectedMonument && (
        <div onClick={() => setSelectedMonument(null)} style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}>
          
          {/* Main Glass Card */}
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            
            <button onClick={() => setSelectedMonument(null)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, transition: 'background 0.2s' }} onMouseOver={(e)=>e.currentTarget.style.background='rgba(239, 68, 68, 0.2)'} onMouseOut={(e)=>e.currentTarget.style.background='rgba(239, 68, 68, 0.1)'}>
              <X size={24} strokeWidth={2.5} />
            </button>
            
            <div style={{ padding: '40px' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#d35400', margin: '0 0 10px 0' }}>{selectedMonument.name}</h2>
              <div style={{ display: 'flex', gap: '20px', color: '#475569', fontSize: '1rem', marginBottom: '30px', flexWrap: 'wrap', fontWeight: '500' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}><MapPin size={18} style={{ marginRight: '5px' }} /> {selectedMonument.location}</span>
                <span style={{ display: 'flex', alignItems: 'center' }}><Clock size={18} style={{ marginRight: '5px' }} /> Virtual Tour Available</span>
                <span style={{ display: 'flex', alignItems: 'center' }}><Calendar size={18} style={{ marginRight: '5px' }} /> Open All Year</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                <div>
                  <h3 style={{ borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '10px', color: '#0f172a' }}>Overview</h3>
                  <p style={{ lineHeight: '1.8', color: '#334155', marginBottom: '25px', fontSize: '1.05rem' }}>{selectedMonument.desc}</p>
                  
                  <h3 style={{ borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '10px', color: '#0f172a' }}>Historical Significance</h3>
                  <p style={{ lineHeight: '1.8', color: '#334155', marginBottom: '25px', fontSize: '1.05rem' }}>{selectedMonument.history}</p>

                  <h3 style={{ borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '10px', color: '#0f172a' }}>Architecture & Design</h3>
                  <p style={{ lineHeight: '1.8', color: '#334155', marginBottom: '25px', fontSize: '1.05rem' }}>{selectedMonument.architecture}</p>
                </div>

                <div>
                  {/* Frosted Inner Container for Map */}
                  <div style={{ background: 'rgba(255, 255, 255, 0.5)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.6)', marginBottom: '20px', backdropFilter: 'blur(10px)' }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#0f172a' }}>Live Map Location</h3>
                    <div style={{ width: '100%', height: '250px', background: '#e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                      <iframe 
                        src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedMonument.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen="" 
                        loading="lazy" 
                        title="Google Maps Location">
                      </iframe>
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => openActionModal('join', e)} 
                    style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginBottom: '10px', cursor: 'pointer', background: '#ef4444', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' }}
                  >
                    ▶ Join Live Virtual Tour
                  </button>
                  <button 
                    onClick={(e) => openActionModal('connect', e)} 
                    style={{ width: '100%', padding: '15px', fontSize: '1.1rem', cursor: 'pointer', background: '#1e293b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(30, 41, 59, 0.3)' }}
                  >
                    💬 Connect with Tour Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 PREMIUM LIQUID GLASS MODAL: JOIN LIVE STREAM 🌟 */}
      {activeActionModal === 'join' && selectedMonument && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', padding: '20px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(25px)', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '24px', padding: '20px', width: '100%', maxWidth: '800px', position: 'relative', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)' }}>
            <button onClick={() => setActiveActionModal(null)} style={{ position: 'absolute', top: '-40px', right: '0', background: 'transparent', border: 'none', fontSize: '2rem', cursor: 'pointer', color: 'white' }}>✖</button>
            
            <div style={{ background: '#000', height: '400px', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'white' }}>
              <div style={{ fontSize: '4rem', animation: 'pulse 2s infinite' }}>🔴</div>
              <h2 style={{ marginTop: '20px', textAlign: 'center' }}>Connecting to Live Stream...</h2>
              <p style={{ color: '#94a3b8', textAlign: 'center' }}>{selectedMonument.name} with {selectedMonument.guide}</p>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 PREMIUM LIQUID GLASS MODAL: CONNECT WITH GUIDE 🌟 */}
      {activeActionModal === 'connect' && selectedMonument && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.7) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '500px', position: 'relative', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            <button onClick={() => setActiveActionModal(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✖</button>
            
            <h2 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.8rem' }}>Contact Guide 💬</h2>
            <p style={{ color: '#64748b', marginBottom: '25px' }}>Send a direct message to <strong>{selectedMonument.guide}</strong>.</p>
            
            {!messageSent ? (
              <>
                <textarea 
                  placeholder={`Ask ${selectedMonument.guide} a question about the ${selectedMonument.name}...`}
                  style={{ width: '100%', height: '120px', padding: '15px', borderRadius: '10px', border: '1px solid #cbd5e1', marginBottom: '20px', fontSize: '1rem', resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                ></textarea>
                <button 
                  onClick={() => setMessageSent(true)}
                  style={{ width: '100%', background: '#3b82f6', color: 'white', border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' }}
                >
                  Send Message
                </button>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '10px' }}>✅</div>
                <h3 style={{ color: '#166534', margin: '0' }}>Message Sent!</h3>
                <p style={{ color: '#64748b', marginTop: '10px' }}>{selectedMonument.guide} will reply to your registered email.</p>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>

    </div>
  );
}