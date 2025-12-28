import type { RouteObject } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { KaroseriComponentView } from "./views/KaroseriComponentView";

export const MasterDataRoutes: RouteObject[] = [
  {
    path: "/master-data",
    Component: MainLayout,
    children: [
      {
        path: "component",
        Component: KaroseriComponentView,
      },
    ],
  },
];
