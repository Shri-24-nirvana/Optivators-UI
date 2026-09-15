"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedLinearProgressProps {
  label: string;
  value: number;
  color?: string;
  height?: number;
  labelWidth?: string;
  className?: string;
  delay?: number;
  duration?: number;
  animateOnScroll?: boolean;
}

export function AnimatedLinearProgress({
  label,
  value,
  color = "#2DD4BF",
  height = 10,
  labelWidth = "w-44",
  className,
  delay = 0,
  duration = 1400,
  animateOnScroll = true,
}: AnimatedLinearProgressProps) {
  const [currentValue, setCurrentValue] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!animateOnScroll) {
      setCurrentValue(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            const startTimer = setTimeout(() => {
              const target = value;
              const startTime = performance.now();

              const animate = (time: number) => {
                const elapsed = time - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Smooth cubic ease-out
                const eased = 1 - Math.pow(1 - progress, 3);
                const val = Math.round(eased * target);
                setCurrentValue(val);

                if (progress < 1) {
                  requestAnimationFrame(animate);
                } else {
                  setCurrentValue(target);
                }
              };

              requestAnimationFrame(animate);
            }, delay);

            return () => clearTimeout(startTimer);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, animateOnScroll, hasAnimated, delay, duration]);

  return (
    <div
      ref={containerRef}
      className={cn("flex items-center gap-4 group select-none", className)}
    >
      {/* Label */}
      <div
        className={cn("text-xs font-semibold shrink-0 transition-colors group-hover:text-primary", labelWidth)}
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </div>

      {/* Pill Track */}
      <div
        className="flex-1 rounded-full overflow-hidden relative dark:bg-white/10"
        style={{
          height: `${height}px`,
          background: "var(--border-subtle)",
        }}
      >
        {/* Animated Fill Bar */}
        <div
          className="h-full rounded-full transition-all ease-out relative"
          style={{
            width: `${currentValue}%`,
            background: color,
            boxShadow: `0 0 12px ${color}50`,
          }}
        >
          {/* Subtle glossy sheen highlight */}
          <div
            className="absolute inset-0 opacity-40 rounded-full"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 80%)",
            }}
          />
          {/* Glowing leading edge spark */}
          {currentValue > 0 && currentValue < 100 && (
            <div
              className="absolute right-0 top-0 bottom-0 w-2 rounded-full bg-white opacity-80"
              style={{
                boxShadow: `0 0 8px #FFFFFF, 0 0 14px ${color}`,
              }}
            />
          )}
        </div>
      </div>

      {/* Animated Live Counter Percentage */}
      <div
        className="w-11 text-xs font-bold text-right tabular-nums transition-transform duration-200 group-hover:scale-110"
        style={{
          fontFamily: "var(--font-mono)",
          color,
          textShadow: currentValue >= value ? `0 0 10px ${color}60` : "none",
        }}
      >
        {currentValue}%
      </div>
    </div>
  );
}

export default AnimatedLinearProgress;
