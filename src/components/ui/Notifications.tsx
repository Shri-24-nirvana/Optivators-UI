"use client";

import React, { useState } from "react";
import { BellRing, MessageCircle, AlertTriangle, CheckCircle, Check, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Notification {
  id: number;
  type: "message" | "alert" | "success";
  message: string;
  timestamp?: string;
  read?: boolean;
}

interface NotificationsProps {
  notifications?: Notification[];
  icon?: React.ReactNode;
  maxHeight?: string;
}

const defaultNotifications: Notification[] = [
  { id: 1, type: "message", message: "New opportunity matched: SDE Intern @ Amazon", timestamp: "2m ago", read: false },
  { id: 2, type: "success", message: "System Design Quiz scored 88% — Verified", timestamp: "10m ago", read: false },
  { id: 3, type: "message", message: "Infosys Recruiter viewed your 360° profile", timestamp: "25m ago", read: false },
  { id: 4, type: "alert", message: "Mega Campus Placement Drive starts tomorrow", timestamp: "1h ago", read: false },
  { id: 5, type: "success", message: "ATS Resume exported to Google Drive", timestamp: "3h ago", read: true },
];

export default function Notifications({
  notifications: initialNotifications = defaultNotifications,
  icon,
  maxHeight = "80",
}: NotificationsProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications([]);
  };

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "message":
        return <MessageCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />;
      case "alert":
        return <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />;
      default:
        return <BellRing className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="relative p-2 rounded-xl transition-all duration-200 hover:bg-slate-100 dark:hover:bg-white/10 active:scale-95 inline-flex items-center justify-center text-slate-700 dark:text-slate-200"
      >
        {icon || <BellRing className="w-5 h-5" />}
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold leading-none text-white bg-red-500 rounded-full shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="bottom"
        align="end"
        className={`w-80 sm:w-96 border rounded-2xl shadow-2xl max-h-${maxHeight} overflow-hidden flex flex-col backdrop-blur-2xl bg-white/85 dark:bg-[#0D1424]/85 dark:border-white/20 dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]`}
        style={{
          background: "var(--surface-elevated)",
          borderColor: "var(--border-subtle)",
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.25), 0 0 0 1px var(--border-subtle)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--border-subtle)" }}>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
              Notifications
            </span>
            {unreadCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 dark:text-red-400">
                {unreadCount} new
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
              >
                <Check size={12} /> Mark all read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={clearAll}
                title="Clear all"
                className="text-slate-400 hover:text-red-500 transition-colors p-1"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Notifications list */}
        <div className="overflow-y-auto divide-y divide-slate-100 dark:divide-white/5 max-h-80">
          {notifications.length === 0 ? (
            <div className="p-8 text-center" style={{ color: "var(--text-muted)" }}>
              <BellRing className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-xs font-medium">No new notifications</p>
            </div>
          ) : (
            notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                onClick={() => toggleRead(n.id)}
                className={`flex items-start gap-3 p-3.5 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors ${
                  n.read ? "opacity-65" : "bg-teal-500/[0.03]"
                }`}
              >
                {getIcon(n.type)}
                <div className="flex flex-col flex-1 min-w-0">
                  <span
                    className={`text-xs sm:text-sm leading-snug ${
                      n.read ? "font-normal" : "font-semibold"
                    }`}
                    style={{ color: "var(--text-primary)" }}
                  >
                    {n.message}
                  </span>
                  {n.timestamp && (
                    <span className="text-[10px] font-medium text-slate-400 dark:text-slate-400 mt-1">
                      {n.timestamp}
                    </span>
                  )}
                </div>
                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
                )}
              </DropdownMenuItem>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-t text-center" style={{ borderColor: "var(--border-subtle)" }}>
            <span className="text-[11px] font-semibold text-slate-400">
              Showing recent alerts & recruiter matches
            </span>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { Notifications };
