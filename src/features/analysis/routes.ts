import type { RouteObject } from "react-router";
import { AnalysisView } from "./views/AnalysisView";
import { PredictionHistoryView } from "./views/PredictionHistoryView";
import { PredictionDetailView } from "./views/PredictionDetailView";
import { ModelTrainingView } from "./views/ModelTrainingView";
import { MainLayout } from "@/shared/layouts/MainLayout";

export const AnalysisRoutes: RouteObject[] = [
  {
    path: "/analysis",
    Component: MainLayout,
    children: [
      {
        path: "",
        Component: PredictionHistoryView,
      },
      {
        path: "add",
        Component: AnalysisView,
      },
      {
        path: "reports",
        Component: ModelTrainingView,
      },
      {
        path: ":id",
        Component: PredictionDetailView,
      },
    ],
  },
];
