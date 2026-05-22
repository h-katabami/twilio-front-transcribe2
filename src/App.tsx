import { AppQueryProvider } from "./app/providers/QueryProvider";
import { AppRouter } from "./app/router/AppRouter";
import { AuthProvider } from "./features/auth/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppQueryProvider>
        <AppRouter />
      </AppQueryProvider>
    </AuthProvider>
  );
}
