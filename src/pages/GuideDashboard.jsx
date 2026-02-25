import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Send, 
  Wallet, 
  Calendar, 
  MessageCircle, 
  CheckCircle, 
  Users, 
  ArrowUpRight 
} from 'lucide-react';

export default function GuideDashboard() {
  const { user } = useAuth();
  
  // States for Popup Logic
  const [activeQuery, setActiveQuery] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isSending, setIsSending] = useState(false);

  // 1. Upcoming Tours with Guest Details
  const [tours] = useState([
    { 
      id: 1, 
      name: "Taj Mahal Sunrise Walk", 
      time: "Tomorrow, 06:00 AM", 
      guests: [
        { name: "Rahul Sharma", country: "India" },
        { name: "John Doe", country: "USA" },
        { name: "Suki Tanaka", country: "Japan" }
      ]
    },
    {
      id: 2,
      name: "Hampi Ruins Exploration",
      time: "28 Feb, 10:00 AM",
      guests: [
        { name: "Anita Rao", country: "India" }
      ]
    }
  ]);

  // 2. Earnings with Transaction Details (By Customer Name)
  const [earnings] = useState({
    total: 12800,
    weekly: 4500,
    history: [
      { id: 1, customer: "Anjali Gupta", amount: 1500, date: "24 Feb" },
      { id: 2, customer: "Michael Smith", amount: 3000, date: "22 Feb" },
      { id: 3, customer: "Vikram Singh", amount: 1200, date: "20 Feb" }
    ]
  });

  // 3. User Queries State
  const [queries, setQueries] = useState([
    { id: 101, user: "Amit", text: "Is the Taj Mahal tour wheelchair accessible?", status: "Pending" },
    { id: 102, user: "Sarah", text: "Can we record the live session?", status: "Pending" }
  ]);

  // Function to handle reply sending logic
  const handleSendReply = () => {
    setIsSending(true);
    // Simulate API delay
    setTimeout(() => {
      setQueries(queries.map(q => q.id === activeQuery.id ? { ...q, status: "Replied" } : q));
      setIsSending(false);
      setActiveQuery(null);
      setReplyText("");
    }, 1200);
  };

  return (
    <div className="container" style={{ padding: '30px', minHeight: '100vh', background: '#fdfbf7' }}>
      
      {/* Header - Only showing User Name as requested */}
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#d35400', fontSize: '2.4rem', margin: 0, fontWeight: '800' }}>Tour Guide Hub 🚩</h1>
        <p style={{ color: '#555', fontSize: '1.1rem', marginTop: '8px' }}>
          Welcome back, <strong>{user?.name}</strong>.
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid-4" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '25px' 
      }}>
        
        {/* --- CARD 1: UPCOMING TOURS & GUESTS --- */}
        <div className="card" style={whiteCardStyle}>
          <h3 style={headerStyle}><Calendar size={22} color="#d35400" /> Upcoming Tours</h3>
          {tours.map(tour => (
            <div key={tour.id} style={itemBoxStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <strong style={{ fontSize: '1.05rem' }}>{tour.name}</strong>
              </div>
              <p style={{ fontSize: '13px', color: '#888', margin: '5px 0' }}>{tour.time}</p>
              
              <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#999', textTransform: 'uppercase' }}>Guests:</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                  {tour.guests.map((g, i) => (
                    <span key={i} style={guestBadgeStyle}>{g.name}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- CARD 2: USER QUERIES & REPLY --- */}
        <div className="card" style={whiteCardStyle}>
          <h3 style={headerStyle}><MessageCircle size={22} color="#d35400" /> User Queries</h3>
          <p style={{ color: 'red', fontWeight: 'bold', marginBottom: '15px' }}>
            {queries.filter(q => q.status === "Pending").length} New Inquiries
          </p>
          {queries.map(q => (
            <div key={q.id} style={itemBoxStyle}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '700' }}>{q.user}</span>
                {q.status === "Replied" && <CheckCircle size={18} color="#27ae60" />}
              </div>
              <p style={{ fontSize: '14px', color: '#444', margin: '10px 0', lineHeight: '1.4' }}>"{q.text}"</p>
              {q.status === "Pending" && (
                <button onClick={() => setActiveQuery(q)} style={replyLinkStyle}>Reply to Message</button>
              )}
            </div>
          ))}
        </div>

        {/* --- CARD 3: EARNINGS & TRANSACTIONS --- */}
        <div className="card" style={whiteCardStyle}>
          <h3 style={headerStyle}><Wallet size={22} color="#d35400" /> Earnings Hub</h3>
          <div style={statsContainerStyle}>
            <div>
              <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Total Balance</p>
              <h2 style={{ margin: 0, color: '#2c3e50' }}>₹{earnings.total}</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#888' }}>Weekly</p>
              <h2 style={{ margin: 0, color: '#27ae60' }}>₹{earnings.weekly}</h2>
            </div>
          </div>
          
          <div style={{ marginTop: '20px' }}>
            <p style={{ fontSize: '12px', fontWeight: 'bold', color: '#aaa', marginBottom: '10px' }}>RECENT PAYMENTS</p>
            {earnings.history.map(txn => (
              <div key={txn.id} style={transactionRowStyle}>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{txn.customer}</div>
                  <div style={{ fontSize: '11px', color: '#bbb' }}>{txn.date}</div>
                </div>
                <div style={{ fontWeight: 'bold', color: '#27ae60' }}>+₹{txn.amount}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 🌟 LIQUID GLASS REPLY POPUP (Heritage Theme) 🌟 */}
      {activeQuery && (
        <div style={overlayStyle}>
          <div style={glassModalStyle}>
            <button onClick={() => setActiveQuery(null)} style={closeBtnStyle}><X size={24} /></button>
            
            <h2 style={{ color: '#d35400', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Send size={26} /> Send Reply
            </h2>

            <div style={{ marginBottom: '25px' }}>
              <p style={{ color: '#1e293b', fontWeight: 'bold', marginBottom: '8px' }}>
                Responding to {activeQuery.user}:
              </p>
              <div style={questionBoxStyle}>
                "{activeQuery.text}"
              </div>
            </div>

            <textarea 
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your professional guide response here..."
              style={glassTextareaStyle}
            />

            <button 
              onClick={handleSendReply}
              disabled={isSending || !replyText}
              style={{ 
                ...sendBtnStyle, 
                background: isSending ? '#aaa' : '#d35400',
                opacity: !replyText ? 0.7 : 1
              }}
            >
              {isSending ? "Sending..." : "Send Message"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Styles ---

const whiteCardStyle = {
  background: '#fff',
  padding: '25px',
  borderRadius: '16px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
  borderTop: '6px solid #d35400',
  height: 'fit-content'
};

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  margin: '0 0 20px 0',
  fontSize: '1.3rem',
  color: '#2c3e50'
};

const itemBoxStyle = {
  padding: '15px 0',
  borderBottom: '1px solid #f5f5f5'
};

const guestBadgeStyle = {
  background: '#fff7ed',
  color: '#c2410c',
  padding: '4px 12px',
  borderRadius: '20px',
  fontSize: '12px',
  fontWeight: '600',
  border: '1px solid #ffedd5'
};

const replyLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#d35400',
  textDecoration: 'underline',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: '700',
  padding: 0,
  marginTop: '5px'
};

const statsContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  background: '#f9fafb',
  padding: '15px',
  borderRadius: '12px',
  border: '1px solid #f3f4f6'
};

const transactionRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '10px 0',
  borderBottom: '1px dashed #eee'
};

const overlayStyle = {
  position: 'fixed',
  inset: 0,
  zIndex: 10000,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: 'rgba(15, 23, 42, 0.45)',
  backdropFilter: 'blur(12px)'
};

const glassModalStyle = {
  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.9) 100%)',
  backdropFilter: 'blur(20px)',
  border: '1px solid #fff',
  borderRadius: '28px',
  padding: '40px',
  width: '100%',
  maxWidth: '520px',
  position: 'relative',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
};

const questionBoxStyle = {
  background: 'rgba(211, 84, 0, 0.04)',
  padding: '18px',
  borderRadius: '14px',
  borderLeft: '5px solid #d35400',
  fontStyle: 'italic',
  color: '#475569',
  fontSize: '14px',
  lineHeight: '1.6'
};

const glassTextareaStyle = {
  width: '100%',
  height: '140px',
  padding: '18px',
  borderRadius: '14px',
  border: '1px solid #e2e8f0',
  marginBottom: '20px',
  fontSize: '1rem',
  outline: 'none',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
  color: '#0f172a',
  background: '#fff'
};

const sendBtnStyle = {
  width: '100%',
  color: 'white',
  border: 'none',
  padding: '16px',
  borderRadius: '12px',
  cursor: 'pointer',
  fontWeight: '800',
  fontSize: '1.1rem',
  transition: 'all 0.3s',
  boxShadow: '0 10px 15px -3px rgba(211, 84, 0, 0.3)'
};

const closeBtnStyle = {
  position: 'absolute',
  top: '30px',
  right: '30px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#94a3b8'
};