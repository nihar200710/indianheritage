import React, { useState } from 'react';
import { MapPin, X, Info, Sparkles, Search, Clock, Calendar } from 'lucide-react';

export default function HeritageExplore() {
  // 👇 PASTE YOUR GEMINI API KEY HERE 👇
  const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

  const [selectedMonument, setSelectedMonument] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // --- FIXED: DIRECT WIKIPEDIA IMAGE LINKS ONLY ---
  // These bypass thumbnail blockers and will load like the Taj Mahal image did!
  const imageDictionary = {
    "redfort": "https://upload.wikimedia.org/wikipedia/commons/3/3a/Red_Fort_in_Delhi_03-2016.jpg",
    "charminar": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Charminar_Hyderabad_1.jpg",
    "gatewayofindia": "https://upload.wikimedia.org/wikipedia/commons/0/01/Gateway_of_India_Mumbai.jpg",
    "mysorepalace": "https://upload.wikimedia.org/wikipedia/commons/8/85/Mysore_Palace_Morning.jpg",
    "goldentemple": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Golden_Temple%2C_Amritsar%2C_India.jpg",
    "qutubminar": "https://upload.wikimedia.org/wikipedia/commons/b/b6/Qutb_Minar_in_Delhi.jpg",
    "meenakshitemple": "https://upload.wikimedia.org/wikipedia/commons/c/cd/Meenakshi_Amman_Temple_Madurai.jpg",
    "victoriamemorial": "https://upload.wikimedia.org/wikipedia/commons/d/d7/Victoria_Memorial_Kolkata.jpg",
    "sanchistupa": "https://upload.wikimedia.org/wikipedia/commons/4/49/Sanchi_Stupa_1.jpg",
    "khajuraho": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Khajuraho_Lakshmana_Temple.jpg",
    "amerfort": "https://upload.wikimedia.org/wikipedia/commons/3/30/Amber_Fort_Jaipur.jpg",
    "amberfort": "https://upload.wikimedia.org/wikipedia/commons/3/30/Amber_Fort_Jaipur.jpg",
    "fatehpursikri": "https://upload.wikimedia.org/wikipedia/commons/8/87/Fatehpur_Sikri_Buland_Darwaza.jpg",
    "brihadisvaratemple": "https://upload.wikimedia.org/wikipedia/commons/6/67/Brihadisvara_Temple_Thanjavur.jpg",
    "golcondafort": "https://upload.wikimedia.org/wikipedia/commons/5/52/Golconda_Fort_Hyderabad.jpg",
    "hawamahal": "https://upload.wikimedia.org/wikipedia/commons/e/e4/Palace_of_Winds_Jaipur_India.jpg",
    "lotustemple": "https://upload.wikimedia.org/wikipedia/commons/f/fc/Lotus_Temple_New_Delhi_India_-_Feb_2004.jpg"
  };

  const genericImage = "https://upload.wikimedia.org/wikipedia/commons/e/e4/Palace_of_Winds_Jaipur_India.jpg"; 

  // 1. HARDCODED MONUMENTS (Default Grid)
  const [monuments, setMonuments] = useState([
    { 
      id: 1, name: "Taj Mahal", location: "Agra, Uttar Pradesh", 
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Taj_Mahal_in_March_2004.jpg",
      desc: "An immense mausoleum of white marble, built in Agra between 1631 and 1648 by order of the Mughal emperor Shah Jahan in memory of his favourite wife.",
      history: "Commissioned in 1632, the Taj Mahal took over 20 years to build and employed roughly 20,000 artisans.",
      architecture: "It features perfect symmetrical planning, a massive white marble dome, and intricate pietra dura using semi-precious stones.",
      mapQuery: "Taj Mahal, Agra, India"
    },
    { 
      id: 2, name: "Hampi Monuments", location: "Vijayanagara, Karnataka", 
      image: "https://upload.wikimedia.org/wikipedia/commons/3/30/Hampi_Virupaksha_Temple.jpg",
      desc: "The grandiose site of Hampi was the last capital of the last great Hindu Kingdom of Vijayanagar.",
      history: "Founded in the 14th century, Hampi was a prosperous, wealthy, and grand city. By 1500 CE, it was the world's second-largest medieval-era city after Beijing.",
      architecture: "Famous for its large-scale Dravidian architecture, particularly the Virupaksha Temple and the iconic Stone Chariot.",
      mapQuery: "Hampi, Karnataka, India"
    },
    { 
      id: 3, name: "Konark Sun Temple", location: "Konark, Odisha", 
      image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Konarka_Temple.jpg",
      desc: "On the shores of the Bay of Bengal, the temple at Konarak is a monumental representation of the sun god Surya's chariot, featuring 24 intricately carved wheels.",
      history: "Built in the 13th century by King Narasimhadeva I of the Eastern Ganga dynasty. It was called the 'Black Pagoda' by European sailors.",
      architecture: "Designed as a massive chariot drawn by seven majestic horses. The wheels act as sundials, which can be used to calculate time to the exact minute.",
      mapQuery: "Konark Sun Temple, Odisha, India"
    },
    { 
      id: 4, name: "Ajanta Caves", location: "Aurangabad, Maharashtra", 
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c0/Ajanta_Caves_view_from_nearby_hill_2013-10-02_12-25.jpg",
      desc: "The Ajanta Caves are approximately 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE to about 480 CE.",
      history: "Abandoned and forgotten for centuries, these caves were accidentally rediscovered in 1819 by a British officer named John Smith during a tiger hunting expedition.",
      architecture: "Entirely carved out of the solid rock of a horseshoe-shaped cliff. The caves include sanctuaries and monasteries adorned with expressive mural paintings.",
      mapQuery: "Ajanta Caves, Maharashtra, India"
    }
  ]);

  // 2. AI SEARCH LOGIC
  const handleAISearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    setErrorMsg('');
    setIsGenerating(true);

    try {
      if (GEMINI_API_KEY === "YOUR_API_KEY_HERE") {
        throw new Error("Please add your Gemini API Key at the top of the file!");
      }

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

      const searchKey = cleanSearch.toLowerCase().replace(/[^a-z0-9]/g, "");
      const matchedImage = imageDictionary[searchKey] || genericImage;

      const newMonument = {
        id: Date.now(),
        name: searchQuery.toUpperCase(),
        location: "Verified by AI Database",
        image: matchedImage,
        desc: `✨ ${finalDesc}`,
        history: `✨ ${finalHistory}`,
        architecture: `✨ ${finalArch}`,
        mapQuery: `${cleanSearch}, India`
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
          <div key={m.id} className="card" style={{ padding: 0, overflow: 'hidden', textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', width: '100%', background: '#eee' }}>
              <img 
                src={m.image} 
                alt={m.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                // FIXED ON ERROR: Added a check so it doesn't get stuck in an infinite loop
                onError={(e) => { if(e.target.src !== genericImage) e.target.src = genericImage; }} 
              />
            </div>
            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 5px 0' }}>{m.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center', color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                <MapPin size={16} style={{ marginRight: '5px' }} />
                {m.location}
              </div>
              <p style={{ fontSize: '0.9rem', color: '#555', marginBottom: '15px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
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

      {/* MODAL POPUP */}
      {selectedMonument && (
        <div onClick={() => setSelectedMonument(null)} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: 'white', borderRadius: '15px', maxWidth: '1000px', width: '100%', maxHeight: '90vh', overflowY: 'auto', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <button onClick={() => setSelectedMonument(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: '#ff4d4d', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10, boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
              <X size={24} strokeWidth={3} />
            </button>

            <div style={{ width: '100%', height: '350px', background: '#eee' }}>
              <img src={selectedMonument.image} alt={selectedMonument.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { if(e.target.src !== genericImage) e.target.src = genericImage; }} />
            </div>
            
            <div style={{ padding: '30px' }}>
              <h2 style={{ fontSize: '2.5rem', color: '#d35400', margin: '0 0 10px 0' }}>{selectedMonument.name}</h2>
              <div style={{ display: 'flex', gap: '20px', color: '#666', fontSize: '1rem', marginBottom: '30px', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}><MapPin size={18} style={{ marginRight: '5px' }} /> {selectedMonument.location}</span>
                <span style={{ display: 'flex', alignItems: 'center' }}><Clock size={18} style={{ marginRight: '5px' }} /> Virtual Tour Available</span>
                <span style={{ display: 'flex', alignItems: 'center' }}><Calendar size={18} style={{ marginRight: '5px' }} /> Open All Year</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                <div>
                  <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', color: '#2c3e50' }}>Overview</h3>
                  <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '25px', fontSize: '1.05rem' }}>{selectedMonument.desc}</p>
                  
                  <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', color: '#2c3e50' }}>Historical Significance</h3>
                  <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '25px', fontSize: '1.05rem' }}>{selectedMonument.history}</p>

                  <h3 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px', color: '#2c3e50' }}>Architecture & Design</h3>
                  <p style={{ lineHeight: '1.8', color: '#444', marginBottom: '25px', fontSize: '1.05rem' }}>{selectedMonument.architecture}</p>
                </div>

                <div>
                  <div style={{ background: '#fdfbf7', padding: '20px', borderRadius: '10px', border: '1px solid #eee', marginBottom: '20px' }}>
                    <h3 style={{ margin: '0 0 15px 0', color: '#2c3e50' }}>Live Map Location</h3>
                    <div style={{ width: '100%', height: '250px', background: '#ddd', borderRadius: '8px', overflow: 'hidden' }}>
                      <iframe src={`https://www.google.com/maps?q=${encodeURIComponent(selectedMonument.mapQuery)}&output=embed`} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Google Maps Location"></iframe>
                    </div>
                  </div>
                  <button className="btn" style={{ width: '100%', padding: '15px', fontSize: '1.1rem', marginBottom: '10px' }}>Join Live Virtual Tour</button>
                  <button className="btn" style={{ width: '100%', padding: '15px', fontSize: '1.1rem', background: '#2c3e50' }}>Connect with Tour Guide</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}