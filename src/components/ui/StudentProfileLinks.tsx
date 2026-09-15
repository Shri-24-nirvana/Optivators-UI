"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Plus,
  Trash2,
  Copy,
  Check,
  Globe,
  Code2,
  Terminal,
  Share2,
  X,
  Sparkles,
  Link2,
} from "lucide-react";

export interface StudentLinkItem {
  id: string;
  platform: string;
  label: string;
  url: string;
  username: string;
  badge?: string;
  color: string;
  bgColor: string;
  borderColor: string;
  verified?: boolean;
}

export const PLATFORM_PRESETS = [
  {
    platform: "GitHub",
    domain: "https://github.com/",
    placeholder: "username",
    color: "#FFFFFF",
    bgColor: "rgba(30, 41, 59, 0.6)",
    borderColor: "rgba(255, 255, 255, 0.15)",
    iconName: "github",
    defaultBadge: "32 Repos",
  },
  {
    platform: "LinkedIn",
    domain: "https://linkedin.com/in/",
    placeholder: "profile-slug",
    color: "#0A66C2",
    bgColor: "rgba(10, 102, 194, 0.12)",
    borderColor: "rgba(10, 102, 194, 0.25)",
    iconName: "linkedin",
    defaultBadge: "500+ Connections",
  },
  {
    platform: "LeetCode",
    domain: "https://leetcode.com/u/",
    placeholder: "username",
    color: "#FFA116",
    bgColor: "rgba(255, 161, 22, 0.12)",
    borderColor: "rgba(255, 161, 22, 0.25)",
    iconName: "leetcode",
    defaultBadge: "Knight · 1,920",
  },
  {
    platform: "Codeforces",
    domain: "https://codeforces.com/profile/",
    placeholder: "handle",
    color: "#3B82F6",
    bgColor: "rgba(59, 130, 246, 0.12)",
    borderColor: "rgba(59, 130, 246, 0.25)",
    iconName: "codeforces",
    defaultBadge: "Candidate Master",
  },
  {
    platform: "CodeChef",
    domain: "https://www.codechef.com/users/",
    placeholder: "username",
    color: "#A16207",
    bgColor: "rgba(161, 98, 7, 0.12)",
    borderColor: "rgba(161, 98, 7, 0.25)",
    iconName: "codechef",
    defaultBadge: "4★ (1850)",
  },
  {
    platform: "HackerRank",
    domain: "https://www.hackerrank.com/profile/",
    placeholder: "username",
    color: "#00EA64",
    bgColor: "rgba(0, 234, 100, 0.12)",
    borderColor: "rgba(0, 234, 100, 0.25)",
    iconName: "hackerrank",
    defaultBadge: "6★ Problem Solving",
  },
  {
    platform: "Portfolio / Website",
    domain: "https://",
    placeholder: "myportfolio.dev",
    color: "#0D9488",
    bgColor: "rgba(13, 148, 136, 0.12)",
    borderColor: "rgba(13, 148, 136, 0.25)",
    iconName: "globe",
    defaultBadge: "Live Showcase",
  },
  {
    platform: "Kaggle",
    domain: "https://www.kaggle.com/",
    placeholder: "username",
    color: "#20BEFF",
    bgColor: "rgba(32, 190, 255, 0.12)",
    borderColor: "rgba(32, 190, 255, 0.25)",
    iconName: "kaggle",
    defaultBadge: "Expert Tier",
  },
  {
    platform: "X / Twitter",
    domain: "https://x.com/",
    placeholder: "handle",
    color: "#1DA1F2",
    bgColor: "rgba(29, 161, 242, 0.12)",
    borderColor: "rgba(29, 161, 242, 0.25)",
    iconName: "twitter",
    defaultBadge: "Tech Creator",
  },
  {
    platform: "Custom Link",
    domain: "https://",
    placeholder: "example.com",
    color: "#8B5CF6",
    bgColor: "rgba(139, 92, 246, 0.12)",
    borderColor: "rgba(139, 92, 246, 0.25)",
    iconName: "link",
    defaultBadge: "Custom Link",
  },
];

