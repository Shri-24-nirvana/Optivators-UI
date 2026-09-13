import { useState } from "react";

const FACULTY_ALLOCATIONS = [
  { name: "Dr. Anitha Rajan", dept: "CSE", allocated: 150, used: 98, remaining: 52 },
  { name: "Prof. Karthik Menon", dept: "CSE", allocated: 60, used: 45, remaining: 15 },
  { name: "Dr. Preethi Sundaram", dept: "AIML", allocated: 40, used: 28, remaining: 12 },
  { name: "Prof. Ravi Shankar", dept: "IT", allocated: 20, used: 18, remaining: 2 },
  { name: "Dr. Lakshmi Narayan", dept: "DS", allocated: 35, used: 22, remaining: 13 },
];

export default function AdminPromo() {
  const [showModal, setShowModal] = useState(false);

  const totalAllocated = 400;
  const distributed = FACULTY_ALLOCATIONS.reduce((a, f) => a + f.allocated, 0);
  const redeemed = FACULTY_ALLOCATIONS.reduce((a, f) => a + f.used, 0);
  const available = totalAllocated - distributed;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Promo Allocations & Wallet</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Manage promo credit distribution to faculty members</p>
        </div>
      </div>

      {/* Wallet Summary Card */}
      <div
        className="rounded-3xl p-7 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D9488 0%, #0f766e 60%, #134e4a 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)" }} />
        <div className="relative">
          <div className="text-sm font-bold uppercase tracking-widest text-teal-200 mb-4" style={{ fontFamily: "var(--font-mono)" }}>College Promo Wallet — VIT Vellore</div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Credits Purchased", value: totalAllocated, sub: "Total pool" },
              { label: "Distributed to Faculty", value: distributed, sub: "Across 5 faculty" },
              { label: "Redeemed by Students", value: redeemed, sub: "Active redemptions" },
              { label: "Available Balance", value: available, sub: "Unallocated" },
            ].map(({ label, value, sub }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>{value}</div>
                <div className="text-sm font-semibold text-teal-100">{label}</div>
                <div className="text-xs text-teal-200/70 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>

          {/* Usage bar */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-teal-100 mb-2">
              <span>Distribution Progress</span>
              <span style={{ fontFamily: "var(--font-mono)" }}>{Math.round((distributed / totalAllocated) * 100)}% allocated</span>
            </div>
            <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.2)" }}>
              <div className="h-full rounded-full" style={{ width: `${(redeemed / totalAllocated) * 100}%`, background: "white" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Faculty Allocation Table */}
      <div className="rounded-2xl overflow-hidden" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Faculty Allocation Table</h3>
          <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>
            + Allocate Credits
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--surface-bg)" }}>
              {["Faculty", "Department", "Allocated", "Used", "Remaining", "Usage Bar", "Action"].map(h => (
                <th key={h} className="px-5 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {FACULTY_ALLOCATIONS.map(f => {
              const pct = Math.round((f.used / f.allocated) * 100);
              const isLow = f.remaining <= 5;
              return (
                <tr key={f.name} className="border-t" style={{ borderColor: "var(--border-subtle)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <td className="px-5 py-4">
                    <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{f.name}</div>
                  </td>
                  <td className="px-5 py-4 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{f.dept}</td>
                  <td className="px-5 py-4 font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>{f.allocated}</td>
                  <td className="px-5 py-4 font-bold" style={{ fontFamily: "var(--font-mono)", color: "#059669" }}>{f.used}</td>
                  <td className="px-5 py-4">
                    <span className="font-bold" style={{ fontFamily: "var(--font-mono)", color: isLow ? "#DC2626" : "var(--accent-primary)" }}>
                      {f.remaining}
                    </span>
                    {isLow && <span className="ml-1 text-xs px-1.5 py-0.5 rounded" style={{ background: "rgba(220,38,38,0.12)", color: "#DC2626" }}>Low</span>}
                  </td>
                  <td className="px-5 py-4 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                        <div className="h-full rounded-full" style={{ width: `${pct}%`, background: pct > 80 ? "#D97706" : "var(--accent-primary)" }} />
                      </div>
                      <span className="text-xs w-8 text-right" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{pct}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <button onClick={() => setShowModal(true)} className="px-3 py-1.5 rounded-xl text-xs font-bold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>
                      Allocate
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="rounded-3xl p-7 w-full max-w-md" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>Allocate Promo Credits</h2>
              <button onClick={() => setShowModal(false)} style={{ color: "var(--text-muted)" }}>✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Select Faculty Member</label>
                <select className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}>
                  {FACULTY_ALLOCATIONS.map(f => <option key={f.name}>{f.name} ({f.dept})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Number of Promo Credits</label>
                <input type="number" placeholder="25" className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Reason / Note</label>
                <textarea placeholder="Semester 6 allocation for Alpha Batch…" rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }} />
              </div>
              <div className="p-4 rounded-xl" style={{ background: "rgba(13,148,136,0.08)", border: "1px solid rgba(13,148,136,0.2)" }}>
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Available balance after allocation: <span className="font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{available - 25} credits</span></div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold border text-sm" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "var(--accent-primary)" }}>Confirm Allocation</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
