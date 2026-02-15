import { Pencil, Trash2 } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { getColumns, getActions } from "@/shared/utils/dataTable.util";
import type { User, UserActionHandlers } from "../types/user.type";

const ROLE_BADGE: Record<string, string> = {
  admin:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  user: "bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400",
};

const STATUS_BADGE: Record<string, string> = {
  active:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  inactive:
    "bg-gray-100 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400",
};

export const columns = getColumns<User>([
  {
    key: "username",
    header: "Username",
    render: (item) => (
      <span className="font-medium text-foreground">{item.username}</span>
    ),
  },
  {
    key: "role",
    header: "Role",
    render: (item) => (
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-medium capitalize",
          ROLE_BADGE[item.role] || "bg-muted text-muted-foreground"
        )}
      >
        {item.role}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (item) => (
      <span
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-medium",
          item.isActive ? STATUS_BADGE.active : STATUS_BADGE.inactive
        )}
      >
        {item.isActive ? "Active" : "Inactive"}
      </span>
    ),
    hideOnMobile: true,
  },
  {
    key: "createdAt",
    header: "Bergabung",
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

export const actions = ({ onEdit, onDelete }: UserActionHandlers) =>
  getActions<User>([
    {
      label: "Edit",
      icon: <Pencil className="h-4 w-4" />,
      onClick: onEdit,
    },
    {
      label: "Delete",
      icon: <Trash2 className="h-4 w-4" />,
      onClick: onDelete,
      variant: "destructive",
    },
  ]);
