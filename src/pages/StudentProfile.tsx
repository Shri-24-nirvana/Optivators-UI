import { AnimatedCircularProgressBar } from "@/registry/magicui/animated-circular-progress-bar";

const RADAR_AXES = ["Technical", "Coding", "Aptitude", "Reasoning", "English", "Problem\nSolving"];
const RADAR_VALUES = [0.88, 0.75, 0.82, 0.90, 0.70, 0.85];

function RadarChart() {
  const cx = 160, cy = 160, r = 110;
  const n = RADAR_AXES.length;
  const points = RADAR_VALUES.map((v, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + v * r * Math.cos(angle), y: cy + v * r * Math.sin(angle) };
  });
  const gridPts = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const labelPts = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + (r + 24) * Math.cos(angle), y: cy + (r + 24) * Math.sin(angle) };
  });
  const polyPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 320 320" className="w-full" style={{ maxHeight: 280 }}>
      {[0.25, 0.5, 0.75, 1].map(s => (
        <polygon key={s}
          points={gridPts.map(p => `${cx + (p.x - cx) * s},${cy + (p.y - cy) * s}`).join(" ")}
          fill="none" stroke="var(--border-subtle)" strokeWidth={s === 1 ? 1 : 0.75}
        />
      ))}
      {gridPts.map((p, i) => <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="var(--border-subtle)" strokeWidth="0.75" />)}
      <path d={polyPath} fill="rgba(13,148,136,0.15)" stroke="#0D9488" strokeWidth="2.5" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="5" fill="#0D9488" stroke="var(--surface-elevated)" strokeWidth="2" />
      ))}
      {labelPts.map((p, i) => (
        <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle"
          style={{ fontSize: 11, fill: "var(--text-secondary)", fontFamily: "var(--font-sans)", fontWeight: 600 }}>
          {RADAR_AXES[i].split("\n").map((line, li) => (
            <tspan key={li} x={p.x} dy={li === 0 ? 0 : 13}>{line}</tspan>
          ))}
        </text>
      ))}
    </svg>
  );
}

function CircleProgress({ value, size = 68, color = "#0D9488", label }: { value: number; size?: number; color?: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2 group transition-transform duration-200 hover:scale-105">
      <AnimatedCircularProgressBar
        value={value}
        size={size}
        strokeWidth={6}
        gaugePrimaryColor={color}
        gaugeSecondaryColor="var(--border-subtle)"
      />
      <span
        style={{
          fontSize: 11,
          color: "var(--text-secondary)",
          textAlign: "center",
          fontFamily: "var(--font-sans)",
          fontWeight: 600,
        }}
        className="leading-tight line-clamp-1"
      >
        {label}
      </span>
    </div>
  );
}

