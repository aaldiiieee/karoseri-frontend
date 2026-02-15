import type { RouteObject } from "react-router";
import { AnalysisView } from "./views/AnalysisView";
import { PredictionHistoryView } from "./views/PredictionHistoryView";
import { ModelTrainingView } from "./views/ModelTrainingView";
import { MainLayout } from "@/shared/layouts/MainLayout";

export const AnalysisRoutes: RouteObject[] = [
  {
    path: "/analysis",
    Component: MainLayout,
    children: [
      {
        path: "",
        Component: AnalysisView,
      },
      {
        path: "history",
        Component: PredictionHistoryView,
      },
      {
        path: "reports",
        Component: ModelTrainingView,
      },
    ],
  },
];
