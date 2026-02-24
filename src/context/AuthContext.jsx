import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Initial Mock Users
  const initialUsers = [
    { email: "admin@test.com", password: "123", role: "admin", name: "Super Admin" },
    { email: "enthusiast@test.com", password: "123", role: "enthusiast", name: "Rahul (Enthusiast)" },
    { email: "creator@test.com", password: "123", role: "creator", name: "Anita (Creator)" },
    { email: "guide@test.com", password: "123", role: "guide", name: "Ramesh (Guide)" }
  ];

  // Load from LocalStorage if available, otherwise use initialUsers
  const [allUsers, setAllUsers] = useState(() => {
    const saved = localStorage.getItem('appUsers');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  // Save to LocalStorage whenever we add a new user (Persistence)
  useEffect(() => {
    localStorage.setItem('appUsers', JSON.stringify(allUsers));
  }, [allUsers]);

  // 1. REGISTER FUNCTION (Adds new user to list)
  const register = (name, email, password, role) => {
    const exists = allUsers.find(u => u.email === email);
    if (exists) {
      return { success: false, message: "Email already exists!" };
    }

    const newUser = { name, email, password, role };
    setAllUsers([...allUsers, newUser]); // Add to fake DB
    return { success: true };
  };

  // 2. LOGIN FUNCTION
  const login = (email, password) => {
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      // Redirect based on role
      switch(foundUser.role) {
        case 'admin': navigate('/admin-dashboard'); break;
        case 'enthusiast': navigate('/enthusiast-dashboard'); break;
        case 'creator': navigate('/creator-dashboard'); break;
        case 'guide': navigate('/guide-dashboard'); break;
        default: navigate('/');
      }
      return { success: true };
    } else {
      return { success: false, message: "Invalid credentials" };
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