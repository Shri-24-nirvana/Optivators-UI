import { useState } from "react";

const TOP_STUDENTS = [
  { rank: 1, name: "Priya Sharma", branch: "CSE", batch: "2021-25", score: 9.1, domain: 8.9, skills: 14, college: "VIT Vellore" },
  { rank: 2, name: "Siddharth Joshi", branch: "IT", batch: "2020-24", score: 9.0, domain: 8.7, skills: 12, college: "VIT Vellore" },
  { rank: 3, name: "Ananya Gupta", branch: "AIML", batch: "2021-25", score: 8.9, domain: 8.8, skills: 11, college: "VIT Vellore" },
  { rank: 4, name: "Arjun Mehta", branch: "AIML", batch: "2021-25", score: 8.6, domain: 8.4, skills: 13, college: "VIT Vellore" },
  { rank: 5, name: "Kiran Kumar", branch: "DS", batch: "2022-26", score: 8.4, domain: 8.2, skills: 10, college: "VIT Vellore" },
  { rank: 6, name: "Meera Patel", branch: "CSE", batch: "2020-24", score: 8.3, domain: 8.0, skills: 12, college: "VIT Vellore" },
  { rank: 7, name: "Rohit Sharma", branch: "CSE", batch: "2021-25", score: 8.2, domain: 7.9, skills: 9, college: "VIT Vellore" },
  { rank: 8, name: "Divya Krishnan", branch: "IT", batch: "2022-26", score: 8.0, domain: 7.7, skills: 8, college: "VIT Vellore" },
  { rank: 9, name: "Aditya Rao", branch: "CSE", batch: "2021-25", score: 7.9, domain: 7.6, skills: 11, college: "VIT Vellore" },
  { rank: 10, name: "Sneha Iyer", branch: "DS", batch: "2022-26", score: 7.8, domain: 7.5, skills: 9, college: "VIT Vellore" },
];

const PODIUM_COLORS = [
  { bg: "#F59E0B", shadow: "rgba(245,158,11,0.4)", label: "2nd", height: 80 },
  { bg: "#F59E0B", shadow: "rgba(245,158,11,0.5)", label: "1st", height: 110 },
  { bg: "#92400E", shadow: "rgba(146,64,14,0.4)", label: "3rd", height: 60 },
];
const PODIUM_ORDER = [1, 0, 2];

const FILTERS_BRANCH = ["All Branches", "CSE", "IT", "AIML", "DS", "Mech"];
const FILTERS_TIME = ["All-time", "This Semester", "Monthly"];

export default function Leaderboard() {
  const [branch, setBranch] = useState("All Branches");
  const [timeframe, setTimeframe] = useState("All-time");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Top Performers</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Campus leaderboard ranked by platform score · VIT Vellore</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          {FILTERS_BRANCH.map(f => (
            <button key={f} onClick={() => setBranch(f)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: branch === f ? "var(--accent-primary)" : "transparent", color: branch === f ? "white" : "var(--text-secondary)" }}>
              {f}
            </button>
          ))}
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          {FILTERS_TIME.map(f => (
            <button key={f} onClick={() => setTimeframe(f)} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: timeframe === f ? "var(--accent-primary)" : "transparent", color: timeframe === f ? "white" : "var(--text-secondary)" }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Podium */}
      <div className="rounded-3xl p-10 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #080C14 0%, #0C1525 100%)" }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #F59E0B 0%, transparent 70%)", filter: "blur(40px)" }} />
        </div>

        <div className="relative flex items-end justify-center gap-6 mb-6" style={{ height: 200 }}>
          {PODIUM_ORDER.map((studentIdx) => {
            const student = TOP_STUDENTS[studentIdx];
            const podium = PODIUM_COLORS[studentIdx];
            const isFst = studentIdx === 1;
            return (
              <div key={student.rank} className="flex flex-col items-center">
                {/* Crown for 1st */}
                {isFst && <div className="text-3xl mb-2">👑</div>}
                {/* Avatar */}
                <div
                  className="rounded-full flex items-center justify-center font-bold text-white mb-3 relative"
                  style={{
                    width: isFst ? 80 : 64, height: isFst ? 80 : 64,
                    background: `linear-gradient(135deg, ${podium.bg}, ${podium.bg}99)`,
                    boxShadow: `0 8px 24px ${podium.shadow}`,
                    fontSize: isFst ? 18 : 14,
                  }}
                >
                  {student.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="text-center mb-3">
                  <div className="font-bold text-sm text-white">{student.name}</div>
                  <div className="text-xs" style={{ color: "#64748B" }}>{student.branch}</div>
                  <div className="text-lg font-bold mt-1" style={{ fontFamily: "var(--font-mono)", color: podium.bg }}>{student.score}</div>
                </div>
                {/* Podium block */}
                <div
                  className="w-28 flex items-center justify-center font-black text-white text-2xl rounded-t-xl"
                  style={{ height: podium.height, background: podium.bg, boxShadow: `0 -8px 20px ${podium.shadow}` }}
                >
                  #{student.rank}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ranked Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Full Rankings — Top 100</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--surface-bg)" }}>
              {["Rank", "Student", "Branch", "Platform Score", "Domain Score", "Validated Skills", "Profile"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOP_STUDENTS.map(({ rank, name, branch: br, batch, score, domain, skills }) => (
              <tr key={rank} className="border-t" style={{ borderColor: "var(--border-subtle)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td className="px-5 py-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{
                      background: rank === 1 ? "#F59E0B" : rank === 2 ? "#94A3B8" : rank === 3 ? "#92400E" : "var(--border-subtle)",
                      color: rank <= 3 ? "white" : "var(--text-secondary)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {rank}
                  </div>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #0D9488, #2563EB)" }}>
                      {name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{name}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)" }}>{batch}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{br}</td>
                <td className="px-5 py-3">
                  <span className="font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)", fontSize: 16 }}>{score}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{domain}</span>
                </td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(5,150,105,0.12)", color: "#059669" }}>{skills} verified</span>
                </td>
                <td className="px-5 py-3">
                  <button className="text-xs font-semibold" style={{ color: "var(--accent-primary)" }}>View →</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
