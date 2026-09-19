import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GraduationCap,
  Users,
  Building2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import CursorImageTrail from "@/components/CursorImageTrail";
import BlobCard from "@/components/ui/BlobCard";
import StreamConvergenceBackground from "@/components/ui/StreamConvergenceBackground";
import SwitchMode from "@/components/ui/SwitchMode";
import ThemePaletteToggle from "@/components/ui/ThemePaletteToggle";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/core/dock";
import TechScrollAnimation from "@/components/ui/text-scroll-animation";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useTheme } from "@/context/ThemeContext";

function getPlatformRoles(isOrange: boolean) {
  return [
    {
      id: "student",
      role: "Student",
      subtitle: "Learner & Placement Candidate",
      headline: "AI-Powered Career Intelligence & Cognitive Benchmarking",
      desc: "Benchmark 4 cognitive tracks with adaptive AI, build an employer-ready 360° verified profile, discover recruiter-matched opportunities, and generate ATS-compliant resumes with 1 click.",
      color: isOrange ? "#EA580C" : "#0D9488",
      bg: isOrange ? "rgba(234,88,12,0.12)" : "rgba(13,148,136,0.12)",
      icon: GraduationCap,
      path: "/student",
      badge: "Student Portal",
      metrics: [
        { label: "Adaptive Tracks", value: "4 Tracks" },
        { label: "Placement Readiness", value: "94% Avg" },
        { label: "ATS Resume Engine", value: "4 Formats" },
      ],
      features: [
        "Spider Radar scoring across 6 cognitive & domain axes",
        "Real-time campus & branch-wide leaderboard rankings",
        "Automated skill validation with GitHub & project linking",
        "Direct recruiter opportunity alerts with AI match percentage",
      ],
    },
    {
      id: "faculty",
      role: "Faculty",
      subtitle: "Mentor & Department Faculty",
      headline: "Cohort Progress Tracking & Targeted Student Mentorship",
      desc: "Monitor real-time student performance across technical domains, distribute institutional promo codes, diagnose batch skill gaps, and review cohort leaderboards.",
      color: "#2563EB",
      bg: "rgba(37,99,235,0.12)",
      icon: Users,
      path: "/college-faculty",
      badge: "Faculty Portal",
      metrics: [
        { label: "Cohort Visibility", value: "100% Live" },
        { label: "Promo Allocation", value: "Tiered Quotas" },
        { label: "Skill Gap Analysis", value: "AI-Powered" },
      ],
      features: [
        "Branch & Batch cohort grouping with granular student drill-downs",
        "Real-time progress matrix across DSA, Aptitude, and Verbal skills",
        "Faculty promo code quota allocation and redemption auditing",
        "Class leaderboard analytics & automated remedial learning triggers",
      ],
    },
    {
      id: "admin",
      role: "College Admin",
      subtitle: "Campus Dean & Placement Cell",
      headline: "Campus-Wide Placement Intelligence & NAAC Compliance",
      desc: "Gain comprehensive oversight across all engineering branches, monitor 365-day student activity heatmaps, provision faculty licenses, and export compliance-ready placement analytics.",
      color: isOrange ? "#F97316" : "#059669",
      bg: isOrange ? "rgba(249,115,22,0.12)" : "rgba(5,150,105,0.12)",
      icon: Building2,
      path: "/college-admin",
      badge: "Campus Admin",
      metrics: [
        { label: "Activity Heatmap", value: "365 Days" },
        { label: "Branch Performance", value: "6 Dept Views" },
        { label: "NAAC Ready Data", value: "Instant Export" },
      ],
      features: [
        "365-Day Student Activity Heatmap with daily volume & streak tracking",
        "Branch-wise platform score averages & learner tier distribution",
        "Faculty tree management and campus promo wallet control",
        "Real-time recruiter pipeline and placement readiness indices",
      ],
    },
    {
      id: "trainer",
      role: "Optus Trainer",
      subtitle: "Master Coach & Industry Expert",
      headline: "Cross-Campus Curriculum Delivery & Live Masterclasses",
      desc: "Deliver standardized CRT and advanced tech curriculum across multiple partner colleges, conduct proctored live assessments, and benchmark inter-college performance.",
      color: "#D97706",
      bg: "rgba(217,119,6,0.12)",
      icon: Sparkles,
      path: "/student",
      badge: "Optus Master",
      metrics: [
        { label: "Campus Reach", value: "Multi-University" },
        { label: "Proctored Tests", value: "AI Monitored" },
        { label: "Live Quiz Engine", value: "Synchronized" },
      ],
      features: [
        "Standardized multi-campus curriculum delivery and assessments",
        "Automated difficulty calibration for inter-college competitive tests",
        "Specialized bootcamps for FAANG, Big 4, and Tier-1 product roles",
        "Cross-institutional benchmarking and percentile distributions",
      ],
    },
    {
      id: "super",
      role: "Super Admin",
      subtitle: "Global SaaS Platform Operator",
      headline: "Multi-Tenant University Governance & SaaS Management",
      desc: "Manage onboarded universities, provision enterprise college instances, oversee global quiz package catalogs, and monitor platform-wide placement metrics.",
      color: "#7C3AED",
      bg: "rgba(124,58,237,0.12)",
      icon: ShieldCheck,
      path: "/super-admin",
      badge: "Super Admin",
      metrics: [
        { label: "Institutions Managed", value: "Enterprise" },
        { label: "Quiz Catalog", value: "100+ Packages" },
        { label: "System SLA", value: "99.98% Uptime" },
      ],
      features: [
        "University tenant provisioning, billing management, and domain whitelisting",
        "Master quiz repository and custom cognitive test package composer",
        "Platform-wide analytics, revenue reporting, and promo code minting",
        "Enterprise security controls, role-based permissions, and audit trails",
      ],
    },
  ];
}

