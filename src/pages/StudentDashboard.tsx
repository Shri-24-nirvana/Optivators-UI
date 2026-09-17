import { Link } from "react-router-dom";
import LiquidCylinderProgress from "@/components/ui/LiquidCylinderProgress";
import JobsAnimatedList from "@/components/ui/JobsAnimatedList";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useTheme } from "@/context/ThemeContext";

const KPI_CARDS = [
  { label: "Profile Views", value: "142", sub: "Viewed by recruiters", icon: <EyeIcon />, color: "#7C3AED", bg: "rgba(124,58,237,0.12)" },
  { label: "Skills Validated", value: "12", sub: "Verified in profile", icon: <ShieldIcon />, color: "#059669", bg: "rgba(5,150,105,0.12)" },
  { label: "Cognitive Score", value: "7.2", sub: "/ 10 overall", icon: <BrainIcon />, color: "#0D9488", bg: "rgba(13,148,136,0.12)", mono: true },
  { label: "Projects", value: "3", sub: "Add more projects", icon: <FolderIcon />, color: "#EC4899", bg: "rgba(236,72,153,0.12)" },
];

const QUICK_ACTIONS = [
  { label: "My Profile", icon: <UserIcon />, path: "/student/profile", color: "#0D9488" },
  { label: "Courses", icon: <BookIcon />, path: "/student/courses", color: "#2563EB" },
  { label: "Resume", icon: <FileIcon />, path: "/student/resume", color: "#7C3AED" },
  { label: "Opportunities", icon: <BriefcaseIcon />, path: "/student/opportunities", color: "#059669" },
  { label: "Communities", icon: <UsersIcon />, path: "/student/communities", color: "#D97706" },
  { label: "Directory", icon: <GridIcon />, path: "/student/campus-directory", color: "#DC2626" },
  { label: "Cognitive", icon: <BrainIcon />, path: "/student/cognitive", color: "#0D9488" },
];

const TRACK_PILLS = [
  { label: "Tech Track", color: "#0D9488", bg: "rgba(13,148,136,0.1)", score: "9.1/10" },
  { label: "Non-Tech Track", color: "#EA580C", bg: "rgba(234,88,12,0.1)", score: "7.8/10" },
  { label: "Interview Prep", color: "#2563EB", bg: "rgba(37,99,235,0.1)", score: "8.0/10" },
  { label: "Subjective", color: "#7C3AED", bg: "rgba(124,58,237,0.1)", score: "6.5/10" },
];

const RECENT_ACTIVITY = [
  { action: "Completed DSA Quiz – Arrays & Strings", score: "87%", time: "2h ago", color: "#059669" },
  { action: "Profile viewed by Infosys Recruiter", score: null, time: "5h ago", color: "#7C3AED" },
  { action: "New opportunity matched: SDE Intern @ Amazon", score: null, time: "1d ago", color: "#2563EB" },
  { action: "Skill validated: React.js (Advanced)", score: null, time: "2d ago", color: "#0D9488" },
  { action: "Submitted System Design Quiz", score: "74%", time: "3d ago", color: "#D97706" },
];

