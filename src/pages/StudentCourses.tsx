const COURSES = [
  { title: "Full Stack Development with React & Node.js", instructor: "Dr. Arun Krishnan", progress: 72, chapter: "Chapter 14: Authentication Flows", chapters: 22, enrolled: "Mar 2024", thumbnail: "#0D9488", tags: ["React", "Node.js", "MongoDB"] },
  { title: "Data Structures & Algorithms in Java", instructor: "Prof. Meera Iyer", progress: 55, chapter: "Chapter 8: Binary Trees", chapters: 20, enrolled: "Jan 2024", thumbnail: "#2563EB", tags: ["Java", "DSA", "LeetCode"] },
  { title: "Machine Learning Fundamentals", instructor: "Dr. Sanjay Gupta", progress: 35, chapter: "Chapter 5: Linear Regression", chapters: 18, enrolled: "Apr 2024", thumbnail: "#7C3AED", tags: ["Python", "scikit-learn", "ML"] },
  { title: "System Design for SDE Interviews", instructor: "Rahul Jain", progress: 90, chapter: "Chapter 17: Caching Strategies", chapters: 18, enrolled: "Feb 2024", thumbnail: "#059669", tags: ["Architecture", "Scalability"] },
  { title: "SQL & Database Engineering", instructor: "Prof. Anjali Sharma", progress: 100, chapter: "Completed!", chapters: 12, enrolled: "Dec 2023", thumbnail: "#D97706", tags: ["SQL", "PostgreSQL", "Indexing"] },
  { title: "Cloud Computing with AWS", instructor: "Vikram Nair", progress: 20, chapter: "Chapter 3: EC2 & VPC", chapters: 16, enrolled: "May 2024", thumbnail: "#DC2626", tags: ["AWS", "S3", "Lambda"] },
];

export default function StudentCourses() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>My Courses</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>LMS-synced from Graphy · 6 enrolled, 1 completed</p>
        </div>
        <div className="flex gap-2">
          {["All", "In Progress", "Completed"].map(f => (
            <button key={f} className="px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: f === "All" ? "var(--accent-soft)" : "var(--surface-elevated)", color: f === "All" ? "var(--accent-primary)" : "var(--text-secondary)", border: "1px solid var(--border-subtle)" }}>{f}</button>
          ))}
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Enrolled", value: "6", color: "#0D9488" },
          { label: "In Progress", value: "5", color: "#2563EB" },
          { label: "Completed", value: "1", color: "#059669" },
          { label: "Avg Progress", value: "62%", color: "#D97706" },
        ].map(({ label, value, color }) => (
          <div key={label} className="rounded-xl p-4 text-center" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>{label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {COURSES.map(({ title, instructor, progress, chapter, chapters, enrolled, thumbnail, tags }) => (
          <div
            key={title}
            className="rounded-2xl overflow-hidden transition-all duration-200"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 32px -8px ${thumbnail}30`; e.currentTarget.style.borderColor = `${thumbnail}40`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
          >
            {/* Thumbnail */}
            <div className="relative h-36" style={{ background: `linear-gradient(135deg, ${thumbnail}25, ${thumbnail}10)` }}>
              {progress === 100 && (
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ background: "#059669" }}>✓ Completed</div>
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-black opacity-10" style={{ color: thumbnail, fontFamily: "var(--font-mono)" }}>{progress}%</div>
              </div>
              {/* Chapter indicator */}
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)", color: "rgba(255,255,255,0.9)" }}>
                {chapter}
              </div>
            </div>

            <div className="p-5">
              <h3 className="font-bold text-sm mb-1 leading-snug" style={{ color: "var(--text-primary)" }}>{title}</h3>
              <p className="text-xs mb-3" style={{ color: "var(--text-muted)" }}>{instructor} · {chapters} chapters · Enrolled {enrolled}</p>

              <div className="flex flex-wrap gap-1 mb-4">
                {tags.map(t => <span key={t} className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: `${thumbnail}12`, color: thumbnail }}>{t}</span>)}
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: "var(--text-muted)" }}>Course Progress</span>
                  <span style={{ fontFamily: "var(--font-mono)", color: thumbnail }}>{progress}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: thumbnail }} />
                </div>
              </div>

              <button
                className="w-full py-2.5 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                style={{ background: `${thumbnail}15`, color: thumbnail, border: `1px solid ${thumbnail}25` }}
              >
                {progress === 100 ? "Review Course" : "Resume Learning"} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
