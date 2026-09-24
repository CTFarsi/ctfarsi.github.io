'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { clearStoredUser, getOAuthUrl, readStoredUser, type GitHubUser } from '@/lib/auth';

type AuthContextValue = {
  user: GitHubUser | null;
  /** false until localStorage has been read on the client */
  ready: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(readStoredUser());
    setReady(true);
  }, []);

  const login = useCallback(() => {
    const current = readStoredUser();
    if (current) {
      setUser(current);
      return;
    }
    window.location.href = getOAuthUrl();
  }, []);

  const logout = useCallback(() => {
    clearStoredUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
