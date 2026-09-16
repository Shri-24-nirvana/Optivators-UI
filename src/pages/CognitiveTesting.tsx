import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

const BASE_SCORECARDS = [
  { label: "Domain Quizzes", score: "8.4", max: 10, completed: 72, color: "#0D9488", icon: <CodeIcon /> },
  { label: "Non-Tech Skills", score: "7.8", max: 10, completed: 58, color: "#EA580C", icon: <BriefIcon /> },
  { label: "Interview Prep", score: "8.0", max: 10, completed: 65, color: "#2563EB", icon: <MicIcon /> },
  { label: "CRT / Aptitude", score: "8.9", max: 10, completed: 80, color: "#059669", icon: <CalcIcon /> },
];

const FILTERS = ["All Branches", "CSE Core", "AIML", "Data Science", "Cyber Security", "Cloud & DevOps", "Sales & HR", "Finance"];

const PACKAGES = [
  {
    name: "Data Structures & Algorithms",
    count: 12,
    completed: 8,
    color: "#0D9488",
    courses: [
      { title: "Arrays & Strings Mastery", quiz1: 87, quiz2: 91, progress: 100, done: true, tags: ["Arrays", "Strings", "Two Pointer"] },
      { title: "Trees & Graph Algorithms", quiz1: 74, quiz2: null, progress: 65, done: false, tags: ["BFS", "DFS", "Dijkstra"] },
      { title: "Dynamic Programming Core", quiz1: null, quiz2: null, progress: 20, done: false, tags: ["Memoization", "Tabulation"] },
    ],
  },
  {
    name: "System Design Fundamentals",
    count: 8,
    completed: 3,
    color: "#2563EB",
    courses: [
      { title: "Distributed Systems 101", quiz1: 82, quiz2: 79, progress: 100, done: true, tags: ["CAP Theorem", "Consistency"] },
      { title: "Database Design Patterns", quiz1: 69, quiz2: null, progress: 40, done: false, tags: ["Normalization", "Indexing", "ACID"] },
    ],
  },
  {
    name: "Quantitative Aptitude",
    count: 10,
    completed: 5,
    color: "#D97706",
    courses: [
      { title: "Number Systems & Algebra", quiz1: 92, quiz2: 88, progress: 100, done: true, tags: ["LCM", "HCF", "Surds"] },
      { title: "Permutation & Combination", quiz1: 76, quiz2: null, progress: 55, done: false, tags: ["P&C", "Probability"] },
    ],
  },
];

