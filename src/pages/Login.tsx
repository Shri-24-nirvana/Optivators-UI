import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import ThemePaletteToggle from "@/components/ui/ThemePaletteToggle";
import SwitchMode from "@/components/ui/SwitchMode";

export default function Login() {
  const navigate = useNavigate();
  const { isOrange, isDark, toggleTheme } = useTheme();
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"student" | "admin" | "faculty">("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "admin") navigate("/college-admin");
    else navigate("/student");
  };

  return (
    <div className="min-h-screen flex relative" style={{ background: "var(--surface-bg)", fontFamily: "var(--font-sans)" }}>
      {/* Top right theme controls */}
      <div className="absolute top-5 right-6 z-20 flex items-center gap-2.5">
        <Link
          to="/"
          className="px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors hover:border-slate-400 dark:hover:border-white/30"
          style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)", background: "var(--surface-elevated)" }}
        >
          ← Home
        </Link>
        <ThemePaletteToggle />
        <SwitchMode width={54} height={28} isDark={isDark} onToggle={toggleTheme} />
      </div>

      {/* Left panel - glassmorphic brand visual with Light and Dark theme support */}
      <div
        className="hidden lg:flex flex-col justify-between w-[55%] relative overflow-hidden p-12 transition-all duration-500"
        style={{
          background: isDark
            ? "linear-gradient(145deg, #080C14 0%, #0C1525 60%, #0D1F35 100%)"
            : isOrange
              ? "linear-gradient(145deg, #FFF7ED 0%, #FFEDD5 50%, #FED7AA 100%)"
              : "linear-gradient(145deg, #F0FDFA 0%, #CCFBF1 50%, #99F6E4 100%)",
          borderRight: isDark ? "1px solid rgba(255,255,255,0.08)" : isOrange ? "1px solid rgba(234,88,12,0.2)" : "1px solid rgba(13,148,136,0.2)",
        }}
      >
        {/* Mesh bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full"
            style={{
              background: isOrange
                ? "radial-gradient(circle, #EA580C 0%, transparent 70%)"
                : "radial-gradient(circle, #0D9488 0%, transparent 70%)",
              opacity: isDark ? 0.3 : 0.25,
              filter: "blur(60px)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
            style={{
              background: "radial-gradient(circle, #2563EB 0%, transparent 70%)",
              opacity: isDark ? 0.2 : 0.15,
              filter: "blur(50px)",
            }}
          />
        </div>

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
            style={{
              background: isOrange
                ? "linear-gradient(135deg, #EA580C, #C2410C)"
                : "linear-gradient(135deg, #0D9488, #0f766e)",
              boxShadow: isOrange
                ? "0 4px 20px rgba(234,88,12,0.35)"
                : "0 4px 20px rgba(13,148,136,0.35)",
            }}
          >
            <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className={`text-xl font-black tracking-tight ${isDark ? "text-white" : "text-slate-900"}`}>
            Optivators
          </span>
        </div>

        {/* Central content */}
        <div className="relative">
          <h2 className={`text-5xl font-extrabold mb-4 leading-tight ${isDark ? "text-white" : "text-slate-900"}`} style={{ letterSpacing: "-0.02em" }}>
            Benchmark your{" "}
            <span
              style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                color: isDark
                  ? isOrange ? "#FB923C" : "#2DD4BF"
                  : isOrange ? "#EA580C" : "#0D9488",
              }}
            >
              cognitive edge.
            </span>
          </h2>
          <p className={`text-lg mb-10 leading-relaxed font-medium ${isDark ? "text-slate-400" : "text-slate-700"}`}>
            India's most advanced campus career readiness platform — built for students who aim for the top percentile.
          </p>

          {/* Floating stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Questions Attempted", value: "100K+", color: isDark ? (isOrange ? "#FB923C" : "#2DD4BF") : (isOrange ? "#C2410C" : "#0F766E") },
              { label: "Partner Institutes", value: "50+", color: isDark ? "#60A5FA" : "#1D4ED8" },
              { label: "Avg Placement Rate", value: "94%", color: isDark ? (isOrange ? "#F97316" : "#34D399") : (isOrange ? "#EA580C" : "#059669") },
              { label: "Skills Validated", value: "280K+", color: isDark ? "#FB923C" : "#D97706" },
            ].map(({ label, value, color }) => (
              <div
                key={label}
                className={`rounded-2xl p-4 transition-all duration-300 ${
                  isDark
                    ? "bg-[#0F1520]/80 backdrop-blur-2xl border border-white/10 shadow-xl"
                    : "bg-white/90 backdrop-blur-xl border-2 border-slate-900 shadow-lg shadow-slate-900/5"
                }`}
              >
                <div className="text-2xl font-black mb-1" style={{ fontFamily: "var(--font-mono)", color }}>{value}</div>
                <div className={`text-xs font-semibold ${isDark ? "text-slate-400" : "text-slate-700"}`}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className={`relative text-sm font-semibold ${isDark ? "text-slate-500" : "text-slate-600"}`}>
          Trusted by placement cells at IIT, NIT, and 50+ tier-1 institutes.
        </div>
      </div>

      {/* Right panel - auth form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-2" style={{ color: "var(--text-primary)", letterSpacing: "-0.02em" }}>Sign in to Portal</h1>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Access your dashboard, assessments, and career tools.</p>
          </div>

          {/* Role tabs */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: "var(--surface-elevated)", border: "1px solid var(--border-subtle)" }}>
            {([["student", "Student"], ["admin", "College Admin"], ["faculty", "Faculty"]] as const).map(([r, label]) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-lg text-xs font-bold transition-all"
                style={{
                  background: role === r ? "var(--accent-primary)" : "transparent",
                  color: role === r ? "white" : "var(--text-secondary)",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold text-sm border transition-all"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-primary)", background: "var(--surface-elevated)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
            >
              <GoogleIcon /> Continue with Google
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>Or continue with email</span>
              <div className="flex-1 h-px" style={{ background: "var(--border-subtle)" }} />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: "var(--text-secondary)" }}>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="rahul.kumar@ggits.net"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: "var(--surface-elevated)",
                  border: "1px solid var(--border-strong)",
                  color: "var(--text-primary)",
                  fontFamily: "var(--font-sans)",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
                onBlur={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--text-secondary)" }}>Password</label>
                <a href="#" className="text-xs font-semibold" style={{ color: "var(--accent-primary)" }}>Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all pr-12"
                  style={{
                    background: "var(--surface-elevated)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
                  onBlur={e => (e.currentTarget.style.borderColor = "var(--border-strong)")}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPass ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:scale-[1.01] active:scale-[0.99]"
              style={{
                background: isOrange
                  ? "linear-gradient(135deg, #EA580C 0%, #C2410C 100%)"
                  : "linear-gradient(135deg, #0D9488 0%, #0f766e 100%)",
                boxShadow: isOrange
                  ? "0 8px 24px rgba(234,88,12,0.35)"
                  : "0 8px 24px rgba(13,148,136,0.35)",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = isOrange ? "0 12px 32px rgba(234,88,12,0.5)" : "0 12px 32px rgba(13,148,136,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = isOrange ? "0 8px 24px rgba(234,88,12,0.35)" : "0 8px 24px rgba(13,148,136,0.35)")}
            >
              Sign In to Portal
            </button>
          </form>

          <p className="text-center text-sm mt-6" style={{ color: "var(--text-secondary)" }}>
            Don't have an account?{" "}
            <Link to="/register" className="font-semibold" style={{ color: "var(--accent-primary)" }}>
              Register as Student
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}
function EyeIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
}
function EyeOffIcon() {
  return <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
}
