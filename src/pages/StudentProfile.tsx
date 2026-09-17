import React, { useState, useEffect, useRef, useCallback } from "react";
import { AnimatedCircularProgressBar } from "@/registry/magicui/animated-circular-progress-bar";
import { AnimatedLinearProgress } from "@/components/ui/AnimatedLinearProgress";
import { StudentProfileLinks } from "@/components/ui/StudentProfileLinks";
import { VerifiedBadge } from "@/components/ui/VerifiedBadge";
import { useTheme } from "@/context/ThemeContext";
import {
  RotateCcw,
  Sparkles,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Plus,
  Trash2,
  Save,
  Globe,
  Loader2,
  Award,
  Pencil,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Mail,
  Phone,
  Building,
  FileText,
  User,
} from "lucide-react";
import {
  getStudentProfile,
  updateStudentProfile,
} from "@/api/students/profile";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const RADAR_AXES = [
  { name: "Technical", score: 88, desc: "Data structures, algorithms, system design" },
  { name: "Coding", score: 75, desc: "Execution speed, clean syntax, edge cases" },
  { name: "Aptitude", score: 82, desc: "Quantitative problem solving & logic" },
  { name: "Reasoning", score: 90, desc: "Critical thinking, pattern recognition" },
  { name: "English", score: 70, desc: "Verbal clarity & business comprehension" },
  { name: "Problem\nSolving", score: 85, desc: "Algorithmic thinking & modular design" },
];

