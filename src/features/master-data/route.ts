import type { RouteObject } from "react-router";
import { MainLayout } from "@/shared/layouts/MainLayout";
import {
  KaroseriComponentListView,
  KaroseriComponentAddView,
  DamageRecordListView,
  DamageRecordAddView,
  DamageRecordEditView,
} from "./views";

export const MasterDataRoutes: RouteObject[] = [
  {
    path: "/master-data",
    Component: MainLayout,
    children: [
      // Component routes
      {
        path: "component",
        Component: KaroseriComponentListView,
      },
      {
        path: "component/add",
        Component: KaroseriComponentAddView,
      },
      // Damage record routes
      {
        path: "damage-record",
        Component: DamageRecordListView,
      },
      {
        path: "damage-record/add",
        Component: DamageRecordAddView,
      },
      {
        path: "damage-record/:id",
        Component: DamageRecordEditView,
      },
    ],
  },
];
