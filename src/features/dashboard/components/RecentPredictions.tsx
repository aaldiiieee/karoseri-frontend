import { cn } from "@/shared/lib/utils";
import { Activity, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
import type { DashboardStats } from "../types/dashboard.type";

interface RecentPredictionsProps {
  predictions: DashboardStats["recent_predictions"];
}

const LEVEL_BADGE: Record<string, string> = {
  ringan:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  sedang:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  berat: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export const RecentPredictions = ({ predictions }: RecentPredictionsProps) => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">
            Prediksi Terbaru
          </h3>
        </div>
        <button
          onClick={() => navigate("/analysis/history")}
          className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
        >
          Lihat Semua
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="divide-y">
        {predictions.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-muted-foreground">
            Belum ada prediksi yang dibuat.
          </div>
        ) : (
          predictions.map((prediction) => (
            <div
              key={prediction.id}
              className="flex items-center justify-between px-6 py-4 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-foreground">
                  {prediction.component?.name || "Unknown Component"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {prediction.component?.code || "—"}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-semibold text-foreground">
                    {(prediction.confidence * 100).toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">Confidence</p>
                </div>

                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold capitalize",
                    LEVEL_BADGE[prediction.predicted_level?.toLowerCase()] ||
                    "bg-muted text-muted-foreground"
                  )}
                >
                  {prediction.predicted_level}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