export default function StudentDashboard() {
  const { isOrange } = useTheme();

  return (
    <div className="space-y-8">
      {/* Profile completion banner */}
      <div
        className="rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center gap-5 relative overflow-hidden transition-all duration-300 backdrop-blur-2xl"
        style={{
          background: isOrange
            ? "linear-gradient(135deg, rgba(234,88,12,0.12) 0%, rgba(249,115,22,0.06) 50%, rgba(13,148,136,0.08) 100%)"
            : "linear-gradient(135deg, rgba(13,148,136,0.12) 0%, rgba(37,99,235,0.06) 50%, rgba(124,58,237,0.08) 100%)",
          border: isOrange
            ? "1px solid rgba(249,115,22,0.25)"
            : "1px solid rgba(13,148,136,0.25)",
          boxShadow: isOrange
            ? "0 8px 32px -8px rgba(234,88,12,0.15), inset 0 1px 0 rgba(255,255,255,0.12)"
            : "0 8px 32px -8px rgba(13,148,136,0.15), inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative shrink-0">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transition-all duration-300"
              style={{
                background: isOrange
                  ? "linear-gradient(135deg, #EA580C 0%, #F97316 50%, #0D9488 100%)"
                  : "linear-gradient(135deg, #0D9488 0%, #2563EB 50%, #7C3AED 100%)",
                boxShadow: isOrange
                  ? "0 8px 20px -4px rgba(234,88,12,0.45)"
                  : "0 8px 20px -4px rgba(13,148,136,0.45)",
              }}
            >
              RK
            </div>
            <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-[#0F1520] shadow-sm animate-pulse ${isOrange ? "bg-orange-500" : "bg-emerald-500"}`} />
          </div>

          <div className="md:hidden flex-1">
            <div className="font-bold text-base flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
              <span>Rahul Kumar</span>
              <VerifiedBadge size={15} className="shrink-0" />
            </div>
            <div className="text-xs" style={{ color: "var(--text-secondary)" }}>B.Tech CSE · Gyan Ganga Institute of Technology and Sciences (GGITS)</div>
          </div>
        </div>

        <div className="flex-1 min-w-0 w-full">
          <div className="hidden md:flex items-center justify-between mb-1.5">
            <div className="font-bold text-base flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
              <span>Rahul Kumar</span>
              <VerifiedBadge size={16} className="shrink-0" />
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${isOrange ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border-orange-500/20" : "bg-teal-500/15 text-teal-600 dark:text-teal-400 border-teal-500/20"}`}>
                B.Tech CSE, 3rd Year · Gyan Ganga Institute of Technology and Sciences (GGITS)
              </span>
            </div>
          </div>

          {/* 3D Liquid Cylindrical Pill Filling Progress */}
          <LiquidCylinderProgress
            percentage={85}
            height={26}
            subtitle="Complete your profile to get noticed by recruiters — add 2 more projects to reach 95%"
          />
        </div>

        <div className="shrink-0 w-full md:w-auto flex md:flex-col justify-end gap-2">
          <Link
            to="/student/profile"
            className={`w-full md:w-auto px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-1.5 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all ${
              isOrange
                ? "shadow-orange-500/20 hover:shadow-orange-500/35"
                : "shadow-teal-500/20 hover:shadow-teal-500/35"
            }`}
            style={{
              background: isOrange
                ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                : "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
            }}
          >
            <span>Complete Now</span>
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {KPI_CARDS.map(({ label, value, sub, icon, color, bg, mono }) => (
          <div
            key={label}
            className="rounded-2xl p-5 transition-all duration-200 dark:border-white/15 dark:hover:border-white/30 dark:shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)]"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", boxShadow: "0 2px 12px -4px rgba(0,0,0,0.06)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px -8px ${color}45`; e.currentTarget.style.borderColor = `${color}60`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 12px -4px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center dark:ring-1 dark:ring-white/10" style={{ background: bg, color }}>
                {icon}
              </div>
              <div className="text-3xl font-bold dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ color, fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)" }}>
                {value}
              </div>
            </div>
            <div className="font-semibold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{label}</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Cognitive Testing Card */}
        <div
          className="lg:col-span-3 rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
          style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Cognitive Assessment</div>
              <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Testing Portal</h3>
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-bold dark:border dark:border-teal-500/30"
              style={{ background: "rgba(13,148,136,0.12)", color: "var(--accent-primary)" }}
            >
              TECH TRACK
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-5">
            {TRACK_PILLS.map(({ label, color, bg, score }) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 rounded-xl dark:border-opacity-40" style={{ background: bg, border: `1px solid ${color}30` }}>
                <span className="text-sm font-semibold" style={{ color }}>{label}</span>
                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{score}</span>
              </div>
            ))}
          </div>

          <Link
            to="/student/cognitive"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "linear-gradient(135deg, var(--accent-primary) 0%, rgba(13,148,136,0.85) 100%)", boxShadow: "0 6px 20px var(--accent-soft)" }}
          >
            <SparklesIcon /> Start Assessment
          </Link>
        </div>

        {/* Opportunities Card */}
        <div
          className="lg:col-span-2 rounded-2xl p-6 flex flex-col justify-between dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
          style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Matched Opportunities</div>
              <h3 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Jobs & Internships</h3>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 dark:border dark:border-blue-500/30" style={{ background: "rgba(37,99,235,0.12)", color: "#38BDF8" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Live Feed
            </span>
          </div>

          {/* Magic UI Animated List of Jobs & Internships */}
          <div className="flex-1 min-w-0">
            <JobsAnimatedList />
          </div>

          <Link
            to="/student/opportunities"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold mt-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            style={{ background: "var(--accent-soft)", color: "var(--accent-primary)", border: "1px solid var(--border-strong)" }}
          >
            Browse All Opportunities <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Quick Actions</h3>
        <div className="grid grid-cols-4 lg:grid-cols-7 gap-3">
          {QUICK_ACTIONS.map(({ label, icon, path, color }) => (
            <Link
              key={label}
              to={path}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center transition-all dark:border-white/15 dark:hover:border-white/30 dark:shadow-md"
              style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}60`; e.currentTarget.style.background = `${color}12`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-subtle)"; e.currentTarget.style.background = "var(--surface-elevated)"; }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center dark:ring-1 dark:ring-white/10" style={{ background: `${color}15`, color }}>
                {icon}
              </div>
              <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Recent Activity</h3>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map(({ action, score, time, color }) => (
              <div key={action} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "var(--text-primary)" }}>{action}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{time}</div>
                </div>
                {score && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 dark:border dark:border-white/10" style={{ background: `${color}20`, color, fontFamily: "var(--font-mono)" }}>
                    {score}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Score summary */}
        <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Performance Summary</h3>
          <div className="space-y-4">
            {[
              { label: "Technical Aptitude", value: 88, color: "#2DD4BF" },
              { label: "Coding Proficiency", value: 75, color: "#38BDF8" },
              { label: "Verbal & Communication", value: 82, color: "#34D399" },
              { label: "Quantitative Reasoning", value: 70, color: "#FBBF24" },
              { label: "Logical Reasoning", value: 90, color: "#C084FC" },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</span>
                  <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{value}%</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden dark:bg-white/10" style={{ background: "var(--border-subtle)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Icons
function EyeIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>; }
function ShieldIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function BrainIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 .5.5h.5a2.5 2.5 0 0 1 0 5h-.5a.5.5 0 0 0-.5.5v.5a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-.5-.5H9a2.5 2.5 0 0 1 0-5h.5a.5.5 0 0 0 .5-.5z"/></svg>; }
function FolderIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>; }
function UserIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>; }
function BookIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>; }
function FileIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>; }
function BriefcaseIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>; }
function UsersIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>; }
function GridIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>; }
function SparklesIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>; }
function ArrowRightIcon() { return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>; }
