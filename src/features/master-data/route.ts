import type { RouteObject } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import { KaroseriComponentListView } from "./views/KaroseriComponentListView";
import { DamageRecordListView } from "./views/DamageRecordListView";

export const MasterDataRoutes: RouteObject[] = [
  {
    path: "/master-data",
    Component: MainLayout,
    children: [
      {
        path: "component",
        Component: KaroseriComponentListView,
      },
      {
        path: "damage-record",
        Component: DamageRecordListView,
      },
    ],
  },
];