const DEFAULT_LINKS: StudentLinkItem[] = [
  {
    id: "link-gh",
    platform: "GitHub",
    label: "GitHub",
    url: "https://github.com/rahulkumar-dev",
    username: "@rahulkumar-dev",
    badge: "32 Repos · 480+ Stars",
    color: "#FFFFFF",
    bgColor: "rgba(30, 41, 59, 0.7)",
    borderColor: "rgba(255, 255, 255, 0.18)",
    verified: true,
  },
  {
    id: "link-li",
    platform: "LinkedIn",
    label: "LinkedIn",
    url: "https://linkedin.com/in/rahulkumar-ggits",
    username: "in/rahulkumar-ggits",
    badge: "500+ Connections",
    color: "#0A66C2",
    bgColor: "rgba(10, 102, 194, 0.14)",
    borderColor: "rgba(10, 102, 194, 0.3)",
    verified: true,
  },
  {
    id: "link-lc",
    platform: "LeetCode",
    label: "LeetCode",
    url: "https://leetcode.com/u/rahul_kumar21",
    username: "rahul_kumar21",
    badge: "Knight (1,920) · 650 Solved",
    color: "#FFA116",
    bgColor: "rgba(255, 161, 22, 0.14)",
    borderColor: "rgba(255, 161, 22, 0.3)",
    verified: true,
  },
  {
    id: "link-cf",
    platform: "Codeforces",
    label: "Codeforces",
    url: "https://codeforces.com/profile/rahul_k",
    username: "rahul_k",
    badge: "Candidate Master · 1,942",
    color: "#3B82F6",
    bgColor: "rgba(59, 130, 246, 0.14)",
    borderColor: "rgba(59, 130, 246, 0.3)",
    verified: true,
  },
  {
    id: "link-hr",
    platform: "HackerRank",
    label: "HackerRank",
    url: "https://www.hackerrank.com/profile/rahulkumar_ggits",
    username: "rahulkumar_ggits",
    badge: "6★ Problem Solving",
    color: "#00EA64",
    bgColor: "rgba(0, 234, 100, 0.14)",
    borderColor: "rgba(0, 234, 100, 0.3)",
    verified: true,
  },
  {
    id: "link-portfolio",
    platform: "Portfolio / Website",
    label: "Personal Portfolio",
    url: "https://rahulkumar.dev",
    username: "rahulkumar.dev",
    badge: "Interactive 3D Portfolio",
    color: "#0D9488",
    bgColor: "rgba(13, 148, 136, 0.14)",
    borderColor: "rgba(13, 148, 136, 0.3)",
    verified: true,
  },
];

function PlatformIcon({ platform, size = 18 }: { platform: string; size?: number }) {
  const norm = platform.toLowerCase();

  if (norm.includes("github")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-slate-800 dark:text-white">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    );
  }
  if (norm.includes("linkedin")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#0A66C2]">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  if (norm.includes("leetcode")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#FFA116]">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.795l3.86-4.133 5.4-5.786a1.38 1.38 0 0 0 .341-.958 1.38 1.38 0 0 0-.341-.958 1.38 1.38 0 0 0-.979-.438zM8.98 12.016a1.38 1.38 0 0 0-1.38 1.38 1.38 1.38 0 0 0 1.38 1.38h11.04a1.38 1.38 0 0 0 1.38-1.38 1.38 1.38 0 0 0-1.38-1.38H8.98z" />
      </svg>
    );
  }
  if (norm.includes("codeforces")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#3B82F6]">
        <path d="M4.5 7.5a1.5 1.5 0 0 1 1.5 1.5v10.5a1.5 1.5 0 0 1-3 0V9a1.5 1.5 0 0 1 1.5-1.5zM12 3a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-3 0v-15A1.5 1.5 0 0 1 12 3zm7.5 7.5a1.5 1.5 0 0 1 1.5 1.5v7.5a1.5 1.5 0 0 1-3 0v-7.5a1.5 1.5 0 0 1 1.5-1.5z" />
      </svg>
    );
  }
  if (norm.includes("codechef")) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#D97706]">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-2.48 0-4.5-2.02-4.5-4.5S10.52 7.5 13 7.5c1.42 0 2.68.66 3.5 1.68l-1.42 1.42C14.58 9.94 13.84 9.5 13 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5c.84 0 1.58-.44 2.08-1.1l1.42 1.42c-.82 1.02-2.08 1.68-3.5 1.68z" />
      </svg>
    );
  }
  if (norm.includes("hackerrank")) {
    return <Terminal size={size} className="shrink-0 text-[#00EA64]" />;
  }
  if (norm.includes("portfolio") || norm.includes("website")) {
    return <Globe size={size} className="shrink-0 text-[#0D9488]" />;
  }
  if (norm.includes("kaggle")) {
    return <Code2 size={size} className="shrink-0 text-[#20BEFF]" />;
  }
  return <Link2 size={size} className="shrink-0 text-indigo-400" />;
}

export interface StudentProfileLinksProps {
  readOnly?: boolean;
  links?: StudentLinkItem[];
  onLinksChange?: (links: StudentLinkItem[]) => void;
  onOpenEdit?: () => void;
}

