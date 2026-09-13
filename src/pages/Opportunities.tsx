import { useState } from "react";

const JOBS = [
  { company: "Amazon", role: "Software Development Engineer Intern", location: "Bangalore (Hybrid)", type: "Internship", ctc: "₹80K/mo", match: 96, skills: ["DSA", "Java", "System Design"], logo: "#FF9900", remote: false },
  { company: "Razorpay", role: "Backend Engineer – Payments", location: "Bangalore", type: "Full-time", ctc: "₹18-22 LPA", match: 91, skills: ["Node.js", "Redis", "PostgreSQL"], logo: "#2563EB", remote: false },
  { company: "Flipkart", role: "Data Analyst – Supply Chain", location: "Bangalore", type: "Full-time", ctc: "₹12-16 LPA", match: 88, skills: ["SQL", "Python", "Tableau"], logo: "#F97316", remote: false },
  { company: "Google", role: "STEP Intern – Software Engineering", location: "Hyderabad", type: "Internship", ctc: "₹1.2L/mo", match: 82, skills: ["Algorithms", "Python", "C++"], logo: "#34A853", remote: false },
  { company: "Microsoft", role: "SDE – Azure Cloud Platform", location: "Remote", type: "Full-time", ctc: "₹25-35 LPA", match: 78, skills: ["C#", ".NET", "Azure"], logo: "#00A4EF", remote: true },
  { company: "Zomato", role: "Product Analyst – Growth", location: "Gurgaon (Hybrid)", type: "Full-time", ctc: "₹14-18 LPA", match: 74, skills: ["Analytics", "SQL", "Product"], logo: "#E23744", remote: false },
  { company: "Swiggy", role: "Android Developer", location: "Bangalore", type: "Full-time", ctc: "₹15-20 LPA", match: 70, skills: ["Kotlin", "Android SDK", "REST APIs"], logo: "#FC8019", remote: false },
  { company: "Salesforce", role: "Associate Solution Engineer", location: "Hyderabad", type: "Full-time", ctc: "₹12-15 LPA", match: 67, skills: ["Salesforce", "Apex", "CRM"], logo: "#00A1E0", remote: false },
];

const FILTERS = ["All", "Internship", "Full-time", "Remote", "On-campus"];

export default function Opportunities() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = JOBS.filter(j => {
    const matchFilter = activeFilter === "All" || (activeFilter === "Internship" && j.type === "Internship") || (activeFilter === "Full-time" && j.type === "Full-time") || (activeFilter === "Remote" && j.remote);
    const matchSearch = !search || j.company.toLowerCase().includes(search.toLowerCase()) || j.role.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Opportunities</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>AI-matched jobs & internships based on your cognitive profile · {JOBS.length} active openings</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex items-center gap-2 flex-1 px-4 py-3 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--text-muted)", shrink: 0 }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search companies, roles, skills…"
            className="flex-1 text-sm outline-none bg-transparent"
            style={{ color: "var(--text-primary)" }}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold transition-all"
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
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Matched Roles", value: `${filtered.length}`, color: "#0D9488" },
          { label: "High Match (>85%)", value: `${filtered.filter(j => j.match > 85).length}`, color: "#059669" },
          { label: "Easy Apply", value: `${filtered.length}`, color: "#2563EB" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4 text-center" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Job Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(({ company, role, location, type, ctc, match, skills, logo }) => (
          <div
            key={`${company}-${role}`}
            className="rounded-2xl p-5 transition-all duration-200 group"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px -8px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = "var(--border-strong)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
          >
            <div className="flex items-start gap-4 mb-4">
              {/* Logo */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm shrink-0"
                style={{ background: logo }}
              >
                {company[0]}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-sm mb-0.5" style={{ color: "var(--text-primary)" }}>{role}</h3>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>{company} · {location}</div>
              </div>
              {/* Match badge */}
              <div
                className="px-2.5 py-1.5 rounded-xl text-xs font-bold shrink-0"
                style={{
                  background: match >= 90 ? "rgba(5,150,105,0.12)" : match >= 75 ? "rgba(13,148,136,0.12)" : "rgba(217,119,6,0.12)",
                  color: match >= 90 ? "#059669" : match >= 75 ? "#0D9488" : "#D97706",
                  fontFamily: "var(--font-mono)",
                }}
              >
                {match}% match
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: type === "Internship" ? "rgba(37,99,235,0.12)" : "rgba(13,148,136,0.12)", color: type === "Internship" ? "#2563EB" : "#0D9488" }}>{type}</span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(5,150,105,0.12)", color: "#059669" }}>{ctc}</span>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {skills.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs" style={{ background: "var(--surface-bg)", color: "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>{s}</span>)}
            </div>

            <button
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all"
              style={{ background: "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)" }}
            >
              Easy Apply →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
