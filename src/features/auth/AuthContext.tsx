import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { authSignIn, authSignOut, getIdToken, isAuthenticated } from "../../shared/auth/amplify";

type AuthContextValue = {
  ready: boolean;
  authenticated: boolean;
  signIn: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let alive = true;
    void isAuthenticated().then((ok) => {
      if (!alive) return;
      setAuthenticated(ok);
      setReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const signIn = useCallback(async (username: string, password: string) => {
    const result = await authSignIn(username, password);
    if (result.success) {
      setAuthenticated(true);
    }
    return result;
  }, []);

  const signOut = useCallback(async () => {
    await authSignOut();
    setAuthenticated(false);
  }, []);

  const getToken = useCallback(async () => getIdToken(), []);

  const value = useMemo(() => ({ ready, authenticated, signIn, signOut, getToken }), [ready, authenticated, signIn, signOut, getToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
