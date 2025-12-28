import type { RouteObject } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { DashboardView } from "./views/DashboardView";

export const DashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    Component: MainLayout,
    children: [
      {
        path: "",
        Component: DashboardView,
      },
    ],
  },
];
