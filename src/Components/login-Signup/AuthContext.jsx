import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state with data from local storage if available
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Update local storage when user state changes
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  const updateShippingAddress = (shippingAddress) => {
    setUser((prevUser) => ({
      ...prevUser,
      shippingAddress: shippingAddress,
    }));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateShippingAddress }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
