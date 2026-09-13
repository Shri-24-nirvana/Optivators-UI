import { useState, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import GithubGraph, { GithubContribution, GithubGraphVariant } from "@/components/ui/GithubGraph";

const GROWTH_DATA = [
  { month: "Jan", students: 980 }, { month: "Feb", students: 1050 }, { month: "Mar", students: 1120 },
  { month: "Apr", students: 1180 }, { month: "May", students: 1220 }, { month: "Jun", students: 1280 },
  { month: "Jul", students: 1310 }, { month: "Aug", students: 1360 }, { month: "Sep", students: 1390 },
  { month: "Oct", students: 1420 }, { month: "Nov", students: 1440 }, { month: "Dec", students: 1450 },
];

const BRANCH_PERF = [
  { branch: "CSE", score: 7.8 }, { branch: "IT", score: 7.4 }, { branch: "AIML", score: 8.1 },
  { branch: "DS", score: 7.9 }, { branch: "Mech", score: 6.2 }, { branch: "MBA", score: 7.1 },
];

const CODING_DATA = [
  { month: "Jan", Easy: 340, Medium: 210, Hard: 80 },
  { month: "Mar", Easy: 410, Medium: 290, Hard: 120 },
  { month: "May", Easy: 480, Medium: 340, Hard: 160 },
  { month: "Jul", Easy: 520, Medium: 390, Hard: 200 },
  { month: "Sep", Easy: 560, Medium: 420, Hard: 230 },
  { month: "Nov", Easy: 600, Medium: 460, Hard: 270 },
];

function generateCampusActivityData(trackFilter: "all" | "tech" | "nontech"): GithubContribution[] {
  const contributions: GithubContribution[] = [];
  const today = new Date();

  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const dayOfWeek = d.getUTCDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const month = d.getUTCMonth();
    const isPlacementSeason = month >= 7 && month <= 10;
    const baseMult = isPlacementSeason ? 1.75 : 1.0;

    const seed = Math.sin(i * 12.9898 + (trackFilter === "tech" ? 45.2 : trackFilter === "nontech" ? 78.1 : 12.3)) * 43758.5453;
    const rand = seed - Math.floor(seed);

    let count = 0;
    if (!isWeekend || rand > 0.35) {
      const base = rand * (trackFilter === "all" ? 65 : 38) * baseMult;
      count = Math.floor(base);
    }

    let level = 0;
    if (count > 0 && count <= 10) level = 1;
    else if (count > 10 && count <= 24) level = 2;
    else if (count > 24 && count <= 42) level = 3;
    else if (count > 42) level = 4;

    contributions.push({
      date: dateStr,
      count,
      level,
    });
  }

  return contributions;
}


