import { useRoutes } from "react-router";
import { AuthRoutes } from "@/features/auth/routes";
import { DashboardRoutes } from "@/features/dashboard/routes";
import { MasterDataRoutes } from "@/features/master-data/route";
import { AnalysisRoutes } from "@/features/analysis/routes";
import { UserRoutes } from "@/features/users/routes";

export const appRoutes = [
  ...AuthRoutes,
  ...DashboardRoutes,
  ...MasterDataRoutes,
  ...AnalysisRoutes,
  ...UserRoutes,
];

export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
