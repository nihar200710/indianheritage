import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoleSelection from './pages/RoleSelection';
import HeritageExplore from './pages/HeritageExplore';
import Bookings from './pages/Bookings';
import DiscussForum from './pages/DiscussForum';


// Import the 4 Dashboards
import AdminDashboard from './pages/AdminDashboard';
import EnthusiastDashboard from './pages/EnthusiastDashboard';
import CreatorDashboard from './pages/CreatorDashboard';
import GuideDashboard from './pages/GuideDashboard';

// Import the 3 New Admin Sub-Pages
import VerifyGuides from './pages/VerifyGuides';
import ApproveContent from './pages/ApproveContent';
import UserReports from './pages/UserReports';

import { AuthProvider, useAuth } from './context/AuthContext';

// Protected Route Component: Logic to check if user is logged in & has correct role
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  // 1. If not logged in, go to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // 2. If logged in but wrong role, show error
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="container" style={{textAlign: 'center', marginTop: '50px'}}>
        <h2 style={{color: 'red'}}>Access Denied 🚫</h2>
        <p>You do not have permission to view this page.</p>
        <p>Your Role: <strong>{user.role}</strong></p>
      </div>
    );
  }

  // 3. If all good, show the page
  return children;
};

// Navbar needs access to Auth, so we wrap it
const Navigation = () => {
  const { user, logout } = useAuth();
  // Pass user and logout function to Navbar so it can show "Welcome User" or "Logout"
  return <Navbar user={user} logout={logout} />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* Main Wrapper with full width fix */}
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          <Navigation />
          
          <div style={{ flex: 1, width: '100%' }}>
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Home />} />
              <Route path="/roles" element={<RoleSelection />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* --- Role-Based Protected Routes --- */}

              {/* 1. Admin Dashboard (Only Admin) */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* --- NEW: Admin Sub-Pages (Only Admin) --- */}
              <Route path="/verify-guides" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <VerifyGuides />
                </ProtectedRoute>
              } />
              
              <Route path="/approve-content" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ApproveContent />
                </ProtectedRoute>
              } />
              
              <Route path="/user-reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <UserReports />
                </ProtectedRoute>
              } />
              {/* ----------------------------------------- */}

              {/* 2. Enthusiast Dashboard (Enthusiast & Admin) */}
              <Route path="/enthusiast-dashboard" element={
                <ProtectedRoute allowedRoles={['enthusiast', 'admin']}>
                  <EnthusiastDashboard />
                </ProtectedRoute>
              } />

              {/* Add this near your Enthusiast Dashboard route */}
<Route path="/bookings" element={
  <ProtectedRoute allowedRoles={['enthusiast', 'admin']}>
    <Bookings />
  </ProtectedRoute>
} />

{/* Add this near your HeritageExplore route so anyone can access it */}
<Route path="/forum" element={
  <ProtectedRoute allowedRoles={['enthusiast', 'admin', 'guide', 'creator']}>
    <DiscussForum />
  </ProtectedRoute>
} />
              {/* 3. Creator Dashboard (Creator & Admin) */}
              <Route path="/creator-dashboard" element={
                <ProtectedRoute allowedRoles={['creator', 'admin']}>
                  <CreatorDashboard />
                </ProtectedRoute>
              } />

              {/* 4. Guide Dashboard (Guide & Admin) */}
              <Route path="/guide-dashboard" element={
                <ProtectedRoute allowedRoles={['guide', 'admin']}>
                  <GuideDashboard />
                </ProtectedRoute>
              } />

              {/* Shared Feature: Explore Page (Accessible to Enthusiast, Admin & Guide) */}
              <Route path="/explore" element={
                <ProtectedRoute allowedRoles={['enthusiast', 'admin', 'guide']}>
                  <HeritageExplore />
                </ProtectedRoute>
              } />

            </Routes>
          </div>
          
          <footer style={{ textAlign: 'center', padding: '20px', background: '#eee', width: '100%' }}>
            &copy; 2026 Indian Heritage Project | FSAD-P05
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;