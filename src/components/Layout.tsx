import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StreamConvergenceBackground from "@/components/ui/StreamConvergenceBackground";
import SwitchMode from "@/components/ui/SwitchMode";
import Notifications from "@/components/ui/Notifications";

const NAV_STUDENT = [
  { icon: GridIcon, label: "Dashboard", path: "/student" },
  { icon: BrainIcon, label: "Cognitive Portal", path: "/student/cognitive" },
  { icon: UserIcon, label: "My Profile", path: "/student/profile" },
  { icon: BookIcon, label: "My Courses", path: "/student/courses" },
  { icon: BriefcaseIcon, label: "Opportunities", path: "/student/opportunities" },
  { icon: FileIcon, label: "Resume Builder", path: "/student/resume" },
  { icon: UsersIcon, label: "Campus Directory", path: "/student/campus-directory" },
  { icon: StarIcon, label: "Communities", path: "/student/communities" },
  { icon: StarIcon, label: "Leaderboard", path: "/leaderboard" },
];

const NAV_ADMIN = [
  { icon: GridIcon, label: "Dashboard", path: "/college-admin" },
  { icon: UsersIcon, label: "Students", path: "/college-admin/students" },
  { icon: TreeIcon, label: "Faculty", path: "/college-admin/faculty" },
  { icon: BuildingIcon, label: "Branches", path: "/college-admin/branches" },
  { icon: LayersIcon, label: "Cohorts", path: "/college-admin/cohorts" },
  { icon: TicketIcon, label: "Promo Codes", path: "/college-admin/promo-allocations" },
  { icon: StarIcon, label: "Leaderboard", path: "/leaderboard" },
];

const NAV_FACULTY = [
  { icon: GridIcon, label: "Dashboard", path: "/college-faculty" },
  { icon: UsersIcon, label: "My Students", path: "/college-faculty/students" },
  { icon: TicketIcon, label: "Promo Codes", path: "/college-faculty/promo-codes" },
  { icon: LayersIcon, label: "Cohorts", path: "/college-faculty/cohorts" },
  { icon: StarIcon, label: "Top Performers", path: "/leaderboard" },
];

const NAV_SUPER = [
  { icon: GridIcon, label: "Dashboard", path: "/super-admin" },
  { icon: BuildingIcon, label: "Colleges", path: "/super-admin/colleges" },
  { icon: BrainIcon, label: "Quizzes & Packages", path: "/super-admin/quizzes" },
  { icon: UsersIcon, label: "Optus Faculties", path: "/super-admin/optus-faculties" },
];

function getNavItems(pathname: string) {
  if (pathname.startsWith("/college-admin")) return NAV_ADMIN;
  if (pathname.startsWith("/college-faculty")) return NAV_FACULTY;
  if (pathname.startsWith("/super-admin")) return NAV_SUPER;
  return NAV_STUDENT;
}

function getRoleLabel(pathname: string) {
  if (pathname.startsWith("/college-admin")) return "College Admin";
  if (pathname.startsWith("/college-faculty")) return "Faculty";
  if (pathname.startsWith("/super-admin")) return "Super Admin";
  return "Student";
}

