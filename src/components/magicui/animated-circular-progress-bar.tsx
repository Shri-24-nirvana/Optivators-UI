"use client";

import React, { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedCircularProgressBarProps {
  max?: number;
  value?: number;
  min?: number;
  gaugePrimaryColor: string;
  gaugeSecondaryColor?: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
  animateOnScroll?: boolean;
}

export function AnimatedCircularProgressBar({
  max = 100,
  min = 0,
  value = 0,
  gaugePrimaryColor,
  gaugeSecondaryColor = "rgba(0, 0, 0, 0.08)",
  className,
  size = 72,
  strokeWidth = 7,
  animateOnScroll = true,
}: AnimatedCircularProgressBarProps) {
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
            // Smooth count up animation
            let start = 0;
            const target = value;
            const duration = 1400; // 1.4s animation
            const startTime = performance.now();

            const animate = (time: number) => {
              const elapsed = time - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease-out cubic
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
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [value, animateOnScroll, hasAnimated]);

  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentChange = (currentValue - min) / (max - min);
  const strokeDashoffset = circumference - percentChange * circumference;

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center select-none", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="rotate-[-90deg] transform"
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugeSecondaryColor}
          strokeWidth={strokeWidth}
          className="opacity-70 dark:opacity-30"
        />
        {/* Animated progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={gaugePrimaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-300 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${gaugePrimaryColor}40)`,
          }}
        />
      </svg>
      {/* Central percentage display */}
      <span
        className="absolute inset-0 flex items-center justify-center font-bold"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: size < 60 ? "11px" : size < 80 ? "13px" : "16px",
          color: gaugePrimaryColor,
        }}
      >
        {currentValue}%
      </span>
    </div>
  );
}

export default AnimatedCircularProgressBar;
