import { Pencil, Trash2 } from "lucide-react";
import { getColumns, getActions } from "@/shared/utils/dataTable.util";
import { cn } from "@/shared/lib/utils";
import type {
  DamageRecord,
  DamageLevel,
  ActionHandlers,
} from "../types/damageRecord.type";

const DAMAGE_BADGE: Record<DamageLevel, string> = {
  ringan:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  sedang:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  berat: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400",
};

export const columns = getColumns<DamageRecord>([
  {
    key: "component",
    header: "Component",
    render: (item) => (
      <div>
        <p className="font-medium">{item.component?.name}</p>
        <p className="text-sm text-muted-foreground">{item.component?.code}</p>
      </div>
    ),
  },
  {
    key: "damageArea",
    header: "Area (cm²)",
    render: (item) => (
      <span className="font-mono text-sm">{item.damageArea}</span>
    ),
    hideOnMobile: true,
  },
  {
    key: "damageDepth",
    header: "Depth (mm)",
    render: (item) => (
      <span className="font-mono text-sm">{item.damageDepth}</span>
    ),
    hideOnMobile: true,
  },
  {
    key: "damagePointCount",
    header: "Points",
    render: (item) => (
      <span className="font-mono text-sm">{item.damagePointCount}</span>
    ),
    hideOnMobile: true,
  },
  {
    key: "componentAge",
    header: "Age (mo)",
    render: (item) => (
      <span className="font-mono text-sm">{item.componentAge}</span>
    ),
    hideOnMobile: true,
  },
  {
    key: "damageLevel",
    header: "Level",
    render: (item) => (
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-medium",
          DAMAGE_BADGE[item.damageLevel]
        )}
      >
        {item.damageLevel}
      </span>
    ),
  },
]);

export const actions = ({ onEdit, onDelete }: ActionHandlers) =>
  getActions<DamageRecord>([
    {
      label: "Edit",
      icon: <Pencil className="h-4 w-4" />,
      onClick: onEdit,
      variant: "default",
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onDelete,
      variant: "destructive",
    },
  ]);
