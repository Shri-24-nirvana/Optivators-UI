import { useState } from "react";

const CLUBS = [
  { name: "AI & ML Club", members: 342, posts: 28, desc: "Research papers, hackathons, and weekly ML workshops.", color: "#0D9488", tag: "Technical", joined: true },
  { name: "Coding Society", members: 580, posts: 64, desc: "Competitive programming, CP contests, and DSA bootcamps.", color: "#2563EB", tag: "Technical", joined: true },
  { name: "E-Cell VIT", members: 215, posts: 19, desc: "Entrepreneurship, startup pitches, and founder talks.", color: "#D97706", tag: "Entrepreneurship", joined: false },
  { name: "Open Source Club", members: 128, posts: 41, desc: "Contribute to GitHub, GSoC prep, and open-source sprints.", color: "#059669", tag: "Technical", joined: false },
  { name: "HR & Management Club", members: 96, posts: 12, desc: "Case studies, role-plays, and corporate simulations.", color: "#EA580C", tag: "Non-Tech", joined: false },
  { name: "Design & UX Guild", members: 74, posts: 22, desc: "Figma workshops, design critiques, and portfolio reviews.", color: "#7C3AED", tag: "Creative", joined: true },
];

const ANNOUNCEMENTS = [
  { title: "Campus Placement Drive — Infosys", body: "Infosys is visiting campus on Sept 20th for SDE roles. Ensure your profile is 90%+ complete. Eligibility: 7.0+ CGPA, No active backlogs.", time: "2h ago", tag: "Placement", color: "#059669" },
  { title: "Coding Contest — HackVIT Round 2", body: "Round 2 of HackVIT begins this Saturday at 10 AM. Teams of 2-4 students. Register before Sept 12th.", time: "1d ago", tag: "Contest", color: "#2563EB" },
  { title: "Profile Completion Drive — Deadline Sept 15", body: "Ensure your Optivators profile is at least 85% complete before the mega placement drive. This affects recruiter visibility.", time: "2d ago", tag: "Important", color: "#DC2626" },
  { title: "AI Club Weekly — Transformer Architecture Deep Dive", body: "This week's session covers attention mechanisms and positional encoding. Join via Google Meet link in the group.", time: "3d ago", tag: "Event", color: "#D97706" },
];

const FEED = [
  { user: "Priya Sharma", club: "AI & ML Club", action: "shared a paper", content: "Must-read: 'Attention Is All You Need' — Vaswani et al. (2017). Foundation of all modern LLMs. My summary in the comments!", time: "3h ago", likes: 42, comments: 8, avatar: "#0D9488" },
  { user: "Arjun Mehta", club: "Coding Society", action: "posted", content: "Just solved my 500th LeetCode problem! 🎯 Consistency beats intensity. Starting from easy → medium → hard worked perfectly. AMA about DSA prep.", time: "5h ago", likes: 89, comments: 23, avatar: "#2563EB" },
  { user: "Sneha Patel", club: "Design & UX Guild", action: "shared a project", content: "Finished my Figma redesign of the VIT Library app. Focused on reducing cognitive load — check out the Behance link!", time: "1d ago", likes: 31, comments: 11, avatar: "#7C3AED" },
];

export default function Communities() {
  const [activeTab, setActiveTab] = useState("Feed");
  const tabs = ["Feed", "Clubs", "Announcements"];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Communities & Clubs</h1>
        <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>Connect with your campus community, clubs, and announcements</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl w-fit" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className="px-5 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: activeTab === t ? "var(--accent-primary)" : "transparent", color: activeTab === t ? "white" : "var(--text-secondary)" }}>
            {t}
          </button>
        ))}
      </div>

      {activeTab === "Feed" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {FEED.map(({ user, club, action, content, time, likes, comments, avatar }) => (
              <div key={user} className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0" style={{ background: avatar }}>
                    {user.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold" style={{ color: "var(--text-primary)" }}>{user}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{action} in <span style={{ color: "var(--accent-primary)" }}>{club}</span> · {time}</div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>{content}</p>
                <div className="flex gap-4 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                  <button className="flex items-center gap-1.5 text-xs font-semibold transition-colors" style={{ color: "var(--text-muted)" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-primary)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {likes} Likes
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: "var(--text-muted)" }}>
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    {comments} Comments
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Joined Clubs</div>
            <div className="space-y-3">
              {CLUBS.filter(c => c.joined).map(({ name, members, color }) => (
                <div key={name} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-xs" style={{ background: color }}>{name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{name}</div>
                    <div className="text-xs" style={{ color: "var(--text-muted)" }}>{members} members</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Clubs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLUBS.map(({ name, members, posts, desc, color, tag, joined }) => (
            <div key={name} className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0" style={{ background: color }}>{name[0]}</div>
                <div className="flex-1">
                  <div className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{name}</div>
                  <div className="flex gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${color}12`, color }}>{tag}</span>
                  </div>
                </div>
              </div>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>{members} members · {posts} posts/mo</div>
              </div>
              <button className="w-full py-2 rounded-xl text-sm font-bold transition-all" style={{
                background: joined ? "var(--accent-soft)" : `${color}15`,
                color: joined ? "var(--accent-primary)" : color,
                border: `1px solid ${joined ? "rgba(13,148,136,0.3)" : `${color}25`}`,
              }}>
                {joined ? "✓ Joined" : "Join Club"}
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Announcements" && (
        <div className="space-y-4">
          {ANNOUNCEMENTS.map(({ title, body, time, tag, color }) => (
            <div key={title} className="rounded-2xl p-5" style={{ background: "var(--surface-elevated)", border: `1px solid ${color}25`, borderLeftWidth: 4, borderLeftColor: color }}>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: `${color}12`, color }}>{tag}</span>
                  <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{title}</h3>
                </div>
                <div className="text-xs shrink-0" style={{ color: "var(--text-muted)" }}>{time}</div>
              </div>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
