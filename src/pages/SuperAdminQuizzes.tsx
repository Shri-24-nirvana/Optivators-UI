import { useState } from "react";

const DOMAIN_PACKAGES = [
  { name: "Data Structures & Algorithms Pro", category: "CSE Core", courses: 12, graphyId: "GPHY-DSA-001", tags: ["Arrays", "Trees", "Graphs", "DP"], updated: "Sep 1, 2026", color: "#0D9488" },
  { name: "AI & Machine Learning Fundamentals", category: "AIML", courses: 10, graphyId: "GPHY-AIML-002", tags: ["ML", "PyTorch", "Computer Vision"], updated: "Aug 28, 2026", color: "#7C3AED" },
  { name: "Full Stack Web Development", category: "CSE Core", courses: 14, graphyId: "GPHY-FSWD-003", tags: ["React", "Node.js", "PostgreSQL"], updated: "Aug 20, 2026", color: "#2563EB" },
  { name: "Cloud Computing & DevOps", category: "Cloud", courses: 9, graphyId: "GPHY-CLOUD-004", tags: ["AWS", "Docker", "Kubernetes"], updated: "Aug 10, 2026", color: "#059669" },
  { name: "Cybersecurity Fundamentals", category: "Cyber", courses: 8, graphyId: "GPHY-CYBER-005", tags: ["OWASP", "Pen Testing", "Network Security"], updated: "Jul 30, 2026", color: "#DC2626" },
];

const CRT_PACKAGES = [
  { name: "Quantitative Aptitude Master Pack", modules: 18, questions: 1200, updated: "Sep 3, 2026" },
  { name: "Logical Reasoning Complete", modules: 14, questions: 900, updated: "Aug 25, 2026" },
  { name: "Verbal Ability & Communication", modules: 12, questions: 750, updated: "Aug 18, 2026" },
];

const NONTECH_PACKAGES = [
  { name: "Sales & Business Development", modules: 10, questions: 600, updated: "Sep 2, 2026" },
  { name: "HR & People Management", modules: 9, questions: 540, updated: "Aug 22, 2026" },
  { name: "Marketing Analytics", modules: 8, questions: 480, updated: "Aug 12, 2026" },
];

export default function SuperAdminQuizzes() {
  const [activeTab, setActiveTab] = useState("Domain");
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Quizzes & Package Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Manage domain quiz packages, CRT modules, and non-tech test banks</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>
          + Add Package
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        {["Domain", "CRT", "Non-Tech"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: activeTab === t ? "var(--accent-primary)" : "transparent", color: activeTab === t ? "white" : "var(--text-secondary)" }}>
            {t} Packages
          </button>
        ))}
      </div>

      {activeTab === "Domain" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DOMAIN_PACKAGES.map(({ name, category, courses, graphyId, tags, updated, color }) => (
            <div key={name} className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
              <div className="h-2" style={{ background: color }} />
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{name}</div>
                    <span className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: `${color}12`, color }}>{category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3 text-xs" style={{ color: "var(--text-muted)" }}>
                  <span style={{ fontFamily: "var(--font-mono)" }}>{graphyId}</span>
                  <span>·</span>
                  <span>{courses} courses</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-xs" style={{ background: "var(--border-subtle)", color: "var(--text-muted)" }}>{t}</span>)}
                </div>

                <div className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Updated {updated}</div>

                <div className="flex gap-2">
                  <button className="flex-1 py-2 rounded-xl text-xs font-bold" style={{ background: `${color}12`, color, border: `1px solid ${color}25` }}>Edit Package</button>
                  <button className="py-2 px-3 rounded-xl text-xs font-bold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>Sync Graphy</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(activeTab === "CRT" || activeTab === "Non-Tech") && (
        <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-bg)" }}>
                {["Package Name", "Modules", "Questions", "Last Updated", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(activeTab === "CRT" ? CRT_PACKAGES : NONTECH_PACKAGES).map(({ name, modules, questions, updated }) => (
                <tr key={name} className="border-t" style={{ borderColor: "var(--border-subtle)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-5 py-4 font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{name}</td>
                  <td className="px-5 py-4 font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{modules}</td>
                  <td className="px-5 py-4 font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>{questions.toLocaleString()}</td>
                  <td className="px-5 py-4 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{updated}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>Edit</button>
                      <button className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>Replace</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Package Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="rounded-3xl p-7 w-full max-w-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Add / Edit Domain Package</h2>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              {[
                { label: "Package Title", ph: "DSA & Algorithms Pro" },
                { label: "Graphy Product ID", ph: "GPHY-DSA-001" },
              ].map(({ label, ph }) => (
                <div key={label}>
                  <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>{label}</label>
                  <input placeholder={ph} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Category</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}>
                  {["CSE Core", "AIML", "Data Science", "Cloud", "Cyber", "Non-Tech", "CRT"].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Thumbnail Image URL</label>
                <input placeholder="https://cdn.optivators.ai/pkg-dsa.jpg" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Save Package</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
