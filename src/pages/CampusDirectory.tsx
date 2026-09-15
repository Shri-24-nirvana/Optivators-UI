import { useState } from "react";
import { Link } from "react-router-dom";

const PEERS = [
  { name: "Priya Sharma", branch: "CSE", year: "3rd Year", batch: "2021-25", score: 9.1, rank: 1, skills: ["React", "Python", "ML"], tier: "Advanced", avatar: "#0D9488" },
  { name: "Arjun Mehta", branch: "AIML", year: "3rd Year", batch: "2021-25", score: 8.4, rank: 5, skills: ["TensorFlow", "PyTorch", "NLP"], tier: "Advanced", avatar: "#2563EB" },
  { name: "Sneha Patel", branch: "IT", year: "3rd Year", batch: "2021-25", score: 7.2, rank: 18, skills: ["JavaScript", "Node.js", "MongoDB"], tier: "Intermediate", avatar: "#7C3AED" },
  { name: "Kiran Kumar", branch: "DS", year: "2nd Year", batch: "2022-26", score: 8.8, rank: 3, skills: ["SQL", "Tableau", "R"], tier: "Advanced", avatar: "#059669" },
  { name: "Divya Nair", branch: "ECE", year: "4th Year", batch: "2020-24", score: 7.9, rank: 11, skills: ["Embedded C", "MATLAB", "IoT"], tier: "Intermediate", avatar: "#D97706" },
  { name: "Aditya Rao", branch: "CSE", year: "3rd Year", batch: "2021-25", score: 8.0, rank: 9, skills: ["Go", "Kubernetes", "Microservices"], tier: "Intermediate", avatar: "#EC4899" },
  { name: "Meera Krishnan", branch: "MBA", year: "2nd Year", batch: "2022-24", score: 7.6, rank: 14, skills: ["Excel", "Salesforce", "Strategy"], tier: "Intermediate", avatar: "#EA580C" },
  { name: "Rohit Verma", branch: "CSE", year: "1st Year", batch: "2023-27", score: 6.2, rank: 42, skills: ["C++", "Java", "DSA basics"], tier: "Beginner", avatar: "#0891B2" },
  { name: "Ananya Gupta", branch: "AIML", year: "3rd Year", batch: "2021-25", score: 8.6, rank: 4, skills: ["PyTorch", "Computer Vision", "CUDA"], tier: "Advanced", avatar: "#6366F1" },
  { name: "Siddharth Joshi", branch: "IT", year: "4th Year", batch: "2020-24", score: 9.0, rank: 2, skills: ["System Design", "Go", "gRPC"], tier: "Advanced", avatar: "#DC2626" },
  { name: "Pooja Nambiar", branch: "CSE", year: "2nd Year", batch: "2022-26", score: 7.1, rank: 22, skills: ["React Native", "Firebase"], tier: "Intermediate", avatar: "#D946EF" },
  { name: "Akash Singh", branch: "Mech", year: "3rd Year", batch: "2021-25", score: 5.8, rank: 68, skills: ["SolidWorks", "AutoCAD"], tier: "Beginner", avatar: "#78716C" },
];

const BRANCHES = ["All Branches", "CSE", "IT", "AIML", "DS", "ECE", "Mech", "MBA"];
const TIERS = ["All Tiers", "Advanced", "Intermediate", "Beginner"];
const TIER_COLORS: Record<string, string> = { Advanced: "#059669", Intermediate: "#D97706", Beginner: "#DC2626" };

export default function CampusDirectory() {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All Branches");
  const [tier, setTier] = useState("All Tiers");

  const filtered = PEERS.filter(p => {
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.skills.some(s => s.toLowerCase().includes(search.toLowerCase()));
    const mb = branch === "All Branches" || p.branch === branch;
    const mt = tier === "All Tiers" || p.tier === tier;
    return ms && mb && mt;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Campus Directory</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Browse batchmates, peers, and collaborators at Gyan Ganga Institute of Technology and Sciences (GGITS) · {PEERS.length} students</p>
      </div>

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or skill…" className="flex-1 text-sm outline-none bg-transparent" style={{ color: "var(--text-primary)" }} />
        </div>
        <select value={branch} onChange={e => setBranch(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm font-semibold outline-none" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
          {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select value={tier} onChange={e => setTier(e.target.value)} className="px-3 py-2.5 rounded-xl text-sm font-semibold outline-none" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", color: "var(--text-secondary)" }}>
          {TIERS.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="text-xs font-semibold" style={{ color: "var(--text-muted)" }}>{filtered.length} peers found</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(({ name, branch: br, year, batch, score, rank, skills, tier: t, avatar }) => (
          <div
            key={name}
            className="rounded-2xl p-5 transition-all duration-200"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
                style={{ background: avatar }}
              >
                {name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{name}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{br} · {year} · {batch}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{score}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>#{rank}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {skills.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>{s}</span>)}
            </div>

            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${TIER_COLORS[t]}12`, color: TIER_COLORS[t] }}>{t}</span>
              <Link
                to="/student/profile"
                className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}
              >
                View 360° Profile
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
