import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext(null);
const API_BASE = 'http://localhost:8080/api/auth';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  // 1. REGISTER FUNCTION
  const register = async (name, email, password, role) => {
    try {
      const response = await axios.post(`${API_BASE}/register`, { name, email, password, role });
      if (response.data.success && response.data.user) {
        const newUser = response.data.user;
        setUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        return { success: true, role: newUser.role };
      }
      return { success: true };
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        return { success: false, message: err.response.data.message };
      }
      return { success: false, message: "Registration failed due to server error." };
    }
  };

  // 2. LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, { email, password });
      
      if (response.data.success && response.data.user) {
        const foundUser = response.data.user;
        setUser(foundUser);
        
        switch(foundUser.role) {
          case 'admin': navigate('/admin-dashboard'); break;
          case 'enthusiast': navigate('/enthusiast-dashboard'); break;
          case 'creator': navigate('/creator-dashboard'); break;
          case 'guide': navigate('/guide-dashboard'); break;
          default: navigate('/');
        }
        return { success: true };
      }
      return { success: false, message: "Invalid credentials" };
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        return { success: false, message: err.response.data.message };
      }
      return { success: false, message: "Login failed due to server error." };
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);