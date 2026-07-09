import {createContext, useState} from 'react';
import type {ReactNode} from 'react';
import React from 'react';

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token') || null);

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.removeItem('user');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!token;
  return (
    <AuthContext.Provider value={{token, login, logout, isAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if(!context) {
        throw new Error('useAuth debe ser usado con AuthProvider');
    }
    return context;
};

export default AuthContext;