function getTrailItems(isOrange: boolean, dark: boolean) {
  if (!dark) {
    // ==========================================
    // LIGHT THEME TRAIL CARDS (Vibrant Light Tint)
    // ==========================================
    return [
      // 1. NEURAL IQ
      <div
        key="1"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: isOrange
            ? "linear-gradient(135deg, #FFFFFF 0%, rgba(255, 237, 213, 0.95) 100%)"
            : "linear-gradient(135deg, #FFFFFF 0%, rgba(204, 251, 241, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: isOrange ? "#EA580C" : "#0D9488",
          boxShadow: isOrange
            ? "0 10px 25px -5px rgba(234, 88, 12, 0.25), 0 4px 10px -2px rgba(15, 23, 42, 0.08)"
            : "0 10px 25px -5px rgba(13, 148, 136, 0.25), 0 4px 10px -2px rgba(15, 23, 42, 0.08)",
        }}
      >
        <div className="flex items-center justify-between gap-1">
          <span
            className={`text-[9px] font-black uppercase tracking-wider ${
              isOrange ? "text-orange-950" : "text-teal-950"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            NEURAL IQ
          </span>
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isOrange ? "bg-orange-600" : "bg-teal-600"
            }`}
          />
        </div>
        <div className="text-sm font-black text-slate-900 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
          9.8 <span className={`text-[10px] font-bold ${isOrange ? "text-orange-900" : "text-teal-900"}`}>/ 10</span>
        </div>
        <div className={`text-[9px] font-bold truncate ${isOrange ? "text-orange-900/90" : "text-teal-900/90"}`}>
          Top 0.1% Percentile
        </div>
      </div>,

      // 2. ALGO GOD
      <div
        key="2"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: isOrange
            ? "linear-gradient(135deg, #FFFFFF 0%, rgba(254, 215, 170, 0.95) 100%)"
            : "linear-gradient(135deg, #FFFFFF 0%, rgba(209, 250, 229, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: isOrange ? "#F97316" : "#059669",
          boxShadow: isOrange
            ? "0 10px 25px -5px rgba(249, 115, 22, 0.25)"
            : "0 10px 25px -5px rgba(5, 150, 105, 0.25)",
        }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xs">⚡</span>
          <span
            className={`text-[9px] font-black uppercase tracking-wider ${
              isOrange ? "text-orange-950" : "text-emerald-950"
            }`}
            style={{ fontFamily: "var(--font-mono)" }}
          >
            ALGO GOD
          </span>
        </div>
        <div className="text-xs font-black text-slate-900 mt-0.5">React 19 + DSA</div>
        <div className={`text-[9px] font-bold ${isOrange ? "text-orange-900" : "text-emerald-900"}`}>
          FAANG Tier · S
        </div>
      </div>,

      // 3. RECRUITER RADAR
      <div
        key="3"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, rgba(219, 234, 254, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: "#2563EB",
          boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.25)",
        }}
      >
        <div className="flex items-center justify-between gap-1">
          <span className="text-[9px] font-black uppercase tracking-wider text-blue-950" style={{ fontFamily: "var(--font-mono)" }}>
            HOT MATCH 🔥
          </span>
        </div>
        <div className="text-xs font-black text-slate-900 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
          ₹32 LPA · SDE
        </div>
        <div className="text-[9px] font-bold text-blue-900 truncate">Direct Recruiter Hit</div>
      </div>,

      // 4. APEX TIER
      <div
        key="4"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, rgba(254, 243, 199, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: "#D97706",
          boxShadow: "0 10px 25px -5px rgba(217, 119, 6, 0.25)",
        }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xs">🏆</span>
          <span className="text-[9px] font-black uppercase tracking-wider text-amber-950" style={{ fontFamily: "var(--font-mono)" }}>
            APEX TIER
          </span>
        </div>
        <div className="text-xs font-black text-slate-900 mt-0.5">
          Rank #1 MVP
        </div>
        <div className="text-[9px] font-bold text-amber-900">GGITS '26</div>
      </div>,

      // 5. GODSPEED PLACEMENT
      <div
        key="5"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, rgba(243, 232, 255, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: "#7C3AED",
          boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.25)",
        }}
      >
        <div className="text-[9px] font-black uppercase tracking-wider text-purple-950" style={{ fontFamily: "var(--font-mono)" }}>
          PLACEMENT SPEED
        </div>
        <div className="text-xs font-black text-slate-900 mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
          99% GODSPEED
        </div>
        <div className="text-[9px] font-bold text-purple-900">Instant Hire Ready</div>
      </div>,

      // 6. PROOF OF SKILL
      <div
        key="6"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, rgba(252, 231, 243, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: "#DB2777",
          boxShadow: "0 10px 25px -5px rgba(219, 39, 119, 0.25)",
        }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xs">🛡️</span>
          <span className="text-[9px] font-black uppercase tracking-wider text-pink-950" style={{ fontFamily: "var(--font-mono)" }}>
            PROOF OF SKILL
          </span>
        </div>
        <div className="text-xs font-black text-slate-900 mt-0.5 flex items-center gap-1">
          <span>360° Verified</span>
          <VerifiedBadge size={13} className="shrink-0" />
        </div>
        <div className="text-[9px] font-bold text-pink-900">Zero Fluff · Legit</div>
      </div>,

      // 7. HYBRID BEAST
      <div
        key="7"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, rgba(255, 237, 213, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: "#EA580C",
          boxShadow: "0 10px 25px -5px rgba(234, 88, 12, 0.25)",
        }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xs">🔥</span>
          <span className="text-[9px] font-black uppercase tracking-wider text-orange-950" style={{ fontFamily: "var(--font-mono)" }}>
            HYBRID BEAST
          </span>
        </div>
        <div className="text-xs font-black text-slate-900 mt-0.5">Tech + Product</div>
        <div className="text-[9px] font-bold text-orange-900">Full-Spectrum</div>
      </div>,

      // 8. RADAR MATRIX
      <div
        key="8"
        className="p-2.5 rounded-xl border-2 shadow-xl transition-all select-none"
        style={{
          background: "linear-gradient(135deg, #FFFFFF 0%, rgba(224, 231, 255, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderColor: "#4F46E5",
          boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.25)",
        }}
      >
        <div className="flex items-center gap-1">
          <span className="text-xs">📊</span>
          <span className="text-[9px] font-black uppercase tracking-wider text-indigo-950" style={{ fontFamily: "var(--font-mono)" }}>
            RADAR MATRIX
          </span>
        </div>
        <div className="text-xs font-black text-slate-900 mt-0.5">6-Axis S-Tier</div>
        <div className="text-[9px] font-bold text-indigo-900">Code · EQ · Speed</div>
      </div>,
    ];
  }

  // ==========================================
  // DARK THEME TRAIL CARDS (Obsidian Dark Glass)
  // ==========================================
  return [
    // 1. NEURAL IQ
    <div
      key="1"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none"
      style={{
        background: isOrange
          ? "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(234, 88, 12, 0.35) 100%)"
          : "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(13, 148, 136, 0.35) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: isOrange ? "rgba(251, 146, 60, 0.5)" : "rgba(45, 212, 191, 0.5)",
        boxShadow: isOrange
          ? "0 10px 25px -5px rgba(234, 88, 12, 0.45)"
          : "0 10px 25px -5px rgba(13, 148, 136, 0.45)",
      }}
    >
      <div className="flex items-center justify-between gap-1">
        <span
          className={`text-[9px] font-black uppercase tracking-wider ${
            isOrange ? "text-orange-300" : "text-teal-300"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          NEURAL IQ
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full animate-pulse ${
            isOrange ? "bg-orange-400" : "bg-teal-400"
          }`}
        />
      </div>
      <div className="text-sm font-black text-white mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
        9.8 <span className={`text-[10px] font-normal ${isOrange ? "text-orange-200" : "text-teal-200"}`}>/ 10</span>
      </div>
      <div className={`text-[9px] font-semibold truncate ${isOrange ? "text-orange-100/80" : "text-teal-100/80"}`}>
        Top 0.1% Percentile
      </div>
    </div>,

    // 2. ALGO GOD
    <div
      key="2"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none"
      style={{
        background: isOrange
          ? "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(249, 115, 22, 0.35) 100%)"
          : "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(5, 150, 105, 0.35) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: isOrange ? "rgba(253, 186, 116, 0.5)" : "rgba(52, 211, 153, 0.5)",
        boxShadow: isOrange
          ? "0 10px 25px -5px rgba(249, 115, 22, 0.45)"
          : "0 10px 25px -5px rgba(5, 150, 105, 0.45)",
      }}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs">⚡</span>
        <span
          className={`text-[9px] font-black uppercase tracking-wider ${
            isOrange ? "text-orange-300" : "text-emerald-300"
          }`}
          style={{ fontFamily: "var(--font-mono)" }}
        >
          ALGO GOD
        </span>
      </div>
      <div className="text-xs font-black text-white mt-0.5">React 19 + DSA</div>
      <div className={`text-[9px] font-bold ${isOrange ? "text-orange-200/90" : "text-emerald-200/90"}`}>
        FAANG Tier · S
      </div>
    </div>,

    // 3. RECRUITER RADAR
    <div
      key="3"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(37, 99, 235, 0.35) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(96, 165, 250, 0.5)",
        boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.45)",
      }}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="text-[9px] font-black uppercase tracking-wider text-blue-300" style={{ fontFamily: "var(--font-mono)" }}>
          HOT MATCH 🔥
        </span>
      </div>
      <div className="text-xs font-black text-white mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
        ₹32 LPA · SDE
      </div>
      <div className="text-[9px] font-semibold text-blue-100/80 truncate">Direct Recruiter Hit</div>
    </div>,

    // 4. APEX TIER
    <div
      key="4"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(217, 119, 6, 0.35) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(251, 191, 36, 0.5)",
        boxShadow: "0 10px 25px -5px rgba(217, 119, 6, 0.45)",
      }}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs">🏆</span>
        <span className="text-[9px] font-black uppercase tracking-wider text-amber-300" style={{ fontFamily: "var(--font-mono)" }}>
          APEX TIER
        </span>
      </div>
      <div className="text-xs font-black text-white mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
        Rank #1 MVP
      </div>
      <div className="text-[9px] font-semibold text-amber-100/80">GGITS '26</div>
    </div>,

    // 5. GODSPEED PLACEMENT
    <div
      key="5"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none text-white"
      style={{
        background: "linear-gradient(135deg, rgba(124, 58, 237, 0.85) 0%, rgba(79, 70, 229, 0.85) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(167, 139, 250, 0.6)",
        boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.5)",
      }}
    >
      <div className="text-[9px] font-black uppercase tracking-wider text-purple-200" style={{ fontFamily: "var(--font-mono)" }}>
        PLACEMENT SPEED
      </div>
      <div className="text-xs font-black mt-0.5" style={{ fontFamily: "var(--font-mono)" }}>
        99% GODSPEED
      </div>
      <div className="text-[9px] font-semibold text-purple-200/90">Instant Hire Ready</div>
    </div>,

    // 6. PROOF OF SKILL
    <div
      key="6"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(236, 72, 153, 0.35) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(244, 114, 182, 0.5)",
        boxShadow: "0 10px 25px -5px rgba(236, 72, 153, 0.45)",
      }}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs">🛡️</span>
        <span className="text-[9px] font-black uppercase tracking-wider text-pink-300" style={{ fontFamily: "var(--font-mono)" }}>
          PROOF OF SKILL
        </span>
      </div>
      <div className="text-xs font-black text-white mt-0.5 flex items-center gap-1">
        <span>360° Verified</span>
        <VerifiedBadge size={13} className="shrink-0" />
      </div>
      <div className="text-[9px] font-semibold text-pink-100/80">Zero Fluff · Legit</div>
    </div>,

    // 7. HYBRID BEAST
    <div
      key="7"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(234, 88, 12, 0.35) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(251, 146, 60, 0.5)",
        boxShadow: "0 10px 25px -5px rgba(234, 88, 12, 0.45)",
      }}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs">🔥</span>
        <span className="text-[9px] font-black uppercase tracking-wider text-orange-300" style={{ fontFamily: "var(--font-mono)" }}>
          HYBRID BEAST
        </span>
      </div>
      <div className="text-xs font-black text-white mt-0.5">Tech + Product</div>
      <div className="text-[9px] font-semibold text-orange-100/80">Full-Spectrum</div>
    </div>,

    // 8. RADAR MATRIX
    <div
      key="8"
      className="p-2.5 rounded-xl border shadow-xl transition-all select-none"
      style={{
        background: "linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(99, 102, 241, 0.35) 100%)",
        backdropFilter: "blur(24px)",
        borderColor: "rgba(129, 140, 248, 0.5)",
        boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.45)",
      }}
    >
      <div className="flex items-center gap-1">
        <span className="text-xs">📊</span>
        <span className="text-[9px] font-black uppercase tracking-wider text-indigo-300" style={{ fontFamily: "var(--font-mono)" }}>
          RADAR MATRIX
        </span>
      </div>
      <div className="text-xs font-black text-white mt-0.5">6-Axis S-Tier</div>
      <div className="text-[9px] font-semibold text-indigo-100/80">Code · EQ · Speed</div>
    </div>,
  ];
}

