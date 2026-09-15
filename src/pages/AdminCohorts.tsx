import { useState } from "react";

const COHORTS = [
  { name: "Alpha Batch – CSE 2021-25", branch: "CSE", degree: "B.Tech", batch: "2021-25", students: 180, mentor: "Prof. Karthik Menon", packages: 8, status: "Active" },
  { name: "Pioneer Batch – IT 2020-24", branch: "IT", degree: "B.Tech", batch: "2020-24", students: 120, mentor: "Dr. Preethi Sundaram", packages: 6, status: "Active" },
  { name: "Beta Batch – CSE 2022-26", branch: "CSE", degree: "B.Tech", batch: "2022-26", students: 200, mentor: "Prof. Ravi Shankar", packages: 5, status: "Active" },
  { name: "AIML Cohort 2021", branch: "AIML", degree: "B.Tech", batch: "2021-25", students: 90, mentor: "Dr. Anitha Rajan", packages: 7, status: "Active" },
  { name: "MBA Management 2022", branch: "MBA", degree: "MBA", batch: "2022-24", students: 55, mentor: "Dr. Lakshmi Narayan", packages: 4, status: "Active" },
  { name: "Gamma Batch – CSE 2023-27", branch: "CSE", degree: "B.Tech", batch: "2023-27", students: 210, mentor: "Prof. Karthik Menon", packages: 3, status: "Setting Up" },
];

export default function AdminCohorts() {
  const [showModal, setShowModal] = useState(false);
  const [showAssign, setShowAssign] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Cohorts Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Create, assign, and track student cohort groups</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>
          + Create Cohort
        </button>
      </div>

      {/* Cohort Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COHORTS.map(({ name, branch, degree, batch, students, mentor, packages, status }) => (
          <div key={name} className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{name}</h3>
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>{branch}</span>
                  <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: "var(--border-subtle)", color: "var(--text-muted)" }}>{degree}</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{
                background: status === "Active" ? "rgba(5,150,105,0.12)" : "rgba(217,119,6,0.12)",
                color: status === "Active" ? "#059669" : "#D97706",
              }}>{status}</span>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { label: "Enrolled Students", value: students, mono: true, color: "var(--accent-primary)" },
                { label: "Linked Packages", value: packages, mono: true, color: "var(--text-primary)" },
                { label: "Mentor / Faculty", value: mentor, mono: false, color: "var(--text-secondary)" },
              ].map(({ label, value, mono, color }) => (
                <div key={label} className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--text-muted)" }}>{label}</span>
                  <span style={{ fontFamily: mono ? "var(--font-mono)" : "var(--font-sans)", color, fontWeight: 600 }}>{value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowAssign(true)} className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>
                Assign Students
              </button>
              <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Cohort Groups by Academic Year */}
      <div className="rounded-2xl p-6" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Cohort Groups by Academic Year & Degree</h3>
        <div className="space-y-4">
          {[
            { year: "B.Tech 2021-25 Batch", cohorts: ["Alpha Batch – CSE", "Pioneer Batch – IT", "AIML Cohort 2021"], total: 390 },
            { year: "B.Tech 2022-26 Batch", cohorts: ["Beta Batch – CSE", "DS Cohort 2022"], total: 200 },
            { year: "B.Tech 2023-27 Batch", cohorts: ["Gamma Batch – CSE", "IT Fresh 2023"], total: 210 },
            { year: "MBA 2022-24 Batch", cohorts: ["MBA Management 2022"], total: 55 },
          ].map(({ year, cohorts, total }) => (
            <div key={year} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
              <div className="flex-1">
                <div className="font-semibold text-sm mb-1.5" style={{ color: "var(--text-primary)" }}>{year}</div>
                <div className="flex flex-wrap gap-1">
                  {cohorts.map(c => <span key={c} className="px-2 py-0.5 rounded text-xs" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>{c}</span>)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{total}</div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>students</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assign Modal */}
      {showAssign && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowAssign(false)}>
          <div className="rounded-3xl p-7 w-full max-w-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Assign Students to Cohort</h2>
              <button onClick={() => setShowAssign(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Search & Add Student</label>
                <input placeholder="Search by name or roll number…" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Or Bulk Upload via CSV</label>
                <div className="border-2 border-dashed rounded-xl p-8 text-center" style={{ borderColor: "var(--border-strong)" }}>
                  <div className="text-sm" style={{ color: "var(--text-muted)" }}>Drag & drop CSV file here</div>
                  <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>Format: Name, Roll No, Email per row</div>
                  <button className="mt-3 px-4 py-2 rounded-xl text-xs font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>Browse Files</button>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowAssign(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowAssign(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Confirm Assignment</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="rounded-3xl p-7 w-full max-w-md" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Create Cohort</h2>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              {[{ label: "Cohort Name", ph: "Alpha Batch – CSE 2024" }, { label: "Mentor / Faculty Email", ph: "faculty@ggits.net" }].map(({ label, ph }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                  <input placeholder={ph} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
                </div>
              ))}
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Create Cohort</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
