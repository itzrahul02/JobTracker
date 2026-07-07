import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';
import type { User } from '../types';

type AuthContextType = {
  user: User | null; 
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: 'ADMIN' | 'CANDIDATE') => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    api.get('/auth/me')
    .then((res) => setUser(res.data.user))
    .catch(() => 
      localStorage.removeItem('token')).finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    console.log("User in context", res.data.user);
    setUser(res.data.user);
    return res.data.user
  };

  const register = async (name: string, email: string, password: string, role?: 'ADMIN' | 'CANDIDATE') => {
    const res = await api.post('/auth/register', { name, email, password, role });
    localStorage.setItem('token', res.data.token);
    setUser(res.data.user);
    return res.data.user
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context; 
};
