import { useState } from "react";
import { Link } from "react-router-dom";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useTheme } from "@/context/ThemeContext";

const STUDENTS = [
  { name: "Priya Sharma", roll: "21BCE0147", branch: "CSE", batch: "2021-25", cohort: "Alpha Batch", score: 9.1, cognitive: 8.8, completion: 96, tier: "Advanced", views: 142 },
  { name: "Siddharth Joshi", roll: "20BCE0302", branch: "IT", batch: "2020-24", cohort: "Pioneer Batch", score: 9.0, cognitive: 8.5, completion: 98, tier: "Advanced", views: 198 },
  { name: "Ananya Gupta", roll: "21BCE0415", branch: "AIML", batch: "2021-25", cohort: "Alpha Batch", score: 8.6, cognitive: 8.3, completion: 91, tier: "Advanced", views: 87 },
  { name: "Arjun Mehta", roll: "21BCE0234", branch: "AIML", batch: "2021-25", cohort: "Alpha Batch", score: 8.4, cognitive: 8.1, completion: 89, tier: "Advanced", views: 64 },
  { name: "Rahul Kumar", roll: "21BCE1240", branch: "CSE", batch: "2021-25", cohort: "Alpha Batch", score: 7.2, cognitive: 7.5, completion: 85, tier: "Intermediate", views: 142 },
  { name: "Sneha Patel", roll: "22BCE0089", branch: "IT", batch: "2022-26", cohort: "Beta Batch", score: 7.2, cognitive: 7.0, completion: 72, tier: "Intermediate", views: 38 },
  { name: "Kiran Kumar", roll: "22BCE0312", branch: "DS", batch: "2022-26", cohort: "Beta Batch", score: 6.8, cognitive: 6.5, completion: 65, tier: "Intermediate", views: 21 },
  { name: "Meera Krishnan", roll: "22MBA0198", branch: "MBA", batch: "2022-24", cohort: "MBA Cohort", score: 7.6, cognitive: 7.2, completion: 78, tier: "Intermediate", views: 55 },
  { name: "Rohit Verma", roll: "23BCE0421", branch: "CSE", batch: "2023-27", cohort: "Gamma Batch", score: 5.2, cognitive: 4.8, completion: 38, tier: "Beginner", views: 12 },
  { name: "Divya Nair", roll: "21ECE0188", branch: "Mech", batch: "2021-25", cohort: "Alpha Batch", score: 4.2, cognitive: 4.0, completion: 30, tier: "Beginner", views: 8 },
];

const BRANCHES = ["All Branches", "CSE", "IT", "AIML", "DS", "ECE", "Mech", "MBA"];
const TIERS = ["All Tiers", "Advanced", "Intermediate", "Beginner"];

