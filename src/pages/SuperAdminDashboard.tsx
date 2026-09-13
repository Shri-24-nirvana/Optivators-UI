import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const GROWTH_DATA = [
  { month: "Jan", students: 38200 }, { month: "Feb", students: 39100 }, { month: "Mar", students: 40500 },
  { month: "Apr", students: 41200 }, { month: "May", students: 42800 }, { month: "Jun", students: 43500 },
  { month: "Jul", students: 44100 }, { month: "Aug", students: 44800 }, { month: "Sep", students: 45200 },
];

const RECENT_COLLEGES = [
  { name: "Amrita University", domain: "amrita.edu", admin: "Dr. Rajesh Kumar", students: 1200, status: "Active", date: "Sep 1, 2026" },
  { name: "PSG College of Technology", domain: "psgtech.edu", admin: "Prof. Anand Sharma", students: 890, status: "Trial", date: "Aug 28, 2026" },
  { name: "Coimbatore Institute of Technology", domain: "cit.edu.in", admin: "Dr. Meera Pillai", students: 540, status: "Active", date: "Aug 20, 2026" },
  { name: "SASTRA University", domain: "sastra.edu", admin: "Prof. Vijay Kumar", students: 720, status: "Active", date: "Aug 15, 2026" },
];

const tooltipStyle = {
  contentStyle: { background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", borderRadius: 12, color: "var(--text-primary)", fontFamily: "DM Sans, sans-serif", fontSize: 12 },
  labelStyle: { color: "var(--text-secondary)" },
};

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>SA</div>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Super Admin Global Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#34D399" }} />
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>All systems operational · 99.9% uptime</span>
          </div>
        </div>
      </div>

      {/* SaaS KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: "Partner Colleges", value: "32", change: "+3 this month", color: "#0D9488" },
          { label: "Active Students", value: "45.2K", change: "+2,400 this month", color: "#2563EB" },
          { label: "Total Faculty", value: "1,250", change: "+48 provisioned", color: "#7C3AED" },
          { label: "Domain Packages", value: "18", change: "4 updated", color: "#059669" },
          { label: "Assessment Attempts", value: "280K", change: "+12K this week", color: "#D97706" },
          { label: "System Health", value: "99.9%", change: "All green", color: "#059669" },
        ].map(({ label, value, change, color }) => (
          <div key={label} className="rounded-2xl p-4" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--text-secondary)" }}>{label}</div>
            <div className="text-xs" style={{ color: "var(--text-muted)" }}>{change}</div>
          </div>
        ))}
      </div>

      {/* Growth chart */}
      <div className="rounded-2xl p-6" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Global Student Growth — 2026</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={GROWTH_DATA} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="saGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
            <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)" }} />
            <Tooltip {...tooltipStyle} />
            <Area type="monotone" dataKey="students" stroke="#7C3AED" strokeWidth={2.5} fill="url(#saGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Onboardings */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Recent College Onboardings</h3>
          <button className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>+ Provision College</button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--surface-bg)" }}>
              {["College", "Domain", "Admin Contact", "Students", "Status", "Onboarded"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RECENT_COLLEGES.map(({ name, domain, admin, students, status, date }) => (
              <tr key={name} className="border-t" style={{ borderColor: "var(--border-subtle)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
                      {name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{domain}</td>
                <td className="px-5 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{admin}</td>
                <td className="px-5 py-3 font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{students.toLocaleString()}</td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{
                    background: status === "Active" ? "rgba(5,150,105,0.12)" : "rgba(217,119,6,0.12)",
                    color: status === "Active" ? "#059669" : "#D97706",
                  }}>{status}</span>
                </td>
                <td className="px-5 py-3 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
