import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { SignInPage } from "../../pages/SignInPage";
import { TranscribePage } from "../../pages/TranscribePage";
import { env } from "../../shared/config/env";
import { PrivateRoute } from "./PrivateRoute";

export function AppRouter() {
  const base = env.pathText ? `/${env.pathText}` : "";

  return (
    <BrowserRouter>
      <Routes>
        <Route path={`${base}/signin`} element={<SignInPage />} />
        <Route
          path={`${base}/transcribe`}
          element={(
            <PrivateRoute>
              <TranscribePage />
            </PrivateRoute>
          )}
        />
        <Route path="*" element={<Navigate to={`${base}/transcribe`} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