export default function AdminStudents() {
  const { isOrange } = useTheme();
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All Branches");
  const [tier, setTier] = useState("All Tiers");
  const [selected, setSelected] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerStudent, setDrawerStudent] = useState<typeof STUDENTS[0] | null>(null);

  const filtered = STUDENTS.filter(s => {
    const ms = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.roll.toLowerCase().includes(search.toLowerCase());
    const mb = branch === "All Branches" || s.branch === branch;
    const mt = tier === "All Tiers" || s.tier === tier;
    return ms && mb && mt;
  });

  const toggleSelect = (roll: string) => {
    setSelected(prev => prev.includes(roll) ? prev.filter(r => r !== roll) : [...prev, roll]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Students Master Roster</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>1,450 enrolled · Filter, search, and manage all students</p>
        </div>
        <div className="flex gap-2">
          {selected.length > 0 && (
            <button className="px-4 py-2 rounded-xl text-sm font-bold border" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>
              Bulk Assign ({selected.length})
            </button>
          )}
          <button className="px-4 py-2 rounded-xl text-sm font-bold border" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Export CSV</button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or roll number…" className="flex-1 text-sm outline-none bg-transparent" style={{ color: "var(--text-primary)" }} />
        </div>
        <select value={branch} onChange={e => setBranch(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm font-semibold outline-none" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
          {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={tier} onChange={e => setTier(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm font-semibold outline-none" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
          {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--surface-bg)" }}>
              <th className="px-4 py-3 text-left w-8">
                <input type="checkbox" onChange={e => setSelected(e.target.checked ? filtered.map(s => s.roll) : [])} />
              </th>
              {["Student", "Roll No", "Branch", "Cohort", "Platform Score", "Cognitive", "Profile %", "Tier", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr
                key={s.roll}
                className="border-t transition-colors"
                style={{ borderColor: "var(--border-subtle)", background: selected.includes(s.roll) ? "var(--accent-soft)" : "transparent" }}
                onMouseEnter={e => { if (!selected.includes(s.roll)) e.currentTarget.style.background = "var(--surface-bg)"; }}
                onMouseLeave={e => { if (!selected.includes(s.roll)) e.currentTarget.style.background = "transparent"; }}
              >
                <td className="px-4 py-3">
                  <input type="checkbox" checked={selected.includes(s.roll)} onChange={() => toggleSelect(s.roll)} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: isOrange ? "linear-gradient(135deg, #EA580C, #F97316)" : "linear-gradient(135deg, #0D9488, #2563EB)" }}>
                      {s.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="font-medium flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                      <span>{s.name}</span>
                      <VerifiedBadge size={14} className="shrink-0" />
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{s.roll}</td>
                <td className="px-4 py-3 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{s.branch}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{s.cohort}</td>
                <td className="px-4 py-3">
                  <span className="font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{s.score}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-bold text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{s.cognitive}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                      <div className="h-full rounded-full" style={{ width: `${s.completion}%`, background: "var(--accent-primary)" }} />
                    </div>
                    <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{s.completion}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 ${
                      isOrange
                        ? s.tier === "Advanced"
                          ? "bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-500/40"
                          : s.tier === "Intermediate"
                          ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/40"
                          : "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/30"
                        : s.tier === "Advanced"
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40"
                        : s.tier === "Intermediate"
                        ? "bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/40"
                        : "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30"
                    }`}
                  >
                    <VerifiedBadge size={12} className="shrink-0" />
                    <span>{s.tier}</span>
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => { setDrawerStudent(s); setDrawerOpen(true); }} className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>View 360°</button>
                    <button className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>Assign</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Student 360 Drawer */}
      {drawerOpen && drawerStudent && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setDrawerOpen(false)} />
          <div
            className="fixed top-0 right-0 h-full z-50 overflow-y-auto"
            style={{ width: 680, background: "var(--surface-elevated)", borderLeft: "1px solid var(--border-subtle)", boxShadow: "-20px 0 60px rgba(0,0,0,0.2)" }}
          >
            <div className="sticky top-0 flex items-center justify-between p-6 border-b" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-glass)", backdropFilter: "blur(16px)" }}>
              <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>Student 360° Profile</h2>
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-xl" style={{ color: "var(--text-muted)", background: "var(--border-subtle)" }}>✕</button>
            </div>

            <div className="p-6 space-y-5">
              {/* Header */}
              <div
                className="rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: isOrange
                    ? "linear-gradient(135deg, #EA580C, #F97316)"
                    : "linear-gradient(135deg, #0D9488, #2563EB)",
                }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl" style={{ background: "rgba(255,255,255,0.2)" }}>
                    {drawerStudent.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-white flex items-center gap-2">
                      <span>{drawerStudent.name}</span>
                      <VerifiedBadge size={18} className="shrink-0 drop-shadow-md" />
                    </div>
                    <div className="text-sm text-white/80">{drawerStudent.branch} · {drawerStudent.batch} · {drawerStudent.roll}</div>
                    <div className="flex gap-2 mt-2">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>{drawerStudent.cohort}</span>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-3xl font-bold text-white" style={{ fontFamily: "var(--font-mono)" }}>{drawerStudent.score}</div>
                    <div className="text-xs text-white/70 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Platform Score</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Cognitive Score", value: String(drawerStudent.cognitive), color: "#0D9488" },
                  { label: "Profile Completion", value: `${drawerStudent.completion}%`, color: "#2563EB" },
                  { label: "Profile Views", value: String(drawerStudent.views), color: "#7C3AED" },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-xl p-4 text-center" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
                    <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Performance bars */}
              <div className="rounded-2xl p-5" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
                <h3 className="font-bold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Cognitive Breakdown</h3>
                {[
                  { label: "Technical", value: 88 }, { label: "Coding", value: 75 }, { label: "Aptitude", value: 82 },
                  { label: "Reasoning", value: 90 }, { label: "English", value: 70 },
                ].map(({ label, value }) => (
                  <div key={label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1" style={{ color: "var(--text-secondary)" }}>
                      <span>{label}</span><span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                      <div className="h-full rounded-full" style={{ width: `${value}%`, background: "var(--accent-primary)" }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Link to="/student/profile" className="flex-1 py-3 rounded-xl text-sm font-bold text-center text-white" style={{ background: "var(--accent-primary)" }}>
                  View Full 360° Profile
                </Link>
                <button className="flex-1 py-3 rounded-xl text-sm font-bold border" style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}>
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
