import { createContext } from "react";

export type AuthContextValue = {
  ready: boolean;
  authenticated: boolean;
  signIn: (username: string, password: string) => Promise<{ success: boolean; message: string }>;
  signOut: () => Promise<void>;
  getToken: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);