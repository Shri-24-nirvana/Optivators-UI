import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type GithubGraphVariant = "github" | "graphite" | "ocean" | "violet" | "teal";
export type GithubGraphAnimation = "none" | "wave" | "scan" | "cascade";
export type GithubGraphAmbientEffect = "none" | "tide" | "drift" | "twinkle";

export type GithubContribution = {
  date: string;
  count: number;
  level?: number;
};

export type GithubContributionCell = GithubContribution & {
  level: number;
};

export type GithubContributionWeek = GithubContributionCell[];

export interface GithubGraphProps {
  /** GitHub username or institutional label. @default "shadcn" */
  account?: string;
  /** Number of recent calendar months to display. @default 12 */
  months?: number;
  /** Color treatment for contribution levels. @default "teal" */
  variant?: GithubGraphVariant;
  /** Entrance choreography for graph cells. @default "wave" */
  animation?: GithubGraphAnimation;
  /** Animation multiplier; higher values reveal faster. @default 1 */
  animationSpeed?: number;
  /** Size of each contribution cell in pixels. @default 13 */
  cellSize?: number;
  /** Space between contribution cells in pixels. @default 3 */
  cellGap?: number;
  /** Corner radius of contribution cells in pixels. @default 2 */
  cellRadius?: number;
  /** Fills the available width with a responsive grid. @default false */
  autoFit?: boolean;
  /** Shows the contribution-level legend. @default true */
  showLegend?: boolean;
  /** Shows the account / cohort name above the graph. @default false */
  showAccount?: boolean;
  /** Persistent, subtle motion pattern applied to graph cells. @default "twinkle" */
  ambientEffect?: GithubGraphAmbientEffect;
  /** Strength of the persistent cell motion. @default 0.65 */
  ambientIntensity?: number;
  /** Optional preloaded contributions data. */
  data?: GithubContribution[];
  className?: string;
}

type ResourceState =
  | { status: "loading" }
  | { status: "ready"; contributions: GithubContribution[] }
  | { status: "error"; message: string };

const CONTRIBUTIONS_ENDPOINT = "https://github-contributions-api.jogruber.de/v4";

