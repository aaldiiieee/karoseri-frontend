import { type LucideIcon } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: {
    container:
      "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
    icon: "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300",
  },
  primary: {
    container: "bg-gradient-to-br from-blue-500 to-blue-600 border-blue-400",
    icon: "bg-white/20 text-white",
  },
  success: {
    container:
      "bg-gradient-to-br from-emerald-500 to-emerald-600 border-emerald-400",
    icon: "bg-white/20 text-white",
  },
  warning: {
    container: "bg-gradient-to-br from-amber-500 to-amber-600 border-amber-400",
    icon: "bg-white/20 text-white",
  },
  danger: {
    container: "bg-gradient-to-br from-rose-500 to-rose-600 border-rose-400",
    icon: "bg-white/20 text-white",
  },
};

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatsCardProps) => {
  const styles = variantStyles[variant];
  const isColored = variant !== "default";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border p-6 shadow-sm transition-all duration-300 hover:shadow-md",
        styles.container
      )}
    >
      {isColored && (
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10" />
      )}

      <div className="relative flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              "text-sm font-medium",
              isColored ? "text-white/80" : "text-slate-500 dark:text-slate-400"
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "text-3xl font-bold tracking-tight",
              isColored ? "text-white" : "text-slate-900 dark:text-white"
            )}
          >
            {value}
          </p>
          {subtitle && (
            <p
              className={cn(
                "text-sm",
                isColored
                  ? "text-white/70"
                  : "text-slate-500 dark:text-slate-400"
              )}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <div
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                trend.isPositive
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  : "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
              )}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </div>
          )}
        </div>

        <div className={cn("rounded-xl p-3", styles.icon)}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};