export default function StudentProfile() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div
        className="rounded-3xl p-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0D9488 0%, #2563EB 50%, #7C3AED 100%)" }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
        <div className="relative flex flex-col lg:flex-row items-start gap-8">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-white font-bold text-3xl"
              style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", border: "3px solid rgba(255,255,255,0.4)" }}
            >
              RK
            </div>
            <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full" style={{ background: "#34D399", border: "2px solid white" }} />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="text-3xl font-extrabold text-white mb-1">Rahul Kumar</div>
            <div className="text-white/80 mb-1">VIT Vellore · Computer Science Engineering</div>
            <div className="flex flex-wrap gap-3 text-sm text-white/70 mb-4">
              <span style={{ fontFamily: "var(--font-mono)" }}>Roll: 21BCE1240</span>
              <span>·</span>
              <span>B.Tech · 3rd Year</span>
              <span>·</span>
              <span>Batch 2021–2025</span>
              <span>·</span>
              <span>Sem 6</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.2)", color: "white" }}>Tech Track</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.15)", color: "white/80" }}>📧 rahul.kumar@vit.ac.in</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.15)", color: "white" }}>📱 +91 98765 43210</span>
            </div>
          </div>

          {/* CGPA + Rank gauges */}
          <div className="flex gap-6 shrink-0">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-mono)" }}>8.9</div>
              <div className="text-xs text-white/70 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>CGPA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-mono)" }}>#14</div>
              <div className="text-xs text-white/70 uppercase tracking-widest" style={{ fontFamily: "var(--font-mono)" }}>Platform Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Placement Readiness Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Placement Readiness", value: "92%", color: "#34D399" },
          { label: "Mock Interviews", value: "6", color: "#38BDF8" },
          { label: "Profile Completion", value: "95%", color: "#2DD4BF" },
          { label: "Profile Views", value: "240", color: "#C084FC" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-2xl p-5 text-center transition-all duration-200 dark:border-white/15 dark:hover:border-white/30 dark:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-3xl font-bold mb-1 dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Radar + Circle Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-4" style={{ color: "var(--text-primary)" }}>Cognitive Radar — Spider Web Analysis</h3>
          <RadarChart />
        </div>
        <div className="lg:col-span-2 rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-6" style={{ color: "var(--text-primary)" }}>Core Competency Scores</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Technical", value: 88, color: "#2DD4BF" },
              { label: "Coding", value: 75, color: "#38BDF8" },
              { label: "Aptitude", value: 82, color: "#34D399" },
              { label: "Reasoning", value: 90, color: "#C084FC" },
              { label: "English", value: 70, color: "#FBBF24" },
              { label: "Problem Solving", value: 85, color: "#F472B6" },
            ].map(({ label, value, color }) => (
              <CircleProgress key={label} label={label} value={value} color={color} />
            ))}
          </div>
        </div>
      </div>

      {/* Skills Showcase */}
      <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Skills Showcase</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Technical Skills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Technical Skills</div>
            <div className="flex flex-wrap gap-2">
              {["Python", "React", "Java", "Docker", "SQL", "TypeScript", "Node.js", "Redis"].map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-xl text-xs font-semibold dark:border-teal-500/30" style={{ background: "rgba(13,148,136,0.1)", color: "var(--accent-primary)", border: "1px solid rgba(13,148,136,0.2)" }}>{skill}</span>
              ))}
            </div>
          </div>
          {/* Non-Technical Skills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Non-Technical Skills</div>
            <div className="flex flex-wrap gap-2">
              {["Communication", "Leadership", "Business Analysis", "Figma", "Project Mgmt"].map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-xl text-xs font-semibold dark:border-orange-500/30" style={{ background: "rgba(234,88,12,0.1)", color: "#FB923C", border: "1px solid rgba(234,88,12,0.2)" }}>{skill}</span>
              ))}
            </div>
          </div>
          {/* Validated Skills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Validated Skills</div>
            <div className="space-y-2">
              {[
                { skill: "React.js", level: "Advanced", pct: 90 },
                { skill: "Python", level: "Intermediate", pct: 70 },
                { skill: "System Design", level: "Beginner", pct: 45 },
              ].map(({ skill, level, pct }) => (
                <div key={skill} className="p-3 rounded-xl dark:border-white/15" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold" style={{ color: "var(--text-primary)" }}>{skill}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded dark:border dark:border-white/10" style={{
                      background: level === "Advanced" ? "rgba(5,150,105,0.15)" : level === "Intermediate" ? "rgba(217,119,6,0.15)" : "rgba(220,38,38,0.15)",
                      color: level === "Advanced" ? "#34D399" : level === "Intermediate" ? "#FBBF24" : "#F87171",
                    }}>✓ {level}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden dark:bg-white/10" style={{ background: "var(--border-subtle)" }}>
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--accent-primary)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interview Performance */}
      <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Interview Performance Breakdown</h3>
        <div className="mb-5">
          {[
            { label: "Overall AI Readiness Score", value: 84, color: "#2DD4BF" },
            { label: "Confidence Score", value: 78, color: "#38BDF8" },
            { label: "Body Language & Presence", value: 72, color: "#C084FC" },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center gap-4 mb-3">
              <div className="w-44 text-xs font-semibold shrink-0" style={{ color: "var(--text-secondary)" }}>{label}</div>
              <div className="flex-1 h-2.5 rounded-full overflow-hidden dark:bg-white/10" style={{ background: "var(--border-subtle)" }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
              </div>
              <div className="w-10 text-xs font-bold text-right" style={{ fontFamily: "var(--font-mono)", color }}>{value}%</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { label: "AI Technical", value: 85, color: "#2DD4BF" },
            { label: "Communication", value: 78, color: "#38BDF8" },
            { label: "Behavioural", value: 82, color: "#34D399" },
            { label: "Leadership", value: 70, color: "#C084FC" },
            { label: "Analytics", value: 75, color: "#FBBF24" },
            { label: "Problem Solving", value: 90, color: "#F472B6" },
            { label: "HR Rating", value: 88, color: "#FB923C" },
            { label: "AI Tools", value: 80, color: "#22D3EE" },
          ].map(({ label, value, color }) => (
            <CircleProgress key={label} label={label} value={value} color={color} size={64} />
          ))}
        </div>
      </div>

      {/* Experience + Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Experience */}
        <div className="rounded-2xl p-6" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Experience</h3>
          <div className="space-y-5">
            {[
              {
                company: "Infosys",
                role: "Software Engineering Intern",
                duration: "May 2024 – Aug 2024",
                ongoing: false,
                desc: ["Built REST APIs with Node.js and Express", "Optimized PostgreSQL query performance by 40%"],
              },
              {
                company: "StartupXYZ",
                role: "Frontend Developer",
                duration: "Jan 2024 – Present",
                ongoing: true,
                desc: ["Developed React dashboards for 5K+ users", "Implemented real-time data with WebSockets"],
              },
            ].map(({ company, role, duration, ongoing, desc }) => (
              <div key={company} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: "var(--accent-primary)" }}>
                  {company[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{role}</div>
                  <div className="flex items-center gap-2 text-xs mb-2" style={{ color: "var(--text-muted)" }}>
                    {company} · {duration}
                    {ongoing && <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#34D399" }} /> Ongoing</span>}
                  </div>
                  <ul className="space-y-1">
                    {desc.map(d => <li key={d} className="text-xs" style={{ color: "var(--text-secondary)" }}>· {d}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="rounded-2xl p-6" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Projects</h3>
          <div className="space-y-4">
            {[
              { title: "Optivators Clone", stack: ["React", "Node.js", "PostgreSQL"], desc: "Full-stack EdTech platform with assessment engine", gh: true, live: true },
              { title: "AI Resume Analyzer", stack: ["Python", "FastAPI", "OpenAI"], desc: "NLP-powered resume scoring and recommendation system", gh: true, live: false },
              { title: "DSA Visualizer", stack: ["TypeScript", "D3.js"], desc: "Interactive algorithm visualization tool", gh: true, live: true },
            ].map(({ title, stack, desc, gh, live }) => (
              <div key={title} className="p-4 rounded-xl" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
                <div className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{title}</div>
                <div className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>{desc}</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {stack.map(s => <span key={s} className="px-2 py-0.5 rounded text-xs" style={{ background: "var(--border-subtle)", color: "var(--text-muted)" }}>{s}</span>)}
                  <div className="ml-auto flex gap-2">
                    {gh && <button className="text-xs font-semibold px-2 py-0.5 rounded" style={{ color: "var(--accent-primary)", background: "var(--accent-soft)" }}>GitHub</button>}
                    {live && <button className="text-xs font-semibold px-2 py-0.5 rounded" style={{ color: "#2563EB", background: "rgba(37,99,235,0.1)" }}>Live →</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
