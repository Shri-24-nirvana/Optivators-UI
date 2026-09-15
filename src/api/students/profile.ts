// Mock API for Student Profile Data Persistence
export interface StudentProfileData {
  name: string;
  email?: string;
  phone?: string;
  college?: string;
  branch?: string;
  rollNo?: string;
  degree?: string;
  cgpa?: string;
  rank?: string;
  profile?: {
    bio?: string;
    photoUrl?: string;
    resumeUrl?: string;
    githubUrl?: string;
    linkedinUrl?: string;
    portfolioUrl?: string;
    completionPercentage?: number;
    skills?: Array<{ id?: string; name: string }>;
    education?: Array<{
      id?: string;
      school: string;
      degree: string;
      fieldOfStudy?: string;
      startDate: string;
      endDate: string;
      current?: boolean;
    }>;
    experience?: Array<{
      id?: string;
      company: string;
      position: string;
      location?: string;
      startDate: string;
      endDate: string;
      current?: boolean;
      description?: string;
    }>;
    projects?: Array<{
      id?: string;
      title: string;
      description?: string;
      link?: string;
      tags?: string[];
    }>;
  };
}

const STORAGE_KEY = "optivators_student_profile";

const INITIAL_PROFILE: StudentProfileData = {
  name: "Rahul Kumar",
  email: "rahul.kumar@ggits.net",
  phone: "+91 98765 43210",
  college: "Gyan Ganga Institute of Technology and Sciences (GGITS)",
  branch: "Computer Science Engineering",
  rollNo: "0208CS211040",
  degree: "B.Tech · 3rd Year (Batch 2021–2025)",
  cgpa: "8.9",
  rank: "#14",
  profile: {
    bio: "Passionate Full-Stack Developer & Competitive Programmer exploring scalable backend architectures, AI systems, and microservices.",
    photoUrl: "",
    resumeUrl: "https://drive.google.com/file/d/rahul_resume_2025.pdf",
    githubUrl: "https://github.com/rahulkumar-dev",
    linkedinUrl: "https://linkedin.com/in/rahulkumar-ggits",
    portfolioUrl: "https://rahulkumar.dev",
    completionPercentage: 92,
    skills: [
      { name: "Python" },
      { name: "React" },
      { name: "Java" },
      { name: "Docker" },
      { name: "SQL" },
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "Redis" },
      { name: "Figma" },
      { name: "System Design" },
    ],
    education: [
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
    ],
    experience: [
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
    ],
    projects: [
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
    ],
  },
};

export async function getStudentProfile(): Promise<StudentProfileData> {
  // Simulate slight network delay for realism
  await new Promise((r) => setTimeout(r, 120));
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read from localStorage:", e);
  }
  return INITIAL_PROFILE;
}

export async function updateStudentProfile(data: any): Promise<any> {
  await new Promise((r) => setTimeout(r, 200));
  try {
    const current = await getStudentProfile();
    
    // Calculate completion percentage dynamically
    let points = 20; // baseline
    if (data.name) points += 10;
    if (data.bio) points += 10;
    if (data.resumeUrl) points += 10;
    if (data.githubUrl || data.linkedinUrl || data.portfolioUrl) points += 15;
    if (data.skills && data.skills.length >= 3) points += 15;
    if (data.education && data.education.length > 0) points += 10;
    if (data.experience && data.experience.length > 0) points += 10;
    if (data.projects && data.projects.length > 0) points += 10;
    const completionPercentage = Math.min(100, points);

    const updated: StudentProfileData = {
      ...current,
      name: data.name || current.name,
      profile: {
        ...current.profile,
        bio: data.bio ?? current.profile?.bio,
        photoUrl: data.photoUrl ?? current.profile?.photoUrl,
        resumeUrl: data.resumeUrl ?? current.profile?.resumeUrl,
        githubUrl: data.githubUrl ?? current.profile?.githubUrl,
        linkedinUrl: data.linkedinUrl ?? current.profile?.linkedinUrl,
        portfolioUrl: data.portfolioUrl ?? current.profile?.portfolioUrl,
        completionPercentage,
        skills: Array.isArray(data.skills)
          ? data.skills.map((s: string | { name: string }) => (typeof s === "string" ? { name: s } : s))
          : current.profile?.skills,
        education: data.education ?? current.profile?.education,
        experience: data.experience ?? current.profile?.experience,
        projects: data.projects ?? current.profile?.projects,
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated.profile;
  } catch (e) {
    console.error("Failed to save to localStorage:", e);
    return { ...data, completionPercentage: 95 };
  }
}
