import * as React from "react";
import { FluidBlobs } from "@/components/ui/FluidBlobs";
import { GlowEffect } from "@/components/ui/glow-effect";
import { cn } from "@/lib/utils";

export interface BlobCardProps {
  header?: React.ReactNode;
  children?: React.ReactNode;
  headerHeight?: number;
  lightColors?: string[];
  darkColors?: string[];
  glowColors?: string[];
  className?: string;
  cardClassName?: string;
}

const DEFAULT_LIGHT = ["#bae6fd", "#99f6e4", "#a7f3d0", "#c7d2fe"];
const DEFAULT_DARK = ["#8c0f60", "#e8227a", "#e8227a", "#ff85b3"];
const DEFAULT_GLOW = ["#7dd3fc", "#5eead4", "#a5f3fc", "#6ee7b7", "#7dd3fc"];

export function BlobCard({
  header,
  children,
  headerHeight = 224,
  lightColors = DEFAULT_LIGHT,
  darkColors = DEFAULT_DARK,
  glowColors = DEFAULT_GLOW,
  className,
  cardClassName,
}: BlobCardProps) {
  return (
    <div className={cn("relative w-full group transition-all duration-300 hover:-translate-y-1.5", className)}>
      {/* Outer ambient glow halo */}
      <div className="absolute -inset-[2px] rounded-[22px] overflow-hidden z-0 opacity-40 dark:opacity-70 group-hover:opacity-100 transition-opacity">
        <GlowEffect
          colors={glowColors}
          mode="rotate"
          blur="strongest"
          duration={6}
          scale={1.05}
        />
      </div>

      {/* Main card body - White with dark borders in Light Mode, Obsidian in Dark Mode */}
      <div
        className={cn(
          "relative z-10 rounded-[20px] overflow-hidden transition-all duration-300 flex flex-col h-full",
          "bg-white dark:bg-[#0F1520] backdrop-blur-2xl text-slate-900 dark:text-white",
          "border-2 border-slate-900 dark:border dark:border-white/10",
          "shadow-[0_20px_45px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)_inset]",
          cardClassName
        )}
      >
        <div
          className="relative overflow-hidden rounded-t-[20px] shrink-0"
          style={{ height: headerHeight }}
        >
          <FluidBlobs
            lightColors={lightColors}
            darkColors={darkColors}
            origins={[
              { x: 50, y: -55 },
              { x: 25, y: -25 },
              { x: 75, y: -25 },
              { x: 50, y: 0 },
            ]}
            margin={60}
            blur={45}
          />
          <div
            className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/50 to-white dark:via-[#0F1520]/40 dark:to-[#0F1520]"
          />
          {header && <div className="relative z-10 p-7 pb-0">{header}</div>}
        </div>

        {children && <div className="p-7 pt-3 flex-1 flex flex-col">{children}</div>}
      </div>
    </div>
  );
}

export default BlobCard;
