import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('recordsetu_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('recordsetu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('recordsetu_user');
    }
  }, [user]);

  const loginAsCitizen = (mobile, password) => {
    const userData = {
      id: "CITIZEN-98214",
      name: "Rajesh Kumar",
      mobile: mobile || "9876543210",
      email: "rajesh.kumar@example.com",
      role: "citizen",
      state: "Uttar Pradesh",
      district: "Lucknow",
      tehsil: "Lucknow Sadar",
      village: "Gomti Nagar",
      aadhaarLinked: true,
      lastLogin: new Date().toLocaleString('en-IN')
    };
    setUser(userData);
    return { success: true, user: userData };
  };

  const loginAsOfficial = (officialId, password) => {
    const userData = {
      id: officialId || "OFFICIAL001",
      name: "S. K. Srivastava",
      designation: "District Revenue Officer & SDM",
      department: "Department of Land Revenue & Settlement",
      division: "Lucknow Division",
      state: "Uttar Pradesh",
      role: "official",
      badgeNumber: "RO-UP-8841",
      clearanceLevel: "Level-3 Administrative",
      lastLogin: new Date().toLocaleString('en-IN')
    };
    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  return (
    <AuthContext.Provider value={{
      user,
      role: user ? user.role : null,
      isAuthenticated: !!user,
      loginAsCitizen,
      loginAsOfficial,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);