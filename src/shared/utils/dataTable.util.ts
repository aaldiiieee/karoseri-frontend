import type { Column, Action } from "../types/dataTable.type";

/**
 * Create column definitions for DataTable
 */
export function getColumns<T>(configs: Column<T>[]): Column<T>[] {
  return configs;
}

/**
 * Create action definitions for DataTable
 */
export function getActions<T>(configs: Action<T>[]): Action<T>[] {
  return configs;
}