export default function CognitiveTesting() {
  const { isOrange } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All Branches");
  const [expandedPkg, setExpandedPkg] = useState<string | null>(PACKAGES[0].name);

  const primaryAccent = isOrange ? "#EA580C" : "#0D9488";

  const scorecards = [
    { label: "Domain Quizzes", score: "8.4", max: 10, completed: 72, color: primaryAccent, icon: <CodeIcon /> },
    { label: "Non-Tech Skills", score: "7.8", max: 10, completed: 58, color: "#EA580C", icon: <BriefIcon /> },
    { label: "Interview Prep", score: "8.0", max: 10, completed: 65, color: "#2563EB", icon: <MicIcon /> },
    { label: "CRT / Aptitude", score: "8.9", max: 10, completed: 80, color: "#059669", icon: <CalcIcon /> },
  ];

  return (
    <div className="space-y-8">
      {/* Track Header */}
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-3 px-5 py-3 rounded-2xl"
          style={{ background: "var(--accent-soft)", border: "1px solid var(--border-strong)" }}
        >
          <span style={{ color: "var(--accent-primary)" }}>
            <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9.5 2a2.5 2.5 0 0 1 5 0v.5a.5.5 0 0 0 .5.5h.5a2.5 2.5 0 0 1 0 5h-.5a.5.5 0 0 0-.5.5v.5a2.5 2.5 0 0 1-5 0v-.5a.5.5 0 0 0-.5-.5H9a2.5 2.5 0 0 1 0-5h.5a.5.5 0 0 0 .5-.5z"/>
            </svg>
          </span>
          <span className="font-bold text-sm" style={{ color: "var(--accent-primary)" }}>Tech Student Track</span>
        </div>
        <div className="text-sm" style={{ color: "var(--text-secondary)" }}>B.Tech · Computer Science Engineering · Gyan Ganga Institute of Technology and Sciences (GGITS)</div>
      </div>

      {/* Scorecards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {scorecards.map(({ label, score, max, completed, color, icon }) => (
          <div
            key={label}
            className="rounded-2xl p-5 transition-all duration-200"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px -8px ${color}30`; e.currentTarget.style.borderColor = `${color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, color }}>
                {icon}
              </div>
              <div className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: `${color}12`, color, fontFamily: "var(--font-mono)" }}>
                {completed}%
              </div>
            </div>
            <div className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-mono)", color }}>
              {score}
              <span className="text-base font-normal ml-1" style={{ color: "var(--text-muted)" }}>/ {max}</span>
            </div>
            <div className="text-xs font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>{label}</div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
              <div className="h-full rounded-full" style={{ width: `${completed}%`, background: color }} />
            </div>
            <button
              className="flex items-center gap-1 mt-4 text-xs font-bold"
              style={{ color }}
            >
              Explore Specializations <span className="text-xs">✦</span>
            </button>
          </div>
        ))}
      </div>

      {/* Filter Toolbar */}
      <div>
        <div className="flex flex-wrap gap-2 mb-3">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: activeFilter === f ? "var(--accent-soft)" : "var(--surface-elevated)",
                color: activeFilter === f ? "var(--accent-primary)" : "var(--text-secondary)",
                border: `1px solid ${activeFilter === f ? "rgba(13,148,136,0.3)" : "var(--border-subtle)"}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
        {activeFilter !== "All Branches" && (
          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: "var(--accent-soft)", color: "var(--accent-primary)", border: "1px solid rgba(13,148,136,0.3)" }}
            >
              {activeFilter}
              <button onClick={() => setActiveFilter("All Branches")} className="ml-1 hover:opacity-70">×</button>
            </span>
            <button
              onClick={() => setActiveFilter("All Branches")}
              className="text-xs font-semibold"
              style={{ color: "var(--text-muted)" }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Course Package Accordions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Course Packages</h3>
        {PACKAGES.map(({ name, count, completed, color, courses }) => {
          const isOpen = expandedPkg === name;
          return (
            <div
              key={name}
              className="rounded-2xl overflow-hidden transition-all"
              style={{ background: "var(--surface-elevated)", border: `1px solid ${isOpen ? `${color}30` : "var(--border-subtle)"}` }}
            >
              {/* Pill Header */}
              <button
                onClick={() => setExpandedPkg(isOpen ? null : name)}
                className="w-full flex items-center gap-4 p-4 text-left transition-colors"
                style={{ background: isOpen ? `${color}08` : "transparent" }}
              >
                <div
                  className="w-12 h-8 rounded-lg shrink-0"
                  style={{ background: `${color}20` }}
                />
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{count} courses · {completed} completed</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${color}12`, color, fontFamily: "var(--font-mono)" }}>
                    {count} courses
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>
                    {completed}/{count} done
                  </span>
                  <svg
                    width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    style={{ color: "var(--text-muted)", transform: isOpen ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s" }}
                  >
                    <polyline points="6,9 12,15 18,9" />
                  </svg>
                </div>
              </button>

              {/* Expanded grid */}
              {isOpen && (
                <div className="px-4 pb-4 grid grid-cols-1 md:grid-cols-3 gap-4 border-t" style={{ borderColor: `${color}20` }}>
                  {courses.map(({ title, quiz1, quiz2, progress, done, tags }) => (
                    <div
                      key={title}
                      className="rounded-xl overflow-hidden"
                      style={{ border: "1px solid var(--border-subtle)", background: "var(--surface-bg)" }}
                    >
                      {/* Thumbnail */}
                      <div className="relative h-28" style={{ background: `linear-gradient(135deg, ${color}20, ${color}08)` }}>
                        {done && (
                          <div
                            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold"
                            style={{ background: "#059669", color: "white" }}
                          >
                            ✓ Completed
                          </div>
                        )}
                        <div className="absolute inset-0 flex items-center justify-center opacity-20">
                          <div style={{ color, fontSize: 48 }}>⬡</div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="font-semibold text-sm mb-2" style={{ color: "var(--text-primary)" }}>{title}</div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {tags.map(t => (
                            <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: "var(--border-subtle)", color: "var(--text-muted)" }}>{t}</span>
                          ))}
                        </div>

                        {/* Quiz scores */}
                        {(quiz1 || quiz2) && (
                          <div className="flex gap-2 mb-3">
                            {quiz1 && <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${color}12`, color, fontFamily: "var(--font-mono)" }}>Quiz 1: {quiz1}%</span>}
                            {quiz2 && <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${color}12`, color, fontFamily: "var(--font-mono)" }}>Quiz 2: {quiz2}%</span>}
                          </div>
                        )}

                        {/* Progress */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-muted)" }}>
                            <span>Progress</span><span style={{ fontFamily: "var(--font-mono)", color }}>{progress}%</span>
                          </div>
                          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                            <div className="h-full rounded-full" style={{ width: `${progress}%`, background: color }} />
                          </div>
                        </div>

                        <button
                          className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all"
                          style={{ background: `${color}15`, color, border: `1px solid ${color}25` }}
                        >
                          {done ? "Retake Quiz" : "Take Quiz"} →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CodeIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16,18 22,12 16,6"/><polyline points="8,6 2,12 8,18"/></svg>; }
function BriefIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>; }
function MicIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>; }
function CalcIcon() { return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="12" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="12" y1="18" x2="16" y2="18"/></svg>; }
