import type { RouteObject } from "react-router";
import { UserListView, UserCreateView, UserEditView } from "./views";
import { MainLayout } from "@/shared/layouts/MainLayout";

export const UserRoutes: RouteObject[] = [
  {
    path: "settings/team",
    Component: MainLayout,
    children: [
      {
        path: "",
        Component: UserListView,
      },
      {
        path: "add",
        Component: UserCreateView,
      },
      {
        path: ":id",
        Component: UserEditView,
      },
    ],
  },
];
