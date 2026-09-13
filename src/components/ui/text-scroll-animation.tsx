"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0, 0.6], [distanceFromCenter * 36, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.6], [distanceFromCenter * 25, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0.15, 1]);

  return (
    <motion.span
      className={cn(
        "inline-block font-extrabold tracking-tight transition-colors duration-200",
        isSpace ? "w-3 sm:w-5" : ""
      )}
      style={{
        x,
        rotateX,
        opacity,
        color: "var(--text-primary)",
      }}
    >
      {char}
    </motion.span>
  );
};

type TechBadgeProps = {
  name: string;
  icon: string;
  index: number;
  centerIndex: number;
  scrollYProgress: MotionValue<number>;
  color: string;
};

const TechStackBadge = ({
  name,
  icon,
  index,
  centerIndex,
  scrollYProgress,
  color,
}: TechBadgeProps) => {
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(scrollYProgress, [0.15, 0.75], [distanceFromCenter * 45, 0]);
  const y = useTransform(scrollYProgress, [0.15, 0.75], [Math.abs(distanceFromCenter) * 20, 0]);
  const scale = useTransform(scrollYProgress, [0.15, 0.75], [0.75, 1]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.5], [0, 1]);
  const rotate = useTransform(scrollYProgress, [0.15, 0.75], [distanceFromCenter * 12, 0]);

  return (
    <motion.div
      className="group relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-md hover:shadow-xl cursor-default"
      style={{
        x,
        y,
        scale,
        opacity,
        rotate,
        background: "var(--surface-elevated)",
        borderColor: "var(--border-subtle)",
        boxShadow: `0 8px 24px -6px ${color}20`,
      }}
    >
      <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center mb-2">
        <img
          src={icon}
          alt={name}
          loading="lazy"
          className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
        />
      </div>
      <span
        className="text-[11px] sm:text-xs font-bold tracking-tight"
        style={{ color: "var(--text-primary)", fontFamily: "var(--font-mono)" }}
      >
        {name}
      </span>
      <span className="text-[9px] font-medium" style={{ color: "var(--text-muted)" }}>
        Supported
      </span>
    </motion.div>
  );
};

const Bracket = ({ className }: { className?: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 27 78" className={className}>
      <path
        fill="currentColor"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      />
    </svg>
  );
};

const TECH_ITEMS = [
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", color: "#38BDF8" },
  { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", color: "#EF4444" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", color: "#06B6D4" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", color: "#3B82F6" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", color: "#8B5CF6" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", color: "#336791" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", color: "#0284C7" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", color: "#22C55E" },
];

export const TechScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const titleText = "CONNECTED ECOSYSTEM";
  const characters = titleText.split("");
  const centerIndex = Math.floor(characters.length / 2);
  const iconCenterIndex = Math.floor(TECH_ITEMS.length / 2);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 sm:px-8 relative overflow-hidden border-t"
      style={{
        background: "var(--surface-bg)",
        borderColor: "var(--border-subtle)",
      }}
    >
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #0D9488 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Eyebrow badge */}
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{
              background: "var(--accent-soft)",
              color: "var(--accent-primary)",
              border: "1px solid rgba(13,148,136,0.2)",
              fontFamily: "var(--font-mono)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--accent-primary)" }} />
            DEVELOPER & CAMPUS INTEGRATIONS
          </div>
        </div>

        {/* Dynamic Kinetic Title */}
        <div
          className="text-center text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4"
          style={{ perspective: "700px" }}
        >
          {characters.map((char, index) => (
            <CharacterV1
              key={index}
              char={char}
              index={index}
              centerIndex={centerIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Subtitle with decorative brackets */}
        <div className="flex items-center justify-center gap-3 text-base sm:text-lg font-semibold mb-12 text-center" style={{ color: "var(--text-secondary)" }}>
          <Bracket className="h-8 sm:h-10 shrink-0 text-teal-600 dark:text-teal-400" />
          <span>Integrate assessments with your favorite tech & recruiter stack</span>
          <Bracket className="h-8 sm:h-10 scale-x-[-1] shrink-0 text-teal-600 dark:text-teal-400" />
        </div>

        {/* Converging Tech Badges */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4 max-w-5xl mx-auto"
          style={{ perspective: "800px" }}
        >
          {TECH_ITEMS.map((item, index) => (
            <TechStackBadge
              key={item.name}
              name={item.name}
              icon={item.icon}
              color={item.color}
              index={index}
              centerIndex={iconCenterIndex}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Supporting note */}
        <p className="text-center text-xs mt-8" style={{ color: "var(--text-muted)" }}>
          Automatic code compilation in 12+ languages · Live GitHub commit verification · ATS resume sync
        </p>
      </div>
    </section>
  );
};

export default TechScrollAnimation;
