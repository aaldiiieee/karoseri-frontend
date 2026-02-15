import { cn } from "@/shared/lib/utils";
import type { DamageDistribution } from "../types/dashboard.type";

interface DamageDistributionChartProps {
  data: DamageDistribution;
}

const LEVELS = [
  {
    key: "ringan" as const,
    label: "Ringan",
    gradient: "from-emerald-400 to-emerald-500",
    bg: "bg-emerald-100 dark:bg-emerald-900/30",
    text: "text-emerald-700 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    key: "sedang" as const,
    label: "Sedang",
    gradient: "from-amber-400 to-amber-500",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  {
    key: "berat" as const,
    label: "Berat",
    gradient: "from-rose-400 to-rose-500",
    bg: "bg-rose-100 dark:bg-rose-900/30",
    text: "text-rose-700 dark:text-rose-400",
    dot: "bg-rose-500",
  },
];

export const DamageDistributionChart = ({
  data,
}: DamageDistributionChartProps) => {
  const maxValue = Math.max(data.ringan, data.sedang, data.berat, 1);

  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Distribusi Kerusakan
          </h3>
          <p className="text-sm text-muted-foreground">
            Total {data.total} data kerusakan tercatat
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {LEVELS.map((level) => {
          const value = data[level.key];
          const percentage =
            data.total > 0 ? ((value / data.total) * 100).toFixed(1) : "0";
          const barWidth =
            maxValue > 0 ? ((value / maxValue) * 100).toFixed(1) : "0";

          return (
            <div key={level.key} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span
                    className={cn("h-2.5 w-2.5 rounded-full", level.dot)}
                  />
                  <span className="font-medium text-foreground">
                    {level.label}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      level.bg,
                      level.text
                    )}
                  >
                    {percentage}%
                  </span>
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {value}
                  </span>
                </div>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
                    level.gradient
                  )}
                  style={{ width: `${barWidth}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
