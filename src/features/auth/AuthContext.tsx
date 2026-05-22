import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { authSignIn, authSignOut, getIdToken, isAuthenticated } from "../../shared/auth/amplify";
import { AuthContext } from "./auth-context";

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
