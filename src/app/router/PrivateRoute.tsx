import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import { env } from "../../shared/config/env";

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { ready, authenticated } = useAuth();
  const base = env.pathText ? `/${env.pathText}` : "";

  if (!ready) {
    return <p>読み込み中...</p>;
  }

  return authenticated ? <>{children}</> : <Navigate to={`${base}/signin`} replace />;
}