const tooltipStyle = {
  contentStyle: { background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", borderRadius: 12, color: "var(--text-primary)", fontFamily: "DM Sans, sans-serif", fontSize: 12 },
  labelStyle: { color: "var(--text-secondary)" },
};

const STUDENTS_TABLE = [
  { name: "Priya Sharma", roll: "21BCE0147", branch: "CSE", batch: "2021-25", score: 9.1, tier: "Advanced", completion: 96 },
  { name: "Arjun Mehta", roll: "21BCE0234", branch: "AIML", batch: "2021-25", score: 8.4, tier: "Advanced", completion: 89 },
  { name: "Sneha Patel", roll: "22BCE0089", branch: "IT", batch: "2022-26", score: 7.2, tier: "Intermediate", completion: 72 },
  { name: "Kiran Kumar", roll: "22BCE0312", branch: "DS", batch: "2022-26", score: 6.8, tier: "Intermediate", completion: 65 },
  { name: "Divya Nair", roll: "23BCE0421", branch: "Mech", batch: "2023-27", score: 4.2, tier: "Beginner", completion: 38 },
];

const TIER_COLORS: Record<string, string> = { Advanced: "#059669", Intermediate: "#D97706", Beginner: "#DC2626" };

export default function CollegeAdminDashboard() {
  const [heatmapTrack, setHeatmapTrack] = useState<"all" | "tech" | "nontech">("all");
  const [heatmapVariant, setHeatmapVariant] = useState<GithubGraphVariant>("teal");
  const campusActivity = useMemo(() => generateCampusActivityData(heatmapTrack), [heatmapTrack]);

  const totalCampusSubmissions = useMemo(() => {
    return campusActivity.reduce((acc, curr) => acc + curr.count, 0) * 12; // Multiplied for campus-wide scale
  }, [campusActivity]);

  const activeDaysCount = useMemo(() => {
    return campusActivity.filter((item) => item.count > 0).length;
  }, [campusActivity]);

  return (
    <div className="space-y-8">
      {/* Campus Header */}
      <div className="flex items-center gap-5">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-bold text-xl"
          style={{ background: "linear-gradient(135deg, #0D9488, #2563EB)" }}
        >
          VIT
        </div>
        <div>
          <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>VIT Vellore</h1>
          <div className="text-sm" style={{ color: "var(--text-secondary)" }}>Campus Admin Portal · Batch 2021–2025 Active</div>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full text-xs font-bold" style={{ background: "rgba(5,150,105,0.12)", color: "#059669" }}>● Active</span>
          <button className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: "var(--accent-primary)" }}>+ Provision Faculty</button>
        </div>
      </div>

      {/* 6 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Students", value: "1,450", color: "#2DD4BF" },
          { label: "Profile Completion", value: "78%", sub: "1,130/1,450", color: "#38BDF8" },
          { label: "Billing None", value: "120", color: "#94A3B8" },
          { label: "Billing Pending", value: "45", color: "#FBBF24" },
          { label: "Billing Paid", value: "1,200", color: "#34D399" },
          { label: "Billing Waived", value: "85", color: "#C084FC" },
        ].map(({ label, value, sub, color }) => (
          <div key={label} className="rounded-2xl p-4 text-center transition-all dark:border-white/15 dark:hover:border-white/30 dark:shadow-[0_8px_25px_-6px_rgba(0,0,0,0.6)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            <div className="text-2xl font-bold mb-0.5 dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
            {sub && <div className="text-xs mb-0.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{sub}</div>}
            <div className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Learner Tiers + Performance Rings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Tiers */}
        <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Learner Tier Distribution</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Advanced Learners", count: 380, pct: 26, color: "#34D399", bg: "rgba(5,150,105,0.12)" },
              { label: "Intermediate", count: 620, pct: 43, color: "#FBBF24", bg: "rgba(217,119,6,0.12)" },
              { label: "Beginner", count: 340, pct: 23, color: "#F87171", bg: "rgba(220,38,38,0.12)" },
              { label: "No Score Yet", count: 110, pct: 8, color: "#94A3B8", bg: "rgba(148,163,184,0.12)" },
            ].map(({ label, count, pct, color, bg }) => (
              <div key={label} className="rounded-xl p-4 dark:border-opacity-40" style={{ background: bg, border: `1px solid ${color}30` }}>
                <div className="text-2xl font-bold mb-0.5" style={{ fontFamily: "var(--font-mono)", color }}>{count}</div>
                <div className="text-xs font-semibold mb-1" style={{ color }}>{pct}%</div>
                <div className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Rings */}
        <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Performance Overview</h3>
          <div className="grid grid-cols-5 gap-3">
            {[
              { label: "Avg Platform", value: 74, color: "#2DD4BF" },
              { label: "Avg Domain", value: 71, color: "#38BDF8" },
              { label: "Non-Tech", value: 68, color: "#FB923C" },
              { label: "Interview", value: 65, color: "#C084FC" },
              { label: "CRT", value: 79, color: "#34D399" },
            ].map(({ label, value, color }) => {
              const r = 26, circ = 2 * Math.PI * r, dash = (value / 100) * circ;
              return (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <svg width={64} height={64}>
                    <circle cx={32} cy={32} r={r} fill="none" stroke="var(--border-subtle)" strokeWidth={5} />
                    <circle cx={32} cy={32} r={r} fill="none" stroke={color} strokeWidth={5}
                      strokeDasharray={`${dash} ${circ - dash}`} strokeDashoffset={circ / 4} strokeLinecap="round" />
                    <text x={32} y={33} textAnchor="middle" dominantBaseline="middle"
                      style={{ fontSize: 12, fontWeight: 700, fontFamily: "var(--font-mono)", fill: color }}>
                      {value}%
                    </text>
                  </svg>
                  <span style={{ fontSize: 10, color: "var(--text-secondary)", textAlign: "center", fontWeight: 500 }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 365-Day Campus Activity Heatmap (Full Width) */}
      <div className="rounded-2xl p-6 overflow-hidden dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b mb-6" style={{ borderColor: "var(--border-subtle)" }}>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                365-Day Student Activity Heatmap
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold dark:border dark:border-teal-500/30" style={{ background: "rgba(13,148,136,0.15)", color: "#2DD4BF" }}>
                Campus Pulse
              </span>
            </div>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              Year-round daily student problem submissions, module assessments, and mock interview attempts.
            </p>
          </div>

          {/* Interactive Filters and Theme Selector */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Track Filter */}
            <div className="flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs">
              {(
                [
                  { id: "all", label: "All Tracks" },
                  { id: "tech", label: "Tech & AI" },
                  { id: "nontech", label: "Core / Non-Tech" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setHeatmapTrack(t.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    heatmapTrack === t.id
                      ? "bg-teal-600 text-white shadow-sm font-semibold"
                      : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Variant Selector */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
              {(
                [
                  { id: "teal", color: "#0D9488", title: "Teal" },
                  { id: "github", color: "#30A14E", title: "Emerald" },
                  { id: "ocean", color: "#2585D8", title: "Ocean" },
                  { id: "violet", color: "#8355DF", title: "Violet" },
                  { id: "graphite", color: "#5F5F5F", title: "Graphite" },
                ] as const
              ).map((v) => (
                <button
                  key={v.id}
                  onClick={() => setHeatmapVariant(v.id)}
                  title={v.title}
                  className={`w-5 h-5 rounded-full transition-transform ${
                    heatmapVariant === v.id ? "scale-125 ring-2 ring-offset-2 ring-teal-500" : "opacity-60 hover:opacity-100"
                  }`}
                  style={{ background: v.color }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Total Solved (365d)</div>
            <div className="text-lg font-bold text-teal-600 dark:text-teal-400" style={{ fontFamily: "var(--font-mono)" }}>
              {totalCampusSubmissions.toLocaleString()}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Active Coding Days</div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400" style={{ fontFamily: "var(--font-mono)" }}>
              {activeDaysCount} / 365 <span className="text-xs font-normal">({Math.round((activeDaysCount / 365) * 100)}%)</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Current Campus Streak</div>
            <div className="text-lg font-bold text-amber-600 dark:text-amber-400" style={{ fontFamily: "var(--font-mono)" }}>
              118 Days 🔥
            </div>
          </div>
          <div className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs text-neutral-500 dark:text-neutral-400">Peak Placement Season</div>
            <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400" style={{ fontFamily: "var(--font-mono)" }}>
              Aug – Nov (1.8x)
            </div>
          </div>
        </div>

        {/* The 365-Day Heatmap Component */}
        <div className="overflow-x-auto pb-2">
          <div className="min-w-[840px]">
            <GithubGraph
              data={campusActivity}
              months={12}
              variant={heatmapVariant}
              animation="wave"
              ambientEffect="twinkle"
              ambientIntensity={0.5}
              cellSize={12}
              cellGap={3}
              cellRadius={2}
              showLegend={true}
              showAccount={false}
            />
          </div>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Growth Chart */}
        <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Student Growth — 2024</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={GROWTH_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
              <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
              <Tooltip {...tooltipStyle} />
              <Area type="monotone" dataKey="students" stroke="#2DD4BF" strokeWidth={2.5} fill="url(#growthGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Branch Performance */}
        <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Branch Avg Platform Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={BRANCH_PERF} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="branch" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
              <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="score" fill="#2DD4BF" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Coding Progress */}
        <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Coding Problems Solved</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={CODING_DATA} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
              <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
              <Tooltip {...tooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans" }} />
              <Bar dataKey="Easy" stackId="a" fill="#34D399" radius={[0, 0, 0, 0]} />
              <Bar dataKey="Medium" stackId="a" fill="#FBBF24" />
              <Bar dataKey="Hard" stackId="a" fill="#F87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Students Roster */}
      <div className="rounded-2xl overflow-hidden dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Students Master Roster</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 rounded-lg text-xs font-semibold border" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>Export CSV</button>
            <button className="px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "var(--accent-primary)" }}>+ Add Student</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-bg)" }}>
                {["Student", "Roll No", "Branch", "Batch", "Platform Score", "Tier", "Profile %", "Actions"].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-widest" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STUDENTS_TABLE.map(({ name, roll, branch, batch, score, tier, completion }) => (
                <tr
                  key={roll}
                  className="border-t transition-colors"
                  style={{ borderColor: "var(--border-subtle)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface-bg)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, #0D9488, #2563EB)" }}>
                        {name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>{name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3" style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)" }}>{roll}</td>
                  <td className="px-4 py-3 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>{branch}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{batch}</td>
                  <td className="px-4 py-3">
                    <span className="font-bold text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>{score}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold" style={{
                      background: `${TIER_COLORS[tier]}15`,
                      color: TIER_COLORS[tier],
                    }}>{tier}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 rounded-full overflow-hidden w-16" style={{ background: "var(--border-subtle)" }}>
                        <div className="h-full rounded-full" style={{ width: `${completion}%`, background: "var(--accent-primary)" }} />
                      </div>
                      <span className="text-xs" style={{ fontFamily: "var(--font-mono)", color: "var(--text-muted)" }}>{completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}>View</button>
                      <button className="px-2.5 py-1 rounded-lg text-xs font-semibold" style={{ background: "var(--border-subtle)", color: "var(--text-secondary)" }}>Assign</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
