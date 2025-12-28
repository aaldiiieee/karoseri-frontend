import type { Column } from "@/shared/types/dataTable.types";
import type { Component } from "../types/karoseriComponent.types";

export const columns: Column<Component>[] = [
  {
    key: "componentCode",
    header: "Component Code",
    render: (item) => <span>{item.componentCode}</span>,
    hideOnMobile: false, // optional
  },
  {
    key: "componentName",
    header: "Component Name",
    render: (item) => <span>{item.componentName}</span>,
    hideOnMobile: true, // hide on mobile, show in grid
  },
  {
    key: "category",
    header: "Category",
    render: (item) => <span>{item.category}</span>,
    hideOnMobile: true, // hide on mobile, show in grid
  },
];