const VARIANTS: Record<GithubGraphVariant, [string, string, string, string, string]> = {
  teal: ["var(--border-subtle)", "#99f6e4", "#2dd4bf", "#0d9488", "#0f766e"],
  github: ["var(--border-subtle)", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
  graphite: ["var(--border-subtle)", "#cccccc", "#969696", "#5f5f5f", "#171717"],
  ocean: ["var(--border-subtle)", "#b4e2ff", "#62bdf5", "#2585d8", "#124e93"],
  violet: ["var(--border-subtle)", "#dcc5ff", "#b486ff", "#8355df", "#52269c"],
};

function dateFromISO(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00.000Z`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setUTCDate(result.getUTCDate() + days);
  return result;
}

function fallbackLevel(count: number, maxCount: number): number {
  if (!Number.isFinite(count) || count <= 0 || maxCount <= 0) return 0;
  return Math.min(4, Math.max(1, Math.ceil((count / maxCount) * 4)));
}

export function normalizeGithubAccount(account: string): string | null {
  const normalized = account.trim().replace(/^@+/, "");
  return /^(?!-)[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(normalized) ? normalized : null;
}

export function buildContributionWeeks(contributions: GithubContribution[]): GithubContributionWeek[] {
  const valid = contributions
    .map((item) => ({ ...item, parsedDate: dateFromISO(item.date) }))
    .filter(
      (item): item is GithubContribution & { parsedDate: Date } =>
        item.parsedDate !== null && Number.isFinite(item.count)
    )
    .sort((a, b) => a.date.localeCompare(b.date));

  if (valid.length === 0) return [];

  const maxCount = Math.max(0, ...valid.map((item) => item.count));
  const byDate = new Map(valid.map((item) => [item.date, item]));
  const firstDate = valid[0]!.parsedDate;
  const lastDate = valid[valid.length - 1]!.parsedDate;
  const startDate = addDays(firstDate, -firstDate.getUTCDay());
  const endDate = addDays(lastDate, 6 - lastDate.getUTCDay());
  const cells: GithubContributionCell[] = [];

  for (let date = startDate; date <= endDate; date = addDays(date, 1)) {
    const key = isoDate(date);
    const contribution = byDate.get(key);
    const count = Math.max(0, contribution?.count ?? 0);
    const explicitLevel = contribution?.level;
    const level =
      Number.isInteger(explicitLevel) && explicitLevel! >= 0 && explicitLevel! <= 4
        ? count === 0
          ? 0
          : explicitLevel!
        : fallbackLevel(count, maxCount);

    cells.push({ date: key, count, level });
  }

  return Array.from({ length: Math.ceil(cells.length / 7) }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7)
  );
}

function selectRecentContributions(contributions: GithubContribution[], months: number): GithubContribution[] {
  const parsed = contributions
    .map((contribution) => ({
      contribution,
      date: dateFromISO(contribution.date),
    }))
    .filter((item): item is { contribution: GithubContribution; date: Date } => item.date !== null);
  const latest = parsed.reduce<Date | null>(
    (current, item) => (!current || item.date > current ? item.date : current),
    null
  );

  if (!latest) return [];

  const start = new Date(latest);
  start.setUTCMonth(start.getUTCMonth() - Math.max(1, Math.min(12, Math.round(months))));
  return parsed.filter((item) => item.date >= start).map((item) => item.contribution);
}

function formatContributionLabel(contribution: GithubContributionCell): string {
  const date = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dateFromISO(contribution.date) ?? new Date());
  const label = contribution.count === 1 ? "activity" : "activities / tests solved";
  return `${contribution.count} ${label} · ${date}`;
}

function getCellDelay(animation: GithubGraphAnimation, weekIndex: number, dayIndex: number, speed: number): number {
  if (animation === "none") return 0;

  const step =
    animation === "wave"
      ? weekIndex * 0.018 + dayIndex * 0.012
      : animation === "scan"
      ? weekIndex * 0.02
      : (weekIndex + dayIndex * 2) * 0.014;
  return step / Math.max(speed, 0.1);
}

function getAmbientCellMotion(
  effect: GithubGraphAmbientEffect,
  intensity: number,
  weekIndex: number,
  dayIndex: number,
  entranceDelay: number,
  reducedMotion: boolean | null
) {
  if (reducedMotion || effect === "none") {
    return {
      animate: { opacity: 1, scale: 1 },
      transition: {
        opacity: { duration: 0.14, delay: entranceDelay },
        scale: { type: "spring" as const, stiffness: 900, damping: 32 },
      },
    };
  }

  const strength = Math.min(1, Math.max(0, intensity));
  const seed = ((weekIndex * 17 + dayIndex * 31) % 11) / 10;
  const isTide = effect === "tide";
  const isDrift = effect === "drift";
  const duration = isTide ? 3.2 : isDrift ? 3.8 + seed : 2 + seed * 1.4;
  const delay = entranceDelay + (isTide ? (weekIndex + dayIndex * 1.8) * 0.055 : seed * 0.85);
  const lowOpacity = 1 - (isTide ? 0.24 : isDrift ? 0.16 : 0.34) * strength;
  const smallScale = 1 - (isTide ? 0.07 : isDrift ? 0.04 : 0.08) * strength;

  return {
    animate: {
      opacity: isDrift ? [1, lowOpacity, 1 - 0.06 * strength, 1] : [1, lowOpacity, 1],
      scale: isDrift ? [1, smallScale, 1 + 0.025 * strength, 1] : [1, smallScale, 1],
    },
    transition: {
      opacity: {
        duration,
        delay,
        ease: "easeInOut" as const,
        repeat: Infinity,
      },
      scale: { duration, delay, ease: "easeInOut" as const, repeat: Infinity },
    },
  };
}

export function GithubGraph({
  account = "campus-all",
  months = 12,
  variant = "teal",
  animation = "wave",
  animationSpeed = 1,
  cellSize = 12,
  cellGap = 3,
  cellRadius = 2,
  autoFit = false,
  showLegend = true,
  showAccount = false,
  ambientEffect = "twinkle",
  ambientIntensity = 0.5,
  data,
  className,
}: GithubGraphProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const normalizedAccount = React.useMemo(() => normalizeGithubAccount(account), [account]);
  const [resource, setResource] = React.useState<ResourceState>({
    status: data ? "ready" : "loading",
    contributions: data ?? [],
  });
  const [availableWidth, setAvailableWidth] = React.useState(0);
  const [hoveredContribution, setHoveredContribution] = React.useState<{
    contribution: GithubContributionCell;
    left: number;
    top: number;
    originLeft: number;
    originTop: number;
    placement: "above" | "below";
    weekIndex: number;
    dayIndex: number;
  } | null>(null);

  const colors = VARIANTS[variant] || VARIANTS.teal;
  const resolvedCellRadius = Math.max(0, Math.min(cellRadius, Math.max(0, cellSize) / 2));
  const autoFitColumns = Math.max(
    1,
    Math.floor((availableWidth + Math.max(0, cellGap)) / Math.max(1, cellSize + cellGap))
  );

  React.useLayoutEffect(() => {
    if (!autoFit || !rootRef.current) return;

    const root = rootRef.current;
    const updateWidth = () => setAvailableWidth(root.clientWidth);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(root);
    return () => observer.disconnect();
  }, [autoFit]);

  React.useEffect(() => {
    if (data) {
      setResource({ status: "ready", contributions: data });
      return;
    }

    if (!normalizedAccount) {
      setResource({ status: "ready", contributions: [] });
      return;
    }

    const controller = new AbortController();
    setResource({ status: "loading" });

    fetch(`${CONTRIBUTIONS_ENDPOINT}/${normalizedAccount}?y=last`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        if (!response.ok) throw new Error("GitHub account not found.");
        const payload = (await response.json()) as { contributions?: GithubContribution[] };
        if (!Array.isArray(payload.contributions)) {
          throw new Error("No public contributions were returned.");
        }
        return payload.contributions;
      })
      .then((contributions) => {
        if (!controller.signal.aborted) {
          setResource({ status: "ready", contributions });
        }
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;
        setResource({
          status: "error",
          message: error instanceof Error ? error.message : "Could not load contributions.",
        });
      });

    return () => controller.abort();
  }, [data, normalizedAccount]);

  const weeks = React.useMemo(() => {
    if (resource.status !== "ready") return [];
    return buildContributionWeeks(selectRecentContributions(resource.contributions, months));
  }, [months, resource]);

  const animationKey = `${normalizedAccount ?? account}-${months}-${variant}-${animation}-${cellSize}-${cellGap}-${autoFit}`;

  // Generate Month header labels from week dates
  const monthLabels = React.useMemo(() => {
    if (weeks.length === 0) return [];
    const labels: { text: string; weekIndex: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, index) => {
      const firstDay = week[0];
      if (firstDay) {
        const d = dateFromISO(firstDay.date);
        if (d) {
          const m = d.getUTCMonth();
          if (m !== lastMonth) {
            lastMonth = m;
            const text = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
            labels.push({ text, weekIndex: index });
          }
        }
      }
    });

    return labels;
  }, [weeks]);

  const showTooltip = React.useCallback(
    (
      element: HTMLButtonElement,
      contribution: GithubContributionCell,
      weekIndex: number,
      dayIndex: number,
      pointer?: { clientX: number; clientY: number }
    ) => {
      const cellRect = element.getBoundingClientRect();
      const placement = cellRect.top > 56 ? "above" : "below";
      const left = Math.min(Math.max(cellRect.left + cellRect.width / 2, 96), window.innerWidth - 96);
      setHoveredContribution({
        contribution,
        left,
        top: placement === "above" ? cellRect.top - 9 : cellRect.bottom + 9,
        originLeft: pointer?.clientX ?? left,
        originTop: pointer?.clientY ?? cellRect.top + cellRect.height / 2,
        placement,
        weekIndex,
        dayIndex,
      });
    },
    []
  );

  const renderContribution = (
    contribution: GithubContributionCell,
    columnIndex: number,
    rowIndex: number
  ) => {
    const label = formatContributionLabel(contribution);
    const entranceDelay = reducedMotion ? 0 : getCellDelay(animation, columnIndex, rowIndex, animationSpeed);
    const ambientMotion = getAmbientCellMotion(
      ambientEffect,
      ambientIntensity,
      columnIndex,
      rowIndex,
      entranceDelay,
      reducedMotion
    );
    const distance = hoveredContribution
      ? Math.hypot(columnIndex - hoveredContribution.weekIndex, rowIndex - hoveredContribution.dayIndex)
      : Infinity;
    const waveStrength = Math.max(0, 1 - distance / 3);
    const filter = `brightness(${1 + waveStrength * 0.45}) saturate(${1 + waveStrength * 0.2})`;

    return (
      <motion.button
        key={`${animationKey}-${contribution.date}`}
        type="button"
        role="gridcell"
        aria-label={label}
        className="relative outline-none ring-offset-2 ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-foreground/60 cursor-pointer"
        style={{
          width: cellSize,
          height: cellSize,
          borderRadius: resolvedCellRadius,
        }}
        initial={
          reducedMotion || animation === "none" ? false : { opacity: 0, scale: 0.35, y: 4 }
        }
        animate={{ opacity: 1, scale: 1, y: 0, filter }}
        transition={{
          opacity: { duration: 0.14, delay: entranceDelay },
          y: {
            type: "spring",
            stiffness: 520,
            damping: 28,
            delay: entranceDelay,
          },
          scale: { type: "spring", stiffness: 900, damping: 32 },
          filter: { duration: 0.08, ease: "easeOut" },
        }}
        onMouseEnter={(event) =>
          showTooltip(event.currentTarget, contribution, columnIndex, rowIndex, event)
        }
        onFocus={(event) =>
          showTooltip(event.currentTarget, contribution, columnIndex, rowIndex)
        }
        onBlur={() => setHoveredContribution(null)}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundColor: colors[contribution.level],
            borderRadius: resolvedCellRadius,
            border: contribution.level === 0 ? "1px solid var(--border-subtle)" : "none",
          }}
          animate={ambientMotion.animate}
          transition={ambientMotion.transition}
        />
      </motion.button>
    );
  };

  return (
    <div
      ref={rootRef}
      className={cn(autoFit ? "w-full" : "w-fit max-w-full", className)}
      aria-busy={resource.status === "loading"}
    >
      {showAccount && (
        <p className="mb-3 text-sm font-semibold tracking-tight text-slate-800 dark:text-slate-200">
          @{normalizedAccount ?? account}
        </p>
      )}

      {resource.status === "ready" && weeks.length > 0 && (
        <div
          className={cn(
            "py-1 overflow-x-auto [scrollbar-width:thin]",
            autoFit ? "w-full overflow-hidden" : ""
          )}
        >
          {/* Month Header row */}
          <div className="flex gap-[3px] mb-1.5 min-w-max relative h-4 text-[10px] text-slate-400 font-mono">
            {monthLabels.map((m, idx) => (
              <span
                key={`${m.text}-${idx}`}
                className="absolute"
                style={{ left: m.weekIndex * (cellSize + cellGap) }}
              >
                {m.text}
              </span>
            ))}
          </div>

          <div
            className={cn("relative", autoFit ? "grid w-full" : "flex min-w-max")}
            style={
              autoFit
                ? {
                    gridTemplateColumns: `repeat(${autoFitColumns}, ${cellSize}px)`,
                    gap: cellGap,
                    justifyContent: "space-between",
                  }
                : { gap: cellGap }
            }
            role="grid"
            aria-label={`Campus activity heatmap`}
            onMouseLeave={() => setHoveredContribution(null)}
          >
            {autoFit
              ? weeks
                  .flat()
                  .map((contribution, index) =>
                    renderContribution(
                      contribution,
                      index % autoFitColumns,
                      Math.floor(index / autoFitColumns)
                    )
                  )
              : weeks.map((week, weekIndex) => (
                  <div
                    key={`${animationKey}-${weekIndex}`}
                    className="grid grid-rows-7"
                    style={{ gap: cellGap }}
                    role="row"
                  >
                    {week.map((contribution, dayIndex) =>
                      renderContribution(contribution, weekIndex, dayIndex)
                    )}
                  </div>
                ))}

            <AnimatePresence>
              {hoveredContribution && (
                <motion.span
                  role="tooltip"
                  className="pointer-events-none fixed z-50 whitespace-nowrap rounded-xl bg-slate-900/95 text-white px-3 py-1.5 text-xs font-semibold shadow-2xl backdrop-blur-md ring-1 ring-white/20 dark:bg-black/95 dark:text-white"
                  initial={{
                    opacity: 0,
                    scale: 0.92,
                    left: hoveredContribution.originLeft,
                    top: hoveredContribution.originTop,
                    x: "-50%",
                    y: hoveredContribution.placement === "above" ? "-100%" : "0%",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    left: hoveredContribution.left,
                    top: hoveredContribution.top,
                    x: "-50%",
                    y: hoveredContribution.placement === "above" ? "-100%" : "0%",
                  }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    opacity: { duration: 0.12 },
                    scale: { duration: 0.12 },
                    left: { type: "spring", stiffness: 620, damping: 42 },
                    top: { type: "spring", stiffness: 620, damping: 42 },
                    y: { duration: 0.12 },
                  }}
                >
                  {formatContributionLabel(hoveredContribution.contribution)}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {showLegend && resource.status === "ready" && (
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px] font-medium">52 Weeks of Institutional Assessment & Practice Activity</span>
          <div className="flex items-center gap-1.5" aria-label="Activity legend">
            <span className="text-[10px]">Less</span>
            {colors.map((color, level) => (
              <span
                key={color}
                style={{
                  width: cellSize,
                  height: cellSize,
                  backgroundColor: color,
                  borderRadius: resolvedCellRadius,
                  border: level === 0 ? "1px solid var(--border-subtle)" : "none",
                }}
                aria-label={`Level ${level}`}
              />
            ))}
            <span className="text-[10px]">More</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default GithubGraph;
