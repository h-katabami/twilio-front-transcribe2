import { AuthProvider } from "../hooks/useAuth";
import { AppQueryProvider } from "./providers/QueryProvider";
import { AppRouter } from "./router/AppRouter";

export default function App() {
  return (
    <AuthProvider>
      <AppQueryProvider>
        <AppRouter />
      </AppQueryProvider>
    </AuthProvider>
  );
}