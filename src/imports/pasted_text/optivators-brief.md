# SYSTEM PROMPT: ENTERPRISE EDTECH & COGNITIVE ASSESSMENT PLATFORM (OPTIVATORS)

## 1. PROJECT BRIEF & PLATFORM OVERVIEW
- **Project Name:** Optivators (Next-Gen AI Career Readiness, Cognitive Testing & Campus Placement Platform)
- **Target Audience:** College Students, College Faculty, College Administrators, Optus Master Trainers, and Super Admins (Global SaaS).
- **Core Value Proposition:** Unified platform connecting cognitive testing (Tech & Non-Tech tracks), skill validation, automated scoring algorithms (Spider Radar & 4-axis scores), placement readiness, hierarchical faculty tree management, promo code wallets, and multi-tenant college analytics.
- **Theme Support:** Native Dual-Mode (Light Mode default + Dark Glassmorphic Night Mode).

---

## 2. DESIGN SYSTEM & DESIGN TOKENS (FIGMA VARIABLES)

### A. Typography System (Google Fonts)
- **Primary / UI Sans:** `"DM Sans", system-ui, sans-serif`
  - Body Regular: `14px / Line-height 20px / Weight 400`
  - Body Medium: `14px / Line-height 20px / Weight 500`
  - Body Bold / Accent: `14px / Line-height 20px / Weight 700`
  - Small / Caption: `12px / Line-height 16px / Weight 500`
  - Micro / Badge: `10px / Line-height 12px / Weight 700 / Uppercase / Letter-spacing +0.05em`
  - Subheadings: `16px–18px / Line-height 24px / Weight 700`
  - Section Titles: `20px–24px / Line-height 32px / Weight 800`
  - Page Titles / Display: `28px–34px / Line-height 40px / Weight 800`