function RadarChart() {
  const { isOrange } = useTheme();
  const [spreadProgress, setSpreadProgress] = useState(0);
  const [activeHover, setActiveHover] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const startSpreadAnimation = useCallback(() => {
    setSpreadProgress(0);
    const duration = 1400; // 1.4s smooth spread
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
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            startSpreadAnimation();
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, startSpreadAnimation]);

  const cx = 160, cy = 150, r = 95;
  const n = RADAR_AXES.length;
  const gridScales = [0.25, 0.5, 0.75, 1.0];

  const points = RADAR_AXES.map((axis, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    const currentVal = (axis.score / 100) * spreadProgress;
    return {
      x: cx + currentVal * r * Math.cos(angle),
      y: cy + currentVal * r * Math.sin(angle),
      targetX: cx + (axis.score / 100) * r * Math.cos(angle),
      targetY: cy + (axis.score / 100) * r * Math.sin(angle),
      angle,
      ...axis,
    };
  });

  const gridPts = Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle,
    };
  });

  const labelPts = RADAR_AXES.map((axis, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return {
      x: cx + (r + 26) * Math.cos(angle),
      y: cy + (r + 26) * Math.sin(angle),
      name: axis.name,
      score: axis.score,
      desc: axis.desc,
      angle,
    };
  });

  const polyPath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div ref={containerRef} className="relative w-full select-none">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold"
            style={{
              background: "rgba(13,148,136,0.15)",
              color: "var(--accent-primary)",
              border: "1px solid rgba(13,148,136,0.25)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            6-Axis Spider Web
          </span>
          {activeHover !== null && (
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/20 animate-in fade-in">
              {RADAR_AXES[activeHover].name.replace("\n", " ")}: {RADAR_AXES[activeHover].score}%
            </span>
          )}
        </div>
        <button
          onClick={startSpreadAnimation}
          title="Replay Spider Web Spreading"
          className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-teal-400 flex items-center gap-1 text-xs font-semibold"
        >
          <RotateCcw size={13} className={spreadProgress < 1 && spreadProgress > 0 ? "animate-spin" : ""} />
          <span>Spread Web</span>
        </button>
      </div>

      <svg viewBox="0 0 320 300" className="w-full overflow-visible" style={{ maxHeight: 280 }}>
        <defs>
          <radialGradient id="spiderWebGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={isOrange ? "#FB923C" : "#2DD4BF"} stopOpacity="0.45" />
            <stop offset="60%" stopColor={isOrange ? "#EA580C" : "#0D9488"} stopOpacity="0.25" />
            <stop offset="100%" stopColor={isOrange ? "#C2410C" : "#0F766E"} stopOpacity="0.08" />
          </radialGradient>
          <filter id="spiderGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {gridScales.map((s, ringIdx) => {
          const ringScale = s * Math.min(1, spreadProgress * 1.15);
          const ringPoints = gridPts
            .map((p) => `${cx + (p.x - cx) * ringScale},${cy + (p.y - cy) * ringScale}`)
            .join(" ");
          return (
            <polygon
              key={s}
              points={ringPoints}
              fill={ringIdx === 3 ? (isOrange ? "rgba(234,88,12,0.05)" : "rgba(13,148,136,0.04)") : "none"}
              stroke={isOrange ? "rgba(251, 146, 60, 0.3)" : "rgba(45, 212, 191, 0.25)"}
              strokeWidth={s === 1 ? 1.2 : 0.75}
              strokeDasharray={s === 1 ? "none" : "3,3"}
              className="transition-all duration-100"
            />
          );
        })}

        {gridPts.map((p, i) => {
          const axisLineProgress = Math.min(1, spreadProgress * 1.2);
          const endX = cx + (p.x - cx) * axisLineProgress;
          const endY = cy + (p.y - cy) * axisLineProgress;
          const isHovered = activeHover === i;
          return (
            <g key={i}>
              <line
                x1={cx}
                y1={cy}
                x2={endX}
                y2={endY}
                stroke={isHovered ? (isOrange ? "#FB923C" : "#2DD4BF") : (isOrange ? "rgba(251, 146, 60, 0.3)" : "rgba(45, 212, 191, 0.25)")}
                strokeWidth={isHovered ? 1.75 : 0.85}
                className="transition-colors duration-150"
              />
            </g>
          );
        })}

        <path
          d={polyPath}
          fill="url(#spiderWebGradient)"
          stroke={isOrange ? "#FB923C" : "#2DD4BF"}
          strokeWidth="2.5"
          strokeLinejoin="round"
          filter="url(#spiderGlow)"
          className="transition-all duration-75"
        />

        {points.map((p, i) => {
          const isHovered = activeHover === i;
          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setActiveHover(i)}
              onMouseLeave={() => setActiveHover(null)}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 8 : 5.5 * spreadProgress}
                fill={isOrange ? "#FB923C" : "#2DD4BF"}
                fillOpacity={isHovered ? 0.45 : 0.25}
                className={spreadProgress >= 1 ? "animate-ping" : ""}
                style={{ animationDuration: "3.5s" }}
              />
              <circle
                cx={p.x}
                cy={p.y}
                r={isHovered ? 5.5 : 4 * spreadProgress}
                fill={isOrange ? "#EA580C" : "#0D9488"}
                stroke="#FFFFFF"
                strokeWidth={1.5}
                className="transition-all duration-150"
              />
            </g>
          );
        })}

        {labelPts.map((p, i) => {
          const isHovered = activeHover === i;
          const currentScore = Math.round(p.score * spreadProgress);
          return (
            <g
              key={i}
              className="cursor-pointer"
              onMouseEnter={() => setActiveHover(i)}
              onMouseLeave={() => setActiveHover(null)}
            >
              <text
                x={p.x}
                y={p.y - (p.name.includes("\n") ? 6 : 0)}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                  fontSize: 10.5,
                  fill: isHovered ? "var(--accent-primary)" : "var(--text-secondary)",
                  fontFamily: "var(--font-sans)",
                  fontWeight: isHovered ? 700 : 600,
                  transition: "fill 0.15s ease",
                }}
              >
                {p.name.split("\n").map((line, li) => (
                  <tspan key={li} x={p.x} dy={li === 0 ? 0 : 12}>
                    {line}
                  </tspan>
                ))}
              </text>

              {spreadProgress > 0.35 && (
                <text
                  x={p.x}
                  y={p.y + (p.name.includes("\n") ? 17 : 11)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{
                    fontSize: 9.5,
                    fill: isOrange ? "#FB923C" : "#2DD4BF",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    opacity: Math.min(1, (spreadProgress - 0.35) * 2),
                  }}
                >
                  {currentScore}%
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function CircleProgress({ value, size = 68, color, label }: { value: number; size?: number; color?: string; label: string }) {
  const { isOrange } = useTheme();
  const resolvedColor = color || (isOrange ? "#EA580C" : "#0D9488");
  return (
    <div className="flex flex-col items-center gap-2 group transition-transform duration-200 hover:scale-105">
      <AnimatedCircularProgressBar
        value={value}
        size={size}
        strokeWidth={6}
        gaugePrimaryColor={resolvedColor}
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
  const { isOrange, isDark } = useTheme();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Profile Form States
  const [name, setName] = useState("Rahul Kumar");
  const [bio, setBio] = useState("Passionate Full-Stack Developer & Competitive Programmer exploring scalable backend architectures, AI systems, and microservices.");
  const [photoUrl, setPhotoUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("https://drive.google.com/file/d/rahul_resume_2025.pdf");
  const [githubUrl, setGithubUrl] = useState("https://github.com/rahulkumar-dev");
  const [linkedinUrl, setLinkedinUrl] = useState("https://linkedin.com/in/rahulkumar-ggits");
  const [portfolioUrl, setPortfolioUrl] = useState("https://rahulkumar.dev");
  const [completionPct, setCompletionPct] = useState(92);

  // Other meta
  const [college, setCollege] = useState("Gyan Ganga Institute of Technology and Sciences (GGITS)");
  const [branch, setBranch] = useState("Computer Science Engineering");
  const [rollNo, setRollNo] = useState("0208CS211040");
  const [email, setEmail] = useState("rahul.kumar@ggits.net");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [cgpa, setCgpa] = useState("8.9");
  const [rank, setRank] = useState("#14");

  // Lists
  const [skills, setSkills] = useState<string[]>([
    "Python", "React", "Java", "Docker", "SQL", "TypeScript", "Node.js", "Redis", "Figma", "Problem Solving"
  ]);
  const [newSkill, setNewSkill] = useState("");

  const [education, setEducation] = useState<any[]>([
    {
      school: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science and Engineering",
      startDate: "2021-08-01",
      endDate: "2025-05-30",
      current: true,
    },
    {
      school: "Delhi Public School, R.K. Puram",
      degree: "Senior Secondary (CBSE 12th)",
      fieldOfStudy: "PCM with Computer Science",
      startDate: "2019-04-01",
      endDate: "2021-03-31",
      current: false,
    },
  ]);

  const [experience, setExperience] = useState<any[]>([
    {
      company: "Infosys",
      position: "Software Engineering Intern",
      location: "Bangalore (Hybrid)",
      startDate: "2024-05-01",
      endDate: "2024-08-31",
      current: false,
      description: "Built REST APIs with Node.js and Express. Optimized PostgreSQL query performance by 40%.",
    },
    {
      company: "StartupXYZ",
      position: "Frontend Developer",
      location: "Remote",
      startDate: "2024-01-01",
      endDate: "",
      current: true,
      description: "Developed React dashboards for 5K+ users. Implemented real-time data streaming with WebSockets.",
    },
  ]);

  const [projects, setProjects] = useState<any[]>([
    {
      title: "Optivators Platform",
      description: "Full-stack EdTech platform with assessment engine, real-time analytics, and cognitive skill evaluations.",
      link: "https://github.com/rahulkumar-dev/optivators",
      tags: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    },
    {
      title: "AI Resume Analyzer",
      description: "NLP-powered resume scoring and recommendation system using OpenAI APIs and vector databases.",
      link: "https://github.com/rahulkumar-dev/resume-analyzer",
      tags: ["Python", "FastAPI", "OpenAI", "Vector DB"],
    },
    {
      title: "DSA Visualizer",
      description: "Interactive algorithm visualization tool for sorting, graph traversals, and dynamic programming.",
      link: "https://rahulkumar.dev/dsa-visualizer",
      tags: ["TypeScript", "D3.js", "Canvas"],
    },
  ]);

  // Fetch own profile
  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getStudentProfile();
      if (data.name) setName(data.name);
      if (data.college) setCollege(data.college);
      if (data.branch) setBranch(data.branch);
      if (data.rollNo) setRollNo(data.rollNo);
      if (data.email) setEmail(data.email);
      if (data.phone) setPhone(data.phone);
      if (data.cgpa) setCgpa(data.cgpa);
      if (data.rank) setRank(data.rank);

      if (data.profile) {
        setBio(data.profile.bio || "");
        setPhotoUrl(data.profile.photoUrl || "");
        setResumeUrl(data.profile.resumeUrl || "");
        setGithubUrl(data.profile.githubUrl || "");
        setLinkedinUrl(data.profile.linkedinUrl || "");
        setPortfolioUrl(data.profile.portfolioUrl || "");
        setCompletionPct(data.profile.completionPercentage || 92);
        if (data.profile.skills && data.profile.skills.length > 0) {
          setSkills(data.profile.skills.map((s: any) => (typeof s === "string" ? s : s.name)));
        }
        if (data.profile.education && data.profile.education.length > 0) {
          setEducation(data.profile.education);
        }
        if (data.profile.experience && data.profile.experience.length > 0) {
          setExperience(data.profile.experience);
        }
        if (data.profile.projects && data.profile.projects.length > 0) {
          setProjects(data.profile.projects);
        }
      }
    } catch (err) {
      console.error("Error loading profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Save profile updates
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updatedProfile = await updateStudentProfile({
        name,
        bio,
        photoUrl,
        resumeUrl,
        githubUrl,
        linkedinUrl,
        portfolioUrl,
        skills,
        education,
        experience,
        projects,
      });

      setCompletionPct(updatedProfile.completionPercentage || 95);
      setIsEditing(false);
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 4000);
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // List adding helpers
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (indexToRemove: number) => {
    setSkills(skills.filter((_, idx) => idx !== indexToRemove));
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", current: false },
    ]);
  };

  const updateEducation = (idx: number, field: string, val: any) => {
    const updated = [...education];
    updated[idx] = { ...updated[idx], [field]: val };
    setEducation(updated);
  };

  const removeEducation = (idx: number) => {
    setEducation(education.filter((_, i) => i !== idx));
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { company: "", position: "", location: "", startDate: "", endDate: "", current: false, description: "" },
    ]);
  };

  const updateExperience = (idx: number, field: string, val: any) => {
    const updated = [...experience];
    updated[idx] = { ...updated[idx], [field]: val };
    setExperience(updated);
  };

  const removeExperience = (idx: number) => {
    setExperience(experience.filter((_, i) => i !== idx));
  };

  const addProject = () => {
    setProjects([
      ...projects,
      { title: "", description: "", link: "", tags: [] },
    ]);
  };

  const updateProject = (idx: number, field: string, val: any) => {
    const updated = [...projects];
    if (field === "tags") {
      updated[idx] = {
        ...updated[idx],
        tags: typeof val === "string" ? val.split(",").map((s: string) => s.trim()).filter(Boolean) : val,
      };
    } else {
      updated[idx] = { ...updated[idx], [field]: val };
    }
    setProjects(updated);
  };

  const removeProject = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-teal-400 animate-spin" />
        <p className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>Loading student profile...</p>
      </div>
    );
  }

  // ==========================================
  // EDIT MODE: Profile Building Module Layout
  // ==========================================
  if (isEditing) {
    return (
      <div className="space-y-8 max-w-6xl mx-auto animate-in fade-in duration-200">
        {/* Header with Title & Back to Profile Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-teal-400 cursor-pointer"
                title="Back to View Mode"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: "var(--text-primary)" }}>
                Profile Building Module
              </h1>
            </div>
            <p className="text-xs sm:text-sm mt-1 sm:ml-10" style={{ color: "var(--text-secondary)" }}>
              Build your professional EdTech identity. Add projects, verified handles, and experience.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing(false)}
            className="self-start sm:self-center px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
          >
            Cancel & View Profile
          </button>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left panel: Completion details & core fields */}
          <div className="space-y-6 lg:col-span-1">
            {/* Completion Widget */}
            <div className="glass-card rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
              <h2 className="text-base sm:text-lg font-bold flex items-center gap-2 mb-4" style={{ color: "var(--text-primary)" }}>
                <Sparkles className="w-5 h-5 text-teal-400" />
                <span>Profile Completion</span>
              </h2>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl font-extrabold text-teal-400" style={{ fontFamily: "var(--font-mono)" }}>
                  {completionPct}%
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-300 border border-teal-500/20">
                  AI Ranking Ready
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-800/40 h-2.5 rounded-full overflow-hidden border border-slate-700/30">
                <div
                  className="bg-gradient-to-r from-teal-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
              <p className="text-xs mt-3 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Add projects, education history, and skills to increase your visibility to premium companies by 4x.
              </p>
            </div>

            {/* Core User Details */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                <User className="w-4 h-4 text-teal-400" />
                <span>Personal Info</span>
              </h3>
              <div>
                <label className="text-xs block mb-1 font-semibold" style={{ color: "var(--text-secondary)" }}>Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-sm glass-input"
                  required
                />
              </div>

              <div>
                <label className="text-xs block mb-1 font-semibold" style={{ color: "var(--text-secondary)" }}>Short Bio / Headline</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Software engineer eager to learn..."
                  className="w-full px-3 py-2 text-sm glass-input min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-xs block mb-1 font-semibold" style={{ color: "var(--text-secondary)" }}>Photo URL</label>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-sm glass-input font-mono"
                />
              </div>

              <div>
                <label className="text-xs block mb-1 font-semibold flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}>
                  <FileText className="w-3.5 h-3.5 text-teal-400" />
                  Resume File Link
                </label>
                <input
                  type="text"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-3 py-2 text-sm glass-input font-mono"
                />
              </div>
            </div>

            {/* Social Channels */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                <Globe className="w-4 h-4 text-teal-400" />
                <span>Social Channels</span>
              </h3>
              <div>
                <label className="text-xs block mb-1.5 flex items-center gap-1.5 font-semibold" style={{ color: "var(--text-secondary)" }}>
                  <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full px-3 py-2 text-sm glass-input font-mono"
                />
              </div>
              <div>
                <label className="text-xs block mb-1.5 flex items-center gap-1.5 font-semibold" style={{ color: "var(--text-secondary)" }}>
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0A66C2]" />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full px-3 py-2 text-sm glass-input font-mono"
                />
              </div>
              <div>
                <label className="text-xs block mb-1.5 flex items-center gap-1.5 font-semibold" style={{ color: "var(--text-secondary)" }}>
                  <Globe className="w-3.5 h-3.5 text-teal-400" />
                  Portfolio Website
                </label>
                <input
                  type="url"
                  value={portfolioUrl}
                  onChange={(e) => setPortfolioUrl(e.target.value)}
                  placeholder="https://mywebsite.com"
                  className="w-full px-3 py-2 text-sm glass-input font-mono"
                />
              </div>
            </div>
          </div>

          {/* Right panel: Projects, Experiences, Education, Skills */}
          <div className="space-y-6 lg:col-span-2">
            {/* Skills Card */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                <Award className="w-5 h-5 text-teal-400" />
                <span>Skills & Credentials</span>
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add skill (e.g. Next.js, Figma, Redis)"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  className="flex-1 px-3 py-2 text-sm glass-input"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-600 dark:text-teal-300 border border-teal-500/25"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(idx)}
                      className="text-teal-500 hover:text-rose-400 font-bold ml-1 cursor-pointer transition-colors"
                      title="Remove skill"
                    >
                      &times;
                    </button>
                  </span>
                ))}
                {skills.length === 0 && (
                  <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>No skills listed yet.</p>
                )}
              </div>
            </div>

            {/* Experience List */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <Briefcase className="w-5 h-5 text-teal-400" />
                  <span>Work Experience</span>
                </h3>
                <button
                  type="button"
                  onClick={addExperience}
                  className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Experience</span>
                </button>
              </div>

              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border space-y-3 relative transition-all"
                    style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}
                  >
                    <button
                      type="button"
                      onClick={() => removeExperience(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 cursor-pointer p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Delete experience"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-8">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Company Name</label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(idx, "company", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Position / Job Title</label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateExperience(idx, "position", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Start Date</label>
                        <input
                          type="date"
                          value={exp.startDate ? exp.startDate.substring(0, 10) : ""}
                          onChange={(e) => updateExperience(idx, "startDate", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>End Date</label>
                        <input
                          type="date"
                          value={exp.endDate ? exp.endDate.substring(0, 10) : ""}
                          disabled={exp.current}
                          onChange={(e) => updateExperience(idx, "endDate", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input font-mono disabled:opacity-40"
                        />
                      </div>
                      <div className="flex items-center pt-4">
                        <label className="flex items-center gap-2 text-xs cursor-pointer select-none" style={{ color: "var(--text-secondary)" }}>
                          <input
                            type="checkbox"
                            checked={exp.current || false}
                            onChange={(e) => updateExperience(idx, "current", e.target.checked)}
                            className="rounded accent-teal-500 w-4 h-4 cursor-pointer"
                          />
                          <span className="font-semibold">Current Role</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Role Description</label>
                      <textarea
                        value={exp.description || ""}
                        onChange={(e) => updateExperience(idx, "description", e.target.value)}
                        placeholder="Built scaling APIs using Node..."
                        className="w-full px-2.5 py-1.5 text-xs glass-input min-h-[55px]"
                      />
                    </div>
                  </div>
                ))}

                {experience.length === 0 && (
                  <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>No experience records added.</p>
                )}
              </div>
            </div>

            {/* Education List */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <GraduationCap className="w-5 h-5 text-teal-400" />
                  <span>Education Profile</span>
                </h3>
                <button
                  type="button"
                  onClick={addEducation}
                  className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add School</span>
                </button>
              </div>

              <div className="space-y-4">
                {education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border space-y-3 relative transition-all"
                    style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}
                  >
                    <button
                      type="button"
                      onClick={() => removeEducation(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 cursor-pointer p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Delete education"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pr-8">
                      <div className="sm:col-span-2">
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>University / School</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => updateEducation(idx, "school", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(idx, "degree", e.target.value)}
                          placeholder="B.Tech, B.Sc"
                          className="w-full px-2.5 py-1.5 text-xs glass-input"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Field of Study</label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy || ""}
                          onChange={(e) => updateEducation(idx, "fieldOfStudy", e.target.value)}
                          placeholder="Computer Science"
                          className="w-full px-2.5 py-1.5 text-xs glass-input"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Start Date</label>
                        <input
                          type="date"
                          value={edu.startDate ? edu.startDate.substring(0, 10) : ""}
                          onChange={(e) => updateEducation(idx, "startDate", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input font-mono"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>End Date</label>
                        <input
                          type="date"
                          value={edu.endDate ? edu.endDate.substring(0, 10) : ""}
                          disabled={edu.current}
                          onChange={(e) => updateEducation(idx, "endDate", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input font-mono disabled:opacity-40"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {education.length === 0 && (
                  <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>No education records added.</p>
                )}
              </div>
            </div>

            {/* Projects List */}
            <div className="glass-card rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                  <FolderGit2 className="w-5 h-5 text-teal-400" />
                  <span>Projects Showcase</span>
                </h3>
                <button
                  type="button"
                  onClick={addProject}
                  className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Project</span>
                </button>
              </div>

              <div className="space-y-4">
                {projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border space-y-3 relative transition-all"
                    style={{ background: "var(--surface-bg)", borderColor: "var(--border-subtle)" }}
                  >
                    <button
                      type="button"
                      onClick={() => removeProject(idx)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-400 cursor-pointer p-1 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-8">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => updateProject(idx, "title", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-xs glass-input"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Project / Demo Link</label>
                        <input
                          type="url"
                          value={proj.link || ""}
                          onChange={(e) => updateProject(idx, "link", e.target.value)}
                          placeholder="https://..."
                          className="w-full px-2.5 py-1.5 text-xs glass-input font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Project Tags (comma separated)</label>
                      <input
                        type="text"
                        value={Array.isArray(proj.tags) ? proj.tags.join(", ") : proj.tags || ""}
                        onChange={(e) => updateProject(idx, "tags", e.target.value)}
                        placeholder="React, Postgres, AI, Vector DB"
                        className="w-full px-2.5 py-1.5 text-xs glass-input"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-wider block mb-1" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>Project Details</label>
                      <textarea
                        value={proj.description || ""}
                        onChange={(e) => updateProject(idx, "description", e.target.value)}
                        placeholder="Explain features, challenges, and tools..."
                        className="w-full px-2.5 py-1.5 text-xs glass-input min-h-[55px]"
                      />
                    </div>
                  </div>
                ))}

                {projects.length === 0 && (
                  <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>No projects added.</p>
                )}
              </div>
            </div>

            {/* Form Save & Cancel Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl font-semibold border hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer text-xs sm:text-sm"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)" }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 flex items-center gap-2 hover:opacity-90 disabled:opacity-50 tracking-wide transition-all shadow-lg shadow-teal-500/25 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-xs sm:text-sm"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                <span>{saving ? "Saving changes..." : "Save Profile Details"}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // ==========================================
  // VIEW MODE: Student Profile (Read-Only)
  // ==========================================
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Save Success Banner */}
      {saveSuccessMsg && (
        <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-300 animate-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5 text-sm font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Profile saved successfully! Changes are live across your dashboard.</span>
          </div>
          <button
            onClick={() => setSaveSuccessMsg(false)}
            className="text-xs font-bold px-2 py-1 rounded hover:bg-emerald-500/20 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      {/* Profile Header with Edit Profile Button */}
      <div
        className="rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl transition-all duration-300"
        style={{
          background: isOrange
            ? "linear-gradient(135deg, #EA580C 0%, #F97316 50%, #C2410C 100%)"
            : "linear-gradient(135deg, #0D9488 0%, #2563EB 50%, #7C3AED 100%)",
        }}
      >
        <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.3)" }} />
        
        {/* Glow ambient circle */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Left: Avatar & Personal Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              {photoUrl ? (
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-24 sm:w-28 h-24 sm:h-28 rounded-full object-cover border-3 border-white/40 shadow-xl"
                  onError={() => setPhotoUrl("")}
                />
              ) : (
                <div
                  className="w-24 sm:w-28 h-24 sm:h-28 rounded-full flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-xl"
                  style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", border: "3px solid rgba(255,255,255,0.4)" }}
                >
                  {name ? name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() : "ST"}
                </div>
              )}
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full" style={{ background: "#34D399", border: "2px solid white" }} />
            </div>

            {/* Info Details */}
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight flex items-center gap-2">
                <span>{name}</span>
                <VerifiedBadge size={22} className="shrink-0 drop-shadow-md" />
              </div>
              <div className="text-white/85 text-sm sm:text-base font-medium mb-1.5 flex items-center gap-1.5 flex-wrap">
                <span>{college}</span>
                <span>·</span>
                <span>{branch}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-white/70 mb-3.5" style={{ fontFamily: "var(--font-mono)" }}>
                <span>Roll: {rollNo}</span>
                <span>·</span>
                <span>B.Tech · 3rd Year</span>
                <span>·</span>
                <span>Batch 2021–2025</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold shadow-sm" style={{ background: "rgba(255,255,255,0.22)", color: "white" }}>
                  Tech Track
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
                  📧 {email}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)" }}>
                  📱 {phone}
                </span>
              </div>
            </div>
          </div>

          {/* Right: CGPA, Platform Rank & EDIT PROFILE BUTTON */}
          <div className="flex items-center gap-6 sm:gap-8 self-stretch sm:self-auto justify-between sm:justify-end shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/15">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>{cgpa}</div>
              <div className="text-[11px] text-white/75 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>CGPA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-mono)" }}>{rank}</div>
              <div className="text-[11px] text-white/75 uppercase tracking-widest font-bold" style={{ fontFamily: "var(--font-mono)" }}>Platform Rank</div>
            </div>

            {/* EDIT PROFILE BUTTON */}
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-white/20 hover:bg-white/30 active:scale-95 backdrop-blur-md border border-white/35 shadow-lg shadow-black/10 transition-all hover:scale-105 cursor-pointer group"
              title="Edit Student Profile"
            >
              <Pencil size={15} className="group-hover:rotate-12 transition-transform duration-200" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      {/* Placement Readiness Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Placement Readiness", value: "92%", color: "#34D399" },
          { label: "Mock Interviews", value: "6", color: "#38BDF8" },
          { label: "Profile Completion", value: `${completionPct}%`, color: "#2DD4BF" },
          { label: "Profile Views", value: "240", color: "#C084FC" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="rounded-2xl p-5 text-center transition-all duration-200 dark:border-white/15 dark:hover:border-white/30 dark:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.7)]"
            style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}
          >
            <div className="text-3xl font-bold mb-1 dark:drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]" style={{ fontFamily: "var(--font-mono)", color }}>
              {value}
            </div>
            <div className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Coding Profiles & Social Links (VIEW ONLY / READ-ONLY) */}
      <StudentProfileLinks readOnly={true} onOpenEdit={() => setIsEditing(true)} />

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
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-base sm:text-lg" style={{ color: "var(--text-primary)" }}>Skills & Competencies</h3>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${isOrange ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"}`}>
            {skills.length} Skills Listed
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Technical Skills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Technical Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:scale-105 ${
                    isOrange
                      ? "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/30 dark:border-orange-500/40"
                      : "bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/30 dark:border-teal-500/40"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Non-Technical Skills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Non-Technical Skills
            </div>
            <div className="flex flex-wrap gap-2">
              {["Communication", "Leadership", "Business Analysis", "Figma", "Project Mgmt"].map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                    isOrange
                      ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 dark:border-amber-500/40"
                      : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 dark:border-emerald-500/40"
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {/* Validated Skills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
              Validated Skills
            </div>
            <div className="space-y-2">
              {[
                { skill: "React.js", level: "Advanced", pct: 90 },
                { skill: "Python", level: "Intermediate", pct: 70 },
                { skill: "System Design", level: "Beginner", pct: 45 },
              ].map(({ skill, level, pct }, idx) => (
                <div
                  key={skill}
                  className={`p-3 rounded-xl transition-all duration-200 ${
                    isOrange
                      ? "bg-orange-500/10 dark:bg-orange-950/30 border border-orange-500/30 dark:border-orange-500/40 shadow-sm shadow-orange-500/5"
                      : "bg-teal-500/10 dark:bg-teal-950/30 border border-teal-500/30 dark:border-teal-500/40 shadow-sm shadow-teal-500/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold" style={{ color: "var(--text-primary)" }}>{skill}</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1.5 ${
                        isOrange
                          ? level === "Advanced"
                            ? "bg-orange-500/20 text-orange-600 dark:text-orange-300 border border-orange-500/45"
                            : level === "Intermediate"
                            ? "bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/45"
                            : "bg-rose-500/15 text-rose-600 dark:text-rose-300 border border-rose-500/35"
                          : level === "Advanced"
                          ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/45"
                          : level === "Intermediate"
                          ? "bg-teal-500/20 text-teal-600 dark:text-teal-300 border border-teal-500/45"
                          : "bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/35"
                      }`}
                    >
                      <VerifiedBadge size={13} className="shrink-0" />
                      <span>{level}</span>
                    </span>
                  </div>
                  <AnimatedLinearProgress
                    label=""
                    value={pct}
                    color="var(--accent-primary)"
                    height={6}
                    labelWidth="w-0 hidden"
                    delay={idx * 150}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interview Performance */}
      <div className="rounded-2xl p-6 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
        <h3 className="font-bold mb-5" style={{ color: "var(--text-primary)" }}>Interview Performance Breakdown</h3>
        <div className="mb-6 space-y-3.5">
          {[
            { label: "Overall AI Readiness Score", value: 84, color: "#2DD4BF" },
            { label: "Confidence Score", value: 78, color: "#38BDF8" },
            { label: "Body Language & Presence", value: 72, color: "#C084FC" },
          ].map(({ label, value, color }, idx) => (
            <AnimatedLinearProgress
              key={label}
              label={label}
              value={value}
              color={color}
              height={10}
              labelWidth="w-52"
              delay={idx * 150}
            />
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

      {/* Experience + Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Experience */}
        <div className="rounded-2xl p-6" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Work Experience</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400">
              {experience.length} Roles
            </span>
          </div>
          <div className="space-y-5">
            {experience.map((item, idx) => (
              <div key={idx} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md"
                  style={{ background: "var(--accent-primary)" }}
                >
                  {item.company ? item.company[0].toUpperCase() : "E"}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{item.position}</div>
                  <div className="flex items-center gap-2 text-xs mb-1.5 flex-wrap" style={{ color: "var(--text-muted)" }}>
                    <span className="font-medium" style={{ color: "var(--text-secondary)" }}>{item.company}</span>
                    <span>·</span>
                    <span>{item.startDate ? item.startDate.substring(0, 7) : ""} to {item.current ? "Present" : item.endDate ? item.endDate.substring(0, 7) : ""}</span>
                    {item.current && (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-500">
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-emerald-400" /> Ongoing
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
            {experience.length === 0 && (
              <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>No experience records added.</p>
            )}
          </div>
        </div>

        {/* Projects */}
        <div className="rounded-2xl p-6" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-bold" style={{ color: "var(--text-primary)" }}>Projects Showcase</h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-teal-500/10 text-teal-600 dark:text-teal-400">
              {projects.length} Projects
            </span>
          </div>
          <div className="space-y-4">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-4 rounded-xl transition-all" style={{ background: "var(--surface-bg)", border: "1px solid var(--border-subtle)" }}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>{proj.title}</div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold flex items-center gap-1 px-2.5 py-0.5 rounded text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors"
                    >
                      <span>Demo / Code</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>
                {proj.description && (
                  <div className="text-xs mb-2.5 leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                    {proj.description}
                  </div>
                )}
                {proj.tags && proj.tags.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(Array.isArray(proj.tags) ? proj.tags : String(proj.tags).split(",")).map((s: string, tagIdx: number) => (
                      <span
                        key={tagIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-medium"
                        style={{ background: "var(--border-subtle)", color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                      >
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {projects.length === 0 && (
              <p className="text-xs italic" style={{ color: "var(--text-muted)" }}>No projects added.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
