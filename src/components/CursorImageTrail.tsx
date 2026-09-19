import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface CursorImageTrailProps {
  items: React.ReactNode[];
  /** Size of each trail item in px. @default 120 */
  itemSize?: number;
  /** Max simultaneous items in the trail. @default 7 */
  trailLength?: number;
  /** Minimum cursor travel (px) before spawning a new item. @default 55 */
  spawnDistance?: number;
  /** Max random rotation applied to each item in degrees. @default 15 */
  rotationRange?: number;
  /** Inactivity delay in ms before cards gracefully fade away. @default 500 */
  idleDelay?: number;
  /** Render target — defaults to window */
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  children?: React.ReactNode;
}

interface TrailItem {
  id: number;
  x: number;
  y: number;
  rotation: number;
  itemIndex: number;
}

let _id = 0;
const nextId = () => ++_id;

export function CursorImageTrail({
  items,
  itemSize = 120,
  trailLength = 7,
  spawnDistance = 55,
  rotationRange = 15,
  idleDelay = 500,
  containerRef,
  className,
  children,
}: CursorImageTrailProps) {
  const [trail, setTrail] = React.useState<TrailItem[]>([]);
  const lastMousePos = React.useRef<{ x: number; y: number } | null>(null);
  const isScrolling = React.useRef(false);
  const scrollTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimeout = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemCounter = React.useRef(0);
  const containerElRef = React.useRef<HTMLDivElement>(null);

  const spawnItem = React.useCallback(
    (x: number, y: number) => {
      const rotation = (Math.random() * 2 - 1) * rotationRange;
      const itemIndex = itemCounter.current % items.length;
      itemCounter.current += 1;

      setTrail((prev) => {
        const next = [...prev, { id: nextId(), x, y, rotation, itemIndex }];
        return next.slice(-trailLength);
      });
    },
    [items.length, rotationRange, trailLength]
  );

  React.useEffect(() => {
    const onLeave = () => {
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      setTrail([]);
      lastMousePos.current = null;
    };

    const onScroll = () => {
      isScrolling.current = true;
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      setTrail([]); // Immediately disappear all cards
      lastMousePos.current = null; // Reset so movement after stopping triggers clean spawn
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        isScrolling.current = false;
      }, 150);
    };

    let moveRaf: number | null = null;
    const onMove = (e: MouseEvent) => {
      // Don't spawn while scrolling
      if (isScrolling.current) return;

      const clientX = e.clientX;
      const clientY = e.clientY;

      // Reset idle timer on every cursor move
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => {
        // User paused mouse movement -> gracefully fade away cards
        setTrail([]);
        lastMousePos.current = null;
      }, idleDelay);

      if (!moveRaf) {
        moveRaf = requestAnimationFrame(() => {
          moveRaf = null;
          const container = containerRef?.current ?? containerElRef.current;
          if (container) {
            const rect = container.getBoundingClientRect();
            // Strict boundary check: only spawn within container bounds
            if (
              clientX < rect.left ||
              clientX > rect.right ||
              clientY < rect.top ||
              clientY > rect.bottom
            ) {
              lastMousePos.current = null;
              return;
            }
          }

          if (lastMousePos.current) {
            const dx = clientX - lastMousePos.current.x;
            const dy = clientY - lastMousePos.current.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < spawnDistance) return;
          }

          lastMousePos.current = { x: clientX, y: clientY };
          spawnItem(clientX, clientY);
        });
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mouseleave", onLeave);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      if (idleTimeout.current) clearTimeout(idleTimeout.current);
      if (moveRaf) cancelAnimationFrame(moveRaf);
    };
  }, [containerRef, idleDelay, spawnDistance, spawnItem]);

  const total = trail.length;

  return (
    <div
      ref={containerElRef}
      onMouseLeave={() => {
        if (idleTimeout.current) clearTimeout(idleTimeout.current);
        setTrail([]);
        lastMousePos.current = null;
      }}
      className={cn("relative", className)}
    >
      {/* Floating Trail Cards placed behind text and interactive elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <AnimatePresence>
          {trail.map((item, i) => {
            const age = total - 1 - i;
            const progress = Math.max(0, 1 - age / trailLength);
            const scale = 0.75 + 0.25 * Math.pow(progress, 0.85);
            const trailOpacity = Math.max(0.35, Math.pow(progress, 0.65));

            return (
              <motion.div
                key={item.id}
                className="pointer-events-none fixed select-none will-change-transform"
                style={{
                  left: item.x,
                  top: item.y,
                  width: itemSize,
                  x: "-50%",
                  y: "-50%",
                  zIndex: 0,
                }}
                initial={{
                  opacity: 0,
                  scale: 0.65,
                  y: 16,
                  rotate: item.rotation * 1.3,
                  filter: "blur(6px)",
                }}
                animate={{
                  opacity: trailOpacity,
                  scale,
                  y: -age * 3.5,
                  rotate: item.rotation,
                  filter: "blur(0px)",
                }}
                exit={{
                  opacity: 0,
                  scale: scale * 0.72,
                  y: -36,
                  rotate: item.rotation * 0.75,
                  filter: "blur(10px)",
                  transition: {
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  },
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="w-full drop-shadow-2xl transition-all duration-300">
                  {items[item.itemIndex]}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Hero section / Children rendered above trail cards */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}

export default CursorImageTrail;
