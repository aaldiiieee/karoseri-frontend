import { useNavigate } from "react-router";
import { cn } from "@/shared/lib/utils";
import type { DataTableProps } from "../types/dataTable.type";
import { DataTableSkeleton } from "./DataTableSkeleton";
import { Button } from "./ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

export function DataTable<T>({
  data,
  columns,
  actions = [],
  keyExtractor,
  isLoading,
  emptyMessage = "No data found",
  navigateToAdd,
  title,
}: DataTableProps<T>) {
  const navigate = useNavigate();

  if (isLoading) {
    return <DataTableSkeleton columns={columns.length} />;
  }

  const hasActions = actions.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Master Data</BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {navigateToAdd && (
          <Button onClick={() => navigate(navigateToAdd)}>Add {title}</Button>
        )}
      </div>
      <div className="overflow-hidden rounded-lg border bg-card">
        <div className="md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={cn(
                      "px-4 py-3 text-left text-sm font-medium text-muted-foreground text-nowrap",
                      column.headerClassName,
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
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (hasActions ? 1 : 0)}
                    className="px-4 py-6 text-center text-sm text-muted-foreground"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item) => {
                  const id = keyExtractor(item);
                  return (
                    <tr key={id} className="hover:bg-muted/50">
                      {columns.map((column) => (
                        <td
                          key={column.key}
                          className={cn(
                            "px-4 py-3 text-nowrap",
                            column.cellClassName,
                          )}
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
                                    : "text-muted-foreground hover:bg-accent hover:text-foreground",
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
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