export default function Layout({ children, dark, onToggleDark }: { children: React.ReactNode; dark: boolean; onToggleDark: () => void }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = getNavItems(location.pathname);
  const roleLabel = getRoleLabel(location.pathname);

  return (
    <div className="flex h-full" style={{ background: "var(--surface-bg)", color: "var(--text-primary)" }}>
      {/* Sidebar */}
      <aside
        className="flex flex-col shrink-0 h-full border-r transition-all duration-300"
        style={{
          width: collapsed ? 72 : 232,
          background: "var(--sidebar-bg)",
          borderColor: "var(--border-subtle)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b" style={{ borderColor: "var(--border-subtle)", minHeight: 64 }}>
          <div
            className="shrink-0 flex items-center justify-center rounded-xl font-bold text-white text-sm"
            style={{
              width: 38, height: 38,
              background: "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)",
              boxShadow: "0 4px 14px rgba(13,148,136,0.35)",
            }}
          >
            <OctagonIcon />
          </div>
          {!collapsed && (
            <div>
              <div className="font-bold text-sm leading-none" style={{ fontFamily: "var(--font-sans)", color: "var(--text-primary)" }}>
                Optivators
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {roleLabel}
              </div>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto p-1 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
          >
            <ChevronIcon flipped={collapsed} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 flex flex-col gap-0.5">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium"
                style={{
                  background: active ? "var(--accent-soft)" : "transparent",
                  color: active ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                <span className="shrink-0"><Icon size={18} /></span>
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="border-t p-2 flex flex-col gap-1" style={{ borderColor: "var(--border-subtle)" }}>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-colors"
            style={{ color: "var(--danger)" }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(220,38,38,0.08)")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span className="shrink-0"><LogoutIcon /></span>
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Top Bar */}
        <header
          className="sticky top-0 z-20 flex items-center gap-4 px-6 border-b"
          style={{
            height: 64,
            background: "var(--surface-glass)",
            backdropFilter: "blur(16px) saturate(180%)",
            borderColor: "var(--border-subtle)",
          }}
        >
          {/* Breadcrumb pill */}
          <div
            className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest dark:border dark:border-teal-500/30"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent-primary)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {roleLabel} · {navItems.find(n => n.path === location.pathname)?.label ?? "Portal"}
          </div>

          {/* Search */}
          <div
            className="flex items-center gap-2 flex-1 max-w-md px-3 py-2 rounded-xl text-sm dark:border-white/15 dark:shadow-inner"
            style={{
              background: "var(--surface-elevated)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-muted)",
            }}
          >
            <SearchIcon />
            <span style={{ color: "var(--text-muted)" }}>Search anything…</span>
            <span
              className="ml-auto px-1.5 py-0.5 rounded text-xs font-mono"
              style={{ background: "var(--border-subtle)", color: "var(--text-muted)" }}
            >
              ⌘K
            </span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Theme Toggle */}
            <SwitchMode width={54} height={28} isDark={dark} onToggle={onToggleDark} />

            {/* Interactive Notifications Dropdown */}
            <Notifications />

            {/* Avatar */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div
                className="relative w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm"
                style={{ background: "linear-gradient(135deg, #0D9488, #2563EB)" }}
              >
                RK
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2"
                  style={{ background: "var(--success)", borderColor: "var(--surface-elevated)" }}
                />
              </div>
              {!collapsed && (
                <div className="hidden md:block">
                  <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Rahul Kumar</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{roleLabel}</div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8 relative scroll-smooth">
          {/* High-performance hardware-accelerated ambient backdrop */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              className="absolute -top-40 left-1/4 w-[550px] h-[550px] rounded-full opacity-20 dark:opacity-15 blur-[100px] transition-colors"
              style={{ background: "radial-gradient(circle, #0D9488 0%, transparent 70%)" }}
            />
            <div
              className="absolute top-1/2 -right-20 w-[450px] h-[450px] rounded-full opacity-15 dark:opacity-10 blur-[90px] transition-colors"
              style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)" }}
            />
            <div
              className="absolute -bottom-32 left-1/3 w-[500px] h-[500px] rounded-full opacity-15 dark:opacity-10 blur-[110px] transition-colors"
              style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)" }}
            />
          </div>
          <div className="mx-auto max-w-[1280px] relative z-10">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

/* Inline SVG icons */
function GridIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function BrainIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 .5.5h.5a2.5 2.5 0 0 1 0 5h-.5a.5.5 0 0 0-.5.5v.5a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-.5-.5H9a2.5 2.5 0 0 1 0-5h.5a.5.5 0 0 0 .5-.5z"/><path d="M6 14a2 2 0 1 0-2 2"/><path d="M18 14a2 2 0 1 1 2 2"/><path d="M12 14v4"/><path d="M12 18a4 4 0 0 1-4 4"/><path d="M12 18a4 4 0 0 0 4 4"/>
    </svg>
  );
}
function UserIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/>
    </svg>
  );
}
function BookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}
function BriefcaseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
    </svg>
  );
}
function FileIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}
function UsersIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function StarIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
    </svg>
  );
}
function TreeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2"/><circle cx="6" cy="14" r="2"/><circle cx="18" cy="14" r="2"/><path d="M12 6v4M12 10l-4 2M12 10l4 2"/>
    </svg>
  );
}
function BuildingIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
    </svg>
  );
}
function LayersIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 22,8.5 12,15 2,8.5"/><polyline points="2,15.5 12,22 22,15.5"/><polyline points="2,12 12,18.5 22,12"/>
    </svg>
  );
}
function TicketIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8"/><path d="M19 5h.01"/><path d="M19 12h.01"/><path d="M19 19h.01"/><path d="M15 5v14"/>
    </svg>
  );
}
function OctagonIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.86 2L2 7.86v8.28L7.86 22h8.28L22 16.14V7.86L16.14 2H7.86zm1.5 0h5.28L20 7.36v9.28L14.64 22H9.36L4 16.64V7.36L8.5 2h.86z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}
function ChevronIcon({ flipped }: { flipped: boolean }) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: flipped ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s" }}>
      <polyline points="15,18 9,12 15,6"/>
    </svg>
  );
}
