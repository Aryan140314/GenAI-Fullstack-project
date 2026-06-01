import { BrainCircuit, FileText, LayoutDashboard, Rocket, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/", icon: LayoutDashboard },
  { label: "Reports", to: "/", icon: FileText },
];

function SidebarContent({ onClose }) {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary shadow-lg shadow-primary/30">
          <BrainCircuit className="h-6 w-6 text-white" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-semibold text-white">Interview AI</p>
          <p className="text-xs text-slate-400">GenAI preparation suite</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ghost-button h-10 w-10 px-0 lg:hidden" aria-label="Close menu">
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <nav className="mt-8 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary/15 text-white ring-1 ring-primary/30"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5 rounded-lg border border-white/10 bg-white/[0.04] p-4">
        <div className="flex items-center gap-2 text-sm font-medium text-white">
          <Rocket className="h-4 w-4 text-emerald-400" />
          Keep building
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          Every report becomes a sharper path to the next interview.
        </p>
      </div>
    </>
  );
}

function Sidebar({ open, onClose }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-panel/60 px-5 py-6 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-ink/70 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close menu overlay"
          />
          <aside className="relative h-full w-72 max-w-[85vw] border-r border-white/10 bg-panel px-5 py-6 shadow-glow">
            <SidebarContent onClose={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
