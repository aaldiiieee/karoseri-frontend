import type { RouteObject } from "react-router";
import { LandingView } from "./views/LandingView";
import { LandingLayout } from "./layouts/LandingLayout";

export const LandingRoutes: RouteObject[] = [
  {
    path: "/",
    Component: LandingLayout,
    children: [
      {
        path: "",
        Component: LandingView,
      },
    ],
  },
];
