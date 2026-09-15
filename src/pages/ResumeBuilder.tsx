import { useState } from "react";

const TEMPLATES = [
  { name: "Optivators Classic", desc: "Clean, ATS-optimized single column", preview: "#0D9488" },
  { name: "Modern Two-Column", desc: "Visual sidebar with skill bars", preview: "#2563EB" },
  { name: "Minimal Pro", desc: "Ultra-minimal, typography-first", preview: "#374151" },
  { name: "Creative Edge", desc: "Bold header with accent colours", preview: "#7C3AED" },
];

const SECTIONS = ["Personal Info", "Summary", "Education", "Experience", "Skills", "Projects", "Certifications", "Achievements"];

export default function ResumeBuilder() {
  const [activeTemplate, setActiveTemplate] = useState(0);
  const [showGPA, setShowGPA] = useState(true);
  const [showPhoto, setShowPhoto] = useState(false);
  const [activeSection, setActiveSection] = useState("Personal Info");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Resume Builder</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>AI-powered resume crafted from your 360° profile · Last updated today</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold border" style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            Share Link
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6" style={{ minHeight: "calc(100vh - 220px)" }}>
        {/* Left Controls */}
        <div className="lg:col-span-2 space-y-5">
          {/* Template picker */}
          <div className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Template</h3>
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map(({ name, desc, preview }, idx) => (
                <button
                  key={name}
                  onClick={() => setActiveTemplate(idx)}
                  className="p-3 rounded-xl text-left transition-all"
                  style={{
                    border: `2px solid ${activeTemplate === idx ? preview : "var(--border-subtle)"}`,
                    background: activeTemplate === idx ? `${preview}10` : "var(--surface-bg)",
                  }}
                >
                  <div className="h-16 rounded-lg mb-2 flex items-center justify-center" style={{ background: `${preview}15` }}>
                    <div className="space-y-1 w-10">
                      <div className="h-1 rounded" style={{ background: preview }} />
                      <div className="h-0.5 rounded w-8" style={{ background: `${preview}50` }} />
                      <div className="h-0.5 rounded w-6" style={{ background: `${preview}50` }} />
                    </div>
                  </div>
                  <div className="text-xs font-bold" style={{ color: activeTemplate === idx ? preview : "var(--text-primary)" }}>{name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Section list */}
          <div className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Sections</h3>
            <div className="space-y-1">
              {SECTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => setActiveSection(s)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left transition-colors"
                  style={{
                    background: activeSection === s ? "var(--accent-soft)" : "transparent",
                    color: activeSection === s ? "var(--accent-primary)" : "var(--text-secondary)",
                  }}
                >
                  <span className="text-sm font-medium">{s}</span>
                  {activeSection === s && (
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <h3 className="font-bold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Display Options</h3>
            <div className="space-y-3">
              {[
                { label: "Show GPA / CGPA", state: showGPA, toggle: () => setShowGPA(!showGPA) },
                { label: "Show Photo", state: showPhoto, toggle: () => setShowPhoto(!showPhoto) },
              ].map(({ label, state, toggle }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{label}</span>
                  <button
                    onClick={toggle}
                    className="w-10 h-5.5 rounded-full relative transition-colors"
                    style={{ background: state ? "var(--accent-primary)" : "var(--border-strong)", width: 40, height: 22 }}
                  >
                    <div
                      className="absolute top-0.5 rounded-full bg-white transition-transform"
                      style={{ width: 18, height: 18, transform: state ? "translateX(19px)" : "translateX(2px)" }}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: A4 Preview */}
        <div className="lg:col-span-3">
          <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Live Preview — A4</div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "white",
              boxShadow: "0 20px 60px -16px rgba(0,0,0,0.2)",
              minHeight: 800,
              aspectRatio: "210/297",
            }}
          >
            {/* Resume content */}
            <div style={{ fontFamily: "DM Sans, sans-serif", color: "#0F172A", height: "100%" }}>
              {/* Header */}
              <div style={{ background: TEMPLATES[activeTemplate].preview, padding: "32px 36px 28px", color: "white" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <div style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 4 }}>Rahul Kumar</div>
                    <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 8 }}>Software Engineer · B.Tech CSE · Gyan Ganga Institute of Technology and Sciences (GGITS)</div>
                    <div className="flex flex-wrap gap-3" style={{ fontSize: 11, opacity: 0.8 }}>
                      <span>📧 rahul.kumar@ggits.net</span>
                      <span>📱 +91 98765 43210</span>
                      <span>🔗 linkedin.com/in/rahulkumar-ggits</span>
                      <span>💻 github.com/rahulkumar-dev</span>
                    </div>
                  </div>
                  {showPhoto && (
                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>RK</div>
                  )}
                </div>
              </div>

              <div style={{ padding: "24px 36px", fontSize: 12, lineHeight: 1.6 }}>
                {/* Summary */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: TEMPLATES[activeTemplate].preview, marginBottom: 6, borderBottom: `2px solid ${TEMPLATES[activeTemplate].preview}`, paddingBottom: 4 }}>Summary</div>
                  <p style={{ color: "#374151" }}>Final-year Computer Science student at Gyan Ganga Institute of Technology and Sciences (GGITS) with 8.9 CGPA. Passionate about scalable system design, distributed computing, and full-stack development. Seeking SDE roles at high-growth technology companies.</p>
                </div>

                {/* Education */}
                {showGPA && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: TEMPLATES[activeTemplate].preview, marginBottom: 8, borderBottom: `2px solid ${TEMPLATES[activeTemplate].preview}`, paddingBottom: 4 }}>Education</div>
                    <div className="flex justify-between" style={{ marginBottom: 4 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>B.Tech Computer Science Engineering</div>
                        <div style={{ color: "#6B7280" }}>Gyan Ganga Institute of Technology and Sciences (GGITS) · Batch 2021–2025</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: 700, color: TEMPLATES[activeTemplate].preview, fontFamily: "JetBrains Mono, monospace" }}>CGPA: 8.9</div>
                        <div style={{ color: "#6B7280", fontSize: 11 }}>Expected May 2025</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Experience */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: TEMPLATES[activeTemplate].preview, marginBottom: 8, borderBottom: `2px solid ${TEMPLATES[activeTemplate].preview}`, paddingBottom: 4 }}>Experience</div>
                  <div style={{ marginBottom: 12 }}>
                    <div className="flex justify-between" style={{ marginBottom: 3 }}>
                      <div style={{ fontWeight: 700, fontSize: 13 }}>Software Engineering Intern</div>
                      <div style={{ color: "#6B7280", fontFamily: "JetBrains Mono, monospace", fontSize: 11 }}>May–Aug 2024</div>
                    </div>
                    <div style={{ color: "#6B7280", marginBottom: 4 }}>Infosys · Bangalore</div>
                    <ul style={{ paddingLeft: 16, color: "#374151" }}>
                      <li>Built REST APIs serving 50K+ daily requests using Node.js & Express</li>
                      <li>Optimized PostgreSQL query performance by 40% through indexing</li>
                    </ul>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: TEMPLATES[activeTemplate].preview, marginBottom: 8, borderBottom: `2px solid ${TEMPLATES[activeTemplate].preview}`, paddingBottom: 4 }}>Technical Skills</div>
                  <div className="flex flex-wrap gap-1">
                    {["Python", "Java", "TypeScript", "React", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS", "Git"].map(s => (
                      <span key={s} style={{ padding: "2px 8px", borderRadius: 4, background: `${TEMPLATES[activeTemplate].preview}15`, color: TEMPLATES[activeTemplate].preview, fontSize: 11, fontWeight: 600 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
