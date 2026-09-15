import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import GithubGraph, { GithubContribution, GithubGraphVariant } from "@/components/ui/GithubGraph";
import {
  RotateCcw,
  Sparkles,
  Award,
  TrendingUp,
  Users,
  CheckCircle2,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Search,
  Download,
  Plus,
} from "lucide-react";

// --- ANIMATION HOOKS & HELPERS ---
function useAnimatedNumber(target: number, duration: number = 1200, trigger: boolean = true) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setVal(0);
      return;
    }
    let startTime: number | null = null;
    let animFrame: number;

    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
      setVal(Math.round(eased * target));
      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [target, duration, trigger]);

  return val;
}

function AnimatedCircleGauge({
  label,
  value,
  color,
  size = 72,
  strokeWidth = 6,
  trigger = true,
}: {
  label: string;
  value: number;
  color: string;
  size?: number;
  strokeWidth?: number;
  trigger?: boolean;
}) {
  const animatedVal = useAnimatedNumber(value, 1300, trigger);
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (animatedVal / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-1.5 group transition-transform duration-200 hover:scale-105">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="overflow-visible -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circ}
            strokeDashoffset={circ - dash}
            strokeLinecap="round"
            className="transition-all duration-75"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="font-bold text-xs sm:text-sm tracking-tight"
            style={{ fontFamily: "var(--font-mono)", color }}
          >
            {animatedVal}%
          </span>
        </div>
      </div>
      <span
        style={{
          fontSize: 11,
          color: "var(--text-secondary)",
          textAlign: "center",
          fontWeight: 600,
        }}
        className="line-clamp-1"
      >
        {label}
      </span>
    </div>
  );
}

// --- DATA SETS ---
const GROWTH_DATA = [
  { month: "Jan", students: 980 },
  { month: "Feb", students: 1050 },
  { month: "Mar", students: 1120 },
  { month: "Apr", students: 1180 },
  { month: "May", students: 1220 },
  { month: "Jun", students: 1280 },
  { month: "Jul", students: 1310 },
  { month: "Aug", students: 1360 },
  { month: "Sep", students: 1390 },
  { month: "Oct", students: 1420 },
  { month: "Nov", students: 1440 },
  { month: "Dec", students: 1450 },
];

const BRANCH_PERF = [
  { branch: "CSE", score: 7.8, full: "Computer Science" },
  { branch: "IT", score: 7.4, full: "Information Tech" },
  { branch: "AIML", score: 8.1, full: "AI & Machine Learning" },
  { branch: "DS", score: 7.9, full: "Data Science" },
  { branch: "Mech", score: 6.2, full: "Mechanical Engg" },
  { branch: "MBA", score: 7.1, full: "Business Admin" },
];

const CODING_DATA = [
  { month: "Jan", Easy: 340, Medium: 210, Hard: 80 },
  { month: "Mar", Easy: 410, Medium: 290, Hard: 120 },
  { month: "May", Easy: 480, Medium: 340, Hard: 160 },
  { month: "Jul", Easy: 520, Medium: 390, Hard: 200 },
  { month: "Sep", Easy: 560, Medium: 420, Hard: 230 },
  { month: "Nov", Easy: 600, Medium: 460, Hard: 270 },
];

const TIER_DATA = [
  { name: "Advanced Learners", value: 380, pct: 26, color: "#34D399", bg: "rgba(5,150,105,0.12)" },
  { name: "Intermediate", value: 620, pct: 43, color: "#FBBF24", bg: "rgba(217,119,6,0.12)" },
  { name: "Beginner", value: 340, pct: 23, color: "#F87171", bg: "rgba(220,38,38,0.12)" },
  { name: "No Score Yet", value: 110, pct: 8, color: "#94A3B8", bg: "rgba(148,163,184,0.12)" },
];

const READINESS_PIE_DATA = [
  { name: "Placement Ready", value: 890, pct: 62, color: "#2DD4BF" },
  { name: "In Active Training", value: 350, pct: 24, color: "#38BDF8" },
  { name: "Requires Intervention", value: 210, pct: 14, color: "#FB923C" },
];

