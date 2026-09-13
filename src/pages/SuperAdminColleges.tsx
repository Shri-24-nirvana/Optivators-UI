import { useState } from "react";

const COLLEGES = [
  { name: "VIT Vellore", domain: "vit.ac.in", admin: "Dr. Rajesh Pillai", students: 1450, packages: 12, expiry: "Mar 2027", status: "Active", tier: "Premium" },
  { name: "SRM Institute", domain: "srmist.edu.in", admin: "Prof. Anand Kumar", students: 1120, packages: 10, expiry: "Jan 2027", status: "Active", tier: "Standard" },
  { name: "Manipal University", domain: "manipal.edu", admin: "Dr. Priya Sharma", students: 980, packages: 9, expiry: "Jun 2027", status: "Active", tier: "Premium" },
  { name: "Amrita University", domain: "amrita.edu", admin: "Dr. Meera Pillai", students: 830, packages: 7, expiry: "Sep 2026", status: "Trial", tier: "Trial" },
  { name: "PSG College of Technology", domain: "psgtech.edu", admin: "Prof. Vijay Rajan", students: 540, packages: 5, expiry: "Dec 2026", status: "Active", tier: "Standard" },
  { name: "Coimbatore Institute of Technology", domain: "cit.edu.in", admin: "Dr. Nair Krishnan", students: 420, packages: 4, expiry: "Feb 2025", status: "Expired", tier: "Basic" },
];

const STATUS_COLORS: Record<string, string> = { Active: "#059669", Trial: "#D97706", Expired: "#DC2626" };

export default function SuperAdminColleges() {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = COLLEGES.filter(c => {
    const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.domain.toLowerCase().includes(search.toLowerCase());
    const mf = statusFilter === "All" || c.status === statusFilter;
    return ms && mf;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Colleges Master Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>All partner institutions · {COLLEGES.length} total</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>
          + Provision New College
        </button>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm px-4 py-2.5 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search colleges…" className="flex-1 text-sm outline-none bg-transparent" style={{ color: "var(--text-primary)" }} />
        </div>
        {["All", "Active", "Trial", "Expired"].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} className="px-3 py-2 rounded-xl text-xs font-semibold" style={{ background: statusFilter === s ? "var(--accent-soft)" : "var(--surface-elevated)", color: statusFilter === s ? "var(--accent-primary)" : "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>
            {s}
          </button>
        ))}
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--surface-bg)" }}>
              {["College", "Domain", "Admin", "Students", "Packages", "Contract Expiry", "Status", "Actions"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.name} className="border-t" style={{ borderColor: "var(--border-subtle)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-xs shrink-0" style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
                      {c.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-xs" style={{ color: "var(--text-primary)" }}>{c.name}</div>
                      <div className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{c.tier}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{c.domain}</td>
                <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{c.admin}</td>
                <td className="px-4 py-3 font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{c.students.toLocaleString()}</td>
                <td className="px-4 py-3 text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{c.packages}</td>
                <td className="px-4 py-3 text-xs" style={{ color: c.status === "Expired" ? "#DC2626" : "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{c.expiry}</td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${STATUS_COLORS[c.status]}12`, color: STATUS_COLORS[c.status] }}>{c.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>View</button>
                    <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>Credits</button>
                    {c.status !== "Expired" && <button className="px-2 py-1 rounded-lg text-xs font-semibold" style={{ background: "rgba(220,38,38,0.1)", color: "#DC2626" }}>Suspend</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Provision Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="rounded-3xl p-7 w-full max-w-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Provision New College</h2>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "College Name", ph: "IIT Madras" },
                  { label: "Domain Slug", ph: "iitm.ac.in" },
                  { label: "Admin Name", ph: "Dr. Firstname Lastname" },
                  { label: "Admin Email", ph: "admin@iitm.ac.in" },
                ].map(({ label, ph }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                    <input placeholder={ph} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Initial Promo Pool</label>
                  <input type="number" placeholder="500" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Subscription Tier</label>
                  <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}>
                    {["Trial", "Basic", "Standard", "Premium"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Contract End</label>
                  <input type="date" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Provision & Send Invite</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
