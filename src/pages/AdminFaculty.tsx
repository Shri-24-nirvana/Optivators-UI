import { useState } from "react";

const FACULTY = [
  { name: "Dr. Anitha Rajan", email: "anitha.rajan@vit.ac.in", dept: "CSE", designation: "Head of Department", subtree: 12, students: 280, promos: 150, used: 98, perms: ["branches:manage", "cohortgroups:manage", "cohorts:manage", "promos:allocate"] },
  { name: "Prof. Karthik Menon", email: "karthik.menon@vit.ac.in", dept: "CSE", designation: "Senior Professor", subtree: 4, students: 120, promos: 60, used: 45, perms: ["cohorts:manage", "promos:allocate"] },
  { name: "Dr. Preethi Sundaram", email: "preethi@vit.ac.in", dept: "AIML", designation: "Associate Professor", subtree: 6, students: 95, promos: 40, used: 28, perms: ["branches:manage", "cohorts:manage", "promos:allocate"] },
  { name: "Prof. Ravi Shankar", email: "ravi.s@vit.ac.in", dept: "IT", designation: "Assistant Professor", subtree: 0, students: 60, promos: 20, used: 18, perms: ["promos:allocate"] },
  { name: "Dr. Lakshmi Narayan", email: "lakshmi.n@vit.ac.in", dept: "DS", designation: "Senior Professor", subtree: 3, students: 75, promos: 35, used: 22, perms: ["cohortgroups:manage", "cohorts:manage", "promos:allocate"] },
];

const PERM_COLORS: Record<string, string> = {
  "branches:manage": "#0D9488",
  "cohortgroups:manage": "#2563EB",
  "cohorts:manage": "#7C3AED",
  "promos:allocate": "#D97706",
};

type Faculty = typeof FACULTY[0];

function OrgTree() {
  return (
    <div className="p-6 overflow-auto">
      <div className="flex flex-col items-center">
        {/* Root */}
        <div className="rounded-2xl p-4 text-center" style={{ background: "linear-gradient(135deg, #0D9488, #0f766e)", color: "white", width: 200 }}>
          <div className="font-bold text-sm">Dr. Anitha Rajan</div>
          <div className="text-xs opacity-75 mt-0.5">Head of Department · CSE</div>
        </div>
        <div className="w-px h-8" style={{ background: "var(--border-strong)" }} />

        {/* Level 2 */}
        <div className="flex gap-8">
          {[
            { name: "Prof. Karthik Menon", role: "Senior Professor", students: 120 },
            { name: "Dr. Preethi Sundaram", role: "Associate Prof · AIML", students: 95 },
          ].map(({ name, role, students }) => (
            <div key={name} className="flex flex-col items-center">
              <div className="rounded-xl p-4 text-center" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)", width: 180 }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mx-auto mb-2" style={{ background: "#2563EB" }}>
                  {name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="font-semibold text-xs" style={{ color: "var(--text-primary)" }}>{name}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{role}</div>
                <div className="text-xs mt-1 font-bold" style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>{students} students</div>
              </div>
              <div className="w-px h-6" style={{ background: "var(--border-strong)" }} />
              {/* Level 3 */}
              <div className="rounded-lg p-3 text-center" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)", width: 160 }}>
                <div className="font-medium text-xs" style={{ color: "var(--text-secondary)" }}>Prof. Ravi Shankar</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Assistant Prof</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminFaculty() {
  const [view, setView] = useState<"table" | "tree">("table");
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = FACULTY.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()) || f.dept.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Faculty Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Hierarchical faculty tree · {FACULTY.length} faculty members provisioned</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>
          + Provision Faculty
        </button>
      </div>

      {/* Action bar */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-sm px-4 py-2.5 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-strong)" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--text-muted)" }}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search faculty…" className="flex-1 text-sm outline-none bg-transparent" style={{ color: "var(--text-primary)" }} />
        </div>
        {/* View toggle */}
        <div className="flex rounded-xl p-1" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          {([["table", "Table View"], ["tree", "Org Tree"]] as const).map(([v, label]) => (
            <button key={v} onClick={() => setView(v)} className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style={{ background: view === v ? "var(--accent-primary)" : "transparent", color: view === v ? "white" : "var(--text-secondary)" }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {view === "tree" ? (
        <div className="rounded-2xl overflow-auto" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", minHeight: 400 }}>
          <OrgTree />
        </div>
      ) : (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-bg)" }}>
                {["Faculty", "Department", "Designation", "Subtree", "Students", "Promos", "Permissions", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.email} className="border-t" style={{ borderColor: "var(--border-subtle)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{f.name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{f.email}</div>
                  </td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{f.dept}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-secondary)" }}>{f.designation}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{f.subtree}</td>
                  <td className="px-4 py-3 text-xs font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{f.students}</td>
                  <td className="px-4 py-3">
                    <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      <span style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{f.used}</span>/{f.promos} used
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {f.perms.map(p => (
                        <span key={p} className="px-1.5 py-0.5 rounded text-xs font-bold" style={{ background: `${PERM_COLORS[p]}12`, color: PERM_COLORS[p], fontSize: 10 }}>
                          {p.replace(":", ":")}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Provision Modal */}
      {showModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowModal(false)}>
            <div className="rounded-3xl p-7 w-full max-w-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Provision Faculty Member</h2>
                <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}>✕</button>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Full Name", placeholder: "Dr. Firstname Lastname" },
                  { label: "Email Address", placeholder: "faculty@vit.ac.in" },
                ].map(({ label, placeholder }) => (
                  <div key={label}>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                    <input placeholder={placeholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}
                      onFocus={e => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
                      onBlur={e => (e.currentTarget.style.borderColor = "var(--border-strong)")} />
                  </div>
                ))}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Department</label>
                    <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}>
                      {["CSE", "IT", "AIML", "DS", "Mech", "MBA"].map(d => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Initial Promo Credits</label>
                    <input type="number" placeholder="50" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-3" style={{ color: "var(--text-secondary)" }}>Permissions</label>
                  <div className="space-y-2">
                    {Object.entries(PERM_COLORS).map(([perm, color]) => (
                      <label key={perm} className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" />
                        <span className="px-2.5 py-1 rounded text-xs font-bold" style={{ background: `${color}12`, color }}>{perm}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Send Invite & Provision</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
