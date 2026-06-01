import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";
import { useAuthStore } from "../store/authStore";

function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <Loading label="Loading workspace" fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-ink text-white">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-h-screen lg:pl-72">
        <Navbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default ProtectedLayout;
