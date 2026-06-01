import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import InterviewDetails from "../pages/InterviewDetails";
import ProtectedLayout from "../layouts/ProtectedLayout";
import { useAuthStore } from "../store/authStore";
import Loading from "../components/Loading";

function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore();

  if (loading) {
    return <Loading label="Checking session" fullScreen />;
  }

  return isAuthenticated ? <Navigate to="/" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/interview/:id" element={<InterviewDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