- **Display / Editorial Serifs (Hero Headings & Accents):** `"Instrument Serif", Georgia, serif` (Used on landing page highlights and metric callouts)
- **Monospace (Scores, Ranks & Code):** `"JetBrains Mono", monospace` (Used for Rank #, CGPA, Promo Codes, and Score values)

### B. Color Palette & Theming (Figma Color Variables)

| Token Name | Light Mode (Default) | Dark Mode (Glassmorphism) | Usage |
| :--- | :--- | :--- | :--- |
| `surface-bg` | `#F7F8FB` (Off-white cool grey) | `#080C14` (Deep obsidian navy) | Canvas / Background |
| `surface-elevated` | `#FFFFFF` (Pure white) | `#0F1520` (Midnight elevated card) | Cards, Modals, Popovers |
| `surface-glass` | `rgba(255, 255, 255, 0.72)` | `rgba(15, 21, 32, 0.78)` | Blur 16px-24px backdrop cards |
| `border-subtle` | `rgba(15, 23, 42, 0.08)` | `rgba(255, 255, 255, 0.08)` | Standard card/divider borders |
| `border-strong` | `rgba(15, 23, 42, 0.14)` | `rgba(255, 255, 255, 0.16)` | Active card hover & inputs |
| `text-primary` | `#0F172A` (Slate 900) | `#F1F5F9` (Slate 100) | Primary Headings, Metric numbers |
| `text-secondary` | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Subtitles, Table headers, Labels |
| `text-muted` | `#94A3B8` (Slate 400) | `#64748B` (Slate 500) | Helper text, Timestamps, Icons |
| `accent-primary` | `#0D9488` (Teal 600) | `#2DD4BF` (Teal 400 Glow) | Primary buttons, Active tabs, Rings |
| `accent-soft` | `rgba(13, 148, 136, 0.12)` | `rgba(45, 212, 191, 0.12)` | Active sidebar item, Pill badges |
| `track-nontech` | `#EA580C` (Orange 600) | `#FB923C` (Orange 400) | Non-Tech Track scorecards & badges |
| `success` | `#059669` (Emerald 600) | `#34D399` (Emerald 400) | Completed quizzes, Advanced status |
| `warning` | `#D97706` (Amber 600) | `#FBBF24` (Amber 400) | Intermediate tier, Pending status |
| `danger` | `#DC2626` (Red 600) | `#F87171` (Red 400) | Beginner tier, Critical actions |
| `info` | `#2563EB` (Blue 600) | `#60A5FA` (Blue 400) | Interview Prep cards, Info banners |
| `sidebar-bg` | `#FFFFFF` or `#0C1222` | `#050810` (Dark contrast) | Persistent navigation sidebar |

### C. Glassmorphism & Elevation System
- **Glass Card Style:** Linear gradient background `(145deg, rgba(15, 23, 42, 0.78) 0%, rgba(10, 15, 30, 0.68) 100%)` with `backdrop-filter: blur(24px) saturate(180%)`, border `1px solid rgba(255, 255, 255, 0.09)`, and box-shadow `0 20px 40px -15px rgba(0,0,0,0.5)`.
- **Specular Top Highlights:** Top inset border `1px` subtle gradient from `transparent` to `rgba(45, 212, 191, 0.4)` to `transparent`.
- **Corner Radius:**
  - Micro elements (Tags, Small badges): `8px`
  - Inputs & Standard Buttons: `12px`
  - Cards & Containers: `20px` to `24px`
  - Modals & Hero Scorecards: `32px`
  - Circular Gauges / Avatars: `9999px (Full)`

---

## 3. GLOBAL SHELL & REUSABLE UI COMPONENTS

### Global App Layout Frame (1440px Desktop Grid)
1. **Collapsible Sidebar (Left - Width 232px expanded / 72px collapsed):**
   - **Header:** Optivators Brand Logo + Geometric Symbol (`BrandLogo.tsx`), collapse toggle chevron button on right edge.
   - **Navigation Items (Auto-layout vertical 6px gap):** Icon (18px) + Label (14px Bold), active state with soft accent pill `bg-[var(--color-accent-soft)]`, text `[var(--color-accent)]`.
   - **Footer:** Settings item (`SettingsIcon`), Theme Switcher (Light/Dark pill toggle), and Logout with red hover effect.
2. **Top Bar (Sticky Top - Height 64px, Glass backdrop):**
   - **Left:** Page Breadcrumbs / Role context pill (`Student Track: TECH` or `College: XYZ Institute`).
   - **Center:** Global Search bar with shortcut pill `⌘K` / `Ctrl+K`.
   - **Right:** Notification Bell with unread indicator dot, Dark/Light Mode switch, User Avatar with status dot and name/role dropdown.
3. **Main Content Canvas (Auto-layout vertical 24px gap, padding 32px):**
   - Centered container max-width `1280px`.

---

## 4. ROLE-BY-ROLE COMPLETE SCREEN SPECIFICATIONS

---

### GROUP 1: PUBLIC & AUTHENTICATION FLOWS (4 Screens)

#### 1.1 Home / Landing Page (`/`)
- **Hero Section:** High-converting hero banner featuring `"AI-Powered Career Readiness & Cognitive Benchmark Engine"`. Interactive CTA buttons: `Student Portal`, `College Admin Login`, `Request Demo`.
- **Feature Showcase:** 3D Glass cards previewing (1) Cognitive Testing 4-Track Engine, (2) 360 Verified Student Profile with Spider Radar, (3) Multi-tenant Campus Analytics.
- **Metric Counter:** Live counters for `100K+ Questions Attempted`, `50+ Partner Institutes`, `94% Placement Readiness`.
- **Footer:** Links, legal, copyright, and student support.

#### 1.2 Unified Login Page (`/login`)
- **Layout:** Split-screen frame (Left: Glassmorphic brand visual with floating student stat cards; Right: Clean Card auth form).
- **Form Elements:**
  - Role switcher tabs or unified single sign-on.
  - Social Login Button: `Continue with Google` (Google G logo, border, hover lift).
  - Divider: `"Or continue with email"`.
  - Floating inputs: Email address, Password (with eye toggle for show/hide).
  - Links: `"Forgot password?"` modal trigger.
  - Submit Button: Full-width teal gradient button `"Sign In to Portal"`.
  - Footer Callout: `"Don't have an account? Register as Student"`.

#### 1.3 Student Self-Registration Page (`/register`)
- **Step 1: Academic Enrollment:**
  - College selection searchable dropdown.
  - Branch dropdown (e.g., Computer Science, AIML, Mechanical, MBA, BBA).
  - Academic metadata: Degree (B.Tech, M.Tech, BCA, MBA), Year (1st, 2nd, 3rd, 4th), Batch (e.g. 2022-2026), Semester, Roll Number.
- **Step 2: Account & Track Selection:**
  - Name, Email, Mobile number with country code, Password, Confirm Password.
  - Track Card Radio Selector:
    - **Tech Track Card:** Engineering, CP, DSA, System Design, Cloud.
    - **Non-Tech Track Card:** Management, Sales, Marketing, HR, Strategy, Aptitude.
- **CTA:** `"Complete Registration & Start Assessment"`.

#### 1.4 Staff Complete Registration Page (`/{role}/complete-registration`)
- Dedicated for College Admin, College Faculty, and Optus Faculty invited via temporary credentials.
- Inputs: Temporary Password, New Permanent Password, Confirm Password, Profile Details confirmation.

---

### GROUP 2: STUDENT PORTAL (10 Screens + Modals)

#### 2.1 Student Dashboard (`/student`)
- **Top Banner:** Profile Completion Banner (`85%` progress bar, avatar, `"Complete your profile to get noticed by recruiters"`, CTA `"Complete Now"`).
- **4 KPI Stat Cards (Grid 4-col):**
  1. *Profile Views:* Large number `142`, badge `"Viewed by recruiters"`, violet eye icon.
  2. *Skills Validated:* Number `12`, badge `"Verified in profile"`, emerald shield icon.
  3. *Cognitive Score:* Score `7.2 / 10`, mini horizontal progress bar, teal brain icon.
  4. *Projects:* Number `3`, pink folder icon, `"Add more projects"`.
- **Hero Grid (Split 3:2):**
  - *Left (3 cols):* Cognitive Testing Card with 4 sub-track pills (Tech Track, Non-Tech Track, Interview Prep, Subjective) and `"Start Assessment"` CTA.
  - *Right (2 cols):* Opportunities Card with matched jobs/internships counter and `"Browse Now"` CTA.
- **Quick Actions Bar (7 Interactive Icon Buttons):** View Profile, My Courses, Resume Builder, Opportunities, Communities, Campus Directory, Cognitive Portal.

#### 2.2 Cognitive Testing Portal (`/student/cognitive`)
- **Track Status Header:** Track badge (`Tech Student Track` or `Non-Tech Student Track`) with animated brain icon.
- **Top 4 Scorecards (Domains, Non-Tech Skills, Interview Prep, CRT):**
  - Overall Score `/ 10` in JetBrains Mono.
  - Progress bar showing percentage completed.
  - Primary Card Action Button: `"Explore Specializations"` with sparkles icon.
- **Filter Toolbar:**
  - Multi-select Branch Filter dropdown (CSE Core, AIML, Data Science, Cyber, IoT, Sales, HR, Finance).
  - Selected Branch tags / pill badges with remove `(x)` icons and `"Reset Filters"` button.
- **Expandable Course Package Accordions (Pill Style):**
  - Horizontal Pill Header: Thumbnail image, Package Name, Course Count badge, Completed items count, Animated chevron icon.
  - Expanded Content Grid (3 cols):
    - Course Card: Aspect-ratio 16:9 thumbnail, Completed badge overlay, Skill tags, Quiz attempt scores (e.g. `Quiz 1: 85%`), Progress Bar, `"Take Quiz"` CTA button with arrow.
- **Modal: Domains & Specializations Portal:**
  - Full-screen modal with side-by-side Topic list, curriculum syllabus tree, question count, and instant start assessment action.

#### 2.3 Student 360 Public Profile (`/student/profile/:userId?`)
- **Profile Header Card (Gradient Mesh):**
  - Student Avatar (112px with glowing ring), Full Name, College Name, Roll No, Branch, Degree, Batch, Semester, Track, Email, Phone.
  - Top Right Gauges: Dual circular rings for (1) **CGPA** (e.g. `8.9`), (2) **Platform Rank** (e.g. `#14`).
  - `"Edit Profile"` button (shown for owner).
- **About Me Card:** Bio and career objective.
- **Placement Readiness & Quick Stats (4-grid):** Placement Readiness `92%`, Mock Interviews `6`, Profile Completion `95%`, Profile Views `240`.
- **Skill Radar & Core Skills Section (Grid 5-col):**
  - Left (3 cols): **Cognitive Radar Chart (Spider Web)** with 6 axes (Technical, Coding, Aptitude, Reasoning, English, Problem Solving).
  - Right (2 cols): 6 Circular Progress Rings with percentage scores.
- **Skills Showcase:**
  - Technical Skills Cards with brand logos (Python, React, Java, Docker, SQL).
  - Non-Technical Skills Cards (Communication, Leadership, Business Analysis, Figma).
  - Validated Skills Cards: Verified green badge, proficiency bar, and Level (`Beginner`, `Intermediate`, `Advanced`).
- **Interview Performance Breakdown:**
  - Overall Readiness Bar with AI Score, Confidence Score, Body Language Score.
  - 8-metric progress ring grid (AI Technical, Communication, Behavioural, Leadership, Analytics, Problem Solving, HR Rating, AI Tools).
- **Experience Timeline Cards:** Company initial logo, Position, Duration, Ongoing pulse indicator, Description bullet points.
- **Education & Projects Grid:** Degree cards, Project cards with GitHub repo and Live demo link buttons.

#### 2.4 Edit Profile Page (`/student/edit-profile`)
- Tabbed settings form:
  1. *Personal & Academic Details* (Avatar upload, bio, social handles: GitHub, LinkedIn, Portfolio).
  2. *Experience & Internships* (Add/Edit modal with company, role, dates, current job checkbox).
  3. *Education History* (Institutions, degrees, scores).
  4. *Projects* (Title, tech stack tags, repository URL, live link, project screenshots).
  5. *Skills & Certifications* (Multi-select skill tags, certificate upload, issuing authority).

#### 2.5 My Courses Page (`/student/courses`)
- Grid of enrolled LMS courses synced with Graphy. Course thumbnail, progress bar, chapter index, instructor name, deep-link button `"Resume Learning"`.

#### 2.6 Opportunities & Job Board (`/student/opportunities`)
- Search & Filter bar (Full-time, Internship, On-campus, Off-campus, Salary range).
- Job Cards: Company logo, Job title, Location (Remote/On-site), CTC / Stipend badge, Matched skill tags, `"Easy Apply"` button.

#### 2.7 Resume Builder (`/student/resume`)
- Split-screen workspace: Left controls (Select template, customize sections, toggle GPA/Photo), Right live A4 PDF preview with `"Download PDF"` and `"Share Link"` actions.

#### 2.8 Campus Directory (`/student/campus-directory`)
- Searchable card grid of college peers, batchmates filter, branch tags, and `"View 360 Profile"` button.

#### 2.9 Communities & Clubs (`/student/communities`)
- Discussion feed, College announcements, Technical club cards (AI Club, Coding Society, E-Cell).

#### 2.10 Student Settings (`/student/settings`)
- Security (Password reset), Notification preferences, Dark mode preference, Account deletion.

---

### GROUP 3: COLLEGE ADMIN PORTAL (10 Screens)

#### 3.1 College Admin Dashboard (`/college-admin`)
- **Campus Header:** College Name, Admin avatar, Total Enrolled metric.
- **Top 6 Stat Cards (Grid 6-col):**
  1. *Total Students:* `1,450`
  2. *Profile Completion:* `78% (1,130/1,450)`
  3. *Billing None:* `120`
  4. *Billing Pending:* `45`
  5. *Billing Paid:* `1,200`
  6. *Billing Waived:* `85`
- **Learner Tier Cards (4-grid):** Advanced Learners (Emerald), Intermediate (Amber), Beginner (Red), No Score Yet (Grey).
- **Performance Overview Rings (5-grid):** Avg Platform Score, Avg Domain, Avg Non-Tech, Avg Interview Prep, Avg CRT.
- **6 Detailed Analytics Charts (Grid 2-col):**
  1. *Student Growth Chart:* Smooth gradient area chart (Jan-Dec enrollment curve).
  2. *Top Skill Distribution:* Horizontal bar chart.
  3. *Validated Skills Chart:* Green bar chart of verified student counts.
  4. *Coding Progress Chart:* Stacked bar chart (Easy, Medium, Hard problems solved).
  5. *Branch-wise Performance:* Department-wise average platform score comparison.
  6. *Cohort-wise Performance:* Cohort batch score comparison.
- **Full-Year GitHub-Style Activity Heatmap:** 365-day square grid (52 weeks x 7 days) with month headers and 5 green intensity levels.

#### 3.2 Faculty Management & Tree Hierarchy (`/college-admin/faculty`)
- **Action Bar:** Search faculty, Filter by Department, Primary Button `"+ Provision Faculty"`.
- **Dual View Switcher:**
  - *Table View:* Name, Email, Department, Designation, Subtree Faculty count, Students under management, Promo Allocated, Permissions badge list, Action menu.
  - *Tree View (Org Chart):* Interactive visual node tree showing Head of Dept -> Senior Professors -> Assistant Faculty hierarchy with drag/expand capabilities.
- **Modal: Provision Faculty Member:** Name, Email, Department, Designations, Initial Promo Credits allocation, Checkbox list of permissions (`branches:manage`, `cohortgroups:manage`, `cohorts:manage`, `promos:allocate`).

#### 3.3 Students Master Roster (`/college-admin/students`)
- Filter bar (Branch, Cohort, Batch, Tier, Search Name/Roll No).
- Data Table: Avatar + Name, Roll No, Branch, Batch, Platform Score (color-coded badge), Cognitive Score, Profile % bar, Quick Actions (`View 360 Profile`, `Assign Cohort`, `Reset Password`).
- Bulk Actions: Bulk export CSV, Bulk assign to cohort.

#### 3.4 Student 360 Profile Drawer (`/college-admin/student/:id`)
- Slide-over overlay drawer (width 700px) displaying the student's full 360 profile, scorecards, radar chart, and performance metrics without navigating away.

#### 3.5 Branches Management (`/college-admin/branches`)
- Grid of branch cards (e.g., Computer Science Engineering, Information Technology, AI & Data Science, Mechanical, MBA).
- Metrics per card: Total Students, Total Faculty, Active Cohorts, Action buttons (`Edit`, `Delete`, `Manage Curriculum`).
- Modal: Add/Edit Branch.

#### 3.6 Cohort Groups Management (`/college-admin/cohort-groups`)
- Grouping table by Academic Year & Degree (e.g. `B.Tech 2022-2026 Batch`).
- Branch mappings and semester linking.

#### 3.7 Cohorts Management (`/college-admin/cohorts`)
- Cohort Cards with student enrollment count, assigned mentor/faculty, and linked packages.
- Student Assignment Modal (Single search + Bulk CSV upload).

#### 3.8 Promo Allocations & Code Wallet (`/college-admin/promo-allocations`)
- **College Wallet Summary Card:** Total Credits Purchased, Distributed to Faculty, Redeemed by Students, Available Balance.
- **Faculty Allocation Table:** Faculty Name, Department, Allocated Codes, Used Codes, Remaining Balance, Action `"Allocate Credits"`.
- **Modal: Allocate Promo Credits:** Select Faculty member, Enter count of promo credits, note/reason.

#### 3.9 Top Performers Leaderboard (`/leaderboard`)
- Filter by Branch, Year, Cohort, Timeframe (All-time, This Semester, Monthly).
- **Top 3 Podium Display:** 1st Place (Gold crown & avatar), 2nd Place (Silver), 3rd Place (Bronze).
- **Ranked Table:** Rank (#1-#100), Student Name, Branch, Platform Score, Domain Score, Validated Skills count, Public profile link.

#### 3.10 Admin Settings (`/settings`)
- College Logo & Identity, Official Domain, Department list, Admin accounts, Security.

---

### GROUP 4: COLLEGE FACULTY PORTAL (8 Screens)

#### 4.1 Faculty Dashboard (`/college-faculty`)
- Assigned Cohorts overview cards, My Students count (`280`), Distributed Promo Codes count (`150`), Subordinate faculty count.
- Recent Quiz Activity Stream: Real-time list of student submissions with scores and dates.

#### 4.2 My Students Roster (`/college-faculty/students`)
- Filterable student table restricted to the faculty's assigned cohorts/departments.

#### 4.3 Promo Code Wallet & Generation (`/college-faculty/promo-codes`)
- **My Wallet Card:** Total Allocated Credits, Available Credits to Issue.
- **Action Buttons:** `Generate Single Promo Code` & `Bulk Upload Students CSV`.
- **Promo Tracking Table:** Generated Code, Student Email, Student Name, Status (`Redeemed` vs `Unused`), Date Generated.
- **Modal: Single Code Generator:** Input student email and select course package.
- **Modal: Bulk CSV Promo Uploader:** Drag-and-drop CSV file, mapping preview, and automated email dispatch toggle.

#### 4.4 Permission-Gated Branches (`/college-faculty/branches`)
- Accessible only when granted `branches:manage` permission.

#### 4.5 Permission-Gated Cohort Groups (`/college-faculty/cohort-groups`)
- Accessible only when granted `cohortgroups:manage` permission.

#### 4.6 Faculty Cohorts Management (`/college-faculty/cohorts`)
- Create and assign students to faculty-specific practice cohorts.

#### 4.7 Faculty Top Performers (`/college-faculty/top-performers`)
- Leaderboard filtered to faculty's department/cohorts.

#### 4.8 Faculty Settings (`/college-faculty/settings`)

---

### GROUP 5: SUPER ADMIN PORTAL (7 Screens)

#### 5.1 Super Admin Global Dashboard (`/super-admin`)
- **SaaS Metric Cards (6-grid):** Total Partner Colleges (`32`), Total Active Students (`45,200`), Total Faculty (`1,250`), Active Domain Packages (`18`), Global Assessment Attempts (`280,000`), System Health (`99.9%`).
- **Global Activity & Growth Chart:** Multi-college monthly signup curves.
- **Recent College Onboardings:** Table of recently provisioned institutes.

#### 5.2 Colleges Master Management (`/super-admin/colleges`)
- Search & status filter (Active, Trial, Expired).
- College Data Table: College Logo, Name, Domain, Admin Contact, Total Students, Active Packages, Contract Expiry, Status Pill, Actions (`View Details`, `Adjust Credits`, `Suspend`).
- **Modal: Provision New College:** College Name, Domain Slug, Admin Name, Admin Email, Initial Promo Pool count, Subscription Tier, Contract dates.

#### 5.3 College Detail Deep-Dive (`/super-admin/colleges/:id`)
- Comprehensive overview of a specific college: Campus branches, provisioned admins, student volume, promo credit top-up history.

#### 5.4 Global Master Cohorts (`/super-admin/cohorts`)
- Cross-institutional cohort groupings and external batch management.

#### 5.5 Quizzes & Package Management (`/super-admin/quizzes`)
- **3 Tabbed Package Catalogs:**
  1. *Domain Quiz Packages:* CSE, AIML, Data Science, Cyber, Cloud packages. Add/Remove packages, Graphy curriculum sync, edit thumbnail, topic tags.
  2. *CRT Packages:* Campus Recruitment Training modules replace/update.
  3. *Non-Tech Packages:* Quantitative Aptitude, Logical Reasoning, Verbal modules.
- **Modal: Add/Edit Domain Package:** Package Title, Graphy Product ID, Category, Thumbnail image uploader, Course syllabus mapping.

#### 5.6 Optus Master Faculties (`/super-admin/optus-faculties`)
- Management table of Optus Internal Trainers and Content Leads. Provision modal with partner college assignments.

#### 5.7 Super Admin Settings (`/super-admin/settings`)
- Global system settings, Graphy API integration status, Redis cache flush, audit logs.

---

### GROUP 6: OPTUS FACULTY PORTAL (5 Screens)

#### 6.1 Optus Faculty Analytics (`/optus-faculty/analytics`)
- Cross-college performance benchmark, Package engagement heatmaps, Quiz completion rates across partner colleges.

#### 6.2 Master Training Cohorts (`/optus-faculty/cohorts`)
- Multi-college training batch creation, live webinar links, assigned student rosters.

#### 6.3 Student Directory (`/optus-faculty/students`)
- Global student search and cognitive score lookup across all partner institutions.

#### 6.4 Content & Packages Catalog (`/optus-faculty/packages`)
- Review and preview of Domain Quizzes, CRT modules, and Non-Tech test banks.

#### 6.5 Optus Faculty Settings (`/optus-faculty/settings`)

---

## 5. FIGMA CANVAS ORGANIZATION & COMPONENT SET (FOR AGENT)

### Page Structure in Figma File
1. `🎨 Foundations & Design Tokens` (Colors, Typography Scale, Shadows, Grids, Icons)
2. `🧩 UI Component Library` (Buttons, Inputs, Badges, StatCards, ProgressRings, Charts, Tables, Modals)
3. `🌐 01. Public & Auth` (Home, Login, Register, Complete Registration)
4. `🎓 02. Student Portal` (Dashboard, Cognitive, 360 Profile, Edit Profile, Courses, Jobs, Resume)
5. `🏛️ 03. College Admin Portal` (Dashboard, Faculty Tree, Students, Branches, Cohorts, Promos, Leaderboard)
6. `👨‍🏫 04. College Faculty Portal` (Dashboard, My Students, Promo Codes, Bulk Upload, Cohorts)
7. `⚡ 05. Super Admin Portal` (SaaS Dashboard, Colleges, College Detail, Quizzes & Packages, Optus Faculty)
8. `🚀 06. Optus Faculty Portal` (Analytics, Master Cohorts, Students, Packages)

### Component Variants to Generate
- **Button:** `Hierarchy=(Primary | Secondary | Ghost | Danger)`, `Size=(Sm | Md | Lg)`, `State=(Default | Hover | Pressed | Disabled | Loading)`.
- **StatCard:** `Color=(Teal | Emerald | Violet | Amber | Pink | Blue)`, `State=(Default | Hover-Lift)`.
- **Badge / Pill:** `Variant=(Success | Warning | Danger | Info | Neutral | Accent)`, `Size=(Sm | Md)`.
- **DataTable Row:** `State=(Default | Hover | Selected)`, `Mode=(Light | Dark)`.
- **Modal Dialog:** `Size=(Sm | Md | Lg | Fullscreen)`, `Mode=(Light | Dark)`.

---
