import { Link } from "react-router-dom";

const COHORTS = [
  { name: "Alpha Batch – CSE 2021-25", students: 120, avg: 8.1, progress: 78, color: "#0D9488" },
  { name: "Beta Batch – CSE 2022-26", students: 60, avg: 7.2, progress: 52, color: "#2563EB" },
];

const RECENT_QUIZ = [
  { student: "Priya Sharma", quiz: "DSA – Arrays & Strings", score: 92, time: "10m ago", tier: "Advanced" },
  { student: "Arjun Mehta", quiz: "System Design – Distributed Systems", score: 78, time: "22m ago", tier: "Advanced" },
  { student: "Sneha Patel", quiz: "Quantitative Aptitude – P&C", score: 65, time: "1h ago", tier: "Intermediate" },
  { student: "Kiran Kumar", quiz: "DSA – Trees & Graphs", score: 81, time: "1h ago", tier: "Intermediate" },
  { student: "Rohit Verma", quiz: "Verbal Reasoning – RC", score: 52, time: "2h ago", tier: "Beginner" },
  { student: "Divya Krishnan", quiz: "Machine Learning – Regression", score: 74, time: "3h ago", tier: "Intermediate" },
];

const TIER_COLORS: Record<string, string> = { Advanced: "#059669", Intermediate: "#D97706", Beginner: "#DC2626" };

export default function FacultyDashboard() {
  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl" style={{ background: "linear-gradient(135deg, #0D9488, #2563EB)" }}>KM</div>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Good morning, Prof. Karthik!</h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Senior Professor · CSE Department · Gyan Ganga Institute of Technology and Sciences (GGITS)</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "My Students", value: "280", icon: "👥", color: "#0D9488" },
          { label: "Promo Codes Issued", value: "150", icon: "🎟", color: "#2563EB" },
          { label: "Assigned Cohorts", value: "2", icon: "📚", color: "#7C3AED" },
          { label: "Sub-Faculty", value: "3", icon: "👨‍🏫", color: "#D97706" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-2xl mb-3">{icon}</div>
            <div className="text-3xl font-bold mb-1" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Cohort Overview */}
      <div>
        <h2 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>My Assigned Cohorts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {COHORTS.map(({ name, students, avg, progress, color }) => (
            <div key={name} className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-xs" style={{ background: color }}>{name[0]}</div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{name}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{students} students enrolled</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl text-center" style={{ background: "var(--surface-bg)" }}>
                  <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{avg}</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Avg Score</div>
                </div>
                <div className="p-3 rounded-xl text-center" style={{ background: "var(--surface-bg)" }}>
                  <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{progress}%</div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>Avg Progress</div>
                </div>
              </div>
              <Link to="/college-faculty/students" className="flex items-center justify-center py-2.5 rounded-xl text-xs font-bold" style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>
                View Students →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Activity Stream */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Recent Quiz Activity Stream</h3>
          <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Live submissions from your students</p>
        </div>
        <div className="divide-y" style={{ "--tw-divide-opacity": 1 } as React.CSSProperties}>
          {RECENT_QUIZ.map(({ student, quiz, score, time, tier }) => (
            <div key={`${student}-${time}`} className="flex items-center gap-4 px-6 py-4 transition-colors"
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: "linear-gradient(135deg, #0D9488, #2563EB)" }}>
                {student.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate" style={{ color: "var(--text-primary)" }}>{student}</div>
                <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{quiz}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${TIER_COLORS[tier]}12`, color: TIER_COLORS[tier] }}>{tier}</span>
                <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: score >= 80 ? "#059669" : score >= 60 ? "#D97706" : "#DC2626" }}>{score}%</span>
                <span className="text-xs w-12 text-right" style={{ color: "var(--text-muted)" }}>{time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
