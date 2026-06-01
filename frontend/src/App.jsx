import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";
import { useAuthStore } from "./store/authStore";

function App() {
  const getCurrentUser = useAuthStore((state) => state.getCurrentUser);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  return <AppRoutes />;
}

export default App;
