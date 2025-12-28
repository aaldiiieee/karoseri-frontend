import { useRoutes } from "react-router";
import { LandingRoutes } from "@/features/landing/routes";
import { DashboardRoutes } from "@/features/dashboard/routes";
import { MasterDataRoutes } from "@/features/master-data/route";

export const appRoutes = [
  ...LandingRoutes,
  ...DashboardRoutes,
  ...MasterDataRoutes,
];

export const AppRouter = () => {
  const element = useRoutes(appRoutes);
  return element;
};
