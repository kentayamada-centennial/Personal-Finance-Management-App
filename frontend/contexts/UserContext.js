import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await storage.getItem('userId');
      if (storedUserId) {
        setUserId(storedUserId);
      }
    };
    loadUserId();
  }, []);

  const login = async (newUserId) => {
    newUserId = newUserId.toString();
    await storage.setItem('userId', newUserId);
    setUserId(newUserId);
  };

  const logout = async () => {
    await storage.removeItem('userId');
    setUserId(null);
  };

  return (
    <UserContext.Provider value={{ userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
