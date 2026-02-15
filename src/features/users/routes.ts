import type { RouteObject } from "react-router";
import { UserListView } from "./views/UserListView";

export const UserRoutes: RouteObject[] = [
  {
    path: "settings/team",
    Component: UserListView,
  },
];
