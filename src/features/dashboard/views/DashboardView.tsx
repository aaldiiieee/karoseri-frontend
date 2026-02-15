import { Box, Database, Activity, TrendingUp } from "lucide-react";
import {
  StatsCard,
  DamageDistributionChart,
  RecentPredictions,
  ModelStatusBadge,
} from "../components";
import { useDashboardStats } from "../hooks/useDashboard";
import { useUser } from "@/features/auth/hooks/useUser";

export const DashboardView = () => {
  const { data: stats, isLoading, error } = useDashboardStats();
  const { data: user } = useUser();

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed bg-card/50 p-8 text-center animate-in fade-in zoom-in-95 duration-500">
        <div className="rounded-full bg-destructive/10 p-4">
          <Activity className="h-8 w-8 text-destructive" />
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">
          Gagal memuat data
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-sm">
          {error.message || "Terjadi kesalahan saat menghubungi server. Silakan coba lagi nanti."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Komponen"
          value={stats?.total_components || 0}
          subtitle="Komponen terdaftar"
          icon={Box}
          variant="primary"
        />
        <StatsCard
          title="Data Kerusakan"
          value={stats?.total_damage_records || 0}
          subtitle="Data pelatihan"
          icon={Database}
          variant="success"
        />
        <StatsCard
          title="Total Prediksi"
          value={stats?.total_predictions || 0}
          subtitle="Klasifikasi dilakukan"
          icon={Activity}
          variant="warning"
        />
        <StatsCard
          title="Akurasi Model"
          value={
            stats?.model_accuracy
              ? `${(stats.model_accuracy * 100).toFixed(1)}%`
              : "N/A"
          }
          subtitle={stats?.is_model_trained ? "Model Terlatih" : "Butuh Pelatihan"}
          icon={TrendingUp}
          variant={stats?.is_model_trained ? "danger" : "default"}
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        <div className="lg:col-span-4 space-y-6">
          {stats?.damage_distribution && (
            <DamageDistributionChart data={stats.damage_distribution} />
          )}
          <RecentPredictions predictions={stats?.recent_predictions || []} />
        </div>
        <div className="lg:col-span-3 space-y-6">
          <ModelStatusBadge
            isTrained={stats?.is_model_trained || false}
            accuracy={stats?.model_accuracy ?? null}
          />
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Ringkasan Distribusi
            </h3>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <QuickStat
                label="Ringan"
                value={stats?.damage_distribution.ringan || 0}
                color="text-emerald-600 dark:text-emerald-400"
                bg="bg-emerald-50 dark:bg-emerald-900/10"
              />
              <QuickStat
                label="Sedang"
                value={stats?.damage_distribution.sedang || 0}
                color="text-amber-600 dark:text-amber-400"
                bg="bg-amber-50 dark:bg-amber-900/10"
              />
              <QuickStat
                label="Berat"
                value={stats?.damage_distribution.berat || 0}
                color="text-rose-600 dark:text-rose-400"
                bg="bg-rose-50 dark:bg-rose-900/10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Quick Stat Helper
function QuickStat({
  label,
  value,
  color,
  bg,
}: {
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center rounded-xl p-4 transition-transform hover:scale-105 ${bg}`}>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</p>
    </div>
  );
}

// Loading Skeleton
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <div className="h-8 w-40 animate-pulse rounded-lg bg-muted" />
        <div className="mt-2 h-5 w-72 animate-pulse rounded-lg bg-muted" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse rounded-xl border bg-muted"
          />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="h-64 animate-pulse rounded-xl border bg-muted" />
        <div className="space-y-6">
          <div className="h-24 animate-pulse rounded-xl border bg-muted" />
          <div className="h-32 animate-pulse rounded-xl border bg-muted" />
        </div>
      </div>
      <div className="h-48 animate-pulse rounded-xl border bg-muted" />
    </div>
  );
}
