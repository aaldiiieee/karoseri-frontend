import type { DataTableSkeletonProps } from "../types/dataTable.type";

export const DataTableSkeleton = ({
  columns = 4,
  rows = 5,
  hasActions = true,
}: DataTableSkeletonProps) => {
  const totalColumns = hasActions ? columns + 1 : columns;

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      {/* Header */}
      <div className="border-b bg-muted/50 px-4 py-3">
        <div className="flex gap-4">
          {[...Array(totalColumns)].map((_, i) => (
            <div
              key={i}
              className="h-4 flex-1 animate-pulse rounded bg-muted"
            />
          ))}
        </div>
      </div>

      {/* Rows */}
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="border-b px-4 py-3 last:border-0">
          <div className="flex gap-4">
            {[...Array(totalColumns)].map((_, j) => (
              <div
                key={j}
                className="h-4 flex-1 animate-pulse rounded bg-muted"
                style={{
                  animationDelay: `${(i * totalColumns + j) * 50}ms`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
