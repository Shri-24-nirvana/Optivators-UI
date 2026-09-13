import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface FluidBlobsProps {
  lightColors?: string[];
  darkColors?: string[];
  origins?: Array<{ x: number; y: number }>;
  margin?: number;
  blur?: number;
  className?: string;
}

export function FluidBlobs({
  lightColors = ["#0D9488", "#2DD4BF", "#2563EB", "#7C3AED"],
  darkColors = ["#0f766e", "#14b8a6", "#1d4ed8", "#6d28d9"],
  origins = [
    { x: 50, y: -55 },
    { x: 50, y: -25 },
    { x: 30, y: -20 },
    { x: 70, y: -20 },
  ],
  blur = 40,
  className,
}: FluidBlobsProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div
        className="w-full h-full relative"
        style={{ filter: `blur(${blur}px)` }}
      >
        {origins.map((origin, index) => {
          const color = lightColors[index % lightColors.length];
          const darkColor = darkColors[index % darkColors.length];

          return (
            <motion.div
              key={index}
              className="absolute rounded-full transform-gpu will-change-transform"
              style={{
                width: "160px",
                height: "160px",
                left: `${origin.x}%`,
                top: `${origin.y}%`,
                background: `radial-gradient(circle, ${color} 0%, ${darkColor} 100%)`,
                opacity: 0.85,
              }}
              animate={{
                x: [0, index % 2 === 0 ? 30 : -30, index % 3 === 0 ? -20 : 20, 0],
                y: [0, index % 2 === 0 ? 25 : -25, index % 3 === 0 ? -15 : 15, 0],
                scale: [1, 1.25, 0.9, 1],
              }}
              transition={{
                duration: 6 + index * 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default FluidBlobs;
