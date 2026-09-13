import { useState } from "react";

const BRANCHES = [
  { name: "Computer Science Engineering", code: "CSE", students: 480, faculty: 18, cohorts: 8, color: "#0D9488" },
  { name: "Information Technology", code: "IT", students: 320, faculty: 12, cohorts: 6, color: "#2563EB" },
  { name: "AI & Machine Learning", code: "AIML", students: 180, faculty: 8, cohorts: 4, color: "#7C3AED" },
  { name: "Data Science", code: "DS", students: 150, faculty: 7, cohorts: 3, color: "#059669" },
  { name: "Mechanical Engineering", code: "Mech", students: 210, faculty: 14, cohorts: 5, color: "#D97706" },
  { name: "MBA", code: "MBA", students: 110, faculty: 9, cohorts: 4, color: "#EA580C" },
];

export default function AdminBranches() {
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<typeof BRANCHES[0] | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Branches Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Manage academic departments, cohorts, and faculty assignments</p>
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>
          + Add Branch
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Branches", value: BRANCHES.length, color: "#0D9488" },
          { label: "Total Faculty", value: BRANCHES.reduce((a, b) => a + b.faculty, 0), color: "#2563EB" },
          { label: "Active Cohorts", value: BRANCHES.reduce((a, b) => a + b.cohorts, 0), color: "#7C3AED" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4 text-center" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {BRANCHES.map(b => (
          <div
            key={b.code}
            className="rounded-2xl overflow-hidden transition-all duration-200"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px -8px ${b.color}30`; e.currentTarget.style.borderColor = `${b.color}40`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
          >
            {/* Header stripe */}
            <div className="px-5 py-4" style={{ background: `${b.color}12`, borderBottom: `1px solid ${b.color}20` }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-black text-sm" style={{ background: b.color }}>
                  {b.code}
                </div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{b.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{b.code} · Active</div>
                </div>
              </div>
            </div>

            <div className="p-5">
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Students", value: b.students },
                  { label: "Faculty", value: b.faculty },
                  { label: "Cohorts", value: b.cohorts },
                ].map(({ label, value }) => (
                  <div key={label} className="text-center">
                    <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)", color: b.color }}>{value}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => { setEditing(b); setShowModal(true); }} className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: `${b.color}12`, color: b.color, border: `1px solid ${b.color}25` }}>
                  Edit
                </button>
                <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>
                  Manage Curriculum
                </button>
                <button className="py-2 px-3 rounded-xl text-xs font-bold" style={{ background: "rgba(220,38,38,0.1)", color: "#DC2626" }}>
                  ✕
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="rounded-3xl p-7 w-full max-w-md" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{editing ? "Edit Branch" : "Add Branch"}</h2>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Branch Name", placeholder: editing?.name ?? "Computer Science Engineering" },
                { label: "Branch Code", placeholder: editing?.code ?? "CSE" },
              ].map(({ label, placeholder }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                  <input defaultValue={placeholder} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Save Branch</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
