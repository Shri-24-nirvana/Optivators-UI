import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { SmoothCursor } from "@/registry/magicui/smooth-cursor";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import CognitiveTesting from "./pages/CognitiveTesting";
import StudentProfile from "./pages/StudentProfile";
import StudentCourses from "./pages/StudentCourses";
import Opportunities from "./pages/Opportunities";
import ResumeBuilder from "./pages/ResumeBuilder";
import CampusDirectory from "./pages/CampusDirectory";
import Communities from "./pages/Communities";
import CollegeAdminDashboard from "./pages/CollegeAdminDashboard";
import AdminStudents from "./pages/AdminStudents";
import AdminFaculty from "./pages/AdminFaculty";
import AdminBranches from "./pages/AdminBranches";
import AdminCohorts from "./pages/AdminCohorts";
import AdminPromo from "./pages/AdminPromo";
import Leaderboard from "./pages/Leaderboard";
import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyPromo from "./pages/FacultyPromo";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import SuperAdminColleges from "./pages/SuperAdminColleges";
import SuperAdminQuizzes from "./pages/SuperAdminQuizzes";

function Placeholder({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-80 gap-3" style={{ color: "var(--text-muted)" }}>
      <div className="text-5xl font-black opacity-10" style={{ fontFamily: "var(--font-mono)" }}>⬡</div>
      <div className="font-bold text-lg" style={{ color: "var(--text-secondary)" }}>{title}</div>
      <div className="text-sm" style={{ color: "var(--text-muted)" }}>This screen is fully specced and coming soon.</div>
    </div>
  );
}

function AppRoutes() {
  const { isDark, toggleTheme } = useTheme();

  const W = (children: React.ReactNode) => (
    <Layout dark={isDark} onToggleDark={toggleTheme}>{children}</Layout>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing dark={isDark} onToggleDark={toggleTheme} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student portal */}
        <Route path="/student" element={W(<StudentDashboard />)} />
        <Route path="/student/cognitive" element={W(<CognitiveTesting />)} />
        <Route path="/student/profile" element={W(<StudentProfile />)} />
        <Route path="/student/profile/:id" element={W(<StudentProfile />)} />
        <Route path="/student/courses" element={W(<StudentCourses />)} />
        <Route path="/student/opportunities" element={W(<Opportunities />)} />
        <Route path="/student/resume" element={W(<ResumeBuilder />)} />
        <Route path="/student/campus-directory" element={W(<CampusDirectory />)} />
        <Route path="/student/communities" element={W(<Communities />)} />
        <Route path="/student/settings" element={W(<Placeholder title="Student Settings" />)} />
        <Route path="/student/edit-profile" element={W(<Placeholder title="Edit Profile" />)} />

        {/* College Admin portal */}
        <Route path="/college-admin" element={W(<CollegeAdminDashboard />)} />
        <Route path="/college-admin/students" element={W(<AdminStudents />)} />
        <Route path="/college-admin/faculty" element={W(<AdminFaculty />)} />
        <Route path="/college-admin/branches" element={W(<AdminBranches />)} />
        <Route path="/college-admin/cohorts" element={W(<AdminCohorts />)} />
        <Route path="/college-admin/cohort-groups" element={W(<AdminCohorts />)} />
        <Route path="/college-admin/promo-allocations" element={W(<AdminPromo />)} />
        <Route path="/college-admin/settings" element={W(<Placeholder title="Admin Settings" />)} />

        {/* College Faculty portal */}
        <Route path="/college-faculty" element={W(<FacultyDashboard />)} />
        <Route path="/college-faculty/students" element={W(<AdminStudents />)} />
        <Route path="/college-faculty/promo-codes" element={W(<FacultyPromo />)} />
        <Route path="/college-faculty/cohorts" element={W(<AdminCohorts />)} />
        <Route path="/college-faculty/branches" element={W(<AdminBranches />)} />
        <Route path="/college-faculty/cohort-groups" element={W(<AdminCohorts />)} />
        <Route path="/college-faculty/settings" element={W(<Placeholder title="Faculty Settings" />)} />

        {/* Super Admin portal */}
        <Route path="/super-admin" element={W(<SuperAdminDashboard />)} />
        <Route path="/super-admin/colleges" element={W(<SuperAdminColleges />)} />
        <Route path="/super-admin/colleges/:id" element={W(<Placeholder title="College Detail Deep-Dive" />)} />
        <Route path="/super-admin/quizzes" element={W(<SuperAdminQuizzes />)} />
        <Route path="/super-admin/optus-faculties" element={W(<Placeholder title="Optus Faculties" />)} />
        <Route path="/super-admin/cohorts" element={W(<AdminCohorts />)} />
        <Route path="/super-admin/settings" element={W(<Placeholder title="Super Admin Settings" />)} />

        {/* Common */}
        <Route path="/leaderboard" element={W(<Leaderboard />)} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <SmoothCursor />
      <AppRoutes />
    </ThemeProvider>
  );
}
