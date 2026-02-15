import type { RouteObject } from "react-router";
import { AuthLayout } from "./layouts/AuthLayout";
import { LoginView } from "./views/LoginView";

export const AuthRoutes: RouteObject[] = [
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: LoginView,
      },
    ],
  },
];
