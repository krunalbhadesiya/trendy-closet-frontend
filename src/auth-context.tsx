// src/auth-context.tsx
import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  role?: 'admin' | 'user';
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<'admin' | 'user' | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role') as 'admin' | 'user' | undefined;

    if (token) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  }, []);

  const login = () => {
    const token = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role') as 'admin' | 'user' | undefined;

    if (token) {
      setIsAuthenticated(true);
      setRole(storedRole);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole(undefined);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
