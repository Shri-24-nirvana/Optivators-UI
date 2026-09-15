import { useState } from "react";

const PROMO_HISTORY = [
  { code: "OPT-K2A9-XRVQ", student: "Priya Sharma", email: "priya@ggits.net", package: "DSA & Algorithms Pro", status: "Redeemed", date: "Sep 2, 2026" },
  { code: "OPT-B7F1-MNZK", student: "Arjun Mehta", email: "arjun@ggits.net", package: "System Design Mastery", status: "Redeemed", date: "Sep 3, 2026" },
  { code: "OPT-Q3R8-PLWX", student: "Sneha Patel", email: "sneha@ggits.net", package: "DSA & Algorithms Pro", status: "Unused", date: "Sep 4, 2026" },
  { code: "OPT-Y6T4-CBGJ", student: "Kiran Kumar", email: "kiran@ggits.net", package: "Full Stack Dev Bundle", status: "Redeemed", date: "Sep 5, 2026" },
  { code: "OPT-H2E5-DRST", student: "Divya Krishnan", email: "divya@ggits.net", package: "ML Fundamentals", status: "Unused", date: "Sep 6, 2026" },
];

export default function FacultyPromo() {
  const [showSingle, setShowSingle] = useState(false);
  const [showBulk, setShowBulk] = useState(false);

  const allocated = 60, used = 45;
  const available = allocated - used;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Promo Code Wallet</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Generate and track promo codes for your students</p>
      </div>

      {/* Wallet Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Allocated Credits", value: allocated, color: "#0D9488" },
          { label: "Available to Issue", value: available, color: "#059669" },
          { label: "Already Issued", value: used, color: "#D97706" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-6 text-center" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-4xl font-bold mb-2" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>{label}</div>
            <div className="mt-3 h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
              <div className="h-full rounded-full" style={{ width: `${(value / allocated) * 100}%`, background: color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button onClick={() => setShowSingle(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white" style={{ background: "var(--accent-primary)" }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/></svg>
          Generate Single Promo Code
        </button>
        <button onClick={() => setShowBulk(true)} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold border" style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          Bulk Upload CSV
        </button>
      </div>

      {/* Promo Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Promo Tracking</h3>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--surface-bg)" }}>
              {["Code", "Student", "Email", "Package", "Status", "Date"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROMO_HISTORY.map(({ code, student, email, package: pkg, status, date }) => (
              <tr key={code} className="border-t" style={{ borderColor: "var(--border-subtle)" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td className="px-5 py-3">
                  <span className="font-bold text-xs px-2.5 py-1.5 rounded-lg" style={{ fontFamily: "var(--font-mono)", background: "var(--surface-bg)", color: "var(--accent-primary)", border: "1px solid var(--border-subtle)" }}>{code}</span>
                </td>
                <td className="px-5 py-3 font-medium text-sm" style={{ color: "var(--text-primary)" }}>{student}</td>
                <td className="px-5 py-3 text-xs" style={{ color: "var(--text-muted)" }}>{email}</td>
                <td className="px-5 py-3 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{pkg}</td>
                <td className="px-5 py-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{
                    background: status === "Redeemed" ? "rgba(5,150,105,0.12)" : "rgba(217,119,6,0.12)",
                    color: status === "Redeemed" ? "#059669" : "#D97706",
                  }}>{status}</span>
                </td>
                <td className="px-5 py-3 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Single Code Modal */}
      {showSingle && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowSingle(false)}>
          <div className="rounded-3xl p-7 w-full max-w-md" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Generate Single Promo Code</h2>
              <button onClick={() => setShowSingle(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Student Email Address</label>
                <input type="email" placeholder="student@ggits.net" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Select Course Package</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}>
                  {["DSA & Algorithms Pro", "System Design Mastery", "Full Stack Dev Bundle", "ML Fundamentals", "CRT Complete Pack"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="p-3 rounded-xl" style={{ background: "var(--accent-soft)", border: "1px solid rgba(13,148,136,0.2)" }}>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Available credits after generation: <span style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)", fontWeight: 700 }}>{available - 1}</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowSingle(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowSingle(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Generate & Send</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk CSV Modal */}
      {showBulk && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowBulk(false)}>
          <div className="rounded-3xl p-7 w-full max-w-lg" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Bulk CSV Promo Uploader</h2>
              <button onClick={() => setShowBulk(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-2xl p-10 text-center" style={{ borderColor: "var(--border-strong)" }}>
                <div className="text-3xl mb-3">📋</div>
                <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>Drag & drop your CSV file here</div>
                <div className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>Columns: Name, Email, Roll No, Package Name</div>
                <button className="px-4 py-2 rounded-xl text-sm font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>Browse Files</button>
              </div>

              <div className="p-4 rounded-xl" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
                <div className="text-xs font-bold mb-2" style={{ color: "var(--text-secondary)" }}>CSV Preview (from last upload)</div>
                <div className="space-y-1">
                  {[["Priya Sharma", "priya@ggits.net", "0208CS211047", "DSA Pro"], ["Arjun Mehta", "arjun@ggits.net", "0208CS211034", "System Design"]].map(([n, e, r, p]) => (
                    <div key={r} className="flex gap-3 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                      <span className="w-28 truncate">{n}</span><span className="flex-1 truncate">{e}</span><span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
                <span className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>Auto-send email to students</span>
                <div className="w-10 h-5.5 rounded-full relative" style={{ background: "var(--accent-primary)", width: 40, height: 22 }}>
                  <div className="absolute top-0.5 rounded-full bg-white" style={{ width: 18, height: 18, transform: "translateX(19px)" }} />
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setShowBulk(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowBulk(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Upload & Dispatch</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
