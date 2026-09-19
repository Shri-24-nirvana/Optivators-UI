import { useState, useMemo } from "react";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useTheme } from "@/context/ThemeContext";
import {
  Trophy,
  Crown,
  Flame,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Search,
  CheckCircle2,
  Code2,
  Cpu,
  Brain,
  ShieldCheck,
  ChevronRight,
  X,
  Target,
  UserCheck,
  ArrowUpRight,
} from "lucide-react";

interface StudentRank {
  rank: number;
  prevRank: number;
  name: string;
  rollNo: string;
  branch: string;
  batch: string;
  score: number;
  domainScore: number;
  accuracy: number;
  problemsSolved: number;
  streakDays: number;
  tier: "Grandmaster" | "Challenger" | "Master" | "Diamond" | "Platinum" | "Gold";
  badge?: string;
  skills: string[];
  college: string;
  github?: string;
  linkedin?: string;
  avatarColor: string;
  track: "DSA" | "FullStack" | "AIML" | "Cognitive" | "General";
}

const ALL_STUDENTS: StudentRank[] = [
  {
    rank: 1,
    prevRank: 1,
    name: "Priya Sharma",
    rollNo: "0208CS211047",
    branch: "CSE",
    batch: "2021-25",
    score: 9.68,
    domainScore: 9.8,
    accuracy: 98.4,
    problemsSolved: 482,
    streakDays: 68,
    tier: "Grandmaster",
    badge: "🏆 Campus MVP",
    skills: ["DSA (Hard)", "PyTorch", "System Design", "Distributed Systems", "Kubernetes"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatarColor: "from-amber-400 to-yellow-600",
    track: "AIML",
  },
  {
    rank: 2,
    prevRank: 3,
    name: "Siddharth Joshi",
    rollNo: "0208IT201089",
    branch: "IT",
    batch: "2021-25",
    score: 9.45,
    domainScore: 9.5,
    accuracy: 97.1,
    problemsSolved: 435,
    streakDays: 45,
    tier: "Challenger",
    badge: "⚡ Speed Demon",
    skills: ["Go", "Microservices", "PostgreSQL", "C++", "Next.js"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatarColor: "from-slate-300 to-slate-500",
    track: "DSA",
  },
  {
    rank: 3,
    prevRank: 2,
    name: "Ananya Gupta",
    rollNo: "0208AI211012",
    branch: "AIML",
    batch: "2021-25",
    score: 9.32,
    domainScore: 9.4,
    accuracy: 96.5,
    problemsSolved: 398,
    streakDays: 52,
    tier: "Challenger",
    badge: "🧠 AI Prodigy",
    skills: ["TensorFlow", "NLP Transformers", "Computer Vision", "Python", "FastAPI"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    avatarColor: "from-amber-600 to-orange-700",
    track: "AIML",
  },
  {
    rank: 4,
    prevRank: 6,
    name: "Arjun Mehta",
    rollNo: "0208AI211034",
    branch: "AIML",
    batch: "2021-25",
    score: 9.14,
    domainScore: 9.2,
    accuracy: 95.8,
    problemsSolved: 372,
    streakDays: 38,
    tier: "Master",
    badge: "🚀 Top Climber",
    skills: ["PyTorch", "LLM Fine-tuning", "Docker", "Algorithms"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-teal-400 to-emerald-600",
    track: "AIML",
  },
  {
    rank: 5,
    prevRank: 4,
    name: "Kiran Kumar",
    rollNo: "0208DS221008",
    branch: "DS",
    batch: "2022-26",
    score: 8.95,
    domainScore: 9.0,
    accuracy: 94.2,
    problemsSolved: 340,
    streakDays: 29,
    tier: "Master",
    skills: ["Data Engineering", "Apache Spark", "SQL Optimization", "Python"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-blue-500 to-indigo-600",
    track: "FullStack",
  },
  {
    rank: 6,
    prevRank: 5,
    name: "Meera Patel",
    rollNo: "0208CS201092",
    branch: "CSE",
    batch: "2021-25",
    score: 8.84,
    domainScore: 8.9,
    accuracy: 93.7,
    problemsSolved: 318,
    streakDays: 34,
    tier: "Master",
    skills: ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "Redis"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-purple-500 to-pink-600",
    track: "FullStack",
  },
  {
    rank: 7,
    prevRank: 9,
    name: "Rohit Sharma",
    rollNo: "0208CS211088",
    branch: "CSE",
    batch: "2021-25",
    score: 8.72,
    domainScore: 8.8,
    accuracy: 92.4,
    problemsSolved: 295,
    streakDays: 26,
    tier: "Diamond",
    skills: ["C++ STL", "Dynamic Programming", "Graph Theory", "Java"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-cyan-500 to-blue-600",
    track: "DSA",
  },
  {
    rank: 8,
    prevRank: 8,
    name: "Divya Krishnan",
    rollNo: "0208IT221041",
    branch: "IT",
    batch: "2022-26",
    score: 8.60,
    domainScore: 8.6,
    accuracy: 91.8,
    problemsSolved: 278,
    streakDays: 21,
    tier: "Diamond",
    skills: ["Next.js", "GraphQL", "MongoDB", "AWS Lambda"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-emerald-400 to-teal-700",
    track: "FullStack",
  },
  {
    rank: 9,
    prevRank: 7,
    name: "Aditya Rao",
    rollNo: "0208CS211005",
    branch: "CSE",
    batch: "2021-25",
    score: 8.48,
    domainScore: 8.5,
    accuracy: 91.0,
    problemsSolved: 262,
    streakDays: 19,
    tier: "Diamond",
    skills: ["Rust", "Systems Programming", "WebAssembly", "C++"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-violet-500 to-purple-700",
    track: "DSA",
  },
  {
    rank: 10,
    prevRank: 11,
    name: "Sneha Iyer",
    rollNo: "0208DS221056",
    branch: "DS",
    batch: "2022-26",
    score: 8.35,
    domainScore: 8.4,
    accuracy: 90.2,
    problemsSolved: 245,
    streakDays: 18,
    tier: "Diamond",
    skills: ["Statistical Modeling", "R", "Pandas", "Scikit-Learn"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-rose-500 to-red-600",
    track: "AIML",
  },
  {
    rank: 11,
    prevRank: 10,
    name: "Varun Verma",
    rollNo: "0208CS221099",
    branch: "CSE",
    batch: "2022-26",
    score: 8.22,
    domainScore: 8.3,
    accuracy: 89.5,
    problemsSolved: 230,
    streakDays: 16,
    tier: "Diamond",
    skills: ["Spring Boot", "Kafka", "PostgreSQL", "Java"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-amber-500 to-orange-600",
    track: "FullStack",
  },
  {
    rank: 12,
    prevRank: 14,
    name: "Tanvi Saxena",
    rollNo: "0208AI221038",
    branch: "AIML",
    batch: "2022-26",
    score: 8.12,
    domainScore: 8.2,
    accuracy: 89.0,
    problemsSolved: 218,
    streakDays: 14,
    tier: "Platinum",
    skills: ["OpenCV", "Deep Learning", "NumPy", "Flask"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-fuchsia-500 to-pink-600",
    track: "AIML",
  },
  {
    rank: 13,
    prevRank: 12,
    name: "Yashvardhan Jain",
    rollNo: "0208IT211075",
    branch: "IT",
    batch: "2021-25",
    score: 7.95,
    domainScore: 8.0,
    accuracy: 88.4,
    problemsSolved: 198,
    streakDays: 12,
    tier: "Platinum",
    skills: ["React Native", "Firebase", "Redux Toolkit", "JavaScript"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-sky-500 to-indigo-600",
    track: "FullStack",
  },
  {
    rank: 14,
    prevRank: 17,
    name: "Rahul Kumar (You)",
    rollNo: "0208CS211099",
    branch: "CSE",
    batch: "2021-25",
    score: 7.80,
    domainScore: 7.9,
    accuracy: 87.8,
    problemsSolved: 184,
    streakDays: 14,
    tier: "Platinum",
    badge: "🔥 Hot Streak",
    skills: ["React", "TypeScript", "Node.js", "DSA", "Tailwind CSS"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    github: "https://github.com/rahulkumar-ggits",
    linkedin: "https://linkedin.com/in/rahulkumar-ggits",
    avatarColor: "from-teal-400 to-cyan-600",
    track: "FullStack",
  },
  {
    rank: 15,
    prevRank: 13,
    name: "Pooja Deshmukh",
    rollNo: "0208ME211022",
    branch: "Mech",
    batch: "2021-25",
    score: 7.65,
    domainScore: 7.8,
    accuracy: 86.9,
    problemsSolved: 165,
    streakDays: 10,
    tier: "Platinum",
    skills: ["MATLAB", "SolidWorks", "Python for Engineering", "Simulink"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-orange-500 to-amber-700",
    track: "Cognitive",
  },
  {
    rank: 16,
    prevRank: 15,
    name: "Nikhil Chawla",
    rollNo: "0208CS221064",
    branch: "CSE",
    batch: "2022-26",
    score: 7.50,
    domainScore: 7.6,
    accuracy: 85.5,
    problemsSolved: 152,
    streakDays: 9,
    tier: "Gold",
    skills: ["Java", "OOP Design", "MySQL", "Git"],
    college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
    avatarColor: "from-blue-600 to-slate-700",
    track: "DSA",
  },
];

const BRANCH_OPTIONS = ["All Branches", "CSE", "IT", "AIML", "DS", "Mech"];
const TRACK_OPTIONS = [
  { id: "all", label: "All Tracks", icon: Trophy },
  { id: "DSA", label: "DSA & Code Arena", icon: Code2 },
  { id: "FullStack", label: "Full Stack & Web", icon: Cpu },
  { id: "AIML", label: "AI & Cognitive", icon: Brain },
];
const TIMEFRAME_OPTIONS = ["All-time Season", "This Semester", "Weekly Sprint"];

const TIER_COLORS: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  Grandmaster: {
    bg: "bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20",
    text: "text-amber-500 dark:text-amber-400 font-extrabold",
    border: "border-amber-400/50 dark:border-amber-400/40",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.35)]",
  },
  Challenger: {
    bg: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20",
    text: "text-cyan-500 dark:text-cyan-300 font-bold",
    border: "border-cyan-400/50 dark:border-cyan-400/40",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.35)]",
  },
  Master: {
    bg: "bg-gradient-to-r from-purple-500/20 to-violet-500/20",
    text: "text-purple-500 dark:text-purple-300 font-bold",
    border: "border-purple-400/50 dark:border-purple-400/40",
    glow: "shadow-[0_0_15px_rgba(168,85,247,0.35)]",
  },
  Diamond: {
    bg: "bg-gradient-to-r from-teal-500/20 to-emerald-500/20",
    text: "text-teal-600 dark:text-teal-300 font-semibold",
    border: "border-teal-400/40 dark:border-teal-400/30",
    glow: "shadow-[0_0_10px_rgba(20,184,166,0.25)]",
  },
  Platinum: {
    bg: "bg-slate-200/50 dark:bg-slate-800/60",
    text: "text-slate-700 dark:text-slate-300 font-medium",
    border: "border-slate-300 dark:border-slate-700",
    glow: "",
  },
  Gold: {
    bg: "bg-amber-100/60 dark:bg-amber-950/40",
    text: "text-amber-700 dark:text-amber-300 font-medium",
    border: "border-amber-300 dark:border-amber-800/60",
    glow: "",
  },
};

export default function Leaderboard() {
  const { isOrange, isDark } = useTheme();
  const [selectedBranch, setSelectedBranch] = useState("All Branches");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("All-time Season");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentRank | null>(null);

  // Filtered dataset
  const filteredStudents = useMemo(() => {
    return ALL_STUDENTS.filter((s) => {
      const matchBranch = selectedBranch === "All Branches" || s.branch === selectedBranch;
      const matchTrack = selectedTrack === "all" || s.track === selectedTrack;
      const matchSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.skills.some((sk) => sk.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchBranch && matchTrack && matchSearch;
    });
  }, [selectedBranch, selectedTrack, searchQuery]);

  // Top 3 Podium Students
  const top1 = ALL_STUDENTS.find((s) => s.rank === 1)!;
  const top2 = ALL_STUDENTS.find((s) => s.rank === 2)!;
  const top3 = ALL_STUDENTS.find((s) => s.rank === 3)!;

  // Logged-in user stats
  const currentUser = ALL_STUDENTS.find((s) => s.name.includes("(You)")) || ALL_STUDENTS[13];

  return (
    <div className="min-h-screen pb-20 space-y-8 animate-in fade-in duration-500">
      {/* ─────────────────────────────────────────────────────────────
          1. HEADER & LIVE SEASON STATUS
      ───────────────────────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border backdrop-blur-xl shadow-2xl transition-all"
        style={{
          background: isOrange
            ? "linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(37, 99, 235, 0.05) 50%, rgba(249, 115, 22, 0.08) 100%)"
            : "linear-gradient(135deg, rgba(13, 148, 136, 0.08) 0%, rgba(37, 99, 235, 0.05) 50%, rgba(124, 58, 237, 0.08) 100%)",
          borderColor: "var(--border-strong)",
        }}
      >
        {/* Glow Spheres */}
        <div
          className={`absolute top-0 right-1/4 w-96 h-96 ${
            isOrange ? "bg-orange-500/10" : "bg-teal-500/10"
          } rounded-full blur-3xl pointer-events-none -z-10`}
        />
        <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${
                  isOrange
                    ? "bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30"
                    : "bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/30"
                }`}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full ${
                      isOrange ? "bg-orange-400" : "bg-teal-400"
                    } opacity-75`}
                  ></span>
                  <span
                    className={`relative inline-flex rounded-full h-2 w-2 ${
                      isOrange ? "bg-orange-500" : "bg-teal-500"
                    }`}
                  ></span>
                </span>
                Season 2026 · Active
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3" style={{ color: "var(--text-primary)" }}>
              <span>Campus Champions Arena</span>
              <Trophy className="w-8 h-8 text-amber-500" />
            </h1>
          </div>

          {/* Quick Metrics Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Active Contenders", val: "1,450+", icon: UserCheck, color: "text-blue-500" },
              { label: "Tests Solved", val: "18.4K", icon: Zap, color: "text-amber-500" },
              { label: "Top Score", val: "9.68", icon: Crown, color: isOrange ? "text-orange-400" : "text-teal-400" },
              { label: "Max Streak", val: "68 Days", icon: Flame, color: "text-rose-500" },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl flex flex-col justify-center backdrop-blur-md transition-all hover:scale-105"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--border-subtle)",
                  }}
                >
                  <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                    <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                    {stat.label}
                  </div>
                  <div className="text-lg font-bold mt-1 font-mono" style={{ color: "var(--text-primary)" }}>
                    {stat.val}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. LOGGED-IN STUDENT PERSONAL STANDING HUD ("YOUR STANDINGS")
      ───────────────────────────────────────────────────────────── */}
      <div
        className="rounded-3xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl"
        style={{
          background: "linear-gradient(135deg, rgba(45, 212, 191, 0.12) 0%, rgba(99, 102, 241, 0.12) 100%)",
          border: "1.5px solid var(--accent-primary)",
        }}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center font-extrabold text-white text-xl shadow-lg ring-2 ring-teal-400/40">
                RK
              </div>
              <div className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 shadow">
                #{currentUser.rank}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg sm:text-xl flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <span>{currentUser.name}</span>
                  <VerifiedBadge size={16} className="shrink-0" />
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold border ${isOrange ? "bg-orange-500/20 text-orange-600 dark:text-orange-300 border-orange-500/30" : "bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/30"}`}>
                  {currentUser.tier} Tier
                </span>
              </div>
              <p className="text-xs sm:text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
                B.Tech CSE · Roll No: {currentUser.rollNo} · <span className="font-medium text-emerald-600 dark:text-emerald-400">Top 3.8% Campus Percentile</span>
              </p>
            </div>
          </div>

          {/* Key Quick Stats for Rahul */}
          <div className="flex items-center gap-4 sm:gap-6 flex-wrap w-full md:w-auto justify-between md:justify-end">
            <div className="text-left md:text-center">
              <div className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
                Your Score
              </div>
              <div className="text-xl font-black font-mono text-teal-600 dark:text-teal-300 flex items-center gap-1">
                {currentUser.score.toFixed(2)}
                <span className="text-xs font-normal opacity-70">/10</span>
              </div>
            </div>

            <div className="text-left md:text-center">
              <div className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
                Weekly Delta
              </div>
              <div className="text-sm font-extrabold text-emerald-500 flex items-center gap-1">
                <TrendingUp className="w-4 h-4" />
                ▲ +3 Ranks
              </div>
            </div>

            <div className="text-left md:text-center">
              <div className="text-[11px] uppercase tracking-wider font-bold" style={{ color: "var(--text-muted)" }}>
                Active Streak
              </div>
              <div className="text-sm font-extrabold text-amber-500 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500" />
                {currentUser.streakDays} Days
              </div>
            </div>

            <button
              onClick={() => setSelectedStudent(currentUser)}
              className="px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all"
              style={{ background: "var(--accent-primary)" }}
            >
              <span>Inspect My Standings</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Level Up Progress Indicator */}
        <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Target className="w-4 h-4 text-teal-500" />
            <span className="font-semibold" style={{ color: "var(--text-primary)" }}>
              Next Rank Target (#13 Yashvardhan J. - 7.95)
            </span>
            <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>(Needs +0.15 points)</span>
          </div>

          <div className="w-full sm:w-64 bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden ring-1 ring-teal-500/20">
            <div
              className="bg-gradient-to-r from-teal-400 to-indigo-500 h-full rounded-full transition-all duration-1000"
              style={{ width: "78%" }}
            />
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. HALL OF FAME MVP HIGHLIGHTS (3 CARDS)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Campus MVP */}
        <div
          onClick={() => setSelectedStudent(top1)}
          className="group cursor-pointer rounded-2xl p-5 border relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: "linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.04) 100%)",
            borderColor: "rgba(245, 158, 11, 0.35)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/40 flex items-center gap-1">
              <Crown className="w-3.5 h-3.5" /> 1st Overall Rank
            </span>
            <span className="text-xs font-mono font-bold text-amber-500">{top1.score} Rating</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center font-bold text-white text-lg shadow-md ring-2 ring-amber-400/50">
              PS
            </div>
            <div>
              <h4 className="font-bold text-base group-hover:text-amber-500 transition-colors" style={{ color: "var(--text-primary)" }}>
                {top1.name}
              </h4>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                CSE · {top1.problemsSolved} Solved · {top1.streakDays}d Streak 🔥
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Speed Champion */}
        <div
          onClick={() => setSelectedStudent(top2)}
          className="group cursor-pointer rounded-2xl p-5 border relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: "linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(59, 130, 246, 0.04) 100%)",
            borderColor: "rgba(6, 182, 212, 0.35)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 border border-cyan-500/40 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5" /> Speed Titan
            </span>
            <span className="text-xs font-mono font-bold text-cyan-500">{top2.accuracy}% Acc</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center font-bold text-white text-lg shadow-md ring-2 ring-cyan-400/50">
              SJ
            </div>
            <div>
              <h4 className="font-bold text-base group-hover:text-cyan-500 transition-colors" style={{ color: "var(--text-primary)" }}>
                {top2.name}
              </h4>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                IT · #2 Rank · {top2.skills[0]}, {top2.skills[1]}
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: AI Prodigy */}
        <div
          onClick={() => setSelectedStudent(top3)}
          className="group cursor-pointer rounded-2xl p-5 border relative overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: "linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(236, 72, 153, 0.04) 100%)",
            borderColor: "rgba(168, 85, 247, 0.35)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/40 flex items-center gap-1">
              <Brain className="w-3.5 h-3.5" /> AI Benchmark Top
            </span>
            <span className="text-xs font-mono font-bold text-purple-500">{top3.domainScore} Domain</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center font-bold text-white text-lg shadow-md ring-2 ring-purple-400/50">
              AG
            </div>
            <div>
              <h4 className="font-bold text-base group-hover:text-purple-500 transition-colors" style={{ color: "var(--text-primary)" }}>
                {top3.name}
              </h4>
              <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                AIML · #3 Rank · NLP Transformers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          4. 3D METALLIC GLOWING PODIUM (TOP 3 CHAMPIONS)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl border transition-all duration-300"
        style={{
          background: isDark
            ? isOrange
              ? "linear-gradient(180deg, #18120C 0%, #0D0906 100%)"
              : "linear-gradient(180deg, #090E17 0%, #06090F 100%)"
            : isOrange
            ? "linear-gradient(180deg, #FFF7ED 0%, #FFEDD5 100%)"
            : "linear-gradient(180deg, #F0FDFA 0%, #CCFBF1 100%)",
          borderColor: isDark
            ? "rgba(255, 255, 255, 0.12)"
            : isOrange
            ? "rgba(234, 88, 12, 0.25)"
            : "rgba(13, 148, 136, 0.25)",
          boxShadow: isDark
            ? "0 25px 60px -15px rgba(0, 0, 0, 0.7)"
            : isOrange
            ? "0 20px 50px -15px rgba(234, 88, 12, 0.15)"
            : "0 20px 50px -15px rgba(13, 148, 136, 0.15)",
        }}
      >
        {/* Ambient Top Light Beam */}
        <div
          className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-56 blur-3xl pointer-events-none transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-b from-amber-500/15 via-teal-500/10 to-transparent"
              : isOrange
              ? "bg-gradient-to-b from-amber-400/25 via-orange-300/15 to-transparent"
              : "bg-gradient-to-b from-teal-400/25 via-emerald-300/15 to-transparent"
          }`}
        />

        <div className="text-center mb-8 relative z-10">
          <span className={`inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest mb-1 ${isDark ? "text-amber-400/90" : isOrange ? "text-orange-600" : "text-teal-700"}`}>
            <Sparkles className="w-3.5 h-3.5" />
            Top 3 Grand Podium
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: "var(--text-primary)" }}>
            Hall of Legends · Gyan Ganga Institute of Technology and Sciences
          </h2>
        </div>

        {/* Podium Pillars Flex Arena */}
        <div className="relative z-10 flex flex-col md:flex-row items-end justify-center gap-6 sm:gap-8 pt-6 pb-2">
          {/* ────── 2ND PLACE (SILVER) ────── */}
          <div
            onClick={() => setSelectedStudent(top2)}
            className="group cursor-pointer order-2 md:order-1 flex flex-col items-center w-full md:w-64 transition-all duration-300 hover:scale-105"
          >
            {/* Avatar & Badges */}
            <div className="relative mb-3 flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-300 via-slate-100 to-slate-400 p-1 shadow-[0_0_25px_rgba(203,213,225,0.4)] transition-transform group-hover:scale-110">
                  <div className="w-full h-full rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-black text-slate-800 dark:text-slate-100 text-2xl">
                    SJ
                  </div>
                </div>
                <div className="absolute -top-2 -right-1 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-300 text-slate-900 flex items-center justify-center font-black text-xs shadow-lg border-2 border-slate-300 dark:border-slate-900">
                  🥈
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="font-extrabold text-base flex items-center justify-center gap-1.5 transition-colors group-hover:text-cyan-500" style={{ color: "var(--text-primary)" }}>
                <span>{top2.name}</span>
                <VerifiedBadge size={15} className="shrink-0" />
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {top2.branch} · {top2.batch}
              </div>
              <div className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700">
                Score: <span className="text-cyan-600 dark:text-cyan-400">{top2.score}</span>
              </div>
            </div>

            {/* Silver Pillar */}
            <div
              className="w-full rounded-t-2xl p-4 flex flex-col items-center justify-between border-t border-x border-slate-400/50 relative overflow-hidden shadow-2xl"
              style={{
                height: 140,
                background: isDark
                  ? "linear-gradient(180deg, rgba(148, 163, 184, 0.35) 0%, rgba(30, 41, 59, 0.9) 100%)"
                  : "linear-gradient(180deg, #E2E8F0 0%, #CBD5E1 100%)",
              }}
            >
              <div className="text-3xl font-black text-slate-700 dark:text-slate-300 font-mono tracking-wider">#2</div>
              <div className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider text-center">
                Runner-Up
              </div>
            </div>
          </div>

          {/* ────── 1ST PLACE (GOLD) ────── */}
          <div
            onClick={() => setSelectedStudent(top1)}
            className="group cursor-pointer order-1 md:order-2 flex flex-col items-center w-full md:w-72 transition-all duration-300 hover:scale-105"
          >
            {/* Crown animation */}
            <div className="relative mb-3 flex flex-col items-center">
              <Crown className="w-10 h-10 text-amber-500 dark:text-amber-400 animate-bounce mb-1 drop-shadow-[0_0_12px_rgba(251,191,36,0.8)]" />
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1.5 shadow-[0_0_40px_rgba(245,158,11,0.5)] transition-transform group-hover:scale-110">
                  <div className="w-full h-full rounded-full bg-amber-50 dark:bg-slate-950 flex items-center justify-center font-black text-amber-600 dark:text-amber-400 text-3xl">
                    PS
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-xl border-2 border-amber-300 dark:border-slate-950">
                  🥇
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="font-black text-lg flex items-center justify-center gap-1.5 transition-colors group-hover:text-amber-500" style={{ color: "var(--text-primary)" }}>
                <span>{top1.name}</span>
                <VerifiedBadge size={16} className="shrink-0" />
              </div>
              <div className="text-xs font-semibold text-amber-700 dark:text-amber-200/80">
                {top1.branch} · {top1.batch}
              </div>
              <div className="inline-block mt-1.5 px-3 py-1 rounded-full text-xs font-mono font-black bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/40 shadow-inner">
                Score: <span className="text-slate-900 dark:text-white text-sm font-black">{top1.score}</span>
              </div>
            </div>

            {/* Gold Pillar */}
            <div
              className="w-full rounded-t-2xl p-4 flex flex-col items-center justify-between border-t-2 border-x-2 border-amber-400/80 relative overflow-hidden shadow-[0_-10px_35px_rgba(245,158,11,0.3)]"
              style={{
                height: 190,
                background: isDark
                  ? "linear-gradient(180deg, rgba(245, 158, 11, 0.45) 0%, rgba(45, 20, 5, 0.95) 100%)"
                  : "linear-gradient(180deg, #FDE68A 0%, #F59E0B 100%)",
              }}
            >
              <div className="text-4xl font-black text-amber-950 dark:text-amber-300 font-mono tracking-wider drop-shadow-md">#1</div>
              <div className="text-xs font-black text-amber-950 dark:text-amber-300 uppercase tracking-widest text-center flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Campus Champion <Sparkles className="w-3 h-3" />
              </div>
            </div>
          </div>

          {/* ────── 3RD PLACE (BRONZE) ────── */}
          <div
            onClick={() => setSelectedStudent(top3)}
            className="group cursor-pointer order-3 md:order-3 flex flex-col items-center w-full md:w-64 transition-all duration-300 hover:scale-105"
          >
            {/* Avatar & Badges */}
            <div className="relative mb-3 flex flex-col items-center">
              <div className="relative">
                <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-700 via-orange-500 to-amber-800 p-1 shadow-[0_0_25px_rgba(217,119,6,0.35)] transition-transform group-hover:scale-110">
                  <div className="w-full h-full rounded-full bg-orange-50 dark:bg-slate-900 flex items-center justify-center font-black text-orange-700 dark:text-amber-200 text-2xl">
                    AG
                  </div>
                </div>
                <div className="absolute -top-2 -right-1 w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xs shadow-lg border-2 border-amber-400 dark:border-slate-900">
                  🥉
                </div>
              </div>
            </div>

            <div className="text-center mb-4">
              <div className="font-extrabold text-base flex items-center justify-center gap-1.5 transition-colors group-hover:text-orange-500" style={{ color: "var(--text-primary)" }}>
                <span>{top3.name}</span>
                <VerifiedBadge size={15} className="shrink-0" />
              </div>
              <div className="text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                {top3.branch} · {top3.batch}
              </div>
              <div className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/15 dark:bg-slate-800 text-orange-800 dark:text-slate-200 border border-orange-500/30 dark:border-slate-700">
                Score: <span className="text-orange-600 dark:text-orange-400">{top3.score}</span>
              </div>
            </div>

            {/* Bronze Pillar */}
            <div
              className="w-full rounded-t-2xl p-4 flex flex-col items-center justify-between border-t border-x border-amber-600/50 relative overflow-hidden shadow-2xl"
              style={{
                height: 110,
                background: isDark
                  ? "linear-gradient(180deg, rgba(180, 83, 9, 0.35) 0%, rgba(30, 20, 10, 0.9) 100%)"
                  : "linear-gradient(180deg, #FED7AA 0%, #FB923C 100%)",
              }}
            >
              <div className="text-2xl font-black text-amber-950 dark:text-amber-500 font-mono tracking-wider">#3</div>
              <div className="text-[11px] font-bold text-amber-950 dark:text-amber-400/80 uppercase tracking-wider text-center">
                2nd Runner-Up
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          5. INTERACTIVE FILTERS & SEARCH CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Track Category Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ overscrollBehaviorX: "contain" }}>
          {TRACK_OPTIONS.map((track) => {
            const Icon = track.icon;
            const active = selectedTrack === track.id;
            return (
              <button
                key={track.id}
                onClick={() => setSelectedTrack(track.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm"
                style={{
                  background: active ? "var(--accent-primary)" : "var(--surface-elevated)",
                  color: active ? "white" : "var(--text-secondary)",
                  border: `1px solid ${active ? "transparent" : "var(--border-subtle)"}`,
                }}
              >
                <Icon className={`w-4 h-4 ${active ? "text-white" : "text-teal-500"}`} />
                <span>{track.label}</span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Branch, Timeframe & Search */}
        <div
          className="rounded-2xl p-4 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 backdrop-blur-md"
          style={{
            background: "var(--surface-elevated)",
            border: "1px solid var(--border-subtle)",
          }}
        >
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search students by name, roll no, or skill (e.g. PyTorch, DSA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-xl text-xs sm:text-sm outline-none transition-all focus:ring-2 focus:ring-teal-500/30"
              style={{
                background: "var(--surface-bg)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Branch Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold mr-1 hidden sm:inline" style={{ color: "var(--text-muted)" }}>
              Branch:
            </span>
            {BRANCH_OPTIONS.map((b) => {
              const active = selectedBranch === b;
              return (
                <button
                  key={b}
                  onClick={() => setSelectedBranch(b)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                  style={{
                    background: active ? "var(--accent-primary)" : "var(--surface-bg)",
                    color: active ? "white" : "var(--text-secondary)",
                    border: `1px solid ${active ? "transparent" : "var(--border-strong)"}`,
                  }}
                >
                  {b}
                </button>
              );
            })}
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1.5">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-3 py-2 rounded-xl text-xs font-semibold outline-none cursor-pointer"
              style={{
                background: "var(--surface-bg)",
                border: "1px solid var(--border-strong)",
                color: "var(--text-primary)",
              }}
            >
              {TIMEFRAME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          6. RANKED TABLE / CARDS (FULL RANKINGS)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="rounded-3xl overflow-hidden shadow-xl border backdrop-blur-xl transition-all"
        style={{
          background: "var(--surface-elevated)",
          borderColor: "var(--border-subtle)",
        }}
      >
        <div
          className="px-6 py-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          style={{ borderColor: "var(--border-subtle)", background: "var(--surface-bg)" }}
        >
          <div className="flex items-center gap-2">
            <h3 className="font-extrabold text-base" style={{ color: "var(--text-primary)" }}>
              Campus Standings · Gyan Ganga Institute of Technology and Sciences
            </h3>
            <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
              {filteredStudents.length} Students
            </span>
          </div>

          <div className="text-xs text-slate-400">
            Updated 5 mins ago · Real-time verification
          </div>
        </div>

        {filteredStudents.length === 0 ? (
          <div className="text-center py-16 px-4">
            <Search className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-50" />
            <h4 className="font-bold text-base" style={{ color: "var(--text-primary)" }}>
              No students found
            </h4>
            <p className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>
              Try adjusting your search terms or filters.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full" style={{ overscrollBehavior: "auto" }}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className="border-b text-[11px] font-black uppercase tracking-wider font-mono"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
                >
                  <th className="py-3.5 px-4 sm:px-6 w-16">Rank</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">Branch & Roll</th>
                  <th className="py-3.5 px-4">Tier & Badges</th>
                  <th className="py-3.5 px-4 text-center">Score</th>
                  <th className="py-3.5 px-4 text-center">Solved</th>
                  <th className="py-3.5 px-4 text-center">Streak</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-sm" style={{ borderColor: "var(--border-subtle)" }}>
                {filteredStudents.map((student) => {
                  const isYou = student.name.includes("(You)");
                  const tierStyle = TIER_COLORS[student.tier] || TIER_COLORS.Gold;
                  const rankDelta = student.prevRank - student.rank;

                  return (
                    <tr
                      key={student.rank}
                      onClick={() => setSelectedStudent(student)}
                      className={`group cursor-pointer transition-all duration-150 ${
                        isYou
                          ? "bg-teal-500/10 dark:bg-teal-500/15 font-semibold"
                          : "hover:bg-slate-100/60 dark:hover:bg-white/[0.04]"
                      }`}
                    >
                      {/* Rank Number & Delta */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-mono font-black text-sm shadow-sm ${
                              student.rank === 1
                                ? "bg-amber-400 text-slate-950 ring-2 ring-amber-300"
                                : student.rank === 2
                                ? "bg-slate-300 text-slate-900 ring-2 ring-slate-200"
                                : student.rank === 3
                                ? "bg-amber-700 text-amber-100 ring-2 ring-amber-600"
                                : student.rank <= 10
                                ? "bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/30"
                                : "bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            {student.rank}
                          </div>

                          {/* Delta indicator */}
                          <div className="flex items-center text-[10px] font-bold">
                            {rankDelta > 0 ? (
                              <span className="text-emerald-500 flex items-center" title={`Climbed ${rankDelta} places`}>
                                <TrendingUp className="w-3 h-3" />
                                +{rankDelta}
                              </span>
                            ) : rankDelta < 0 ? (
                              <span className="text-rose-400 flex items-center" title={`Dropped ${Math.abs(rankDelta)} places`}>
                                <TrendingDown className="w-3 h-3" />
                                {rankDelta}
                              </span>
                            ) : (
                              <Minus className="w-3 h-3 text-slate-400 opacity-60" />
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Student Profile & Avatar */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${student.avatarColor} flex items-center justify-center font-bold text-white text-sm shadow ring-1 ring-white/20`}
                          >
                            {student.name
                              .replace(" (You)", "")
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5 font-bold" style={{ color: "var(--text-primary)" }}>
                              <span>{student.name}</span>
                              {isYou && (
                                <span className="px-1.5 py-0.2 rounded text-[10px] bg-teal-500 text-white font-black">
                                  YOU
                                </span>
                              )}
                              {student.rank === 1 && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <div className="text-xs flex items-center gap-2 mt-0.5" style={{ color: "var(--text-secondary)" }}>
                              <span>Batch {student.batch}</span>
                              <span>·</span>
                              <span className="text-[11px] text-teal-600 dark:text-teal-400">
                                {student.skills.slice(0, 2).join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Branch & Roll Number */}
                      <td className="py-4 px-4">
                        <div className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>
                          {student.branch} Engineering
                        </div>
                        <div className="text-[11px] font-mono mt-0.5" style={{ color: "var(--text-muted)" }}>
                          {student.rollNo}
                        </div>
                      </td>

                      {/* Tier Badge */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs border ${tierStyle.bg} ${tierStyle.text} ${tierStyle.border} ${tierStyle.glow}`}
                          >
                            {student.tier}
                          </span>
                          {student.badge && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                              {student.badge}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Overall Platform Score */}
                      <td className="py-4 px-4 text-center">
                        <div className="font-mono font-black text-base text-teal-600 dark:text-teal-300">
                          {student.score.toFixed(2)}
                        </div>
                        <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>
                          Domain: {student.domainScore.toFixed(1)}
                        </div>
                      </td>

                      {/* Problems Solved */}
                      <td className="py-4 px-4 text-center">
                        <div className="font-mono font-bold text-xs" style={{ color: "var(--text-primary)" }}>
                          {student.problemsSolved}
                        </div>
                        <div className="text-[10px] text-emerald-500 font-semibold">
                          {student.accuracy}% Acc
                        </div>
                      </td>

                      {/* Streak */}
                      <td className="py-4 px-4 text-center">
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                          <Flame className="w-3.5 h-3.5 fill-amber-500" />
                          {student.streakDays}d
                        </div>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedStudent(student);
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ml-auto group-hover:brightness-110"
                          style={{
                            background: isYou ? "var(--accent-primary)" : "var(--surface-bg)",
                            color: isYou ? "white" : "var(--accent-primary)",
                            border: "1px solid var(--border-strong)",
                          }}
                        >
                          <span>Inspect</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          7. STUDENT QUICK-INSPECT MODAL DRAWER
      ───────────────────────────────────────────────────────────── */}
      {selectedStudent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border relative animate-in zoom-in-95 duration-200"
            style={{
              background: "var(--surface-elevated)",
              borderColor: "var(--border-strong)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Banner */}
            <div
              className="p-6 relative overflow-hidden text-white"
              style={{
                background: `linear-gradient(135deg, rgba(13, 148, 136, 0.95), rgba(30, 41, 59, 0.98))`,
              }}
            >
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/50 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${selectedStudent.avatarColor} flex items-center justify-center font-extrabold text-white text-2xl shadow-xl ring-2 ring-white/30`}
                >
                  {selectedStudent.name
                    .replace(" (You)", "")
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-extrabold flex items-center gap-1.5">
                      <span>{selectedStudent.name}</span>
                      <VerifiedBadge size={18} className="shrink-0 drop-shadow-md" />
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow">
                      Rank #{selectedStudent.rank}
                    </span>
                  </div>
                  <p className="text-xs text-white/80 mt-1">
                    {selectedStudent.branch} Engineering · Roll: {selectedStudent.rollNo} · Batch {selectedStudent.batch}
                  </p>
                  <p className="text-[11px] text-teal-200 font-medium">
                    {selectedStudent.college}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-5">
              {/* Stat Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-2xl border text-center" style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}>
                  <div className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}>Platform Score</div>
                  <div className="text-lg font-black font-mono text-teal-500 mt-0.5">{selectedStudent.score.toFixed(2)}</div>
                </div>
                <div className="p-3 rounded-2xl border text-center" style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}>
                  <div className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}>Domain Score</div>
                  <div className="text-lg font-black font-mono text-blue-500 mt-0.5">{selectedStudent.domainScore.toFixed(1)}/10</div>
                </div>
                <div className="p-3 rounded-2xl border text-center" style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}>
                  <div className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}>Problems Solved</div>
                  <div className="text-lg font-black font-mono text-amber-500 mt-0.5">{selectedStudent.problemsSolved}</div>
                </div>
                <div className="p-3 rounded-2xl border text-center" style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}>
                  <div className="text-[11px] font-bold" style={{ color: "var(--text-muted)" }}>Practice Streak</div>
                  <div className="text-lg font-black font-mono text-rose-500 mt-0.5">{selectedStudent.streakDays} Days 🔥</div>
                </div>
              </div>

              {/* Skills Verified */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                  <VerifiedBadge size={15} className="shrink-0" />
                  <span>Verified Skills & Strengths</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedStudent.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                        isOrange
                          ? "bg-orange-500/10 text-orange-600 dark:text-orange-300 border border-orange-500/25"
                          : "bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/25"
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Head-to-Head Comparison with Rahul (You) */}
              {!selectedStudent.name.includes("(You)") && (
                <div className="p-4 rounded-2xl border" style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}>
                  <div className="flex items-center justify-between text-xs font-bold mb-2">
                    <span style={{ color: "var(--text-primary)" }}>Comparison with Your Stats (Rahul Kumar)</span>
                    <span className="text-teal-600 dark:text-teal-400">
                      Score Gap: {(selectedStudent.score - currentUser.score).toFixed(2)} pts
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{selectedStudent.name} ({selectedStudent.score})</span>
                        <span>You ({currentUser.score})</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-amber-500 h-full"
                          style={{ width: `${(selectedStudent.score / (selectedStudent.score + currentUser.score)) * 100}%` }}
                        />
                        <div
                          className="bg-teal-500 h-full"
                          style={{ width: `${(currentUser.score / (selectedStudent.score + currentUser.score)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setSelectedStudent(null)}
                  className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm border transition-all"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                >
                  Close Window
                </button>
                <button
                  onClick={() => {
                    alert(`Peer challenge invitation sent to ${selectedStudent.name}!`);
                    setSelectedStudent(null);
                  }}
                  className="flex-1 py-3 rounded-xl font-bold text-xs sm:text-sm text-white shadow-lg transition-all hover:brightness-110 active:scale-95"
                  style={{ background: "var(--accent-primary)" }}
                >
                  Challenge in Speed Quiz ⚡
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