const STUDENTS_TABLE = [
  { name: "Priya Sharma", roll: "21BCE0147", branch: "CSE", batch: "2021-25", score: 9.1, tier: "Advanced", completion: 96 },
  { name: "Arjun Mehta", roll: "21BCE0234", branch: "AIML", batch: "2021-25", score: 8.4, tier: "Advanced", completion: 89 },
  { name: "Sneha Patel", roll: "22BCE0089", branch: "IT", batch: "2022-26", score: 7.2, tier: "Intermediate", completion: 72 },
  { name: "Kiran Kumar", roll: "22BCE0312", branch: "DS", batch: "2022-26", score: 6.8, tier: "Intermediate", completion: 65 },
  { name: "Divya Nair", roll: "23BCE0421", branch: "Mech", batch: "2023-27", score: 4.2, tier: "Beginner", completion: 38 },
  { name: "Rohan Verma", roll: "21BCE0562", branch: "CSE", batch: "2021-25", score: 8.9, tier: "Advanced", completion: 94 },
];

const TIER_COLORS: Record<string, string> = {
  Advanced: "#059669",
  Intermediate: "#D97706",
  Beginner: "#DC2626",
};

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
  contentStyle: {
    background: "var(--surface-elevated)",
    border: "1px solid var(--border-subtle)",
    borderRadius: 12,
    color: "var(--text-primary)",
    fontFamily: "DM Sans, sans-serif",
    fontSize: 12,
    boxShadow: "0 12px 32px -8px rgba(0,0,0,0.5)",
  },
  labelStyle: { color: "var(--text-secondary)", fontWeight: 600 },
};

