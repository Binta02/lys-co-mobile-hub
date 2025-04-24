
import React, { createContext, useContext, useState } from 'react';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const logout = () => {
    // Placeholder logout logic
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
