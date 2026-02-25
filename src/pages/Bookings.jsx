import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Bookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      title: 'Taj Mahal: Sunset Architecture Tour',
      type: 'Heritage Site',
      guide: 'Rahul Sharma',
      date: '2026-10-25',
      time: '17:30',
      status: 'Upcoming'
    },
    {
      id: 2,
      title: 'Hidden Secrets of Ajanta Caves',
      type: 'Heritage Site',
      guide: 'Priya Patel',
      date: '2026-11-02',
      time: '10:00',
      status: 'Upcoming'
    },
    {
      id: 3,
      title: 'Hampi Heritage Walk',
      type: 'Heritage Site',
      guide: 'Amit Kumar',
      date: '2026-09-10',
      time: '16:00',
      status: 'Completed'
    }
  ]);

  // States for the custom booking modal
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newDestination, setNewDestination] = useState('');
  const [newLocationType, setNewLocationType] = useState('Village');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // Handle canceling an existing tour
  const handleCancel = (id) => {
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: 'Cancelled' } : b
    ));
  };

  // Handle adding a brand new custom trip
  const handleBookTrip = () => {
    if (!newDestination.trim() || !newDate || !newTime) return; // Prevent empty submissions

    const newBooking = {
      id: Date.now(),
      title: `${newDestination} Exploration`,
      type: newLocationType,
      guide: 'Local Expert (Auto-Assigned)', // Fake auto-assignment for realism
      date: newDate,
      time: newTime,
      status: 'Upcoming'
    };

    // Add to the top of the bookings list
    setBookings([newBooking, ...bookings]);

    // Reset form and close modal
    setNewDestination('');
    setNewLocationType('Village');
    setNewDate('');
    setNewTime('');
    setIsBookingModalOpen(false);
  };

  // Helper to format 24h time to 12h AM/PM for display
  const formatTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':');
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minutes} ${ampm}`;
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh', position: 'relative' }}>
      <Link to="/enthusiast-dashboard" style={{ color: '#d35400', textDecoration: 'none', fontWeight: 'bold', marginBottom: '20px', display: 'inline-block' }}>
        ← Back to Dashboard
      </Link>

      {/* Header section with the new Book button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
        <div>
          <h1 style={{ color: '#1e3a8a', fontSize: '2.5rem', marginBottom: '10px' }}>My Bookings 🎟️</h1>
          <p style={{ color: '#475569', fontSize: '1.1rem', margin: 0 }}>Manage your upcoming virtual heritage tours and custom trips.</p>
        </div>
        <button 
          onClick={() => setIsBookingModalOpen(true)}
          style={{ background: '#22c55e', color: 'white', border: 'none', padding: '12px 25px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '15px', transition: 'transform 0.1s', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.3)' }}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          + Book Custom Trip
        </button>
      </div>

      {/* Bookings List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {bookings.map((booking) => (
          <div key={booking.id} style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderLeft: `5px solid ${booking.status === 'Upcoming' ? '#3b82f6' : booking.status === 'Completed' ? '#22c55e' : '#ef4444'}` }}>
            
            <div style={{ flex: '1 1 60%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#0f172a' }}>{booking.title}</h3>
                <span style={{ background: '#f1f5f9', color: '#475569', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>{booking.type}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', color: '#64748b', fontSize: '0.95rem', marginBottom: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={16} /> {booking.date}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Clock size={16} /> {booking.time.includes('AM') || booking.time.includes('PM') ? booking.time : formatTime(booking.time)}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><User size={16} /> {booking.guide}</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '150px', textAlign: 'center' }}>
              <span style={{ fontWeight: 'bold', padding: '8px 15px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                background: booking.status === 'Upcoming' ? '#dbeafe' : booking.status === 'Completed' ? '#dcfce7' : '#fee2e2',
                color: booking.status === 'Upcoming' ? '#1e40af' : booking.status === 'Completed' ? '#166534' : '#991b1b'
              }}>
                {booking.status === 'Upcoming' && <Clock size={16} />}
                {booking.status === 'Completed' && <CheckCircle size={16} />}
                {booking.status === 'Cancelled' && <XCircle size={16} />}
                {booking.status}
              </span>

              {booking.status === 'Upcoming' && (
                <button 
                  onClick={() => handleCancel(booking.id)}
                  style={{ background: 'transparent', color: '#ef4444', border: '1px solid #ef4444', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
                >
                  Cancel Tour
                </button>
              )}
            </div>

          </div>
        ))}
        
        {bookings.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', background: 'white', borderRadius: '12px', color: '#64748b' }}>
            No bookings found. Click "Book Custom Trip" to get started!
          </div>
        )}
      </div>

      {/* 🌟 PREMIUM LIQUID GLASS MODAL: BOOK CUSTOM TRIP 🌟 */}
      {isBookingModalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.8) 100%)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.8)', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', position: 'relative', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)' }}>
            
            <button onClick={() => setIsBookingModalOpen(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#64748b' }}>✖</button>
            
            <h2 style={{ margin: '0 0 5px 0', color: '#0f172a', fontSize: '1.8rem' }}>Book Custom Trip 🗺️</h2>
            <p style={{ color: '#64748b', marginBottom: '25px' }}>Plan a tour to any specific village, town, or city in India.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Destination Name</label>
                <input 
                  type="text" 
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="E.g., Mawlynnong, Gokarna, Varanasi..." 
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Location Type</label>
                <select 
                  value={newLocationType}
                  onChange={(e) => setNewLocationType(e.target.value)}
                  style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', background: 'white', cursor: 'pointer', boxSizing: 'border-box' }}
                >
                  <option value="Village">Village</option>
                  <option value="Town">Town</option>
                  <option value="City">City</option>
                  <option value="Heritage Site">Heritage Site</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Date</label>
                  <input 
                    type="date" 
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', color: '#475569', marginBottom: '8px' }}>Time</label>
                  <input 
                    type="time" 
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    style={{ width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
                  />
                </div>
              </div>

              <button 
                onClick={handleBookTrip}
                style={{ width: '100%', background: '#22c55e', color: 'white', border: 'none', padding: '15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.1rem', marginTop: '10px', boxShadow: '0 4px 10px rgba(34, 197, 94, 0.2)' }}
              >
                Confirm Booking
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}