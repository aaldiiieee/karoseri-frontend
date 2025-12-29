import { Pencil, Trash2 } from "lucide-react";
import type { Column } from "@/shared/types/dataTable.type";
import type {
  ActionHandlers,
  Component,
} from "../types/karoseriComponent.type";
import { getColumns, getActions } from "@/shared/utils/dataTable.util";

export const columns: Column<Component>[] = getColumns([
  {
    key: "code",
    header: "Kode",
    render: (item) => <span>{item.componentCode}</span>,
    hideOnMobile: false, // optional
  },
  {
    key: "componentName",
    header: "Nama",
    render: (item) => <span>{item.componentName}</span>,
    hideOnMobile: true, // hide on mobile, show in grid
  },
  {
    key: "category",
    header: "Kategori",
    render: (item) => <span>{item.category}</span>,
    hideOnMobile: true, // hide on mobile, show in grid
  },
]);

export const actions = ({ onEdit, onDelete }: ActionHandlers) =>
  getActions<Component>([
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
