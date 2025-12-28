import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { DataTableProps } from "../types/dataTable.types";

export function DataTable<T>({
  data,
  columns,
  actions = [],
  keyExtractor,
  // isLoading,
  emptyMessage = "No data found",
  renderMobileCard,
}: DataTableProps<T>) {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  // if (isLoading) {
  //   return <TableSkeleton columns={columns.length} />;
  // }

  if (data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border bg-card">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const visibleColumns = columns.filter((col) => !col.hideOnMobile);
  const hasActions = actions.length > 0;

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    "px-4 py-3 text-left text-sm font-medium text-muted-foreground",
                    column.headerClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
              {hasActions && (
                <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.map((item) => {
              const id = keyExtractor(item);
              return (
                <tr key={id} className="hover:bg-muted/50">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("px-4 py-3", column.cellClassName)}
                    >
                      {column.render(item)}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        {actions.map((action, index) => (
                          <button
                            key={index}
                            onClick={() => action.onClick(item)}
                            className={cn(
                              "rounded-lg p-2 transition-colors",
                              action.variant === "destructive"
                                ? "text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                            title={action.label}
                          >
                            {action.icon}
                          </button>
                        ))}
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="divide-y md:hidden">
        {data.map((item) => {
          const id = keyExtractor(item);

          // Use custom mobile card if provided
          if (renderMobileCard) {
            return <div key={id}>{renderMobileCard(item, actions)}</div>;
          }

          // Default mobile card
          return (
            <div key={id} className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  {visibleColumns.slice(0, 2).map((column) => (
                    <div key={column.key}>{column.render(item)}</div>
                  ))}
                </div>

                {hasActions && (
                  <div className="relative">
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === id ? null : id)
                      }
                      className="rounded-lg p-2 hover:bg-accent"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>

                    {openMenuId === id && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setOpenMenuId(null)}
                        />
                        <div className="absolute right-0 top-full z-20 mt-1 w-36 rounded-lg border bg-card shadow-lg">
                          {actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                action.onClick(item);
                                setOpenMenuId(null);
                              }}
                              className={cn(
                                "flex w-full items-center gap-2 px-3 py-2 text-sm transition-colors",
                                action.variant === "destructive"
                                  ? "text-destructive hover:bg-destructive/10"
                                  : "hover:bg-accent"
                              )}
                            >
                              {action.icon}
                              {action.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Additional columns */}
              {visibleColumns.length > 2 && (
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  {visibleColumns.slice(2).map((column) => (
                    <div key={column.key}>
                      <p className="text-xs text-muted-foreground">
                        {column.header}
                      </p>
                      <div className="mt-0.5">{column.render(item)}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
