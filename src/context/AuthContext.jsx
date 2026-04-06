import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as authApi from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('finance_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('finance_token'));

  useEffect(() => {
    if (user) localStorage.setItem('finance_user', JSON.stringify(user)); else localStorage.removeItem('finance_user');
    if (token) localStorage.setItem('finance_token', token); else localStorage.removeItem('finance_token');
  }, [user, token]);

  const login = async (credentials) => {
    const data = await authApi.login(credentials);
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const register = async (credentials) => {
    const data = await authApi.register(credentials);
    setUser(data.user);
    setToken(data.token);
    return data.user;
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore logout errors
    }
    setUser(null);
    setToken(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: Boolean(token),
    role: user?.role || null
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);