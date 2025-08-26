import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simple password-based authentication
  // In production, you'd want to use proper JWT tokens and secure endpoints
  const ADMIN_PASSWORD = 'effectivemarketer2025!'; // Change this to your secure password

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = sessionStorage.getItem('blog-admin-auth');
    const loginTime = sessionStorage.getItem('blog-admin-login-time');
    
    if (authToken && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime);
      // Session expires after 24 hours
      if (elapsed < 24 * 60 * 60 * 1000) {
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('blog-admin-auth');
        sessionStorage.removeItem('blog-admin-login-time');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (password: string): Promise<boolean> => {
    if (password === ADMIN_PASSWORD) {
      // Create a simple token (in production, get this from server)
      const authToken = btoa(`admin:${Date.now()}`);
      sessionStorage.setItem('blog-admin-auth', authToken);
      sessionStorage.setItem('blog-admin-login-time', Date.now().toString());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('blog-admin-auth');
    sessionStorage.removeItem('blog-admin-login-time');
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};