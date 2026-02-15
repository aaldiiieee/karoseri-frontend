export interface Column<T> {
  key: string;
  header: string;
  /** Render cell content */
  render: (item: T) => React.ReactNode;
  /** Optional class for header */
  headerClassName?: string;
  /** Optional class for cell */
  cellClassName?: string;
  /** Hide on mobile */
  hideOnMobile?: boolean;
}

export interface Action<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  variant?: "default" | "destructive";
}

export interface DataTableProps<T> {
  /** Data array */
  data: T[];
  /** Column definitions */
  columns: Column<T>[];
  /** Row actions (edit, delete, etc) */
  actions?: Action<T>[];
  /** Unique key for each row */
  keyExtractor: (item: T) => string;
  /** Loading state */
  isLoading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Mobile card render (optional, for custom mobile view) */
  renderMobileCard?: (item: T, actions: Action<T>[]) => React.ReactNode;
  navigateToAdd?: string;
  title: string;
  /** Extra action buttons rendered in the header */
  extraActions?: React.ReactNode;
  pagination?: PaginationState;
}

export interface PaginationState {
  page: number;
  size: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSizeChange: (size: number) => void;
}

export interface DataTableSkeletonProps {
  /** Number of columns */
  columns?: number;
  /** Number of rows */
  rows?: number;
  /** Show actions column */
  hasActions?: boolean;
}
