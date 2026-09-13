"use client";

import React, { useState, useRef, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface DropdownContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
      <div ref={containerRef} className="relative inline-block text-left">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

export function DropdownMenuTrigger({
  children,
  className,
  asChild = false,
}: {
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("DropdownMenuTrigger must be inside DropdownMenu");

  const { isOpen, setIsOpen } = context;

  return (
    <button
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
      className={cn("cursor-pointer focus:outline-none", className)}
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
}

export function DropdownMenuContent({
  children,
  className,
  style,
  align = "end",
  side = "bottom",
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  align?: "start" | "center" | "end";
  side?: "top" | "bottom";
}) {
  const context = useContext(DropdownContext);
  if (!context) throw new Error("DropdownMenuContent must be inside DropdownMenu");

  const { isOpen } = context;

  const alignClasses = {
    start: "left-0",
    center: "left-1/2 -translate-x-1/2",
    end: "right-0",
  }[align];

  const sideClasses = side === "top" ? "bottom-full mb-2" : "top-full mt-2";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: side === "top" ? 6 : -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: side === "top" ? 6 : -6 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={style}
          className={cn(
            "absolute z-50 origin-top-right rounded-2xl shadow-2xl focus:outline-none",
            alignClasses,
            sideClasses,
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DropdownMenuItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const context = useContext(DropdownContext);

  const handleClick = () => {
    if (onClick) onClick();
    if (context) context.setIsOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      role="menuitem"
      className={cn(
        "cursor-pointer select-none transition-colors duration-150",
        className
      )}
    >
      {children}
    </div>
  );
}