function AnalyticsChartsSection({ parentTrigger }: { parentTrigger: boolean }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Sync with parent reload trigger if already in view
  useEffect(() => {
    if (!parentTrigger) {
      setIsVisible(false);
    } else {
      const timer = setTimeout(() => setIsVisible(true), 80);
      return () => clearTimeout(timer);
    }
  }, [parentTrigger]);

  const animatedGrowthPct = useAnimatedNumber(48, 1200, isVisible);
  const animatedSolvedCount = useAnimatedNumber(1330, 1300, isVisible);

  return (
    <div
      ref={containerRef}
      className="transition-all duration-700 select-none"
      style={{
        opacity: isVisible ? 1 : 0.4,
        transform: isVisible ? "translateY(0)" : "translateY(28px)",
      }}
    >
      {/* Section Header Indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-teal-400" />
          <h2 className="text-xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Campus Growth & Competency Analytics
          </h2>
        </div>
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all"
          style={{
            background: isVisible ? "rgba(13,148,136,0.15)" : "rgba(148,163,184,0.12)",
            color: isVisible ? "var(--accent-primary)" : "var(--text-muted)",
            border: `1px solid ${isVisible ? "rgba(13,148,136,0.3)" : "rgba(148,163,184,0.2)"}`,
          }}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isVisible ? "bg-teal-400 animate-pulse" : "bg-slate-400"}`} />
          {isVisible ? "Scroll Loaded" : "Scroll to Load"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 1. Growth Area Chart */}
        <div
          className="rounded-3xl p-6 relative overflow-hidden transition-all duration-300 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)] hover:-translate-y-1"
          style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: "var(--text-primary)" }}>
                Student Growth — 2024
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Monthly active learners onboarding
              </p>
            </div>
            <span
              className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/25 flex items-center gap-1 shadow-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <TrendingUp size={13} /> +{animatedGrowthPct}%
            </span>
          </div>

          <div className="h-[210px] w-full">
            {isVisible && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={GROWTH_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <defs>
                    <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2DD4BF" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#2DD4BF" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
                  <Tooltip {...tooltipStyle} />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#2DD4BF"
                    strokeWidth={2.5}
                    fill="url(#growthGrad)"
                    isAnimationActive={true}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 2. Branch Performance Bar Chart */}
        <div
          className="rounded-3xl p-6 relative overflow-hidden transition-all duration-300 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)] hover:-translate-y-1"
          style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: "var(--text-primary)" }}>
                Branch Avg Platform Score
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Benchmarked on 10.0 scale
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/25 shadow-sm">
              AIML Top: 8.1
            </span>
          </div>

          <div className="h-[210px] w-full">
            {isVisible && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={BRANCH_PERF} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                  <XAxis dataKey="branch" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
                  <Tooltip {...tooltipStyle} />
                  <Bar
                    dataKey="score"
                    fill="#38BDF8"
                    radius={[6, 6, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={1400}
                    animationEasing="ease-out"
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* 3. Coding Progress Stacked Bar Chart */}
        <div
          className="rounded-3xl p-6 relative overflow-hidden transition-all duration-300 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)] hover:-translate-y-1"
          style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg" style={{ color: "var(--text-primary)" }}>
                Coding Problems Solved
              </h3>
              <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                Easy · Medium · Hard breakdown
              </p>
            </div>
            <span
              className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 shadow-sm"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {animatedSolvedCount.toLocaleString()} Solved
            </span>
          </div>

          <div className="h-[210px] w-full">
            {isVisible && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CODING_DATA} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
                  <YAxis tick={{ fontSize: 11, fill: "var(--text-muted)", fontFamily: "DM Sans" }} />
                  <Tooltip {...tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 11, fontFamily: "DM Sans" }} />
                  <Bar
                    dataKey="Easy"
                    stackId="a"
                    fill="#34D399"
                    isAnimationActive={true}
                    animationDuration={1300}
                  />
                  <Bar
                    dataKey="Medium"
                    stackId="a"
                    fill="#FBBF24"
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                  <Bar
                    dataKey="Hard"
                    stackId="a"
                    fill="#F87171"
                    radius={[4, 4, 0, 0]}
                    isAnimationActive={true}
                    animationDuration={1700}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CollegeAdminDashboard() {
  const [animTrigger, setAnimTrigger] = useState(true);
  const [heatmapTrack, setHeatmapTrack] = useState<"all" | "tech" | "nontech">("all");
  const [heatmapVariant, setHeatmapVariant] = useState<GithubGraphVariant>("teal");
  const [activePieIndex, setActivePieIndex] = useState<number | null>(null);
  const [pieMode, setPieMode] = useState<"tiers" | "readiness">("tiers");
  const [searchTerm, setSearchTerm] = useState("");

  const campusActivity = useMemo(() => generateCampusActivityData(heatmapTrack), [heatmapTrack]);

  const totalCampusSubmissions = useMemo(() => {
    return campusActivity.reduce((acc, curr) => acc + curr.count, 0) * 12;
  }, [campusActivity]);

  const activeDaysCount = useMemo(() => {
    return campusActivity.filter((item) => item.count > 0).length;
  }, [campusActivity]);

  // Re-trigger animation on demand
  const handleReplayAnimations = useCallback(() => {
    setAnimTrigger(false);
    setTimeout(() => setAnimTrigger(true), 60);
  }, []);

  // Top KPI Animated Counts
  const animatedTotalStudents = useAnimatedNumber(1450, 1100, animTrigger);
  const animatedProfilePct = useAnimatedNumber(78, 1100, animTrigger);
  const animatedBillingNone = useAnimatedNumber(120, 1100, animTrigger);
  const animatedBillingPending = useAnimatedNumber(45, 1100, animTrigger);
  const animatedBillingPaid = useAnimatedNumber(1200, 1100, animTrigger);
  const animatedBillingWaived = useAnimatedNumber(85, 1100, animTrigger);

  const currentPieData = pieMode === "tiers" ? TIER_DATA : READINESS_PIE_DATA;

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return STUDENTS_TABLE;
    const q = searchTerm.toLowerCase();
    return STUDENTS_TABLE.filter(
      (s) => s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q) || s.branch.toLowerCase().includes(q)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Campus Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-2">
        <div className="flex items-center gap-4 sm:gap-5">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl shrink-0"
            style={{ background: "linear-gradient(135deg, #0D9488 0%, #2563EB 50%, #7C3AED 100%)" }}
          >
            GGITS
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                Gyan Ganga Institute of Technology and Sciences (GGITS)
              </h1>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Campus
              </span>
            </div>
            <div className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
              Campus Admin Portal · Batch 2021–2025 Active · 1,450 Enrolled Students
            </div>
          </div>
        </div>

        {/* Action Controls: Replay Animation & Provision Faculty */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            onClick={handleReplayAnimations}
            className="p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border hover:bg-black/5 dark:hover:bg-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
            style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
            title="Replay all dashboard animations"
          >
            <RotateCcw size={14} className={!animTrigger ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Reload Charts</span>
          </button>
          <button
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1.5"
            style={{ background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)" }}
          >
            <Plus size={16} />
            <span>Provision Faculty</span>
          </button>
        </div>
      </div>

      {/* 6 Top KPI Stat Cards with Animated Count-Ups */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: "Total Students", value: animatedTotalStudents.toLocaleString(), color: "#2DD4BF" },
          { label: "Profile Completion", value: `${animatedProfilePct}%`, sub: `${Math.round((animatedProfilePct * 1450) / 100)}/1,450`, color: "#38BDF8" },
          { label: "Billing None", value: animatedBillingNone.toString(), color: "#94A3B8" },
          { label: "Billing Pending", value: animatedBillingPending.toString(), color: "#FBBF24" },
          { label: "Billing Paid", value: animatedBillingPaid.toLocaleString(), color: "#34D399" },
          { label: "Billing Waived", value: animatedBillingWaived.toString(), color: "#C084FC" },
        ].map(({ label, value, sub, color }) => (
          <div
            key={label}
            className="rounded-2xl p-4 text-center transition-all duration-200 dark:border-white/15 dark:hover:border-white/30 dark:shadow-[0_8px_25px_-6px_rgba(0,0,0,0.6)] hover:-translate-y-0.5"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <div
              className="text-2xl sm:text-3xl font-bold mb-0.5 dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)] transition-all"
              style={{ fontFamily: "var(--font-mono)", color }}
            >
              {value}
            </div>
            {sub && (
              <div className="text-[11px] mb-0.5 font-semibold" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                {sub}
              </div>
            )}
            <div className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: ANIMATED PIE / DONUT CHARTS & CIRCULAR RINGS   */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Animated Donut / Pie Chart (7 cols) */}
        <div
          className="lg:col-span-7 rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
          style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          {/* Header & Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <PieChartIcon className="w-5 h-5 text-teal-400" />
                <h3 className="font-extrabold text-lg sm:text-xl" style={{ color: "var(--text-primary)" }}>
                  {pieMode === "tiers" ? "Learner Tier Distribution" : "Campus Placement Readiness"}
                </h3>
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                {pieMode === "tiers"
                  ? "Interactive student competency segmentation across all branches"
                  : "Placement season preparedness across 1,450 final-year students"}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs">
              <button
                onClick={() => setPieMode("tiers")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  pieMode === "tiers"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                Learner Tiers
              </button>
              <button
                onClick={() => setPieMode("readiness")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  pieMode === "readiness"
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                Placement Ready
              </button>
            </div>
          </div>

          {/* Donut Chart + Slices Legend */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* The Donut Chart */}
            <div className="sm:col-span-6 relative flex items-center justify-center min-h-[220px]">
              {animTrigger && (
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={currentPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={88}
                      paddingAngle={4}
                      dataKey="value"
                      isAnimationActive={true}
                      animationDuration={1400}
                      animationEasing="ease-out"
                      onMouseEnter={(_, index) => setActivePieIndex(index)}
                      onMouseLeave={() => setActivePieIndex(null)}
                    >
                      {currentPieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="transparent"
                          className="cursor-pointer transition-all duration-200"
                          style={{
                            filter:
                              activePieIndex === index
                                ? `drop-shadow(0 0 8px ${entry.color}80)`
                                : "none",
                            transform: activePieIndex === index ? "scale(1.04)" : "scale(1)",
                            transformOrigin: "center center",
                          }}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              )}

              {/* Center Donut Hub */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
                <span
                  className="text-2xl font-black tracking-tight"
                  style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
                >
                  {animTrigger ? animatedTotalStudents.toLocaleString() : "1,450"}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>
                  Students
                </span>
              </div>
            </div>

            {/* Slices Cards Breakdown */}
            <div className="sm:col-span-6 grid grid-cols-2 gap-2.5">
              {currentPieData.map((item, idx) => {
                const isHovered = activePieIndex === idx;
                return (
                  <div
                    key={item.name}
                    onMouseEnter={() => setActivePieIndex(idx)}
                    onMouseLeave={() => setActivePieIndex(null)}
                    className={`rounded-2xl p-3 sm:p-3.5 border transition-all duration-200 cursor-pointer ${
                      isHovered ? "scale-[1.03] shadow-lg" : "hover:border-opacity-60"
                    }`}
                    style={{
                      background: isHovered ? "var(--surface-bg)" : "rgba(0,0,0,0.02)",
                      borderColor: isHovered ? item.color : "var(--border-subtle)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: item.color }} />
                      <span className="text-xs font-extrabold" style={{ color: item.color, fontFamily: "var(--font-mono)" }}>
                        {item.pct}%
                      </span>
                    </div>
                    <div
                      className="text-lg sm:text-xl font-bold mb-0.5"
                      style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}
                    >
                      {item.value}
                    </div>
                    <div className="text-[11px] font-medium line-clamp-1" style={{ color: "var(--text-secondary)" }}>
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Performance Overview Circular Rings (5 cols) */}
        <div
          className="lg:col-span-5 rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
          style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-teal-400" />
                <h3 className="font-extrabold text-lg sm:text-xl" style={{ color: "var(--text-primary)" }}>
                  Performance Overview
                </h3>
              </div>
              <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
                Campus-wide average score across evaluation modules
              </p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 shrink-0">
              Avg 71.4%
            </span>
          </div>

          {/* 5 Animated Circular Progress Rings */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pt-2">
            {[
              { label: "Avg Platform", value: 74, color: "#2DD4BF" },
              { label: "Avg Domain", value: 71, color: "#38BDF8" },
              { label: "Non-Tech", value: 68, color: "#FB923C" },
              { label: "Interview", value: 65, color: "#C084FC" },
              { label: "CRT Score", value: 79, color: "#34D399" },
            ].map(({ label, value, color }) => (
              <AnimatedCircleGauge
                key={label}
                label={label}
                value={value}
                color={color}
                size={70}
                strokeWidth={6}
                trigger={animTrigger}
              />
            ))}
          </div>

          {/* Readiness Benchmark Bar */}
          <div className="mt-6 pt-5 border-t" style={{ borderColor: "var(--border-subtle)" }}>
            <div className="flex items-center justify-between text-xs font-semibold mb-2" style={{ color: "var(--text-secondary)" }}>
              <span>Placement Benchmark Threshold</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">75% Target Achieved</span>
            </div>
            <div className="w-full bg-slate-800/20 dark:bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 h-full rounded-full transition-all duration-1000"
                style={{ width: animTrigger ? "79%" : "0%" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: 365-DAY CAMPUS ACTIVITY HEATMAP               */}
      {/* ========================================================= */}
      <div
        className="rounded-3xl p-6 sm:p-7 overflow-hidden dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
        style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b mb-6" style={{ borderColor: "var(--border-subtle)" }}>
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="text-lg sm:text-xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                365-Day Student Activity Heatmap
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30">
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
                  className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    heatmapTrack === t.id
                      ? "bg-teal-600 text-white shadow-sm"
                      : "text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
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
                  className={`w-5 h-5 rounded-full transition-transform cursor-pointer ${
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
          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Total Solved (365d)</div>
            <div className="text-lg sm:text-xl font-bold text-teal-600 dark:text-teal-400 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              {totalCampusSubmissions.toLocaleString()}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Active Coding Days</div>
            <div className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              {activeDaysCount} / 365 <span className="text-xs font-normal">({Math.round((activeDaysCount / 365) * 100)}%)</span>
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Campus Streak</div>
            <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
              118 Days 🔥
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <div className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">Peak Placement Season</div>
            <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
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

      {/* ========================================================= */}
      {/* SECTION 3: ANIMATED AREA & BAR CHARTS (ON SCROLL DOWN)    */}
      {/* ========================================================= */}
      <AnalyticsChartsSection parentTrigger={animTrigger} />

      {/* ========================================================= */}
      {/* SECTION 4: STUDENTS MASTER ROSTER TABLE                   */}
      {/* ========================================================= */}
      <div
        className="rounded-3xl overflow-hidden dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
        style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-lg" style={{ color: "var(--text-primary)" }}>
              Students Master Roster
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              {filteredStudents.length} Active
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search student or roll..."
                className="pl-9 pr-3 py-1.5 rounded-xl text-xs border outline-none focus:border-teal-500 transition-colors"
                style={{
                  background: "var(--surface-bg)",
                  borderColor: "var(--border-subtle)",
                  color: "var(--text-primary)",
                }}
              />
            </div>

            <button
              className="px-3 py-1.5 rounded-xl text-xs font-semibold border hover:bg-black/5 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
            >
              <Download size={13} />
              <span>Export CSV</span>
            </button>
            <button
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-md shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-1"
              style={{ background: "var(--accent-primary)" }}
            >
              <Plus size={14} />
              <span>Add Student</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "var(--surface-bg)" }}>
                {["Student", "Roll No", "Branch", "Batch", "Platform Score", "Tier", "Profile %", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(({ name, roll, branch, batch, score, tier, completion }, idx) => (
                <tr
                  key={roll}
                  className="border-t transition-colors"
                  style={{ borderColor: "var(--border-subtle)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--surface-bg)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0"
                        style={{ background: "linear-gradient(135deg, #0D9488, #2563EB)" }}
                      >
                        {name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                        {name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    {roll}
                  </td>
                  <td className="px-5 py-3.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                    {branch}
                  </td>
                  <td className="px-5 py-3.5 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                    {batch}
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="font-bold text-sm" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>
                      {score}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${TIER_COLORS[tier]}15`,
                        color: TIER_COLORS[tier],
                        border: `1px solid ${TIER_COLORS[tier]}30`,
                      }}
                    >
                      {tier}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="flex-1 h-2 rounded-full overflow-hidden w-20 bg-slate-800/20 dark:bg-white/10">
                        <div
                          className="h-full rounded-full transition-all duration-1000"
                          style={{
                            width: animTrigger ? `${completion}%` : "0%",
                            background: "linear-gradient(90deg, #0D9488, #2DD4BF)",
                            transitionDelay: `${idx * 100}ms`,
                          }}
                        />
                      </div>
                      <span className="text-xs font-mono font-semibold" style={{ color: "var(--text-muted)" }}>
                        {completion}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold cursor-pointer hover:opacity-80 transition-opacity"
                        style={{ background: "var(--accent-soft)", color: "var(--accent-primary)" }}
                      >
                        View
                      </button>
                      <button
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold border hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
                        style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
                      >
                        Assign
                      </button>
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

function CustomPieTooltip({ active, payload }: any) {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div
        className="p-3 rounded-xl shadow-2xl border text-xs"
        style={{
          background: "var(--surface-elevated)",
          borderColor: "var(--border-subtle)",
          color: "var(--text-primary)",
        }}
      >
        <div className="font-bold mb-1 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: data.payload.color }} />
          <span>{data.name}</span>
        </div>
        <div className="font-mono text-sm font-extrabold" style={{ color: data.payload.color }}>
          {data.value} Students ({data.payload.pct}%)
        </div>
      </div>
    );
  }
  return null;
}
