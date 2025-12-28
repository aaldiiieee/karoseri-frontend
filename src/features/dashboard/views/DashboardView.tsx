import { Box, Database, Activity, TrendingUp } from "lucide-react";
import { StatsCard } from "../components";
import { useDashboardStats } from "../hooks/useDashboard";

export const DashboardView = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back! Here's your analysis overview.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Components"
          value={stats?.total_components || 0}
          subtitle="Registered components"
          icon={Box}
          variant="primary"
        />
        <StatsCard
          title="Damage Records"
          value={stats?.total_damage_records || 0}
          subtitle="Training data"
          icon={Database}
          variant="success"
        />
        <StatsCard
          title="Total Predictions"
          value={stats?.total_predictions || 0}
          subtitle="Classifications made"
          icon={Activity}
          variant="warning"
        />
        <StatsCard
          title="Model Accuracy"
          value={
            stats?.model_accuracy
              ? `${(stats.model_accuracy * 100).toFixed(1)}%`
              : "N/A"
          }
          subtitle={stats?.is_model_trained ? "Trained" : "Not trained"}
          icon={TrendingUp}
          variant="danger"
        />
      </div>
    </>
  );
};
