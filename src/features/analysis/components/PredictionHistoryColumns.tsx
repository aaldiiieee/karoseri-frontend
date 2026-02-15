import { Eye, Trash2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { getColumns, getActions } from "@/shared/utils/dataTable.util";
import type {
  PredictionResponse,
  PredictionActionHandlers,
} from "../types/prediction.type";

const LEVEL_BADGE: Record<string, string> = {
  ringan:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  sedang:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  berat: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export const columns = getColumns<PredictionResponse>([
  {
    key: "component",
    header: "Komponen",
    render: (item) => (
      <div>
        <p className="font-medium">{item.component?.name || "—"}</p>
        <p className="text-sm text-muted-foreground">
          {item.component?.code || "—"}
        </p>
      </div>
    ),
  },
  {
    key: "predictedLevel",
    header: "Level",
    render: (item) => (
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
          LEVEL_BADGE[item.predictedLevel?.toLowerCase()] ||
          "bg-muted text-muted-foreground"
        )}
      >
        {item.predictedLevel}
      </span>
    ),
  },
  {
    key: "confidence",
    header: "Confidence",
    render: (item) => (
      <span className="font-mono text-sm font-semibold">
        {(item.confidence * 100).toFixed(1)}%
      </span>
    ),
    hideOnMobile: true,
  },
  {
    key: "createdAt",
    header: "Tanggal",
    render: (item) => (
      <span className="text-sm text-muted-foreground">
        {new Date(item.createdAt).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </span>
    ),
    hideOnMobile: true,
  },
]);

export const actions = ({ onView, onDelete }: PredictionActionHandlers) =>
  getActions<PredictionResponse>([
    {
      label: "View",
      icon: <Eye className="h-4 w-4" />,
      onClick: onView,
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onDelete,
      variant: "destructive",
    },
  ]);
