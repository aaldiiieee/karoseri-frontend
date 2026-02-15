import { cn } from "@/shared/lib/utils";
import { Brain, CheckCircle2, XCircle } from "lucide-react";

interface ModelStatusBadgeProps {
  isTrained: boolean;
  accuracy: number | null;
}

export const ModelStatusBadge = ({
  isTrained,
  accuracy,
}: ModelStatusBadgeProps) => {
  return (
    <div className="rounded-xl border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "rounded-xl p-3",
            isTrained
              ? "bg-emerald-100 dark:bg-emerald-900/30"
              : "bg-rose-100 dark:bg-rose-900/30"
          )}
        >
          <Brain
            className={cn(
              "h-6 w-6",
              isTrained
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-rose-600 dark:text-rose-400"
            )}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-muted-foreground">
            Model Naive Bayes
          </h3>
          <div className="mt-1 flex items-center gap-2">
            {isTrained ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  Trained
                </span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-rose-500" />
                <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                  Belum Di-Train
                </span>
              </>
            )}
          </div>
        </div>
        {isTrained && accuracy !== null && (
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {(accuracy * 100).toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">Accuracy</p>
          </div>
        )}
      </div>
    </div>
  );
};
