"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

export interface SmoothCursorProps {
  cursor?: React.ReactNode;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  className?: string;
}

export function SmoothCursor({
  cursor,
  springConfig = { damping: 42, stiffness: 950, mass: 0.015 },
  className,
}: SmoothCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const { isDark } = useTheme();

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-crisp, zero-latency spring dynamics (instant tracking with buttery 120 FPS interpolation)
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const hoverCheckRaf = useRef<number | null>(null);

  useEffect(() => {
    // Disable completely on touch / coarse pointer devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Instant coordinate update to MotionValues
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Throttled hover detection via RAF to eliminate continuous DOM traversal overhead
      if (!hoverCheckRaf.current) {
        hoverCheckRaf.current = requestAnimationFrame(() => {
          hoverCheckRaf.current = null;
          const target = e.target as HTMLElement | null;
          if (target) {
            const isClickable = Boolean(
              target.closest(
                "button, a, input, select, textarea, [role='button'], .cursor-pointer, [data-clickable='true']"
              )
            );
            setIsPointer(isClickable);
          }
        });
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      if (hoverCheckRaf.current) cancelAnimationFrame(hoverCheckRaf.current);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        transformOrigin: "top left",
      }}
      className={cn(
        "pointer-events-none fixed top-0 left-0 z-[9999999] will-change-transform hidden md:block select-none",
        className
      )}
    >
      {cursor ? (
        cursor
      ) : (
        <ThemeAwareCursorSVG isDark={isDark} isPointer={isPointer} isClicking={isClicking} />
      )}
    </motion.div>
  );
}

function ThemeAwareCursorSVG({
  isDark,
  isPointer,
  isClicking,
}: {
  isDark: boolean;
  isPointer: boolean;
  isClicking: boolean;
}) {
  // In Light Theme: Black (#000000) with crisp white border
  // In Dark Theme: White (#FFFFFF) with crisp black border
  const fillColor = isDark ? "#FFFFFF" : "#000000";
  const strokeColor = isDark ? "#000000" : "#FFFFFF";
  const glowColor = isDark ? "rgba(255, 255, 255, 0.45)" : "rgba(0, 0, 0, 0.4)";

  return (
    <div
      className={cn(
        "relative pointer-events-none origin-top-left transition-transform duration-100 ease-out",
        isClicking ? "scale-90" : isPointer ? "scale-115" : "scale-100"
      )}
    >
      {/* Precision Apple / Figma / Magic UI Vector Pointer (Hotspot tip accurately at 0, 0) */}
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="origin-top-left"
        style={{
          filter: `drop-shadow(0 2px 5px ${glowColor})`,
        }}
      >
        <path
          d="M0.5 0.5L8.5 20.5L12 13L19.5 9.5L0.5 0.5Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default SmoothCursor;
