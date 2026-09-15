import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Info,
  Building,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Code2,
  Briefcase,
  User,
  Mail,
  Lock,
  Phone,
  Ticket,
  ShieldCheck,
  Zap,
} from "lucide-react";
import OnboardingScreen from "@/components/ui/OnboardingScreen";

const COLLEGES = [
  "Gyan Ganga Institute of Technology and Sciences (GGITS)",
  "SRM Institute of Science & Technology",
  "Manipal Institute of Technology",
  "Amrita University",
  "Bits Pilani",
  "NIT Trichy",
  "IIT Madras",
  "Anna University CEG",
  "PSG College of Technology",
  "Coimbatore Institute of Technology",
  "Other / Independent Learner",
];

const PROMO_CODES: Record<string, { college: string; name: string; discount: string }> = {
  GGITS2026: { college: "Gyan Ganga Institute of Technology and Sciences (GGITS)", name: "GGITS Campus Placement Cell", discount: "100% Free Institutional Pro" },
  GGITS: { college: "Gyan Ganga Institute of Technology and Sciences (GGITS)", name: "GGITS Campus Pro Hub", discount: "100% Free Institutional Pro" },
  VIT2026: { college: "Gyan Ganga Institute of Technology and Sciences (GGITS)", name: "GGITS Campus Placement Cell", discount: "100% Free Institutional Pro" },
  SRMPRO: { college: "SRM Institute of Science & Technology", name: "SRM Career Centre", discount: "100% Free Institutional Pro" },
  MANIPALAI: { college: "Manipal Institute of Technology", name: "MIT Placement Division", discount: "100% Free Institutional Pro" },
  AMRITA26: { college: "Amrita University", name: "Amrita Career Hub", discount: "100% Free Institutional Pro" },
  BITSPRO: { college: "Bits Pilani", name: "BITS Practice School", discount: "100% Free Institutional Pro" },
  CAMPUSFREE: { college: "Partner Institute", name: "Institutional Sponsor Code", discount: "100% Free Institutional Pro" },
  OPTI2026: { college: "Optivators FastTrack", name: "Direct Merit Sponsorship", discount: "100% Free Pro Tier" },
};

const BRANCHES = [
  "Computer Science Engineering",
  "Information Technology",
  "AI & Machine Learning",
  "Data Science",
  "Cybersecurity",
  "Electronics & Communication",
  "Mechanical Engineering",
  "Civil Engineering",
  "MBA (Finance / Marketing)",
  "BBA / Commerce",
  "MCA",
  "BCA",
];

const DEGREES = ["B.Tech", "M.Tech", "BCA", "MCA", "MBA", "BBA", "B.Sc", "M.Sc"];
const YEARS = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year"];
const SEMESTERS = ["Sem 1", "Sem 2", "Sem 3", "Sem 4", "Sem 5", "Sem 6", "Sem 7", "Sem 8"];

