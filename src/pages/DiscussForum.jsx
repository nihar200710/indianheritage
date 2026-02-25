import React, { useState } from 'react';
import { MessageSquare, Users, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DiscussForum() {
  const [selectedThread, setSelectedThread] = useState(null);
  const [replyText, setReplyText] = useState('');
  
  // States for the "Create New Topic" modal
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [newTopicCategory, setNewTopicCategory] = useState('History');
  const [newTopicMessage, setNewTopicMessage] = useState('');

  const [threads, setThreads] = useState([
    {
      id: 1,
      title: "Best time of day to visit the Taj Mahal?",
      author: "TravelBug99",
      category: "Travel Advice",
      replies: 14,
      lastActive: "2 hours ago",
      conversation: [
        { user: "TravelBug99", msg: "I'm planning a virtual tour and a real visit later this year. Is sunrise or sunset better for photography?" },
        { user: "RahulGuide", msg: "Definitely sunrise! The marble changes color from pink to white as the sun comes up. It's magical and much less crowded." }
      ]
    },
    {
      id: 2,
      title: "Decoding the astronomical clocks of Konark Sun Temple",
      author: "HistoryNerd",
      category: "Architecture",
      replies: 8,
      lastActive: "1 day ago",
      conversation: [
        { user: "HistoryNerd", msg: "Does anyone know exactly how to read the stone wheels at Konark to tell the time?" },
        { user: "AnanyaReddy", msg: "Yes! The 8 major spokes represent the 8 pahars (3-hour periods) of the day. The shadow cast by the axle on the spokes tells you the exact minute!" }
      ]
    },
    {
      id: 3,
      title: "Is the Hampi stone chariot actually carved from a single rock?",
      author: "CuriousExplorer",
      category: "History",
      replies: 5,
      lastActive: "3 days ago",
      conversation: [
        { user: "CuriousExplorer", msg: "I've heard rumors that the famous chariot is monolithic. Is that true?" },
        { user: "PriyaPatel", msg: "Actually, it's an illusion! It is built from several giant granite blocks, but the joints are so perfectly carved and hidden that it looks like a single rock." }
      ]
    }
  ]);

  const handlePostReply = () => {
    if (!replyText.trim()) return;
    const updatedThreads = threads.map(t => {
      if (t.id === selectedThread.id) {
        const newConvo = [...t.conversation, { user: "You", msg: replyText }];
        return { ...t, conversation: newConvo, replies: t.replies + 1, lastActive: "Just now" };
      }
      return t;
    });
    setThreads(updatedThreads);
    setSelectedThread(updatedThreads.find(t => t.id === selectedThread.id));
    setReplyText('');
  };

  const handleCreateTopic = () => {
    if (!newTopicTitle.trim() || !newTopicMessage.trim()) return;
    
    const newThread = {
      id: Date.now(),
      title: newTopicTitle,
      author: "You", 
      category: newTopicCategory,
      replies: 0,
      lastActive: "Just now",
      conversation: [
        { user: "You", msg: newTopicMessage }
      ]
    };
    
    // Add the new thread to the top of the list
    setThreads([newThread, ...threads]);
    
    // Close the modal and reset the form
    setIsCreatingTopic(false);
    setNewTopicTitle('');
    setNewTopicMessage('');
    setNewTopicCategory('History');
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <Link to="/enthusiast-dashboard" style={{ color: '#d35400', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Dashboard
      </Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '10px' }}>Heritage Forums 🏛️</h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', margin: 0 }}>Discuss Indian history, architecture, and travel tips with the community.</p>
        </div>
        
        {/* NEW TOPIC BUTTON - NOW FUNCTIONAL! */}
        <button 
          onClick={() => setIsCreatingTopic(true)} 
          style={{ background: '#d35400', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '15px', transition: 'transform 0.1s' }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          + Start New Topic
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        {threads.map((thread) => (
          <div key={thread.id} onClick={() => setSelectedThread(thread)} style={{ padding: '25px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#f8fafc'} onMouseOut={(e) => e.currentTarget.style.background = 'white'}>
            
            <div style={{ flex: 1 }}>
              <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px', display: 'inline-block' }}>{thread.category}</span>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem', color: '#0f172a' }}>{thread.title}</h3>
              <div style={{ color: '#64748b', fontSize: '0.9rem', display: 'flex', gap: '15px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Users size={16} /> {thread.author}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} /> {thread.lastActive}</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ textAlign: 'center', color: '#64748b' }}>
                <MessageSquare size={20} style={{ margin: '0 auto 5px auto', display: 'block' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{thread.replies} Replies</span>
              </div>
              <ArrowRight color="#cbd5e1" />
            </div>

          </div>
        ))}
      </div>

      {/* 🌟 PREMIUM LIQUID GLASS MODAL: THREAD VIEW 🌟 */}
      {selectedThread && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', padding: '30px', width: '100%', maxWidth: '700px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            
            <button onClick={() => setSelectedThread(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✖</button>
            
            <h2 style={{ margin: '0 0 20px 0', color: '#0f172a', fontSize: '1.5rem', paddingRight: '30px' }}>{selectedThread.title}</h2>
            
            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '20px', paddingRight: '10px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {selectedThread.conversation.map((msg, idx) => (
                <div key={idx} style={{ background: msg.user === 'You' ? '#eff6ff' : 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', marginLeft: msg.user === 'You' ? '40px' : '0', marginRight: msg.user === 'You' ? '0' : '40px' }}>
                  <span style={{ fontWeight: 'bold', color: msg.user === 'You' ? '#3b82f6' : '#0f172a', fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>{msg.user}</span>
                  <p style={{ margin: 0, color: '#475569', lineHeight: '1.5' }}>{msg.msg}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="text" 
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..." 
                style={{ flex: 1, padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' }}
                onKeyDown={(e) => e.key === 'Enter' && handlePostReply()}
              />
              <button onClick={handlePostReply} style={{ background: '#3b82f6', color: 'white', border: 'none', padding: '0 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>
                Post
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🌟 PREMIUM LIQUID GLASS MODAL: CREATE NEW TOPIC 🌟 */}
      {isCreatingTopic && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            
            <button onClick={() => setIsCreatingTopic(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✖</button>
            
            <h2 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.8rem' }}>Start a New Topic 📝</h2>
            <p style={{ color: '#64748b', marginBottom: '25px' }}>Share your questions, ideas, or experiences with the community.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Topic Title</label>
                <input 
                  type="text" 
                  value={newTopicTitle}
                  onChange={(e) => setNewTopicTitle(e.target.value)}
                  placeholder="E.g., What are the hidden gems in Delhi?" 
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Category</label>
                <select 
                  value={newTopicCategory}
                  onChange={(e) => setNewTopicCategory(e.target.value)}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', background: 'white', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  <option value="History">History</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Travel Advice">Travel Advice</option>
                  <option value="Culture">Culture</option>
                  <option value="Virtual Tours">Virtual Tours</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>First Message</label>
                <textarea 
                  value={newTopicMessage}
                  onChange={(e) => setNewTopicMessage(e.target.value)}
                  placeholder="Write your message here..." 
                  style={{ width: '100%', height: '120px', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }}
                ></textarea>
              </div>

              <button 
                onClick={handleCreateTopic}
                style={{ width: '100%', background: '#d35400', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px', boxShadow: '0 4px 10px rgba(211, 84, 0, 0.2)' }}
              >
                Post Topic
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}