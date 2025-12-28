import { api } from "@/shared/lib/api";
import type { DashboardStats } from "../types/dashboard.types";

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await api.get("/dashboard/stats");
    return response.data;
  },
};