export default function Register() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [showPromoField, setShowPromoField] = useState(false);

  // Academic Details
  const [college, setCollege] = useState("");
  const [degree, setDegree] = useState("B.Tech");
  const [branch, setBranch] = useState("Computer Science Engineering");
  const [year, setYear] = useState("3rd Year");
  const [semester, setSemester] = useState("Sem 6");
  const [batch, setBatch] = useState("2022-2026");
  const [rollNo, setRollNo] = useState("");

  // Track & Contact
  const [track, setTrack] = useState<"tech" | "nontech">("tech");
  const [mobile, setMobile] = useState("");

  // Detect College from Email Domain or Promo Code
  const detectedPromo = useMemo(() => {
    const cleanCode = promoCode.trim().toUpperCase();
    if (PROMO_CODES[cleanCode]) {
      return PROMO_CODES[cleanCode];
    }

    const lowerEmail = email.toLowerCase().trim();
    if (lowerEmail.includes("@ggits.net") || lowerEmail.includes("@ggits.ac.in")) {
      return { college: "Gyan Ganga Institute of Technology and Sciences (GGITS)", name: "GGITS Campus Placement Cell", discount: "100% Free Campus Pro" };
    }
    if (lowerEmail.includes("@vit.ac.in") || lowerEmail.includes("@vitstudent.ac.in")) {
      return { college: "Gyan Ganga Institute of Technology and Sciences (GGITS)", name: "GGITS Campus Placement Cell", discount: "100% Free Campus Pro" };
    }
    if (lowerEmail.includes("@srmist.edu.in")) {
      return { college: "SRM Institute of Science & Technology", name: "SRM Career Centre", discount: "100% Free Campus Pro" };
    }
    if (lowerEmail.includes("@manipal.edu") || lowerEmail.includes("@learner.manipal.edu")) {
      return { college: "Manipal Institute of Technology", name: "MIT Placement Division", discount: "100% Free Campus Pro" };
    }
    if (lowerEmail.includes("@bits-pilani.ac.in")) {
      return { college: "Bits Pilani", name: "BITS Career Office", discount: "100% Free Campus Pro" };
    }
    if (lowerEmail.includes("@iitm.ac.in") || lowerEmail.includes("@nitt.edu")) {
      return { college: "National Institute of Technology", name: "Campus Placement Cell", discount: "100% Free Campus Pro" };
    }

    return null;
  }, [promoCode, email]);

  const activeCollege = detectedPromo ? detectedPromo.college : college || "Independent Learner";

  // Step validation
  const isStep1Valid = name.trim().length > 0 && email.trim().length > 3 && password.length >= 6 && password === confirmPassword;
  const isStep2Valid = detectedPromo ? rollNo.trim().length > 0 : college.trim().length > 0 && rollNo.trim().length > 0;
  const isStep3Valid = mobile.trim().length >= 10;

  const handleNext = () => {
    if (currentStep === 1) {
      if (detectedPromo) {
        setCollege(detectedPromo.college);
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Complete registration
      navigate("/student");
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  // Step Titles & Subtitles
  const stepMeta = {
    1: {
      title: "Account Setup",
      subtitle: "Create your student login credentials to begin cognitive benchmarking.",
      tooltipMain: "Encrypted Secure Auth",
      tooltipSub: "Direct student access & institutional verification",
      desc: "Your Optivators identity unifies adaptive cognitive testing, automated Spider Radar scoring, and verified recruiter alerts.",
    },
    2: {
      title: detectedPromo ? "Verified Campus Enrollment" : "Academic Details",
      subtitle: detectedPromo
        ? "Your campus partnership promo has been validated. Confirm your academic division."
        : "Tell us about your college, degree, and current academic cohort.",
      tooltipMain: detectedPromo ? "Verified Campus Sponsor" : "Individual Student Tier",
      tooltipSub: detectedPromo ? "100% Free Institutional Pro Active" : "Career Starter Plan",
      desc: detectedPromo
        ? `Sponsored by ${detectedPromo.name}. You have unlocked 4-track testing, ATS resume builder, and direct campus leaderboards.`
        : "Independent students receive full 4-track adaptive testing and direct AI-generated cognitive percentiles.",
    },
    3: {
      title: "Assessment Track & Profile",
      subtitle: "Select your primary specialization track to tailor adaptive test modules.",
      tooltipMain: `${track === "tech" ? "Tech & Engineering" : "Management & Non-Tech"} Track`,
      tooltipSub: "Adaptive AI question bank initialized",
      desc: "Tailored for your branch specializations with automated percentile ranking and NAAC/NIRF proof-of-skill certificates.",
    },
  }[currentStep as 1 | 2 | 3];

  return (
    <div className="min-h-screen relative flex items-center justify-center py-6 px-4" style={{ background: "var(--surface-bg)", fontFamily: "var(--font-sans)" }}>
      <OnboardingScreen
        title={stepMeta.title}
        subtitle={stepMeta.subtitle}
        currentStep={currentStep}
        totalSteps={3}
        onNext={handleNext}
        onBack={handleBack}
        isNextDisabled={
          (currentStep === 1 && !isStep1Valid) ||
          (currentStep === 2 && !isStep2Valid) ||
          (currentStep === 3 && !isStep3Valid)
        }
        nextButtonText={currentStep === 1 ? "Proceed to Campus Details →" : "Continue to Track Setup →"}
        finishButtonText="Finish Setup & Launch Cognitive Portal 🚀"
        tooltipMainText={stepMeta.tooltipMain}
        tooltipSubText={stepMeta.tooltipSub}
        rightSectionDescription={stepMeta.desc}
        rightCardContent={
          <div className="space-y-4 select-none">
            {/* Top Student Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-md"
                  style={{
                    background: track === "tech" ? "linear-gradient(135deg, #0D9488, #2563EB)" : "linear-gradient(135deg, #EA580C, #D97706)",
                  }}
                >
                  {name ? name.slice(0, 2).toUpperCase() : "ST"}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <span>{name || "Your Full Name"}</span>
                    <ShieldCheck size={14} className="text-teal-500 shrink-0" />
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[150px]">
                    {email || "student@college.edu"}
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 dark:text-teal-300 dark:bg-teal-500/15 dark:border-teal-500/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {detectedPromo ? "PRO CAMPUS" : "STUDENT"}
              </span>
            </div>

            {/* Institutional Badge */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-white/5 dark:border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                  <Building size={12} /> College
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-right truncate max-w-[160px]">
                  {activeCollege}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1 font-medium">
                  <GraduationCap size={12} /> Branch
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300 truncate max-w-[160px]">
                  {branch ? branch.split(" ")[0] : "Engineering"} · {semester}
                </span>
              </div>
            </div>

            {/* Cognitive Track Live Pill */}
            <div
              className="p-3 rounded-xl border flex items-center justify-between"
              style={{
                background: track === "tech" ? "rgba(13,148,136,0.08)" : "rgba(234,88,12,0.08)",
                borderColor: track === "tech" ? "rgba(13,148,136,0.3)" : "rgba(234,88,12,0.3)",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: track === "tech" ? "#0D9488" : "#EA580C" }}
                >
                  {track === "tech" ? <Code2 size={14} /> : <Briefcase size={14} />}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {track === "tech" ? "Tech Assessment Track" : "Non-Tech Track"}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">
                    Adaptive AI Benchmark
                  </div>
                </div>
              </div>
              <span className="text-xs font-black" style={{ color: track === "tech" ? "#0D9488" : "#EA580C", fontFamily: "var(--font-mono)" }}>
                8.4/10
              </span>
            </div>

            {/* Footer Verification Row */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Sparkles size={12} className="text-amber-500" /> NAAC / AICTE Compliant
              </span>
              <span className="font-mono text-[10px] font-semibold text-slate-400">ID: {rollNo || "2026-ST"}</span>
            </div>
          </div>
        }
      >
        {/* Step 1: Account Credentials */}
        {currentStep === 1 && (
          <div className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <User size={13} className="text-teal-600 dark:text-teal-400" /> Full Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Rahul Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
              />
            </div>

            {/* Email Address */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <Mail size={13} className="text-teal-600 dark:text-teal-400" /> College or Personal Email *
                </label>
                <span className="text-[10px] text-slate-400">College .edu/.ac.in auto-verifies</span>
              </div>
              <input
                type="email"
                placeholder="e.g. rahul@ggits.net or rahul@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
              />
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <Lock size={13} className="text-teal-600 dark:text-teal-400" /> Password *
                </label>
                <input
                  type="password"
                  placeholder="Min 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <Lock size={13} className="text-teal-600 dark:text-teal-400" /> Confirm Password *
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                />
              </div>
            </div>

            {/* Promo Code Toggle & Field */}
            <div className="pt-2">
              {!showPromoField && !detectedPromo ? (
                <button
                  type="button"
                  onClick={() => setShowPromoField(true)}
                  className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1.5 transition-colors dark:text-teal-400"
                >
                  <Ticket size={13} /> Have a College Promo Code or Institutional Access Key?
                </button>
              ) : (
                <div className="space-y-1.5 p-3.5 rounded-xl bg-teal-50/70 border border-teal-200/80 dark:bg-teal-500/10 dark:border-teal-500/30">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                      <Ticket size={13} /> College Promo / Institutional Access Code
                    </label>
                    <span className="text-[10px] text-teal-700 dark:text-teal-400 font-semibold">Try: GGITS2026, GGITS</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter code (e.g. GGITS2026, GGITS, CAMPUSFREE)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    className="w-full rounded-lg border border-teal-300 bg-white px-3.5 py-2 text-sm text-slate-900 uppercase font-mono tracking-wider outline-none focus:ring-2 focus:ring-teal-500/30 dark:border-teal-500/40 dark:bg-[#121826] dark:text-white"
                  />
                  {detectedPromo && (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 dark:text-teal-300 pt-1">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <span>{detectedPromo.name} verified — {detectedPromo.discount}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="text-[11px] text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-teal-600 hover:underline dark:text-teal-400">
                Sign in here
              </Link>
            </div>
          </div>
        )}

        {/* Step 2: Campus Details & Promo Detection Showcase */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {/* Verified Campus Banner if detected */}
            {detectedPromo ? (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 shadow-sm dark:from-teal-950/40 dark:via-emerald-950/30 dark:to-teal-950/40 dark:border-teal-500/30"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md">
                    🎓
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300" style={{ fontFamily: "var(--font-mono)" }}>
                        INSTITUTIONAL PARTNER RECOGNIZED
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-emerald-600">
                        PRO SPONSORED
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {detectedPromo.college}
                    </h3>
                    <p className="text-[11px] text-teal-700 dark:text-teal-300 mt-0.5">
                      Enrolled via {detectedPromo.name}. All 4 testing tracks, resume tools, and cohort rankings are sponsored.
                    </p>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-white/5 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/15 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800 dark:text-white">Direct Student Registration</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Career Starter · Complete cognitive test access</div>
                  </div>
                </div>
              </div>
            )}

            {/* College Selection (Editable if not promo locked) */}
            {!detectedPromo && (
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <Building size={13} className="text-teal-600 dark:text-teal-400" /> College / University *
                </label>
                <select
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                >
                  <option value="">Select your institution…</option>
                  {COLLEGES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Degree & Branch */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <GraduationCap size={13} className="text-teal-600 dark:text-teal-400" /> Degree *
                </label>
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                >
                  {DEGREES.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Branch / Department *
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                >
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Year, Semester & Roll Number */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Year *</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-teal-500 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Semester *</label>
                <select
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-teal-500 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                >
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">Roll No / ID *</label>
                <input
                  type="text"
                  placeholder="e.g. 22BCE1024"
                  value={rollNo}
                  onChange={(e) => setRollNo(e.target.value.toUpperCase())}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-mono text-slate-900 uppercase outline-none focus:border-teal-500 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Track Selection & Finalization */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                Select Your Assessment Specialization Track *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Tech Track Card */}
                <button
                  type="button"
                  onClick={() => setTrack("tech")}
                  className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden border-2 ${
                    track === "tech"
                      ? "border-teal-500 bg-teal-50/60 dark:bg-teal-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-[#161D2B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center font-bold">
                      <Code2 size={16} />
                    </div>
                    {track === "tech" && (
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full dark:text-teal-300 dark:bg-teal-500/25">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">Tech Engineering Track</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Data structures, algorithms, coding benchmarks, system design & cloud architecture.
                  </p>
                </button>

                {/* Non-Tech Track Card */}
                <button
                  type="button"
                  onClick={() => setTrack("nontech")}
                  className={`p-4 rounded-2xl text-left transition-all relative overflow-hidden border-2 ${
                    track === "nontech"
                      ? "border-amber-500 bg-amber-50/60 dark:bg-amber-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-white/10 dark:bg-[#161D2B]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                      <Briefcase size={16} />
                    </div>
                    {track === "nontech" && (
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full dark:text-amber-300 dark:bg-amber-500/25">
                        SELECTED
                      </span>
                    )}
                  </div>
                  <div className="font-extrabold text-sm text-slate-900 dark:text-white">Non-Tech / Management</div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Business reasoning, quantitative problem solving, product management & corporate communication.
                  </p>
                </button>
              </div>
            </div>

            {/* Mobile Number */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <Phone size={13} className="text-teal-600 dark:text-teal-400" /> WhatsApp / Mobile Verification *
              </label>
              <div className="flex gap-2">
                <span className="flex items-center justify-center px-3.5 rounded-xl border border-slate-200 bg-slate-100 text-sm font-bold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="e.g. 98765 43210"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-white/10 dark:bg-[#161D2B] dark:text-white"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-600 dark:bg-white/5 dark:border-white/10 dark:text-slate-300 flex items-center gap-2">
              <Zap size={16} className="text-teal-500 shrink-0" />
              <span>
                By finishing setup, your 360° profile is initialized with direct access to adaptive cognitive tests.
              </span>
            </div>
          </div>
        )}
      </OnboardingScreen>
    </div>
  );
}
