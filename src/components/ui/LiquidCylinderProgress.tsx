"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "motion/react";
import { Flame, RotateCcw } from "lucide-react";

interface LiquidCylinderProgressProps {
  percentage?: number;
  height?: number;
  className?: string;
  showCounter?: boolean;
  subtitle?: string;
  autoPlay?: boolean;
  onComplete?: () => void;
}

export const LiquidCylinderProgress: React.FC<LiquidCylinderProgressProps> = ({
  percentage = 85,
  height = 18,
  className = "",
  showCounter = true,
  subtitle = "Complete your profile to get noticed by recruiters — add 2 more projects to reach 95%",
  autoPlay = true,
  onComplete,
}) => {
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFilling, setIsFilling] = useState(false);
  const animationRef = useRef<number | null>(null);

  const startFillAnimation = () => {
    setIsFilling(true);
    setIsCompleted(false);
    setCurrentProgress(0);

    const startTime = performance.now();
    const duration = 4200; // 4.2s smooth fill (+2s)

    const animateFill = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);

      // Smooth cubic fluid ease
      const eased =
        progressRatio < 0.5
          ? 4 * progressRatio * progressRatio * progressRatio
          : 1 - Math.pow(-2 * progressRatio + 2, 3) / 2;

      const newPercent = Math.round(eased * percentage);
      setCurrentProgress(newPercent);

      if (progressRatio < 1) {
        animationRef.current = requestAnimationFrame(animateFill);
      } else {
        setCurrentProgress(percentage);
        setIsFilling(false);
        setIsCompleted(true);
        if (onComplete) onComplete();
      }
    };

    animationRef.current = requestAnimationFrame(animateFill);
  };

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        startFillAnimation();
      }, 200);
      return () => {
        clearTimeout(timer);
        if (animationRef.current) cancelAnimationFrame(animationRef.current);
      };
    }
  }, [percentage, autoPlay]);

  return (
    <div className={`w-full ${className}`}>
      {/* Header: Label & Live Number Counter */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <span
            className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 flex items-center gap-1.5"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <Flame size={15} className="text-orange-500 animate-pulse" />
            Profile Completion
          </span>
          {isCompleted && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30 flex items-center gap-1 animate-pulse">
              <span>✨</span>
              <span>Level: Advanced</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showCounter && (
            <div className="flex items-baseline gap-1">
              <span
                className="text-lg font-black transition-all"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "#EA580C",
                  textShadow: currentProgress >= percentage ? "0 0 14px rgba(249,115,22,0.5)" : "none",
                }}
              >
                {currentProgress}%
              </span>
              <span className="text-xs font-semibold text-slate-400">/ 100%</span>
            </div>
          )}

          {/* Replay button */}
          <button
            onClick={startFillAnimation}
            title="Replay Progress Fill"
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-400 hover:text-orange-500"
          >
            <RotateCcw size={13} className={isFilling ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* Clean Cylindrical Track (No Glassmorphism) */}
      <div className="relative w-full select-none pt-4 pb-2">
        {/* Simple Solid Pill Track Background */}
        <div
          className="relative w-full rounded-full overflow-visible"
          style={{
            height: `${height}px`,
            background: "var(--border-subtle)",
          }}
        >
          {/* Simple Solid Vibrant Orange Fill */}
          <div
            className="h-full rounded-full transition-all ease-out"
            style={{
              width: `${currentProgress}%`,
              background: "linear-gradient(90deg, #EA580C 0%, #F97316 70%, #FB923C 100%)",
              boxShadow: "0 2px 10px rgba(249, 115, 22, 0.4)",
            }}
          />

          {/* --- FIRESTICK (SPARKLER) SPARKLING IN THE FRONT --- */}
          {currentProgress > 0 && (
            <div
              className="absolute top-1/2 pointer-events-none z-30 transition-all ease-out"
              style={{
                left: `${currentProgress}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              {/* Sparkler Stick Assembly */}
              <div className="relative flex items-center justify-center">
                {/* 1. The Angled Firestick Rod */}
                <div
                  className="absolute bottom-[-6px] left-[-3px] w-1 h-8 rounded-sm shadow-md pointer-events-none"
                  style={{
                    background: "linear-gradient(180deg, #FDE047 0%, #B45309 30%, #78350F 70%, #451A03 100%)",
                    transform: "rotate(32deg)",
                    transformOrigin: "top center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                  }}
                />

                {/* 2. White-Hot Incandescent Sparkler Burning Head */}
                <div
                  className="relative w-4 h-4 rounded-full flex items-center justify-center z-10"
                  style={{
                    background: "radial-gradient(circle, #FFFFFF 0%, #FEF08A 40%, #F97316 80%, transparent 100%)",
                    boxShadow: "0 0 16px #FFFBEB, 0 0 28px #FBBF24, 0 0 40px #EA580C",
                  }}
                >
                  {/* Central Bright Hotspot */}
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
                </div>

                {/* 3. Crackling Sparkler Starburst Rays (Firestick Sparks Shooting Out) */}
                <motion.div
                  animate={{
                    scale: [0.9, 1.4, 0.85, 1.3, 0.95],
                    rotate: [0, 45, 90, 135, 180],
                    opacity: [0.9, 1, 0.8, 1, 0.9],
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute text-yellow-200 drop-shadow-[0_0_12px_#FDE047] pointer-events-none"
                >
                  <SparklerSpikes size={32} />
                </motion.div>

                {/* Secondary Counter-Rotating Spark Burst */}
                <motion.div
                  animate={{
                    scale: [1.2, 0.8, 1.35, 0.9, 1.2],
                    rotate: [180, 135, 90, 45, 0],
                    opacity: [0.7, 1, 0.6, 1, 0.7],
                  }}
                  transition={{
                    duration: 0.4,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute text-amber-300 drop-shadow-[0_0_14px_#F59E0B] pointer-events-none"
                >
                  <SparklerSpikes size={26} />
                </motion.div>

                {/* 4. Crackling Flying Spark Particles (Shooting Out in All Directions) */}

                {/* Spark Particle 1: Shooting Up-Right */}
                <motion.div
                  animate={{
                    x: [0, 14, 22],
                    y: [0, -14, -20],
                    scale: [1.2, 0.8, 0],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#FEF08A]"
                />

                {/* Spark Particle 2: Shooting Forward-Right */}
                <motion.div
                  animate={{
                    x: [0, 18, 28],
                    y: [0, 2, 4],
                    scale: [1.3, 0.9, 0],
                    opacity: [1, 0.9, 0],
                  }}
                  transition={{
                    duration: 0.55,
                    delay: 0.15,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200 shadow-[0_0_10px_#FBBF24]"
                />

                {/* Spark Particle 3: Shooting Down-Right */}
                <motion.div
                  animate={{
                    x: [0, 12, 20],
                    y: [0, 12, 18],
                    scale: [1.1, 0.7, 0],
                    opacity: [1, 0.8, 0],
                  }}
                  transition={{
                    duration: 0.7,
                    delay: 0.3,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_#F97316]"
                />

                {/* Spark Particle 4: Shooting Top-Left */}
                <motion.div
                  animate={{
                    x: [0, -10, -16],
                    y: [0, -12, -18],
                    scale: [1, 0.6, 0],
                    opacity: [1, 0.7, 0],
                  }}
                  transition={{
                    duration: 0.65,
                    delay: 0.2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute w-1 h-1 rounded-full bg-yellow-100 shadow-[0_0_6px_#FFFBEB]"
                />

                {/* Spark Particle 5: Shooting Down-Left */}
                <motion.div
                  animate={{
                    x: [0, -8, -14],
                    y: [0, 10, 15],
                    scale: [1, 0.5, 0],
                    opacity: [1, 0.6, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  className="absolute w-1 h-1 rounded-full bg-orange-300 shadow-[0_0_6px_#EA580C]"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Subtitle note */}
      {subtitle && (
        <p className="text-xs sm:text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

/* Multi-Ray Sparkler Starburst SVG */
const SparklerSpikes = ({ size = 28 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 36 36"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* 8-Point Diamond Star Sparkler Rays */}
    <path d="M18 0L20.2 14.8L36 18L20.2 21.2L18 36L15.8 21.2L0 18L15.8 14.8L18 0Z" />
    <path
      d="M18 6L19.5 16.5L30 18L19.5 19.5L18 30L16.5 19.5L6 18L16.5 16.5L18 6Z"
      opacity="0.6"
      transform="rotate(45 18 18)"
    />
  </svg>
);

export default LiquidCylinderProgress;