export function StudentProfileLinks({
  readOnly = true,
  links: externalLinks,
  onLinksChange,
  onOpenEdit,
}: StudentProfileLinksProps) {
  const [internalLinks, setInternalLinks] = useState<StudentLinkItem[]>(DEFAULT_LINKS);
  const links = externalLinks ?? internalLinks;

  const setLinks = (updater: React.SetStateAction<StudentLinkItem[]>) => {
    if (typeof updater === "function") {
      const next = updater(links);
      if (onLinksChange) onLinksChange(next);
      setInternalLinks(next);
    } else {
      if (onLinksChange) onLinksChange(updater);
      setInternalLinks(updater);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Modal Form State
  const [selectedPreset, setSelectedPreset] = useState(PLATFORM_PRESETS[0]);
  const [customPlatform, setCustomPlatform] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [customBadge, setCustomBadge] = useState("");

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    setLinks((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOpenAddModal = () => {
    setSelectedPreset(PLATFORM_PRESETS[0]);
    setCustomPlatform("");
    setUsernameInput("");
    setCustomBadge("");
    setIsModalOpen(true);
  };

  const handleSaveNewLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    const isCustom = selectedPreset.platform === "Custom Link";
    const platformName = isCustom && customPlatform.trim() ? customPlatform.trim() : selectedPreset.platform;

    let fullUrl = usernameInput.trim();
    if (!fullUrl.startsWith("http://") && !fullUrl.startsWith("https://")) {
      fullUrl = `${selectedPreset.domain}${usernameInput.trim().replace(/^@/, "")}`;
    }

    const newLink: StudentLinkItem = {
      id: `link-${Date.now()}`,
      platform: platformName,
      label: platformName,
      url: fullUrl,
      username: usernameInput.trim().startsWith("http")
        ? usernameInput.trim().replace(/^https?:\/\//, "")
        : `@${usernameInput.trim().replace(/^@/, "")}`,
      badge: customBadge.trim() || selectedPreset.defaultBadge,
      color: selectedPreset.color,
      bgColor: selectedPreset.bgColor,
      borderColor: selectedPreset.borderColor,
      verified: true,
    };

    setLinks((prev) => [...prev, newLink]);
    setIsModalOpen(false);
  };

  return (
    <div
      className="rounded-3xl p-6 sm:p-7 relative overflow-hidden transition-all duration-300 dark:border-white/15 dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.7)]"
      style={{
        background: "var(--surface-elevated)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <h3 className="font-extrabold text-lg sm:text-xl" style={{ color: "var(--text-primary)" }}>
              Coding Profiles & Verified Links
            </h3>
            <span
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(13,148,136,0.12)",
                color: "var(--accent-primary)",
                border: "1px solid rgba(13,148,136,0.25)",
              }}
            >
              <Sparkles size={12} className="text-teal-400" />
              <span>{links.length} Connected</span>
            </span>
          </div>
          <p className="text-xs sm:text-sm" style={{ color: "var(--text-secondary)" }}>
            Showcase your GitHub repositories, competitive programming ratings (LeetCode, Codeforces), and professional profiles to recruiters.
          </p>
        </div>

        {/* Add Link Action Button (Only in edit mode) */}
        {!readOnly && (
          <button
            onClick={handleOpenAddModal}
            className="shrink-0 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 hover:shadow-teal-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
            }}
          >
            <Plus size={16} />
            <span>Add Link</span>
          </button>
        )}
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <div
            key={link.id}
            className="group rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:hover:border-white/30 relative"
            style={{
              background: "var(--surface-bg)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {/* Top Row: Icon, Platform Name & Verified Check */}
            <div>
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm"
                    style={{
                      background: link.bgColor,
                      borderColor: link.borderColor,
                    }}
                  >
                    <PlatformIcon platform={link.platform} size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-sm flex items-center gap-1.5" style={{ color: "var(--text-primary)" }}>
                      <span>{link.label}</span>
                      {link.verified && (
                        <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded-full bg-teal-500/15 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                    <div
                      className="text-xs truncate max-w-[160px]"
                      style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
                    >
                      {link.username}
                    </div>
                  </div>
                </div>

                {/* Delete button (hover only, edit mode only) */}
                {!readOnly && (
                  <button
                    onClick={() => handleDelete(link.id)}
                    title="Remove Link"
                    className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-rose-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {/* Highlight Badge */}
              {link.badge && (
                <div className="mt-2 mb-3.5">
                  <span
                    className="inline-block text-[11px] font-semibold px-2.5 py-1 rounded-lg border"
                    style={{
                      background: link.bgColor,
                      borderColor: link.borderColor,
                      color: link.color === "#FFFFFF" ? "var(--text-primary)" : link.color,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {link.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Row Actions: Copy & Open */}
            <div
              className="flex items-center justify-between pt-3 mt-1 border-t"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <button
                onClick={() => handleCopy(link.id, link.url)}
                className="text-xs font-semibold flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {copiedId === link.id ? (
                  <>
                    <Check size={13} className="text-teal-500" />
                    <span className="text-teal-500 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy URL</span>
                  </>
                )}
              </button>

              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold flex items-center gap-1 px-3 py-1 rounded-lg text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-all group-hover:translate-x-0.5"
              >
                <span>Visit Profile</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        ))}

        {/* Dashed Add Link Card Box (Edit mode only) */}
        {!readOnly && (
          <button
            onClick={handleOpenAddModal}
            className="rounded-2xl p-6 flex flex-col items-center justify-center gap-2 border-2 border-dashed transition-all duration-200 hover:border-teal-500/50 hover:bg-teal-500/5 cursor-pointer text-slate-400 hover:text-teal-500 min-h-[140px]"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-teal-500/10 text-teal-500">
              <Plus size={20} />
            </div>
            <span className="font-bold text-xs sm:text-sm" style={{ color: "var(--text-primary)" }}>
              Add Another Profile
            </span>
            <span className="text-[11px] text-slate-400">
              LeetCode, Codeforces, Kaggle, etc.
            </span>
          </button>
        )}
      </div>

      {/* --- ADD LINK MODAL DIALOG --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg rounded-3xl p-6 sm:p-7 relative shadow-2xl overflow-hidden border dark:border-white/20 animate-in zoom-in-95 duration-200"
            style={{
              background: "var(--surface-elevated)",
              boxShadow: "0 20px 60px -15px rgba(0,0,0,0.7)",
            }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-5 border-b" style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-500/15 text-teal-500 flex items-center justify-center">
                  <Link2 size={18} />
                </div>
                <div>
                  <h4 className="font-extrabold text-base sm:text-lg" style={{ color: "var(--text-primary)" }}>
                    Add Profile or Social Link
                  </h4>
                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    Connect your developer accounts to showcase verified stats
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveNewLink} className="space-y-4">
              {/* 1. Platform Selection Chips */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Select Platform
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-36 overflow-y-auto pr-1">
                  {PLATFORM_PRESETS.map((preset) => {
                    const isSelected = selectedPreset.platform === preset.platform;
                    return (
                      <button
                        key={preset.platform}
                        type="button"
                        onClick={() => setSelectedPreset(preset)}
                        className={`p-2.5 rounded-xl flex flex-col items-center gap-1.5 text-center text-xs font-semibold border transition-all cursor-pointer ${
                          isSelected
                            ? "border-teal-500 bg-teal-500/15 text-teal-600 dark:text-teal-300 shadow-sm"
                            : "hover:bg-black/5 dark:hover:bg-white/5 border-transparent"
                        }`}
                        style={{
                          background: isSelected ? undefined : "var(--surface-bg)",
                          borderColor: isSelected ? undefined : "var(--border-subtle)",
                        }}
                      >
                        <PlatformIcon platform={preset.platform} size={18} />
                        <span className="truncate w-full text-[11px]">{preset.platform.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* If Custom Link is selected, show custom platform title input */}
              {selectedPreset.platform === "Custom Link" && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                    Platform / Service Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Behance, Devpost, Substack"
                    value={customPlatform}
                    onChange={(e) => setCustomPlatform(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    style={{
                      background: "var(--surface-bg)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              )}

              {/* 2. Username or URL input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  {selectedPreset.platform === "Portfolio / Website" || selectedPreset.platform === "Custom Link"
                    ? "Website URL"
                    : "Username or Profile Handle"}
                </label>
                <div className="relative flex items-center">
                  {selectedPreset.domain !== "https://" && (
                    <span
                      className="absolute left-3 text-xs font-mono select-none pointer-events-none text-slate-400"
                    >
                      {selectedPreset.domain}
                    </span>
                  )}
                  <input
                    type="text"
                    required
                    placeholder={selectedPreset.placeholder}
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full py-2.5 rounded-xl text-sm border outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 font-mono"
                    style={{
                      paddingLeft: selectedPreset.domain !== "https://" ? `${selectedPreset.domain.length * 7.5 + 16}px` : "14px",
                      paddingRight: "14px",
                      background: "var(--surface-bg)",
                      borderColor: "var(--border-subtle)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              </div>

              {/* 3. Optional Achievement / Highlight Badge */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}>
                  Highlight Badge / Rating (Optional)
                </label>
                <input
                  type="text"
                  placeholder={`e.g. ${selectedPreset.defaultBadge}`}
                  value={customBadge}
                  onChange={(e) => setCustomBadge(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl text-sm border outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  style={{
                    background: "var(--surface-bg)",
                    borderColor: "var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                />
              </div>

              {/* Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 mt-2 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  style={{
                    background: "linear-gradient(135deg, #0D9488 0%, #0F766E 100%)",
                  }}
                >
                  Save Profile Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentProfileLinks;
