import React, { createContext, useContext, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  AnimatePresence,
} from "motion/react";
import { cn } from "@/lib/utils";

interface DockContextType {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
}

const DockContext = createContext<DockContextType | null>(null);

function useDockContext() {
  const context = useContext(DockContext);
  if (!context) {
    throw new Error("DockItem must be used within a Dock component");
  }
  return context;
}

const DockItemContext = createContext<{ isHovered: boolean }>({
  isHovered: false,
});

export interface DockProps {
  className?: string;
  magnification?: number;
  distance?: number;
  direction?: "top" | "middle" | "bottom";
  children: React.ReactNode;
}

export function Dock({
  className,
  magnification = 84,
  distance = 150,
  direction = "bottom",
  children,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <DockContext.Provider value={{ mouseX, magnification, distance }}>
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={cn(
          "mx-auto flex h-[92px] items-center gap-4 rounded-[32px] border p-3 backdrop-blur-2xl shadow-2xl transition-colors",
          "bg-white/85 border-slate-200/90 shadow-slate-900/10 dark:bg-neutral-900/85 dark:border-white/15 dark:shadow-black/40",
          direction === "bottom" && "items-end pb-3",
          direction === "middle" && "items-center",
          direction === "top" && "items-start pt-3",
          className
        )}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export interface DockItemProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  style?: React.CSSProperties;
}

export function DockItem({ className, children, onClick, active, style }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { mouseX, magnification, distance } = useDockContext();
  const [isHovered, setIsHovered] = useState(false);

  const distanceCalc = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [58, magnification, 58]
  );

  const width = useSpring(widthSync, {
    mass: 0.08,
    stiffness: 280,
    damping: 18,
  });

  return (
    <motion.div
      ref={ref}
      style={{ ...style, width, height: width }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex aspect-square cursor-pointer items-center justify-center rounded-2xl transition-colors select-none",
        active && "ring-2 ring-teal-500 ring-offset-2 ring-offset-transparent",
        className
      )}
    >
      <DockItemContext.Provider value={{ isHovered }}>
        {children}
      </DockItemContext.Provider>
      {active && (
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-teal-500 shadow-sm" />
      )}
    </motion.div>
  );
}

export interface DockLabelProps {
  className?: string;
  children: React.ReactNode;
}

export function DockLabel({ className, children }: DockLabelProps) {
  const { isHovered } = useContext(DockItemContext);

  return (
    <AnimatePresence>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.85 }}
          animate={{ opacity: 1, y: -8, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className={cn(
            "absolute -top-7 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-xl border pointer-events-none",
            "bg-slate-900 text-white border-slate-700/80 dark:bg-white dark:text-slate-950 dark:border-white/20",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export interface DockIconProps {
  className?: string;
  children: React.ReactNode;
}

export function DockIcon({ className, children }: DockIconProps) {
  return (
    <div className={cn("flex items-center justify-center w-full h-full p-2.5", className)}>
      {children}
    </div>
  );
}

export default Dock;
