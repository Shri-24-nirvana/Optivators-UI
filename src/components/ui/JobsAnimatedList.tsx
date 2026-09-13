"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/registry/magicui/animated-list";

export interface JobNotificationItem {
  name: string;
  description: string;
  icon: string;
  color: string;
  time: string;
  badge?: string;
  match?: string;
}

const DEFAULT_NOTIFICATIONS: JobNotificationItem[] = [
  {
    name: "Amazon",
    description: "SDE Intern · Cloud & Distributed Systems",
    time: "2m ago",
    icon: "📦",
    color: "#FF9900",
    badge: "Internship",
    match: "96%",
  },
  {
    name: "Razorpay",
    description: "Backend Engineer · Core Payments Engine",
    time: "5m ago",
    icon: "⚡",
    color: "#2563EB",
    badge: "Full-time",
    match: "91%",
  },
  {
    name: "Google",
    description: "SWE Intern (Summer 2026) · Applied",
    time: "10m ago",
    icon: "🔍",
    color: "#EA4335",
    badge: "Internship",
    match: "94%",
  },
  {
    name: "Flipkart",
    description: "Data Analyst · Product Analytics & SQL",
    time: "15m ago",
    icon: "📊",
    color: "#0D9488",
    badge: "Full-time",
    match: "88%",
  },
  {
    name: "Microsoft",
    description: "Associate Consultant · Final Round Invite",
    time: "25m ago",
    icon: "💼",
    color: "#059669",
    badge: "Full-time",
    match: "95%",
  },
  {
    name: "Atlassian",
    description: "Full Stack Intern · React & Node.js",
    time: "40m ago",
    icon: "🚀",
    color: "#0052CC",
    badge: "Internship",
    match: "89%",
  },
  {
    name: "Zomato",
    description: "Frontend Engineer · Next.js & UI Core",
    time: "1h ago",
    icon: "🍕",
    color: "#E23744",
    badge: "Full-time",
    match: "92%",
  },
  {
    name: "Uber",
    description: "Systems Intern · Real-time Dispatching",
    time: "2h ago",
    icon: "🚗",
    color: "#111827",
    badge: "Internship",
    match: "90%",
  },
];

const NotificationCard = ({
  name,
  description,
  icon,
  color,
  time,
  badge,
  match,
}: JobNotificationItem) => {
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-3.5 sm:p-4",
        // animation styles
        "transition-all duration-200 ease-in-out hover:scale-[102%] active:scale-[0.99]",
        // light styles
        "bg-white shadow-[0_0_0_1px_rgba(0,0,0,.04),0_2px_4px_rgba(0,0,0,.04),0_8px_16px_rgba(0,0,0,.04)] border border-slate-100",
        // dark styles
        "transform-gpu dark:bg-[#0F172A]/80 dark:shadow-[0_-20px_80px_-20px_#ffffff12_inset] dark:backdrop-blur-md dark:border dark:border-white/10"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 sm:size-11 items-center justify-center rounded-2xl shrink-0 text-white font-bold shadow-sm"
          style={{
            backgroundColor: color,
          }}
        >
          <span className="text-lg sm:text-xl">{icon}</span>
        </div>
        <div className="flex flex-col overflow-hidden flex-1 min-w-0">
          <figcaption className="flex flex-row items-center justify-between text-sm sm:text-base font-semibold whitespace-pre text-slate-900 dark:text-white">
            <div className="flex items-center gap-1.5 truncate">
              <span className="truncate">{name}</span>
              {badge && (
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">
                  {badge}
                </span>
              )}
            </div>
            <span className="text-[11px] font-normal text-slate-400 shrink-0 ml-1">{time}</span>
          </figcaption>
          <div className="flex items-center justify-between gap-2 mt-0.5">
            <p className="text-xs font-normal text-slate-500 dark:text-slate-300 truncate">
              {description}
            </p>
            {match && (
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0" style={{ fontFamily: "var(--font-mono)" }}>
                {match}
              </span>
            )}
          </div>
        </div>
      </div>
    </figure>
  );
};

export function JobsAnimatedList({
  className,
  items = DEFAULT_NOTIFICATIONS,
}: {
  className?: string;
  items?: JobNotificationItem[];
}) {
  return (
    <div
      className={cn(
        "relative flex h-[340px] w-full flex-col overflow-hidden px-1 py-2",
        className
      )}
    >
      <AnimatedList delay={3400}>
        {items.map((item, idx) => (
          <NotificationCard {...item} key={`${item.name}-${idx}`} />
        ))}
      </AnimatedList>

      {/* Bottom fade gradient mask */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--surface-elevated)] to-transparent" />
    </div>
  );
}

export default JobsAnimatedList;