function useCounter(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const start = Date.now();
        const tick = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        tick();
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return { count, ref };
}

export default function Landing({ dark, onToggleDark }: { dark: boolean; onToggleDark: () => void }) {
  const { isOrange } = useTheme();
  const q = useCounter(100000);
  const i = useCounter(50);
  const p = useCounter(94);
  const [selectedRoleIdx, setSelectedRoleIdx] = useState(0);
  const platformRoles = getPlatformRoles(isOrange);
  const activeRole = platformRoles[selectedRoleIdx] || platformRoles[0];
  const trailItems = getTrailItems(isOrange, dark);


  return (
    <div className="min-h-screen relative" style={{ background: "var(--surface-bg)", color: "var(--text-primary)", fontFamily: "var(--font-sans)" }}>
      {/* Stream Convergence WebGL Background in Dark Theme */}
      {dark && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-45 transition-opacity duration-700">
          <StreamConvergenceBackground speed={0.85} fidelity={0.6} scale={1.05} />
        </div>
      )}

      {/* Navbar */}
      <nav
        className="sticky top-0 z-50 flex items-center gap-6 px-8 py-4 border-b"
        style={{ background: "var(--surface-glass)", backdropFilter: "blur(20px) saturate(180%)", borderColor: "var(--border-subtle)" }}
      >
        <Link to="/" className="flex items-center gap-2.5 group">
          <div
            className="h-10 px-2.5 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 shadow-sm"
            style={{
              background: isOrange
                ? (dark ? "rgba(234, 88, 12, 0.15)" : "rgba(255, 237, 213, 0.7)")
                : (dark ? "rgba(13, 148, 136, 0.15)" : "rgba(204, 251, 241, 0.7)"),
              border: `1px solid ${isOrange ? "rgba(234, 88, 12, 0.25)" : "rgba(13, 148, 136, 0.25)"}`,
            }}
          >
            <img
              src="/logo/logo-transparent.png"
              alt="Optivators Logo"
              className="h-6 w-auto object-contain select-none"
              style={{
                filter: !isOrange
                  ? (dark ? "hue-rotate(145deg) saturate(1.2)" : "hue-rotate(145deg)")
                  : undefined,
              }}
            />
          </div>
          <span className="font-extrabold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>Optivators</span>
        </Link>
        <div className="hidden md:flex items-center gap-1 ml-6">
          {["Platform", "Features", "Colleges", "Pricing"].map(item => (
            <a key={item} href="#" className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors" style={{ color: "var(--text-secondary)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-primary)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
            >{item}</a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2.5">
          {/* Color Theme Selector (Green / Orange) */}
          <ThemePaletteToggle />

          {/* Dark / Light Toggle */}
          <SwitchMode width={60} height={30} isDark={dark} onToggle={onToggleDark} />

          <Link
            to="/login"
            className="px-4 py-2 rounded-xl text-sm font-semibold border transition-colors"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95 shadow-md"
            style={{
              background: isOrange
                ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                : "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)",
              boxShadow: isOrange
                ? "0 4px 14px rgba(234,88,12,0.35)"
                : "0 4px 14px rgba(13,148,136,0.35)",
            }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero with Cursor Trail ONLY on Hero section */}
      <CursorImageTrail items={trailItems} itemSize={118} trailLength={7} spawnDistance={55}>
        <section className="relative overflow-hidden py-24 px-8">
          {/* Background mesh */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <div
              className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
              style={{
                background: isOrange
                  ? "radial-gradient(circle, #EA580C 0%, transparent 70%)"
                  : "radial-gradient(circle, #0D9488 0%, transparent 70%)",
                filter: "blur(64px)",
              }}
            />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #2563EB 0%, transparent 70%)", filter: "blur(64px)" }} />
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
              style={{
                background: isOrange
                  ? "radial-gradient(circle, #EA580C 0%, transparent 70%)"
                  : "radial-gradient(circle, #0D9488 0%, transparent 70%)",
                filter: "blur(96px)",
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left text with Invisible Transparent Frosted Glass Shield */}
              <div
                className="relative rounded-3xl transition-all duration-300 backdrop-blur-2xl"
                style={{
                  background: "transparent",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                }}
              >
                <div className="relative z-10">
                  {/* Hero Brand Logo & AI Intelligence Badge */}
                  <div className="flex items-center gap-3.5 flex-wrap mb-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.92, y: -8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative group cursor-pointer inline-flex items-center px-4 py-2 rounded-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.03]"
                      style={{
                        background: dark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "rgba(255, 255, 255, 0.85)",
                        border: `1.5px solid ${isOrange ? "rgba(234, 88, 12, 0.28)" : "rgba(13, 148, 136, 0.28)"}`,
                        boxShadow: isOrange
                          ? "0 10px 25px -5px rgba(234, 88, 12, 0.2)"
                          : "0 10px 25px -5px rgba(13, 148, 136, 0.2)",
                      }}
                    >
                      {/* Ambient Logo Glow */}
                      <div
                        className="absolute inset-0 rounded-2xl blur-xl opacity-35 group-hover:opacity-75 transition-opacity pointer-events-none -z-10"
                        style={{
                          background: isOrange
                            ? "radial-gradient(circle, #EA580C 0%, transparent 70%)"
                            : "radial-gradient(circle, #0D9488 0%, transparent 70%)",
                        }}
                      />

                      <img
                        src="/logo/logo-transparent.png"
                        alt="Optivators Logo"
                        className="h-8 sm:h-9 w-auto object-contain select-none"
                        style={{
                          filter: !isOrange
                            ? (dark ? "hue-rotate(145deg) saturate(1.2)" : "hue-rotate(145deg)")
                            : undefined,
                        }}
                      />
                    </motion.div>

                    <div
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold uppercase tracking-widest"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent-primary)",
                        border: isOrange ? "1px solid rgba(234,88,12,0.2)" : "1px solid rgba(13,148,136,0.2)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-primary)" }} />
                      AI-Powered Career Intelligence · 2026
                    </div>
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                    Your Campus.{" "}
                    <span className="block" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                      <span className="shimmer-text">Cognitive.</span>
                    </span>
                    Career-Ready.
                  </h1>
                  <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    Optivators unifies cognitive benchmarking, 4-track assessment, 360° student profiles, Spider Radar scoring, and placement analytics — built for next-gen campus placement cells.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link
                      to="/student"
                      className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
                      style={{
                        background: isOrange
                          ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                          : "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)",
                        boxShadow: isOrange
                          ? "0 8px 24px rgba(234,88,12,0.35)"
                          : "0 8px 24px rgba(13,148,136,0.35)",
                      }}
                    >
                      <GradCapIcon /> Student Portal
                    </Link>
                    <Link to="/college-admin" className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold border transition-all hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}>
                      <BuildingIcon /> College Admin
                    </Link>
                    <a href="#" className="flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm transition-all" style={{ color: "var(--accent-primary)" }}>
                      Request Demo <ArrowRightIcon />
                    </a>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    {[
                      { label: "NAAC Accredited", icon: "✓" },
                      { label: "AICTE Approved", icon: "✓" },
                      { label: "ISO 27001", icon: "✓" },
                    ].map(({ label, icon }) => (
                      <div key={label} className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                        <span style={{ color: "var(--success)" }}>{icon}</span> {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Floating dashboard preview */}
              <div className="relative">
                <div className="float-anim relative">
                  {/* Main card */}
                  <div className="rounded-3xl overflow-hidden dark:border-white/20 dark:shadow-[0_32px_80px_-20px_rgba(0,0,0,0.8)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", boxShadow: "0 32px 64px -24px rgba(0,0,0,0.2)" }}>
                    {/* Header */}
                    <div className="px-6 pt-6 pb-4 border-b" style={{ borderColor: "var(--border-subtle)" }}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Cognitive Score</div>
                          <div className="text-4xl font-bold dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}>8.4 <span className="text-xl" style={{ color: "var(--text-muted)" }}>/ 10</span></div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Rank</div>
                          <div className="text-4xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--text-primary)" }}>#14</div>
                        </div>
                      </div>
                      <SpiderRadarMini isOrange={isOrange} />
                    </div>
                    {/* Track pills */}
                    <div className="px-6 py-4 grid grid-cols-2 gap-2">
                      {[
                        { label: "Tech Track", score: "9.1", color: isOrange ? "#FB923C" : "#2DD4BF" },
                        { label: "Non-Tech", score: "7.8", color: isOrange ? "#2563EB" : "#FB923C" },
                        { label: "Interview Prep", score: "8.0", color: "#38BDF8" },
                        { label: "CRT", score: "8.9", color: isOrange ? "#F97316" : "#34D399" },
                      ].map(({ label, score, color }) => (
                        <div key={label} className="flex items-center justify-between px-3 py-2 rounded-xl dark:border dark:border-white/10" style={{ background: "var(--surface-bg)" }}>
                          <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</span>
                          <span className="text-sm font-bold" style={{ fontFamily: "var(--font-mono)", color }}>{score}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating stat card */}
                  <div
                    className="float-anim-delay absolute -top-6 -right-6 px-4 py-3 rounded-2xl dark:border-white/20 dark:shadow-xl"
                    style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
                  >
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Placement Ready</div>
                    <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-mono)", color: "var(--success)" }}>94%</div>
                  </div>

                  {/* Skills Validated Card */}
                  <div
                    className={`float-anim absolute -bottom-4 -left-6 px-4 py-3 rounded-2xl ${isOrange ? "dark:border dark:border-orange-400/40" : "dark:border dark:border-teal-400/40"
                      }`}
                    style={{
                      background: isOrange
                        ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                        : "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)",
                      boxShadow: isOrange
                        ? "0 8px 24px rgba(234,88,12,0.4)"
                        : "0 8px 24px rgba(13,148,136,0.4)",
                    }}
                  >
                    <div
                      className={`text-xs font-bold uppercase tracking-widest mb-1 ${isOrange ? "text-orange-100" : "text-teal-100"
                        }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      Skills Validated
                    </div>
                    <div className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-mono)" }}>
                      12 / 18
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </CursorImageTrail>

      {/* Metric Counters */}
      <section className="py-16 px-8 border-y" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8" ref={q.ref}>
          {[
            { ref: q.ref, count: q.count, suffix: "K+", label: "Questions Attempted", sublabel: "Across all tracks & specializations" },
            { ref: i.ref, count: i.count, suffix: "+", label: "Partner Institutes", sublabel: "NAAC-accredited colleges nationwide" },
            { ref: p.ref, count: p.count, suffix: "%", label: "Placement Readiness", sublabel: "Average across partner campuses" },
          ].map(({ count, suffix, label, sublabel }, idx) => (
            <div key={idx} className="text-center">
              <div
                className={`text-5xl font-extrabold mb-2 ${isOrange ? "dark:drop-shadow-[0_2px_15px_rgba(251,146,60,0.35)]" : "dark:drop-shadow-[0_2px_15px_rgba(45,212,191,0.3)]"
                  }`}
                style={{ fontFamily: "var(--font-mono)", color: "var(--accent-primary)" }}
              >
                {count.toLocaleString()}{suffix}
              </div>
              <div className="font-bold mb-1" style={{ color: "var(--text-primary)" }}>{label}</div>
              <div className="text-sm" style={{ color: "var(--text-muted)" }}>{sublabel}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--accent-primary)", fontFamily: "var(--font-mono)" }}>Platform Capabilities</div>
            <h2 className="text-4xl font-extrabold mb-4" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
              Built for the{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>entire campus ecosystem</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              From individual cognitive benchmarking to institution-wide placement analytics — one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <BrainFeatureIcon />,
                tag: "Cognitive Engine",
                title: "4-Track Assessment System",
                description: "Tech, Non-Tech, Interview Prep, and CRT tracks powered by adaptive AI. Spider Radar scoring across 6 cognitive axes with automated percentile ranking.",
                accent: isOrange ? "#FB923C" : "#2DD4BF",
                items: ["Adaptive difficulty engine", "6-axis Spider Radar", "Proctored assessments", "Real-time scoring API"],
              },
              {
                icon: <ProfileFeatureIcon />,
                tag: "Student Identity",
                title: "360° Verified Profile",
                description: "Employer-ready profiles with validated skills, verified certifications, GitHub integration, and AI-generated placement readiness scores.",
                accent: "#38BDF8",
                items: ["Skill validation badges", "GitHub sync", "Resume AI builder", "Recruiter visibility controls"],
              },
              {
                icon: <AnalyticsFeatureIcon />,
                tag: "Campus Intelligence",
                title: "Multi-Tenant Analytics",
                description: "Branch-wise performance dashboards, cohort tracking, promo code wallet management, and faculty tree hierarchy — all in one admin panel.",
                accent: isOrange ? "#F97316" : "#34D399",
                items: ["Branch-wise breakdown", "Cohort benchmarking", "Faculty org tree", "Promo code wallet"],
              },
            ].map(({ icon, tag, title, description, accent, items }) => (
              <div
                key={title}
                className="rounded-3xl p-7 transition-all duration-300 group dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
                style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)", boxShadow: "0 4px 24px -8px rgba(0,0,0,0.06)" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 16px 48px -16px ${accent}50`; e.currentTarget.style.borderColor = `${accent}60`; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 4px 24px -8px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "var(--border-subtle)"; }}
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 dark:ring-1 dark:ring-white/10" style={{ background: `${accent}18`, color: accent }}>
                  {icon}
                </div>
                <div className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: accent, fontFamily: "var(--font-mono)" }}>{tag}</div>
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{title}</h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{description}</p>
                <ul className="space-y-2">
                  {items.map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: accent }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kinetic Scroll-Driven Connected Ecosystem & Tech Stack Convergence */}
      <TechScrollAnimation />

      {/* Role showcase with Apple-Style macOS Dock */}
      <section className="py-24 px-8 relative overflow-hidden" style={{ background: "var(--surface-elevated)" }}>
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-700"
          style={{ background: activeRole.color }}
        />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent-primary)",
                border: isOrange ? "1px solid rgba(234,88,12,0.2)" : "1px solid rgba(13,148,136,0.2)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-primary)" }} />
              ONE PLATFORM · FIVE STAKEHOLDERS
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ letterSpacing: "-0.02em", color: "var(--text-primary)" }}>
              One platform,{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                5 roles
              </span>
            </h2>
            <p className="text-base max-w-2xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              Select any role from the interactive dock below to discover customized dashboards, specialized tools, and workflows designed for every campus stakeholder.
            </p>
          </div>

          {/* Interactive Role Showcase Card */}
          <div className="mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-3xl p-8 lg:p-10 border transition-all duration-300 dark:border-white/20 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]"
                style={{
                  background: "var(--surface-bg)",
                  borderColor: "var(--border-strong)",
                  boxShadow: `0 20px 50px -15px ${activeRole.color}20`,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left info column (7 cols) */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-lg shrink-0 dark:ring-1 dark:ring-white/20"
                        style={{
                          background: `linear-gradient(135deg, ${activeRole.color}, ${activeRole.color}cc)`,
                          boxShadow: `0 8px 24px -4px ${activeRole.color}50`,
                        }}
                      >
                        <activeRole.icon size={24} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                            {activeRole.role}
                          </h3>
                          <span
                            className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider dark:border dark:border-white/10"
                            style={{
                              background: activeRole.bg,
                              color: activeRole.color,
                              fontFamily: "var(--font-mono)",
                            }}
                          >
                            {activeRole.badge}
                          </span>
                        </div>
                        <p className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>
                          {activeRole.subtitle}
                        </p>
                      </div>
                    </div>

                    <h4 className="text-lg font-bold leading-snug" style={{ color: activeRole.color }}>
                      {activeRole.headline}
                    </h4>

                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {activeRole.desc}
                    </p>

                    {/* Features list */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      {activeRole.features.map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-primary)" }}>
                          <CheckCircle2
                            size={15}
                            className="shrink-0 mt-0.5"
                            style={{ color: activeRole.color }}
                          />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                      <Link
                        to={activeRole.path}
                        className="px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          background: `linear-gradient(135deg, ${activeRole.color} 0%, ${activeRole.color}dd 100%)`,
                          boxShadow: `0 8px 24px -4px ${activeRole.color}45`,
                        }}
                      >
                        Launch {activeRole.role} Portal <ArrowRight size={16} />
                      </Link>
                      <Link
                        to="/register"
                        className="px-5 py-3 rounded-xl font-semibold text-sm border transition-colors hover:bg-black/5 dark:hover:bg-white/5 dark:border-white/20"
                        style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}
                      >
                        Get Access →
                      </Link>
                    </div>
                  </div>

                  {/* Right metrics & visual preview column (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      {activeRole.metrics.map(({ label, value }: { label: string; value: string }) => (
                        <div
                          key={label}
                          className="p-4 rounded-2xl border flex items-center justify-between transition-all dark:border-white/15 dark:shadow-md"
                          style={{
                            background: "var(--surface-elevated)",
                            borderColor: "var(--border-subtle)",
                          }}
                        >
                          <span className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>
                            {label}
                          </span>
                          <span
                            className="text-base font-extrabold"
                            style={{
                              fontFamily: "var(--font-mono)",
                              color: activeRole.color,
                            }}
                          >
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Quick navigation preview card */}
                    <div
                      className="p-4 rounded-2xl border text-xs"
                      style={{
                        background: activeRole.bg,
                        borderColor: `${activeRole.color}30`,
                        color: "var(--text-primary)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-1.5 font-bold">
                        <span className="flex items-center gap-1.5" style={{ color: activeRole.color }}>
                          <activeRole.icon size={14} /> {activeRole.role} Workflow Ready
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/50 dark:bg-black/40">
                          Active Route
                        </span>
                      </div>
                      <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                        Clicking below opens the live {activeRole.role} workspace with realistic sample student cohorts, assessment records, and analytics.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Apple-Style macOS Dock for Role Selection */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <Dock
                magnification={86}
                distance={150}
                direction="bottom"
                className="bg-white/90 dark:bg-[#0E1524]/90 border border-slate-200/90 dark:border-white/15 shadow-2xl backdrop-blur-2xl px-5 py-2.5 rounded-[32px]"
              >
                {platformRoles.map((role, idx) => {
                  const RoleIcon = role.icon;
                  const isSelected = selectedRoleIdx === idx;
                  return (
                    <DockItem
                      key={role.id}
                      active={isSelected}
                      onClick={() => setSelectedRoleIdx(idx)}
                      className="transition-all rounded-2xl shadow-sm border"
                      style={{
                        background: isSelected
                          ? `linear-gradient(135deg, ${role.color}, ${role.color}dd)`
                          : dark
                            ? "rgba(255,255,255,0.08)"
                            : "rgba(0,0,0,0.04)",
                        borderColor: isSelected
                          ? `${role.color}`
                          : dark
                            ? "rgba(255,255,255,0.12)"
                            : "rgba(0,0,0,0.08)",
                        color: isSelected ? "#FFFFFF" : dark ? "#F1F5F9" : "#334155",
                        boxShadow: isSelected ? `0 8px 24px -4px ${role.color}70` : "none",
                      }}
                    >
                      <DockLabel>{role.role}</DockLabel>
                      <DockIcon>
                        <RoleIcon
                          size={26}
                          className="transition-transform duration-200"
                          style={{
                            color: isSelected ? "#FFFFFF" : role.color,
                          }}
                        />
                      </DockIcon>
                    </DockItem>
                  );
                })}
              </Dock>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-8 relative" style={{ background: "var(--surface-bg)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
              style={{
                background: "var(--accent-soft)",
                color: "var(--accent-primary)",
                border: isOrange ? "1px solid rgba(234,88,12,0.2)" : "1px solid rgba(13,148,136,0.2)",
                fontFamily: "var(--font-mono)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-primary)" }} />
              TRANSPARENT CAMPUS PRICING
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold mb-4" style={{ letterSpacing: "-0.02em" }}>
              Invest in{" "}
              <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>
                <span className="shimmer-text">placement excellence</span>
              </span>
            </h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Flexible plans tailored for individual career growth, institutional cohort mastery, and multi-campus enterprise networks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Card 1: Student Career Pro */}
            <BlobCard
              isDark={dark}
              headerHeight={200}
              cardClassName={
                dark
                  ? isOrange
                    ? "bg-[#0F1520] border-orange-500/30 shadow-orange-500/10 text-white"
                    : "bg-[#0F1520] border-teal-500/30 shadow-teal-500/10 text-white"
                  : isOrange
                    ? "bg-orange-50/70 border-2 border-slate-900 shadow-xl text-slate-900"
                    : "bg-teal-50/70 border-2 border-slate-900 shadow-xl text-slate-900"
              }
              lightColors={isOrange ? ["#FDBA74", "#FED7AA", "#FB923C", "#FFEDD5"] : ["#99F6E4", "#A7F3D0", "#5EEAD4", "#CCFBF1"]}
              darkColors={isOrange ? ["#7c2d12", "#451a03", "#78350f", "#9a3412"] : ["#0f766e", "#042f2e", "#134e4a", "#115e59"]}
              glowColors={isOrange ? ["#EA580C", "#FB923C", "#F97316", "#FED7AA", "#EA580C"] : ["#0D9488", "#2DD4BF", "#06B6D4", "#14B8A6", "#0D9488"]}
              header={
                <div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 ${
                      dark
                        ? isOrange
                          ? "text-orange-300 bg-orange-500/15 border border-orange-500/30"
                          : "text-teal-300 bg-teal-500/15 border border-teal-500/30"
                        : isOrange
                          ? "text-orange-950 bg-orange-200/80 border border-slate-900"
                          : "text-teal-950 bg-teal-200/80 border border-slate-900"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    INDIVIDUAL STUDENT
                  </div>
                  <h3 className={`text-2xl font-extrabold ${dark ? "text-white" : "text-slate-900"}`}>Career Starter</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-4xl font-black ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "var(--font-mono)" }}>₹0</span>
                    <span className={`text-xs font-semibold ${dark ? "text-slate-400" : "text-slate-600"}`}>/ forever free</span>
                  </div>
                </div>
              }
            >
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className={`text-xs leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
                    Everything an ambitious student needs to benchmark cognitive IQ, build an ATS resume, and get recruiter discovered.
                  </p>

                  <div className={`space-y-3 pt-4 mt-4 border-t ${dark ? "border-white/10" : "border-slate-900/15"}`}>
                    <div
                      className={`text-[11px] font-bold uppercase tracking-wider ${
                        dark
                          ? isOrange
                            ? "text-orange-400"
                            : "text-teal-400"
                          : isOrange
                            ? "text-orange-950"
                            : "text-teal-950"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      INCLUDED FEATURES:
                    </div>
                    {[
                      "4-Track Cognitive Testing Engine",
                      "360° Verified Profile & Spider Radar",
                      "AI ATS Resume Builder (4 Templates)",
                      "Campus Peer Leaderboard Access",
                      "Direct Recruiter Opportunity Alerts",
                    ].map((f) => (
                      <div key={f} className={`flex items-center gap-2.5 text-xs font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            dark
                              ? isOrange
                                ? "text-orange-300 bg-orange-500/25 border-transparent"
                                : "text-teal-300 bg-teal-500/25 border-transparent"
                              : isOrange
                                ? "text-orange-950 bg-orange-200 border border-slate-900"
                                : "text-teal-950 bg-teal-200 border border-slate-900"
                          }`}
                        >
                          ✓
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/register"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    dark
                      ? isOrange
                        ? "text-orange-300 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 shadow-orange-500/20"
                        : "text-teal-300 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 shadow-teal-500/20"
                      : isOrange
                        ? "text-slate-950 bg-orange-200 hover:bg-orange-300 border-2 border-slate-900"
                        : "text-slate-950 bg-teal-200 hover:bg-teal-300 border-2 border-slate-900"
                  }`}
                >
                  Start Free Today
                </Link>
              </div>
            </BlobCard>

            {/* Card 2: Campus Institutional Pro (Featured) */}
            <BlobCard
              isDark={dark}
              headerHeight={215}
              cardClassName={
                dark
                  ? "bg-[#0F1520] border-purple-500/40 shadow-purple-500/20 ring-1 ring-purple-500/30 text-white"
                  : "bg-purple-50/70 border-2 border-slate-900 ring-2 ring-purple-900/20 shadow-2xl shadow-purple-950/10 text-slate-900"
              }
              lightColors={["#DDD6FE", "#F5D0FE", "#C4B5FD", "#FBCFE8"]}
              darkColors={["#4c0519", "#831843", "#4c1d95", "#312e81"]}
              glowColors={["#EC4899", "#8B5CF6", "#F43F5E", "#A855F7", "#EC4899"]}
              header={
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                        dark
                          ? "text-purple-300 bg-purple-500/15 border border-purple-500/30"
                          : "text-purple-950 bg-purple-200/80 border border-slate-900"
                      }`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      CAMPUS EDITION
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md ${
                        dark
                          ? "bg-gradient-to-r from-pink-500 to-purple-600"
                          : "bg-slate-900 border border-slate-900"
                      }`}
                    >
                      POPULAR
                    </span>
                  </div>
                  <h3 className={`text-2xl font-extrabold ${dark ? "text-white" : "text-slate-900"}`}>Institutional Pro</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-4xl font-black ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "var(--font-mono)" }}>₹499</span>
                    <span className={`text-xs font-semibold ${dark ? "text-slate-400" : "text-slate-600"}`}>/ student / year</span>
                  </div>
                </div>
              }
            >
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className={`text-xs leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
                    Turnkey placement suite for engineering & degree colleges scaling career readiness and NAAC/NIRF metrics.
                  </p>

                  <div className={`space-y-3 pt-4 mt-4 border-t ${dark ? "border-white/10" : "border-slate-900/15"}`}>
                    <div
                      className={`text-[11px] font-bold uppercase tracking-wider ${dark ? "text-purple-400" : "text-purple-950"}`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      EVERYTHING IN STARTER PLUS:
                    </div>
                    {[
                      "College Admin Dashboard & Branch KPIs",
                      "Hierarchical Faculty & Cohort Tree",
                      "Promo Credit Wallet & Faculty Allocations",
                      "NIRF & NAAC Placement Compliance Reports",
                      "Bulk Student CSV Onboarding & Sync",
                      "Dedicated Placement Cell Specialist",
                    ].map((f) => (
                      <div key={f} className={`flex items-center gap-2.5 text-xs font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            dark
                              ? "text-purple-300 bg-purple-500/25 border-transparent"
                              : "text-purple-950 bg-purple-200 border border-slate-900"
                          }`}
                        >
                          ✓
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to="/register"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold text-white shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    dark
                      ? "bg-gradient-to-r from-purple-600 to-pink-500 shadow-purple-500/25 hover:opacity-95"
                      : "bg-purple-700 hover:bg-purple-800 border-2 border-slate-900 shadow-purple-900/20"
                  }`}
                >
                  Deploy Campus Plan
                </Link>
              </div>
            </BlobCard>

            {/* Card 3: Enterprise University Group */}
            <BlobCard
              isDark={dark}
              headerHeight={200}
              cardClassName={
                dark
                  ? "bg-[#0F1520] border-amber-500/30 shadow-amber-500/10 text-white"
                  : "bg-amber-50/70 border-2 border-slate-900 shadow-xl text-slate-900"
              }
              lightColors={["#FDE68A", "#FED7AA", "#FEF08A", "#FCD34D"]}
              darkColors={["#78350f", "#451a03", "#7c2d12", "#7f1d1d"]}
              glowColors={["#F59E0B", "#F97316", "#EAB308", "#FB923C", "#F59E0B"]}
              header={
                <div>
                  <div
                    className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-3 ${
                      dark
                        ? "text-amber-300 bg-amber-500/15 border border-amber-500/30"
                        : "text-amber-950 bg-amber-200/80 border border-slate-900"
                    }`}
                    style={{ fontFamily: "var(--font-mono)" }}
                  >
                    GLOBAL SAAS & NETWORKS
                  </div>
                  <h3 className={`text-2xl font-extrabold ${dark ? "text-white" : "text-slate-900"}`}>Enterprise Network</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className={`text-4xl font-black ${dark ? "text-white" : "text-slate-900"}`} style={{ fontFamily: "var(--font-mono)" }}>Custom</span>
                    <span className={`text-xs font-semibold ${dark ? "text-slate-400" : "text-slate-600"}`}>/ multi-campus</span>
                  </div>
                </div>
              }
            >
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className={`text-xs leading-relaxed ${dark ? "text-slate-300" : "text-slate-700"}`}>
                    Tailored infrastructure for university consortiums, state education boards, and global SaaS edtech partners.
                  </p>

                  <div className={`space-y-3 pt-4 mt-4 border-t ${dark ? "border-white/10" : "border-slate-900/15"}`}>
                    <div
                      className={`text-[11px] font-bold uppercase tracking-wider ${dark ? "text-amber-400" : "text-amber-950"}`}
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      ENTERPRISE POWERS:
                    </div>
                    {[
                      "Multi-Tenant College Architecture",
                      "Custom Master Question Bank & Packages",
                      "Super Admin Global Oversight",
                      "Campus LMS & Single Sign-On (SAML/OAuth)",
                      "Dedicated Optus Master Trainers & Coaching",
                      "24/7 Priority SLA & Solutions Architect",
                    ].map((f) => (
                      <div key={f} className={`flex items-center gap-2.5 text-xs font-semibold ${dark ? "text-slate-200" : "text-slate-800"}`}>
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            dark
                              ? "text-amber-400 bg-amber-500/25 border-transparent"
                              : "text-amber-950 bg-amber-200 border border-slate-900"
                          }`}
                        >
                          ✓
                        </span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#contact"
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold shadow-md transition-all hover:scale-[1.01] active:scale-[0.99] ${
                    dark
                      ? "text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 shadow-amber-500/20"
                      : "text-slate-950 bg-amber-200 hover:bg-amber-300 border-2 border-slate-900"
                  }`}
                >
                  Contact Enterprise Team
                </a>
              </div>
            </BlobCard>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background: isOrange
                ? "radial-gradient(ellipse at 50% 50%, rgba(234,88,12,0.14) 0%, transparent 70%)"
                : "radial-gradient(ellipse at 50% 50%, rgba(13,148,136,0.12) 0%, transparent 70%)",
            }}
          />
        </div>
        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-extrabold mb-6" style={{ letterSpacing: "-0.02em" }}>
            Ready to benchmark{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}>your campus?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--text-secondary)" }}>
            Join 50+ partner institutes deploying Optivators for AI-powered placement readiness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/register"
              className="px-8 py-4 rounded-2xl font-bold text-white text-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: isOrange
                  ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                  : "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)",
                boxShadow: isOrange
                  ? "0 12px 32px rgba(234,88,12,0.4)"
                  : "0 12px 32px rgba(13,148,136,0.4)",
              }}
            >
              Start Free — Register as Student
            </Link>
            <a href="#" className="px-8 py-4 rounded-2xl font-bold text-lg border transition-all hover:bg-black/5 dark:hover:bg-white/5" style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)" }}>
              Request College Demo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-8 py-12" style={{ borderColor: "var(--border-subtle)", background: "var(--surface-elevated)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="h-9 px-2.5 rounded-xl flex items-center justify-center"
                  style={{
                    background: isOrange
                      ? (dark ? "rgba(234, 88, 12, 0.15)" : "rgba(255, 237, 213, 0.8)")
                      : (dark ? "rgba(13, 148, 136, 0.15)" : "rgba(204, 251, 241, 0.8)"),
                    border: `1px solid ${isOrange ? "rgba(234, 88, 12, 0.3)" : "rgba(13, 148, 136, 0.3)"}`,
                  }}
                >
                  <img
                    src="/logo/logo-transparent.png"
                    alt="Optivators Logo"
                    className="h-5 w-auto object-contain"
                    style={{
                      filter: !isOrange
                        ? (dark ? "hue-rotate(145deg) saturate(1.2)" : "hue-rotate(145deg)")
                        : undefined,
                    }}
                  />
                </div>
                <span className="font-extrabold text-lg" style={{ color: "var(--text-primary)" }}>Optivators</span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>Next-gen AI career readiness, cognitive testing & campus placement platform for modern institutions.</p>
              <div className="text-xs" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>© 2026 Optivators. All rights reserved.</div>
            </div>
            {[
              { heading: "Platform", links: ["Student Portal", "Faculty Portal", "Admin Panel", "Super Admin"] },
              { heading: "Features", links: ["Cognitive Testing", "360° Profile", "Resume Builder", "Leaderboard"] },
              { heading: "Company", links: ["About", "Careers", "Blog", "Contact"] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>{heading}</div>
                <ul className="space-y-2.5">
                  {links.map(link => (
                    <li key={link}><a href="#" className="text-sm transition-colors" style={{ color: "var(--text-secondary)" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "var(--accent-primary)")}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
                    >{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

function SpiderRadarMini({ isOrange }: { isOrange?: boolean }) {
  const [spreadProgress, setSpreadProgress] = useState(0);
  const containerRef = useRef<SVGSVGElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const duration = 1400;
            const startTime = performance.now();

            const animate = (time: number) => {
              const elapsed = time - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setSpreadProgress(eased);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setSpreadProgress(1);
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const labels = ["Technical", "Coding", "Aptitude", "Reasoning", "English", "Problem"];
  const values = [0.88, 0.75, 0.82, 0.90, 0.70, 0.85];
  const cx = 100, cy = 80, r = 60;
  const n = labels.length;
  const points = values.map((v, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const currentVal = v * spreadProgress;
    return { x: cx + currentVal * r * Math.cos(angle), y: cy + currentVal * r * Math.sin(angle) };
  });
  const gridPoints = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
  const polyPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const primaryColor = isOrange ? "#FB923C" : "#2DD4BF";
  const darkAccent = isOrange ? "#EA580C" : "#0D9488";

  return (
    <svg ref={containerRef} viewBox="0 0 200 160" className="w-full select-none overflow-visible" style={{ maxHeight: 160 }}>
      <defs>
        <radialGradient id="miniRadarGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={darkAccent} stopOpacity="0.08" />
        </radialGradient>
      </defs>
      {[0.25, 0.5, 0.75, 1].map(scale => {
        const ringScale = scale * Math.min(1, spreadProgress * 1.15);
        return (
          <polygon
            key={scale}
            points={gridPoints.map(p => `${cx + (p.x - cx) * ringScale},${cy + (p.y - cy) * ringScale}`).join(" ")}
            fill="none" stroke="var(--border-subtle)" strokeWidth="0.75"
          />
        );
      })}
      {gridPoints.map((p, i) => {
        const lineProg = Math.min(1, spreadProgress * 1.2);
        return <line key={i} x1={cx} y1={cy} x2={cx + (p.x - cx) * lineProg} y2={cy + (p.y - cy) * lineProg} stroke="var(--border-subtle)" strokeWidth="0.75" />;
      })}
      <path d={polyPath} fill="url(#miniRadarGrad)" stroke={darkAccent} strokeWidth="2" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3 * spreadProgress} fill={darkAccent} stroke="#FFFFFF" strokeWidth={0.75} />
      ))}
    </svg>
  );
}

function BrainFeatureIcon() {
  return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4.5a2.5 2.5 0 0 0-4.96-.46 2.5 2.5 0 0 0-1.98 3 2.5 2.5 0 0 0-1.32 4.24 3 3 0 0 0 .34 5.58 2.5 2.5 0 0 0 2.96 3.08 2.5 2.5 0 0 0 4.91.05L12 20V4.5z" /><path d="M16.5 7.5a2.5 2.5 0 0 1 1.98 3 2.5 2.5 0 0 1 1.32 4.24 3 3 0 0 1-.34 5.58 2.5 2.5 0 0 1-2.96 3.08A2.5 2.5 0 0 1 12 20V4.5a2.5 2.5 0 0 1 4.5 3z" /></svg>;
}
function ProfileFeatureIcon() {
  return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /><polyline points="16,21 21,16 16,11" /></svg>;
}
function AnalyticsFeatureIcon() {
  return <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>;
}
function GradCapIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
}
function BuildingIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /></svg>;
}
function ArrowRightIcon() {
  return <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>;
}
function MoonIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>;
}
function SunIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>;
}
