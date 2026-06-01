import { LogOut, Menu, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

function Navbar({ onMenuClick }) {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="ghost-button lg:hidden" aria-label="Open menu">
            <Menu className="h-4 w-4" />
          </button>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-primary">
              Interview AI
            </p>
            <h1 className="text-lg font-semibold text-white sm:text-xl">
              Preparation Workspace
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 sm:flex">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-slate-200">{user?.username}</span>
          </div>
          <button onClick={handleLogout} className="ghost-button">
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
