import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface GlowEffectProps {
  colors?: string[];
  mode?: "rotate" | "pulse" | "breathe" | "static";
  blur?: "soft" | "medium" | "strong" | "strongest";
  duration?: number;
  scale?: number;
  className?: string;
}

export function GlowEffect({
  colors = ["#0D9488", "#2DD4BF", "#2563EB", "#7C3AED", "#0D9488"],
  mode = "rotate",
  blur = "strongest",
  duration = 5,
  scale = 1,
  className,
}: GlowEffectProps) {
  const blurMap = {
    soft: "blur-md",
    medium: "blur-xl",
    strong: "blur-2xl",
    strongest: "blur-3xl",
  };

  const gradientString = `conic-gradient(from 0deg, ${colors.join(", ")})`;

  return (
    <div className={cn("relative w-full h-full overflow-hidden pointer-events-none", className)}>
      <motion.div
        className={cn("absolute -inset-[100%] m-auto rounded-full opacity-70 transform-gpu will-change-transform", blurMap[blur])}
        style={{
          background: gradientString,
          scale,
        }}
        animate={
          mode === "rotate"
            ? { rotate: 360 }
            : mode === "pulse"
            ? { scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }
            : {}
        }
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

export default GlowEffect;
